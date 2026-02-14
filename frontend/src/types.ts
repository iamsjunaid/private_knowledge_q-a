export interface Document {
  id: string;
  title: string;
  created_at: string;
}

export interface Source {
  sourceNumber: number;
  documentTitle: string;
  documentId: string;
  excerpt: string;
  similarityScore: number;
}

export interface QAResponse {
  answer: string;
  sources: Source[];
}

export interface Status {
  server: string;
  database: string;
  llm: string;
}
