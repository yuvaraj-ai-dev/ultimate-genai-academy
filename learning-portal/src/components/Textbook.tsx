"use client";

import React, { useState, useEffect } from "react";
import { DayData } from "../data/course_data";
import ConceptDiagram from "./ui/ConceptDiagram";
import Flashcard from "./ui/Flashcard";
import Quiz from "./ui/Quiz";

// Dynamic Simulator loaders
import AttentionSim from "./Simulators/AttentionSim";
import VectorSim from "./Simulators/VectorSim";
import RagSim from "./Simulators/RagSim";
import LangGraphSim from "./Simulators/LangGraphSim";
import PromptSim from "./Simulators/PromptSim";
import McpSim from "./Simulators/McpSim";
import SecuritySim from "./Simulators/SecuritySim";

import { 
  BookOpen, Play, Lightbulb, AlertTriangle, ChevronRight, 
  ArrowRight, FileCode, CheckCircle2, ChevronLeft,
  PanelLeftClose, PanelLeftOpen, PanelRightClose, PanelRightOpen
} from "lucide-react";

interface TextbookProps {
  day: DayData;
  isCompleted: boolean;
  onToggleComplete: () => void;
  topicColor: string;
  showSidebar: boolean;
  onToggleSidebar: () => void;
  showTutor: boolean;
  onToggleTutor: () => void;
  onZoom: (url: string) => void;
}

export default function Textbook({ 
  day, 
  isCompleted, 
  onToggleComplete, 
  topicColor,
  showSidebar,
  onToggleSidebar,
  showTutor,
  onToggleTutor,
  onZoom
}: TextbookProps) {
  
  const [activeTab, setActiveTab] = useState<"overview" | "concept" | "playground" | "videos" | "code" | "practice">("overview");

  // Reset tab when day changes
  useEffect(() => {
    setActiveTab("overview");
  }, [day]);

  // Quiz helper states
  const [selectedAnswers, setSelectedAnswers] = useState<{ [key: number]: number }>({});
  const [quizScore, setQuizScore] = useState<number | null>(null);

  // Flashcards helper states
  const [activeCardIdx, setActiveCardIdx] = useState(0);

  const handleCardRating = (rating: "easy" | "medium" | "hard") => {
    const key = `d${day.id}-c${activeCardIdx}`;
    localStorage.setItem(`card-rating-${key}`, rating);
    
    // Auto-advance card
    setTimeout(() => {
      if (activeCardIdx < day.flashcards.length - 1) {
        setActiveCardIdx(activeCardIdx + 1);
      }
    }, 600);
  };

  const handleQuizSubmit = () => {
    let score = 0;
    day.quizzes.forEach((q, idx) => {
      if (selectedAnswers[idx] === q.correctIndex) {
        score++;
      }
    });
    setQuizScore(score);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh", overflowY: "auto", background: "var(--bg-dark)" }}>
      
      {/* Textbook Header */}
      <header className="glass" style={{ margin: "20px", padding: "20px", background: "var(--bg-surface)", border: "1px solid var(--border-color)" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ display: "flex", alignItems: "center" }}>
            {/* Toggle Sidebar Button */}
            <button 
              onClick={onToggleSidebar}
              style={{
                background: "transparent",
                border: "1px solid var(--border-color)",
                color: "var(--text-secondary)",
                padding: "6px",
                borderRadius: "6px",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "var(--transition-smooth)",
                marginRight: "12px"
              }}
              title={showSidebar ? "Collapse Sidebar" : "Expand Sidebar"}
            >
              {showSidebar ? <PanelLeftClose style={{ width: "16px", height: "16px" }} /> : <PanelLeftOpen style={{ width: "16px", height: "16px" }} />}
            </button>
            <div>
              <span style={{ fontSize: "10px", color: topicColor, fontWeight: "800", textTransform: "uppercase", letterSpacing: "1px" }}>
                WEEK {day.week} • DAY {day.id} • {day.topic}
              </span>
              <h1 style={{ fontSize: "20px", fontWeight: "800", color: "var(--text-primary)", marginTop: "4px" }}>{day.title}</h1>
            </div>
          </div>
          
          <div style={{ display: "flex", alignItems: "center" }}>
            <button 
              onClick={onToggleComplete}
              style={{ 
                background: isCompleted ? "rgba(16, 185, 129, 0.1)" : topicColor,
                color: isCompleted ? "var(--color-emerald)" : "#fff",
                border: isCompleted ? "1px solid rgba(16, 185, 129, 0.3)" : "none",
                padding: "8px 16px", borderRadius: "8px", cursor: "pointer", fontSize: "12px", fontWeight: "700",
                display: "flex", alignItems: "center", gap: "6px",
                transition: "var(--transition-smooth)"
              }}
            >
              {isCompleted ? (
                <>
                  <CheckCircle2 style={{ width: "14px", height: "14px" }} />
                  Lesson Completed
                </>
              ) : (
                "Mark Lesson Complete"
              )}
            </button>

            {/* Toggle Tutor Button */}
            <button 
              onClick={onToggleTutor}
              style={{
                background: "transparent",
                border: "1px solid var(--border-color)",
                color: "var(--text-secondary)",
                padding: "6px",
                borderRadius: "6px",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "var(--transition-smooth)",
                marginLeft: "12px"
              }}
              title={showTutor ? "Collapse AI Tutor" : "Expand AI Tutor"}
            >
              {showTutor ? <PanelRightClose style={{ width: "16px", height: "16px" }} /> : <PanelRightOpen style={{ width: "16px", height: "16px" }} />}
            </button>
          </div>
        </div>

        {/* Tab Selection */}
        <div style={{ display: "flex", gap: "6px", marginTop: "20px", borderTop: "1px solid var(--border-color)", paddingTop: "16px" }}>
          {[
            { id: "overview", label: "Overview & Context" },
            { id: "concept", label: "Story & Analogies" },
            { id: "playground", label: "Interactive Simulator" },
            { id: "videos", label: "Verified Lecture Series" },
            { id: "code", label: "Production Code & Pitfalls" },
            { id: "practice", label: "Practice & Quiz" }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              style={{
                background: activeTab === tab.id ? "rgba(79, 140, 255, 0.12)" : "transparent",
                color: activeTab === tab.id ? "var(--color-blue)" : "var(--text-secondary)",
                border: "none",
                padding: "8px 14px",
                borderRadius: "6px",
                cursor: "pointer",
                fontSize: "12px",
                fontWeight: "600",
                borderBottom: activeTab === tab.id ? `2px solid ${topicColor}` : "none",
                transition: "var(--transition-smooth)"
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </header>

      {/* Main Tab Content Scopes */}
      <main style={{ padding: "0 20px 40px 20px" }}>
        
        {/* OVERVIEW PANEL */}
        {activeTab === "overview" && (
          <div style={{ display: "flex", flexDirection: "column", gap: "24px" }} className="fade-in-content">
            <div className="glass" style={{ padding: "20px", background: "var(--bg-surface)" }}>
              <h3 style={{ fontSize: "16px", fontWeight: "700", color: "var(--text-primary)", marginBottom: "12px" }}>Overview</h3>
              <p style={{ color: "var(--text-secondary)", fontSize: "13px", lineHeight: "1.6", marginBottom: "20px" }}>{day.overviewText}</p>
              
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "16px" }}>
                <div className="glass" style={{ padding: "14px", background: "var(--bg-card)" }}>
                  <span style={{ fontSize: "11px", color: "var(--text-disabled)", fontWeight: "700", display: "block", marginBottom: "4px" }}>Prerequisites</span>
                  <ul style={{ fontSize: "11px", color: "var(--text-secondary)", paddingLeft: "16px" }}>
                    {day.prerequisites.map((p, idx) => <li key={idx}>{p}</li>)}
                  </ul>
                </div>
                <div className="glass" style={{ padding: "14px", background: "var(--bg-card)" }}>
                  <span style={{ fontSize: "11px", color: "var(--text-disabled)", fontWeight: "700", display: "block", marginBottom: "4px" }}>Mastery Outcomes</span>
                  <ul style={{ fontSize: "11px", color: "var(--text-secondary)", paddingLeft: "16px" }}>
                    {day.learningOutcomes.map((o, idx) => <li key={idx}>{o}</li>)}
                  </ul>
                </div>
                <div className="glass" style={{ padding: "14px", background: "var(--bg-card)" }}>
                  <span style={{ fontSize: "11px", color: "var(--text-disabled)", fontWeight: "700", display: "block", marginBottom: "4px" }}>Industry Use</span>
                  <p style={{ fontSize: "11px", color: "var(--text-secondary)" }}>{day.industryUsage}</p>
                </div>
              </div>
            </div>

            {/* Direct Workflow Flowchart */}
            <div className="glass" style={{ padding: "20px", background: "var(--bg-surface)" }}>
              <h3 style={{ fontSize: "16px", fontWeight: "700", color: "var(--text-primary)", marginBottom: "16px" }}>Workflow Visualization</h3>
              <ConceptDiagram topic={day.topic} onZoom={onZoom} />
            </div>

            {/* Advantages & Disadvantages */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
              <div className="glass" style={{ padding: "20px", background: "var(--bg-surface)", borderLeft: "4px solid var(--color-emerald)", borderRadius: "8px" }}>
                <h4 style={{ fontSize: "13px", fontWeight: "700", color: "var(--color-emerald)", marginBottom: "12px", display: "flex", alignItems: "center", gap: "6px" }}>
                  <CheckCircle2 style={{ width: "16px", height: "16px" }} /> Advantages
                </h4>
                <ul style={{ display: "flex", flexDirection: "column", gap: "8px", paddingLeft: "16px", fontSize: "12px", color: "var(--text-secondary)" }}>
                  {day.advantages.map((adv, idx) => (
                    <li key={idx}>{adv}</li>
                  ))}
                </ul>
              </div>

              <div className="glass" style={{ padding: "20px", background: "var(--bg-surface)", borderLeft: "4px solid var(--color-red)", borderRadius: "8px" }}>
                <h4 style={{ fontSize: "13px", fontWeight: "700", color: "var(--color-red)", marginBottom: "12px", display: "flex", alignItems: "center", gap: "6px" }}>
                  <AlertTriangle style={{ width: "16px", height: "16px" }} /> Disadvantages
                </h4>
                <ul style={{ display: "flex", flexDirection: "column", gap: "8px", paddingLeft: "16px", fontSize: "12px", color: "var(--text-secondary)" }}>
                  {day.disadvantages.map((dis, idx) => (
                    <li key={idx}>{dis}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="glass" style={{ padding: "20px", background: "var(--bg-surface)" }}>
              <h3 style={{ fontSize: "16px", fontWeight: "700", color: "var(--text-primary)", marginBottom: "12px" }}>Why This Matters</h3>
              <p style={{ color: "var(--text-secondary)", fontSize: "13px", lineHeight: "1.6", marginBottom: "16px" }}>{day.whyMatters}</p>
              <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                {day.examples.map((ex, idx) => (
                  <span key={idx} style={{ fontSize: "11px", background: "rgba(79, 140, 255, 0.08)", border: "1px solid rgba(79, 140, 255, 0.2)", color: "var(--color-blue)", padding: "4px 8px", borderRadius: "4px" }}>
                    {ex}
                  </span>
                ))}
              </div>
            </div>

            <div className="glass" style={{ padding: "20px", background: "var(--bg-surface)" }}>
              <h3 style={{ fontSize: "16px", fontWeight: "700", color: "var(--text-primary)", marginBottom: "12px" }}>Knowledge Roadmap Connections</h3>
              <div style={{ display: "grid", gridTemplateColumns: "1fr auto 1fr", alignItems: "center", gap: "16px" }}>
                <div className="glass" style={{ padding: "12px", background: "var(--bg-card)" }}>
                  <span style={{ fontSize: "10px", color: "var(--text-disabled)", display: "block" }}>PREREQUISITE</span>
                  <span style={{ fontSize: "12px", fontWeight: "600", color: "var(--text-primary)", marginTop: "4px", display: "block" }}>{day.connections.previous}</span>
                </div>
                <ArrowRight style={{ color: "var(--text-disabled)" }} />
                <div className="glass" style={{ padding: "12px", background: "var(--bg-card)" }}>
                  <span style={{ fontSize: "10px", color: "var(--text-disabled)", display: "block" }}>NEXT ADVANCED TOPIC</span>
                  <span style={{ fontSize: "12px", fontWeight: "600", color: "var(--text-primary)", marginTop: "4px", display: "block" }}>{day.connections.next}</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* CONCEPT ANALOGY PANEL */}
        {activeTab === "concept" && (
          <div style={{ display: "flex", flexDirection: "column", gap: "24px" }} className="fade-in-content">
            <div className="glass" style={{ padding: "20px", background: "var(--bg-surface)" }}>
              <h3 style={{ fontSize: "16px", fontWeight: "700", color: "var(--text-primary)", marginBottom: "12px" }}>Concept Story</h3>
              <p style={{ color: "var(--text-secondary)", fontSize: "13px", lineHeight: "1.6", whiteSpace: "pre-line" }}>{day.story}</p>
            </div>

            <div className="glass" style={{ padding: "20px", background: "var(--bg-surface)" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "12px" }}>
                <Lightbulb style={{ color: "var(--color-gold)", width: "18px", height: "18px" }} />
                <h3 style={{ fontSize: "16px", fontWeight: "700", color: "var(--text-primary)" }}>Visual Analogy: {day.analogyTitle}</h3>
              </div>
              <p style={{ color: "var(--text-secondary)", fontSize: "13px", lineHeight: "1.6" }}>{day.analogyContent}</p>
            </div>

            <div className="glass" style={{ padding: "20px", background: "var(--bg-surface)" }}>
              <h3 style={{ fontSize: "16px", fontWeight: "700", color: "var(--text-primary)", marginBottom: "12px" }}>Mnemonic Memory Hook</h3>
              <div style={{ background: "rgba(139, 92, 246, 0.05)", borderLeft: "4px solid var(--color-purple)", padding: "16px", borderRadius: "0 8px 8px 0", marginBottom: "12px" }}>
                <span style={{ fontSize: "10px", color: "var(--color-purple)", fontWeight: "700", display: "block", marginBottom: "4px" }}>Formula / Hook</span>
                <p style={{ fontSize: "14px", fontWeight: "700", color: "var(--text-primary)", fontFamily: "var(--font-hook)" }}>{day.memoryHook}</p>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                {day.mnemonics.map((mn, idx) => (
                  <span key={idx} style={{ fontSize: "11px", color: "var(--text-muted)" }}>• {mn}</span>
                ))}
              </div>
            </div>

            <div className="glass" style={{ padding: "20px", background: "var(--bg-surface)" }}>
              <h3 style={{ fontSize: "16px", fontWeight: "700", color: "var(--text-primary)", marginBottom: "16px" }}>Concept Diagram</h3>
              <ConceptDiagram topic={day.topic} onZoom={onZoom} />
            </div>
          </div>
        )}

        {/* PLAYGROUND SIMULATOR TAB */}
        {activeTab === "playground" && (
          <div className="glass fade-in-content" style={{ padding: "20px", background: "var(--bg-surface)" }}>
            <h3 style={{ fontSize: "16px", fontWeight: "700", color: "var(--text-primary)", marginBottom: "16px" }}>Interactive Playground</h3>
            {day.topic === "LLM Fundamentals" && <AttentionSim />}
            {day.topic === "Prompt Engineering" && <PromptSim />}
            {day.topic === "RAG" && <RagSim />}
            {day.topic === "Embeddings" && <VectorSim />}
            {day.topic === "Vector Databases" && <VectorSim />}
            {day.topic === "AI Agents" && <LangGraphSim />}
            {day.topic === "MCP" && <McpSim />}
            {day.topic === "Security" && <SecuritySim />}
            {day.topic !== "LLM Fundamentals" && 
             day.topic !== "Prompt Engineering" && 
             day.topic !== "RAG" && 
             day.topic !== "Embeddings" && 
             day.topic !== "Vector Databases" && 
             day.topic !== "AI Agents" && 
             day.topic !== "MCP" && 
             day.topic !== "Security" && (
              <div style={{ textAlign: "center", padding: "20px", color: "var(--text-disabled)" }}>
                Interactive simulator template configured. Write your assignments and run them locally to test.
              </div>
            )}
          </div>
        )}

        {/* CURATED LECTURE SERIES TAB */}
        {activeTab === "videos" && (
          <div style={{ display: "flex", flexDirection: "column", gap: "24px" }} className="fade-in-content">
            <div className="glass" style={{ padding: "20px", background: "var(--bg-surface)" }}>
              <h3 style={{ fontSize: "16px", fontWeight: "700", color: "var(--text-primary)", marginBottom: "16px" }}>Curated Video Lectures</h3>
              
              <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                {day.videos.map((vid, idx) => (
                  <div key={idx} className="glass-card" style={{ padding: "20px", background: "var(--bg-card)", border: "1px solid var(--border-color)" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: "12px", marginBottom: "12px" }}>
                      <div>
                        <span style={{ fontSize: "10px", background: "rgba(79, 140, 255, 0.1)", color: "var(--color-blue)", padding: "3px 6px", borderRadius: "4px", fontWeight: "700" }}>
                          {vid.category} Recommendation
                        </span>
                        <h4 style={{ fontSize: "15px", fontWeight: "800", color: "var(--text-primary)", marginTop: "6px" }}>{vid.title}</h4>
                      </div>
                      <a 
                        href={vid.url} target="_blank" rel="noreferrer"
                        style={{ 
                          background: "var(--color-blue)", color: "#fff", padding: "8px 16px", borderRadius: "8px", 
                          fontSize: "12px", fontWeight: "700", display: "flex", alignItems: "center", gap: "6px",
                          transition: "var(--transition-smooth)"
                        }}
                      >
                        <Play style={{ width: "12px", height: "12px", fill: "#fff" }} />
                        Play Lecture
                      </a>
                    </div>

                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: "12px", marginBottom: "16px", fontSize: "11px", color: "var(--text-muted)" }}>
                      <span>Instructor: **{vid.instructor}**</span>
                      <span>Duration: **{vid.duration}**</span>
                      <span>Channel: **{vid.provider}**</span>
                      <span>Year: **{vid.year}**</span>
                    </div>

                    <div className="glass" style={{ padding: "12px", background: "rgba(0,0,0,0.15)", marginBottom: "16px" }}>
                      <span style={{ fontSize: "10px", color: "var(--color-gold)", fontWeight: "700", display: "block", marginBottom: "2px" }}>Why Recommended:</span>
                      <p style={{ fontSize: "11px", color: "var(--text-secondary)" }}>{vid.whyRecommended}</p>
                    </div>

                    {/* Timestamps */}
                    {vid.timestamps && vid.timestamps.length > 0 && (
                      <div style={{ borderTop: "1px solid var(--border-color)", paddingTop: "12px" }}>
                        <span style={{ fontSize: "10px", color: "var(--text-disabled)", fontWeight: "700", display: "block", marginBottom: "8px" }}>TIMESTAMP INDEX</span>
                        <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                          {vid.timestamps.map((ts, tsIdx) => (
                            <div key={tsIdx} style={{ display: "flex", gap: "10px", fontSize: "11px" }}>
                              <span style={{ color: "var(--color-blue)", fontFamily: "var(--font-mono)", fontWeight: "700" }}>{ts.time}</span>
                              <span style={{ color: "var(--text-secondary)" }}>{ts.label}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* PRODUCTION CODE & PITFALLS PANEL */}
        {activeTab === "code" && (
          <div style={{ display: "flex", flexDirection: "column", gap: "24px" }} className="fade-in-content">
            
            {/* Architecture Steps */}
            <div className="glass" style={{ padding: "20px", background: "var(--bg-surface)" }}>
              <h3 style={{ fontSize: "16px", fontWeight: "700", color: "var(--text-primary)", marginBottom: "16px" }}>Enterprise Production Architecture</h3>
              <div style={{ display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap", marginBottom: "20px" }}>
                {day.architectureSteps.map((step, idx) => (
                  <React.Fragment key={idx}>
                    <span style={{ fontSize: "11px", background: "var(--bg-card)", border: "1px solid var(--border-color)", padding: "6px 10px", borderRadius: "6px", color: "var(--text-primary)" }}>
                      {step}
                    </span>
                    {idx < day.architectureSteps.length - 1 && <ChevronRight style={{ color: "var(--text-disabled)", width: "14px" }} />}
                  </React.Fragment>
                ))}
              </div>
              
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "12px" }}>
                {Object.keys(day.architectureDetails).map((key, idx) => (
                  <div key={idx} className="glass" style={{ padding: "12px", background: "var(--bg-card)" }}>
                    <span style={{ fontSize: "11px", color: "var(--color-blue)", fontWeight: "700", display: "block", marginBottom: "4px" }}>{key}</span>
                    <p style={{ fontSize: "11px", color: "var(--text-secondary)" }}>{day.architectureDetails[key]}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Banking Case */}
            <div className="glass" style={{ padding: "20px", borderLeft: "4px solid var(--color-amber)", background: "var(--bg-surface)" }}>
              <h3 style={{ fontSize: "16px", fontWeight: "700", color: "var(--text-primary)", marginBottom: "8px" }}>Banking Domain Case: {day.bankingUseCase.title}</h3>
              <p style={{ color: "var(--text-secondary)", fontSize: "12px", lineHeight: "1.5", marginBottom: "12px" }}>{day.bankingUseCase.description}</p>
              <div className="glass" style={{ padding: "10px", background: "rgba(0,0,0,0.2)" }}>
                <span style={{ fontSize: "10px", color: "var(--color-gold)", fontWeight: "700", display: "block", marginBottom: "4px" }}>CBA Implementation Pattern:</span>
                <p style={{ fontSize: "11px", color: "var(--text-secondary)" }}>{day.bankingUseCase.implementation}</p>
              </div>
            </div>

            {/* Code walkthrough */}
            {day.codeWalkthrough && (
              <div className="glass" style={{ padding: "20px", background: "var(--bg-surface)" }}>
                <h3 style={{ fontSize: "16px", fontWeight: "700", color: "var(--text-primary)", marginBottom: "12px" }}>Production Code</h3>
                <pre style={{ marginBottom: "16px", background: "#020617", border: "1px solid var(--border-color)" }}>
                  <code style={{ fontSize: "11px", fontFamily: "var(--font-mono)" }}>{day.codeWalkthrough.code}</code>
                </pre>
                
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                  <div>
                    <span style={{ fontSize: "11px", color: "var(--text-disabled)", fontWeight: "700", display: "block", marginBottom: "4px" }}>Architecture Logic</span>
                    <p style={{ fontSize: "11px", color: "var(--text-secondary)" }}>{day.codeWalkthrough.architectureDescription}</p>
                  </div>
                  <div>
                    <span style={{ fontSize: "11px", color: "var(--text-disabled)", fontWeight: "700", display: "block", marginBottom: "4px" }}>Best Practices</span>
                    <ul style={{ fontSize: "11px", color: "var(--text-secondary)", paddingLeft: "16px" }}>
                      {day.codeWalkthrough.bestPractices.map((bp, idx) => <li key={idx}>{bp}</li>)}
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {/* Common Mistakes */}
            <div className="glass" style={{ padding: "20px", border: "1px solid rgba(239, 68, 68, 0.2)", background: "var(--bg-surface)" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "16px" }}>
                <AlertTriangle style={{ color: "var(--color-red)", width: "18px", height: "18px" }} />
                <h3 style={{ fontSize: "16px", fontWeight: "700", color: "var(--text-primary)" }}>Common Mistakes & Pitfalls</h3>
              </div>
              
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "12px" }}>
                <div className="glass" style={{ padding: "10px", background: "rgba(239,68,68,0.01)" }}>
                  <span style={{ fontSize: "11px", color: "var(--color-red)", fontWeight: "700", display: "block" }}>Beginner Pitfall</span>
                  <p style={{ fontSize: "11px", color: "var(--text-secondary)", marginTop: "4px" }}>{day.commonMistakes.beginner}</p>
                </div>
                <div className="glass" style={{ padding: "10px", background: "rgba(239,68,68,0.01)" }}>
                  <span style={{ fontSize: "11px", color: "var(--color-red)", fontWeight: "700", display: "block" }}>Performance Bug</span>
                  <p style={{ fontSize: "11px", color: "var(--text-secondary)", marginTop: "4px" }}>{day.commonMistakes.performance}</p>
                </div>
                <div className="glass" style={{ padding: "10px", background: "rgba(239,68,68,0.01)" }}>
                  <span style={{ fontSize: "11px", color: "var(--color-red)", fontWeight: "700", display: "block" }}>Scaling limit</span>
                  <p style={{ fontSize: "11px", color: "var(--text-secondary)", marginTop: "4px" }}>{day.commonMistakes.scaling}</p>
                </div>
                <div className="glass" style={{ padding: "10px", background: "rgba(239,68,68,0.01)" }}>
                  <span style={{ fontSize: "11px", color: "var(--color-red)", fontWeight: "700", display: "block" }}>Security Leak</span>
                  <p style={{ fontSize: "11px", color: "var(--text-secondary)", marginTop: "4px" }}>{day.commonMistakes.security}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* PRACTICE ASSESSMENT TAB */}
        {activeTab === "practice" && (
          <div style={{ display: "flex", flexDirection: "column", gap: "24px" }} className="fade-in-content">
            
            {/* Labs */}
            <div className="glass" style={{ padding: "20px", background: "var(--bg-surface)" }}>
              <h3 style={{ fontSize: "16px", fontWeight: "700", color: "var(--text-primary)", marginBottom: "12px" }}>Hands-on Lab Assignment</h3>
              <div style={{ background: "#020617", border: "1px solid var(--border-color)", padding: "16px", borderRadius: "8px" }}>
                <p style={{ fontSize: "12px", color: "var(--color-blue)", lineHeight: "1.5", fontFamily: "var(--font-mono)" }}>{day.assignment}</p>
              </div>
            </div>

            {/* Quiz */}
            <div className="glass" style={{ padding: "20px", background: "var(--bg-surface)" }}>
              <h3 style={{ fontSize: "16px", fontWeight: "700", color: "var(--text-primary)", marginBottom: "16px" }}>Assessment Quiz</h3>
              <Quiz 
                quizzes={day.quizzes}
                score={quizScore}
                selectedAnswers={selectedAnswers}
                onSelectAnswer={(qIdx, optIdx) => setSelectedAnswers({ ...selectedAnswers, [qIdx]: optIdx })}
                onSubmit={handleQuizSubmit}
                onRetry={() => { setSelectedAnswers({}); setQuizScore(null); }}
              />
            </div>

            {/* Flashcards */}
            <div className="glass" style={{ padding: "20px", background: "var(--bg-surface)" }}>
              <h3 style={{ fontSize: "16px", fontWeight: "700", color: "var(--text-primary)", marginBottom: "16px" }}>Spaced Repetition Flashcards</h3>
              <Flashcard 
                card={day.flashcards[activeCardIdx]}
                activeIdx={activeCardIdx}
                totalCards={day.flashcards.length}
                onRating={handleCardRating}
              />
            </div>
          </div>
        )}

      </main>
    </div>
  );
}
