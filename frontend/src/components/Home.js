import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PromptForm from './PromptForm';
import Result from './Result';
import { useChatContext } from '../context/ChatContext';



function Home() {
  const [selectedChatId, setSelectedChatId] = useState(null);
  const [prompt, setPrompt] = useState('');
  const [resultData, setResultData] = useState(null); // Stocke l'objet complet
  const navigate = useNavigate();
  const { fetchChats } = useChatContext();

  // On reçoit maintenant tout l'objet { output, language, errors, corrections }
  const handleResponse = (response) => {
    setPrompt(response.prompt); // Tu peux garder le prompt pour l'afficher
    setResultData(response);    // Stocke tout : output, language, etc.
    
    // Si un nouveau chat a été créé, rafraîchir la liste des chats et naviguer
    if (response.chatId) {
      fetchChats(); // Rafraîchir la liste des chats
      navigate(`/chat/${response.chatId}`);
    }
  };

 return (
  <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
    <main className="section-spacing">
      <div className="max-width-text container-padding">
        {/* Hero Section */}
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-orange-600 to-orange-500 bg-clip-text text-transparent mb-4">
            DevSpark-AI Assistant
          </h1>
          <p className="text-xl text-muted max-w-2xl mx-auto">
            Analysez et corrigez votre code avec l'intelligence artificielle. 
            Obtenez des suggestions instantanées et améliorez vos compétences de développement.
          </p>
        </div>

        {/* Main Form */}
        <div className="animate-scale-in">
          <PromptForm onResponse={handleResponse} chatId={selectedChatId} />
        </div>

        {/* Results Section */}
        <div className="space-y-6 mt-8">
          {/* Bloc Prompt */}
          {prompt && (
            <section className="card-elevated p-6 animate-fade-in">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-xl flex items-center justify-center">
                  <span className="text-xl">🧠</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Votre Prompt</h3>
              </div>
              <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-4 border border-gray-200 dark:border-gray-700">
                <pre className="text-sm whitespace-pre-wrap font-mono text-gray-800 dark:text-gray-100 leading-relaxed">
                  {prompt}
                </pre>
              </div>
            </section>
          )}

          {/* Bloc Résultat IA */}
          {resultData && (
            <section className="card-elevated p-6 animate-fade-in" aria-label="Réponse IA">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-orange-100 dark:bg-orange-900 rounded-xl flex items-center justify-center">
                  <span className="text-xl">🤖</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Réponse IA</h3>
              </div>
              <div className="custom-scrollbar max-h-[70vh] overflow-y-auto">
                <Result resultData={resultData} />
              </div>
            </section>
          )}
        </div>
      </div>
    </main>
  </div>
);
}
export default Home;
