import type { QAResponse } from "../types";

interface Props {
  data: QAResponse;
}

export default function AnswerView({ data }: Props) {
  return (
    <div style={{ marginTop: 20 }}>
      <h2>Answer</h2>
      <p>{data.answer}</p>

      <h3>Sources</h3>
      {data.sources.map((source) => (
        <div
          key={source.sourceNumber}
          style={{
            border: "1px solid #ccc",
            padding: 10,
            marginBottom: 10,
          }}
        >
          <strong>
            Source {source.sourceNumber} — {source.documentTitle}
          </strong>
          <p>{source.excerpt}</p>
        </div>
      ))}
    </div>
  );
}
