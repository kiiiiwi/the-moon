"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X } from "lucide-react";
import { withBasePath } from "@/lib/base-path";

interface MissionModalProps {
  mission: {
    id?: string;
    name: string;
    year: string;
    date: string;
    description: string;
    image: string;
    phase: string;
    trajectoryImage?: string;
  } | null;
  initialShowTrajectory?: boolean;
  onClose: () => void;
}

export function MissionModal({
  mission,
  initialShowTrajectory = false,
  onClose,
}: MissionModalProps) {
  const [showTrajectory, setShowTrajectory] = useState(initialShowTrajectory);
  if (!mission) return null;

  const displayImage =
    showTrajectory && mission.trajectoryImage ? mission.trajectoryImage : mission.image;
  const isTrajectoryView = showTrajectory && mission.trajectoryImage;
  const enlargedTrajectoryMissionIds = new Set(["ce3", "ce4", "ce5", "ce6"]);
  const shouldEnlargeTrajectoryFrame =
    isTrajectoryView && mission.id && enlargedTrajectoryMissionIds.has(mission.id);

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />
        <motion.div
          className={`relative z-10 w-full rounded-2xl overflow-hidden border ${
            shouldEnlargeTrajectoryFrame ? "max-w-7xl" : "max-w-3xl"
          }`}
          style={{
            background: "linear-gradient(135deg, #1a1f35 0%, #151829 100%)",
            borderColor: isTrajectoryView ? "rgba(193,250,248,0.3)" : "rgba(241,208,136,0.3)",
          }}
          initial={{ scale: 0.8, opacity: 0, y: 40 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.8, opacity: 0, y: 40 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5 text-white" />
          </button>

          <div className={`relative w-full overflow-hidden ${isTrajectoryView ? "bg-[#0d1222]" : "aspect-video"}`}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <motion.img
              key={displayImage}
              src={withBasePath(displayImage)}
              alt={mission.name}
              className={
                isTrajectoryView
                  ? `block mx-auto w-auto h-auto object-contain ${
                      shouldEnlargeTrajectoryFrame
                        ? "max-w-[min(100%,1260px)] max-h-[72vh]"
                        : "max-w-[min(100%,980px)] max-h-[62vh]"
                    }`
                  : "w-full h-full object-cover"
              }
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            />
            {!isTrajectoryView && (
              <div className="absolute inset-0 bg-gradient-to-t from-[#151829] via-transparent to-transparent" />
            )}
            <div className="absolute bottom-4 left-6">
              <span
                className="px-3 py-1 rounded-full text-xs"
                style={{
                  background: isTrajectoryView ? "rgba(193,250,248,0.2)" : "rgba(241,208,136,0.2)",
                  color: isTrajectoryView ? "#C1FAF8" : "#F1D088",
                }}
              >
                {isTrajectoryView ? `${mission.phase} · 任务轨迹` : mission.phase}
              </span>
            </div>
          </div>

          <div className="p-6 md:p-8">
            <div className="flex items-baseline gap-4 mb-4">
              <h2
                className="text-2xl md:text-3xl"
                style={{ color: isTrajectoryView ? "#C1FAF8" : "#F1D088" }}
              >
                {mission.name}
                {isTrajectoryView ? " · 任务轨迹" : ""}
              </h2>
              <span className="text-[#C1FAF8]/60 text-sm">
                {mission.year}年 {mission.date}
              </span>
            </div>

            {!isTrajectoryView && <p className="text-white/80 leading-relaxed">{mission.description}</p>}

            {isTrajectoryView ? (
              <button
                onClick={() => setShowTrajectory(false)}
                className="mt-2 flex items-center gap-1.5 text-xs text-[#F1D088]/60 hover:text-[#F1D088] transition-colors cursor-pointer"
              >
                <span>← 返回任务详情</span>
              </button>
            ) : mission.trajectoryImage ? (
              <button
                onClick={() => setShowTrajectory(true)}
                className="mt-5 flex items-center gap-1.5 text-xs text-[#C1FAF8]/50 hover:text-[#C1FAF8] transition-colors cursor-pointer"
              >
                <span className="w-4 h-4 rounded-full border border-current flex items-center justify-center text-[10px]">
                  ▶
                </span>
                <span>点击查看任务轨迹详情</span>
              </button>
            ) : null}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

