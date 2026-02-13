import { Request, Response } from 'express';
import * as service from './documents.service';

export async function createDocument(req: Request, res: Response) {
  const document = await service.uploadDocument(req.body);
  res.status(201).json(document);
}

export async function getDocuments(_req: Request, res: Response) {
  const documents = await service.listDocuments();
  res.json(documents);
}
