"use client";

import { useState } from "react";

export const useTypingAnimation = () => {
  const [typingText, setTypingText] = useState("");
  const [isTyping, setIsTyping] = useState(false);

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

  return { typingText, isTyping, simulateTyping };
}; 