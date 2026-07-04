# Project 2: Real-Time Masked Transaction Log Vector Search

## Goal
Build a FastAPI logging service that intercepts transaction logs, uses Microsoft Presidio to scrub credit card details and customer identities, converts the clean logs to embeddings, and indexes them in AWS OpenSearch.

## Suggested Directory Structure
```text
prj2_audit_vector_search/
├── main.py                    # FastAPI logs ingestion
├── scrubber.py                # Presidio PII masking layer
├── opensearch_client.py       # AWS OpenSearch vector sync
└── test_logs.txt              # Sample transaction log data
```

## Get Started
1. Install Microsoft Presidio: `pip install presidio-analyzer presidio-anonymizer`.
2. Deploy a local OpenSearch Docker container or use AWS serverless credentials.
3. Review Day 13 guidelines in the portal.
