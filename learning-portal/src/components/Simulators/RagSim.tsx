"use client";

import React, { useState } from "react";

interface Step {
  id: number;
  title: string;
  desc: string;
}

export default function RagSim() {
  const [ragStep, setRagStep] = useState(0);
  const [queryText, setQueryText] = useState("What is APRA CPS 234?");

  const steps: Step[] = [
    { id: 0, title: "Input Query", desc: "User inputs raw query string." },
    { id: 1, title: "Embed Query", desc: "Convert string to high-dim vector coordinates." },
    { id: 2, title: "Vector Lookup", desc: "Search database indices (pgvector) for closest matches." },
    { id: 3, title: "Reranker Filters", desc: "Cohere Rerank sorts retrieved candidate pages by relevance." },
    { id: 4, title: "Prompt Context", desc: "Inject sorted text chunks into system instructions template." },
    { id: 5, title: "LLM Generation", desc: "Claude streams output response citing paragraph sources." }
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
      <div>
        <label style={{ fontSize: "11px", color: "#6b7280", fontWeight: "700", display: "block", marginBottom: "6px" }}>MOCK USER QUERY</label>
        <input 
          type="text" 
          value={queryText}
          onChange={(e) => setQueryText(e.target.value)}
          style={{ 
            width: "100%", background: "rgba(0,0,0,0.2)", border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: "8px", padding: "10px", color: "#fff", fontSize: "13px", outline: "none"
          }}
        />
      </div>

      {/* Step progress pipeline */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", overflowX: "auto", paddingBottom: "10px" }}>
        {steps.map((st) => (
          <div 
            key={st.id}
            onClick={() => setRagStep(st.id)}
            style={{
              flex: 1,
              minWidth: "100px",
              background: ragStep === st.id ? "rgba(99,102,241,0.15)" : "rgba(255,255,255,0.01)",
              border: ragStep === st.id ? "1px solid #6366f1" : "1px solid rgba(255,255,255,0.05)",
              padding: "8px 12px",
              borderRadius: "8px",
              cursor: "pointer",
              textAlign: "center",
              transition: "var(--transition-smooth)"
            }}
          >
            <span style={{ fontSize: "10px", color: "#6b7280", display: "block" }}>STEP {st.id + 1}</span>
            <span style={{ fontSize: "11px", fontWeight: "700", color: ragStep === st.id ? "#fff" : "#9ca3af" }}>{st.title}</span>
          </div>
        ))}
      </div>

      {/* Step details rendering box */}
      <div className="glass" style={{ padding: "16px", minHeight: "160px", background: "rgba(0,0,0,0.15)" }}>
        <h4 style={{ fontSize: "14px", fontWeight: "800", color: "#fff", marginBottom: "6px" }}>{steps[ragStep].title}</h4>
        <p style={{ fontSize: "12px", color: "#9ca3af", marginBottom: "12px" }}>{steps[ragStep].desc}</p>
        
        <div className="glass" style={{ padding: "10px", background: "rgba(0,0,0,0.25)" }}>
          {ragStep === 0 && <code style={{ fontSize: "11px", color: "#a5b4fc" }}>Query: "{queryText}"</code>}
          {ragStep === 1 && <code style={{ fontSize: "11px", color: "#a5b4fc" }}>Embedding: [0.012, -0.452, 0.887, ... (1536 floats)]</code>}
          {ragStep === 2 && (
            <div style={{ fontSize: "11px" }}>
              <span style={{ color: "#10b981", display: "block" }}>Match 1: APRA_CPS234.pdf#Page3 (Score: 0.892)</span>
              <span style={{ color: "#d1d5db" }}>"...Information security controls must be maintained on all critical IT assets..."</span>
            </div>
          )}
          {ragStep === 3 && <code style={{ fontSize: "11px", color: "#a5b4fc" }}>Reranker: Re-ordered APRA_Page3 to index 0, discarded generic bank manuals.</code>}
          {ragStep === 4 && (
            <pre style={{ margin: 0, padding: "8px", background: "transparent", border: "none" }}>
              <code style={{ fontSize: "10px", color: "#d1d5db" }}>{`System: Answer query using context only.\\nContext: [APRA Page3 snippet]\\nUser: ${queryText}`}</code>
            </pre>
          )}
          {ragStep === 5 && (
            <div style={{ fontSize: "11px" }}>
              <span style={{ color: "#10b981", display: "block" }}>Claude output (Streaming):</span>
              <p style={{ color: "#fff", marginTop: "4px" }}>
                "APRA CPS 234 dictates that entities must maintain secure parameters around critical assets to prevent data leaks [APRA_Page3]."
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
