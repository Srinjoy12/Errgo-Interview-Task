import React, { useState, useEffect } from 'react';

const ChatPage: React.FC = () => {
  const [messages, setMessages] = useState<string[]>([]);
  const [input, setInput] = useState<string>('');
  const [socket, setSocket] = useState<WebSocket | null>(null);

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:3000');

    ws.onopen = () => {
      console.log('Connected to WebSocket');
    };

    ws.onmessage = (event) => {
      const receivedMessages = JSON.parse(event.data);
      setMessages((prevMessages) => [...prevMessages, ...receivedMessages]);
    };

    ws.onclose = () => {
      console.log('Disconnected from WebSocket');
    };

    setSocket(ws);

    return () => {
      ws.close();
    };
  }, []);

  const sendMessage = () => {
    if (socket && input.trim()) {
      socket.send(input);
      setInput('');
    }
  };

  return (
    <div className="flex-1 flex items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-2xl flex flex-col bg-white rounded-2xl shadow-xl h-[90vh]">
        <div className="p-4 border-b">
          <h1 className="text-2xl font-bold text-center text-gray-800">Live Chat</h1>
        </div>
        <div className="flex-1 p-6 space-y-4 overflow-y-auto">
          {messages.map((msg, index) => (
            <div key={index} className="p-3 bg-purple-100 rounded-lg text-gray-800">
              {msg}
            </div>
          ))}
        </div>
        <div className="p-4 border-t flex items-center">
          <input
            type="text"
            className="flex-1 border rounded-l-lg p-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
            placeholder="Type a message..."
          />
          <button
            className="bg-purple-500 text-white rounded-r-lg px-6 py-3 font-semibold hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-500"
            onClick={sendMessage}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatPage; 