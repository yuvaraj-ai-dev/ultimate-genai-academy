"use client";

import React, { useState } from "react";
import { Repeat } from "lucide-react";

interface FlashcardData {
  front: string;
  back: string;
}

interface FlashcardProps {
  card: FlashcardData;
  activeIdx: number;
  totalCards: number;
  onRating: (rating: "easy" | "medium" | "hard") => void;
}

export default function Flashcard({ card, activeIdx, totalCards, onRating }: FlashcardProps) {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleCardClick = () => {
    setIsFlipped(!isFlipped);
  };

  const handleSelectRating = (e: React.MouseEvent, rating: "easy" | "medium" | "hard") => {
    e.stopPropagation(); // prevent flipping the card when clicking button
    onRating(rating);
    setIsFlipped(false); // reset flip state for next card
  };

  if (!card) return null;

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: "100%" }}>
      
      {/* 3D card layout */}
      <div 
        onClick={handleCardClick}
        style={{ 
          width: "100%", maxWidth: "440px", height: "200px", perspective: "1000px", cursor: "pointer",
          marginBottom: "20px"
        }}
      >
        <div 
          style={{ 
            width: "100%", height: "100%", position: "relative", transformStyle: "preserve-3d",
            transition: "transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)",
            transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)"
          }}
        >
          {/* Card Front */}
          <div className="glass" style={{ 
            position: "absolute", width: "100%", height: "100%", backfaceVisibility: "hidden",
            display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center",
            padding: "24px", textAlign: "center", background: "#0d1121"
          }}>
            <span style={{ fontSize: "10px", color: "#6b7280", fontWeight: "700", textTransform: "uppercase", marginBottom: "8px" }}>QUESTION</span>
            <p style={{ fontSize: "15px", fontWeight: "700", color: "#fff", fontFamily: "var(--font-mono)" }}>{card.front}</p>
            <div style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "11px", color: "#6b7280", marginTop: "24px" }}>
              <Repeat style={{ width: "12px", height: "12px" }} />
              Click to flip
            </div>
          </div>

          {/* Card Back */}
          <div className="glass" style={{ 
            position: "absolute", width: "100%", height: "100%", backfaceVisibility: "hidden",
            display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center",
            padding: "24px", textAlign: "center", transform: "rotateY(180deg)", background: "#111827"
          }}>
            <span style={{ fontSize: "10px", color: "#10b981", fontWeight: "700", textTransform: "uppercase", marginBottom: "8px" }}>ANSWER</span>
            <p style={{ fontSize: "14px", color: "#d1d5db", lineHeight: "1.5" }}>{card.back}</p>
            <div style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "11px", color: "#6b7280", marginTop: "24px" }}>
              <Repeat style={{ width: "12px", height: "12px" }} />
              Click to flip back
            </div>
          </div>
        </div>
      </div>

      {/* Spaced repetition rating bar */}
      {isFlipped && (
        <div style={{ display: "flex", gap: "10px", width: "100%", maxWidth: "440px" }} className="fade-in-content">
          <button 
            onClick={(e) => handleSelectRating(e, "hard")}
            style={{ flex: 1, background: "rgba(239, 68, 68, 0.1)", border: "1px solid #ef4444", color: "#ef4444", padding: "8px", borderRadius: "8px", cursor: "pointer", fontSize: "12px", fontWeight: "700" }}
          >
            Hard (Review Soon)
          </button>
          <button 
            onClick={(e) => handleSelectRating(e, "medium")}
            style={{ flex: 1, background: "rgba(245, 158, 11, 0.1)", border: "1px solid #f59e0b", color: "#f59e0b", padding: "8px", borderRadius: "8px", cursor: "pointer", fontSize: "12px", fontWeight: "700" }}
          >
            Medium
          </button>
          <button 
            onClick={(e) => handleSelectRating(e, "easy")}
            style={{ flex: 1, background: "rgba(16, 185, 129, 0.1)", border: "1px solid #10b981", color: "#10b981", padding: "8px", borderRadius: "8px", cursor: "pointer", fontSize: "12px", fontWeight: "700" }}
          >
            Easy (Mastered)
          </button>
        </div>
      )}
      
      <div style={{ marginTop: "16px", fontSize: "11px", color: "#6b7280" }}>
        Card {activeIdx + 1} of {totalCards}
      </div>
    </div>
  );
}
