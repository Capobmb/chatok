"use client";

type Props = {
  text: string;
};

export const TypingIndicator = ({ text }: Props) => {
  return (
    <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded-lg max-w-[80%]">
      <div className="flex items-center gap-2">
        <div className="flex space-x-1">
          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
        </div>
        <p className="text-gray-800 dark:text-white">
          {text}<span className="animate-pulse">|</span>
        </p>
      </div>
    </div>
  );
}; 