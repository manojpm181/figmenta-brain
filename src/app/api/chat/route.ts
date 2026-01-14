import { NextResponse } from "next/server";
import OpenAI from "openai";
import { retrieveContext } from "@/lib/retrieve";

export const runtime = "nodejs";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const message = body.message;

    if (!message) {
      return NextResponse.json(
        { error: "Message is required" },
        { status: 400 }
      );
    }

    let context = "";
    try {
      context = await retrieveContext(message);
    } catch (e) {
      console.error("RAG retrieval failed:", e);
      context = "";
    }

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: `
You are a senior AI design reviewer.
If context is provided, use it.
If not, say clearly that no document context was found.

Context:
${context || "NO CONTEXT AVAILABLE"}
          `,
        },
        { role: "user", content: message },
      ],
    });

    return NextResponse.json({
      answer: completion.choices[0].message.content ?? "",
      confidence: context ? 0.9 : 0.6,
      source: context ? "PDF Knowledge Base" : "General Reasoning",
    });
  } catch (error: any) {
    console.error("CHAT API ERROR:", error);

    return NextResponse.json(
      {
        answer:
          "⚠️ The AI service encountered an error. Please try again.",
        confidence: 0.0,
        source: "system-error",
      },
      { status: 500 }
    );
  }
}
