import pdf from "pdf-parse";

export async function extractTextFromPDF(file: Buffer): Promise<string> {
  const data = await pdf(file);
  return data.text.replace(/\s+/g, " ").trim();
}

export function chunkText(text: string, chunkSize = 1200): string[] {
  const chunks: string[] = [];
  let start = 0;

  while (start < text.length) {
    chunks.push(text.slice(start, start + chunkSize));
    start += chunkSize;
  }

  return chunks.slice(0, 5); // HARD LIMIT → enterprise guardrail
}
