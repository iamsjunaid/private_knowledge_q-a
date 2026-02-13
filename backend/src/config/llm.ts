import { GoogleGenerativeAI } from '@google/generative-ai';
import { env } from './env';

const genAI = new GoogleGenerativeAI(env.GEMINI_API_KEY);

export const model = genAI.getGenerativeModel({
  model: env.GEMINI_MODEL,
});

export async function checkLLMHealth(): Promise<string> {
  try {
    const result = await model.generateContent('Say OK');
    const text = result.response.text();

    return text ? 'reachable' : 'unreachable';
  } catch (error) {
    console.error('LLM health check failed:', error);
    return 'unreachable';
  }
}
