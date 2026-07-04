"use client";

import React, { useState, useEffect } from "react";

export default function VectorSim() {
  const [bankPos, setBankPos] = useState({ x: 60, y: 60 });
  const [riverPos, setRiverPos] = useState({ x: 30, y: 160 });
  const [savingsPos, setSavingsPos] = useState({ x: 80, y: 70 });
  const [diningPos, setDiningPos] = useState({ x: 180, y: 170 });

  const calculateSimilarity = (pos1: { x: number, y: number }, pos2: { x: number, y: number }) => {
    const dx = pos1.x - pos2.x;
    const dy = pos1.y - pos2.y;
    const dist = Math.sqrt(dx*dx + dy*dy);
    // Max distance is roughly 250
    const score = Math.max(0, Math.min(100, Math.round(100 - (dist / 2.2))));
    return score;
  };

  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 220px", gap: "20px" }}>
      <div>
        <p style={{ fontSize: "13px", color: "#d1d5db", marginBottom: "16px" }}>
          Drag the semantic word nodes inside the coordinate field to change their vector coordinate values and observe real-time Cosine similarity calculations.
        </p>

        {/* Coordinate field container */}
        <div 
          style={{ 
            height: "220px", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "12px",
            background: "rgba(0,0,0,0.3)", position: "relative", overflow: "hidden"
          }}
        >
          {/* Grid lines */}
          <div style={{ position: "absolute", top: "50%", left: 0, right: 0, height: "1px", background: "rgba(255,255,255,0.04)" }}></div>
          <div style={{ position: "absolute", left: "50%", top: 0, bottom: 0, width: "1px", background: "rgba(255,255,255,0.04)" }}></div>

          {/* Draggable Dots */}
          <DraggableDot label="bank" pos={bankPos} onChange={setBankPos} color="#6366f1" />
          <DraggableDot label="river" pos={riverPos} onChange={setRiverPos} color="#a855f7" />
          <DraggableDot label="savings" pos={savingsPos} onChange={setSavingsPos} color="#10b981" />
          <DraggableDot label="dining" pos={diningPos} onChange={setDiningPos} color="#ec4899" />
        </div>
      </div>

      {/* Calculations display panel */}
      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        <span style={{ fontSize: "11px", color: "#6b7280", fontWeight: "700" }}>COSINE SIMILARITY MATRIX</span>
        
        <div className="glass" style={{ padding: "12px", background: "rgba(255,255,255,0.01)" }}>
          <span style={{ fontSize: "12px", color: "#fff", display: "block", marginBottom: "2px" }}>bank ➔ savings</span>
          <span style={{ fontSize: "18px", fontWeight: "800", color: "#10b981" }}>{calculateSimilarity(bankPos, savingsPos)}%</span>
          <span style={{ fontSize: "10px", color: "#6b7280", display: "block", marginTop: "2px" }}>Financial Cluster (Close distance)</span>
        </div>

        <div className="glass" style={{ padding: "12px", background: "rgba(255,255,255,0.01)" }}>
          <span style={{ fontSize: "12px", color: "#fff", display: "block", marginBottom: "2px" }}>bank ➔ river</span>
          <span style={{ fontSize: "18px", fontWeight: "800", color: "#ef4444" }}>{calculateSimilarity(bankPos, riverPos)}%</span>
          <span style={{ fontSize: "10px", color: "#6b7280", display: "block", marginTop: "2px" }}>Ambiguity boundary</span>
        </div>

        <div className="glass" style={{ padding: "12px", background: "rgba(255,255,255,0.01)" }}>
          <span style={{ fontSize: "12px", color: "#fff", display: "block", marginBottom: "2px" }}>bank ➔ dining</span>
          <span style={{ fontSize: "18px", fontWeight: "800", color: "#6b7280" }}>{calculateSimilarity(bankPos, diningPos)}%</span>
          <span style={{ fontSize: "10px", color: "#6b7280", display: "block", marginTop: "2px" }}>Unrelated topic</span>
        </div>
      </div>
    </div>
  );
}

// Draggable Dot Helper Component
function DraggableDot({ label, pos, onChange, color }: { 
  label: string; 
  pos: { x: number; y: number }; 
  onChange: (pos: { x: number; y: number }) => void;
  color: string;
}) {
  const [isDragging, setIsDragging] = useState(false);

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      const container = document.getElementById("vector-field");
      const rect = container ? container.getBoundingClientRect() : null;
      
      // Fallback fallback selector if container not id-mapped
      const fallbackTarget = document.querySelector("#vector-field") || e.target as HTMLElement;
      const targetRect = rect || fallbackTarget.parentElement?.getBoundingClientRect();

      if (targetRect) {
        const x = Math.max(10, Math.min( targetRect.width - 10, e.clientX - targetRect.left));
        const y = Math.max(10, Math.min( targetRect.height - 10, e.clientY - targetRect.top));
        onChange({ x, y });
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging, onChange]);

  return (
    <div 
      onMouseDown={handleMouseDown}
      style={{
        position: "absolute",
        left: `${pos.x}px`,
        top: `${pos.y}px`,
        transform: "translate(-50%, -50%)",
        background: color,
        width: "12px",
        height: "12px",
        borderRadius: "50%",
        cursor: "grab",
        boxShadow: `0 0 10px ${color}`
      }}
    >
      <span style={{ 
        position: "absolute", top: "16px", left: "50%", transform: "translateX(-50%)",
        fontSize: "11px", color: "#fff", fontWeight: "700", pointerEvents: "none",
        textTransform: "uppercase"
      }}>
        {label}
      </span>
    </div>
  );
}
