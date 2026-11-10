import React, { createContext, useContext, useState, useCallback } from 'react';
import axios from 'axios';

const ChatContext = createContext();

export const useChatContext = () => {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error('useChatContext must be used within a ChatProvider');
  }
  return context;
};

export const ChatProvider = ({ children }) => {
  const [chats, setChats] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchChats = useCallback(async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:8080/api/chats');
      setChats(response.data);
    } catch (error) {
      console.error('Erreur lors du chargement des chats:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  const addChat = useCallback((newChat) => {
    setChats(prev => [newChat, ...prev]);
  }, []);

  const removeChat = useCallback((chatId) => {
    setChats(prev => prev.filter(chat => chat.id !== chatId));
  }, []);

  const updateChat = useCallback((chatId, updatedChat) => {
    setChats(prev => prev.map(chat => 
      chat.id === chatId ? { ...chat, ...updatedChat } : chat
    ));
  }, []);

  const value = {
    chats,
    loading,
    fetchChats,
    addChat,
    removeChat,
    updateChat
  };

  return (
    <ChatContext.Provider value={value}>
      {children}
    </ChatContext.Provider>
  );
}; 