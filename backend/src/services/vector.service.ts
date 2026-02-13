import { pool } from "../config/db";

export async function storeChunk(
  documentId: string,
  content: string,
  embedding: number[]
) {
  await pool.query(
    `INSERT INTO document_chunks (document_id, content, embedding)
     VALUES ($1, $2, $3)`,
    [documentId, content, embedding]
  );
}

export async function getChunksByDocument(documentId: string) {
  const result = await pool.query(
    `SELECT * FROM document_chunks WHERE document_id = $1`,
    [documentId]
  );

  return result.rows;
}
