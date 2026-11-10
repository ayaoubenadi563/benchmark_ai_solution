import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useChatContext } from '../context/ChatContext';
import { useNotification } from './Notification';
import { useConfirmationModal } from './ConfirmationModal';
import axios from 'axios';

function ChatSidebar({ currentChatId, onChatSelect }) {
  const { chats, loading, fetchChats, addChat, removeChat } = useChatContext();
  const [newChatTitle, setNewChatTitle] = useState('');
  const [showNewChatForm, setShowNewChatForm] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [deletingChatId, setDeletingChatId] = useState(null);
  const { showNotification, NotificationComponent } = useNotification();
  const { showConfirmation, ConfirmationModalComponent } = useConfirmationModal();
  const navigate = useNavigate();

  useEffect(() => {
    fetchChats();
  }, [fetchChats]);

  const createNewChat = async (e) => {
    e.preventDefault();
    if (!newChatTitle.trim()) return;

    try {
      const response = await axios.post('http://localhost:8080/api/chats', {
        title: newChatTitle
      });
      
      addChat(response.data);
      setNewChatTitle('');
      setShowNewChatForm(false);
      
      // Naviguer vers le nouveau chat
      navigate(`/chat/${response.data.id}`);
      if (onChatSelect) {
        onChatSelect(response.data);
      }
    } catch (error) {
      console.error('Erreur lors de la création du chat:', error);
    }
  };

  const deleteChat = async (chatId, e) => {
    e.stopPropagation();
    
    const chatTitle = chats.find(chat => chat.id === chatId)?.title || 'ce chat';
    const messageCount = chats.find(chat => chat.id === chatId)?.messages?.length || 0;
    
    // Utilisation de la modale de confirmation élégante
    const confirmed = await showConfirmation({
      title: 'Supprimer le chat',
      message: `Êtes-vous sûr de vouloir supprimer "${chatTitle}" ?\n\n${messageCount > 0 ? `Ce chat contient ${messageCount} message${messageCount > 1 ? 's' : ''}.\n\n` : ''}Cette action est irréversible et ne peut pas être annulée.`,
      confirmText: 'Supprimer',
      cancelText: 'Annuler',
      type: 'danger'
    });

    if (!confirmed) return;

    setDeletingChatId(chatId);
    
    try {
      await axios.delete(`http://localhost:8080/api/chats/${chatId}`);
      removeChat(chatId);
      
      showNotification('success', `Chat "${chatTitle}" supprimé avec succès`, 4000);
      
      // Si on supprime le chat actuel, naviguer vers la page d'accueil
      if (currentChatId === chatId) {
        navigate('/');
      }
    } catch (error) {
      console.error('Erreur lors de la suppression du chat:', error);
      
      let errorMessage = 'Erreur lors de la suppression du chat';
      if (error.response?.status === 404) {
        errorMessage = 'Chat introuvable ou déjà supprimé';
      } else if (error.response?.status === 403) {
        errorMessage = 'Vous n\'avez pas les permissions pour supprimer ce chat';
      } else if (error.response?.status >= 500) {
        errorMessage = 'Erreur serveur. Veuillez réessayer plus tard';
      } else if (error.code === 'NETWORK_ERROR') {
        errorMessage = 'Erreur de connexion. Vérifiez votre connexion internet';
      }
      
      showNotification('error', errorMessage, 6000);
    } finally {
      setDeletingChatId(null);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) {
      return 'Aujourd\'hui';
    } else if (diffDays === 2) {
      return 'Hier';
    } else if (diffDays <= 7) {
      return `Il y a ${diffDays - 1} jours`;
    } else {
      return date.toLocaleDateString('fr-FR');
    }
  };

  if (loading) {
    return (
      <div className={`${isCollapsed ? 'w-16' : 'w-80'} bg-gray-50 border-r border-gray-200 p-4 transition-all duration-300`}>
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded mb-4"></div>
          <div className="space-y-2">
            {[1, 2, 3].map(i => (
              <div key={i} className="h-12 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <NotificationComponent />
      <ConfirmationModalComponent />
      <div className={`${isCollapsed ? 'w-16' : 'w-80'} bg-gray-50 border-r border-gray-200 flex flex-col transition-all duration-300`}>
      {/* Header */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between mb-4">
          {!isCollapsed && <h2 className="text-lg font-semibold text-gray-800">Mes Chats</h2>}
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-1 text-gray-500 hover:text-gray-700 transition"
            title={isCollapsed ? "Développer" : "Réduire"}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isCollapsed ? "M13 5l7 7-7 7M5 5l7 7-7 7" : "M11 19l-7-7 7-7m8 14l-7-7 7-7"} />
            </svg>
          </button>
        </div>
        
        {!isCollapsed && (
          <>
            {!showNewChatForm ? (
              <button
                onClick={() => setShowNewChatForm(true)}
                className="w-full bg-orange-600 text-white py-2 px-4 rounded-lg hover:bg-orange-700 transition"
              >
                + Nouveau Chat
              </button>
            ) : (
              <form onSubmit={createNewChat} className="space-y-2">
                <input
                  type="text"
                  value={newChatTitle}
                  onChange={(e) => setNewChatTitle(e.target.value)}
                  placeholder="Titre du chat"
                  className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  autoFocus
                />
                <div className="flex gap-2">
                  <button
                    type="submit"
                    className="flex-1 bg-orange-600 text-white py-2 px-4 rounded-lg hover:bg-orange-700 transition"
                  >
                    Créer
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setShowNewChatForm(false);
                      setNewChatTitle('');
                    }}
                    className="flex-1 bg-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-400 transition"
                  >
                    Annuler
                  </button>
                </div>
              </form>
            )}
          </>
        )}
      </div>

      {/* Chat List */}
      {!isCollapsed && (
        <div className="flex-1 overflow-y-auto p-4">
          {chats.length === 0 ? (
            <div className="text-center text-gray-500 py-8">
              <p>Aucun chat pour le moment</p>
              <p className="text-sm">Créez votre premier chat pour commencer</p>
            </div>
          ) : (
            <div className="space-y-2">
              {chats.map(chat => (
                <div
                  key={chat.id}
                  onClick={() => {
                    navigate(`/chat/${chat.id}`);
                    if (onChatSelect) {
                      onChatSelect(chat);
                    }
                  }}
                  className={`p-2 rounded-lg cursor-pointer transition ${
                    currentChatId === chat.id
                      ? 'bg-orange-100 dark:bg-orange-900/30 border border-orange-200 dark:border-orange-800'
                      : 'bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 border border-transparent'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-medium text-gray-800 dark:text-gray-200 truncate">
                        {chat.title}
                      </h3>
                      <div className="flex items-center justify-between mt-1">
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          {formatDate(chat.updatedAt)}
                        </p>
                        {chat.messages && chat.messages.length > 0 && (
                          <span className="text-xs bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 px-2 py-1 rounded-full">
                            {chat.messages.length} message{chat.messages.length > 1 ? 's' : ''}
                          </span>
                        )}
                      </div>
                    </div>
                    <button
                      onClick={(e) => deleteChat(chat.id, e)}
                      disabled={deletingChatId === chat.id}
                      className={`ml-2 p-1 transition ${
                        deletingChatId === chat.id 
                          ? 'text-gray-300 cursor-not-allowed' 
                          : 'text-gray-400 hover:text-red-500'
                      }`}
                      title={deletingChatId === chat.id ? "Suppression en cours..." : "Supprimer le chat"}
                    >
                      {deletingChatId === chat.id ? (
                        <svg className="w-4 h-4 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                        </svg>
                      ) : (
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      )}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
    </>
  );
}

export default ChatSidebar; 