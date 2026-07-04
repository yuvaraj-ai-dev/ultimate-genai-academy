"use client";

import React, { useState, useEffect } from "react";
import { courseData, DayData } from "../data/course_data";
import Sidebar from "../components/Sidebar";
import Textbook from "../components/Textbook";
import AiTutor from "../components/AiTutor";

export default function Home() {
  const [activeDay, setActiveDay] = useState<DayData | null>(null);
  const [completedDays, setCompletedDays] = useState<number[]>([]);
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [showSidebar, setShowSidebar] = useState(true);
  const [showTutor, setShowTutor] = useState(true);
  
  // Root level modal zoom states
  const [zoomedImgUrl, setZoomedImgUrl] = useState<string | null>(null);
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    const zoomFactor = 0.15;
    let nextScale = scale + (e.deltaY < 0 ? zoomFactor : -zoomFactor);
    nextScale = Math.max(1, Math.min(4, nextScale));
    setScale(nextScale);
    if (nextScale === 1) {
      setPosition({ x: 0, y: 0 });
    }
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (scale === 1) return;
    e.preventDefault();
    setIsDragging(true);
    setDragStart({ x: e.clientX - position.x, y: e.clientY - position.y });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    e.preventDefault();
    setPosition({
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  const handleDoubleClick = () => {
    if (scale > 1) {
      setScale(1);
      setPosition({ x: 0, y: 0 });
    } else {
      setScale(2);
    }
  };

  // Local storage initialization
  useEffect(() => {
    // Set Day 1 as default active lesson
    if (courseData.length > 0) {
      setActiveDay(courseData[0]);
    }
    
    const savedDays = localStorage.getItem("cba-ai-academy-completed-days");
    if (savedDays) {
      setCompletedDays(JSON.parse(savedDays));
    }

    const savedTheme = localStorage.getItem("cba-ai-academy-theme");
    if (savedTheme === "light" || savedTheme === "dark") {
      setTheme(savedTheme);
    }
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === "dark" ? "light" : "dark";
    setTheme(nextTheme);
    localStorage.setItem("cba-ai-academy-theme", nextTheme);
  };

  const toggleDayCompletion = (dayId: number) => {
    const updated = completedDays.includes(dayId)
      ? completedDays.filter(id => id !== dayId)
      : [...completedDays, dayId];
    
    setCompletedDays(updated);
    localStorage.setItem("cba-ai-academy-completed-days", JSON.stringify(updated));
  };

  const getTopicColor = (topic: string) => {
    switch (topic) {
      case "LLM Fundamentals": return "var(--color-blue)";
      case "Prompt Engineering": return "var(--color-gold)";
      case "RAG": return "var(--color-cyan)";
      case "Embeddings": return "var(--color-purple)";
      case "Vector Databases": return "var(--color-purple)";
      case "AI Agents": return "var(--color-emerald)";
      case "MCP": return "var(--color-amber)";
      case "LLMOps / MLOps": return "var(--color-cyan)";
      case "Security": return "var(--color-red)";
      case "Cloud": return "var(--color-emerald)";
      case "Backend Engineering": return "var(--color-blue)";
      case "Banking Domain Knowledge": return "var(--color-gold)";
      default: return "var(--text-disabled)";
    }
  };

  const progressPercentage = Math.round((completedDays.length / 90) * 100);

  if (!activeDay) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", justifyContent: "center", alignItems: "center", background: "#070b14", color: "#fff" }}>
        <span>Waking up CBA AI-OS...</span>
      </div>
    );
  }

  return (
    <div className={theme}>
      <div style={{ 
        display: "grid", 
        gridTemplateColumns: `${showSidebar ? "250px" : "0px"} 1fr ${showTutor ? "300px" : "0px"}`, 
        height: "100vh", 
        overflow: "hidden", 
        background: "var(--bg-dark)",
        color: "var(--text-primary)",
        transition: "grid-template-columns 0.3s ease, background-color 0.3s ease, color 0.3s ease"
      }}>
        
        {/* COLUMN 1: LEFT SIDEBAR PANEL */}
        <div style={{ 
          width: showSidebar ? "250px" : "0px", 
          transition: "width 0.3s ease", 
          overflow: "hidden",
          display: "flex",
          flexDirection: "column"
        }}>
          <Sidebar 
            completedDays={completedDays} 
            activeDay={activeDay} 
            onSelectDay={setActiveDay} 
            progressPercentage={progressPercentage}
            theme={theme}
            onToggleTheme={toggleTheme}
          />
        </div>

        {/* COLUMN 2: CENTER TEXTBOOK PANEL */}
        <Textbook 
          day={activeDay} 
          isCompleted={completedDays.includes(activeDay.id)} 
          onToggleComplete={() => toggleDayCompletion(activeDay.id)} 
          topicColor={getTopicColor(activeDay.topic)} 
          showSidebar={showSidebar}
          onToggleSidebar={() => setShowSidebar(!showSidebar)}
          showTutor={showTutor}
          onToggleTutor={() => setShowTutor(!showTutor)}
          onZoom={setZoomedImgUrl}
        />

        {/* COLUMN 3: RIGHT AI TUTOR & VIDEOS PANEL */}
        <div style={{ 
          width: showTutor ? "300px" : "0px", 
          transition: "width 0.3s ease", 
          overflow: "hidden",
          display: "flex",
          flexDirection: "column"
        }}>
          <AiTutor day={activeDay} />
        </div>

      </div>

      {/* Root level fullscreen popup overlay zoom modal */}
      {zoomedImgUrl && (
        <div 
          onClick={() => {
            setZoomedImgUrl(null);
            setScale(1);
            setPosition({ x: 0, y: 0 });
          }}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            background: "rgba(7, 11, 20, 0.96)",
            zIndex: 999999,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            cursor: "zoom-out",
            padding: "20px",
            backdropFilter: "blur(12px)"
          }}
        >
          <div 
            style={{ 
              position: "relative", 
              width: "100%", 
              height: "100%", 
              display: "flex", 
              justifyContent: "center", 
              alignItems: "center", 
              overflow: "hidden" 
            }}
          >
            <div
              onWheel={handleWheel}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseLeave}
              onDoubleClick={handleDoubleClick}
              style={{
                position: "relative",
                width: "100%",
                height: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                cursor: isDragging ? "grabbing" : scale > 1 ? "grab" : "zoom-in",
                overflow: "hidden"
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <img 
                src={zoomedImgUrl} 
                alt="Zoomed Blueprint" 
                style={{ 
                  transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
                  transition: isDragging ? "none" : "transform 0.15s ease-out",
                  maxWidth: "92vw", 
                  maxHeight: "85vh", 
                  borderRadius: "8px", 
                  objectFit: "contain",
                  boxShadow: "0 25px 60px rgba(0,0,0,0.85)",
                  border: "1px solid var(--border-color)",
                  userSelect: "none",
                  pointerEvents: "none"
                }} 
              />
            </div>

            {/* Floating HUD Controller Island */}
            <div 
              style={{
                position: "absolute",
                bottom: "30px",
                left: "50%",
                transform: "translateX(-50%)",
                background: "rgba(15, 23, 42, 0.85)",
                border: "1px solid rgba(255, 255, 255, 0.15)",
                padding: "8px 20px",
                borderRadius: "30px",
                display: "flex",
                gap: "16px",
                alignItems: "center",
                zIndex: 1000000,
                boxShadow: "0 10px 30px rgba(0,0,0,0.6)",
                backdropFilter: "blur(8px)"
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <button 
                onClick={() => setScale(prev => Math.min(4, prev + 0.25))}
                style={{ background: "transparent", border: "none", color: "#fff", cursor: "pointer", fontSize: "12px", fontWeight: "bold", padding: "4px" }}
                title="Zoom In"
              >
                ➕
              </button>
              <span style={{ fontSize: "11px", color: "#e2e8f0", fontWeight: "700", minWidth: "45px", textAlign: "center", fontFamily: "var(--font-mono)" }}>
                {Math.round(scale * 100)}%
              </span>
              <button 
                onClick={() => {
                  setScale(prev => {
                    const next = Math.max(1, prev - 0.25);
                    if (next === 1) setPosition({ x: 0, y: 0 });
                    return next;
                  });
                }}
                style={{ background: "transparent", border: "none", color: "#fff", cursor: "pointer", fontSize: "12px", fontWeight: "bold", padding: "4px" }}
                title="Zoom Out"
              >
                ➖
              </button>
              <div style={{ width: "1px", height: "16px", background: "rgba(255, 255, 255, 0.15)" }} />
              <button 
                onClick={() => {
                  setScale(1);
                  setPosition({ x: 0, y: 0 });
                }}
                style={{ background: "transparent", border: "none", color: "var(--color-blue)", cursor: "pointer", fontSize: "11px", fontWeight: "800", letterSpacing: "0.5px" }}
                title="Reset View"
              >
                RESET
              </button>
            </div>

            {/* Floating Top-Right Exit Button */}
            <button 
              onClick={() => {
                setZoomedImgUrl(null);
                setScale(1);
                setPosition({ x: 0, y: 0 });
              }}
              style={{
                position: "absolute",
                top: "30px",
                right: "30px",
                background: "rgba(15, 23, 42, 0.7)",
                color: "#e2e8f0",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: "50%",
                width: "36px",
                height: "36px",
                cursor: "pointer",
                fontSize: "14px",
                fontWeight: "bold",
                boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "var(--transition-smooth)"
              }}
              title="Close Modal"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
