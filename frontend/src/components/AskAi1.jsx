import React, { useState } from 'react';
import { Send } from 'lucide-react'; // ✅ Icon library (comes with shadcn/lucide)

const AskAI1 = () => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([
    { sender: 'ai', text: '👋 Hello! I’m your News Verification Assistant. Share a news headline or statement, and I’ll check its credibility for you.' },
  ]);

  const handleSend = () => {
    if (input.trim() === '') return;

    // Add user message
    const userMessage = { sender: 'user', text: input };
    setMessages([...messages, userMessage]);

    // Simulate AI reply (you can connect backend here later)
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { sender: 'ai', text: `✅ This is a simulated response. AI will verify: "${input}" once connected to backend.` },
      ]);
    }, 1000);

    setInput('');
  };

  return (
    <section className="min-h-screen bg-gradient-to-b bg-blue-700 mt-12 rounded-4xl flex flex-col items-center justify-center py-10 px-4">
      {/* Header */}
      <h1 className="text-4xl font-extrabold text-white mb-8">
        🤖 Ask <span className="text-yellow-300">AI</span> to Verify News
      </h1>

      {/* Chat Box */}
      <div className="w-full max-w-3xl bg-white rounded-2xl shadow-xl flex flex-col overflow-hidden h-[70vh]">
        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-gray-50">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`p-3 max-w-[75%] rounded-xl text-sm md:text-base ${
                  msg.sender === 'user'
                    ? 'bg-blue-600 text-white rounded-br-none'
                    : 'bg-gray-200 text-gray-900 rounded-bl-none'
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}
        </div>

        {/* Input Area */}
        <div className="p-4 border-t flex items-center bg-white">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type a news statement to verify..."
            className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
          <button
            onClick={handleSend}
            className="ml-3 bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-lg transition flex items-center gap-2"
          >
            <Send size={18} /> Send
          </button>
        </div>
      </div>
    </section>
  );
};

export default AskAI1;
