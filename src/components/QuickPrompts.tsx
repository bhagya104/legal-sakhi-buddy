import { motion } from "framer-motion";

interface QuickPromptProps {
  onSelect: (prompt: string) => void;
}

const prompts = [
  { emoji: "🏠", text: "My landlord won't return my deposit" },
  { emoji: "💼", text: "My employer hasn't paid my salary" },
  { emoji: "👩", text: "I'm facing harassment at workplace" },
  { emoji: "📱", text: "Someone is threatening me online" },
  { emoji: "📝", text: "I need help before signing a rental agreement" },
  { emoji: "⚖️", text: "I want to file an RTI application" },
];

export function QuickPrompts({ onSelect }: QuickPromptProps) {
  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground text-center font-sans">
        Tell me what happened, or pick a common situation:
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-lg mx-auto">
        {prompts.map((p, i) => (
          <motion.button
            key={i}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: i * 0.08 }}
            onClick={() => onSelect(p.text)}
            className="flex items-center gap-3 rounded-xl border border-border bg-card px-4 py-3
              text-left text-sm text-card-foreground shadow-card hover:shadow-elevated
              hover:border-accent/50 transition-all duration-200 font-sans group"
          >
            <span className="text-lg group-hover:scale-110 transition-transform">{p.emoji}</span>
            <span>{p.text}</span>
          </motion.button>
        ))}
      </div>
    </div>
  );
}
