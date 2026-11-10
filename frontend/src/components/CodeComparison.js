import React, { useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

function CodeComparison({ resultData }) {
  const [copied, setCopied] = useState(false);
  
  if (!resultData) return null;

  const {
    originalCode,
    correctedCode,
    originalHighlightLines,
    correctedHighlightLines,
    language,
    errors,
    corrections,
    explanations
  } = resultData;

  // Debug: afficher les données reçues
  console.log('CodeComparison received:', {
    originalCode: originalCode?.substring(0, 100) + '...',
    correctedCode: correctedCode?.substring(0, 100) + '...',
    originalHighlightLines,
    correctedHighlightLines,
    language,
    errors,
    corrections
  });

  const copyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Erreur lors de la copie:', err);
    }
  };

  const highlightLine = (code, highlightLines, highlightColor) => {
    if (!code) return null;
    
    const lines = code.split('\n');
    console.log('Highlighting lines:', { 
      highlightLines, 
      totalLines: lines.length, 
      color: highlightColor,
      highlightLinesType: typeof highlightLines,
      isArray: Array.isArray(highlightLines)
    });
    
    return lines.map((line, index) => {
      const lineNumber = index + 1;
      let isHighlighted = false;
      
      if (highlightLines) {
        if (Array.isArray(highlightLines)) {
          isHighlighted = highlightLines.includes(lineNumber);
        } else if (typeof highlightLines === 'object') {
          // Si c'est un objet, essayer de le convertir en array
          const linesArray = Object.values(highlightLines);
          isHighlighted = linesArray.includes(lineNumber);
        }
      }
      
      return (
        <div
          key={index}
          className={`px-4 py-1 ${isHighlighted ? highlightColor : ''}`}
        >
          <span className="text-gray-500 text-xs mr-4 w-8 inline-block">
            {lineNumber}
          </span>
          <span className="font-mono">{line}</span>
        </div>
      );
    });
  };

  return (
    <div className="mt-8 space-y-6">
      {/* Explications Pédagogiques */}
      {explanations && explanations.length > 0 && (
        <div className="bg-blue-50 rounded-lg shadow-sm border border-blue-200 overflow-hidden">
          <div className="bg-blue-100 border-b border-blue-200 px-4 py-3 flex items-center justify-between">
            <h3 className="text-blue-800 font-semibold flex items-center">
              <span className="text-blue-600 mr-2">📘</span>
              Explications détaillées
            </h3>
          </div>
          <div className="p-4 space-y-4">
            {explanations.map((exp, index) => (
              <div key={index} className="bg-white p-4 rounded-md shadow-sm border border-gray-100">
                <div className="flex items-start">
                  <div className="flex-shrink-0 bg-blue-100 text-blue-800 font-bold px-2 py-1 rounded text-xs mt-1 mr-3">
                    Ligne {exp.line}
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-800 text-lg mb-2">{exp.title}</h4>
                    <div className="mb-3">
                      <span className="font-semibold text-red-600 block mb-1">Pourquoi c'est une erreur :</span>
                      <p className="text-gray-700 text-sm">{exp.problem}</p>
                    </div>
                    <div>
                      <span className="font-semibold text-green-600 block mb-1">Comment la correction résout le problème :</span>
                      <p className="text-gray-700 text-sm">{exp.solution}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Code original avec erreurs surlignées en rouge */}
      {originalCode && (
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="bg-red-50 border-b border-red-200 px-4 py-3 flex items-center justify-between">
            <h3 className="text-red-700 font-semibold flex items-center">
              <span className="text-red-500 mr-2">❌</span>
              Code original avec erreurs
            </h3>
          </div>
          <div className="bg-white text-gray-800 font-mono text-sm overflow-x-auto border border-gray-200">
            {highlightLine(originalCode, originalHighlightLines, 'bg-red-100')}
          </div>
        </div>
      )}

      {/* Code corrigé avec corrections surlignées en vert */}
      {correctedCode && (
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="bg-green-50 border-b border-green-200 px-4 py-3 flex items-center justify-between">
            <h3 className="text-green-700 font-semibold flex items-center">
              <span className="text-green-500 mr-2">✅</span>
              Code corrigé
            </h3>
            <button
              onClick={() => copyToClipboard(correctedCode)}
              className="flex items-center px-3 py-1 bg-green-600 text-white text-sm rounded hover:bg-green-700 transition"
              title="Copier le code corrigé"
            >
              {copied ? (
                <>
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Copié !
                </>
              ) : (
                <>
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                  Copier
                </>
              )}
            </button>
          </div>
          <div className="bg-white text-gray-800 font-mono text-sm overflow-x-auto border border-gray-200">
            {highlightLine(correctedCode, correctedHighlightLines, 'bg-green-100')}
          </div>
        </div>
      )}

      {/* Informations sur l'analyse */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Erreurs détectées */}
        {errors && errors.length > 0 && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <h4 className="text-red-800 font-semibold mb-2 flex items-center">
              <span className="text-red-500 mr-2">⚠️</span>
              Erreurs détectées
            </h4>
            <ul className="text-red-700 text-sm space-y-1">
              {errors.map((error, index) => (
                <li key={index} className="flex items-start">
                  <span className="text-red-500 mr-2">•</span>
                  <span>{error}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Corrections apportées */}
        {corrections && corrections.length > 0 && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <h4 className="text-green-800 font-semibold mb-2 flex items-center">
              <span className="text-green-500 mr-2">💡</span>
              Corrections apportées
            </h4>
            <ul className="text-green-700 text-sm space-y-1">
              {corrections.map((correction, index) => (
                <li key={index} className="flex items-start">
                  <span className="text-green-500 mr-2">•</span>
                  <span>{correction}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Métadonnées */}
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
          <div>
            <span className="text-gray-600">Tokens d'entrée:</span>
            <span className="ml-2 font-medium">{resultData.inputTokens || 0}</span>
          </div>
          <div>
            <span className="text-gray-600">Tokens de sortie:</span>
            <span className="ml-2 font-medium">{resultData.outputTokens || 0}</span>
          </div>
          <div>
            <span className="text-gray-600">Temps de réponse:</span>
            <span className="ml-2 font-medium">{resultData.responseTimeMs || 0}ms</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CodeComparison; 