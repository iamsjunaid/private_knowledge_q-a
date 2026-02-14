# AI_NOTES.md

## AI Usage Overview

AI tools were used as an assistant during development to:

-   Scaffold backend structure (folder organization, clean architecture
    suggestions)
-   Refine TypeScript typing
-   Improve error handling patterns
-   Help structure the Retrieval-Augmented Generation (RAG) pipeline
-   Draft documentation files

All generated code was reviewed, tested, and adjusted manually before
finalizing.

------------------------------------------------------------------------

## What Was Verified Manually

-   Database schema correctness
-   Chunking logic behavior
-   Embedding generation flow
-   Cosine similarity implementation
-   Retrieval accuracy across multiple documents
-   Proper grounding of answers in source chunks
-   TypeScript strict mode compatibility
-   Deployment configuration (Render + environment variables)

------------------------------------------------------------------------

## LLM Provider and Model Choice

Provider: Google Gemini\
Chat Model: gemini-3-flash-preview\
Embedding Model: text-embedding-001

### Why Gemini?

-   Cost-efficient
-   Fast response time
-   Native embedding model available
-   Simple SDK integration
-   Good balance between quality and speed for a small RAG system

Gemini 1.5 Flash was selected for inference due to its speed and
sufficient reasoning capability for document-based Q&A.

------------------------------------------------------------------------

## Design Decisions

-   In-memory cosine similarity instead of pgvector (simpler for
    assessment scale)
-   Clear source transparency for evaluation scoring
-   Structured error handling
-   Environment-based configuration for deployment
