"use client";

import React, { useState } from "react";
import { QuizQuestion } from "../../data/course_data";

interface QuizProps {
  quizzes: QuizQuestion[];
  score: number | null;
  selectedAnswers: { [key: number]: number };
  onSelectAnswer: (qIdx: number, optIdx: number) => void;
  onSubmit: () => void;
  onRetry: () => void;
}

export default function Quiz({ 
  quizzes, 
  score, 
  selectedAnswers, 
  onSelectAnswer, 
  onSubmit, 
  onRetry 
}: QuizProps) {
  
  if (!quizzes || quizzes.length === 0) return null;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
      <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
        {quizzes.map((quiz, qIdx) => (
          <div key={qIdx} className="glass" style={{ padding: "16px", background: "rgba(255,255,255,0.01)" }}>
            <span style={{ fontSize: "11px", color: "#6b7280", fontWeight: "700", display: "block", marginBottom: "8px" }}>QUESTION {qIdx + 1}</span>
            <h4 style={{ fontSize: "14px", fontWeight: "700", color: "#fff", marginBottom: "12px" }}>{quiz.question}</h4>
            
            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              {quiz.options.map((opt, optIdx) => {
                const isSelected = selectedAnswers[qIdx] === optIdx;
                const showCorrect = score !== null && optIdx === quiz.correctIndex;
                const showIncorrect = score !== null && isSelected && optIdx !== quiz.correctIndex;

                return (
                  <button
                    key={optIdx}
                    onClick={() => {
                      if (score === null) {
                        onSelectAnswer(qIdx, optIdx);
                      }
                    }}
                    style={{
                      textAlign: "left",
                      background: showCorrect 
                        ? "rgba(16, 185, 129, 0.15)" 
                        : showIncorrect 
                          ? "rgba(239, 68, 68, 0.15)" 
                          : isSelected 
                            ? "rgba(99, 102, 241, 0.1)" 
                            : "rgba(255,255,255,0.02)",
                      border: showCorrect 
                        ? "1px solid #10b981" 
                        : showIncorrect 
                          ? "1px solid #ef4444" 
                          : isSelected 
                            ? "1px solid #6366f1" 
                            : "1px solid rgba(255,255,255,0.05)",
                      padding: "10px 14px",
                      borderRadius: "8px",
                      color: showCorrect ? "#10b981" : showIncorrect ? "#ef4444" : "#d1d5db",
                      cursor: score !== null ? "default" : "pointer",
                      fontSize: "13px",
                      transition: "var(--transition-smooth)",
                      outline: "none"
                    }}
                  >
                    {opt}
                  </button>
                );
              })}
            </div>

            {/* Answer explanation */}
            {score !== null && (
              <div style={{ marginTop: "12px", fontSize: "12px", color: "#9ca3af", background: "rgba(255,255,255,0.02)", padding: "10px", borderRadius: "6px" }}>
                <span style={{ fontWeight: "700", color: "#fff", display: "block", marginBottom: "2px" }}>Explanation:</span>
                {quiz.explanation}
              </div>
            )}
          </div>
        ))}
      </div>

      {score === null ? (
        <button 
          onClick={onSubmit}
          disabled={Object.keys(selectedAnswers).length < quizzes.length}
          style={{ 
            alignSelf: "flex-start", background: "#6366f1", color: "#fff", border: "none", 
            padding: "10px 20px", borderRadius: "8px", cursor: "pointer", fontWeight: "700",
            opacity: Object.keys(selectedAnswers).length < quizzes.length ? 0.5 : 1
          }}
        >
          Submit Answers
        </button>
      ) : (
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <span style={{ fontSize: "16px", fontWeight: "800", color: "#fff" }}>
            Score: {score} / {quizzes.length}
          </span>
          <button 
            onClick={onRetry}
            style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", color: "#fff", padding: "8px 16px", borderRadius: "8px", cursor: "pointer" }}
          >
            Retry Quiz
          </button>
        </div>
      )}
    </div>
  );
}
