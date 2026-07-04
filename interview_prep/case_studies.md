# CBA Banking Case Studies & System Design Scenarios

These case studies represent production scenarios in enterprise banking, focusing on security, cost control, compliance, and multi-agent coordination.

---

## Case Study 1: Compliance Audit Log Parsing
* **Scenario**: The CBA Security Operations Center (SOC) logs millions of transactions daily. We need to identify suspicious access logs and summarize incident records without violating customer privacy policies.
* **Problem**: 
  1. Sending raw access logs to OpenAI/Claude violates internal compliance regulations (data sovereignty).
  2. Latency of processing 10,000 logs sequentially via an LLM is too high.
* **Solution Architecture**:
  1. **PII Masking**: Run a local FastAPI microservice that extracts IP addresses, card numbers, and employee names using a CPU-based Named Entity Recognition (NER) model. Replaces them with token IDs.
  2. **Asynchronous Batching**: Read logs in chunks of 100 lines. Use Python `asyncio` to send concurrent requests to a local 3B model (Ollama Qwen-2.5) deployed on local VM server resources.
  3. **Structured Ingestion**: Parse the structured output (JSON mode) to extract high-risk logs, and index them in an RDS PostgreSQL pgvector database for security auditors.

---

## Case Study 2: APRA CPS 234 Audit Compliance RAG
* **Scenario**: Internal audit needs a QA assistant that queries CBA security manuals and APRA regulations.
* **Constraints**:
  1. The bot must never hallucinate instructions.
  2. Every answer must display the document name, section index, and matching paragraph.
* **System Design**:
  1. **Hybrid Retrieval**: Combine lexical search (BM25) to catch specific codes (e.g. 'CPS 234') with dense vector search (OpenAI embedding-3-small) to catch semantic concepts.
  2. **Reranker stage**: Retrieve the top 30 chunks. Run them through a Cohere Reranker microservice. Select the top 4 chunks.
  3. **Disclaimers & Disclosures**: The prompt includes strict instruction XML tags. If the retrieved context does not contain the answer, the LLM must output: 'Information not found in the indexed bank manuals.'

---

## Case Study 3: Human-in-the-Loop Loan Disbursement Agent
* **Scenario**: A LangGraph agent parses mortgage documents, updates accounts, and triggers disbursement API calls.
* **Risk**: High-risk financial transaction. The agent cannot disburse funds without explicit human audit checks.
* **System Design**:
  1. **Interrupt State**: Configure a LangGraph StateGraph compiled with `interrupt_before=['disburse_funds_node']`.
  2. **Transaction Freeze**: The node calculates risk scores. If the underwriter agent marks it safe, the graph execution halts, writing the state to a Postgres checkpointer.
  3. **Next.js Hook**: Next.js polls or receives a WebSocket update showing a pending approval transaction on the dashboard.
  4. **Manual Approval**: An auditor clicks 'Approve card' on the Next.js UI, triggering a POST request that updates the graph state to `approved = True` and resumes execution thread loops.

---

## Case Study 4: Multi-Agent KYC Compliance Board
* **Scenario**: Automating mortgage applicant underwriting checks.
* **Agent swarms**:
  * **Intake Agent**: Scans incoming applicant folders and parses metadata.
  * **KYC Agent**: Processes passport uploads via OCR and cross-references driver's license APIs.
  * **AML Agent**: Checks watchlists and PEP (Politically Exposed Persons) databases.
  * **Credit Analyst**: Scores risk using income data and mock credit bureau queries.
* **Orchestration**:
  * Use **LangGraph** (deterministic state machine) instead of CrewAI because the bank requires a strict linear auditing path: KYC MUST finish before credit analysis triggers, and any AML flag must abort execution immediately.
