import React from 'react';
import CodeComparison from './CodeComparison';

function ChatHistory({ messages = [] }) {
  if (messages.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        <div className="text-lg mb-2">Aucun message dans cette conversation</div>
        <div className="text-sm">Commencez par envoyer un message pour voir l'historique ici.</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {messages.map((message, index) => (
        <div key={message.id || index} className="border border-gray-200 rounded-lg p-4 bg-white shadow-sm">
          {/* En-tête du message */}
          <div className="flex items-center justify-between mb-3 pb-2 border-b border-gray-100">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
              <span className="text-sm text-gray-600">
                Message #{index + 1}
              </span>
            </div>
            <span className="text-xs text-gray-400">
              {new Date(message.createdAt).toLocaleString('fr-FR')}
            </span>
          </div>

          {/* Contenu du message */}
          <div className="space-y-4">
            {/* Prompt utilisateur */}
            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-2">Votre demande :</h4>
              <div className="bg-gray-50 p-3 rounded border-l-4 border-blue-500">
                <pre className="whitespace-pre-wrap text-sm text-gray-800">
                  {message.prompt}
                </pre>
              </div>
            </div>

            {/* Réponse de Llama */}
            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-2">Réponse de Llama :</h4>
              
              {/* Vérifier si c'est du code avec comparaison */}
              {message.originalCode && message.correctedCode ? (
                <CodeComparison resultData={message} />
              ) : (
                <div className="bg-orange-50 p-3 rounded border-l-4 border-orange-500">
                  <pre className="whitespace-pre-wrap text-sm text-gray-800">
                    {message.output}
                  </pre>
                </div>
              )}
            </div>

            {/* Métadonnées */}
            {(message.inputTokens || message.outputTokens || message.responseTimeMs) && (
              <div className="flex items-center gap-4 text-xs text-gray-500 pt-2 border-t border-gray-100">
                {message.inputTokens && (
                  <span>Tokens d'entrée: {message.inputTokens}</span>
                )}
                {message.outputTokens && (
                  <span>Tokens de sortie: {message.outputTokens}</span>
                )}
                {message.responseTimeMs && (
                  <span>Temps de réponse: {message.responseTimeMs}ms</span>
                )}
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

export default ChatHistory; 