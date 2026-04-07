"use client";

import Link from "next/link";
import { useEffect, useRef, useState, useCallback } from "react";
import { SectionNavButton } from "@/app/about-moon/SectionNavButton";
import { StarField } from "@/components/StarField";
import "./orbit.css";

const ORBIT_TEXT_CHARS = [
  { ch: "地", x: "85%", y: "28%", r: "-50deg" },
  { ch: "球", x: "100%", y: "14%", r: "-48deg" },
  { ch: "运", x: "115%", y: "-1%", r: "-43deg" },
  { ch: "动", x: "130%", y: "-14%", r: "-46deg" },
  { ch: "轨", x: "145%", y: "-28%", r: "-45deg" },
  { ch: "道", x: "160%", y: "-40%", r: "-40deg" },
] as const;

export default function OrbitClient() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentScreen, setCurrentScreen] = useState(0);
  const [mounted, setMounted] = useState(false);
  const isScrollingRef = useRef(false);

  useEffect(() => { setMounted(true); }, []);

  const scrollToScreen = useCallback((index: number) => {
    if (index < 0 || index > 2) return;
    isScrollingRef.current = true;
    setCurrentScreen(index);
    setTimeout(() => { isScrollingRef.current = false; }, 900);
  }, []);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      if (isScrollingRef.current) return;
      if (e.deltaY > 30) scrollToScreen(currentScreen + 1);
      else if (e.deltaY < -30) scrollToScreen(currentScreen - 1);
    };
    let touchStartY = 0;
    const handleTouchStart = (e: TouchEvent) => { touchStartY = e.touches[0].clientY; };
    const handleTouchEnd = (e: TouchEvent) => {
      if (isScrollingRef.current) return;
      const dy = touchStartY - e.changedTouches[0].clientY;
      if (dy > 50) scrollToScreen(currentScreen + 1);
      else if (dy < -50) scrollToScreen(currentScreen - 1);
    };
    el.addEventListener("wheel", handleWheel, { passive: false });
    el.addEventListener("touchstart", handleTouchStart, { passive: true });
    el.addEventListener("touchend", handleTouchEnd, { passive: true });
    return () => {
      el.removeEventListener("wheel", handleWheel);
      el.removeEventListener("touchstart", handleTouchStart);
      el.removeEventListener("touchend", handleTouchEnd);
    };
  }, [currentScreen, scrollToScreen]);

  return (
    <div ref={containerRef} className="orbit-container">
      {mounted ? <StarField /> : null}

      {/* ── Fixed header (always visible, same style as geology-map) ── */}
      <header className="orbit-header">
        <div className="orbit-header-row">
          <h2 className="orbit-header-title">地月系</h2>
          <span className="orbit-header-subtitle">Earth-Moon System</span>
        </div>
        <div className="orbit-header-line" />
        <p className="mt-3 max-w-2xl text-sm text-white/40">
          鼠标滚轮滑动查看展开轨道
        </p>
      </header>

      {/* ── Fixed back button — top right ── */}
      <div className="orbit-back-wrap">
        <div
          className="orbit-back-dot"
          style={{ background: "#F1D088", boxShadow: "0 0 6px #F1D088" }}
        />
        <Link href="/index-knowledge-map" className="orbit-back-btn">
          ← 返回主页面
        </Link>
      </div>

      {/* ── Fixed screen dots — bottom center, horizontal ── */}
      <div className="orbit-dots">
        {[0, 1, 2].map(i => (
          <button
            key={i}
            className={`orbit-dot${currentScreen === i ? " is-active" : ""}`}
            onClick={() => scrollToScreen(i)}
            aria-label={`第 ${i + 1} 屏`}
          />
        ))}
      </div>

      {/* ── 章节导航：仅第三屏显示（currentScreen === 2）── */}
      {currentScreen === 2 ? (
        <>
          <div className="fixed bottom-8 left-8 z-50 max-md:bottom-6 max-md:left-4">
            <SectionNavButton
              direction="prev"
              section={{ label: "月球的起源与演化", href: "/origin" }}
            />
          </div>
          <div className="fixed bottom-8 right-8 z-50 max-md:bottom-6 max-md:right-4">
            <SectionNavButton
              direction="next"
              section={{ label: "月球的表面形态", href: "/geology-map" }}
            />
          </div>
        </>
      ) : null}

      {/* ── Screens ── */}
      <div
        className="orbit-content-layer orbit-screens-track"
        style={{ transform: `translateX(-${currentScreen * 100}vw)` }}
      >

        {/* Screen 1 */}
        <section className="orbit-screen orbit-screen1">
          {/* scale wrapper — shrinks content while keeping it centred */}
          <div className="os1-scale-wrap">
            <video
              className="os1-moon-bg-video"
              src="/orbit/moonorbit.mp4"
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
            />

            <div className="os1-orbit-text-group">
              {ORBIT_TEXT_CHARS.map((item, i) => (
                <span
                  key={i}
                  className="os1-orbit-char"
                  style={{ "--x": item.x, "--y": item.y, "--r": item.r } as React.CSSProperties}
                >
                  {item.ch}
                </span>
              ))}
            </div>

            <div className="os1-dialog">
              <img src="/orbit/dialog-box.png" alt="" className="os1-dialog-bg" draggable={false} />
            </div>
          </div>
        </section>

        {/* Screen 2 — Figma node 476:356  (all PNG) */}
        <section className="orbit-screen orbit-screen2">
          <div className="orbit-screen-inner orbit-screen2-inner">
            <img src="/orbit/s2-earthorbit.png" className="os2-earthorbit" alt="" draggable={false} />
            <img src="/orbit/s2-moonorbit.png" className="os2-moonorbit" alt="" draggable={false} />
            <img src="/orbit/s2-sun.png" className="os2-sun" alt="" draggable={false} />
            <img src="/orbit/s2-earth.png" className="os2-earth" alt="" draggable={false} />
            <img src="/orbit/s2-moon.png" className="os2-moon" alt="" draggable={false} />
            <img src="/orbit/s2-border.png" className="os2-border" alt="" draggable={false} />
            <img src="/orbit/s2-vline.png" className="os2-vline" alt="" draggable={false} />
            <img src="/orbit/s2-dirtext.png" className="os2-dirtext" alt="" draggable={false} />
            <video
              className="os2-zoom-strip"
              src="/orbit/zoominorbit.mp4"
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
            />
            <img src="/orbit/s2-mask.png" className="os2-mask" alt="" draggable={false} />
            <img src="/orbit/s2-dialog-top.png" className="os2-dialog-top" alt="" draggable={false} />
            <img src="/orbit/s2-dialog-bottom.png" className="os2-dialog-bottom" alt="" draggable={false} />
          </div>
        </section>

        {/* Screen 3 — Figma node 476:488 */}
        <section className="orbit-screen orbit-screen3">
          <div className="orbit-screen-inner orbit-screen3-inner">
            {/* Earth orbit (dashed ellipse, partially off-screen left) */}
            <img src="/orbit/s3-earthorbit.png" className="os3-earthorbit" alt="" draggable={false} />

            {/* Moon orbit wavy path */}
            <img src="/orbit/s3-moonorbit.png" className="os3-moonorbit" alt="" draggable={false} />

            {/* Sun */}
            <img src="/orbit/s3-sun.png" className="os3-sun" alt="" draggable={false} />

            {/* Earth */}
            <img src="/orbit/s3-earth.png" className="os3-earth" alt="" draggable={false} />

            {/* Moon */}
            <img src="/orbit/s3-moon.png" className="os3-moon" alt="" draggable={false} />

            {/* Border frame */}
            <img src="/orbit/s3-border.png" className="os3-border" alt="" draggable={false} />

            {/* Gradient mask overlay */}
            <img src="/orbit/s3-mask.png" className="os3-mask" alt="" draggable={false} />

            {/* Zoom-in trajectory strip */}
            <img src="/orbit/s3-zoom.png" className="os3-zoom" alt="" draggable={false} />

            {/* Connector/transition gradient group */}
            <img src="/orbit/s3-connector.png" className="os3-connector" alt="" draggable={false} />

            {/* Main orbital diagram */}
            <img src="/orbit/s3-orbit-diagram.png" className="os3-orbit-diagram" alt="" draggable={false} />

            {/* Dialog box */}
            <img src="/orbit/s3-dialog.png" className="os3-dialog" alt="" draggable={false} />
          </div>
        </section>

      </div>
    </div>
  );
}
