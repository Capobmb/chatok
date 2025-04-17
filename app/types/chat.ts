export type Message = {
  role: "user" | "assistant";
  content: string;
};

export type ChatState = {
  messages: Message[];
  input: string;
  isLoading: boolean;
  typingText: string;
  isTyping: boolean;
}; 