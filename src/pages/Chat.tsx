import { useRef, useEffect } from "react";
import { useChat } from "@/hooks/use-chat";
import { ChatMessage, TypingIndicator } from "@/components/ChatMessage";
import { ChatInput } from "@/components/ChatInput";
import { QuickPrompts } from "@/components/QuickPrompts";
import { motion } from "framer-motion";
import { ArrowLeft, Trash2, Shield } from "lucide-react";
import { Link } from "react-router-dom";

const Chat = () => {
  const { messages, isLoading, error, sendMessage, clearChat } = useChat();
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const isEmpty = messages.length === 0;

  return (
    <div className="flex flex-col h-screen bg-background">
      {/* Header */}
      <header className="flex items-center gap-3 px-4 py-3 border-b border-border bg-card/80 backdrop-blur-sm">
        <Link
          to="/"
          className="w-9 h-9 rounded-lg flex items-center justify-center hover:bg-secondary transition-colors"
        >
          <ArrowLeft className="w-5 h-5 text-foreground" />
        </Link>
        <div className="w-9 h-9 rounded-full gradient-saffron flex items-center justify-center">
          <span className="text-sm font-bold text-accent-foreground">स</span>
        </div>
        <div className="flex-1">
          <h1 className="text-sm font-semibold text-foreground font-sans">Legal Sakhi</h1>
          <p className="text-xs text-muted-foreground font-sans">Legal awareness assistant</p>
        </div>
        {messages.length > 0 && (
          <button
            onClick={clearChat}
            className="w-9 h-9 rounded-lg flex items-center justify-center hover:bg-secondary transition-colors"
            title="Clear chat"
          >
            <Trash2 className="w-4 h-4 text-muted-foreground" />
          </button>
        )}
      </header>

      {/* Messages */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-6">
        {isEmpty ? (
          <div className="flex flex-col items-center justify-center h-full">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="text-center mb-8"
            >
              <div className="w-16 h-16 rounded-2xl gradient-saffron shadow-saffron flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-accent-foreground font-display">स</span>
              </div>
              <h2 className="text-xl font-display font-semibold text-foreground mb-2">
                Namaste! I'm Legal Sakhi
              </h2>
              <p className="text-sm text-muted-foreground max-w-md font-sans">
                I help you understand your legal rights in plain language. Tell me what happened, and I'll guide you step by step.
              </p>
            </motion.div>
            <QuickPrompts onSelect={sendMessage} />
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="mt-8 flex items-center gap-2 text-xs text-muted-foreground font-sans"
            >
              <Shield className="w-3.5 h-3.5" />
              <span>I provide legal awareness, not legal advice</span>
            </motion.div>
          </div>
        ) : (
          <div className="max-w-2xl mx-auto">
            {messages.map((msg) => (
              <ChatMessage key={msg.id} message={msg} />
            ))}
            {isLoading && !messages.find((m) => m.role === "assistant" && m === messages[messages.length - 1]) && (
              <TypingIndicator />
            )}
            {error && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-3"
              >
                <p className="text-sm text-destructive font-sans">{error}</p>
              </motion.div>
            )}
          </div>
        )}
      </div>

      {/* Input */}
      <div className="border-t border-border bg-card/80 backdrop-blur-sm px-4 py-3">
        <div className="max-w-2xl mx-auto">
          <ChatInput onSend={sendMessage} disabled={isLoading} />
        </div>
      </div>
    </div>
  );
};

export default Chat;
