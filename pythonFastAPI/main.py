from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional
import re
import difflib
import json
import time
import requests
import os

app = FastAPI(title="Code Analysis API", version="1.0.0")

# Configuration CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configuration LLaMA 3
API_KEY = "5752d15c55df315184a82fdca124ecbad6e08be30ca5bb5bd578e68a95426a49"
MODEL = "meta-llama/Llama-3.3-70B-Instruct-Turbo"
TOGETHER_API_URL = "https://api.together.xyz/v1/chat/completions"

class Explanation(BaseModel):
    line: int
    title: str
    problem: str
    solution: str

class AnalyzeRequest(BaseModel):
    prompt: str
    code: str

class AnalyzeResponse(BaseModel):
    original_code: str
    corrected_code: str
    original_highlight_lines: List[int]
    corrected_highlight_lines: List[int]
    language: str
    errors: List[str]
    corrections: List[str]
    explanations: List[Explanation]
    input_tokens: int
    output_tokens: int
    response_time_ms: int

def detect_language(code: str) -> str:
    """Détecte le langage de programmation basé sur le code"""
    code_lower = code.lower()
    
    if any(keyword in code_lower for keyword in ['def ', 'import ', 'from ', 'class ', 'if __name__']):
        return "Python"
    elif any(keyword in code_lower for keyword in ['function ', 'var ', 'let ', 'const ', 'console.log']):
        return "JavaScript"
    elif any(keyword in code_lower for keyword in ['public class', 'public static void', 'import java']):
        return "Java"
    elif any(keyword in code_lower for keyword in ['#include', 'int main', 'printf', 'scanf']):
        return "C/C++"
    elif any(keyword in code_lower for keyword in ['package ', 'import ', 'func ', 'fmt.']):
        return "Go"
    else:
        return "Unknown"

def call_llama_api(prompt: str, code: str) -> tuple[str, List[dict]]:
    """Appelle l'API Together.ai avec LLaMA 3 pour corriger le code et fournir des explications"""
    try:
        # Construction du prompt pour LLaMA 3
        system_prompt = """Tu es un expert en programmation. Analyse le code fourni et corrige les erreurs de syntaxe, de logique et de style. 
        Tu dois répondre STRICTEMENT avec un objet JSON valide. Ne retourne aucun texte autour, et n'ajoute pas de formatage Markdown (pas de ```json).
        La structure du JSON DOIT correspondre exactement à ceci:
        {
          "corrected_code": "le code corrigé complet sous forme de chaîne de caractères",
          "explanations": [
            {
              "line": le_numéro_de_ligne_concerné_entier,
              "title": "Titre court de l'erreur",
              "problem": "Explication pédagogique du pourquoi c'est un problème (en français)",
              "solution": "Explication de la correction apportée et pourquoi elle résout le problème"
            }
          ]
        }
        Assure-toi que le code corrigé est fonctionnel et suit les bonnes pratiques du langage. Si le code ne contient pas d'erreurs, retourne le code tel quel et une liste vide pour les explications."""
        
        user_prompt = f"""Code à corriger:
{code}

{prompt if prompt else 'Corrige ce code en identifiant et corrigeant les erreurs.'}"""

        headers = {
            "Authorization": f"Bearer {API_KEY}",
            "Content-Type": "application/json"
        }
        
        payload = {
            "model": MODEL,
            "messages": [
                {"role": "system", "content": system_prompt},
                {"role": "user", "content": user_prompt}
            ],
            "max_tokens": 2048,
            "temperature": 0.1,
            "top_p": 0.9,
            "response_format": {"type": "json_object"}
        }
        
        response = requests.post(TOGETHER_API_URL, headers=headers, json=payload, timeout=30)
        response.raise_for_status()
        
        result = response.json()
        if "choices" in result and len(result["choices"]) > 0:
            content = result["choices"][0]["message"]["content"].strip()
            
            # Extraction robuste : chercher de la première '{' à la dernière '}'
            start_idx = content.find('{')
            end_idx = content.rfind('}')
            if start_idx != -1 and end_idx != -1:
                content = content[start_idx:end_idx+1]
            
            parsed_json = json.loads(content)
            corrected_code = parsed_json.get("corrected_code", "")
            explanations = parsed_json.get("explanations", [])
            return corrected_code, explanations
        else:
            raise Exception("Réponse invalide de l'API")
            
    except json.JSONDecodeError as e:
        raise Exception(f"Erreur de parsing JSON depuis LLaMA: {str(e)} - Contenu: {content[:100]}...")
    except requests.exceptions.RequestException as e:
        raise Exception(f"Erreur de communication avec l'API: {str(e)}")
    except Exception as e:
        raise Exception(f"Erreur lors de l'appel à LLaMA 3: {str(e)}")

def analyze_code_differences(original_code: str, corrected_code: str) -> tuple[List[str], List[str]]:
    """Analyse les différences entre le code original et corrigé"""
    errors = []
    corrections = []
    
    original_lines = original_code.split('\n')
    corrected_lines = corrected_code.split('\n')
    
    matcher = difflib.SequenceMatcher(None, original_lines, corrected_lines)
    
    for tag, i1, i2, j1, j2 in matcher.get_opcodes():
        if tag == 'replace':
            for line_num in range(i1, i2):
                if line_num < len(original_lines):
                    errors.append(f"Ligne {line_num + 1}: {original_lines[line_num].strip()}")
            for line_num in range(j1, j2):
                if line_num < len(corrected_lines):
                    corrections.append(f"Ligne {line_num + 1}: {corrected_lines[line_num].strip()}")
        elif tag == 'delete':
            for line_num in range(i1, i2):
                if line_num < len(original_lines):
                    errors.append(f"Ligne {line_num + 1}: Ligne supprimée")
        elif tag == 'insert':
            for line_num in range(j1, j2):
                if line_num < len(corrected_lines):
                    corrections.append(f"Ligne {line_num + 1}: {corrected_lines[line_num].strip()}")
    
    return errors, corrections

def get_highlight_lines(original_lines: List[str], corrected_lines: List[str]) -> tuple[List[int], List[int]]:
    """Calcule les lignes à surligner pour les erreurs et corrections"""
    matcher = difflib.SequenceMatcher(None, original_lines, corrected_lines)
    original_highlights = []
    corrected_highlights = []
    
    for tag, i1, i2, j1, j2 in matcher.get_opcodes():
        if tag == 'replace':
            # Lignes avec erreurs (rouge)
            original_highlights.extend(range(i1, i2))
            # Lignes avec corrections (vert)
            corrected_highlights.extend(range(j1, j2))
        elif tag == 'delete':
            # Lignes supprimées (rouge)
            original_highlights.extend(range(i1, i2))
        elif tag == 'insert':
            # Lignes ajoutées (vert)
            corrected_highlights.extend(range(j1, j2))
    
    return original_highlights, corrected_highlights

@app.post("/analyze", response_model=AnalyzeResponse)
async def analyze_code(request: AnalyzeRequest):
    """Analyse et corrige le code fourni avec LLaMA 3"""
    start_time = time.time()
    
    try:
        # Détecter le langage
        language = detect_language(request.code)
        
        # Appeler LLaMA 3 pour corriger le code et obtenir les explications
        corrected_code, explanations = call_llama_api(request.prompt, request.code)
        
        # Analyser les différences
        errors, corrections = analyze_code_differences(request.code, corrected_code)
        
        # Calculer les lignes à surligner
        original_lines = request.code.split('\n')
        corrected_lines = corrected_code.split('\n')
        original_highlights, corrected_highlights = get_highlight_lines(original_lines, corrected_lines)
        
        # Calculer le temps de réponse
        response_time = int((time.time() - start_time) * 1000)
        
        # Estimer les tokens (approximation basée sur la longueur)
        input_tokens = len(request.code.split()) + len(request.prompt.split())
        output_tokens = len(corrected_code.split())
        
        # S'assurer que les explications respectent le modèle (surtout pour la casse)
        validated_explanations = []
        for exp in explanations:
            validated_explanations.append(Explanation(
                line=exp.get("line", 0),
                title=exp.get("title", "Erreur"),
                problem=exp.get("problem", ""),
                solution=exp.get("solution", "")
            ))
            
        return AnalyzeResponse(
            original_code=request.code,
            corrected_code=corrected_code,
            original_highlight_lines=original_highlights,
            corrected_highlight_lines=corrected_highlights,
            language=language,
            errors=errors,
            corrections=corrections,
            explanations=validated_explanations,
            input_tokens=input_tokens,
            output_tokens=output_tokens,
            response_time_ms=response_time
        )
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Erreur lors de l'analyse: {str(e)}")

@app.get("/health")
async def health_check():
    """Point de terminaison pour vérifier la santé du service"""
    return {"status": "healthy", "service": "code-analysis-api", "model": MODEL}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000, reload=True)