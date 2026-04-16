"use client";

import { useEffect, useState } from "react";
import { BgmPlayer } from "@/components/BgmPlayer";
import PageHeader from "./PageHeader";
import KnowledgeGraph from "./KnowledgeGraph";
import GraphLegend from "./GraphLegend";
import GraphFooter from "./GraphFooter";

export default function IndexKnowledgeMapPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="w-full h-screen bg-[#151829] flex items-center justify-center">
        <div className="text-white">初始化中...</div>
      </div>
    );
  }

  return (
    <main className="relative w-full min-h-screen overflow-hidden bg-[#151829]">
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 30% 20%, rgba(241, 208, 136, 0.08) 0%, transparent 50%), radial-gradient(ellipse at 70% 80%, rgba(193, 250, 248, 0.08) 0%, transparent 50%)",
        }}
      />

      <div
        className="fixed top-20 right-20 w-64 h-64 rounded-full blur-3xl pointer-events-none opacity-20"
        style={{ background: "radial-gradient(circle, #F1D088 0%, transparent 70%)" }}
      />
      <div
        className="fixed bottom-20 left-20 w-48 h-48 rounded-full blur-3xl pointer-events-none opacity-15"
        style={{ background: "radial-gradient(circle, #C1FAF8 0%, transparent 70%)" }}
      />

      <BgmPlayer src="/Moonlight_at_the_Meridian.mp3" />
      <PageHeader />

      <div className="fixed top-28 left-1/2 -translate-x-1/2 z-30 text-center">
        <h2
          className="text-3xl md:text-4xl font-bold mb-2"
          style={{
            background: "linear-gradient(90deg, #F1D088 0%, #ffffff 50%, #C1FAF8 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          月球知识图谱
        </h2>
        <p className="text-gray-400 text-sm md:text-base">探索月球的奥秘，从这里开始</p>
      </div>

      <GraphLegend />
      <KnowledgeGraph />
      <GraphFooter />
    </main>
  );
}

