import { Router } from "express";
import { checkDBHealth } from "./config/db";
import { checkLLMHealth } from "./config/llm";

const router = Router();

router.get("/status", async (_req, res) => {
  const dbStatus = await checkDBHealth();
  const llmStatus = await checkLLMHealth();

  res.json({
    server: "ok",
    database: dbStatus,
    llm: llmStatus,
  });
});

export default router;
