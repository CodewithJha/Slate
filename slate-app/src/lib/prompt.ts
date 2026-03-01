import { AnalysisResult } from "./types";

export function buildPrompt(offerText: string): string {
  return `You are an expert career advisor specializing in analyzing internship and fresher job offers. Analyze the following offer/job description and provide a structured evaluation.

OFFER TEXT:
"""
${offerText}
"""

Respond ONLY with a valid JSON object matching this exact structure (no markdown, no code fences, just raw JSON):

{
  "overallRisk": "Low" | "Moderate" | "High",
  "summary": "A 2-3 sentence plain-language summary of the offer quality",
  "redFlags": ["array of specific red flags detected, be specific and reference the text"],
  "missingClarity": ["array of things that are unclear or missing from the offer"],
  "questionsToAsk": ["array of specific questions the candidate should ask the employer"],
  "sections": {
    "compensation": {
      "label": "Compensation Clarity",
      "score": "Low" | "Moderate" | "High",
      "points": ["specific observations about compensation"]
    },
    "roleClarity": {
      "label": "Role Clarity",
      "score": "Low" | "Moderate" | "High",
      "points": ["specific observations about role definition"]
    },
    "legalClarity": {
      "label": "Legal Clarity",
      "score": "Low" | "Moderate" | "High",
      "points": ["specific observations about legal aspects, bonds, agreements"]
    },
    "growthPotential": {
      "label": "Growth Potential",
      "score": "Low" | "Moderate" | "High",
      "points": ["specific observations about learning/growth opportunities"]
    },
    "riskSignals": {
      "label": "Risk Signals",
      "score": "Low" | "Moderate" | "High",
      "points": ["specific risk patterns detected"]
    }
  }
}

EVALUATION RULES:
- "score" in sections represents RISK level (Low = good/safe, High = dangerous/exploitative)
- Flag unpaid roles requiring full-time commitment as High risk
- Flag bonds without clear compensation as High risk
- Flag vague descriptions with high responsibility as Moderate+ risk
- Flag "performance-based" stipends without clear metrics as Moderate risk
- Flag missing written agreements as High risk
- Be specific — reference actual phrases from the text
- If compensation is not mentioned at all, flag it
- If the role scope is vague but expectations are high, flag it
- Keep each point concise (1-2 sentences max)
- Generate 3-5 questions the candidate should ask`;
}

const FALLBACK_RESULT: AnalysisResult = {
  overallRisk: "Moderate",
  summary: "Unable to fully analyze this offer. The text provided may be too short or unclear for a comprehensive evaluation.",
  redFlags: ["Could not perform complete analysis — review the offer carefully yourself"],
  missingClarity: ["Provide more details about the offer for a thorough analysis"],
  questionsToAsk: [
    "What is the exact compensation structure?",
    "Is there a written offer letter or agreement?",
    "What are the specific responsibilities and expectations?",
    "What is the duration and notice period?",
    "Are there any bond or lock-in clauses?"
  ],
  sections: {
    compensation: { label: "Compensation Clarity", score: "Moderate", points: ["Insufficient information to evaluate"] },
    roleClarity: { label: "Role Clarity", score: "Moderate", points: ["Insufficient information to evaluate"] },
    legalClarity: { label: "Legal Clarity", score: "Moderate", points: ["Insufficient information to evaluate"] },
    growthPotential: { label: "Growth Potential", score: "Moderate", points: ["Insufficient information to evaluate"] },
    riskSignals: { label: "Risk Signals", score: "Moderate", points: ["Insufficient information to evaluate"] },
  },
};

export function parseAnalysisResponse(text: string): AnalysisResult {
  try {
    // Try to extract JSON from the response
    let jsonStr = text.trim();

    // Remove markdown code fences if present
    const jsonMatch = jsonStr.match(/```(?:json)?\s*([\s\S]*?)```/);
    if (jsonMatch) {
      jsonStr = jsonMatch[1].trim();
    }

    // Try to find JSON object
    const objStart = jsonStr.indexOf("{");
    const objEnd = jsonStr.lastIndexOf("}");
    if (objStart !== -1 && objEnd !== -1) {
      jsonStr = jsonStr.slice(objStart, objEnd + 1);
    }

    const parsed = JSON.parse(jsonStr);

    // Validate with Zod
    const result = AnalysisResult.safeParse(parsed);
    if (result.success) {
      return result.data;
    }

    console.error("Zod validation failed:", result.error);
    // Try to salvage what we can
    return {
      ...FALLBACK_RESULT,
      summary: parsed.summary || FALLBACK_RESULT.summary,
      redFlags: Array.isArray(parsed.redFlags) ? parsed.redFlags : FALLBACK_RESULT.redFlags,
      overallRisk: ["Low", "Moderate", "High"].includes(parsed.overallRisk) ? parsed.overallRisk : "Moderate",
    };
  } catch (error) {
    console.error("Failed to parse AI response:", error);
    return FALLBACK_RESULT;
  }
}
