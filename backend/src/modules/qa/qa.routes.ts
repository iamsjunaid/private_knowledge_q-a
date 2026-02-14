import { Router } from 'express';
import { askQuestion } from './qa.controller';

const router = Router();

router.post('/', askQuestion);

export default router;
