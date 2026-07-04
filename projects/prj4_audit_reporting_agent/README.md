# Project 4: LangGraph Transaction Auditor & Reporter

## Goal
Build a LangGraph state machine that reviews accounts for transactions, flags suspicious patterns, drafts a report, and pauses for human verification before generating a PDF.

## Suggested Directory Structure
```text
prj4_audit_reporting_agent/
├── agent.py                   # LangGraph node definitions & edges
├── schema.py                  # State and Pydantic representations
├── pdf_writer.py              # ReportLab styling sheet
└── database.py                # SQL checkpointer persistence
```

## Get Started
1. Run `pip install langgraph reportlab`.
2. Code the graph nodes: DataIngestion, RiskScoring, PDFGeneration.
3. Configure the Human-in-the-loop breakpoint (Day 52).
