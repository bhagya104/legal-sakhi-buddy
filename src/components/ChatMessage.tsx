import ReactMarkdown from "react-markdown";
import { motion } from "framer-motion";
import type { Message } from "@/hooks/use-chat";

interface ChatMessageProps {
  message: Message;
  isLatest?: boolean;
}

export function ChatMessage({ message, isLatest }: ChatMessageProps) {
  const isUser = message.role === "user";

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`flex ${isUser ? "justify-end" : "justify-start"} mb-4`}
    >
      {!isUser && (
        <div className="w-8 h-8 rounded-full gradient-saffron flex items-center justify-center mr-3 mt-1 flex-shrink-0">
          <span className="text-sm font-bold text-accent-foreground">स</span>
        </div>
      )}
      <div
        className={`max-w-[80%] rounded-2xl px-4 py-3 ${
          isUser
            ? "bg-primary text-primary-foreground rounded-br-md"
            : "bg-card text-card-foreground shadow-card rounded-bl-md"
        }`}
      >
        {isUser ? (
          <p className="text-sm leading-relaxed font-sans">{message.content}</p>
        ) : (
          <div className="prose prose-sm max-w-none text-card-foreground font-sans
            prose-headings:font-display prose-headings:text-foreground prose-headings:mt-4 prose-headings:mb-2
            prose-h3:text-base prose-h3:font-semibold
            prose-p:leading-relaxed prose-p:mb-2
            prose-li:leading-relaxed
            prose-strong:text-foreground
            prose-a:text-accent prose-a:no-underline hover:prose-a:underline
          ">
            <ReactMarkdown>{message.content}</ReactMarkdown>
          </div>
        )}
      </div>
    </motion.div>
  );
}

export function TypingIndicator() {
  return (
    <div className="flex justify-start mb-4">
      <div className="w-8 h-8 rounded-full gradient-saffron flex items-center justify-center mr-3 flex-shrink-0">
        <span className="text-sm font-bold text-accent-foreground">स</span>
      </div>
      <div className="bg-card rounded-2xl rounded-bl-md px-5 py-4 shadow-card">
        <div className="flex gap-1.5">
          <div className="w-2 h-2 rounded-full bg-muted-foreground animate-typing-dot-1" />
          <div className="w-2 h-2 rounded-full bg-muted-foreground animate-typing-dot-2" />
          <div className="w-2 h-2 rounded-full bg-muted-foreground animate-typing-dot-3" />
        </div>
      </div>
    </div>
  );
}
