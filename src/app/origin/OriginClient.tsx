"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Pause, Play } from "lucide-react";
import Link from "next/link";
import { SectionNavButton } from "@/app/about-moon/SectionNavButton";

const STAGES = [
  {
    id: 1,
    name: "浴火诞生",
    nameEn: "Born of Fire",
    time: "约45.3亿年前",
    summary:
      "一颗火星大小的天体忒伊亚与原始地球发生剧烈碰撞，产生的碎片在地球轨道上聚集，逐渐形成了早期的月球。这一假说被称为“大碰撞假说”，是目前最被广泛接受的月球起源理论。",
    video: "/origin/1-浴火诞生.mp4",
  },
  {
    id: 2,
    name: "熔岩火海",
    nameEn: "Magma Ocean",
    time: "约45.3 - 44亿年前",
    summary:
      "碰撞产生的巨大能量使新生月球表面完全熔化，形成了深达数百公里的岩浆海洋。随着热量逐渐向太空散失，轻质的斜长石矿物上浮至表面，形成了月球最初的地壳。",
    video: "/origin/2-熔岩火海.mp4",
  },
  {
    id: 3,
    name: "初具雏形",
    nameEn: "Taking Shape",
    time: "约44 - 41亿年前",
    summary:
      "岩浆海洋逐渐冷却固化，月球开始分化出地壳、地幔和可能的小型金属核。表面形成了厚度均的斜长岩地壳，月球初步具备了我们今天所认识的基本结构。",
    video: "/origin/3-初具雏形.mp4",
  },
  {
    id: 4,
    name: "狂轰滥炸",
    nameEn: "Heavy Bombardment",
    time: "约41 - 38亿年前",
    summary:
      "太阳系内大量小天体对月球表面进行了密集的撞击，这一时期被称为“晚期重轰击期”。大量的撞击坑、盆地在这一时期形成，包括著名的雨海、澄海等大型盆地。",
    video: "/origin/4-狂轰滥炸.mp4",
  },
  {
    id: 5,
    name: "熔岩泛滥",
    nameEn: "Lava Flooding",
    time: "约38 - 31亿年前",
    summary:
      "月球内部残余的放射性元素衰变产生的热量，驱动玄武质岩浆沿着撞击形成的裂缝涌出，填充了大型撞击盆地，形成了我们今天看到的暗色月海区域。",
    video: "/origin/5-熔岩泛滥.mp4",
  },
  {
    id: 6,
    name: "沉寂死寂",
    nameEn: "Silent Stillness",
    time: "约31亿年前至今",
    summary:
      "随着内部热量耗尽，月球的火山活动逐渐停止，地质活动趋于沉寂。此后月球表面的变化主要来自零星的陨石撞击和太空风化作成了覆盖表面的细碎月壤。",
    video: "/origin/6-沉寂死寂.mp4",
  },
];

function TimelineNode({
  stage,
  index,
  isActive,
  onSelect,
}: {
  stage: (typeof STAGES)[0];
  index: number;
  isActive: boolean;
  onSelect: () => void;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="relative flex min-w-0 flex-col items-center"
      style={{ flex: 1 }}
    >
      <div className="mb-2 flex h-[44px] flex-col items-center justify-end text-center">
        <p
          className={`text-[12px] sm:text-[13px] transition-colors duration-300 ${isActive ? "text-[#F1D088]" : "text-[#C1FAF8]/60"
            }`}
        >
          {stage.name}
        </p>
        <p className="mt-0.5 hidden text-[10px] text-white/30 sm:block">
          {stage.time}
        </p>
      </div>

      <div className="relative h-10 w-10 shrink-0">
        <button
          type="button"
          className="group relative z-10 h-full w-full cursor-pointer"
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          onClick={onSelect}
        >
          <motion.div
            className="absolute inset-0 rounded-full border border-[#C1FAF8]/40"
            animate={
              !isActive
                ? {
                  scale: [1, 1.8, 1],
                  opacity: [0.5, 0, 0.5],
                }
                : {}
            }
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: index * 0.3,
            }}
          />
          {isActive && (
            <motion.div
              className="absolute inset-[-4px] rounded-full border-2 border-[#F1D088]"
              animate={{ scale: [1, 1.3, 1], opacity: [0.8, 0.3, 0.8] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
          )}
          <div
            className={`absolute inset-0 rounded-full border transition-all duration-300 ${isActive
              ? "border-[#F1D088] bg-[#F1D088]/10"
              : "border-[#C1FAF8]/60 bg-[#151829]"
              }`}
            style={{
              boxShadow: isActive
                ? "0 0 15px rgba(241,208,136,0.4), inset 0 0 8px rgba(241,208,136,0.1)"
                : "0 0 10px rgba(193,250,248,0.15)",
            }}
          />
          <div
            className={`absolute inset-[6px] rounded-full transition-all duration-300 ${isActive ? "bg-[#F1D088]/30" : "bg-[#C1FAF8]/10"
              }`}
            style={{
              boxShadow: isActive
                ? "0 0 10px rgba(241,208,136,0.5)"
                : "0 0 6px rgba(193,250,248,0.2)",
            }}
          />
          <motion.div
            className={`absolute inset-[12px] rounded-full ${isActive ? "bg-[#F1D088]" : "bg-[#C1FAF8]/60"
              }`}
            animate={
              isActive
                ? { scale: [1, 1.2, 1] }
                : { opacity: [0.6, 1, 0.6] }
            }
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        </button>

        <AnimatePresence>
          {hovered && (
            <div
              key="stage-tooltip"
              className="pointer-events-none absolute left-1/2 top-[calc(100%+0.75rem)] z-50 w-[280px] -translate-x-1/2 sm:w-[320px]"
            >
              <motion.div
                initial={{ opacity: 0, y: -8, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -8, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="w-full"
              >
                <div
                  className="relative rounded-lg border border-[#C1FAF8]/30 p-4"
                  style={{
                    background:
                      "linear-gradient(135deg, rgba(21,24,41,0.95) 0%, rgba(30,35,60,0.95) 100%)",
                    boxShadow:
                      "0 0 20px rgba(193,250,248,0.15), 0 0 40px rgba(193,250,248,0.05)",
                    backdropFilter: "blur(10px)",
                  }}
                >
                  <div
                    className="absolute -top-2 left-1/2 h-0 w-0 -translate-x-1/2"
                    style={{
                      borderLeft: "8px solid transparent",
                      borderRight: "8px solid transparent",
                      borderBottom: "8px solid rgba(193,250,248,0.3)",
                    }}
                  />
                  <div className="mb-2 flex items-center gap-2">
                    <span className="text-[11px] tracking-widest text-[#F1D088]">
                      阶段 {String(stage.id).padStart(2, "0")}
                    </span>
                    <span className="text-[11px] text-[#C1FAF8]/40">|</span>
                    <span className="text-[11px] text-[#C1FAF8]/60">
                      {stage.nameEn}
                    </span>
                  </div>
                  <h3 className="mb-1 text-[18px] text-[#C1FAF8]">{stage.name}</h3>
                  <p className="mb-2 text-[12px] text-[#F1D088]/70">
                    {stage.time}
                  </p>
                  <div className="mb-2 h-px w-full bg-gradient-to-r from-[#C1FAF8]/0 via-[#C1FAF8]/30 to-[#C1FAF8]/0" />
                  <p className="text-[12px] leading-[1.6] text-white/60">
                    {stage.summary}
                  </p>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default function OriginClient() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [videoPaused, setVideoPaused] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      void videoRef.current.load();
      void videoRef.current.play().catch(() => {
        setVideoPaused(true);
      });
    }
  }, [activeIndex]);

  const toggleVideoPlayback = () => {
    const el = videoRef.current;
    if (!el) return;
    if (el.paused) {
      void el.play().catch(() => { });
    } else {
      el.pause();
    }
  };

  const activeStage = STAGES[activeIndex];

  return (
    <section className="relative flex min-h-screen w-full flex-col bg-[#151829]">
      {/* Back button (same as geology-map) */}
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

      {/* Header (structure/order same as geology-map; content from origin) */}
      <div className="relative z-10 px-6 pt-8 pb-4 md:px-12">
        <div className="mb-2 flex items-end gap-4">
          <h2 className="text-3xl tracking-wider text-white md:text-4xl">
            月球的起源与演化
          </h2>
          <span className="pb-1 text-sm tracking-widest text-[#C1FAF8]/50">
            Origin and Evolution of the Moon
          </span>
        </div>
        <div className="h-px bg-gradient-to-r from-[#F1D088]/60 via-[#C1FAF8]/30 to-transparent" />
        <p className="mt-3 max-w-2xl text-sm text-white/40">
          探索月球从诞生沉寂的六个关键演化阶段，点击节点查看对应视频。
        </p>
      </div>

      <div className="mx-auto w-full max-w-[1400px] px-4 pb-10 sm:px-8">

        <div className="relative mb-10 sm:mb-14">
          <div className="absolute top-[72px] left-[5%] right-[5%] h-[2px]">
            <div
              className="h-full w-full"
              style={{
                background:
                  "linear-gradient(90deg, rgba(193,250,248,0.1) 0%, rgba(193,250,248,0.4) 50%, rgba(193,250,248,0.1) 100%)",
              }}
            />
            <motion.div
              className="absolute top-0 left-0 h-full bg-gradient-to-r from-[#F1D088]/60 to-[#C1FAF8]/60"
              animate={{
                width: `${(activeIndex / (STAGES.length - 1)) * 100}%`,
              }}
              transition={{ duration: 0.5 }}
            />
          </div>

          <div className="flex items-start px-[5%]">
            {STAGES.map((stage, i) => (
              <TimelineNode
                key={stage.id}
                stage={stage}
                index={i}
                isActive={i === activeIndex}
                onSelect={() => setActiveIndex(i)}
              />
            ))}
          </div>
        </div>

        <motion.div
          className="relative mx-auto w-full max-w-4xl overflow-hidden rounded-lg md:max-w-6xl"
          style={{
            boxShadow:
              "0 0 40px rgba(193,250,248,0.08), 0 0 80px rgba(193,250,248,0.03)",
          }}
        >
          <div className="absolute top-0 left-0 z-10 h-8 w-8 rounded-tl-lg border-t-2 border-l-2 border-[#C1FAF8]/30" />
          <div className="absolute top-0 right-0 z-10 h-8 w-8 rounded-tr-lg border-t-2 border-r-2 border-[#C1FAF8]/30" />
          <div className="absolute bottom-0 left-0 z-10 h-8 w-8 rounded-bl-lg border-b-2 border-l-2 border-[#C1FAF8]/30" />
          <div className="absolute right-0 bottom-0 z-10 h-8 w-8 rounded-br-lg border-b-2 border-r-2 border-[#C1FAF8]/30" />

          <div className="absolute top-4 left-4 z-20 rounded border border-[#C1FAF8]/10 bg-[#151829]/70 px-4 py-2 backdrop-blur-sm">
            <div className="flex items-center gap-2">
              <span className="text-[11px] tracking-widest text-[#F1D088]">
                {String(activeStage.id).padStart(2, "0")}
              </span>
              <span className="text-[15px] text-white">
                {activeStage.name}
              </span>
              <span className="text-[12px] italic text-white/30">
                {activeStage.nameEn}
              </span>
            </div>
          </div>

          <button
            type="button"
            className="absolute top-1/2 left-3 z-20 flex h-10 w-10 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border border-[#C1FAF8]/20 bg-[#151829]/50 text-[#C1FAF8]/60 transition-all hover:border-[#C1FAF8]/40 hover:text-[#C1FAF8] disabled:cursor-not-allowed disabled:opacity-20"
            disabled={activeIndex === 0}
            onClick={() => setActiveIndex((p) => Math.max(0, p - 1))}
          >
            ‹
          </button>
          <button
            type="button"
            className="absolute top-1/2 right-3 z-20 flex h-10 w-10 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border border-[#C1FAF8]/20 bg-[#151829]/50 text-[#C1FAF8]/60 transition-all hover:border-[#C1FAF8]/40 hover:text-[#C1FAF8] disabled:cursor-not-allowed disabled:opacity-20"
            disabled={activeIndex === STAGES.length - 1}
            onClick={() =>
              setActiveIndex((p) => Math.min(STAGES.length - 1, p + 1))
            }
          >
            ›
          </button>

          <div className="relative aspect-video bg-black">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="h-full w-full"
              >
                <video
                  ref={videoRef}
                  className="h-full w-full object-cover"
                  autoPlay
                  loop
                  playsInline
                  controlsList="nodownload"
                  muted
                  onPlay={() => setVideoPaused(false)}
                  onPause={() => setVideoPaused(true)}
                >
                  <source src={activeStage.video} type="video/mp4" />
                </video>
              </motion.div>
            </AnimatePresence>
            <button
              type="button"
              aria-label={videoPaused ? "播放" : "暂停"}
              className="absolute bottom-14 left-1/2 z-[25] flex h-12 w-12 -translate-x-1/2 cursor-pointer items-center justify-center rounded-full border border-[#C1FAF8]/30 bg-[#151829]/70 text-[#C1FAF8] shadow-[0_0_20px_rgba(193,250,248,0.12)] backdrop-blur-sm transition-colors hover:border-[#C1FAF8]/50 hover:text-[#F1D088]"
              onClick={(e) => {
                e.stopPropagation();
                toggleVideoPlayback();
              }}
            >
              {videoPaused ? (
                <Play className="ml-0.5 h-5 w-5" strokeWidth={2} />
              ) : (
                <Pause className="h-5 w-5" strokeWidth={2} />
              )}
            </button>
          </div>

          <div className="absolute right-0 bottom-0 left-0 z-20 bg-gradient-to-t from-[#151829]/90 to-transparent px-4 py-3">
            <div className="flex justify-center gap-2">
              {STAGES.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  className={`h-1 rounded-full transition-all duration-300 cursor-pointer ${i === activeIndex
                    ? "w-8 bg-[#F1D088]"
                    : "w-3 bg-white/20 hover:bg-white/40"
                    }`}
                  onClick={() => setActiveIndex(i)}
                />
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Bottom section navigation (same as geology-map) */}
      <div className="fixed bottom-8 left-12 z-50 max-md:bottom-6 max-md:left-4">
        <SectionNavButton
          direction="prev"
          section={{ label: "月球的内部构造", href: "/lunar-interior" }}
        />
      </div>
      <div className="fixed bottom-8 right-12 z-50 max-md:bottom-6 max-md:right-4">
        <SectionNavButton
          direction="next"
          section={{ label: "地月系", href: "/orbit" }}
        />
      </div>
    </section>
  );
}
