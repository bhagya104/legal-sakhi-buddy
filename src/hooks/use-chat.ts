import { useState, useRef, useCallback } from "react";
import { streamChat } from "@/lib/chat-stream";

export type Message = {
  id: string;
  role: "user" | "assistant";
  content: string;
};

export function useChat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const assistantContentRef = useRef("");

  const sendMessage = useCallback(async (input: string) => {
    if (!input.trim() || isLoading) return;

    const userMsg: Message = {
      id: crypto.randomUUID(),
      role: "user",
      content: input.trim(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setIsLoading(true);
    setError(null);
    assistantContentRef.current = "";

    const apiMessages = [...messages, userMsg].map((m) => ({
      role: m.role,
      content: m.content,
    }));

    try {
      await streamChat({
        messages: apiMessages,
        onDelta: (chunk) => {
          assistantContentRef.current += chunk;
          const currentContent = assistantContentRef.current;
          setMessages((prev) => {
            const last = prev[prev.length - 1];
            if (last?.role === "assistant") {
              return prev.map((m, i) =>
                i === prev.length - 1 ? { ...m, content: currentContent } : m
              );
            }
            return [
              ...prev,
              { id: crypto.randomUUID(), role: "assistant", content: currentContent },
            ];
          });
        },
        onDone: () => setIsLoading(false),
        onError: (err) => {
          setError(err);
          setIsLoading(false);
        },
      });
    } catch {
      setError("Connection failed. Please check your internet and try again.");
      setIsLoading(false);
    }
  }, [messages, isLoading]);

  const clearChat = useCallback(() => {
    setMessages([]);
    setError(null);
  }, []);

  return { messages, isLoading, error, sendMessage, clearChat };
}
