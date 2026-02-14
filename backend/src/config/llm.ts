import { GoogleGenerativeAI } from "@google/generative-ai";
import { env } from "./env";

const genAI = new GoogleGenerativeAI(env.GEMINI_API_KEY);

export const chatModel = genAI.getGenerativeModel({
  model: env.GEMINI_MODEL,
});

export const embeddingModel = genAI.getGenerativeModel({
  model: "gemini-embedding-001",
});

export async function generateEmbedding(text: string): Promise<number[]> {
  const result = await embeddingModel.embedContent(text);
  return result.embedding.values;
}

export async function checkLLMHealth(): Promise<string> {
  try {
    const result = await chatModel.generateContent("Say OK");
    const text = result.response.text();
    return text ? "reachable✅" : "unreachable❌";
  } catch (error) {
    return "unreachable❌";
  }
}
