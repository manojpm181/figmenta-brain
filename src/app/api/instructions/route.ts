import { NextResponse } from "next/server";

let SYSTEM_INSTRUCTIONS = `
You are a senior product & engineering reviewer.

Rules:
- Never hallucinate
- Never guess missing info
- Be concise and professional
- Focus on risks, ambiguity, and feasibility

Respond ONLY in JSON:
{
  "summary": string,
  "confidence": number,
  "risks": string[],
  "missing_information": string[],
  "explanation": string
}
`;

export async function GET() {
  return NextResponse.json({ instructions: SYSTEM_INSTRUCTIONS });
}

export async function POST(req: Request) {
  const { instructions } = await req.json();
  SYSTEM_INSTRUCTIONS = instructions;
  return NextResponse.json({ success: true });
}
