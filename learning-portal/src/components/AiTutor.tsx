"use client";

import React, { useState, useEffect, useRef } from "react";
import { DayData } from "../data/course_data";
import { Cpu, HelpCircle } from "lucide-react";

interface AiTutorProps {
  day: DayData;
}

export default function AiTutor({ day }: AiTutorProps) {
  const [tutorPersona, setTutorPersona] = useState<"eli5" | "college" | "senior" | "architect" | "banking" | "story">("eli5");
  const [tutorMessage, setTutorMessage] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);
  const [userChatInput, setUserChatInput] = useState("");
  const [chatLog, setChatLog] = useState<{ sender: "user" | "tutor"; text: string }[]>([]);
  
  const activeIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Typwriter effect simulation for streaming responses
  const streamText = (text: string) => {
    setIsStreaming(true);
    setTutorMessage("");

    // Clear any running interval to prevent scrambled/overlapping text
    if (activeIntervalRef.current) {
      clearInterval(activeIntervalRef.current);
    }
    
    let currentIdx = 0;
    const interval = setInterval(() => {
      if (currentIdx < text.length) {
        setTutorMessage(prev => prev + text.charAt(currentIdx));
        currentIdx++;
      } else {
        clearInterval(interval);
        setIsStreaming(false);
      }
    }, 10); // slightly faster for premium flow feel

    activeIntervalRef.current = interval;
  };

  // Cleanup active interval on unmount
  useEffect(() => {
    return () => {
      if (activeIntervalRef.current) {
        clearInterval(activeIntervalRef.current);
      }
    };
  }, []);

  // Stream default persona responses when day or persona selection changes
  useEffect(() => {
    const rawResponse = day.tutorResponses[tutorPersona];
    if (rawResponse) {
      streamText(rawResponse);
    }
    setChatLog([]); // reset chat logs when lesson changes
  }, [day, tutorPersona]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userChatInput.trim() || isStreaming) return;

    const userMsg = userChatInput;
    setChatLog(prev => [...prev, { sender: "user", text: userMsg }]);
    setUserChatInput("");
    setIsStreaming(true);

    // Simulate AI response based on topic context
    setTimeout(() => {
      const tutorAnswer = `Relative to your query on "${userMsg}" in Day ${day.id} (${day.topic}): In production systems, we wrap these operations inside async process workers. For Commonwealth Bank scenarios, this ensures compliance checks and locks PII leaks before logging metrics. Let me know if you would like me to unpack this in Architect mode!`;
      setChatLog(prev => [...prev, { sender: "tutor", text: tutorAnswer }]);
      setIsStreaming(false);
    }, 800);
  };

  const triggerMockInterview = () => {
    if (isStreaming) return;
    const mockQuestion = `[MOCK INTERVIEW MODE] Here is a technical scenario question for you: \n\n"${day.quizzes[0]?.question || "How would you optimize attention calculation costs?"}" \n\nType your solution below, and I will evaluate your architecture logic!`;
    streamText(mockQuestion);
  };

  return (
    <aside style={{ 
      borderLeft: "1px solid var(--border-color)", 
      background: "var(--bg-surface)", 
      padding: "20px", 
      display: "flex", 
      flexDirection: "column", 
      gap: "24px", 
      height: "100vh", 
      overflowY: "auto" 
    }}>
      
      {/* AI Tutor Panel */}
      <div>
        <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "12px" }}>
          <Cpu style={{ color: "var(--color-blue)", width: "18px", height: "18px" }} />
          <h3 style={{ fontSize: "14px", fontWeight: "800", color: "var(--text-primary)" }}>AI Mentor Explainer</h3>
        </div>

        {/* Persona Selectors */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "6px", marginBottom: "16px" }}>
          {[
            { id: "eli5", label: "👶 ELI5 Mode" },
            { id: "college", label: "🎓 College Student" },
            { id: "senior", label: "💻 Senior Dev" },
            { id: "architect", label: "🏗️ Architect" },
            { id: "banking", label: "🏦 CBA Bank Case" },
            { id: "story", label: "📖 Story Mode" }
          ].map(p => (
            <button
              key={p.id}
              onClick={() => {
                if (!isStreaming) setTutorPersona(p.id as any);
              }}
              style={{
                background: tutorPersona === p.id ? "rgba(79, 140, 255, 0.12)" : "var(--bg-card)",
                border: tutorPersona === p.id ? "1px solid var(--color-blue)" : "1px solid var(--border-color)",
                padding: "6px 10px",
                borderRadius: "6px",
                color: tutorPersona === p.id ? "var(--color-blue)" : "var(--text-secondary)",
                fontSize: "11px",
                fontWeight: "600",
                cursor: isStreaming ? "not-allowed" : "pointer",
                textAlign: "left",
                outline: "none",
                transition: "var(--transition-smooth)"
              }}
            >
              {p.label}
            </button>
          ))}
        </div>

        {/* Streaming Tutor Response Display Box */}
        <div className="glass" style={{ padding: "14px", background: "rgba(0,0,0,0.25)", minHeight: "150px", marginBottom: "16px" }}>
          <span style={{ fontSize: "9px", color: "var(--text-disabled)", fontWeight: "700", display: "block", marginBottom: "8px", textTransform: "uppercase" }}>
            AI Tutor: {tutorPersona} mode {isStreaming && "• streaming..."}
          </span>
          <p style={{ color: "var(--text-secondary)", fontSize: "12px", lineHeight: "1.6", whiteSpace: "pre-line" }}>{tutorMessage}</p>
        </div>

        {/* Chat log wrapper */}
        {chatLog.length > 0 && (
          <div style={{ display: "flex", flexDirection: "column", gap: "10px", margin: "16px 0", maxHeight: "150px", overflowY: "auto" }}>
            {chatLog.map((log, idx) => (
              <div key={idx} style={{ 
                alignSelf: log.sender === "user" ? "flex-end" : "flex-start",
                background: log.sender === "user" ? "rgba(79, 140, 255, 0.15)" : "var(--bg-card)",
                border: log.sender === "user" ? "1px solid var(--color-blue)" : "1px solid var(--border-color)",
                padding: "8px 12px", 
                borderRadius: "8px", 
                maxWidth: "85%"
              }}>
                <p style={{ fontSize: "11px", color: "var(--text-primary)", lineHeight: "1.4" }}>{log.text}</p>
              </div>
            ))}
          </div>
        )}

        {/* Chat input form */}
        <form onSubmit={handleSendMessage} style={{ display: "flex", gap: "6px" }}>
          <input 
            type="text" 
            placeholder="Ask AI Mentor anything..."
            value={userChatInput}
            onChange={(e) => setUserChatInput(e.target.value)}
            style={{ 
              flex: 1, 
              background: "rgba(0,0,0,0.2)", 
              border: "1px solid var(--border-color)",
              borderRadius: "6px", 
              padding: "8px 10px", 
              color: "var(--text-primary)", 
              fontSize: "12px", 
              outline: "none"
            }}
          />
          <button 
            type="submit"
            style={{ 
              background: "var(--color-blue)", 
              color: "#fff", 
              border: "none", 
              borderRadius: "6px", 
              padding: "0 12px", 
              cursor: "pointer", 
              fontSize: "12px",
              fontWeight: "600"
            }}
          >
            Send
          </button>
        </form>

        {/* Mock interview quick-link button */}
        <button
          onClick={triggerMockInterview}
          style={{
            width: "100%", 
            marginTop: "10px", 
            padding: "8px", 
            borderRadius: "6px", 
            background: "var(--bg-card)",
            border: "1px solid var(--border-color)", 
            color: "var(--color-blue)", 
            fontSize: "11px", 
            fontWeight: "700",
            display: "flex", 
            alignItems: "center", 
            justifyContent: "center", 
            gap: "6px", 
            cursor: "pointer",
            transition: "var(--transition-smooth)"
          }}
          onMouseEnter={(e) => e.currentTarget.style.background = "var(--bg-hover)"}
          onMouseLeave={(e) => e.currentTarget.style.background = "var(--bg-card)"}
        >
          <HelpCircle style={{ width: "12px", height: "12px" }} />
          Test My Understanding (Mock Q&A)
        </button>
      </div>

    </aside>
  );
}
