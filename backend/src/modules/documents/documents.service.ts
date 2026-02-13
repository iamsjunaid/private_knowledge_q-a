import * as repo from './documents.repository';
import { CreateDocumentDTO } from './documents.types';

export async function uploadDocument(data: CreateDocumentDTO) {
  if (!data.title || !data.content) {
    throw { status: 400, message: 'Title and content are required' };
  }

  return await repo.createDocument(data);
}

export async function listDocuments() {
  return await repo.getAllDocuments();
}
