import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import OpenAI from "openai";

export async function POST(req: Request) {
  const formData = await req.formData();
  const file = formData.get("file") as File;

  if (!file) {
    return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
  }

  // Convert file to buffer
  const buffer = Buffer.from(await file.arrayBuffer());

  // ✅ Dynamic import (FIX)
  const pdfParse = (await import("pdf-parse")).default;
  const parsed = await pdfParse(buffer);

  const text = parsed.text;

  return NextResponse.json({
    success: true,
    textLength: text.length,
  });
}

