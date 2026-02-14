import { Request, Response } from 'express';
import * as service from './qa.service';

export async function askQuestion(req: Request, res: Response) {
  const { question } = req.body;

  const result = await service.answerQuestion(question);

  res.json(result);
}
