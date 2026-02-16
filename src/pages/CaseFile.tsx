import { useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  FileText,
  Copy,
  Download,
  Edit3,
  Check,
  Loader2,
  ChevronRight,
  Shield,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import ReactMarkdown from "react-markdown";
import { streamCaseFile, type CaseFormData } from "@/lib/generate-case-file";
import { useToast } from "@/hooks/use-toast";

const ISSUE_TYPES = [
  "Salary not paid / Wage theft",
  "Workplace harassment",
  "Sexual harassment at workplace",
  "Domestic violence",
  "Cybercrime / Online fraud",
  "Tenant-landlord dispute",
  "Property dispute",
  "Consumer complaint",
  "Police complaint / FIR issues",
  "Wrongful termination",
  "Insurance claim rejected",
  "Education / University dispute",
  "Caste / Gender discrimination",
  "Other",
];

const INDIAN_STATES = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
  "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka",
  "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram",
  "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu",
  "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal",
  "Delhi", "Chandigarh", "Puducherry", "Jammu & Kashmir", "Ladakh",
];

const EVIDENCE_OPTIONS = [
  "Yes — Messages / Chats",
  "Yes — Emails",
  "Yes — Photos / Videos",
  "Yes — Documents / Agreements",
  "Yes — Witnesses available",
  "Yes — Multiple types of evidence",
  "No evidence currently",
  "Not sure",
];

const CaseFile = () => {
  const { toast } = useToast();
  const [step, setStep] = useState<"form" | "generating" | "result">("form");
  const [caseContent, setCaseContent] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState("");
  const [copied, setCopied] = useState(false);
  const contentRef = useRef("");

  const [form, setForm] = useState<CaseFormData>({
    issueType: "",
    incidentDate: "",
    location: "",
    state: "",
    partiesInvolved: "",
    description: "",
    evidenceAvailable: "",
    actionTaken: "",
  });

  const updateField = (field: keyof CaseFormData, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const canSubmit = form.issueType && form.description.trim().length >= 20;

  const handleGenerate = useCallback(async () => {
    if (!canSubmit) return;
    setStep("generating");
    setCaseContent("");
    contentRef.current = "";

    try {
      await streamCaseFile({
        formData: form,
        onDelta: (chunk) => {
          contentRef.current += chunk;
          setCaseContent(contentRef.current);
        },
        onDone: () => {
          setStep("result");
        },
        onError: (err) => {
          toast({ title: "Error", description: err, variant: "destructive" });
          setStep("form");
        },
      });
    } catch {
      toast({ title: "Error", description: "Connection failed. Please try again.", variant: "destructive" });
      setStep("form");
    }
  }, [form, canSubmit, toast]);

  const handleCopy = async () => {
    const text = isEditing ? editContent : caseContent;
    await navigator.clipboard.writeText(text);
    setCopied(true);
    toast({ title: "Copied!", description: "Case file copied to clipboard." });
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const text = isEditing ? editContent : caseContent;
    const blob = new Blob([text], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `Legal_Case_File_${new Date().toISOString().split("T")[0]}.md`;
    a.click();
    URL.revokeObjectURL(url);
    toast({ title: "Downloaded!", description: "Case file saved as markdown." });
  };

  const handleEdit = () => {
    setEditContent(caseContent);
    setIsEditing(true);
  };

  const handleSaveEdit = () => {
    setCaseContent(editContent);
    setIsEditing(false);
    toast({ title: "Saved", description: "Your edits have been saved." });
  };

  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Header */}
      <header className="flex items-center gap-3 px-4 py-3 border-b border-border bg-card/80 backdrop-blur-sm">
        <Link
          to="/"
          className="w-9 h-9 rounded-lg flex items-center justify-center hover:bg-secondary transition-colors"
        >
          <ArrowLeft className="w-5 h-5 text-foreground" />
        </Link>
        <div className="w-9 h-9 rounded-full gradient-saffron flex items-center justify-center">
          <FileText className="w-4 h-4 text-accent-foreground" />
        </div>
        <div className="flex-1">
          <h1 className="text-sm font-semibold text-foreground font-sans">Legal Case File Generator</h1>
          <p className="text-xs text-muted-foreground font-sans">Generate a structured case file</p>
        </div>
      </header>

      <div className="flex-1 overflow-y-auto">
        <div className="max-w-2xl mx-auto px-4 py-6">
          <AnimatePresence mode="wait">
            {/* FORM STEP */}
            {step === "form" && (
              <motion.div
                key="form"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-6"
              >
                <div className="text-center mb-8">
                  <div className="w-14 h-14 rounded-2xl gradient-saffron shadow-saffron flex items-center justify-center mx-auto mb-4">
                    <FileText className="w-7 h-7 text-accent-foreground" />
                  </div>
                  <h2 className="text-xl font-display font-semibold text-foreground mb-2">
                    Generate My Case File
                  </h2>
                  <p className="text-sm text-muted-foreground font-sans max-w-md mx-auto">
                    Fill in the details below. We'll create a professional, structured case file you can use with lawyers, police, or legal aid.
                  </p>
                </div>

                {/* Issue Type */}
                <div className="space-y-2">
                  <Label className="font-sans">Type of Legal Issue *</Label>
                  <Select value={form.issueType} onValueChange={(v) => updateField("issueType", v)}>
                    <SelectTrigger><SelectValue placeholder="Select issue type" /></SelectTrigger>
                    <SelectContent>
                      {ISSUE_TYPES.map((t) => (
                        <SelectItem key={t} value={t}>{t}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Date & Location row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="font-sans">Date of Incident</Label>
                    <Input
                      type="date"
                      value={form.incidentDate}
                      onChange={(e) => updateField("incidentDate", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="font-sans">City / Location</Label>
                    <Input
                      placeholder="e.g. Mumbai, Lucknow"
                      value={form.location}
                      onChange={(e) => updateField("location", e.target.value)}
                    />
                  </div>
                </div>

                {/* State */}
                <div className="space-y-2">
                  <Label className="font-sans">State</Label>
                  <Select value={form.state} onValueChange={(v) => updateField("state", v)}>
                    <SelectTrigger><SelectValue placeholder="Select state" /></SelectTrigger>
                    <SelectContent>
                      {INDIAN_STATES.map((s) => (
                        <SelectItem key={s} value={s}>{s}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Parties */}
                <div className="space-y-2">
                  <Label className="font-sans">Parties Involved</Label>
                  <Input
                    placeholder="e.g. Employer, Landlord, Individual, Unknown"
                    value={form.partiesInvolved}
                    onChange={(e) => updateField("partiesInvolved", e.target.value)}
                  />
                </div>

                {/* Description */}
                <div className="space-y-2">
                  <Label className="font-sans">What Happened? * (minimum 20 characters)</Label>
                  <Textarea
                    placeholder="Describe your situation in detail — what happened, when, and how it affected you..."
                    rows={5}
                    value={form.description}
                    onChange={(e) => updateField("description", e.target.value)}
                  />
                  <p className="text-xs text-muted-foreground font-sans">
                    {form.description.length}/20 characters minimum
                  </p>
                </div>

                {/* Evidence */}
                <div className="space-y-2">
                  <Label className="font-sans">Evidence Available</Label>
                  <Select value={form.evidenceAvailable} onValueChange={(v) => updateField("evidenceAvailable", v)}>
                    <SelectTrigger><SelectValue placeholder="Do you have evidence?" /></SelectTrigger>
                    <SelectContent>
                      {EVIDENCE_OPTIONS.map((e) => (
                        <SelectItem key={e} value={e}>{e}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Action taken */}
                <div className="space-y-2">
                  <Label className="font-sans">Action Already Taken (optional)</Label>
                  <Textarea
                    placeholder="e.g. Filed a complaint, spoke to HR, contacted police..."
                    rows={2}
                    value={form.actionTaken}
                    onChange={(e) => updateField("actionTaken", e.target.value)}
                  />
                </div>

                {/* Disclaimer */}
                <div className="flex items-start gap-2 p-3 rounded-lg bg-accent/5 border border-accent/20">
                  <Shield className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
                  <p className="text-xs text-muted-foreground font-sans">
                    This generates a legal awareness document, not legal advice. Always consult a lawyer for your specific case.
                  </p>
                </div>

                {/* Submit */}
                <Button
                  onClick={handleGenerate}
                  disabled={!canSubmit}
                  className="w-full gradient-saffron text-accent-foreground font-semibold h-12 rounded-xl shadow-saffron hover:scale-[1.02] active:scale-95 transition-transform"
                >
                  Generate My Case File
                  <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
              </motion.div>
            )}

            {/* GENERATING STEP */}
            {step === "generating" && (
              <motion.div
                key="generating"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <div className="flex items-center gap-3 mb-6 p-4 rounded-xl bg-accent/5 border border-accent/20">
                  <Loader2 className="w-5 h-5 text-accent animate-spin" />
                  <div>
                    <p className="text-sm font-semibold text-foreground font-sans">Generating your case file...</p>
                    <p className="text-xs text-muted-foreground font-sans">Analyzing laws and building your document</p>
                  </div>
                </div>
                <div className="prose prose-sm max-w-none dark:prose-invert font-sans">
                  <ReactMarkdown>{caseContent}</ReactMarkdown>
                </div>
              </motion.div>
            )}

            {/* RESULT STEP */}
            {step === "result" && (
              <motion.div
                key="result"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                {/* Actions bar */}
                <div className="flex flex-wrap gap-2 mb-6">
                  <Button variant="outline" size="sm" onClick={handleCopy}>
                    {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    {copied ? "Copied" : "Copy Text"}
                  </Button>
                  <Button variant="outline" size="sm" onClick={handleDownload}>
                    <Download className="w-4 h-4" />
                    Download
                  </Button>
                  {!isEditing ? (
                    <Button variant="outline" size="sm" onClick={handleEdit}>
                      <Edit3 className="w-4 h-4" />
                      Edit
                    </Button>
                  ) : (
                    <Button variant="default" size="sm" onClick={handleSaveEdit}>
                      <Check className="w-4 h-4" />
                      Save Edits
                    </Button>
                  )}
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => { setStep("form"); setCaseContent(""); setIsEditing(false); }}
                    className="ml-auto"
                  >
                    New Case File
                  </Button>
                </div>

                {isEditing ? (
                  <Textarea
                    className="min-h-[500px] font-mono text-sm"
                    value={editContent}
                    onChange={(e) => setEditContent(e.target.value)}
                  />
                ) : (
                  <div className="prose prose-sm max-w-none dark:prose-invert font-sans rounded-xl border border-border bg-card p-6">
                    <ReactMarkdown>{caseContent}</ReactMarkdown>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default CaseFile;
