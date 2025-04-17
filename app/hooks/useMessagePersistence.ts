"use client";

import { useState, useEffect } from "react";
import type { Message } from "../types/chat";

export const useMessagePersistence = () => {
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    const savedMessages = localStorage.getItem("chatMessages");
    if (savedMessages) {
      setMessages(JSON.parse(savedMessages));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("chatMessages", JSON.stringify(messages));
  }, [messages]);

  const clearMessages = () => {
    localStorage.removeItem("chatMessages");
    setMessages([]);
  };

  return { messages, setMessages, clearMessages };
}; 