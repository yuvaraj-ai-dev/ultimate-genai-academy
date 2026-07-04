"use client";

import React, { useState } from "react";
import { ChevronRight } from "lucide-react";

export default function LangGraphSim() {
  const [nodeState, setNodeState] = useState<"idle" | "ingest" | "audit" | "gate" | "complete">("idle");
  const [variables, setVariables] = useState({ logs_processed: 0, amount: 0, risk: "none", approved: false });

  const triggerStep = () => {
    if (nodeState === "idle") {
      setNodeState("ingest");
      setVariables({ logs_processed: 1200, amount: 0, risk: "none", approved: false });
    } else if (nodeState === "ingest") {
      setNodeState("audit");
      setVariables({ logs_processed: 1200, amount: 5400.00, risk: "HIGH", approved: false });
    } else if (nodeState === "audit") {
      setNodeState("gate");
    } else if (nodeState === "gate") {
      setVariables(prev => ({ ...prev, approved: true }));
      setNodeState("complete");
    } else {
      setNodeState("idle");
      setVariables({ logs_processed: 0, amount: 0, risk: "none", approved: false });
    }
  };

  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 200px", gap: "20px" }}>
      <div>
        <p style={{ fontSize: "13px", color: "#d1d5db", marginBottom: "16px" }}>
          Run the transaction auditor state graph. The state dictionary properties persist across nodes and trigger breakpoints.
        </p>

        {/* Graph visual nodes layout */}
        <div style={{ display: "flex", alignItems: "center", gap: "12px", justifyContent: "center", margin: "24px 0" }}>
          <span style={{ fontSize: "10px", background: "rgba(255,255,255,0.03)", padding: "4px 8px" }}>START</span>
          <ChevronRight style={{ color: "#4b5563" }} />
          
          <div style={{ 
            background: nodeState === "ingest" ? "#6366f1" : "rgba(255,255,255,0.02)", 
            border: "1px solid rgba(255,255,255,0.08)", padding: "10px 14px", borderRadius: "8px",
            color: nodeState === "ingest" ? "#fff" : "#9ca3af"
          }}>
            IngestLogs
          </div>
          <ChevronRight style={{ color: "#4b5563" }} />

          <div style={{ 
            background: nodeState === "audit" ? "#6366f1" : "rgba(255,255,255,0.02)", 
            border: "1px solid rgba(255,255,255,0.08)", padding: "10px 14px", borderRadius: "8px",
            color: nodeState === "audit" ? "#fff" : "#9ca3af"
          }}>
            RiskAuditor
          </div>
          <ChevronRight style={{ color: "#4b5563" }} />

          <div style={{ 
            background: nodeState === "gate" ? "#f59e0b" : "rgba(255,255,255,0.02)", 
            border: nodeState === "gate" ? "1px solid #eab308" : "1px solid rgba(255,255,255,0.08)", 
            padding: "10px 14px", borderRadius: "8px",
            color: nodeState === "gate" ? "#fff" : "#9ca3af"
          }}>
            BreakpointGate
          </div>
          <ChevronRight style={{ color: "#4b5563" }} />

          <div style={{ 
            background: nodeState === "complete" ? "#10b981" : "rgba(255,255,255,0.02)", 
            border: "1px solid rgba(255,255,255,0.08)", padding: "10px 14px", borderRadius: "8px",
            color: nodeState === "complete" ? "#fff" : "#9ca3af"
          }}>
            GeneratePDF
          </div>
        </div>

        <button 
          onClick={triggerStep}
          style={{ 
            background: "#6366f1", color: "#fff", border: "none", padding: "10px 20px", 
            borderRadius: "8px", cursor: "pointer", fontWeight: "700" 
          }}
        >
          {nodeState === "idle" && "Boot Agent Graph"}
          {nodeState === "ingest" && "Calculate Risk Metrics"}
          {nodeState === "audit" && "Trigger Security Breakpoint"}
          {nodeState === "gate" && "Authorize & Resume Graph"}
          {nodeState === "complete" && "Reset Graph Flow"}
        </button>
      </div>

      {/* State variables panel */}
      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        <span style={{ fontSize: "11px", color: "#6b7280", fontWeight: "700" }}>ACTIVE STATE DICTIONARY</span>
        
        <div className="glass" style={{ padding: "12px", background: "rgba(0,0,0,0.15)", fontFamily: "var(--font-mono)", fontSize: "12px" }}>
          <div>logs_processed: <span style={{ color: "#a5b4fc" }}>{variables.logs_processed}</span></div>
          <div>disputed_amount: <span style={{ color: "#a5b4fc" }}>${variables.amount}</span></div>
          <div>risk_level: <span style={{ color: variables.risk === "HIGH" ? "#ef4444" : "#9ca3af" }}>{variables.risk}</span></div>
          <div>approval_given: <span style={{ color: variables.approved ? "#10b981" : "#ef4444" }}>{variables.approved ? "True" : "False"}</span></div>
        </div>
      </div>
    </div>
  );
}
