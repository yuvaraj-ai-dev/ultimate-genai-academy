"use client";

import React, { useState } from "react";

export default function AttentionSim() {
  const tokens = ["The", "bank", "handles", "customer", "credit", "card", "deposits", "securely"];
  const [selectedToken, setSelectedToken] = useState<number | null>(null);

  // Simulated weights map
  const getWeights = (index: number) => {
    const arr = Array(tokens.length).fill(0.02);
    if (index === 1) { // bank
      arr[1] = 0.45; // bank
      arr[6] = 0.32; // deposits
      arr[2] = 0.12; // handles
      arr[4] = 0.07; // credit
    } else if (index === 4 || index === 5) { // credit / card
      arr[4] = 0.40; // credit
      arr[5] = 0.35; // card
      arr[1] = 0.15; // bank
      arr[6] = 0.08; // deposits
    } else if (index === 6) { // deposits
      arr[6] = 0.50; // deposits
      arr[1] = 0.25; // bank
      arr[2] = 0.15; // handles
      arr[7] = 0.06; // securely
    } else {
      arr[index] = 0.60;
      arr[(index + 1) % tokens.length] = 0.20;
      arr[(index + 2) % tokens.length] = 0.10;
    }
    return arr;
  };

  const weights = selectedToken !== null ? getWeights(selectedToken) : Array(tokens.length).fill(0);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
      <p style={{ fontSize: "13px", color: "var(--text-secondary)" }}>
        Click a word below to simulate Query attention weights. Colored nodes display how the word establishes connections with other tokens in parallel.
      </p>

      {/* Tokens Row */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: "10px", justifyContent: "center", margin: "24px 0" }}>
        {tokens.map((token, idx) => {
          const weight = weights[idx];
          const isSelected = selectedToken === idx;
          return (
            <div 
              key={idx}
              onClick={() => setSelectedToken(idx)}
              style={{
                background: isSelected 
                  ? "var(--color-blue)" 
                  : weight > 0.1 
                    ? `rgba(99, 102, 241, ${weight})` 
                    : "var(--bg-hover)",
                border: isSelected 
                  ? "1px solid var(--color-blue)" 
                  : weight > 0.1 
                    ? "1px solid rgba(99, 102, 241, 0.4)" 
                    : "1px solid var(--border-color)",
                padding: "12px 20px",
                borderRadius: "8px",
                color: isSelected ? "#fff" : weight > 0.2 ? "var(--color-blue)" : "var(--text-secondary)",
                cursor: "pointer",
                fontWeight: "700",
                textAlign: "center",
                minWidth: "70px",
                transition: "var(--transition-smooth)"
              }}
            >
              <span>{token}</span>
              {selectedToken !== null && (
                <span style={{ display: "block", fontSize: "10px", marginTop: "4px", opacity: 0.8 }}>
                  {Math.round(weight * 100)}%
                </span>
              )}
            </div>
          );
        })}
      </div>

      {selectedToken !== null ? (
        <div className="glass" style={{ padding: "16px", background: "var(--bg-dark)", border: "1px solid var(--border-color)", borderRadius: "8px" }}>
          <span style={{ fontSize: "11px", color: "var(--color-gold)", fontWeight: "700", display: "block", marginBottom: "4px" }}>Attention Narrative:</span>
          <p style={{ fontSize: "12px", color: "var(--text-primary)" }}>
            {selectedToken === 1 && "Evaluating the word 'bank' triggers strong Query attention flags on 'deposits' (32%) and 'handles' (12%), categorizing the token coordinates in a financial transactional context rather than a river bank context."}
            {selectedToken === 4 && "The word 'credit' maps relationships directly to its noun pair ('card': 35%) and matching bank institution ('bank': 15%)."}
            {selectedToken === 6 && "The action 'deposits' pulls values directly from 'bank' (25%) and 'handles' (15%) to structure parameter targets."}
            {selectedToken !== 1 && selectedToken !== 4 && selectedToken !== 6 && "Standard self-attention weighting focuses context on neighboring elements."}
          </p>
        </div>
      ) : (
        <div style={{ textAlign: "center", color: "var(--text-disabled)", fontSize: "12px", padding: "10px" }}>
          Click a token above to calculate attention weights matrices.
        </div>
      )}
    </div>
  );
}
