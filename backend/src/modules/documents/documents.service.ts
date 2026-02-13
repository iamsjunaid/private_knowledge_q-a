import * as repo from "./documents.repository";
import { CreateDocumentDTO } from "./documents.types";
import { chunkText } from "../../services/chunk.service";
import { generateEmbedding } from "../../config/llm";
import { storeChunk } from "../../services/vector.service";

export async function uploadDocument(data: CreateDocumentDTO) {
  if (!data.title || !data.content) {
    throw { status: 400, message: "Title and content are required" };
  }

  const document = await repo.createDocument(data);

  // Step 1: chunk text
  const chunks = chunkText(data.content);

  // Step 2: generate embeddings + store
  for (const chunk of chunks) {
    const embedding = await generateEmbedding(chunk);
    await storeChunk(document.id, chunk, embedding);
  }

  return document;
}

export async function listDocuments() {
  return await repo.getAllDocuments();
}
