import { Router } from 'express';
import { checkDBHealth } from './config/db';
import { checkLLMHealth } from './config/llm';
import documentsRoutes from './modules/documents/documents.routes';
import qaRoutes from "./modules/qa/qa.routes";

const router = Router();

router.get('/status', async (_req, res) => {
  const dbStatus = await checkDBHealth();
  const llmStatus = await checkLLMHealth();

  res.json({
    server: 'ok✅',
    database: dbStatus,
    llm: llmStatus,
  });
});

router.use('/documents', documentsRoutes);
router.use("/qa", qaRoutes);

export default router;
