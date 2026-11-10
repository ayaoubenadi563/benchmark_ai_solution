import React from 'react';
import { useLocation } from 'react-router-dom';
import ChatSidebar from './ChatSidebar';

function Layout({ children, selectedChat, onChatSelect }) {
  const location = useLocation();
  
  // Pages où la sidebar doit être visible
  const showSidebar = location.pathname === '/' || location.pathname.startsWith('/chat/');
  
  return (
    <div className="flex h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      {showSidebar && (
        <ChatSidebar 
          currentChatId={selectedChat?.id} 
          onChatSelect={onChatSelect}
        />
      )}
      <div className="flex-1 flex flex-col overflow-hidden">
        {children}
      </div>
    </div>
  );
}

export default Layout;
