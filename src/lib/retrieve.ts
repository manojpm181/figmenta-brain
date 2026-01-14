import { supabase } from "./supabase";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

export async function retrieveContext(query: string): Promise<string> {
  const embedding = await openai.embeddings.create({
    model: "text-embedding-3-small",
    input: query,
  });

  const { data } = await supabase.rpc("match_documents", {
    query_embedding: embedding.data[0].embedding,
    match_count: 5,
  });

  if (!data) return "";

  return data.map((d: { content: string }) => d.content).join("\n");
}
