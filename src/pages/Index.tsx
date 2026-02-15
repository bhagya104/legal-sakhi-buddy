import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  MessageCircle,
  Shield,
  MapPin,
  ClipboardCheck,
  Languages,
  TrendingUp,
  Heart,
  Scale,
} from "lucide-react";

const features = [
  {
    icon: MessageCircle,
    title: "Situation-Based Help",
    desc: "Tell us what happened — we ask smart questions and guide you step by step.",
  },
  {
    icon: MapPin,
    title: "State-Specific Laws",
    desc: "Answers adapt to your state — tenancy, labor, and police procedures differ.",
  },
  {
    icon: ClipboardCheck,
    title: "Actionable Checklists",
    desc: "Get next steps, documents needed, time limits, and ready-to-use templates.",
  },
  {
    icon: Languages,
    title: "Plain Language First",
    desc: "We explain in simple words, then add legal terms — no jargon upfront.",
  },
  {
    icon: TrendingUp,
    title: "Confidence Scoring",
    desc: "Know the strength of your case — high, medium, or low — with reasons.",
  },
  {
    icon: Heart,
    title: "Prevention Mode",
    desc: "Learn what to check before signing agreements, joining jobs, or sharing data.",
  },
];

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 gradient-hero opacity-95" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_80%,hsl(28_85%_55%_/_0.12),transparent_50%)]" />
        <div className="relative z-10 container mx-auto px-6 py-20 md:py-32">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="max-w-2xl"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl gradient-saffron shadow-saffron flex items-center justify-center">
                <span className="text-xl font-bold text-accent-foreground font-display">स</span>
              </div>
              <span className="text-primary-foreground/70 text-sm font-sans font-medium tracking-wide uppercase">
                Legal Sakhi · लीगल सखी
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-primary-foreground leading-tight mb-6">
              Your Legal Rights,{" "}
              <span className="text-gradient-saffron">Simply Explained</span>
            </h1>
            <p className="text-lg text-primary-foreground/75 font-sans leading-relaxed mb-8 max-w-xl">
              Don't search for sections and acts. Just tell us what happened — we'll explain your rights, guide your next steps, and help you act.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/chat"
                className="inline-flex items-center justify-center gap-2 rounded-xl gradient-saffron shadow-saffron
                  px-8 py-4 text-base font-semibold text-accent-foreground
                  hover:scale-105 active:scale-95 transition-transform font-sans"
              >
                <MessageCircle className="w-5 h-5" />
                Start a Conversation
              </Link>
              <a
                href="#features"
                className="inline-flex items-center justify-center rounded-xl border border-primary-foreground/20
                  px-8 py-4 text-base font-medium text-primary-foreground/80
                  hover:bg-primary-foreground/5 transition-colors font-sans"
              >
                Learn More
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Disclaimer Banner */}
      <section className="bg-card border-b border-border">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center gap-3 justify-center">
            <Shield className="w-4 h-4 text-accent flex-shrink-0" />
            <p className="text-sm text-muted-foreground font-sans text-center">
              Legal Sakhi provides <strong className="text-foreground">legal awareness</strong>, not legal advice. Always consult a lawyer for your specific case.
            </p>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="container mx-auto px-6 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
            Built to Actually <span className="text-gradient-saffron">Help You</span>
          </h2>
          <p className="text-muted-foreground font-sans max-w-lg mx-auto">
            Not another legal dictionary. Legal Sakhi reasons about your situation and gives you actionable guidance.
          </p>
        </motion.div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="rounded-2xl border border-border bg-card p-6 shadow-card hover:shadow-elevated transition-shadow"
            >
              <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center mb-4">
                <f.icon className="w-5 h-5 text-accent" />
              </div>
              <h3 className="text-lg font-display font-semibold text-foreground mb-2">{f.title}</h3>
              <p className="text-sm text-muted-foreground font-sans leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Emergency */}
      <section className="container mx-auto px-6 pb-20">
        <div className="rounded-2xl bg-destructive/5 border border-destructive/20 p-8">
          <div className="flex items-start gap-4">
            <Scale className="w-6 h-6 text-destructive flex-shrink-0 mt-1" />
            <div>
              <h3 className="text-lg font-display font-semibold text-foreground mb-3">
                In Immediate Danger?
              </h3>
              <div className="grid sm:grid-cols-2 gap-3 font-sans text-sm">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-foreground">Women Helpline:</span>
                  <span className="text-muted-foreground">181</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-foreground">Police:</span>
                  <span className="text-muted-foreground">100</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-foreground">NCW:</span>
                  <span className="text-muted-foreground">7827-170-170</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-foreground">Mental Health (iCALL):</span>
                  <span className="text-muted-foreground">9152987821</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8">
        <div className="container mx-auto px-6 text-center">
          <p className="text-sm text-muted-foreground font-sans">
            © 2026 Legal Sakhi · Built for legal awareness in India
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
