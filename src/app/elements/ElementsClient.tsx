"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import { SectionNavButton } from "@/app/about-moon/SectionNavButton";
import { withBasePath } from "@/lib/base-path";
import "./elements.css";

const ELEMENTS = [
  {
    symbol: "FeO",
    name: "铁 Iron",
    color: "#F1D088",
    description:
      "铁是月球表面最丰富的金属元素之一。月球高地的铁含量较低（约3-5%），而月海玄武岩区域的铁含量显著升高（可达15-20%），这与月海的火山活动历史密切相关。",
    concentration: "~5-14 wt%",
    distribution: "月海富集",
    image:
      "/elements/Fe-map.png",
    legendColors: [
      { label: "24 wt%", color: "#e72a30" },
      { label: "18 wt%", color: "#fed411" },
      { label: "13 wt%", color: "#6abc70" },
      { label: "8 wt%", color: "#00abe3" },
      { label: "0 wt%", color: "#1f4a9e" },
    ],
  },
  {
    symbol: "CaO",
    name: "钙 Calcium",
    color: "#C1FAF8",
    description:
      "钙主要以斜长石（CaAl₂Si₂O₈）的形式存在于月球高地。高地富含钙长石，含量可达95%以上，形成了月球最古老的地壳。钙的分布反映了月球早期岩浆洋分异的过程。",
    concentration: "~10-15 wt%",
    distribution: "高地富集",
    image:
      "/elements/Ca-map.png",
    legendColors: [
      { label: "18 wt%", color: "#e72a30" },
      { label: "16 wt%", color: "#fed411" },
      { label: "14 wt%", color: "#6abc70" },
      { label: "12 wt%", color: "#00abe3" },
      { label: "9 wt%", color: "#1f4a9e" },
    ],
  },
  {
    symbol: "Al2O3",
    name: "铝 Aluminum",
    color: "#A8B4FF",
    description:
      "铝在月球表面的分布与钙高度相关，主要富集于月球高地区域。铝含量的高低是区分月球高地和月海的重要地球化学指标，高地铝含量可达13-15%。",
    concentration: "~5-15 wt%",
    distribution: "高地富集",
    image:
      "/elements/Al-map.png",
    legendColors: [
      { label: "35 wt%", color: "#e72a30" },
      { label: "28 wt%", color: "#fed411" },
      { label: "22 wt%", color: "#6abc70" },
      { label: "15 wt%", color: "#00abe3" },
      { label: "9 wt%", color: "#1f4a9e" },
    ],
  },
  {
    symbol: "Mg#",
    name: "镁 Magnesium",
    color: "#88F1A8",
    description:
      "镁主要以橄榄石和辉石的形式存在于月球岩石中。月海玄武岩中镁含量较高，特别是在富含橄榄石的区域。镁铁比是判断月球岩石类型的关键参数。",
    concentration: "~4-10 wt%",
    distribution: "月海-高地过渡",
    image:
      "/elements/Mg-map.png",
    legendColors: [
      { label: "0.9", color: "#ec6a2b" },
      { label: "0.8", color: "#f7e811" },
      { label: "0.7", color: "#6abd72" },
      { label: "0.65", color: "#00afc6" },
      { label: "0.5", color: "#026cb7" },
    ],
  },
  {
    symbol: "TiO2",
    name: "钛 Titanium",
    color: "#F088D0",
    description:
      "钛主要以钛铁矿（FeTiO₃）的形式存在于月海玄武岩中。高钛玄武岩主要分布在月球正面的静海和丰富海区域。钛含量是月海玄武岩分类的重要依据。",
    concentration: "~1-8 wt%",
    distribution: "局部月海富集",
    image:
      "/elements/Ti-map.png",
    legendColors: [
      { label: "12 wt%", color: "#e72a30" },
      { label: "9 wt%", color: "#fed411" },
      { label: "6 wt%", color: "#6abc70" },
      { label: "1 wt%", color: "#00abe3" },
      { label: "0 wt%", color: "#1f4a9e" },
    ],
  },
];

export default function ElementsClient() {
  const [activeIndex, setActiveIndex] = useState(0);
  const el = ELEMENTS[activeIndex];
  const asset = (path: string) => withBasePath(path);

  return (
    <section className="elements-page">
      <div className="absolute top-8 right-6 z-20 flex items-center gap-4 md:right-12">
        <div
          className="h-1.5 w-1.5 rounded-full"
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

      <div className="relative z-10 px-6 pt-8 pb-4 md:px-12">
        <div className="mb-2 flex items-end gap-4">
          <h2 className="text-3xl tracking-wider text-white md:text-4xl">月球化学元素</h2>
          <span className="pb-1 text-sm tracking-widest text-[#C1FAF8]/50">
            Lunar Chemical Elements
          </span>
        </div>
        <div className="h-px bg-gradient-to-r from-[#F1D088]/60 via-[#C1FAF8]/30 to-transparent" />
        <p className="mt-3 max-w-2xl text-sm text-white/40">
          展示月球表面主要化学元素的组成与全月分布特征。
        </p>
      </div>

      {/* Full-page canvas */}
      <div className="el-canvas">
        {/* eslint-disable @next/next/no-img-element */}

        {/* Pie chart composition */}
        <img
          className="el-zufen"
          src={asset("/elements/zufen.png")}
          alt="月球化学元素组分"
          draggable={false}
        />

        {/* Element cards along pie chart arc */}
        <img className="el-card el-o" src={asset("/elements/oxygen.png")} alt="O" draggable={false} />
        <img className="el-card el-si" src={asset("/elements/silicon.png")} alt="Si" draggable={false} />
        <img className="el-card el-fe" src={asset("/elements/iron.png")} alt="Fe" draggable={false} />
        <img className="el-card el-ca" src={asset("/elements/calcium.png")} alt="Ca" draggable={false} />
        <img className="el-card el-al" src={asset("/elements/aluminum.png")} alt="Al" draggable={false} />
        <img className="el-card el-mg" src={asset("/elements/magnesium.png")} alt="Mg" draggable={false} />
        <img className="el-card el-ti" src={asset("/elements/titanium.png")} alt="Ti" draggable={false} />

        {/* Legend (element concentration comparison) */}
        <img className="el-legend" src={asset("/elements/legend.png")} alt="图例" draggable={false} />

        {/* ── Right panel: Interactive Moon Map ── */}
        <div className="el-map-panel">
          {/* Map container */}
          <div className="el-map-container">
            <AnimatePresence mode="wait">
              <motion.div
                key={el.symbol}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6 }}
                className="absolute inset-0"
              >
                <img
                  src={asset(el.image)}
                  alt={`${el.name} distribution`}
                  className="w-full h-full object-cover"
                />
                {/* Color overlay */}
                <div
                  className="absolute inset-0"
                  style={{
                    background: `radial-gradient(ellipse at center, ${el.color}20, transparent 70%)`,
                  }}
                />
              </motion.div>
            </AnimatePresence>

            {/* Corner decorations */}
            <div className="absolute top-2 left-2">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M0 8V0H8" stroke={el.color} strokeOpacity="0.6" />
              </svg>
            </div>
            <div className="absolute top-2 right-2">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M20 8V0H12" stroke={el.color} strokeOpacity="0.6" />
              </svg>
            </div>
            <div className="absolute bottom-2 left-2">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M0 12V20H8" stroke={el.color} strokeOpacity="0.6" />
              </svg>
            </div>
            <div className="absolute bottom-2 right-2">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M20 12V20H12" stroke={el.color} strokeOpacity="0.6" />
              </svg>
            </div>

            {/* Top-most grid SVG overlay */}
            <img
              className="el-map-grid-overlay"
              src={asset("/elements/grid.svg")}
              alt=""
              draggable={false}
              aria-hidden="true"
            />

          </div>

          {/* Bottom info cards */}
          <div className="el-map-info">
            {/* Description */}
            <AnimatePresence mode="wait">
              <motion.div
                key={el.symbol + "-desc"}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4 }}
                className="rounded-lg p-3"
                style={{
                  background: "rgba(255,255,255,0.02)",
                  border: `1px solid ${el.color}20`,
                }}
              >
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-1 h-4 rounded-full" style={{ background: el.color }} />
                  <span className="text-white/70 text-sm tracking-wider">分析概述</span>
                </div>
                <p className="text-white/50 text-sm leading-relaxed">{el.description}</p>
                <div className="flex gap-4 mt-3">
                  <div>
                    <span className="text-white/30 text-sm block">平均含量</span>
                    <span className="text-sm" style={{ color: el.color }}>{el.concentration}</span>
                  </div>
                  <div>
                    <span className="text-white/30 text-sm block">分布特征</span>
                    <span className="text-sm" style={{ color: el.color }}>{el.distribution}</span>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Legend */}
            <AnimatePresence mode="wait">
              <motion.div
                key={el.symbol + "-legend"}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4, delay: 0.1 }}
                className="rounded-lg p-3"
                style={{
                  background: "rgba(255,255,255,0.02)",
                  border: `1px solid ${el.color}20`,
                }}
              >
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-1 h-4 rounded-full" style={{ background: el.color }} />
                  <span className="text-white/70 text-sm tracking-wider">浓度图例</span>
                </div>
                <div
                  className="h-2 rounded-full mb-2"
                  style={{
                    background: `linear-gradient(to right, ${el.legendColors.map((c) => c.color).join(", ")})`,
                  }}
                />
                <div className="flex justify-between">
                  {el.legendColors.map((item, i) => (
                    <div key={i} className="flex items-center gap-1">
                      <div className="w-2 h-2 rounded-sm" style={{ background: item.color }} />
                      <span className="text-white/40 text-sm">{item.label}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Element switch bar */}
          <div className="el-map-switch">
            {ELEMENTS.map((e, i) => (
              <button
                key={e.symbol}
                onClick={() => setActiveIndex(i)}
                className="flex items-center gap-1.5 cursor-pointer group"
              >
                <div
                  className="w-1.5 h-1.5 rounded-full transition-all duration-300"
                  style={{
                    background: activeIndex === i ? e.color : "rgba(255,255,255,0.15)",
                    boxShadow: activeIndex === i ? `0 0 6px ${e.color}` : "none",
                  }}
                />
                <span
                  className="text-sm transition-colors duration-300"
                  style={{ color: activeIndex === i ? e.color : "rgba(255,255,255,0.25)" }}
                >
                  {e.symbol}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* eslint-enable @next/next/no-img-element */}
      </div>

      {/* Section navigation */}
      <div className="fixed bottom-6 left-10 z-50 max-md:bottom-4 max-md:left-3">
        <SectionNavButton
          direction="prev"
          section={{ label: "月球表面形态", href: "/geology-map" }}
        />
      </div>
      <div className="fixed bottom-6 right-10 z-50 max-md:bottom-4 max-md:right-3">
        <SectionNavButton
          direction="next"
          section={{ label: "人类观月史", href: "/human-observing-moon" }}
        />
      </div>
    </section>
  );
}
