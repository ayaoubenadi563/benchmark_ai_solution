import React, { useState } from 'react';

function MessageInput({ onSend }) {
  const [text, setText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    onSend(text);
    setText('');
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center">
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Écris ton prompt ici..."
        className="flex-1 border p-2 rounded-md resize-none"
        rows="2"
      />
      <button type="submit" className="ml-2 px-4 py-2 bg-orange-600 text-white rounded-md">
        Envoyer
      </button>
    </form>
  );
}

export default MessageInput;
