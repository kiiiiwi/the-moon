"use client";

import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { ChevronDown } from "lucide-react";

const goldStars = [
  { x: 31.6, y: 77.3, size: 7 },
  { x: 48.5, y: 36.8, size: 7 },
  { x: 71.1, y: 75.2, size: 7 },
  { x: 33, y: 27.2, size: 7 },
  { x: 34.7, y: 54.8, size: 7 },
  { x: 85.7, y: 34.8, size: 7 },
  { x: 41.4, y: 6.8, size: 7 },
  { x: 13.3, y: 64, size: 7 },
  { x: 58.4, y: 99.3, size: 7 },
];

const cyanStars = [
  { x: 58.2, y: 89.9, size: 7 },
  { x: 87.9, y: 95.4, size: 7 },
  { x: 8.6, y: 42.2, size: 7 },
  { x: 61.1, y: 42.6, size: 7 },
  { x: 57.2, y: 17.4, size: 7 },
  { x: 95.5, y: 56.9, size: 7 },
  { x: 22.2, y: 56.3, size: 7 },
  { x: 25.2, y: 97.4, size: 7 },
];

const smallGoldStars = [
  { x: 44.8, y: 71, size: 3 },
  { x: 54.4, y: 77.4, size: 3 },
  { x: 48.1, y: 55.1, size: 3 },
  { x: 21.2, y: 43.1, size: 3 },
  { x: 47.1, y: 28.3, size: 3 },
  { x: 72, y: 30, size: 3 },
  { x: 86, y: 55.1, size: 3 },
  { x: 90.4, y: 77.8, size: 3 },
  { x: 71.5, y: 98.7, size: 3 },
  { x: 42.7, y: 97.8, size: 3 },
];

const smallCyanStars = [
  { x: 40.9, y: 91.9, size: 3 },
  { x: 48.6, y: 96, size: 3 },
  { x: 47.7, y: 75.8, size: 3 },
  { x: 58.9, y: 62.5, size: 3 },
  { x: 76.2, y: 48.8, size: 3 },
  { x: 96.8, y: 37.2, size: 3 },
  { x: 9.6, y: 86.5, size: 3 },
  { x: 0, y: 14.1, size: 3 },
];

const rays = [
  { id: 1, angle: 0, length: 180, opacity: 0.6 },
  { id: 2, angle: 45, length: 160, opacity: 0.4 },
  { id: 3, angle: 90, length: 200, opacity: 0.6 },
  { id: 4, angle: 135, length: 140, opacity: 0.4 },
  { id: 5, angle: 180, length: 180, opacity: 0.6 },
  { id: 6, angle: 225, length: 150, opacity: 0.4 },
  { id: 7, angle: 270, length: 190, opacity: 0.6 },
  { id: 8, angle: 315, length: 145, opacity: 0.4 },
  { id: 9, angle: 22.5, length: 120, opacity: 0.3 },
  { id: 10, angle: 67.5, length: 110, opacity: 0.3 },
  { id: 11, angle: 112.5, length: 130, opacity: 0.3 },
  { id: 12, angle: 157.5, length: 115, opacity: 0.3 },
  { id: 13, angle: 202.5, length: 125, opacity: 0.3 },
  { id: 14, angle: 247.5, length: 105, opacity: 0.3 },
  { id: 15, angle: 292.5, length: 135, opacity: 0.3 },
  { id: 16, angle: 337.5, length: 118, opacity: 0.3 },
];

const MOON_INNER_DISK_INSET = "calc(4%)";
const moonInnerEdgeMask =
  "radial-gradient(circle at 50% 50%, #000 0%, #000 78%, rgba(0,0,0,0.55) 90%, transparent 100%)";
const moonInnerEdgeMaskStyle = {
  WebkitMaskImage: moonInnerEdgeMask,
  maskImage: moonInnerEdgeMask,
  WebkitMaskRepeat: "no-repeat" as const,
  maskRepeat: "no-repeat" as const,
  WebkitMaskSize: "100% 100%",
  maskSize: "100% 100%",
};

function Star({
  x,
  y,
  size,
  color,
  delay,
}: {
  x: number;
  y: number;
  size: number;
  color: "gold" | "cyan";
  delay: number;
}) {
  const bg =
    color === "gold" ? "rgba(241, 208, 136, 0.9)" : "#C1FAF8";
  const shadow =
    color === "gold"
      ? `0 0 ${size * 3}px ${bg}, 0 0 ${size * 1.5}px ${bg}`
      : `0 0 ${size * 3}px ${bg}, 0 0 ${size * 1.5}px ${bg}`;

  return (
    <motion.div
      className="absolute rounded-full"
      style={{
        left: `${x}%`,
        top: `${y}%`,
        width: size,
        height: size,
        background: bg,
        boxShadow: shadow,
        filter: `blur(${size > 4 ? 1 : 0.5}px)`,
      }}
      animate={{ opacity: [0.3, 1, 0.3] }}
      transition={{
        duration: 3,
        repeat: Infinity,
        delay,
        ease: "easeInOut",
      }}
    />
  );
}

function MoonOrb() {
  return (
    <div
      className="relative"
      style={{
        width: "min(45vw, 350px)",
        height: "min(45vw, 350px)",
      }}
    >
      <div
        className="absolute rounded-full animate-moon-border-glow"
        style={{
          inset: "0%",
          background:
            "radial-gradient(50% 50% at 50% 50%, rgba(241,208,136,0.12) 40%, transparent 70%)",
        }}
      />
      <motion.div
        className="absolute"
        style={{
          top: "50%",
          left: "-80%",
          right: "-80%",
          height: 2,
          background:
            "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.6) 30%, rgba(255,255,255,0.8) 50%, rgba(255,255,255,0.6) 70%, transparent 100%)",
          filter: "blur(1px)",
          zIndex: 50,
        }}
        animate={{ opacity: [0.4, 0.8, 0.4] }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="absolute rounded-full"
        style={{
          inset: 0,
          border: "6px solid rgba(193, 250, 248, 0.7)",
          boxShadow:
            "0 0 20px rgba(193,250,248,0.3), inset 0 0 20px rgba(193,250,248,0.1)",
        }}
        animate={{ rotate: 360 }}
        transition={{
          duration: 60,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <svg
          className="h-[400px] w-[400px] animate-moon-slow-rotate md:h-[500px] md:w-[500px] lg:h-[600px] lg:w-[600px]"
          viewBox="0 0 600 600"
        >
          {rays.map((ray) => {
            const centerX = 300;
            const centerY = 300;
            const startRadius = 140;
            const endRadius = startRadius + ray.length;
            const angleRad = (ray.angle * Math.PI) / 180;
            const x1 = centerX + startRadius * Math.cos(angleRad);
            const y1 = centerY + startRadius * Math.sin(angleRad);
            const x2 = centerX + endRadius * Math.cos(angleRad);
            const y2 = centerY + endRadius * Math.sin(angleRad);

            return (
              <line
                key={ray.id}
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke="white"
                strokeWidth="1"
                opacity={ray.opacity}
                className="animate-moon-ray-pulse"
                style={{
                  animationDelay: `${ray.id * 0.1}s`,
                }}
              />
            );
          })}
        </svg>
      </div>

      <motion.div
        className="absolute z-20 rounded-full"
        style={{
          inset: "4%",
          border: "4px solid rgba(241, 208, 136, 0.85)",
          boxShadow: "0 0 15px rgba(241,208,136,0.2)",
        }}
        animate={{ rotate: -360 }}
        transition={{
          duration: 80,
          repeat: Infinity,
          ease: "linear",
        }}
      />
      <div
        className="absolute z-10 overflow-hidden rounded-full"
        style={{
          inset: MOON_INNER_DISK_INSET,
          background:
            "radial-gradient(circle at 30% 30%, #1e2d4d 0%, #172139 50%, #0f1628 100%)",
          boxShadow: "inset 0 0 32px rgba(0,0,0,0.42)",
          ...moonInnerEdgeMaskStyle,
        }}
      />
      <motion.div
        className="pointer-events-none absolute z-10 overflow-hidden rounded-full"
        style={{
          inset: MOON_INNER_DISK_INSET,
          ...moonInnerEdgeMaskStyle,
        }}
        animate={{ opacity: [0.6, 1, 0.6] }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <div
          className="absolute inset-0 rounded-full"
          style={{
            background:
              "radial-gradient(50% 50% at 50% 50%, rgba(241, 208, 136, 0) 65%, rgba(241, 208, 136, 0.15) 100%)",
            filter: "blur(0.5px)",
          }}
        />
        <div
          className="absolute inset-0 rounded-full"
          style={{
            background:
              "radial-gradient(50% 50% at 50% 50%, rgba(193, 250, 248, 0) 70%, rgba(193, 250, 248, 0.1) 100%)",
            filter: "blur(0.5px)",
          }}
        />
      </motion.div>
      <div className="absolute top-[20%] left-[25%] z-10 h-8 w-8 rounded-full bg-[#0f1628]/50 blur-sm md:h-10 md:w-10" />
      <div className="absolute top-[50%] left-[60%] z-10 h-6 w-6 rounded-full bg-[#0f1628]/40 blur-sm md:h-8 md:w-8" />
      <div className="absolute top-[65%] left-[30%] z-10 h-4 w-4 rounded-full bg-[#0f1628]/30 blur-sm md:h-6 md:w-6" />
      {["top", "bottom", "left", "right"].map((pos) => (
        <motion.div
          key={pos}
          className="absolute z-30 rounded-full"
          style={{
            width: 6,
            height: 6,
            background: "#fff",
            boxShadow:
              "0 0 15px #fff, 0 0 30px rgba(193,250,248,0.5)",
            filter: "blur(1px)",
            ...(pos === "top"
              ? {
                top: "-3px",
                left: "50%",
                transform: "translateX(-50%)",
              }
              : {}),
            ...(pos === "bottom"
              ? {
                bottom: "-3px",
                left: "50%",
                transform: "translateX(-50%)",
              }
              : {}),
            ...(pos === "left"
              ? {
                left: "-3px",
                top: "50%",
                transform: "translateY(-50%)",
              }
              : {}),
            ...(pos === "right"
              ? {
                right: "-3px",
                top: "50%",
                transform: "translateY(-50%)",
              }
              : {}),
          }}
          animate={{
            opacity: [0.5, 1, 0.5],
            scale: [0.8, 1.2, 0.8],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
            delay:
              ["top", "right", "bottom", "left"].indexOf(pos) * 0.5,
          }}
        />
      ))}
    </div>
  );
}

function DecorativeLine({ side }: { side: "left" | "right" }) {
  return (
    <div
      className="hidden max-w-[300px] flex-1 items-center gap-2 md:flex"
    >
      {side === "left" ? (
        <>
          <motion.div
            className="h-[1px] flex-1"
            style={{
              background:
                "linear-gradient(90deg, transparent, rgba(241,208,136,0.6))",
            }}
            animate={{ opacity: [0.3, 0.8, 0.3] }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <div
            className="rounded-full"
            style={{
              width: 7,
              height: 7,
              background: "#C1FAF8",
              boxShadow: "0 0 10px #C1FAF8",
            }}
          />
        </>
      ) : (
        <>
          <div
            className="rounded-full"
            style={{
              width: 7,
              height: 7,
              background: "rgba(241,208,136,0.9)",
              boxShadow: "0 0 10px rgba(241,208,136,0.9)",
            }}
          />
          <motion.div
            className="h-[1px] flex-1"
            style={{
              background:
                "linear-gradient(90deg, rgba(241,208,136,0.6), transparent)",
            }}
            animate={{ opacity: [0.3, 0.8, 0.3] }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1,
            }}
          />
        </>
      )}
    </div>
  );
}

export default function HomeLandingClient() {
  const [currentPage, setCurrentPage] = useState(0);
  const isScrolling = useRef(false);

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      if (isScrolling.current) return;
      if (Math.abs(e.deltaY) < 30) return;

      isScrolling.current = true;
      if (e.deltaY > 0 && currentPage < 2) {
        setCurrentPage((p) => p + 1);
      } else if (e.deltaY < 0 && currentPage > 0) {
        setCurrentPage((p) => p - 1);
      }
      setTimeout(() => {
        isScrolling.current = false;
      }, 1000);
    };

    window.addEventListener("wheel", handleWheel, {
      passive: false,
    });
    return () => window.removeEventListener("wheel", handleWheel);
  }, [currentPage]);

  const pages = [
    <section
      key="hero"
      className="relative flex h-screen w-full flex-col items-center justify-start overflow-hidden"
      style={{ background: "#151829" }}
    >
      <div className="absolute inset-0">
        {goldStars.map((s, i) => (
          <Star key={`g${i}`} {...s} color="gold" delay={i * 0.3} />
        ))}
        {cyanStars.map((s, i) => (
          <Star key={`c${i}`} {...s} color="cyan" delay={i * 0.4} />
        ))}
        {smallGoldStars.map((s, i) => (
          <Star key={`sg${i}`} {...s} color="gold" delay={i * 0.2} />
        ))}
        {smallCyanStars.map((s, i) => (
          <Star key={`sc${i}`} {...s} color="cyan" delay={i * 0.25} />
        ))}
      </div>

      <div className="relative z-10 mt-[8vh] flex flex-col items-center md:mt-[10vh]">
        <div className="flex w-full items-center justify-center gap-4 px-4 md:gap-8">
          <DecorativeLine side="left" />
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          >
            <h1
              style={{
                color: "#F1D088",
                fontFamily: "'Georgia', 'Times New Roman', serif",
                fontSize: "clamp(2rem, 5vw, 4rem)",
                lineHeight: 1.2,
              }}
            >
              Let&apos;s talk about
            </h1>
            <h2
              style={{
                color: "#F1D088",
                fontFamily: "'Georgia', 'Times New Roman', serif",
                fontStyle: "italic",
                fontSize: "clamp(2.5rem, 7vw, 5.5rem)",
                lineHeight: 1.1,
              }}
            >
              MOON
            </h2>
          </motion.div>
          <DecorativeLine side="right" />
        </div>
      </div>

      <motion.div
        className="relative z-10 mt-[12vh] flex items-center justify-center md:mt-[14vh]"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          duration: 1.5,
          ease: "easeOut",
          delay: 0.3,
        }}
      >
        <MoonOrb />
      </motion.div>

      <motion.div
        className="absolute bottom-8 left-1/2 z-20 flex -translate-x-1/2 cursor-pointer flex-col items-center gap-1"
        animate={{ y: [0, 8, 0] }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        onClick={() => setCurrentPage(1)}
      >
        <span
          style={{
            color: "rgba(241,208,136,0.7)",
            fontSize: 16,
          }}
        >
          Scroll
        </span>
        <ChevronDown
          style={{
            color: "rgba(241,208,136,0.7)",
            width: 36,
            height: 36,
          }}
        />
      </motion.div>
    </section>,

    <section
      key="facts"
      className="relative flex h-screen w-full flex-col items-center justify-center overflow-hidden"
      style={{ background: "#151829" }}
    >
      <div className="absolute inset-0">
        {goldStars.slice(0, 5).map((s, i) => (
          <Star key={`g2${i}`} {...s} color="gold" delay={i * 0.5} />
        ))}
        {cyanStars.slice(0, 4).map((s, i) => (
          <Star key={`c2${i}`} {...s} color="cyan" delay={i * 0.6} />
        ))}
      </div>
      <motion.div
        className="relative z-10 max-w-3xl px-6 text-center"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <h2
          style={{
            color: "#F1D088",
            fontFamily: "Georgia, serif",
            fontSize: "clamp(1.8rem, 4vw, 3rem)",
            marginBottom: 32,
          }}
        >
          About the Moon
        </h2>
        <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-3">
          {[
            {
              label: "距离地球",
              value: "384,400 km",
              desc: "平均距离",
            },
            {
              label: "直径",
              value: "3,474 km",
              desc: "约为地球的1/4",
            },
            {
              label: "公转周期",
              value: "27.3 天",
              desc: "恒星月",
            },
          ].map((item, i) => (
            <motion.div
              key={item.label}
              className="rounded-2xl p-6"
              style={{
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(193,250,248,0.15)",
                backdropFilter: "blur(10px)",
              }}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: 0.3 + i * 0.2,
                duration: 0.8,
              }}
            >
              <p
                style={{
                  color: "rgba(193,250,248,0.7)",
                  fontSize: 14,
                }}
              >
                {item.label}
              </p>
              <p
                style={{
                  color: "#F1D088",
                  fontFamily: "Georgia, serif",
                  fontSize: "clamp(1.5rem, 3vw, 2rem)",
                  margin: "8px 0",
                }}
              >
                {item.value}
              </p>
              <p
                style={{
                  color: "rgba(255,255,255,0.5)",
                  fontSize: 13,
                }}
              >
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>
      <motion.div
        className="absolute bottom-8 left-1/2 z-20 -translate-x-1/2 cursor-pointer"
        animate={{ y: [0, 8, 0] }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        onClick={() => setCurrentPage(2)}
      >
        <ChevronDown
          style={{
            color: "rgba(241,208,136,0.7)",
            width: 24,
            height: 24,
          }}
        />
      </motion.div>
    </section>,

    <section
      key="explore"
      className="relative flex h-screen w-full flex-col items-center justify-center overflow-hidden"
      style={{ background: "#151829" }}
    >
      <div className="absolute inset-0">
        {smallCyanStars.map((s, i) => (
          <Star key={`sc3${i}`} {...s} color="cyan" delay={i * 0.3} />
        ))}
        {smallGoldStars.slice(0, 5).map((s, i) => (
          <Star key={`sg3${i}`} {...s} color="gold" delay={i * 0.4} />
        ))}
      </div>
      <motion.div
        className="relative z-10 max-w-2xl px-6 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2 }}
      >
        <h2
          style={{
            color: "#F1D088",
            fontFamily: "Georgia, serif",
            fontSize: "clamp(1.8rem, 4vw, 3rem)",
            marginBottom: 24,
          }}
        >
          探索月球
        </h2>
        <p
          style={{
            color: "rgba(255,255,255,0.6)",
            lineHeight: 1.8,
            fontSize: "clamp(0.9rem, 1.5vw, 1.1rem)",
          }}
        >
          从1969年阿波罗11号次载人登月，到如今嫦娥探测器的月背着陆，人类对月球的探索从未停歇。月球不仅是距离我们最近的天体，更是通往深空的第一站。
        </p>
        <Link href="/index-knowledge-map" className="mt-10 inline-block">
          <motion.div
            className="inline-block rounded-full px-8 py-3 cursor-pointer"
            style={{
              border: "1px solid rgba(241,208,136,0.5)",
              color: "#F1D088",
              fontFamily: "Georgia, serif",
            }}
            whileHover={{
              scale: 1.05,
              boxShadow: "0 0 20px rgba(241,208,136,0.3)",
            }}
            whileTap={{ scale: 0.95 }}
          >
            开始探索 →
          </motion.div>
        </Link>
      </motion.div>
    </section>,
  ];

  return (
    <div
      className="h-screen w-full overflow-hidden"
      style={{ background: "#151829" }}
    >
      <motion.div
        animate={{ y: `-${currentPage * 100}vh` }}
        transition={{ duration: 0.8, ease: [0.65, 0, 0.35, 1] }}
        className="w-full"
      >
        {pages}
      </motion.div>

      <div className="fixed top-1/2 right-4 z-50 flex -translate-y-1/2 flex-col gap-3">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="cursor-pointer rounded-full"
            style={{
              width: 8,
              height: 8,
              background:
                currentPage === i
                  ? "#F1D088"
                  : "rgba(255,255,255,0.2)",
              boxShadow:
                currentPage === i
                  ? "0 0 8px rgba(241,208,136,0.5)"
                  : "none",
            }}
            whileHover={{ scale: 1.3 }}
            onClick={() => setCurrentPage(i)}
            animate={{ scale: currentPage === i ? 1.2 : 1 }}
          />
        ))}
      </div>
    </div>
  );
}
