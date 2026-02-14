import { useState } from "react";
import { AxiosError } from "axios";
import { api } from "../api/api";

export default function DocumentUpload() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  const handleUpload = async () => {
    if (!title || !content) return alert("Fill all fields");

    setLoading(true);

    try {
      await api.post("/documents", { title, content });
      alert("Uploaded successfully!");
      setTitle("");
      setContent("");
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
      <h2>Upload Document</h2>

      <input
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        style={{ width: "100%", marginBottom: 10 }}
      />

      <textarea
        placeholder="Paste document content here"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        rows={6}
        style={{ width: "100%", marginBottom: 10 }}
      />

      <button onClick={handleUpload} disabled={loading}>
        {loading ? "Uploading..." : "Upload"}
      </button>
    </div>
  );
}
