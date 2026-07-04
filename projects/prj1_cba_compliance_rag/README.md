# Project 1: CBA Regulatory Compliance RAG Engine

## Goal
Build a Next.js + FastAPI application that ingests compliance PDFs (like APRA CPS 234 guidelines), chunks them semantically, indexes them in pgvector, and answers questions with precise citations.

## Suggested Directory Structure
```text
prj1_cba_compliance_rag/
├── backend/
│   ├── main.py                # FastAPI endpoints
│   ├── parser.py              # Semantic PDF parsing & chunking
│   ├── database.py            # PostgreSQL vector connection
│   └── requirements.txt       # Python packages
└── frontend/
    ├── package.json
    ├── src/
    │   ├── app/
    │   │   ├── page.tsx       # Chat UI with citations
    │   │   └── layout.tsx
    │   └── components/
    │       └── ChatBox.tsx
    └── tailwind.config.js     # If Tailwind is used for this client
```

## Get Started
1. Run a local PostgreSQL instance supporting the `pgvector` extension.
2. Complete Day 22-27 lessons in the portal.
3. Code the ingestion pipeline in `backend/parser.py`.
