import { generateEmbedding, chatModel } from '../../config/llm';
import { findTopChunks } from '../../services/vector.service';

export async function answerQuestion(question: string) {
  if (!question || question.trim().length === 0) {
    throw { status: 400, message: 'Question is required' };
  }

  const queryEmbedding = await generateEmbedding(question);

  const topChunks = await findTopChunks(queryEmbedding, 3);

  if (!topChunks || topChunks.length === 0) {
    return {
      answer: 'No documents available to answer this question.',
      sources: [],
    };
  }

  const context = topChunks
    .map(
      (chunk, i) =>
        `Source ${i + 1} (Document: ${chunk.title}):\n${chunk.content}`,
    )
    .join('\n\n');

  const prompt = `
You are a helpful assistant.

Answer the question ONLY using the provided sources.
If the answer is not found in the sources, say:
"I could not find the answer in the provided documents."

Sources:
${context}

Question:
${question}

Answer clearly and reference the source number used.
`;

  const result = await chatModel.generateContent(prompt);
  const answer = result.response.text();

  return {
    answer,
    sources: topChunks.map((chunk, index) => ({
      sourceNumber: index + 1,
      documentTitle: chunk.title,
      documentId: chunk.document_id,
      excerpt: chunk.content.slice(0, 300),
      similarityScore: Number(chunk.score.toFixed(3)),
    })),
  };
}
