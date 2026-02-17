// import { useEffect, useState } from "react";
// import { api } from "../api/api";
import type { Document } from "../types";

interface Props {
  documents: Document[];
}

export default function DocumentList({ documents }: Props) {
  // const [documents, setDocuments] = useState<Document[]>([]);

  // useEffect(() => {
  //   const fetchDocs = async () => {
  //     const res = await api.get("/documents");
  //     setDocuments(res.data);
  //   };
  //   fetchDocs();
  // }, []);


  return (
    <div>
      <h2>Uploaded Documents</h2>
      <ul>
        {documents.map((doc) => (
          <li key={doc.id}>{doc.title}</li>
        ))}
      </ul>
    </div>
  );
}
