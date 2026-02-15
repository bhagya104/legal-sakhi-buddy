import { useState } from "react";
import { Send } from "lucide-react";

interface ChatInputProps {
  onSend: (message: string) => void;
  disabled?: boolean;
}

export function ChatInput({ onSend, disabled }: ChatInputProps) {
  const [input, setInput] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || disabled) return;
    onSend(input);
    setInput("");
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-3 items-end">
      <div className="flex-1 relative">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              handleSubmit(e);
            }
          }}
          placeholder="Tell me what happened…"
          disabled={disabled}
          rows={1}
          className="w-full resize-none rounded-xl border border-border bg-background px-4 py-3 pr-12 text-sm
            placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/50
            disabled:opacity-50 font-sans min-h-[48px] max-h-[120px]"
          style={{ fieldSizing: "content" } as React.CSSProperties}
        />
      </div>
      <button
        type="submit"
        disabled={disabled || !input.trim()}
        className="h-12 w-12 rounded-xl gradient-saffron shadow-saffron flex items-center justify-center
          text-accent-foreground transition-all hover:scale-105 active:scale-95
          disabled:opacity-40 disabled:hover:scale-100 disabled:shadow-none flex-shrink-0"
      >
        <Send className="w-5 h-5" />
      </button>
    </form>
  );
}
