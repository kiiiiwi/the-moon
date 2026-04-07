"use client"

import { useState, useRef, useEffect, useCallback } from "react"
import { motion, AnimatePresence } from "motion/react"
import { Sun } from "lucide-react"
import Link from "next/link"
import { SectionNavButton } from "@/app/about-moon/SectionNavButton"

// Moon phase data with orbital positions (angle in degrees from sun direction)
const MOON_PHASES = [
  { id: 0, name: "新月", nameEn: "New Moon", angle: 0, illumination: 0, description: "月球位于地球和太阳之间" },
  { id: 1, name: "蛾眉月", nameEn: "Waxing Crescent", angle: 45, illumination: 0.23, description: "月球向满月方向移动" },
  { id: 2, name: "上弦月", nameEn: "First Quarter", angle: 90, illumination: 0.45, description: "月球右半边被照亮" },
  { id: 3, name: "盈凸月", nameEn: "Waxing Gibbous", angle: 135, illumination: 0.83, description: "即将满月" },
  { id: 4, name: "满月", nameEn: "Full Moon", angle: 180, illumination: 1, description: "地球位于月球和太阳之间" },
  { id: 5, name: "亏凸月", nameEn: "Waning Gibbous", angle: 225, illumination: 0.78, description: "满月后开始变暗" },
  { id: 6, name: "下弦月", nameEn: "Last Quarter", angle: 270, illumination: 0.48, description: "月球左半边被照亮" },
  { id: 7, name: "残月", nameEn: "Waning Crescent", angle: 315, illumination: 0.17, description: "即将新月" },
]

// Prefer pre-rendered phase images from public/phases; fallback to SVG if missing.
const PHASE_IMAGE_MAP: Record<number, string> = {
  0: "/phases/新月.png",
  1: "/phases/蛾眉月.png",
  2: "/phases/上弦月.png",
  3: "/phases/盈凸月.png",
  4: "/phases/满月.png",
  5: "/phases/亏凸月.png",
  6: "/phases/下弦月.png",
  7: "/phases/残月.png",
}

// Calculate position on orbit circle
function getOrbitPosition(angle: number, radius: number, centerX: number, centerY: number) {
  const rad = (angle - 90) * (Math.PI / 180) // -90 to start from top
  return {
    x: centerX + radius * Math.cos(rad),
    y: centerY + radius * Math.sin(rad),
  }
}

// Moon phase visualization component using SVG mask
function MoonPhaseVisual({
  illumination,
  angle,
  size = 120
}: {
  illumination: number
  angle: number
  size?: number
}) {
  // Determine which side is lit based on the orbital angle
  const isWaxing = angle < 180

  // Calculate the terminator curve
  // For a sphere, the terminator appears as an ellipse when viewed
  const phase = illumination * 2 - 1 // -1 to 1

  return (
    <svg width={size} height={size} viewBox="0 0 100 100" className="drop-shadow-lg">
      <defs>
        <radialGradient id="moonGradient" cx="30%" cy="30%">
          <stop offset="0%" stopColor="#e8e8e8" />
          <stop offset="100%" stopColor="#a0a0a0" />
        </radialGradient>
        <filter id="moonGlow">
          <feGaussianBlur stdDeviation="2" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <clipPath id="moonClip">
          <circle cx="50" cy="50" r="45" />
        </clipPath>
      </defs>

      {/* Moon base (dark side) */}
      <circle
        cx="50"
        cy="50"
        r="45"
        fill="#2a2f45"
        filter="url(#moonGlow)"
      />

      {/* Illuminated portion */}
      <g clipPath="url(#moonClip)">
        {illumination === 0 ? null : illumination === 1 ? (
          <circle cx="50" cy="50" r="45" fill="url(#moonGradient)" />
        ) : (
          <path
            d={isWaxing
              ? `M 50 5 
                 A 45 45 0 0 1 50 95 
                 A ${45 * Math.abs(phase)} 45 0 0 ${phase > 0 ? 1 : 0} 50 5`
              : `M 50 5 
                 A 45 45 0 0 0 50 95 
                 A ${45 * Math.abs(phase)} 45 0 0 ${phase < 0 ? 0 : 1} 50 5`
            }
            fill="url(#moonGradient)"
          />
        )}
      </g>

      {/* Subtle crater details */}
      <g opacity="0.3" clipPath="url(#moonClip)">
        <circle cx="35" cy="40" r="8" fill="#888" />
        <circle cx="60" cy="55" r="6" fill="#888" />
        <circle cx="45" cy="65" r="5" fill="#888" />
        <circle cx="55" cy="30" r="4" fill="#888" />
      </g>
    </svg>
  )
}



// Tech bracket border component
function TechBracket({ children, className = "" }: { children: React.ReactNode, className?: string }) {
  return (
    <div className={`relative ${className}`}>
      {/* Corner brackets */}
      <div className="absolute top-0 left-0 w-4 h-4 border-l border-t border-[#C1FAF8]/30" />
      <div className="absolute top-0 right-0 w-4 h-4 border-r border-t border-[#C1FAF8]/30" />
      <div className="absolute bottom-0 left-0 w-4 h-4 border-l border-b border-[#C1FAF8]/30" />
      <div className="absolute bottom-0 right-0 w-4 h-4 border-r border-b border-[#C1FAF8]/30" />
      {children}
    </div>
  )
}

export default function MoonPhaseExplorer() {
  const [hoveredPhase, setHoveredPhase] = useState<number | null>(null)
  const [selectedPhase, setSelectedPhase] = useState<number | null>(0)
  const [failedPhaseImages, setFailedPhaseImages] = useState<Set<number>>(new Set())
  const orbitRef = useRef<SVGSVGElement>(null)
  const [dimensions, setDimensions] = useState({ width: 400, height: 400 })
  const diagramScale = 1.2

  const activePhaseIndex = hoveredPhase ?? selectedPhase
  const activePhase = activePhaseIndex !== null ? MOON_PHASES[activePhaseIndex] : null

  // Responsive sizing
  useEffect(() => {
    const updateDimensions = () => {
      const width = Math.min(window.innerWidth - 32, 500)
      setDimensions({ width, height: width })
    }

    updateDimensions()
    window.addEventListener('resize', updateDimensions)
    return () => window.removeEventListener('resize', updateDimensions)
  }, [])

  const orbitRadius = dimensions.width * 0.35
  const centerX = dimensions.width / 2
  const centerY = dimensions.height / 2

  const handlePhaseInteraction = useCallback((index: number, isHover: boolean) => {
    if (isHover) {
      setHoveredPhase(index)
    } else {
      setSelectedPhase(index)
    }
  }, [])

  return (
    <section className="relative min-h-screen bg-[#151829] text-[#E8EDF7]">
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
          <h2 className="text-3xl tracking-wider text-white md:text-4xl">月相</h2>
          <span className="pb-1 text-sm tracking-widest text-[#C1FAF8]/50">
            Moon Phase
          </span>
        </div>
        <div className="h-px bg-gradient-to-r from-[#F1D088]/60 via-[#C1FAF8]/30 to-transparent" />
        <p className="mt-3 max-w-2xl text-sm text-white/40">
          通过透视光线投射理解月相变化
        </p>
      </div>

      {/* Main Content */}
      <main className="w-full max-w-7xl mx-auto lg:px-6 pt-4 pb-8 flex flex-col lg:flex-row items-center justify-between gap-10 lg:gap-16 lg:min-h-[calc(100vh-220px)]">
        {/* Section 1: Orbital Diagram */}
        <section className="flex flex-col items-center lg:flex-1 lg:justify-center lg:-translate-x-8">
          <div
            className="relative"
            style={{
              width: dimensions.width * diagramScale,
              height: dimensions.height * diagramScale,
            }}
          >
            <div
              className="relative"
              style={{
                width: dimensions.width,
                height: dimensions.height,
                transform: `scale(${diagramScale})`,
                transformOrigin: "top left",
              }}
            >
              <svg
                ref={orbitRef}
                width={dimensions.width}
                height={dimensions.height}
                viewBox={`0 0 ${dimensions.width} ${dimensions.height}`}
                className="overflow-visible"
              >
                <defs>
                  {/* Glow filters */}
                  <filter id="goldGlow" x="-50%" y="-50%" width="200%" height="200%">
                    <feGaussianBlur stdDeviation="4" result="coloredBlur" />
                    <feMerge>
                      <feMergeNode in="coloredBlur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                  <filter id="rayGlow" x="-50%" y="-50%" width="200%" height="200%">
                    <feGaussianBlur stdDeviation="2" result="coloredBlur" />
                    <feMerge>
                      <feMergeNode in="coloredBlur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>

                  {/* Gradient for FOV cone */}
                  <linearGradient id="fovGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="rgba(193, 250, 248, 0.15)" />
                    <stop offset="100%" stopColor="rgba(193, 250, 248, 0)" />
                  </linearGradient>
                </defs>

                {/* Orbit path */}
                <circle
                  cx={centerX}
                  cy={centerY}
                  r={orbitRadius}
                  fill="none"
                  stroke="rgba(193, 250, 248, 0.2)"
                  strokeWidth="1"
                />

                {/* Sun direction indicator (moved to top, pointing downward) */}
                <g transform={`translate(${centerX - 12}, -50)`}>
                  <Sun
                    size={24}
                    className="text-[#F1D088]"
                    style={{ filter: 'drop-shadow(0 0 8px rgba(241, 208, 136, 0.6))' }}
                  />
                </g>
                <text
                  x={centerX}
                  y={0}
                  className="font-sans text-sm fill-[#F1D088]/70"
                  textAnchor="middle"
                >
                  太阳 ↓
                </text>

                {/* Sun rays indicator (downward) */}
                {[...Array(5)].map((_, i) => (
                  <line
                    key={i}
                    x1={centerX - 40 + i * 20}
                    y1={-10}
                    x2={centerX - 40 + i * 20}
                    y2={30}
                    stroke="#F1D088"
                    strokeWidth="2"
                    opacity={0.3}
                    strokeDasharray="2 4"
                  />
                ))}

                {/* FOV Cone when hovering */}
                <AnimatePresence>
                  {activePhase && activePhaseIndex !== null && (
                    <motion.g
                      key={`fov-${activePhaseIndex}`}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      {(() => {
                        const moonPos = getOrbitPosition(activePhase.angle, orbitRadius, centerX, centerY)
                        const dx = moonPos.x - centerX
                        const dy = moonPos.y - centerY
                        const angle = Math.atan2(dy, dx)
                        const spreadAngle = 0.3 // FOV spread in radians

                        const fovRadius = orbitRadius * 1.3
                        const point1 = {
                          x: centerX + fovRadius * Math.cos(angle - spreadAngle),
                          y: centerY + fovRadius * Math.sin(angle - spreadAngle)
                        }
                        const point2 = {
                          x: centerX + fovRadius * Math.cos(angle + spreadAngle),
                          y: centerY + fovRadius * Math.sin(angle + spreadAngle)
                        }

                        return (
                          <path
                            d={`M ${centerX} ${centerY} L ${point1.x} ${point1.y} L ${point2.x} ${point2.y} Z`}
                            fill="url(#fovGradient)"
                          />
                        )
                      })()}
                    </motion.g>
                  )}
                </AnimatePresence>

                {/* Ray line from Earth to Moon */}
                <AnimatePresence>
                  {activePhase && activePhaseIndex !== null && (
                    <motion.line
                      key={`ray-${activePhaseIndex}`}
                      initial={{ pathLength: 0, opacity: 0 }}
                      animate={{ pathLength: 1, opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      x1={centerX}
                      y1={centerY}
                      x2={getOrbitPosition(activePhase.angle, orbitRadius, centerX, centerY).x}
                      y2={getOrbitPosition(activePhase.angle, orbitRadius, centerX, centerY).y}
                      stroke="#C1FAF8"
                      strokeWidth="1.5"
                      strokeDasharray="6 4"
                      filter="url(#rayGlow)"
                    />
                  )}
                </AnimatePresence>

                {/* Earth at center */}
                <g transform={`translate(${centerX}, ${centerY})`}>
                  <circle
                    r="20"
                    fill="#1a3a5c"
                    stroke="#C1FAF8"
                    strokeWidth="1"
                  />
                  <circle r="18" fill="#1a4a6c" />
                  {/* Simple Earth features */}
                  <ellipse cx="-5" cy="-3" rx="8" ry="6" fill="#2a5a3c" opacity="0.7" />
                  <ellipse cx="5" cy="5" rx="6" ry="4" fill="#2a5a3c" opacity="0.7" />
                  <text
                    y="35"
                    className="font-sans text-sm fill-[#C1FAF8]/70"
                    textAnchor="middle"
                  >
                    地球
                  </text>
                </g>

                {/* Moon position nodes */}
                {MOON_PHASES.map((phase, index) => {
                  const pos = getOrbitPosition(phase.angle, orbitRadius, centerX, centerY)
                  const isActive = activePhaseIndex === index

                  return (
                    <g
                      key={phase.id}
                      transform={`translate(${pos.x}, ${pos.y})`}
                      className="cursor-pointer"
                      onMouseEnter={() => handlePhaseInteraction(index, true)}
                      onMouseLeave={() => setHoveredPhase(null)}
                      onClick={() => handlePhaseInteraction(index, false)}
                    >
                      <motion.circle
                        r={isActive ? 14 : 10}
                        fill={isActive ? "#F1D088" : "#2a2f45"}
                        stroke={isActive ? "#F1D088" : "#C1FAF8"}
                        strokeWidth={isActive ? 2 : 1}
                        animate={{
                          r: isActive ? 14 : 10,
                          fill: isActive ? "#F1D088" : "#2a2f45",
                        }}
                        transition={{ duration: 0.2 }}
                        style={{
                          filter: isActive ? 'drop-shadow(0 0 10px rgba(241, 208, 136, 0.8))' : 'none'
                        }}
                      />
                      {/* Illumination indicator on node */}
                      <motion.circle
                        r={isActive ? 8 : 6}
                        fill={phase.illumination > 0.5 ? "#e8e8e8" : "#4a5070"}
                        opacity={0.3 + phase.illumination * 0.5}
                        animate={{ r: isActive ? 8 : 6 }}
                        transition={{ duration: 0.2 }}
                      />
                    </g>
                  )
                })}
              </svg>

              {/* Phase labels around orbit */}
              {MOON_PHASES.map((phase, index) => {
                // Slight left shift to visually center labels with the orbit
                const labelShiftX = -14
                // Adjust label distance based on position to avoid overlap
                const labelDistance = orbitRadius + 40
                const pos = getOrbitPosition(phase.angle, labelDistance, centerX, centerY)
                const isActive = activePhaseIndex === index

                // Calculate text anchor based on angle for better positioning
                let textAlign: 'left' | 'center' | 'right' = 'center'
                let offsetX = '-50%'
                let offsetY = '-50%'

                // Adjust positioning based on quadrant
                if (phase.angle === 0) { // Top
                  offsetY = '-100%'
                } else if (phase.angle === 180) { // Bottom
                  offsetY = '0%'
                } else if (phase.angle > 0 && phase.angle < 180) { // Right side
                  textAlign = 'left'
                  offsetX = '0%'
                } else { // Left side
                  textAlign = 'right'
                  offsetX = '-100%'
                }

                return (
                  <motion.div
                    key={`label-${phase.id}`}
                    className="absolute font-sans text-sm pointer-events-none whitespace-nowrap"
                    style={{
                      left: pos.x + labelShiftX,
                      top: pos.y,
                      transform: `translate(${offsetX}, ${offsetY})`,
                      textAlign,
                    }}
                    animate={{
                      color: isActive ? '#F1D088' : 'rgba(193, 250, 248, 0.5)',
                      scale: isActive ? 1.1 : 1,
                    }}
                    transition={{ duration: 0.2 }}
                  >
                    {phase.name}
                  </motion.div>
                )
              })}
            </div>
          </div>

          {/* Instructions */}
          <p className="text-center text-base text-[#C1FAF8]/50 mt-4 font-sans">
            悬停或点击轨道上的月球节点以探索不同月相
          </p>
        </section>

        {/* Section 3: Observer Panel */}
        <section className="w-full lg:flex-1 lg:max-w-xl flex flex-col gap-4 lg:translate-x-8">
          <TechBracket className="p-8 bg-[rgba(193,250,248,0.03)] backdrop-blur-sm">
            <div className="flex flex-col md:flex-row gap-6 items-center">
              {/* Left: Moon Phase Visual */}
              <div className="flex flex-col items-center justify-center">
                <p className="font-sans text-sm text-[#C1FAF8]/60 mb-3">当前视角</p>
                <AnimatePresence mode="wait">
                  {activePhase && (
                    <motion.div
                      key={activePhaseIndex}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      transition={{ duration: 0.3 }}
                    >
                      {failedPhaseImages.has(activePhase.id) ? (
                        <MoonPhaseVisual
                          illumination={activePhase.illumination}
                          angle={activePhase.angle}
                          size={160}
                        />
                      ) : (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={PHASE_IMAGE_MAP[activePhase.id]}
                          alt={activePhase.name}
                          width={160}
                          height={160}
                          className="rounded-full object-cover drop-shadow-lg"
                          onError={() => {
                            setFailedPhaseImages((prev) => new Set(prev).add(activePhase.id))
                          }}
                        />
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
                <AnimatePresence mode="wait">
                  {activePhase && (
                    <motion.div
                      key={`name-${activePhaseIndex}`}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="mt-4 text-center"
                    >
                      <h3 className="font-sans text-2xl text-[#F1D088]">{activePhase.name}</h3>
                      <p className="font-sans text-sm text-[#C1FAF8]/60 mt-1">{activePhase.nameEn}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Right: Info */}
              <div className="flex-1 flex flex-col justify-center">
                {/* Phase Info */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="font-sans text-sm text-[#C1FAF8]/60">相位</span>
                    <span className="font-sans text-base text-[#F1D088]">
                      {activePhase ? `${Math.round(activePhase.illumination * 100)}%` : '—'}
                    </span>
                  </div>
                  <div className="h-1 bg-[#2a2f45] rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-[#F1D088]"
                      animate={{ width: activePhase ? `${activePhase.illumination * 100}%` : '0%' }}
                      transition={{ duration: 0.3 }}
                      style={{ boxShadow: '0 0 8px rgba(241, 208, 136, 0.6)' }}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="font-sans text-sm text-[#C1FAF8]/60">轨道位置</span>
                    <span className="font-sans text-base text-[#C1FAF8]">
                      {activePhase ? `${activePhase.angle}°` : '—'}
                    </span>
                  </div>

                  <AnimatePresence mode="wait">
                    {activePhase && (
                      <motion.p
                        key={`desc-${activePhaseIndex}`}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="font-sans text-sm text-[#D7DEEE] pt-3 border-t border-[#C1FAF8]/10"
                      >
                        {activePhase.description}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </TechBracket>

          {/* Legend */}
          <div className="mt-6 p-4 border border-[#C1FAF8]/10 rounded">
            <h4 className="font-sans text-sm text-[#C1FAF8]/60 mb-3">图例</h4>
            <div className="grid grid-cols-2 gap-3 text-sm font-sans">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-[#F1D088]" style={{ boxShadow: '0 0 6px rgba(241, 208, 136, 0.6)' }} />
                <span className="text-[#D7DEEE]">选中的月相</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-0.5 bg-[#C1FAF8]" style={{ boxShadow: '0 0 4px rgba(193, 250, 248, 0.6)' }} />
                <span className="text-[#D7DEEE]">视线光线</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full border border-[#C1FAF8]/50" />
                <span className="text-[#D7DEEE]">轨道节点</span>
              </div>
              <div className="flex items-center gap-2">
                <Sun size={12} className="text-[#F1D088]" />
                <span className="text-[#D7DEEE]">太阳方向</span>
              </div>
            </div>
          </div>
        </section>
      </main>

      <div className="fixed bottom-8 left-12 z-50 max-md:bottom-6 max-md:left-4">
        <SectionNavButton
          direction="prev"
          section={{ label: "地月系", href: "/orbit" }}
        />
      </div>
      <div className="fixed bottom-8 right-12 z-50 max-md:bottom-6 max-md:right-4">
        <SectionNavButton
          direction="next"
          section={{ label: "月球表面形态", href: "/geology-map" }}
        />
      </div>
    </section>
  )
}
