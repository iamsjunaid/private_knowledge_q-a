import { Request, Response, NextFunction } from 'express';
import * as service from './qa.service';

export async function askQuestion(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const { question } = req.body;

    const result = await service.answerQuestion(question);

    res.json(result);
  } catch (error) {
    next(error);
  }
}
