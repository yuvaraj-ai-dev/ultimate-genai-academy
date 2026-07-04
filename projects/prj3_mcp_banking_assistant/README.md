# Project 3: Custom Banking API MCP Server

## Goal
Build a Model Context Protocol (MCP) Server that exposes mock banking account balances, dispute filing tools, and statement formatting prompts to Claude Code and Claude Desktop.

## Suggested Directory Structure
```text
prj3_mcp_banking_assistant/
├── server.py                  # Python FastMCP server code
├── mock_db.sqlite             # Mock account data
└── claude_config.json         # Integration settings file
```

## Get Started
1. Run `pip install mcp` or `pip install fastmcp`.
2. Code your FastMCP server in `server.py` exposing mock balance and freeze card tools.
3. Configure your local Claude Desktop config (Day 40) to mount the server.
