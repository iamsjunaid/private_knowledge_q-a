import { pool } from '../config/db';

function cosineSimilarity(a: number[], b: number[]) {
  if (!a || !b || a.length !== b.length) return 0;

  const dot = a.reduce((sum, val, i) => sum + val * b[i], 0);

  const magnitudeA = Math.sqrt(a.reduce((sum, val) => sum + val * val, 0));
  const magnitudeB = Math.sqrt(b.reduce((sum, val) => sum + val * val, 0));

  if (magnitudeA === 0 || magnitudeB === 0) return 0;

  return dot / (magnitudeA * magnitudeB);
}

export async function storeChunk(
  documentId: string,
  content: string,
  embedding: number[],
) {
  await pool.query(
    `INSERT INTO document_chunks (document_id, content, embedding)
     VALUES ($1, $2, $3)`,
    [documentId, content, embedding],
  );
}

export async function getAllChunks() {
  const result = await pool.query(
    `SELECT 
        dc.id,
        dc.document_id,
        dc.content,
        dc.embedding,
        d.title
     FROM document_chunks dc
     JOIN documents d ON d.id = dc.document_id`,
  );

  return result.rows;
}

export async function findTopChunks(queryEmbedding: number[], topK = 3) {
  const chunks = await getAllChunks();

  const scored = chunks.map((chunk) => ({
    ...chunk,
    score: cosineSimilarity(queryEmbedding, chunk.embedding),
  }));

  scored.sort((a, b) => b.score - a.score);

  return scored.slice(0, topK);
}
