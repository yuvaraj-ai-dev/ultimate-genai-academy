"use client";

import React, { useState } from "react";

export default function SecuritySim() {
  const [userInput, setUserInput] = useState("My name is Yuvaraj, card number is 4321-8890-5423 and password is 'secure123', what is my balance?");
  const [usePresidio, setUsePresidio] = useState(true);
  const [useLlamaGuard, setUseLlamaGuard] = useState(true);
  const [processedInput, setProcessedInput] = useState("");
  const [moderatorLog, setModeratorLog] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  const handleTest = () => {
    setIsProcessing(true);
    setProcessedInput("");
    setModeratorLog("");
    
    setTimeout(() => {
      // 1. Presidio Inbound Scrubbing
      let inputScrubbed = userInput;
      if (usePresidio) {
        inputScrubbed = inputScrubbed
          .replace(/Yuvaraj/g, "[REDACTED_NAME]")
          .replace(/\d{4}-\d{4}-\d{4}/g, "[REDACTED_CREDIT_CARD]")
          .replace(/secure123/g, "[REDACTED_CREDENTIAL]");
      }
      setProcessedInput(inputScrubbed);

      // 2. LlamaGuard Output moderations
      let logOutput = "";
      if (useLlamaGuard) {
        if (userInput.toLowerCase().includes("password") || userInput.toLowerCase().includes("jailbreak")) {
          logOutput = `[LlamaGuard Content screening]
Status: UNSAFE
Policy Violated: Section 3 (Credential Leakage & Prompt Hijacking)
Action: Blocker triggered. Rejecting request stream.`;
        } else {
          logOutput = `[LlamaGuard Content screening]
Status: SAFE
Policy Status: Approved
Action: Invoking Bedrock Runtime client.`;
        }
      } else {
        logOutput = `[Guardrails Disabled]
Invocating model directly with raw unredacted string frames.`;
      }
      setModeratorLog(logOutput);
      setIsProcessing(false);
    }, 500);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
      <p style={{ fontSize: "13px", color: "var(--text-secondary)" }}>
        Input client query packets containing sensitive PII data. Enable Presidio filters and LlamaGuard classifiers to inspect the scrubbing pipelines and safety gate actions.
      </p>

      {/* Inputs */}
      <div>
        <label style={{ fontSize: "11px", color: "var(--text-disabled)", fontWeight: "700", display: "block", marginBottom: "6px" }}>RAW INPUT PACKET</label>
        <textarea 
          value={userInput} 
          onChange={(e) => setUserInput(e.target.value)}
          style={{ 
            width: "100%", height: "60px", background: "rgba(0,0,0,0.2)", border: "1px solid var(--border-color)",
            borderRadius: "6px", padding: "10px", color: "var(--text-primary)", fontSize: "12px", outline: "none"
          }}
        />
      </div>

      {/* Toggles */}
      <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <input 
            type="checkbox" 
            id="presidio-toggle" 
            checked={usePresidio} 
            onChange={(e) => setUsePresidio(e.target.checked)}
            style={{ width: "16px", height: "16px", cursor: "pointer" }}
          />
          <label htmlFor="presidio-toggle" style={{ fontSize: "12px", color: "var(--text-secondary)", cursor: "pointer" }}>
            Enable PII Redaction (Microsoft Presidio)
          </label>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <input 
            type="checkbox" 
            id="llamaguard-toggle" 
            checked={useLlamaGuard} 
            onChange={(e) => setUseLlamaGuard(e.target.checked)}
            style={{ width: "16px", height: "16px", cursor: "pointer" }}
          />
          <label htmlFor="llamaguard-toggle" style={{ fontSize: "12px", color: "var(--text-secondary)", cursor: "pointer" }}>
            Enable Output Moderation (LlamaGuard)
          </label>
        </div>
      </div>

      <button 
        onClick={handleTest}
        disabled={isProcessing}
        style={{ 
          alignSelf: "flex-start", background: "var(--color-blue)", color: "#fff", 
          border: "none", padding: "10px 20px", borderRadius: "8px", cursor: "pointer", 
          fontWeight: "700", opacity: isProcessing ? 0.6 : 1
        }}
      >
        {isProcessing ? "Processing guardrails..." : "Filter & Test Gateway"}
      </button>

      {/* Results */}
      {processedInput && (
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }} className="fade-in-content">
          <div className="glass" style={{ padding: "14px", background: "rgba(0,0,0,0.15)" }}>
            <span style={{ fontSize: "10px", color: "var(--color-gold)", fontWeight: "700", display: "block", marginBottom: "4px" }}>PROCESSED SAFE INPUT (SENT TO LLM)</span>
            <p style={{ fontSize: "12px", color: "var(--text-primary)", fontFamily: "var(--font-mono)", wordBreak: "break-all" }}>{processedInput}</p>
          </div>

          {moderatorLog && (
            <div className="glass" style={{ padding: "14px", background: "rgba(0,0,0,0.25)" }}>
              <span style={{ fontSize: "10px", color: "var(--color-red)", fontWeight: "700", display: "block", marginBottom: "4px" }}>SECURITY MODERATION logs</span>
              <pre style={{ margin: 0, padding: "8px", background: "transparent", border: "none" }}>
                <code style={{ fontSize: "11px", color: "var(--text-primary)" }}>{moderatorLog}</code>
              </pre>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
