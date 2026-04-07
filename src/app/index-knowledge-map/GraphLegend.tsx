"use client";

import { Network, Sparkles } from "lucide-react";

const LEGEND_ITEMS = [
  { label: "月球概览", color: "#F1D088", description: "外观、起源、构造、地月系、月相" },
  { label: "月球环境", color: "#C1FAF8", description: "表面形态" },
  { label: "月球地质", color: "#E4B8FF", description: "化学元素" },
  { label: "探月活动", color: "#FFB899", description: "观月史、探月活动" },
];

export default function GraphLegend() {
  return (
    <div className="fixed left-6 top-1/2 -translate-y-1/2 z-40 hidden lg:block">
      <div
        className="p-4 rounded-2xl backdrop-blur-md"
        style={{
          backgroundColor: "rgba(21, 24, 41, 0.8)",
          border: "1px solid rgba(255, 255, 255, 0.1)",
        }}
      >
        <div className="flex items-center gap-2 mb-4">
          <Network className="w-4 h-4 text-[#C1FAF8]" />
          <span className="text-sm text-gray-300">图例</span>
        </div>

        <div className="space-y-3">
          {LEGEND_ITEMS.map((item) => (
            <div key={item.label} className="flex items-center gap-3">
              <div
                className="w-4 h-4 rounded-full flex-shrink-0"
                style={{
                  background: `radial-gradient(circle, ${item.color} 0%, ${item.color}40 100%)`,
                  boxShadow: `0 0 10px ${item.color}60`,
                }}
              />
              <div className="flex flex-col gap-1">
                <span className="text-xs font-medium" style={{ color: item.color }}>
                  {item.label}
                </span>
                <span className="text-[12px] text-gray-500">{item.description}</span>
              </div>
            </div>
          ))}

          <div className="flex items-center gap-3">
            <div className="w-4 h-0.5 bg-gradient-to-r from-[#F1D088] via-[#C1FAF8] to-[#E4B8FF] opacity-60" />
            <span className="text-xs text-gray-400">知识关联</span>
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-white/10">
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <Sparkles className="w-3 h-3 text-[#F1D088]" />
            <span>移动鼠标探索</span>
          </div>
        </div>
      </div>
    </div>
  );
}

