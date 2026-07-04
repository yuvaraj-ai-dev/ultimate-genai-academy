# 🎓 Ultimate GenAI Academy: Interactive Learning OS & Production Suite

[![Live App](https://img.shields.io/badge/Vercel-Deployed-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://ultimate-genai-academy.vercel.app/)
[![Next.js Version](https://img.shields.io/badge/Next.js-16.2.9-blue?style=for-the-badge&logo=nextdotjs&logoColor=white)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)

Welcome to the **Ultimate GenAI & Agentic AI Academy** workspace. This repository contains the complete curriculum, interactive dashboard, assignments, cheatsheets, and production-grade banking system mockups designed to build and refine skills from beginner foundations up to Senior Generative AI solutions architect level.

> [!IMPORTANT]
> 🌐 **Access the Live Interactive Dashboard:** [ultimate-genai-academy.vercel.app](https://ultimate-genai-academy.vercel.app/)
> Explore the 90-day learning curriculum, review advantages/disadvantages, inspect architectural flowcharts, and play with visual simulators directly in your browser.

---

## 📁 Repository Directory Structure

```bash
├── learning-portal/        # Next.js Learning Operating System (Dashboard Portal)
├── interview_prep/         # High-yield cheat sheets & system design case studies
│   ├── cheat_sheets.md     # Visual architecture maps, QKV formulas, and mnemonics
│   └── case_studies.md     # ASIC auditing, APRA banking regulatory design sheets
├── projects/               # 6 Production-Grade Portfolio Projects
│   ├── prj1_cba_compliance_rag/      # PDF QA Engine with hybrid search & rerankers
│   ├── prj2_audit_vector_search/     # PII-masked logs Vector Database
│   ├── prj3_mcp_banking_assistant/   # Custom banking tools MCP server (stdio JSON-RPC)
│   ├── prj4_audit_reporting_agent/   # LangGraph transaction auditing & PDF generator
│   ├── prj5_multiagent_kyc_board/     # CrewAI cooperative KYC risk underwriting board
│   └── prj6_fraud_detection_platform/ # Containerized AWS Bedrock App with Arize tracing
└── README.md               # Main repository guide (This file)
```

---

## 🚀 How to Launch the Learning Portal Locally

If you prefer to run the interactive dashboard locally:

1. **Navigate to the portal directory:**
   ```bash
   cd learning-portal
   ```
2. **Install dependencies:**
   ```bash
   npm install
   ```
3. **Start the Next.js development server:**
   ```bash
   npm run dev
   ```
4. **Open the browser:**
   Go to [http://localhost:3000](http://localhost:3000). Your learning checkpoints and streak metrics will save automatically inside your browser's `localStorage` across restarts.

---

## 🗺️ The 12-Week Syllabus Curriculum Roadmap

| Week | Title | Core Target Concept | Key Learning Outcomes |
|---|---|---|---|
| **W1** | **LLM Fundamentals** | Transformer Architecture & Attention | QKV attention matrices, Positional Encodings, Decoder loops |
| **W2** | **Prompt Engineering** | Structuring System Prompts | Few-Shot training, defensive XML tagging, Chain-of-Thought (CoT) |
| **W3** | **RAG Stages** | Retrieval-Augmented Generation | Chunking strategies, hybrid BM25 lookup, rerankers, citation mapping |
| **W4** | **Embeddings** | Semantic Multi-Dimensional Space | Cosine similarity calculation, dimension reduction, tokenization |
| **W5** | **Vector Databases** | Approximate Nearest Neighbor | HNSW graphs, vector indexes, collection partitioning, metadata filtering |
| **W6** | **AI Agents (LangGraph)** | Cyclic State Graph Machines | Node execution, custom Edge routing, persistent State logs, Human-in-the-Loop |
| **W7** | **AI Agents (CrewAI)** | Cooperative Multi-Agent Roles | Role definition, tool sharing, sequential tasks, hierarchical boards |
| **W8** | **Model Context Protocol** | Standarized Sockets for AI Client | MCP Server registry, stdio transport, custom Tools/Prompts/Resources |
| **W9** | **LLMOps & Monitoring** | Tracing & Observability | OpenTelemetry tracer spans, latency profiling, cost/token audits |
| **W10** | **Security & Guardrails** | Trust & Regulatory Gateways | PII masking (Presidio), prompt injection blocks, LlamaGuard checks |
| **W11** | **Cloud Deployments** | VPC Secured Deployments | AWS ECS Fargate, private endpoints, Bedrock client keys config |
| **W12** | **Backend & Banking** | Production Transactional Logic | Asynchronous loops, validation schemas, fallback circuit breakers |

---

## 🛠️ Interactive Simulators Included

The portal features dedicated **visual playgrounds** to experiment with core GenAI mechanics:

* **Attention Simulator:** Click on tokens to calculate simulated QKV Query-Attention matrices and read how model weights contextually differentiate financial vs. generic terms in parallel.
* **Prompt Playground:** Configure few-shot inputs, toggle Chain-of-Thought (CoT), execute inference logs, and verify how defensive XML wrapping blocks system instructions leaks.
* **RAG Pipeline:** Follow a step-by-step vector lookup query as it travels through distance calculations, rerank scoring, and output generation.
* **MCP stdio Inspector:** Simulate JSON-RPC protocol messages passing back and forth over local stdio streams between Claude Desktop client and a banking MCP server.
* **PII Scrubber:** Input raw texts containing name details and credit cards and check how Microsoft Presidio scrubs and hashes values before transferring logs.

---

## 💼 The 6 Production-Grade Portfolio Projects

1. **[prj1_cba_compliance_rag](projects/prj1_cba_compliance_rag/)**: Built a compliance document parser utilizing Hybrid Vector Search, Cohere Reranking models, and citation tracking schemas.
2. **[prj2_audit_vector_search](projects/prj2_audit_vector_search/)**: Deployed a Vector Database to catalog transaction logs utilizing pre-filtering, indexing optimizations, and Cosine Similarity thresholds.
3. **[prj3_mcp_banking_assistant](projects/prj3_mcp_banking_assistant/)**: Developed a custom Model Context Protocol (MCP) server exposing tools to inspect user accounts and freeze compromised credit cards safely.
4. **[prj4_audit_reporting_agent](projects/prj4_audit_reporting_agent/)**: Configured a cyclic State Machine agent utilizing LangGraph to ingest CSV transaction audits, trigger alerts for anomalies, and compile PDF reports with Human-in-the-loop validation gates.
5. **[prj5_multiagent_kyc_board](projects/prj5_multiagent_kyc_board/)**: Designed a cooperative Multi-Agent KYC board using CrewAI where Risk Analysts, Legal Officers, and underwriter profiles collaborate sequentially.
6. **[prj6_fraud_detection_platform](projects/prj6_fraud_detection_platform/)**: Created a Dockerized microservice deploying AWS Bedrock API calls monitored via OpenTelemetry tracing spans in Arize Phoenix dashboards.

---

## 💡 Mnemonic Methodologies

We use intuitive analogies to make complex engineering variables simple:
* 🥂 **Attention Mechanisms** = *The Cocktail Party Effect* (filtering background chatter to focus on relevant speakers).
* 📖 **RAG Pipelines** = *The Open-Book Exam* (searching reference sheets on the fly instead of memorizing data).
* 🚉 **LangGraph State** = *Train Stations & Cargo Cars* (nodes act as stations mutating cargo boxes along cyclic tracks).
* 🔌 **Model Context Protocol (MCP)** = *USB-C for AI* (standardizing connectors so clients talk to any database socket).
* 🖍️ **PII Guardrails** = *Permanent Black Markers* (masking card digits before uploading data to third-party endpoints).

---

## 📈 Search Engine & Discoverability Tags
`nextjs` `typescript` `generative-ai` `agentic-ai` `langgraph` `crewai` `vector-database` `model-context-protocol` `llmops` `opentelemetry` `aws-bedrock` `rag` `machine-learning`

---
*Created and maintained by the Ultimate GenAI Academy Team.*
