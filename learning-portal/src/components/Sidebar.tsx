"use client";

import React, { useMemo } from "react";
import { DayData, courseData } from "../data/course_data";
import { Cpu, Check, Sun, Moon } from "lucide-react";

interface SidebarProps {
  completedDays: number[];
  activeDay: DayData | null;
  onSelectDay: (day: DayData) => void;
  progressPercentage: number;
  theme: "dark" | "light";
  onToggleTheme: () => void;
}

const weekTopics: { [key: number]: string } = {
  1: "LLM Fundamentals",
  2: "Prompt Engineering",
  3: "RAG",
  4: "Embeddings",
  5: "Vector Databases",
  6: "AI Agents (LangGraph)",
  7: "AI Agents (CrewAI)",
  8: "Model Context Protocol",
  9: "LLMOps & Monitoring",
  10: "Security & Guardrails",
  11: "Cloud Deployments",
  12: "Backend & Banking"
};

export default function Sidebar({ 
  completedDays, 
  activeDay, 
  onSelectDay, 
  progressPercentage,
  theme,
  onToggleTheme
}: SidebarProps) {
  
  // Calculate Level based on completed days
  const activeLevel = Math.max(1, Math.min(10, Math.floor(completedDays.length / 9) + 1));
  const levelNames = [
    "AI Novice", "Prompt Cadet", "RAG Apprentice", "Vector Initiate", 
    "Agent Operator", "Graph Specialist", "MCP Explorer", "LLMOps Practitioner", 
    "Security Custodian", "Master AI Solutions Architect"
  ];

  // Group days by Week for the directory tree
  const weeks = useMemo(() => {
    const list: { [key: number]: DayData[] } = {};
    courseData.forEach(day => {
      const wk = day.week;
      if (!list[wk]) list[wk] = [];
      list[wk].push(day);
    });
    return list;
  }, []);

  return (
    <aside style={{ 
      borderRight: "1px solid var(--border-color)", 
      background: "var(--bg-surface)", 
      padding: "20px", 
      display: "flex", 
      flexDirection: "column", 
      gap: "24px", 
      height: "100vh", 
      overflowY: "auto" 
    }}>
      
      {/* Title & Theme Switcher */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "6px" }}>
            <Cpu style={{ color: "var(--color-blue)", width: "20px", height: "20px" }} />
            <span style={{ fontSize: "12px", fontWeight: "700", color: "var(--color-blue)", letterSpacing: "1.5px", textTransform: "uppercase" }}>CBA AI-OS</span>
          </div>
          <h2 style={{ fontSize: "16px", fontWeight: "800", color: "var(--text-primary)" }}>Academy Workspace</h2>
        </div>
        
        <button
          onClick={onToggleTheme}
          style={{
            background: "var(--bg-card)",
            border: "1px solid var(--border-color)",
            color: "var(--color-blue)",
            padding: "8px",
            borderRadius: "50%",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transition: "var(--transition-smooth)",
            outline: "none"
          }}
          title={theme === "dark" ? "Switch to Light Mode" : "Switch to Dark Mode"}
        >
          {theme === "dark" ? <Sun style={{ width: "16px", height: "16px" }} /> : <Moon style={{ width: "16px", height: "16px" }} />}
        </button>
      </div>

      {/* Gamification progress */}
      <div className="glass" style={{ padding: "16px", background: "var(--bg-card)" }}>
        <span style={{ fontSize: "10px", color: "var(--text-disabled)", fontWeight: "700", display: "block" }}>CURRENT PROFILE LEVEL</span>
        <span style={{ fontSize: "14px", fontWeight: "800", color: "var(--color-gold)", display: "block", marginTop: "4px" }}>
          Lv.{activeLevel} - {levelNames[activeLevel - 1]}
        </span>
        
        <div style={{ display: "flex", alignItems: "center", gap: "12px", marginTop: "12px" }}>
          <div style={{ flex: 1, height: "6px", background: "var(--bg-hover)", borderRadius: "3px", overflow: "hidden" }}>
            <div style={{ width: `${progressPercentage}%`, height: "100%", background: "linear-gradient(90deg, var(--color-emerald), var(--color-blue))", borderRadius: "3px" }}></div>
          </div>
          <span style={{ fontSize: "11px", color: "var(--text-muted)", fontWeight: "700" }}>{progressPercentage}%</span>
        </div>
        <span style={{ fontSize: "10px", color: "var(--text-disabled)", marginTop: "6px", display: "block" }}>
          ({completedDays.length} / 90 Chapters completed)
        </span>
      </div>

      {/* Heatmap */}
      <div>
        <span style={{ fontSize: "10px", color: "var(--text-disabled)", fontWeight: "700", letterSpacing: "1px", textTransform: "uppercase", display: "block", marginBottom: "8px" }}>
          🔥 Daily Streak Heatmap
        </span>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(10, 1fr)", gap: "4px", background: "var(--bg-dark)", padding: "8px", borderRadius: "8px", border: "1px solid var(--border-color)" }}>
          {Array.from({ length: 90 }).map((_, idx) => {
            const dayNum = idx + 1;
            const isCompleted = completedDays.includes(dayNum);
            const isActive = activeDay?.id === dayNum;

            return (
              <div
                key={idx}
                onClick={() => {
                  const targetDay = courseData.find(d => d.id === dayNum);
                  if (targetDay) onSelectDay(targetDay);
                }}
                style={{
                  height: "14px",
                  borderRadius: "2px",
                  background: isCompleted 
                    ? "var(--color-emerald)" 
                    : isActive 
                      ? "var(--color-blue)" 
                      : "var(--bg-hover)",
                  border: isActive ? "1px solid var(--text-primary)" : "none",
                  cursor: "pointer",
                  boxShadow: isCompleted ? "0 0 4px rgba(16, 185, 129, 0.4)" : "none",
                  transition: "var(--transition-smooth)"
                }}
                title={`Day ${dayNum}: ${isCompleted ? "Completed" : "Unfinished"}`}
              />
            );
          })}
        </div>
      </div>

      {/* Course tree locking index */}
      <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        <span style={{ fontSize: "10px", color: "var(--text-disabled)", fontWeight: "700", letterSpacing: "1px", textTransform: "uppercase", display: "block" }}>
          Syllabus Index
        </span>
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          {Object.keys(weeks).map(weekNum => {
            const num = parseInt(weekNum);
            const weekDays = weeks[num];
            const completedCount = weekDays.filter(d => completedDays.includes(d.id)).length;

            return (
              <details key={weekNum} open={activeDay ? activeDay.week === num : num === 1} style={{ cursor: "pointer" }}>
                <summary style={{ fontSize: "11px", color: "var(--text-secondary)", fontWeight: "700", display: "flex", justifyContent: "space-between", alignItems: "center", gap: "6px" }}>
                  <span style={{ textOverflow: "ellipsis", overflow: "hidden", whiteSpace: "nowrap", maxWidth: "160px" }} title={`Week ${weekNum} - ${weekTopics[num] || "Topic"}`}>
                    W{weekNum}: {weekTopics[num] || "Topic"}
                  </span>
                  <span style={{ fontSize: "9px", color: "var(--text-disabled)", flexShrink: 0 }}>({completedCount}/{weekDays.length})</span>
                </summary>
                <div style={{ display: "flex", flexDirection: "column", gap: "4px", paddingLeft: "10px", marginTop: "8px" }}>
                  {weekDays.map(day => {
                    const isSelected = activeDay?.id === day.id;
                    const isDayDone = completedDays.includes(day.id);
                    return (
                      <button
                        key={day.id}
                        onClick={() => onSelectDay(day)}
                        style={{
                          textAlign: "left",
                          background: isSelected ? "rgba(79, 140, 255, 0.12)" : "transparent",
                          color: isSelected ? "var(--color-blue)" : isDayDone ? "var(--color-emerald)" : "var(--text-secondary)",
                          border: "none",
                          padding: "6px 8px",
                          borderRadius: "4px",
                          cursor: "pointer",
                          fontSize: "11px",
                          fontWeight: isSelected ? "700" : "500",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          outline: "none",
                          transition: "var(--transition-smooth)"
                        }}
                      >
                        <span style={{ textOverflow: "ellipsis", overflow: "hidden", whiteSpace: "nowrap", maxWidth: "160px" }}>
                          Day {day.id}: {day.title}
                        </span>
                        {isDayDone && <Check style={{ width: "10px", height: "10px", color: "var(--color-emerald)" }} />}
                      </button>
                    );
                  })}
                </div>
              </details>
            );
          })}
        </div>
      </div>
    </aside>
  );
}
