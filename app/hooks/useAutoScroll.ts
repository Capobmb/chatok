"use client";

import { useEffect, useRef } from "react";
import { Message } from "../types/chat";

type AutoScrollDependencies = {
  messages: Message[];
  isTyping: boolean;
};

export const useAutoScroll = ({ messages, isTyping }: AutoScrollDependencies) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  return { messagesEndRef };
}; 