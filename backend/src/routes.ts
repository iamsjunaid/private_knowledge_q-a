import { Router } from "express";
import { checkDBHealth } from "./config/db";

const router = Router();

router.get("/status", async (_req, res) => {
  const dbStatus = await checkDBHealth();

  res.json({
    server: "ok",
    database: dbStatus,
    llm: "not_connected_yet",
  });
});

export default router;
