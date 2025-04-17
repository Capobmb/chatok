"use client";

import { useEffect, useRef } from "react";

export const useAutoScroll = (dependencies: any[]) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, dependencies);

  return { messagesEndRef };
}; 