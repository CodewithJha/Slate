import { z } from "zod";

export const RiskLevel = z.enum(["Low", "Moderate", "High"]);
export type RiskLevel = z.infer<typeof RiskLevel>;

export const AnalysisSection = z.object({
  label: z.string(),
  score: RiskLevel,
  points: z.array(z.string()),
});
export type AnalysisSection = z.infer<typeof AnalysisSection>;

export const AnalysisResult = z.object({
  overallRisk: RiskLevel,
  summary: z.string(),
  redFlags: z.array(z.string()),
  missingClarity: z.array(z.string()),
  questionsToAsk: z.array(z.string()),
  sections: z.object({
    compensation: AnalysisSection,
    roleClarity: AnalysisSection,
    legalClarity: AnalysisSection,
    growthPotential: AnalysisSection,
    riskSignals: AnalysisSection,
  }),
});
export type AnalysisResult = z.infer<typeof AnalysisResult>;

export interface SavedAnalysis {
  id: string;
  input_text: string;
  result: AnalysisResult;
  created_at: string;
}
