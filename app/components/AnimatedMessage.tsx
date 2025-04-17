"use client";

import { useEffect, useState } from "react";
import type { Message } from "../types/chat";

type Props = {
  message: Message;
};

export const AnimatedMessage = ({ message }: Props) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div
      className={`mb-4 p-3 rounded-lg transition-all duration-500 transform ${
        message.role === "user"
          ? "bg-blue-100 dark:bg-blue-900 ml-auto max-w-[80%]"
          : "bg-gray-100 dark:bg-gray-700 max-w-[80%]"
      } ${
        isVisible
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-4"
      }`}
    >
      <p className="text-gray-800 dark:text-white">{message.content}</p>
    </div>
  );
}; 