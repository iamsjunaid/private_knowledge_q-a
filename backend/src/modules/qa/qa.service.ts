import { generateEmbedding, chatModel } from '../../config/llm';
import { findTopChunks } from '../../services/vector.service';

export async function answerQuestion(question: string) {
  if (!question) {
    throw { status: 400, message: 'Question is required' };
  }

  // Step 1: Embed question
  const queryEmbedding = await generateEmbedding(question);

  // Step 2: Retrieve relevant chunks
  const topChunks = await findTopChunks(queryEmbedding, 3);

  if (topChunks.length === 0) {
    return {
      answer: 'No relevant documents found.',
      sources: [],
    };
  }

  // Step 3: Build context
  const context = topChunks
    .map((chunk, i) => `Source ${i + 1}:\n${chunk.content}`)
    .join('\n\n');

  const prompt = `
You are answering based only on the provided sources.

Sources:
${context}

Question:
${question}

Answer clearly and concisely.
Also mention which source number you used.
`;

  // Step 4: Ask Gemini
  const result = await chatModel.generateContent(prompt);
  const answer = result.response.text();

  return {
    answer,
    sources: topChunks.map((chunk, index) => ({
      sourceNumber: index + 1,
      documentId: chunk.document_id,
      excerpt: chunk.content.slice(0, 300),
      similarityScore: chunk.score,
    })),
  };
}
