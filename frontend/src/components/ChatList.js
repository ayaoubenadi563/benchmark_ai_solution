import React from 'react';
import { Link } from 'react-router-dom';

function ChatList({ chats }) {
  return (
    <div className="p-4 space-y-3">
      <h2 className="text-lg font-semibold">💬 Vos conversations</h2>
      {chats.map((chat) => (
        <Link
          key={chat.id}
          to={`/chat/${chat.id}`}
          className="block p-2 rounded hover:bg-orange-100 border border-gray-200"
        >
          {chat.title || `Chat #${chat.id}`}
        </Link>
      ))}
    </div>
  );
}

export default ChatList;
