import { Router } from 'express';
import { checkDBHealth } from './config/db';
import { checkLLMHealth } from './config/llm';
import documentsRoutes from './modules/documents/documents.routes';

const router = Router();

router.get('/status', async (_req, res) => {
  const dbStatus = await checkDBHealth();
  const llmStatus = await checkLLMHealth();

  res.json({
    server: 'ok',
    database: dbStatus,
    llm: llmStatus,
  });
});

router.use('/documents', documentsRoutes);

export default router;
