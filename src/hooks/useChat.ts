import { useState } from 'react';
import { getLegalAdvice } from '../lib/gemini';

interface Message {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: Date;
}

export function useChat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const sendMessage = async (content: string) => {
    try {
      setIsLoading(true);

      // Add user message
      const userMessage: Message = {
        id: Date.now().toString(),
        content,
        role: 'user',
        timestamp: new Date(),
      };
      setMessages((prev: Message[]) => [...prev, userMessage]);

      // Get AI response
      const response = await getLegalAdvice(content);

      // Add AI message
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: response,
        role: 'assistant',
        timestamp: new Date(),
      };
      setMessages((prev: Message[]) => [...prev, aiMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const clearMessages = () => {
    setMessages([]);
  };

  return {
    messages,
    isLoading,
    sendMessage,
    clearMessages,
  };
}