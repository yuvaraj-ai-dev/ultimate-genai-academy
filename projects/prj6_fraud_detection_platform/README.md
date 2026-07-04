# Project 6: End-to-End AWS Fraud Detection Platform

## Goal
Build a containerized microservice running FastAPI, integrating AWS Bedrock Claude, LlamaGuard content moderator, PII scrubbers, and semantic caching, with all traces sent to Arize Phoenix.

## Suggested Directory Structure
```text
prj6_fraud_detection_platform/
├── app/
│   ├── main.py                # FastAPI core app
│   ├── security.py            # LlamaGuard & Presidio wrapper
│   └── cache.py               # Semantic cache (Redis)
├── Dockerfile                 # Multi-stage production container
├── docker-compose.yml         # Local stack deployment (Redis, Phoenix)
└── requirements.txt
```

## Get Started
1. Boot up Arize Phoenix locally: `arize-phoenix start`.
2. Configure your AWS credentials (`boto3`) and ensure Bedrock model access is enabled.
3. Review Day 77 deployment guidelines.
