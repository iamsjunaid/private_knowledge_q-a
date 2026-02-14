import { useState } from "react";
import DocumentUpload from "./components/DocumentUpload";
import DocumentList from "./components/DocumentList";
import QuestionBox from "./components/QuestionBox";
import AnswerView from "./components/AnswerView";
import StatusBar from "./components/StatusBar";
import type { QAResponse } from "./types";

function App() {
  const [answer, setAnswer] = useState<QAResponse | null>(null);

  return (
    <div style={{ padding: 20, maxWidth: 900, margin: "0 auto" }}>
      <h1>Private Knowledge Q&A</h1>

      <StatusBar />

      <hr />

      <DocumentUpload />
      <DocumentList />

      <hr />

      <QuestionBox setAnswer={setAnswer} />
      {answer && <AnswerView data={answer} />}
    </div>
  );
}

export default App;
