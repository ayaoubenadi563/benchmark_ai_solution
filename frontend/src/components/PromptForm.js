import React, { useState } from 'react';
import axios from 'axios';

function PromptForm({ onResponse, chatId }) {
  const [prompt, setPrompt] = useState('');
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!prompt.trim() && !code.trim()) return;

    setLoading(true);

    try {
      // Envoi du prompt et du code à l'API
      const requestBody = {
        prompt: prompt || 'Analyse et corrige ce code',
        code: code,
      };
      
      // N'ajouter chatId que s'il est défini (pas sur la page d'accueil)
      if (chatId) {
        requestBody.chatId = chatId;
      }
      
      const response = await axios.post('http://localhost:8080/api/prompts', requestBody);

      onResponse(response.data);
      setPrompt('');
      setCode('');
    } catch (error) {
      console.error("Erreur d'envoi :", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="card-elevated p-8">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Analysez votre code
        </h2>
        <p className="text-muted">
          Saisissez votre code et une description optionnelle pour obtenir une analyse IA détaillée
        </p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-3">
          <label className="block text-sm font-semibold text-gray-900 dark:text-white">
            Description (optionnel)
          </label>
          <textarea
            rows="4"
            placeholder="Décrivez ce que vous voulez faire avec le code..."
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            className="input-field resize-none"
          />
          <p className="text-xs text-subtle">
            Ex: "Corrigez les erreurs de syntaxe" ou "Optimisez les performances"
          </p>
        </div>
        
        <div className="space-y-3">
          <label className="block text-sm font-semibold text-gray-900 dark:text-white">
            Code à analyser
          </label>
          <textarea
            rows="10"
            placeholder="Collez votre code ici..."
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="input-field resize-none font-mono text-sm"
          />
          <p className="text-xs text-subtle">
            Tous les langages de programmation sont supportés
          </p>
        </div>
      </div>
      
      <div className="mt-8 flex flex-col sm:flex-row gap-4">
        <button
          type="submit"
          disabled={loading || (!prompt.trim() && !code.trim())}
          className="btn-primary flex-1 flex items-center justify-center space-x-2"
        >
          {loading ? (
            <>
              <svg className="w-5 h-5 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              <span>Analyse en cours...</span>
            </>
          ) : (
            <>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
              <span>Analyser le code</span>
            </>
          )}
        </button>
        
        {(prompt.trim() || code.trim()) && (
          <button
            type="button"
            onClick={() => {
              setPrompt('');
              setCode('');
            }}
            className="btn-secondary flex items-center justify-center space-x-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
            <span>Effacer</span>
          </button>
        )}
      </div>
    </form>
  );
}

export default PromptForm;
