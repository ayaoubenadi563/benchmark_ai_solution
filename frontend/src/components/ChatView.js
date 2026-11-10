import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import PromptForm from './PromptForm';
import Result from './Result';
import axios from 'axios';
import { useChatContext } from '../context/ChatContext';

function ChatView() {
  const { chatId } = useParams();
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [chat, setChat] = useState(null);
  const { fetchChats } = useChatContext();

  useEffect(() => {
    const fetchChat = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`http://localhost:8080/api/chats/${chatId}`);
        setChat(res.data);
        
        // Convertir les messages de la base de données au format attendu par Result
        const formattedMessages = (res.data.messages || []).map(msg => ({
          prompt: msg.prompt,
          output: msg.output,
          resultData: {
            originalCode: msg.originalCode,
            correctedCode: msg.correctedCode,
            originalHighlightLines: msg.originalHighlightLines,
            correctedHighlightLines: msg.correctedHighlightLines,
            language: msg.language,
            errors: msg.errors,
            corrections: msg.corrections,
            explanations: msg.explanations,
            inputTokens: msg.inputTokens,
            outputTokens: msg.outputTokens,
            responseTimeMs: msg.responseTimeMs
          }
        }));
        
        setMessages(formattedMessages);
      } catch (error) {
        console.error('Erreur récupération chat:', error);
      } finally {
        setLoading(false);
      }
    };
    
    if (chatId) {
      fetchChat();
    }
  }, [chatId]);

  const handleNewResponse = async (responseData) => {
    const newMsg = {
      prompt: responseData.originalCode,
      output: responseData.correctedCode,
      resultData: responseData
    };
    setMessages((prev) => [...prev, newMsg]);
    
    // Rafraîchir la liste des chats pour mettre à jour le timestamp du chat actuel
    fetchChats();
  };

  if (loading) {
    return (
      <div className="p-4">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded mb-4"></div>
          <div className="space-y-4">
            {[1, 2, 3].map(i => (
              <div key={i} className="h-32 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4">
      {chat && (
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">{chat.title}</h1>
          <p className="text-gray-600 text-sm">
            Créé le {new Date(chat.createdAt).toLocaleDateString('fr-FR')}
          </p>
        </div>
      )}
      
      <PromptForm chatId={chatId} onResponse={handleNewResponse} />
      
      {messages.length > 0 ? (
        <div className="mt-8 space-y-6">
          {messages.map((msg, index) => (
            <Result key={index} resultData={msg.resultData} />
          ))}
        </div>
      ) : (
        <div className="mt-8 text-center text-gray-500 py-12">
          <div className="mb-4">
            <svg className="w-16 h-16 mx-auto text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">Aucun message</h3>
          <p className="text-gray-600">Commencez par analyser du code pour voir les résultats ici.</p>
        </div>
      )}
    </div>
  );
}

export default ChatView;
