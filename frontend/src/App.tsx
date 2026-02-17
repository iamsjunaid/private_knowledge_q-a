import { useEffect, useState } from "react";
import DocumentUpload from "./components/DocumentUpload";
import DocumentList from "./components/DocumentList";
import QuestionBox from "./components/QuestionBox";
import AnswerView from "./components/AnswerView";
import StatusBar from "./components/StatusBar";
import type { QAResponse } from "./types";
import type { Document } from "./types";
import { api } from "./api/api";

function App() {

  const [answer, setAnswer] = useState<QAResponse | null>(null);
  const [documents, setDocuments] = useState<Document[]>([]);

  useEffect(() => {
    const fetchDocs = async () => {
      const res = await api.get("/documents");
      setDocuments(res.data);
    };
    fetchDocs();
  }, []);

  const fetchDocs = async () => {
    const res = await api.get("/documents");
    setDocuments(res.data);
  };


  return (
    <div style={{ padding: 20, maxWidth: 900, margin: "0 auto" }}>
      <h1>Private Knowledge Q&A</h1>

      <StatusBar />

      <hr />

      <DocumentUpload onUploadSuccess={fetchDocs} />
      <DocumentList documents={documents} />

      <hr />

      <QuestionBox setAnswer={setAnswer} />
      {answer && <AnswerView data={answer} />}
    </div>
  );
}

export default App;
