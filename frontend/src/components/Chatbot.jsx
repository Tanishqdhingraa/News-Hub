import React, { useState, useRef, useEffect } from "react";

function Chatbot() {
  const [messages, setMessages] = useState([
    {
      from: "bot",
      text: "Welcome to NewsHub 📰 — read news, post updates, and even use our AI assistant!",
    },
  ]);
  const [input, setInput] = useState("");
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const faqs = [
    {
      triggers: ["what is newshub", "about newshub", "newshub"],
      answer:
        "NewsHub is a modern platform where users can read news, post their own updates, and interact with AI-powered features.",
    },
    {
      triggers: ["read news", "latest news", "view news"],
      answer:
        "You can explore all the latest news shared by users in the Read News section of NewsHub.",
    },
    {
      triggers: ["post news", "create news", "upload news"],
      answer:
        "Want to share something? Head to Post News and publish your own article with optional images.",
    },
    {
      triggers: ["ai", "ai feature", "ai help", "assistant"],
      answer:
        "Our AI feature lets you ask questions, summarize news, or get smart insights instantly!",
    },
    {
      triggers: ["features", "what can i do"],
      answer:
        "On NewsHub you can read news, post updates, chat via notifications, and use AI tools — all in one place!",
    },
  ];

  function matchFAQ(text) {
    const query = text.toLowerCase();
    for (const faq of faqs) {
      for (const t of faq.triggers) {
        if (query.includes(t)) return faq.answer;
      }
    }
    return null;
  }

  function sendMessage(e) {
    e.preventDefault();
    if (!input.trim()) return;

    const userText = input.trim();
    setMessages((prev) => [...prev, { from: "user", text: userText }]);
    setInput("");

    const response = matchFAQ(userText);

    if (response) {
      setMessages((prev) => [...prev, { from: "bot", text: response }]);
    } else {
      setMessages((prev) => [
        ...prev,
        {
          from: "bot",
          text:
            "I’m not sure about that 🤔 Try asking about reading news, posting news, or using the AI feature!",
        },
      ]);
    }
  }

  return (
    <div className="hidden md:block w-72 fixed bottom-10 right-10 z-50 chatbot-bounce">
      <div className="w-full bg-blue-600 shadow-2xl rounded-xl border border-white overflow-hidden">
        <div className="bg-blue-700 text-white p-3 font-semibold text-center text-sm border-b border-white">
          NewsHub Assistant
        </div>

        <div className="h-64 overflow-y-auto p-3 space-y-2 bg-white">
          {messages.map((m, i) => (
            <div
              key={i}
              className={`flex ${
                m.from === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`px-3 py-2 rounded-lg max-w-[80%] text-xs whitespace-pre-wrap shadow-md ${
                  m.from === "user"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 text-blue-700"
                }`}
              >
                {m.text}
              </div>
            </div>
          ))}
          <div ref={bottomRef} />
        </div>

        <form
          onSubmit={sendMessage}
          className="p-2 border-t border-white flex gap-2 bg-blue-600"
        >
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask NewsHub..."
            className="flex-1 px-2 py-1 text-xs bg-white text-blue-700 border border-blue-200 rounded focus:ring-1 focus:ring-white outline-none"
          />
          <button
            type="submit"
            className="px-3 py-1 bg-white text-blue-700 text-xs rounded font-semibold"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
}

export default Chatbot;
