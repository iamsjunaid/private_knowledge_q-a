export interface CreateDocumentDTO {
  title: string;
  content: string;
}

export interface Document {
  id: string;
  title: string;
  content: string;
  created_at: Date;
}