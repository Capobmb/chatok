"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

type Message = {
  role: "user" | "assistant";
  content: string;
};

export default function Home() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [typingText, setTypingText] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  // ローカルストレージからメッセージを読み込む
  useEffect(() => {
    const savedMessages = localStorage.getItem("chatMessages");
    if (savedMessages) {
      setMessages(JSON.parse(savedMessages));
    }
  }, []);

  // メッセージが更新されたらローカルストレージに保存
  useEffect(() => {
    localStorage.setItem("chatMessages", JSON.stringify(messages));
  }, [messages]);

  // タイピングアニメーション
  const simulateTyping = async (text: string) => {
    setIsTyping(true);
    setTypingText("");
    
    for (let i = 0; i <= text.length; i++) {
      setTypingText(text.slice(0, i));
      await new Promise(resolve => setTimeout(resolve, 50 + Math.random() * 50));
    }
    
    setIsTyping(false);
    return text;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput("");
    setMessages(prev => [...prev, { role: "user", content: userMessage }]);
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: userMessage }),
      });

      if (!response.ok) throw new Error("Failed to get response");
      
      const data = await response.json();
      await simulateTyping(data.message);
      setMessages(prev => [...prev, { role: "assistant", content: data.message }]);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="max-w-4xl mx-auto p-4">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800 dark:text-white">
          ChatOK - The AI that only says "OK"
        </h1>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 mb-4 h-[60vh] overflow-y-auto">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`mb-4 p-3 rounded-lg ${
                message.role === "user"
                  ? "bg-blue-100 dark:bg-blue-900 ml-auto max-w-[80%]"
                  : "bg-gray-100 dark:bg-gray-700 max-w-[80%]"
              }`}
            >
              <p className="text-gray-800 dark:text-white">{message.content}</p>
            </div>
          ))}
          {isTyping && (
            <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded-lg max-w-[80%]">
              <p className="text-gray-800 dark:text-white">{typingText}<span className="animate-pulse">|</span></p>
            </div>
          )}
        </div>

        <form onSubmit={handleSubmit} className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 p-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-white"
            disabled={isLoading || isTyping}
          />
          <button
            type="submit"
            disabled={isLoading || isTyping}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50"
          >
            Send
          </button>
        </form>

        {messages.length > 0 && (
          <button
            onClick={() => {
              localStorage.removeItem("chatMessages");
              setMessages([]);
            }}
            className="mt-4 text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          >
            履歴をクリア
          </button>
        )}
      </div>
    </div>
  );
}
