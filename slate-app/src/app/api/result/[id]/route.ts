import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

type RouteContext = { params: { id: string } };

export async function GET(_req: NextRequest, { params }: RouteContext) {
  try {
    const { id } = params;

    if (!id) {
      return NextResponse.json({ error: "Missing analysis ID" }, { status: 400 });
    }

    // Skip Supabase if not configured (prevents hanging on invalid URL)
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    if (!supabaseUrl || supabaseUrl.includes("your_") || supabaseUrl.length < 10) {
      return NextResponse.json({ error: "Analysis not found" }, { status: 404 });
    }

    const { data, error } = await supabase
      .from("analyses")
      .select("id, input_text, result, created_at")
      .eq("id", id)
      .single();

    if (error || !data) {
      return NextResponse.json({ error: "Analysis not found" }, { status: 404 });
    }

    return NextResponse.json(data);
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch analysis" },
      { status: 500 }
    );
  }
}
