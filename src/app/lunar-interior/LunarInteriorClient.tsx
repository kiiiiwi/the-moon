"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import { SectionNavButton } from "@/app/about-moon/SectionNavButton";
import {
  collapsedTx,
  expandedShiftTxPct,
  layerImages,
  staggerMs,
} from "./lunarInteriorLayout";
import CrustMaskOverlay from "./masks/CrustMaskOverlay";
import MantleMaskOverlay from "./masks/MantleMaskOverlay";
import MoltenMaskOverlay from "./masks/MoltenMaskOverlay";
import OuterCoreMaskOverlay from "./masks/OuterCoreMaskOverlay";

const layers = [
  {
    id: "crust",
    name: "月壳",
    en: "Lunar Crust",
    color: "#9C9C97",
    glow: "rgba(156,156,151,0.5)",
    /** Glow ring：box-shadow 模糊半径 / 扩散（px），仅用于剖面高亮环 */
    glowBlur: 40,
    glowSpread: 10,
    /** Glow ring 额外横向偏移（px），正值向右 */
    glowOffsetX: 30,
    /** Glow ring 椭圆整体缩放（相对层框中心），1 = 与层同大 */
    glowScale: 0.93,
    depth: "0 – 50 km",
    density: "2.9 g/cm³",
    temp: "~120 °C",
    desc: "月球最外层的固态岩石圈，由富含斜长石的岩石组成，表面布满陨石撞击坑与玄武岩月海。",
  },
  {
    id: "mantle",
    name: "月幔",
    en: "Lunar Mantle",
    color: "#888886",
    glow: "rgba(136,136,134,0.4)",
    glowBlur: 40,
    glowSpread: 10,
    glowOffsetX: 30,
    glowScale: 0.93,
    depth: "50 – 1,380 km",
    density: "3.3 g/cm³",
    temp: "~1,000 °C",
    desc: "主要由橄榄石与辉石组成，是月球体积最大的圈层，保存着早期岩浆洋演化的重要线索。",
  },
  {
    id: "molten",
    name: "熔融区",
    en: "Partial Melt Zone",
    color: "#EF4232",
    glow: "rgba(239,66,50,0.5)",
    glowBlur: 40,
    glowSpread: 10,
    glowOffsetX: 10,
    glowScale: 0.93,
    depth: "1,380 – 1,530 km",
    density: "4.0 g/cm³",
    temp: "~1,300 °C",
    desc: "月幔底部的部分熔融带，富含钛铁矿，是月球内热的重要来源，与月球晚期火山活动相关。",
  },
  {
    id: "outer-core",
    name: "外核",
    en: "Fluid Outer Core",
    color: "#EA7724",
    glow: "rgba(234,119,36,0.5)",
    glowBlur: 40,
    glowSpread: 10,
    glowOffsetX: 10,
    glowScale: 0.93,
    depth: "1,530 – 1,620 km",
    density: "5.1 g/cm³",
    temp: "~1,400 °C",
    desc: "由液态铁硫化物构成，月球早期可能因外核对流而产生弱偶极磁场，现已大幅衰减。",
  },
  {
    id: "inner-core",
    name: "内核",
    en: "Solid Inner Core",
    color: "#EABB25",
    glow: "rgba(234,187,37,0.6)",
    glowBlur: 40,
    glowSpread: 10,
    glowOffsetX: 0,
    glowScale: 1,
    depth: "半径 ~240 km",
    density: "7.9 g/cm³",
    temp: "~1,500 °C",
    desc: "固态铁镍合金内核，2023 年科学家通过阿波罗地震仪数据最终确认了其存在。",
  },
];

/** 与「剖面开始展开」的延迟一致（ms）；此时起四个 mask 隐藏 */
const EXPAND_START_DELAY_MS = 3000;

export default function LunarInteriorClient() {
  const [activeLayer, setActiveLayer] = useState<string | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsExpanded(true), EXPAND_START_DELAY_MS);
    return () => clearTimeout(timer);
  }, []);

  const masksVisible = !isExpanded;

  return (
    <section className="relative flex h-[100svh] min-h-0 max-h-[100svh] w-full flex-col overflow-hidden bg-[#151829] [font-family:var(--font-noto-sc-lunar-interior),_var(--font-geist-sans),_sans-serif]">
      {/* Header top action (same as geology-map) */}
      <div className="absolute top-8 right-6 z-20 flex items-center gap-4 md:right-12">
        <div
          className="h-1.5 w-1.5 rounded-full"
          style={{ background: "#F1D088", boxShadow: "0 0 6px #F1D088" }}
        />
        <Link
          href="/index-knowledge-map"
          className="rounded-full px-3 py-1 text-xs transition-all"
          style={{
            color: "rgba(193, 250, 248, 0.6)",
            border: "1px solid rgba(193, 250, 248, 0.2)",
            background: "rgba(193, 250, 248, 0.04)",
          }}
        >
          ← 返回主页面
        </Link>
      </div>

      {/* Header (same layout as geology-map) */}
      <div className="relative z-10 shrink-0 px-6 pt-8 pb-4 md:px-12">
        <div className="mb-2 flex items-end gap-4">
          <h2 className="text-3xl tracking-wider text-white md:text-4xl">月球内部结构</h2>
          <span className="pb-1 text-sm tracking-widest text-[#C1FAF8]/50">
            The Internal Structure of the Moon
          </span>
        </div>
        <div className="h-px bg-gradient-to-r from-[#F1D088]/60 via-[#C1FAF8]/30 to-transparent" />
        <p className="mt-3 max-w-2xl text-sm text-white/40">
          展示月球从月壳到内核的分层结构，结合圈层参数与演化线索理解其内部物理状态。
        </p>
      </div>

      {/* Content */}
      <div className="relative mx-4 mb-4 flex min-h-0 flex-1 overflow-hidden rounded-xl border border-white/10 md:mx-10 md:mb-5">
        {/* Diagram area — full width, left-aligned */}
        <div className="flex min-h-0 flex-1 items-center bg-[#0d1020]/80 pl-6 lg:pl-10">
          <div
            className="relative"
            style={{
              aspectRatio: "727 / 651",
              height: "calc(100% - 1.5rem)",
              maxWidth: "calc(100% - 1rem)",
            }}
          >
            {layerImages.map((layer, i) => {
              const isShadow = layer.id === "shadow";
              const isCrust = layer.id === "crust";
              const tx = collapsedTx[layer.id] ?? 0;
              const delay = staggerMs[layer.id] ?? 0;

              let transformValue: string;
              if (isShadow) {
                transformValue = isExpanded
                  ? "scaleX(1)"
                  : "scaleX(0.55)";
              } else if (isCrust) {
                transformValue = "translateX(0)";
              } else {
                transformValue = isExpanded
                  ? `translateX(${expandedShiftTxPct[layer.id] ?? 0}%)`
                  : `translateX(${tx}%)`;
              }

              return (
                <img
                  key={layer.id}
                  src={layer.src}
                  alt={layer.id}
                  draggable={false}
                  onMouseEnter={() =>
                    !isShadow && setActiveLayer(layer.id)
                  }
                  onMouseLeave={() => setActiveLayer(null)}
                  style={{
                    position: "absolute",
                    objectFit: "fill",
                    userSelect: "none",
                    willChange: "transform",
                    ...layer.style,
                    transform: transformValue,
                    transformOrigin: isShadow ? "left center" : undefined,
                    opacity: isShadow
                      ? isExpanded ? 0.2 : 0.06
                      : 1,
                    transition: [
                      `transform 5000ms cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms`,
                      `opacity 1600ms ease ${delay}ms`,
                      "filter 0.35s ease",
                    ].join(", "),
                    filter:
                      !isShadow
                        ? activeLayer !== null && activeLayer !== layer.id
                          ? "brightness(0.3) saturate(0.3)"
                          : activeLayer === layer.id
                            ? "brightness(1.1) saturate(1.2)"
                            : "brightness(1) saturate(1)"
                        : activeLayer !== null
                          ? "opacity(0.4)"
                          : "none",
                    cursor: isShadow ? "default" : "pointer",
                    pointerEvents: isShadow ? "none" : "auto",
                    zIndex: i,
                  }}
                />
              );
            })}

            {/* Glow ring — tracks the active layer's animated position */}
            {activeLayer &&
              activeLayer !== "shadow" &&
              (() => {
                const match = layers.find((l) => l.id === activeLayer);
                const img = layerImages.find((l) => l.id === activeLayer);
                if (!match || !img) return null;
                const tx = collapsedTx[img.id] ?? 0;
                const expandedShift = expandedShiftTxPct[img.id] ?? 0;
                const delay = staggerMs[img.id] ?? 0;
                const ox = match.glowOffsetX ?? 0;
                const gs = match.glowScale ?? 1;
                const txAnim = isExpanded
                  ? `translateX(${expandedShift}%)`
                  : `translateX(${tx}%)`;
                return (
                  <div
                    key={`glow-${activeLayer}`}
                    style={{
                      position: "absolute",
                      left: img.style.left,
                      top: img.style.top,
                      width: img.style.width,
                      height: img.style.height,
                      borderRadius: "50%",
                      background: "transparent",
                      boxShadow: `0 0 ${match.glowBlur}px ${match.glowSpread}px ${match.glow}`,
                      pointerEvents: "none",
                      transformOrigin: "center center",
                      transform: `${txAnim} translateX(${ox}px) scale(${gs})`,
                      transition: `transform 5000ms cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms`,
                    }}
                  />
                );
              })()}

            {/* Mask：展开动画开始时（EXPAND_START_DELAY_MS 后）淡出不可见 */}
            <CrustMaskOverlay
              isExpanded={isExpanded}
              activeLayer={activeLayer}
              visible={masksVisible}
            />
            <MantleMaskOverlay
              isExpanded={isExpanded}
              activeLayer={activeLayer}
              visible={masksVisible}
            />
            <MoltenMaskOverlay
              isExpanded={isExpanded}
              activeLayer={activeLayer}
              visible={masksVisible}
            />
            <OuterCoreMaskOverlay
              isExpanded={isExpanded}
              activeLayer={activeLayer}
              visible={masksVisible}
            />
          </div>
        </div>

        {/* ── Info cards panel — bottom-right overlay ── */}
        <div
          className="absolute right-4 top-1/2 z-10 flex w-[420px] -translate-y-1/2 flex-col gap-2 overflow-y-auto rounded-xl border border-white/[0.08] p-5 backdrop-blur-xl lg:right-6 lg:w-[560px]"
          style={{
            background: "rgba(13, 16, 32, 0.82)",
            maxHeight: "calc(100% - 48px)",
          }}
        >
          <p className="mb-1 text-[12px] uppercase tracking-[0.2em] text-white/25">
            Layer Structure / 内部分层
          </p>

          {layers.map((layer) => {
            const isActive = activeLayer === layer.id;
            return (
              <button
                key={layer.id}
                className="group w-full shrink-0 text-left"
                onMouseEnter={() => setActiveLayer(layer.id)}
                onMouseLeave={() => setActiveLayer(null)}
                onClick={() =>
                  setActiveLayer((prev) =>
                    prev === layer.id ? null : layer.id,
                  )
                }
                style={{
                  background: isActive
                    ? "linear-gradient(135deg, rgba(255,255,255,0.04), rgba(255,255,255,0.02))"
                    : "transparent",
                  border: `1px solid ${isActive
                    ? layer.color + "60"
                    : "rgba(255,255,255,0.07)"
                    }`,
                  borderRadius: "8px",
                  padding: "10px 14px",
                  transition:
                    "background 0.3s, border-color 0.3s, box-shadow 0.3s",
                  boxShadow: isActive
                    ? `0 0 20px ${layer.glow}, inset 0 0 20px ${layer.glow}25`
                    : "none",
                }}
              >
                {/* Header row */}
                <div className="flex items-center gap-2.5">
                  <div
                    className="h-2.5 w-2.5 flex-none rounded-full"
                    style={{
                      background: layer.color,
                      boxShadow: isActive
                        ? `0 0 6px ${layer.color}, 0 0 12px ${layer.glow}`
                        : "none",
                      transition: "box-shadow 0.3s",
                    }}
                  />
                  <div className="flex flex-1 flex-wrap items-baseline gap-1.5">
                    <span
                      className="text-[16px] font-semibold leading-tight"
                      style={{
                        color: isActive
                          ? "#fff"
                          : "rgba(255,255,255,0.8)",
                        transition: "color 0.3s",
                      }}
                    >
                      {layer.name}
                    </span>
                    <span
                      className="text-[12px] tracking-wider"
                      style={{
                        color: isActive
                          ? layer.color
                          : layer.color + "80",
                        transition: "color 0.3s",
                      }}
                    >
                      {layer.en}
                    </span>
                  </div>
                  <span
                    className="shrink-0 text-[12px]"
                    style={{ color: "rgba(255,255,255,0.3)" }}
                  >
                    {layer.depth}
                  </span>
                </div>

                {/* Expandable detail */}
                <div
                  style={{
                    maxHeight: isActive ? "120px" : "0px",
                    overflow: "hidden",
                    transition:
                      "max-height 0.4s cubic-bezier(0.4,0,0.2,1)",
                  }}
                >
                  <div className="ml-[18px] mt-2.5 space-y-1.5">
                    <div className="flex gap-3">
                      <span className="text-[12px] text-white/40">
                        密度 {layer.density}
                      </span>
                      <span className="text-[12px] text-white/40">
                        温度 {layer.temp}
                      </span>
                    </div>
                    <p className="text-[12px] leading-snug text-white/55">
                      {layer.desc}
                    </p>
                  </div>
                </div>
              </button>
            );
          })}

          <div className="flex shrink-0 items-center justify-between border-t border-white/[0.06] pt-1.5">
            <p className="text-[12px] text-white/20">
              悬停或点击图层了解详情
            </p>
            <p className="text-[12px] text-white/25">
              数据来源：阿波罗任务及后续探测
            </p>
          </div>
        </div>
      </div>

      <div className="fixed bottom-8 left-12 z-50">
        <SectionNavButton
          direction="prev"
          section={{ label: "月球的外观", href: "/about-moon" }}
        />
      </div>
      <div className="fixed bottom-8 right-12 z-50">
        <SectionNavButton
          direction="next"
          section={{ label: "月球的起源与演化", href: "/origin" }}
        />
      </div>
    </section>
  );
}
