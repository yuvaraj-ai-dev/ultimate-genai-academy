"use client";

import React from "react";

interface ConceptDiagramProps {
  topic: string;
  onZoom: (url: string) => void;
}

const topicImages: { [key: string]: string } = {
  "LLM Fundamentals": "/images/transformer_architecture.png",
  "Prompt Engineering": "/images/prompt_flow.png",
  "RAG": "/images/rag_flow.png",
  "Embeddings": "/images/vector_space.png",
  "Vector Databases": "/images/vector_index.png",
  "AI Agents": "/images/agent_graph.png",
  "MCP": "/images/mcp_protocol.png",
  "LLMOps / MLOps": "/images/llmops_tracing.png",
  "Security": "/images/security_guards.png",
  "Cloud": "/images/cloud_bedrock.png",
  "Banking Domain Knowledge": "/images/banking_compliance.png",
  "Backend Engineering": "/images/banking_compliance.png"
};

function renderSvgFlow(topic: string) {
  if (topic === "LLM Fundamentals") {
    return (
      <div style={{ textAlign: "center", padding: "16px", background: "var(--bg-card)", borderRadius: "12px", border: "1px solid var(--border-color)" }}>
        <span style={{ fontSize: "11px", color: "var(--text-disabled)", display: "block", marginBottom: "12px", fontWeight: "700" }}>TRANSFORMER DATA FLOW</span>
        <svg width="100%" height="120" viewBox="0 0 500 120" fill="none">
          <rect x="10" y="40" width="70" height="40" rx="8" fill="var(--bg-surface)" stroke="var(--color-blue)" strokeWidth="2" />
          <text x="45" y="65" fill="var(--text-primary)" fontSize="10" fontWeight="700" textAnchor="middle">Query (Q)</text>
          
          <path d="M80 60 L140 60" stroke="var(--color-blue)" strokeWidth="2" strokeDasharray="4" />
          
          <rect x="150" y="10" width="130" height="40" rx="8" fill="var(--bg-surface)" stroke="var(--color-emerald)" strokeWidth="2" />
          <text x="215" y="35" fill="var(--text-primary)" fontSize="10" fontWeight="700" textAnchor="middle">Key Match (QKᵀ / √d_k)</text>

          <rect x="150" y="70" width="130" height="40" rx="8" fill="var(--bg-surface)" stroke="var(--color-emerald)" strokeWidth="2" />
          <text x="215" y="95" fill="var(--text-primary)" fontSize="10" fontWeight="700" textAnchor="middle">Value Weights (V)</text>
          
          <path d="M280 30 L340 50" stroke="var(--color-emerald)" strokeWidth="2" />
          <path d="M280 90 L340 70" stroke="var(--color-emerald)" strokeWidth="2" />

          <rect x="350" y="40" width="130" height="40" rx="8" fill="var(--bg-surface)" stroke="var(--color-purple)" strokeWidth="2" />
          <text x="415" y="65" fill="var(--text-primary)" fontSize="10" fontWeight="700" textAnchor="middle">Attention Output</text>
        </svg>
      </div>
    );
  }

  if (topic === "Prompt Engineering") {
    return (
      <div style={{ textAlign: "center", padding: "16px", background: "var(--bg-card)", borderRadius: "12px", border: "1px solid var(--border-color)" }}>
        <span style={{ fontSize: "11px", color: "var(--text-disabled)", display: "block", marginBottom: "12px", fontWeight: "700" }}>PROMPT CONFIGURATION GATEWAY</span>
        <svg width="100%" height="120" viewBox="0 0 500 120" fill="none">
          <rect x="10" y="40" width="90" height="40" rx="6" fill="var(--bg-surface)" stroke="var(--color-blue)" strokeWidth="2" />
          <text x="55" y="65" fill="var(--text-primary)" fontSize="9" fontWeight="700" textAnchor="middle">System Prompt</text>
          <path d="M100 60 L130 60" stroke="var(--color-blue)" strokeWidth="2" />

          <rect x="130" y="40" width="100" height="40" rx="6" fill="var(--bg-surface)" stroke="var(--color-purple)" strokeWidth="2" />
          <text x="180" y="65" fill="var(--text-primary)" fontSize="9" fontWeight="700" textAnchor="middle">Few-Shot Examples</text>
          <path d="M230 60 L260 60" stroke="var(--color-purple)" strokeWidth="2" />

          <rect x="260" y="40" width="90" height="40" rx="6" fill="var(--bg-surface)" stroke="var(--color-gold)" strokeWidth="2" />
          <text x="305" y="65" fill="var(--text-primary)" fontSize="9" fontWeight="700" textAnchor="middle">XML Tag Filter</text>
          <path d="M350 60 L380 60" stroke="var(--color-gold)" strokeWidth="2" />

          <rect x="380" y="40" width="110" height="40" rx="6" fill="var(--bg-surface)" stroke="var(--color-emerald)" strokeWidth="2" />
          <text x="435" y="65" fill="var(--text-primary)" fontSize="9" fontWeight="700" textAnchor="middle">Structured Output</text>
        </svg>
      </div>
    );
  }

  if (topic === "RAG") {
    return (
      <div style={{ textAlign: "center", padding: "16px", background: "var(--bg-card)", borderRadius: "12px", border: "1px solid var(--border-color)" }}>
        <span style={{ fontSize: "11px", color: "var(--text-disabled)", display: "block", marginBottom: "12px", fontWeight: "700" }}>RETRIEVAL-AUGMENTED GENERATION STAGES</span>
        <svg width="100%" height="120" viewBox="0 0 500 120" fill="none">
          <rect x="10" y="40" width="70" height="40" rx="6" fill="var(--bg-surface)" stroke="var(--color-blue)" strokeWidth="2" />
          <text x="45" y="65" fill="var(--text-primary)" fontSize="9" fontWeight="700" textAnchor="middle">User Query</text>
          <path d="M80 60 L110 60" stroke="var(--color-blue)" strokeWidth="2" />

          <rect x="110" y="40" width="90" height="40" rx="6" fill="var(--bg-surface)" stroke="var(--color-purple)" strokeWidth="2" />
          <text x="155" y="65" fill="var(--text-primary)" fontSize="9" fontWeight="700" textAnchor="middle">Vector Lookup</text>
          <path d="M200 60 L230 60" stroke="var(--color-purple)" strokeWidth="2" />

          <rect x="230" y="40" width="90" height="40" rx="6" fill="var(--bg-surface)" stroke="var(--color-gold)" strokeWidth="2" />
          <text x="275" y="65" fill="var(--text-primary)" fontSize="9" fontWeight="700" textAnchor="middle">Cohere Rerank</text>
          <path d="M320 60 L350 60" stroke="var(--color-gold)" strokeWidth="2" />

          <rect x="350" y="40" width="140" height="40" rx="6" fill="var(--bg-surface)" stroke="var(--color-emerald)" strokeWidth="2" />
          <text x="420" y="65" fill="var(--text-primary)" fontSize="9" fontWeight="700" textAnchor="middle">LLM Gen w/ Citations</text>
        </svg>
      </div>
    );
  }

  if (topic === "Embeddings") {
    return (
      <div style={{ textAlign: "center", padding: "16px", background: "var(--bg-card)", borderRadius: "12px", border: "1px solid var(--border-color)" }}>
        <span style={{ fontSize: "11px", color: "var(--text-disabled)", display: "block", marginBottom: "12px", fontWeight: "700" }}>SEMANTIC VECTOR SPACE GEOMETRY</span>
        <svg width="100%" height="120" viewBox="0 0 500 120" fill="none">
          <line x1="40" y1="10" x2="40" y2="110" stroke="var(--border-color)" strokeWidth="2" />
          <line x1="40" y1="110" x2="450" y2="110" stroke="var(--border-color)" strokeWidth="2" />
          
          <line x1="40" y1="110" x2="180" y2="30" stroke="var(--color-blue)" strokeWidth="3" />
          <text x="190" y="35" fill="var(--color-blue)" fontSize="10" fontWeight="700">bank vector (coordinate A)</text>

          <line x1="40" y1="110" x2="220" y2="40" stroke="var(--color-emerald)" strokeWidth="3" />
          <text x="230" y="45" fill="var(--color-emerald)" fontSize="10" fontWeight="700">savings vector (coordinate B)</text>

          <path d="M90 85 A 50 50 0 0 0 110 98" stroke="var(--color-gold)" strokeWidth="2" fill="none" />
          <text x="120" y="80" fill="var(--color-gold)" fontSize="10">Small θ (High Similarity)</text>

          <line x1="40" y1="110" x2="350" y2="100" stroke="var(--color-red)" strokeWidth="3" />
          <text x="360" y="95" fill="var(--color-red)" fontSize="10" fontWeight="700">dining vector</text>
        </svg>
      </div>
    );
  }

  if (topic === "Vector Databases") {
    return (
      <div style={{ textAlign: "center", padding: "16px", background: "var(--bg-card)", borderRadius: "12px", border: "1px solid var(--border-color)" }}>
        <span style={{ fontSize: "11px", color: "var(--text-disabled)", display: "block", marginBottom: "12px", fontWeight: "700" }}>APPROXIMATE NEAREST NEIGHBOR (HNSW GRAPH)</span>
        <svg width="100%" height="120" viewBox="0 0 500 120" fill="none">
          {/* Layer 3 */}
          <circle cx="80" cy="30" r="6" fill="var(--color-blue)" />
          <circle cx="250" cy="30" r="6" fill="var(--color-blue)" />
          <line x1="86" y1="30" x2="244" y2="30" stroke="var(--color-blue)" strokeWidth="2" />
          <text x="20" y="34" fill="var(--text-disabled)" fontSize="9">Layer 3 (Fast)</text>

          {/* Layer 2 */}
          <circle cx="80" cy="60" r="6" fill="var(--color-purple)" />
          <circle cx="160" cy="60" r="6" fill="var(--color-purple)" />
          <circle cx="250" cy="60" r="6" fill="var(--color-purple)" />
          <circle cx="340" cy="60" r="6" fill="var(--color-purple)" />
          <line x1="86" y1="60" x2="154" y2="60" stroke="var(--color-purple)" strokeWidth="1.5" />
          <line x1="166" y1="60" x2="244" y2="60" stroke="var(--color-purple)" strokeWidth="1.5" />
          <line x1="256" y1="60" x2="334" y2="60" stroke="var(--color-purple)" strokeWidth="1.5" />
          <text x="20" y="64" fill="var(--text-disabled)" fontSize="9">Layer 2</text>

          {/* Layer 1 */}
          <circle cx="80" cy="90" r="6" fill="var(--color-emerald)" />
          <circle cx="120" cy="90" r="6" fill="var(--color-emerald)" />
          <circle cx="160" cy="90" r="6" fill="var(--color-emerald)" />
          <circle cx="200" cy="90" r="6" fill="var(--color-emerald)" />
          <circle cx="250" cy="90" r="6" fill="var(--color-emerald)" />
          <circle cx="300" cy="90" r="6" fill="var(--color-emerald)" />
          <circle cx="340" cy="90" r="6" fill="var(--color-emerald)" />
          <circle cx="400" cy="90" r="6" fill="var(--color-emerald)" />
          <line x1="80" y1="36" x2="80" y2="84" stroke="var(--border-color)" strokeDasharray="3" />
          <line x1="250" y1="36" x2="250" y2="84" stroke="var(--border-color)" strokeDasharray="3" />
          <text x="20" y="94" fill="var(--text-disabled)" fontSize="9">Layer 1 (Dense)</text>
        </svg>
      </div>
    );
  }

  if (topic === "AI Agents") {
    return (
      <div style={{ textAlign: "center", padding: "16px", background: "var(--bg-card)", borderRadius: "12px", border: "1px solid var(--border-color)" }}>
        <span style={{ fontSize: "11px", color: "var(--text-disabled)", display: "block", marginBottom: "12px", fontWeight: "700" }}>LANGGRAPH AGENT STATE MACHINE</span>
        <svg width="100%" height="120" viewBox="0 0 500 120" fill="none">
          <circle cx="50" cy="60" r="16" fill="var(--bg-surface)" stroke="var(--border-color)" strokeWidth="2" />
          <text x="50" y="64" fill="var(--text-primary)" fontSize="8" fontWeight="700" textAnchor="middle">START</text>
          <path d="M66 60 L100 60" stroke="var(--color-blue)" strokeWidth="2" />

          <rect x="100" y="40" width="80" height="40" rx="8" fill="var(--bg-surface)" stroke="var(--color-blue)" strokeWidth="2" />
          <text x="140" y="63" fill="var(--text-primary)" fontSize="9" fontWeight="700" textAnchor="middle">Agent Planner</text>
          <path d="M180 60 L210 60" stroke="var(--color-blue)" strokeWidth="2" />

          {/* Conditional edge check */}
          <polygon points="210,60 235,35 260,60 235,85" fill="var(--bg-surface)" stroke="var(--color-gold)" strokeWidth="2" />
          <text x="235" y="63" fill="var(--text-primary)" fontSize="8" fontWeight="700" textAnchor="middle">Loop?</text>
          <path d="M235 35 L235 15 L140 15 L140 40" stroke="var(--color-gold)" strokeWidth="2" strokeDasharray="3" />
          <path d="M260 60 L300 60" stroke="var(--color-emerald)" strokeWidth="2" />

          <rect x="300" y="40" width="100" height="40" rx="8" fill="var(--bg-surface)" stroke="var(--color-emerald)" strokeWidth="2" />
          <text x="350" y="63" fill="var(--text-primary)" fontSize="9" fontWeight="700" textAnchor="middle">Human Approval</text>
          <path d="M400 60 L430 60" stroke="var(--color-emerald)" strokeWidth="2" />

          <circle cx="450" cy="60" r="16" fill="var(--bg-surface)" stroke="var(--color-purple)" strokeWidth="2" />
          <text x="450" y="64" fill="var(--text-primary)" fontSize="8" fontWeight="700" textAnchor="middle">END</text>
        </svg>
      </div>
    );
  }

  if (topic === "MCP") {
    return (
      <div style={{ textAlign: "center", padding: "16px", background: "var(--bg-card)", borderRadius: "12px", border: "1px solid var(--border-color)" }}>
        <span style={{ fontSize: "11px", color: "var(--text-disabled)", display: "block", marginBottom: "12px", fontWeight: "700" }}>MODEL CONTEXT PROTOCOL (JSON-RPC VIA STDIO)</span>
        <svg width="100%" height="120" viewBox="0 0 500 120" fill="none">
          <rect x="10" y="30" width="110" height="60" rx="8" fill="var(--bg-surface)" stroke="var(--color-blue)" strokeWidth="2" />
          <text x="65" y="60" fill="var(--text-primary)" fontSize="10" fontWeight="700" textAnchor="middle">LLM Host Client</text>
          <text x="65" y="75" fill="var(--text-disabled)" fontSize="8" textAnchor="middle">(Claude / Cursor)</text>

          <path d="M120 45 L200 45" stroke="var(--color-purple)" strokeWidth="2" />
          <text x="160" y="40" fill="var(--color-purple)" fontSize="8" textAnchor="middle">stdio query</text>
          <path d="M200 75 L120 75" stroke="var(--color-purple)" strokeWidth="2" />
          <text x="160" y="85" fill="var(--color-purple)" fontSize="8" textAnchor="middle">JSON-RPC response</text>

          <rect x="210" y="30" width="110" height="60" rx="8" fill="var(--bg-surface)" stroke="var(--color-purple)" strokeWidth="2" />
          <text x="265" y="60" fill="var(--text-primary)" fontSize="10" fontWeight="700" textAnchor="middle">MCP Server</text>
          <text x="265" y="75" fill="var(--text-disabled)" fontSize="8" textAnchor="middle">(FastMCP Python)</text>

          <path d="M320 60 L380 60" stroke="var(--color-emerald)" strokeWidth="2" />

          <rect x="390" y="30" width="100" height="60" rx="8" fill="var(--bg-surface)" stroke="var(--color-emerald)" strokeWidth="2" />
          <text x="440" y="55" fill="var(--text-primary)" fontSize="10" fontWeight="700" textAnchor="middle">Local Tool</text>
          <text x="440" y="70" fill="var(--text-disabled)" fontSize="8" textAnchor="middle">(SQLite / OS Files)</text>
        </svg>
      </div>
    );
  }

  if (topic === "LLMOps / MLOps") {
    return (
      <div style={{ textAlign: "center", padding: "16px", background: "var(--bg-card)", borderRadius: "12px", border: "1px solid var(--border-color)" }}>
        <span style={{ fontSize: "11px", color: "var(--text-disabled)", display: "block", marginBottom: "12px", fontWeight: "700" }}>OPENTELEMETRY TRACE SPANS TIMELINE</span>
        <svg width="100%" height="120" viewBox="0 0 500 120" fill="none">
          <rect x="40" y="15" width="420" height="20" rx="4" fill="var(--bg-surface)" stroke="var(--color-blue)" strokeWidth="2" />
          <text x="50" y="28" fill="var(--text-primary)" fontSize="9" fontWeight="700">HTTP POST /generate_audit_report (latency: 1800ms)</text>

          <rect x="80" y="45" width="120" height="20" rx="4" fill="var(--bg-surface)" stroke="var(--color-purple)" strokeWidth="1.5" />
          <text x="90" y="58" fill="var(--text-primary)" fontSize="8" fontWeight="700">pgvector Query (150ms)</text>

          <rect x="210" y="45" width="90" height="20" rx="4" fill="var(--bg-surface)" stroke="var(--color-gold)" strokeWidth="1.5" />
          <text x="220" y="58" fill="var(--text-primary)" fontSize="8" fontWeight="700">Cohere Rerank (300ms)</text>

          <rect x="310" y="75" width="140" height="20" rx="4" fill="var(--bg-surface)" stroke="var(--color-emerald)" strokeWidth="1.5" />
          <text x="320" y="88" fill="var(--text-primary)" fontSize="8" fontWeight="700">Bedrock Claude 3.5 (1300ms)</text>
        </svg>
      </div>
    );
  }

  if (topic === "Security") {
    return (
      <div style={{ textAlign: "center", padding: "16px", background: "var(--bg-card)", borderRadius: "12px", border: "1px solid var(--border-color)" }}>
        <span style={{ fontSize: "11px", color: "var(--text-disabled)", display: "block", marginBottom: "12px", fontWeight: "700" }}>PII SCRUBBER & LLAMAGUARD SECURITY WALL</span>
        <svg width="100%" height="120" viewBox="0 0 500 120" fill="none">
          <rect x="10" y="40" width="80" height="40" rx="6" fill="var(--bg-surface)" stroke="var(--color-blue)" strokeWidth="2" />
          <text x="50" y="65" fill="var(--text-primary)" fontSize="9" fontWeight="700" textAnchor="middle">User Input</text>
          <path d="M90 60 L120 60" stroke="var(--color-blue)" strokeWidth="2" />

          <rect x="120" y="25" width="100" height="70" rx="8" fill="var(--bg-surface)" stroke="var(--color-red)" strokeWidth="2" />
          <text x="170" y="50" fill="var(--color-red)" fontSize="9" fontWeight="800" textAnchor="middle">PII Redactor</text>
          <text x="170" y="65" fill="var(--text-disabled)" fontSize="8" textAnchor="middle">(Microsoft Presidio)</text>
          <path d="M220 60 L250 60" stroke="var(--color-red)" strokeWidth="2" />

          <rect x="250" y="40" width="80" height="40" rx="6" fill="var(--bg-surface)" stroke="var(--color-purple)" strokeWidth="2" />
          <text x="290" y="65" fill="var(--text-primary)" fontSize="9" fontWeight="700" textAnchor="middle">LLM Engine</text>
          <path d="M330 60 L360 60" stroke="var(--color-purple)" strokeWidth="2" />

          <rect x="360" y="25" width="100" height="70" rx="8" fill="var(--bg-surface)" stroke="var(--color-red)" strokeWidth="2" />
          <text x="410" y="50" fill="var(--color-red)" fontSize="9" fontWeight="800" textAnchor="middle">LlamaGuard</text>
          <text x="410" y="65" fill="var(--text-disabled)" fontSize="8" textAnchor="middle">(Output Check)</text>
        </svg>
      </div>
    );
  }

  if (topic === "Cloud") {
    return (
      <div style={{ textAlign: "center", padding: "16px", background: "var(--bg-card)", borderRadius: "12px", border: "1px solid var(--border-color)" }}>
        <span style={{ fontSize: "11px", color: "var(--text-disabled)", display: "block", marginBottom: "12px", fontWeight: "700" }}>AWS VPC SECURE BEDROCK ARCHITECTURE</span>
        <svg width="100%" height="120" viewBox="0 0 500 120" fill="none">
          <rect x="10" y="30" width="80" height="60" rx="8" fill="var(--bg-surface)" stroke="var(--color-blue)" strokeWidth="2" />
          <text x="50" y="65" fill="var(--text-primary)" fontSize="10" fontWeight="700" textAnchor="middle">User Client</text>
          <path d="M90 60 L140 60" stroke="var(--color-blue)" strokeWidth="2" />

          <rect x="140" y="10" width="340" height="100" rx="10" fill="var(--bg-surface)" stroke="var(--border-color)" strokeWidth="2" strokeDasharray="4" />
          <text x="310" y="22" fill="var(--text-disabled)" fontSize="8" fontWeight="700" textAnchor="middle">PRIVATE ENDPOINT VPC SUBNET</text>

          <rect x="160" y="40" width="120" height="40" rx="6" fill="var(--bg-surface)" stroke="var(--color-purple)" strokeWidth="2" />
          <text x="220" y="63" fill="var(--text-primary)" fontSize="9" fontWeight="700" textAnchor="middle">FastAPI on ECS Fargate</text>
          <path d="M280 60 L340 60" stroke="var(--color-purple)" strokeWidth="2" />

          <rect x="340" y="40" width="120" height="40" rx="6" fill="var(--bg-surface)" stroke="var(--color-emerald)" strokeWidth="2" />
          <text x="400" y="63" fill="var(--text-primary)" fontSize="9" fontWeight="700" textAnchor="middle">AWS Bedrock Client</text>
        </svg>
      </div>
    );
  }

  // Fallback default diagram
  return (
    <div style={{ textAlign: "center", padding: "16px", background: "var(--bg-card)", borderRadius: "12px", border: "1px solid var(--border-color)" }}>
      <span style={{ fontSize: "11px", color: "var(--text-disabled)", display: "block", marginBottom: "12px", fontWeight: "700" }}>CONCEPT ARCHITECTURE PIPELINE</span>
      <svg width="100%" height="120" viewBox="0 0 500 120" fill="none">
        <rect x="20" y="40" width="100" height="40" rx="8" fill="var(--bg-surface)" stroke="var(--border-color)" strokeWidth="2" />
        <text x="70" y="64" fill="var(--text-primary)" fontSize="10" fontWeight="700" textAnchor="middle">Input Data</text>
        
        <path d="M120 60 L200 60" stroke="var(--border-color)" strokeWidth="2" strokeDasharray="4" />
        
        <rect x="200" y="20" width="120" height="80" rx="12" fill="var(--bg-surface)" stroke="var(--color-blue)" strokeWidth="2" />
        <text x="260" y="55" fill="var(--color-blue)" fontSize="11" fontWeight="800" textAnchor="middle">AI Pipeline</text>
        <text x="260" y="70" fill="var(--text-disabled)" fontSize="8" textAnchor="middle">({topic})</text>
        
        <path d="M320 60 L400 60" stroke="var(--color-blue)" strokeWidth="2" />

        <rect x="400" y="40" width="80" height="40" rx="8" fill="var(--border-color)" stroke="var(--border-color)" strokeWidth="2" />
        <text x="440" y="64" fill="var(--text-primary)" fontSize="10" fontWeight="700" textAnchor="middle">Result</text>
      </svg>
    </div>
  );
}

export default function ConceptDiagram({ topic, onZoom }: ConceptDiagramProps) {
  const imageUrl = topicImages[topic];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
      {imageUrl && (
        <div className="glass" style={{ padding: "8px", background: "var(--bg-card)", borderRadius: "12px", border: "1px solid var(--border-color)" }}>
          <span style={{ fontSize: "10px", color: "var(--text-disabled)", display: "block", marginBottom: "8px", fontWeight: "700", textTransform: "uppercase" }}>
            Visual Topic Illustration
          </span>
          <div 
            style={{ position: "relative", width: "100%", borderRadius: "8px", overflow: "hidden", background: "var(--bg-dark)", border: "1px solid var(--border-color)" }}
          >
            <img 
              src={imageUrl} 
              alt={`${topic} Illustration`} 
              style={{ width: "100%", height: "auto", display: "block", objectFit: "contain" }} 
            />
            {/* Full Image Trigger Button in the Bottom Right Corner of Image Card */}
            <button 
              onClick={() => onZoom(imageUrl)}
              style={{
                position: "absolute",
                right: "12px",
                bottom: "12px",
                background: "var(--color-blue)",
                border: "none",
                color: "#fff",
                padding: "6px 12px",
                borderRadius: "6px",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: "6px",
                fontSize: "11px",
                fontWeight: "700",
                transition: "var(--transition-smooth)",
                boxShadow: "0 4px 12px rgba(0,0,0,0.2)"
              }}
              title="Expand Full Image"
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3" />
              </svg>
              Full Image
            </button>
          </div>
        </div>
      )}
      {renderSvgFlow(topic)}
    </div>
  );
}
