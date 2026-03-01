import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { buildPrompt, parseAnalysisResponse } from "@/lib/prompt";
import { supabase } from "@/lib/supabase";
import { v4 as uuidv4 } from "uuid";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { text } = body;

    if (!text || typeof text !== "string") {
      return NextResponse.json(
        { error: "Please provide offer text to analyze." },
        { status: 400 }
      );
    }

    if (text.trim().length < 30) {
      return NextResponse.json(
        { error: "Please provide more detail — at least a few sentences." },
        { status: 400 }
      );
    }

    // Call Gemini API
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const prompt = buildPrompt(text.trim());

    const result = await model.generateContent(prompt);
    const response = result.response;
    const responseText = response.text();

    // Parse and validate the response
    const analysis = parseAnalysisResponse(responseText);

    // Generate a unique ID for this analysis
    const id = uuidv4();

    // Save to Supabase
    const { error: dbError } = await supabase.from("analyses").insert({
      id,
      input_text: text.trim(),
      result: analysis,
      created_at: new Date().toISOString(),
    });

    if (dbError) {
      console.error("Supabase insert error:", dbError);
      // Still return the analysis even if save fails
      // but use a temporary in-memory approach
      return NextResponse.json({
        id,
        result: analysis,
        saved: false,
      });
    }

    return NextResponse.json({
      id,
      result: analysis,
      saved: true,
    });
  } catch (error) {
    console.error("Analysis error:", error);
    return NextResponse.json(
      { error: "Analysis failed. Please try again in a moment." },
      { status: 500 }
    );
  }
}
