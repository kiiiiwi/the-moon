"use client";

import { useState, useRef } from "react";
import { motion, useInView } from "motion/react";
import Link from "next/link";
import { ChangeStarField } from "./ChangeStarField";
import { MissionModal } from "./MissionModal";
import { SectionNavButton } from "@/app/about-moon/SectionNavButton";

type Phase = "绕" | "落" | "回" | "未来";

interface Mission {
  id: string;
  name: string;
  year: string;
  date: string;
  phase: Phase;
  phaseLabel: string;
  description: string;
  image: string;
  trajectoryImage: string;
}

const phases: { key: Phase; label: string; sublabel: string; color: string }[] = [
  { key: "绕", label: "一期工程", sublabel: "绕月探测", color: "#C1FAF8" },
  { key: "落", label: "二期工程", sublabel: "落月探测", color: "#F1D088" },
  { key: "回", label: "三期工程", sublabel: "采样返回探测", color: "#f8a4a4" },
  { key: "未来", label: "未来规划", sublabel: "月球科研站", color: "#b8a4f8" },
];

const missions: Mission[] = [
  {
    id: "ce1",
    name: "嫦娥一号",
    year: "2007",
    date: "10月24日",
    phase: "绕",
    phaseLabel: "一期工程 · 绕月探测",
    description:
      "是中国探月计划中的第一颗绕月人造卫星，在全球首次获取了全月球影像图。发射我国第一期月球探测卫星，突破至地外天体的飞行技术，并实现首次绕月飞行。",
    image: "/change/ce-1.png",
    trajectoryImage: "/change/cetra-1.jpg",
  },
  {
    id: "ce2",
    name: "嫦娥二号",
    year: "2010",
    date: "10月1日",
    phase: "落",
    phaseLabel: "一期工程 · 绕月探测",
    description:
      "是中国探月工程二期的技术先导星，为嫦娥三号预选着陆区虹湾进行了高精度成像，获取了全月面7米分辨率影像。",
    image: "/change/ce-2.png",
    trajectoryImage: "/change/cetra-2.jpg",
  },
  {
    id: "ce3",
    name: "嫦娥三号",
    year: "2013",
    date: "12月2日",
    phase: "落",
    phaseLabel: "二期工程 · 落月探测",
    description:
      "由着陆器和巡视器（“玉兔号”月球车）组成，中国航天器首次地外天体软着陆与巡视勘察。发射月球软着陆器，携带月球巡视勘察器（月球车），在着陆器落区附近进行探测。",
    image: "/change/ce-3.png",
    trajectoryImage: "/change/cetra-3.jpg",
  },
  {
    id: "ce4",
    name: "嫦娥四号",
    year: "2018",
    date: "12月8日",
    phase: "落",
    phaseLabel: "二期工程 · 落月探测",
    description:
      "实现了人类首次月球背面软着陆和巡视勘察，传回世界第一张近距离拍摄月背影像。这是人类探月史上的重大突破。",
    image: "/change/ce-4.png",
    trajectoryImage: "/change/cetra-4.jpg",
  },
  {
    id: "ce5",
    name: "嫦娥五号",
    year: "2020",
    date: "11月24日",
    phase: "回",
    phaseLabel: "三期工程 · 采样返回",
    description:
      "首次月面自动采样、首次月面起飞上升、世界首次无人月轨交会对接、首次带月样高速再入返回地球。成功带回1731克月球样品。",
    image: "/change/ce-5.png",
    trajectoryImage: "/change/cetra-5.jpg",
  },
  {
    id: "ce6",
    name: "嫦娥六号",
    year: "2024",
    date: "5月3日",
    phase: "回",
    phaseLabel: "三期工程 · 采样返回",
    description:
      "完成月球背面南极—艾特肯盆地月球背面着陆区的现场调查和分析，并取回月背样品。实现人类首次从月球背面采集样品返回。",
    image: "/change/ce-6.png",
    trajectoryImage: "/change/cetra-6.jpg",
  },
  {
    id: "ce7",
    name: "嫦娥七号",
    year: "2026",
    date: "预计",
    phase: "未来",
    phaseLabel: "未来规划 · 月球科研站",
    description:
      "计划对月球南极进行综合探测，包括月球地形地貌、物质成分、空间环境等。将搭载飞跃探测器，对月球南极阴影坑进行探测。",
    image: "/change/ce-7.jpg",
    trajectoryImage: "/change/cetra-7.jpg",
  },
  {
    id: "ce8",
    name: "嫦娥八号",
    year: "2028",
    date: "预计",
    phase: "未来",
    phaseLabel: "未来规划 · 月球科研站",
    description:
      "将进行月球科研站关键技术验证，包括月球资源原位利用、月球3D打印建造等，为建设国际月球科研站奠定基础。",
    image: "/change/ce-8.png",
    trajectoryImage: "/change/cetra-8.jpg",
  },
];

function MissionCard({
  mission,
  index,
  activePhase,
  onClick,
  onTrajectoryClick,
}: {
  mission: Mission;
  index: number;
  activePhase: Phase | null;
  onClick: () => void;
  onTrajectoryClick: () => void;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const isHighlighted = activePhase === null || activePhase === mission.phase;
  const phaseColor = phases.find((p) => p.key === mission.phase)?.color || "#F1D088";

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: index % 2 === 0 ? -60 : 60 }}
      animate={
        inView
          ? {
              opacity: isHighlighted ? 1 : 0.15,
              x: 0,
              scale: isHighlighted && activePhase !== null ? 1.05 : isHighlighted ? 1 : 0.9,
            }
          : {}
      }
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className="relative group cursor-pointer"
      style={{ transformOrigin: "center center" }}
      onClick={onClick}
    >
      <div
        className="relative rounded-xl overflow-hidden border border-white/10 hover:border-[#F1D088]/50 transition-all duration-300 group-hover:shadow-[0_0_30px_rgba(241,208,136,0.15)] flex flex-col sm:flex-row"
        style={{ background: "linear-gradient(145deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)" }}
      >
        <div className="relative w-full sm:w-2/5 min-h-[140px] sm:min-h-[180px] overflow-hidden flex-shrink-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={mission.image}
            alt={mission.name}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#151829]/50 hidden sm:block" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#151829]/50 to-transparent sm:hidden" />
          <div className="absolute top-3 left-3">
            <span
              className="px-2.5 py-1 rounded-full text-xs backdrop-blur-sm"
              style={{ background: `${phaseColor}22`, color: phaseColor, border: `1px solid ${phaseColor}44` }}
            >
              {mission.phase}
            </span>
          </div>
          <div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
            style={{ background: `radial-gradient(circle at 50% 80%, ${phaseColor}15, transparent 70%)` }}
          />
        </div>

        <div className="flex-1 p-4 sm:p-5 flex flex-col justify-between">
          <div>
            <div className="flex items-baseline gap-3 mb-2">
              <h3 className="text-lg text-[#F1D088] group-hover:text-[#f5dfa8] transition-colors">
                {mission.name}
              </h3>
              <span className="text-[#C1FAF8]/50 text-xs">
                {mission.year}年 {mission.date}
              </span>
            </div>
            <p className="text-white/50 text-sm leading-relaxed group-hover:text-white/70 transition-colors">
              {mission.description}
            </p>
          </div>
          <button
            className="mt-3 flex items-center gap-1.5 text-xs text-[#C1FAF8]/40 group-hover:text-[#C1FAF8]/70 transition-colors hover:text-[#C1FAF8] cursor-pointer self-start"
            onClick={(e) => {
              e.stopPropagation();
              onTrajectoryClick();
            }}
          >
            <span className="w-4 h-4 rounded-full border border-current flex items-center justify-center text-[10px]">
              ▶
            </span>
            <span>点击查看任务轨迹详情</span>
          </button>
        </div>
      </div>
    </motion.div>
  );
}

function PhaseIndicator({
  phase,
  isActive,
  onClick,
}: {
  phase: (typeof phases)[0];
  isActive: boolean;
  onClick: () => void;
}) {
  return (
    <motion.button
      onClick={onClick}
      className={`relative px-4 py-2 sm:px-6 sm:py-3 rounded-full border transition-all duration-300 cursor-pointer text-sm sm:text-base ${
        isActive ? "border-transparent" : "border-white/10 hover:border-white/30"
      }`}
      style={
        isActive
          ? {
              background: `linear-gradient(135deg, ${phase.color}22, ${phase.color}11)`,
              borderColor: `${phase.color}66`,
              boxShadow: `0 0 20px ${phase.color}22`,
            }
          : {}
      }
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <div className="flex flex-col items-center gap-0.5">
        <span style={{ color: isActive ? phase.color : "rgba(255,255,255,0.5)" }}>{phase.label}</span>
        <span className="text-xs hidden sm:block" style={{ color: isActive ? `${phase.color}aa` : "rgba(255,255,255,0.3)" }}>
          {phase.sublabel}
        </span>
      </div>
      <motion.span
        className="absolute -right-2 -top-2 text-2xl pointer-events-none"
        style={{ color: `${phase.color}33` }}
        animate={isActive ? { scale: [1, 1.2, 1], opacity: [0.2, 0.4, 0.2] } : {}}
        transition={{ duration: 2, repeat: Infinity }}
      >
        {phase.key}
      </motion.span>
    </motion.button>
  );
}

export default function ChangeClient() {
  const [activePhase, setActivePhase] = useState<Phase | null>(null);
  const [selectedMission, setSelectedMission] = useState<Mission | null>(null);
  const [showTrajectory, setShowTrajectory] = useState(false);
  const timelineRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const togglePhase = (key: Phase) => {
    setActivePhase((prev) => {
      const newPhase = prev === key ? null : key;
      if (newPhase) {
        const firstMission = missions.find((m) => m.phase === newPhase);
        if (firstMission) {
          setTimeout(() => {
            const el = cardRefs.current[firstMission.id];
            if (el) {
              const rect = el.getBoundingClientRect();
              const scrollY = window.scrollY + rect.top - window.innerHeight / 2 + rect.height / 2;
              window.scrollTo({ top: scrollY, behavior: "smooth" });
            }
          }, 100);
        }
      }
      return newPhase;
    });
  };

  return (
    <div className="min-h-screen bg-[#151829] text-white overflow-x-hidden">
      <ChangeStarField />

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
          <h2 className="text-3xl tracking-wider text-white md:text-4xl">中国探月工程：嫦娥计划</h2>
          <span className="pb-1 text-sm tracking-widest text-[#C1FAF8]/50">
            China's Lunar Exploration Program: Chang'e Mission
          </span>
        </div>
        <div className="h-px bg-gradient-to-r from-[#F1D088]/60 via-[#C1FAF8]/30 to-transparent" />
        <p className="mt-3 max-w-2xl text-sm text-white/40">
          通过时间线回顾嫦娥计划从绕月探测、落月探测到采样返回与未来月球科研站建设的关键节点。
        </p>
      </div>

      <section ref={timelineRef} className="relative z-10 px-4 pt-8 pb-16 sm:pt-10 sm:pb-24 max-w-7xl mx-auto">
        <motion.div
          className="flex flex-wrap justify-center gap-3 sm:gap-4 mb-12 sm:mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          {phases.map((p) => (
            <PhaseIndicator key={p.key} phase={p} isActive={activePhase === p.key} onClick={() => togglePhase(p.key)} />
          ))}
        </motion.div>

        <div className="relative">
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-[#C1FAF8]/20 via-[#F1D088]/20 to-[#f8a4a4]/20" />
            <motion.div
              className="absolute left-0 w-full"
              style={{
                height: "120px",
                background: "linear-gradient(to bottom, transparent, #C1FAF8, #F1D088, transparent)",
                filter: "blur(1.5px)",
                opacity: 0.6,
              }}
              animate={{ top: ["-120px", "100%"] }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            />
            <motion.div
              className="absolute left-0 w-full"
              style={{
                height: "80px",
                background: "linear-gradient(to bottom, transparent, #F1D088, #f8a4a4, transparent)",
                filter: "blur(1px)",
                opacity: 0.4,
              }}
              animate={{ top: ["-80px", "100%"] }}
              transition={{ duration: 5.5, repeat: Infinity, ease: "linear", delay: 2 }}
            />
            <div className="absolute inset-0 w-[3px] -translate-x-[1px] bg-gradient-to-b from-[#C1FAF8]/5 via-[#F1D088]/8 to-[#f8a4a4]/5 blur-[2px]" />
          </div>

          <div className="flex flex-col gap-0 sm:gap-4">
            {missions.map((m, i) => (
              <div
                key={m.id}
                ref={(el) => {
                  cardRefs.current[m.id] = el;
                }}
                className="relative md:grid md:grid-cols-[1fr_auto_1fr] md:items-center md:gap-0"
              >
                <div className="hidden md:block">
                  {i % 2 === 0 ? (
                    <div className="pr-12">
                      <MissionCard
                        mission={m}
                        index={i}
                        activePhase={activePhase}
                        onClick={() => {
                          setSelectedMission(m);
                          setShowTrajectory(false);
                        }}
                        onTrajectoryClick={() => {
                          setSelectedMission(m);
                          setShowTrajectory(true);
                        }}
                      />
                    </div>
                  ) : null}
                </div>

                <div className="hidden md:flex items-center justify-center w-6">
                  <motion.div
                    className="w-3.5 h-3.5 rounded-full"
                    style={{
                      background: phases.find((p) => p.key === m.phase)?.color,
                      boxShadow: `0 0 14px ${phases.find((p) => p.key === m.phase)?.color}66`,
                    }}
                    animate={{ scale: [1, 1.4, 1] }}
                    transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
                  />
                </div>

                <div className="hidden md:block">
                  {i % 2 !== 0 ? (
                    <div className="pl-12">
                      <MissionCard
                        mission={m}
                        index={i}
                        activePhase={activePhase}
                        onClick={() => {
                          setSelectedMission(m);
                          setShowTrajectory(false);
                        }}
                        onTrajectoryClick={() => {
                          setSelectedMission(m);
                          setShowTrajectory(true);
                        }}
                      />
                    </div>
                  ) : null}
                </div>

                <div className="md:hidden">
                  <div className="flex items-center gap-3 mb-3">
                    <div
                      className="w-2.5 h-2.5 rounded-full"
                      style={{
                        background: phases.find((p) => p.key === m.phase)?.color,
                        boxShadow: `0 0 8px ${phases.find((p) => p.key === m.phase)?.color}66`,
                      }}
                    />
                    <span className="text-[#F1D088]/70 text-sm">
                      {m.year}年 {m.date}
                    </span>
                  </div>
                  <MissionCard
                    mission={m}
                    index={i}
                    activePhase={activePhase}
                    onClick={() => {
                      setSelectedMission(m);
                      setShowTrajectory(false);
                    }}
                    onTrajectoryClick={() => {
                      setSelectedMission(m);
                      setShowTrajectory(true);
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {selectedMission ? (
        <MissionModal
          mission={selectedMission}
          initialShowTrajectory={showTrajectory}
          onClose={() => {
            setSelectedMission(null);
            setShowTrajectory(false);
          }}
        />
      ) : null}

      <div className="fixed bottom-8 left-8 z-50 max-md:bottom-6 max-md:left-4">
        <SectionNavButton
          direction="prev"
          section={{ label: "人类探月活动", href: "/mission-sites" }}
        />
      </div>
      <div className="fixed bottom-8 right-8 z-50 max-md:bottom-6 max-md:right-4">
        <SectionNavButton
          direction="next"
          section={{ label: "月球的外观", href: "/about-moon" }}
        />
      </div>
    </div>
  );
}

