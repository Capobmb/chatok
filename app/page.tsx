"use client";

import { useState } from "react";
import { useMessagePersistence } from "./hooks/useMessagePersistence";
import { useTypingAnimation } from "./hooks/useTypingAnimation";
import { useAutoScroll } from "./hooks/useAutoScroll";
import { AnimatedMessage } from "./components/AnimatedMessage";
import { TypingIndicator } from "./components/TypingIndicator";

export default function Home() {
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { messages, setMessages, clearMessages } = useMessagePersistence();
  const { typingText, isTyping, simulateTyping } = useTypingAnimation();
  const { messagesEndRef } = useAutoScroll([messages, isTyping]);

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
            <AnimatedMessage key={index} message={message} />
          ))}
          {isTyping && <TypingIndicator text={typingText} />}
          <div ref={messagesEndRef} />
        </div>

        <form onSubmit={handleSubmit} className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 p-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-white transition-all duration-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            disabled={isLoading || isTyping}
          />
          <button
            type="submit"
            disabled={isLoading || isTyping}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 transition-all duration-200 transform hover:scale-105 active:scale-95"
          >
            Send
          </button>
        </form>

        {messages.length > 0 && (
          <button
            onClick={clearMessages}
            className="mt-4 text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors duration-200"
          >
            履歴をクリア
          </button>
        )}
      </div>
    </div>
  );
}
