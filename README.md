# Private Knowledge Q&A

**A mini workspace that allows users to upload private documents and ask
questions about them. The system retrieves relevant document sections
using embeddings and generates answers grounded in the uploaded content.**

---

## Overview

**This application implements a Retrieval-Augmented Generation (RAG) system using:**

- React (Frontend)
- Node.js + Express + TypeScript (Backend)
- PostgreSQL (Data + Vector Storage)
- Google Gemini (LLM + Embeddings)

**Users can:**

1.  Upload text documents.
2.  View uploaded documents.
3.  Ask questions.
4.  Receive answers based only on their documents.
5.  See which document sections were used.

---

## Features

### Home Page

The home page clearly shows:

- Document upload section
- List of uploaded documents
- Question input box
- Answer display with sources
- System status indicator

Workflow: Upload → Ask → View Answer + Sources

---

### Status Endpoint

Accessible via:
```
GET /api/status
```
Returns:

```

{ "server": "ok", "database": "connected", "llm": "reachable" }
```

This verifies:

- Backend server is running
- PostgreSQL connection is healthy
- Gemini API is reachable

---

### Deployment

The application is deployed on Render with environment variables for configuration. The frontend is built using Vite and served as a static site, while the backend runs as a Node.js service.

**🚀Links:**
1. [Frontend](https://private-knowledge-q-a-frontend.onrender.com/)

2. [GitHub](https://github.com/iamsjunaid/private_knowledge_q-a)

### Document Handling

When a document is uploaded:

1.  It is stored in the `documents` table
2.  The content is split into chunks
3.  Each chunk is embedded using Gemini
4.  Embeddings are stored in `document_chunks`

---

### Question Answering Flow

When a question is asked:

1.  Question is converted into an embedding
2.  Cosine similarity is computed against stored chunk embeddings
3.  Top matching chunks are selected
4.  Selected chunks are injected into the LLM prompt
5.  Gemini generates an answer grounded only in those chunks
6.  The system returns:
    - Final answer
    - Document title
    - Excerpt used
    - Similarity score

---

### Input Validation

The system handles:

- Empty document title
- Empty document content
- Empty question
- No documents available
- LLM failures
- Database disconnection

All errors return structured JSON responses.

---

## Tech Stack

Frontend: - React + TypeScript - Vite - Axios

Backend: - Node.js - Express - TypeScript - PostgreSQL - Gemini API

AI Models: - gemini-3-flash-preview (chat) - gemini-embedding-001 (embeddings)

---

## Project Structure
```
root/
  backend/
  frontend/ 
  README.md
  AI_NOTES.md 
  PROMPTS_USED.md
  ABOUTME.md
```
---

## How to Run Locally

### Backend

```
cd backend\
npm install
```

Create .env:
```
PORT=5000\
DATABASE_URL=postgresql://user:password@localhost:5432/mini_qa\
GEMINI_API_KEY=your_key_here\
GEMINI_MODEL=gemini-3-flash-preview
```
Run:
```
npm run dev
```
---

### Frontend
```
cd frontend\
npm install
```
Create .env:
```
VITE_API_URL=http://localhost:5000/api
```
Run:
```
npm run dev
```
---

## Deployment

Backend: - Deployed on Render - Uses environment variables - Production
build via TypeScript compilation

Frontend: - Built using npm run build - Uses VITE_API_URL for backend
connection - Deployed as static site

---

## What Is Done

- Full document ingestion pipeline
- Chunking with overlap
- Gemini embeddings
- Cosine similarity retrieval
- Grounded answer generation
- Source transparency
- Status health endpoint
- Error handling
- Type-safe frontend
- Environment-based configuration
- Deployment-ready setup

---

## What Is Not Done

- File upload support (.txt parsing)
- pgvector integration
- Authentication / multi-user support
- Caching embeddings
- Streaming responses
- UI enhancements
- Automated backend tests
- Rate limiting

---

## Additional Required Files

- AI_NOTES.md
- PROMPTS_USED.md
- ABOUTME.md
