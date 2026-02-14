import { useState } from "react";
import { AxiosError } from "axios";
import { api } from "../api/api";
import type { QAResponse } from "../types";


interface Props {
  setAnswer: React.Dispatch<React.SetStateAction<QAResponse | null>>;
}

export default function QuestionBox({ setAnswer }: Props) {
  const [question, setQuestion] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAsk = async () => {
    if (!question) return alert("Enter a question");

    setLoading(true);

    try {
      const res = await api.post("/qa", { question });
      setAnswer(res.data);
    } catch (err: unknown) {
      if (err instanceof AxiosError) {
        alert(err.response?.data?.message || "Request failed");
      } else {
        alert("Unexpected error occurred");
      }
    }

    setLoading(false);
  };

  return (
    <div>
      <h2>Ask a Question</h2>

      <input
        placeholder="Enter question"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        style={{ width: "100%", marginBottom: 10 }}
      />

      <button onClick={handleAsk} disabled={loading}>
        {loading ? "Thinking..." : "Ask"}
      </button>
    </div>
  );
}
