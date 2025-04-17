"use client";

import type { Message } from "../types/chat";

type Props = {
  message: Message;
};

export const ChatMessage = ({ message }: Props) => {
  return (
    <div
      className={`mb-4 p-3 rounded-lg ${
        message.role === "user"
          ? "bg-blue-100 dark:bg-blue-900 ml-auto max-w-[80%]"
          : "bg-gray-100 dark:bg-gray-700 max-w-[80%]"
      }`}
    >
      <p className="text-gray-800 dark:text-white">{message.content}</p>
    </div>
  );
}; 