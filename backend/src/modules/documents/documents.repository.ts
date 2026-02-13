import { pool } from '../../config/db';
import { CreateDocumentDTO } from './documents.types';

export async function createDocument(data: CreateDocumentDTO) {
  const result = await pool.query(
    `INSERT INTO documents (title, content)
     VALUES ($1, $2)
     RETURNING *`,
    [data.title, data.content],
  );

  return result.rows[0];
}

export async function getAllDocuments() {
  const result = await pool.query(
    `SELECT id, title, created_at
     FROM documents
     ORDER BY created_at DESC`,
  );

  return result.rows;
}
