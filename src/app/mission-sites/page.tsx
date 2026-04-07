"use client";

import React, { useState, useCallback } from "react";
import Link from "next/link";
import { MoonGlobe } from "./MoonGlobe";
import { LunarSankey } from "./LunarSankey";

export default function MissionSitesPage() {
  const [highlightedMissions, setHighlightedMissions] = useState<string[]>([]);

  const handleSankeyHover = useCallback((missions: string[]) => {
    setHighlightedMissions(missions);
  }, []);

  return (
    <div
      className="w-full h-screen flex flex-col overflow-hidden"
      style={{ background: "linear-gradient(135deg, #0a0a1a 0%, #0f1529 40%, #0a0a1a 100%)" }}
    >
      {/* Header */}
      <header className="relative z-10 flex-shrink-0 px-6 pt-5 pb-3 md:px-12">
        <div className="mb-2 flex items-end justify-between gap-4">
          <div className="flex items-end gap-4">
            <h2 className="text-3xl tracking-wider text-white md:text-4xl">探月着陆区</h2>
            <span className="pb-1 text-sm tracking-widest text-[#C1FAF8]/50">Lunar Landing Sites</span>
          </div>
          <div className="flex items-center gap-4">
            <div
              className="w-1.5 h-1.5 rounded-full"
              style={{ background: "#F1D088", boxShadow: "0 0 6px #F1D088" }}
            />
            <Link
              href="/index-knowledge-map"
              className="px-3 py-1 rounded-full text-xs transition-all"
              style={{
                color: "rgba(193, 250, 248, 0.6)",
                border: "1px solid rgba(193, 250, 248, 0.2)",
                background: "rgba(193, 250, 248, 0.04)",
              }}
            >
              ← 返回主页面
            </Link>
          </div>
        </div>
        <div className="h-px bg-gradient-to-r from-[#F1D088]/60 via-[#C1FAF8]/30 to-transparent" />
      </header>

      {/* Main content */}
      <div className="flex-1 flex min-h-0">
        {/* Left: Moon Globe */}
        <div
          className="w-[46%] relative flex items-center justify-center"
          style={{ borderRight: "1px solid rgba(193, 250, 248, 0.06)" }}
        >
          {/* Decorative glow */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: "radial-gradient(circle at 50% 50%, rgba(193, 250, 248, 0.04) 0%, transparent 70%)",
            }}
          />
          <div className="w-full h-full p-4">
            <MoonGlobe highlightedMissions={highlightedMissions} />
          </div>
          {/* Legend */}
          <div
            className="absolute bottom-4 left-4 flex flex-col gap-1.5 p-3 rounded-lg"
            style={{
              background: "rgba(10, 10, 26, 0.8)",
              border: "1px solid rgba(241, 208, 136, 0.15)",
              backdropFilter: "blur(8px)",
            }}
          >
            <span style={{ color: "rgba(241, 208, 136, 0.7)", fontSize: "0.6rem", letterSpacing: "0.1em" }}>
              着陆点图例
            </span>
            {[
              { color: "#3DC8E0", label: "USA" },
              { color: "#D4A056", label: "USSR" },
              { color: "#D98E6A", label: "China" },
              { color: "#E8C170", label: "India" },
              { color: "#B266FF", label: "Japan" },
            ].map(item => (
              <div key={item.label} className="flex items-center gap-2">
                <div
                  className="w-2 h-2 rounded-full"
                  style={{ background: item.color, boxShadow: `0 0 4px ${item.color}` }}
                />
                <span style={{ color: "rgba(255,255,255,0.6)", fontSize: "0.6rem" }}>{item.label}</span>
              </div>
            ))}
          </div>
          {/* Instruction */}
          <div
            className="absolute top-4 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full"
            style={{
              background: "rgba(193, 250, 248, 0.06)",
              color: "rgba(193, 250, 248, 0.4)",
              fontSize: "0.65rem",
            }}
          >
            拖拽旋转月球 · 悬浮桑基图查看着陆点
          </div>
        </div>

        {/* Right: Sankey Diagram */}
        <div className="flex-1 flex flex-col min-w-0">
          <div
            className="px-6 py-3 flex items-center gap-3"
            style={{ borderBottom: "1px solid rgba(241, 208, 136, 0.08)" }}
          >
            <div
              className="h-px flex-1"
              style={{ background: "linear-gradient(to right, transparent, rgba(241, 208, 136, 0.2), transparent)" }}
            />
            <h2 style={{ color: "#F1D088", fontSize: "0.85rem", letterSpacing: "0.12em" }}>
              人类探月任务总览
            </h2>
            <span style={{ color: "rgba(193, 250, 248, 0.4)", fontSize: "0.65rem" }}>
              Successful Lunar Missions Sankey
            </span>
            <div
              className="h-px flex-1"
              style={{ background: "linear-gradient(to right, transparent, rgba(193, 250, 248, 0.2), transparent)" }}
            />
          </div>
          <div className="flex-1 min-h-0 p-2">
            <LunarSankey onHoverMissions={handleSankeyHover} />
          </div>
          {/* Bottom info bar */}
          <div
            className="px-6 py-2 flex items-center justify-between"
            style={{
              borderTop: "1px solid rgba(241, 208, 136, 0.08)",
              color: "rgba(193, 250, 248, 0.35)",
              fontSize: "0.6rem",
            }}
          >
            <span>国家 → 计划 → 任务类型</span>
            <span>数据涵盖 1958-2025 年所有成功探月任务</span>
          </div>
        </div>
      </div>
    </div>
  );
}
