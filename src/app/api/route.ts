import { NextResponse } from "next/server";
import pdf from "pdf-parse";
import { supabase } from "@/lib/supabase";
import OpenAI from "openai";

export const runtime = "nodejs";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

export async function POST(req: Request) {
  const formData = await req.formData();
  const file = formData.get("file") as File | null;

  if (!file) {
    return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
  }

  const buffer = Buffer.from(await file.arrayBuffer());
  const parsed = await pdf(buffer);

  const chunks = parsed.text
    .split("\n")
    .map((c: string) => c.trim())
    .filter(Boolean)
    .slice(0, 200);

  for (const chunk of chunks) {
    const embedding = await openai.embeddings.create({
      model: "text-embedding-3-small",
      input: chunk,
    });

    await supabase.from("documents").insert({
      content: chunk,
      embedding: embedding.data[0].embedding,
    });
  }

  return NextResponse.json({ success: true });
}
