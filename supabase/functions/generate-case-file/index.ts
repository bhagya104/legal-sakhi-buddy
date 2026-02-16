import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const SYSTEM_PROMPT = `You are Legal Sakhi's Case File Generator. You create structured, professional legal case files for Indian citizens based on the information they provide.

## Output Format
Generate a case file in clean markdown with the following sections, each with a heading:

# 📋 Case File: [Generated Case Title]

## 1. Case Summary
Write a clear, concise summary in simple legal language (2-3 paragraphs). Use plain language first, then mention legal terms.

## 2. Timeline of Events
Chronological bullet points of key events based on the user's description. If dates are approximate, label them as such.

## 3. Applicable Laws & Sections
List relevant Indian laws with simplified explanations. Format: "**[Act/Section]** — [Plain language explanation]"

## 4. Your Rights
Bullet points of the user's legal rights in this situation.

## 5. Recommended Legal Actions
Numbered step-by-step actions with specifics:
- WHERE to file (specific authority)
- Documents needed
- Time limits / limitation periods
- Cost estimates if applicable

## 6. Evidence Checklist
A checkbox-style checklist of evidence the user should gather:
- [ ] Item 1
- [ ] Item 2

## 7. Draft Complaint / Application
A ready-to-use draft complaint or application text with placeholders like [YOUR NAME], [DATE], etc.

## 8. Precautions & Legal Warnings
- What NOT to do
- Common mistakes
- When to avoid certain actions

## 9. ⚖️ Disclaimer
"This case file is generated for legal awareness purposes only. It does not constitute legal advice. Please consult a qualified lawyer or your nearest Legal Services Authority for professional guidance on your specific case."

## Rules
- Use clear, non-technical language throughout
- Be empathetic and supportive in tone
- Focus exclusively on Indian laws
- Do NOT predict case outcomes
- If details are missing, make reasonable assumptions and CLEARLY label them as "[Assumed based on typical cases]"
- Be thorough but concise
- Use bullet points extensively for readability`;

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { formData } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY is not configured");

    const userPrompt = `Generate a legal case file based on the following details:

**Type of Legal Issue:** ${formData.issueType}
**Date of Incident:** ${formData.incidentDate || "Not specified"}
**Location:** ${formData.location || "Not specified"}
**State:** ${formData.state || "Not specified"}
**Parties Involved:** ${formData.partiesInvolved || "Not specified"}
**Description of What Happened:** ${formData.description}
**Evidence Available:** ${formData.evidenceAvailable || "Not specified"}
**Action Already Taken:** ${formData.actionTaken || "None"}

Please generate a comprehensive, structured case file.`;

    const response = await fetch(
      "https://ai.gateway.lovable.dev/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${LOVABLE_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "google/gemini-3-flash-preview",
          messages: [
            { role: "system", content: SYSTEM_PROMPT },
            { role: "user", content: userPrompt },
          ],
          stream: true,
        }),
      }
    );

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "Rate limit exceeded. Please try again in a moment." }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: "Service temporarily unavailable. Please try again later." }),
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      const t = await response.text();
      console.error("AI gateway error:", response.status, t);
      return new Response(
        JSON.stringify({ error: "AI service error" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    return new Response(response.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (e) {
    console.error("case-file error:", e);
    return new Response(
      JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
