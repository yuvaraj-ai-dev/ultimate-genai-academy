"use client";

import React, { useState } from "react";

export default function McpSim() {
  const [selectedTool, setSelectedTool] = useState<"get_balance" | "freeze_card">("get_balance");
  const [accountId, setAccountId] = useState("CBA-902341");
  const [cardId, setCardId] = useState("CARD-8839-44");
  const [mcpLogs, setMcpLogs] = useState("");
  const [isExecuting, setIsExecuting] = useState(false);

  const getArgsString = () => {
    if (selectedTool === "get_balance") {
      return JSON.stringify({ account_id: accountId }, null, 2);
    }
    return JSON.stringify({ card_id: cardId, reason: "stolen" }, null, 2);
  };

  const handleExecute = () => {
    setIsExecuting(true);
    setMcpLogs("");
    
    setTimeout(() => {
      let logPayload = "";
      if (selectedTool === "get_balance") {
        logPayload = `[JSON-RPC Client ➔ Server]
Method: tools/call
Params: {
  "name": "get_balance",
  "arguments": {
    "account_id": "${accountId}"
  }
}

[MCP Server Processing SQLite connection...]
Querying table: accounts where id = '${accountId}'...

[JSON-RPC Server ➔ Client]
Result: {
  "content": [
    {
      "type": "text",
      "text": "{\\"status\\": \\"success\\", \\"balance\\": 5420.50, \\"currency\\": \\"AUD\\"}"
    }
  ]
}`;
      } else {
        logPayload = `[JSON-RPC Client ➔ Server]
Method: tools/call
Params: {
  "name": "freeze_card",
  "arguments": {
    "card_id": "${cardId}",
    "reason": "stolen"
  }
}

[MCP Server executing local SQLite card freeze...]
Updating table: credit_cards set status = 'frozen' where card_num = '${cardId}'...

[JSON-RPC Server ➔ Client]
Result: {
  "content": [
    {
      "type": "text",
      "text": "{\\"status\\": \\"success\\", \\"card_status\\": \\"FROZEN\\"}"
    }
  ]
}`;
      }

      // Typewriter stream logs
      let currentIdx = 0;
      const interval = setInterval(() => {
        if (currentIdx < logPayload.length) {
          setMcpLogs(prev => prev + logPayload.charAt(currentIdx));
          currentIdx += 3;
        } else {
          clearInterval(interval);
          setIsExecuting(false);
        }
      }, 10);
    }, 400);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
      <p style={{ fontSize: "13px", color: "var(--text-secondary)" }}>
        Select a mock bank database tool, configure the payload arguments, and run the transaction to inspect the raw Model Context Protocol (MCP) JSON-RPC communication frames.
      </p>

      {/* Selectors */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
        <div>
          <label style={{ fontSize: "11px", color: "var(--text-disabled)", fontWeight: "700", display: "block", marginBottom: "6px" }}>MCP REGISTERED TOOL</label>
          <select 
            value={selectedTool} 
            onChange={(e) => setSelectedTool(e.target.value as any)}
            style={{ width: "100%", padding: "10px" }}
          >
            <option value="get_balance">cba_mcp_server:get_balance</option>
            <option value="freeze_card">cba_mcp_server:freeze_card</option>
          </select>
        </div>

        <div>
          {selectedTool === "get_balance" ? (
            <>
              <label style={{ fontSize: "11px", color: "var(--text-disabled)", fontWeight: "700", display: "block", marginBottom: "6px" }}>ACCOUNT ID PARAMETER</label>
              <input 
                type="text" 
                value={accountId} 
                onChange={(e) => setAccountId(e.target.value)}
                style={{ width: "100%", padding: "10px" }}
              />
            </>
          ) : (
            <>
              <label style={{ fontSize: "11px", color: "var(--text-disabled)", fontWeight: "700", display: "block", marginBottom: "6px" }}>CARD ID PARAMETER</label>
              <input 
                type="text" 
                value={cardId} 
                onChange={(e) => setCardId(e.target.value)}
                style={{ width: "100%", padding: "10px" }}
              />
            </>
          )}
        </div>
      </div>

      {/* Arguments Previews */}
      <div className="glass" style={{ padding: "12px", background: "rgba(0,0,0,0.15)" }}>
        <span style={{ fontSize: "10px", color: "var(--color-blue)", fontWeight: "700", display: "block", marginBottom: "4px" }}>TOOL ARGUMENTS JSON PAYLOAD</span>
        <pre style={{ margin: 0, padding: "8px", background: "transparent", border: "none" }}>
          <code style={{ fontSize: "11px", color: "var(--text-secondary)" }}>{getArgsString()}</code>
        </pre>
      </div>

      <button 
        onClick={handleExecute}
        disabled={isExecuting}
        style={{ 
          alignSelf: "flex-start", background: "var(--color-blue)", color: "#fff", 
          border: "none", padding: "10px 20px", borderRadius: "8px", cursor: "pointer", 
          fontWeight: "700", opacity: isExecuting ? 0.6 : 1
        }}
      >
        {isExecuting ? "Executing stdio transport..." : "Execute MCP Tool Call"}
      </button>

      {/* JSON-RPC logs */}
      {mcpLogs && (
        <div className="glass" style={{ padding: "16px", background: "rgba(0,0,0,0.25)" }}>
          <span style={{ fontSize: "10px", color: "var(--color-purple)", fontWeight: "700", display: "block", marginBottom: "8px" }}>STDIO PROTOCOL IPC TRACE</span>
          <pre style={{ margin: 0, padding: "8px", background: "transparent", border: "none" }}>
            <code style={{ fontSize: "11px", color: "var(--text-primary)" }}>{mcpLogs}</code>
          </pre>
        </div>
      )}
    </div>
  );
}
