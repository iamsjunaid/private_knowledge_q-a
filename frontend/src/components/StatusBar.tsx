import { useEffect, useState } from "react";
import { api } from "../api/api";
import type { Status } from "../types";

export default function StatusBar() {
  const [status, setStatus] = useState<Status | null>(null);

  useEffect(() => {
    api.get("/status").then((res) => setStatus(res.data));
  }, []);

  if (!status) return null;

  return (
    <div style={{ marginBottom: 20 }}>
      <strong>Status:</strong>
      Server: {status.server} |
      DB: {status.database} |
      LLM: {status.llm}
    </div>
  );
}
