"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { useRouter } from "next/navigation";

// 四大类别颜色
const COLORS = {
  overview: "#F1D088",    // 月球概览 - 金色
  environment: "#C1FAF8", // 月球环境 - 青色
  geology: "#E4B8FF",     // 月球地质 - 淡紫色
  exploration: "#A8E0A0", // 探月活动 - 淡绿
};

type CategoryType = keyof typeof COLORS;

interface Node {
  id: string;
  title: string;
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  href: string;
  category: CategoryType;
}

interface Connection {
  from: string;
  to: string;
}

const NODES_DATA: Omit<Node, "x" | "y" | "vx" | "vy">[] = [
  // 月球概览 (5个)
  { id: "1", title: "月球的外观", radius: 36, href: "/about-moon", category: "overview" },
  { id: "2", title: "月球的起源与演化", radius: 32, href: "/origin", category: "overview" },
  { id: "3", title: "月球的内部构造", radius: 34, href: "/lunar-interior", category: "overview" },
  { id: "4", title: "地月系", radius: 32, href: "/orbit", category: "overview" },
  { id: "5", title: "月相", radius: 38, href: "/phases", category: "overview" },
  // 月球环境 (1个)
  { id: "6", title: "月球表面形态", radius: 36, href: "/geology-map", category: "environment" },
  // 月球地质 (1个)
  { id: "7", title: "月球化学元素", radius: 34, href: "/chapters/chemical-elements", category: "geology" },
  // 探月活动 (2个)
  { id: "8", title: "人类观月史", radius: 35, href: "/human-observing-moon", category: "exploration" },
  { id: "9", title: "人类探月活动", radius: 38, href: "/mission-sites", category: "exploration" },
];

const CONNECTIONS: Connection[] = [
  // 月球概览内部关联
  { from: "1", to: "2" },
  { from: "1", to: "3" },
  { from: "2", to: "3" },
  { from: "3", to: "4" },
  { from: "4", to: "1" },
  { from: "5", to: "4" },
  { from: "5", to: "1" },
  // 跨类别关联
  { from: "1", to: "6" },  // 外观 -> 表面形态
  { from: "3", to: "7" },  // 内部构造 -> 化学元素
  { from: "6", to: "7" },  // 表面形态 -> 化学元素
  { from: "2", to: "7" },  // 起源演化 -> 化学元素
  { from: "1", to: "8" },  // 外观 -> 观月史
  { from: "4", to: "8" },  // 地月系 -> 观月史
  { from: "5", to: "8" },  // 月相 -> 观月史
  { from: "8", to: "9" },  // 观月史 -> 探月活动
  { from: "6", to: "9" },  // 表面形态 -> 探月活动
  { from: "7", to: "9" },  // 化学元素 -> 探月活动
];

export default function KnowledgeGraph() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const labelsRef = useRef<(HTMLDivElement | null)[]>([]);
  const nodesRef = useRef<Node[]>([]);
  const mouseRef = useRef({ x: 0, y: 0 });
  const hoveredNodeRef = useRef<Node | null>(null);
  const animationRef = useRef<number>(0);
  const [hoveredNode, setHoveredNode] = useState<Node | null>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [isReady, setIsReady] = useState(false);
  const router = useRouter();

  // Get color for a node
  const getNodeColor = useCallback((category: CategoryType) => COLORS[category], []);

  // Initialize nodes with positions
  const initializeNodes = useCallback((width: number, height: number) => {
    const centerX = width / 2;
    const centerY = height / 2;
    const radius = Math.min(width, height) * 0.28;

    nodesRef.current = NODES_DATA.map((node, index) => {
      const angle = (index / NODES_DATA.length) * Math.PI * 2 - Math.PI / 2;
      const r = radius * (0.8 + Math.random() * 0.2);
      return {
        ...node,
        x: centerX + Math.cos(angle) * r,
        y: centerY + Math.sin(angle) * r,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
      };
    });
    setIsReady(true);
  }, []);

  // Handle resize
  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        const { width, height } = containerRef.current.getBoundingClientRect();
        setDimensions({ width, height });
        initializeNodes(width, height);
      }
    };

    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, [initializeNodes]);

  // Mouse tracking
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (canvasRef.current) {
        const rect = canvasRef.current.getBoundingClientRect();
        mouseRef.current = {
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        };
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Handle click
  const handleClick = useCallback(() => {
    if (hoveredNodeRef.current) {
      router.push(hoveredNodeRef.current.href);
    }
  }, [router]);

  // Animation loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || dimensions.width === 0 || !isReady) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    canvas.width = dimensions.width * dpr;
    canvas.height = dimensions.height * dpr;
    ctx.scale(dpr, dpr);

    const particles: { x: number; y: number; vx: number; vy: number; life: number; maxLife: number }[] = [];

    // Create background particles
    for (let i = 0; i < 80; i++) {
      particles.push({
        x: Math.random() * dimensions.width,
        y: Math.random() * dimensions.height,
        vx: (Math.random() - 0.5) * 0.2,
        vy: (Math.random() - 0.5) * 0.2,
        life: Math.random() * 100,
        maxLife: 100 + Math.random() * 100,
      });
    }

    let lastHoveredId: string | null = null;

    const animate = () => {
      ctx.fillStyle = "#151829";
      ctx.fillRect(0, 0, dimensions.width, dimensions.height);

      // Draw and update particles
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.life++;

        if (p.life > p.maxLife) {
          p.life = 0;
          p.x = Math.random() * dimensions.width;
          p.y = Math.random() * dimensions.height;
        }

        // Wrap around screen
        if (p.x < 0) p.x = dimensions.width;
        if (p.x > dimensions.width) p.x = 0;
        if (p.y < 0) p.y = dimensions.height;
        if (p.y > dimensions.height) p.y = 0;

        const alpha = Math.sin((p.life / p.maxLife) * Math.PI) * 0.4;
        ctx.beginPath();
        ctx.arc(p.x, p.y, 1.2, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(193, 250, 248, ${alpha})`;
        ctx.fill();
      });

      const nodes = nodesRef.current;
      const mouse = mouseRef.current;
      const centerX = dimensions.width / 2;
      const centerY = dimensions.height / 2;

      // Update node positions with physics
      nodes.forEach((node) => {
        // Attraction to center
        const dxCenter = centerX - node.x;
        const dyCenter = centerY - node.y;
        const distCenter = Math.sqrt(dxCenter * dxCenter + dyCenter * dyCenter);
        if (distCenter > 50) {
          node.vx += (dxCenter / distCenter) * 0.015;
          node.vy += (dyCenter / distCenter) * 0.015;
        }

        // Mouse influence - gentle repulsion
        const dxMouse = node.x - mouse.x;
        const dyMouse = node.y - mouse.y;
        const distMouse = Math.sqrt(dxMouse * dxMouse + dyMouse * dyMouse);
        if (distMouse < 80 && distMouse > 0) {
          const force = (80 - distMouse) / 80;
          node.vx += (dxMouse / distMouse) * force * 0.08;
          node.vy += (dyMouse / distMouse) * force * 0.08;
        }

        // Repulsion between nodes
        nodes.forEach((other) => {
          if (node.id !== other.id) {
            const dx = node.x - other.x;
            const dy = node.y - other.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            const minDist = node.radius + other.radius + 80;
            if (dist < minDist && dist > 0) {
              const force = (minDist - dist) / minDist;
              node.vx += (dx / dist) * force * 0.3;
              node.vy += (dy / dist) * force * 0.3;
            }
          }
        });

        // Apply velocity with stronger damping to keep nodes stable
        node.vx *= 0.92;
        node.vy *= 0.92;
        node.x += node.vx;
        node.y += node.vy;

        // Boundary constraints with padding for header/footer
        const marginX = node.radius + 40;
        const marginTop = node.radius + 180;
        const marginBottom = node.radius + 100;
        if (node.x < marginX) node.x = marginX;
        if (node.x > dimensions.width - marginX) node.x = dimensions.width - marginX;
        if (node.y < marginTop) node.y = marginTop;
        if (node.y > dimensions.height - marginBottom) node.y = dimensions.height - marginBottom;
      });

      // Find hovered node
      let currentHovered: Node | null = null;
      let minDist = Infinity;
      for (const node of nodes) {
        const dx = mouse.x - node.x;
        const dy = mouse.y - node.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < node.radius + 25 && dist < minDist) {
          minDist = dist;
          currentHovered = node;
        }
      }
      hoveredNodeRef.current = currentHovered;
      const hoveredId = currentHovered ? currentHovered.id : null;

      // Only update state when hovered node changes
      if (hoveredId !== lastHoveredId) {
        lastHoveredId = hoveredId;
        setHoveredNode(currentHovered);
      }

      // Update label positions directly via DOM (bypass React state)
      nodes.forEach((node, index) => {
        const label = labelsRef.current[index];
        if (label) {
          label.style.left = `${node.x}px`;
          label.style.top = `${node.y + node.radius + 12}px`;
        }
      });

      // Draw connections
      CONNECTIONS.forEach((conn) => {
        const fromNode = nodes.find((n) => n.id === conn.from);
        const toNode = nodes.find((n) => n.id === conn.to);
        if (fromNode && toNode) {
          const isHighlighted =
            currentHovered &&
            (currentHovered.id === fromNode.id || currentHovered.id === toNode.id);

          const gradient = ctx.createLinearGradient(
            fromNode.x,
            fromNode.y,
            toNode.x,
            toNode.y
          );

          const fromColor = COLORS[fromNode.category];
          const toColor = COLORS[toNode.category];

          if (isHighlighted) {
            gradient.addColorStop(0, `${fromColor}90`);
            gradient.addColorStop(1, `${toColor}90`);
            ctx.lineWidth = 2.5;
          } else {
            gradient.addColorStop(0, `${fromColor}25`);
            gradient.addColorStop(1, `${toColor}25`);
            ctx.lineWidth = 1;
          }

          ctx.beginPath();
          ctx.moveTo(fromNode.x, fromNode.y);
          ctx.lineTo(toNode.x, toNode.y);
          ctx.strokeStyle = gradient;
          ctx.stroke();
        }
      });

      // Draw nodes
      nodes.forEach((node) => {
        const isHovered = hoveredId === node.id;
        const isConnected =
          hoveredId &&
          CONNECTIONS.some(
            (c) =>
              (c.from === hoveredId && c.to === node.id) ||
              (c.to === hoveredId && c.from === node.id)
          );
        const baseColor = COLORS[node.category];

        // Glow effect
        if (isHovered || isConnected) {
          const glowRadius = isHovered ? node.radius * 2.8 : node.radius * 2;
          const gradient = ctx.createRadialGradient(
            node.x,
            node.y,
            0,
            node.x,
            node.y,
            glowRadius
          );
          gradient.addColorStop(0, `${baseColor}50`);
          gradient.addColorStop(0.4, `${baseColor}25`);
          gradient.addColorStop(1, `${baseColor}00`);
          ctx.beginPath();
          ctx.arc(node.x, node.y, glowRadius, 0, Math.PI * 2);
          ctx.fillStyle = gradient;
          ctx.fill();
        }

        // Node circle
        const nodeRadius = isHovered ? node.radius * 1.12 : node.radius;

        // Outer ring
        ctx.beginPath();
        ctx.arc(node.x, node.y, nodeRadius + 4, 0, Math.PI * 2);
        ctx.strokeStyle = isHovered ? baseColor : `${baseColor}50`;
        ctx.lineWidth = isHovered ? 2 : 1;
        ctx.stroke();

        // Inner fill
        const fillGradient = ctx.createRadialGradient(
          node.x - nodeRadius * 0.3,
          node.y - nodeRadius * 0.3,
          0,
          node.x,
          node.y,
          nodeRadius
        );
        fillGradient.addColorStop(0, `${baseColor}35`);
        fillGradient.addColorStop(1, `${baseColor}12`);

        ctx.beginPath();
        ctx.arc(node.x, node.y, nodeRadius, 0, Math.PI * 2);
        ctx.fillStyle = fillGradient;
        ctx.fill();
        ctx.strokeStyle = `${baseColor}70`;
        ctx.lineWidth = 1.5;
        ctx.stroke();

        // Center dot
        ctx.beginPath();
        ctx.arc(node.x, node.y, 4, 0, Math.PI * 2);
        ctx.fillStyle = baseColor;
        ctx.fill();
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationRef.current);
    };
  }, [dimensions, isReady]);

  return (
    <div ref={containerRef} className="relative w-full h-full min-h-screen">
      <canvas
        ref={canvasRef}
        onClick={handleClick}
        className="absolute inset-0 cursor-pointer"
        style={{ width: dimensions.width, height: dimensions.height }}
      />

      {/* Node labels - positioned via ref for performance */}
      {isReady && NODES_DATA.map((nodeData, index) => {
        const node = nodesRef.current[index];
        if (!node) return null;

        const isHovered = hoveredNode?.id === node.id;
        const isConnected =
          hoveredNode &&
          CONNECTIONS.some(
            (c) =>
              (c.from === hoveredNode.id && c.to === node.id) ||
              (c.to === hoveredNode.id && c.from === node.id)
          );
        const shouldHighlight = isHovered || isConnected;
        const shouldShow = shouldHighlight || !hoveredNode;
        const baseColor = COLORS[node.category];

        return (
          <div
            key={node.id}
            ref={(el) => { labelsRef.current[index] = el; }}
            className="absolute pointer-events-none transition-opacity duration-300 transform -translate-x-1/2"
            style={{
              left: node.x,
              top: node.y + node.radius + 12,
              opacity: shouldShow ? 1 : 0.25,
              zIndex: isHovered ? 10 : 1,
            }}
          >
            <span
              className="text-sm font-medium whitespace-nowrap px-3 py-1.5 rounded-full backdrop-blur-sm transition-all duration-300"
              style={{
                color: shouldHighlight ? baseColor : "#e0e0e0",
                backgroundColor: shouldHighlight ? `${baseColor}18` : "rgba(21, 24, 41, 0.85)",
                border: `1px solid ${shouldHighlight ? `${baseColor}80` : "rgba(255,255,255,0.08)"}`,
                textShadow: shouldHighlight ? `0 0 15px ${baseColor}` : "none",
                transform: isHovered ? "scale(1.08)" : "scale(1)",
              }}
            >
              {node.title}
            </span>
          </div>
        );
      })}

      {/* Tooltip for hovered node */}
      {hoveredNode && (
        <div
          className="fixed pointer-events-none z-50 transition-opacity duration-150"
          style={{
            left: mouseRef.current.x + 25,
            top: mouseRef.current.y - 15,
            opacity: 1,
          }}
        >
          <div
            className="px-4 py-2.5 rounded-xl backdrop-blur-md border"
            style={{
              backgroundColor: "rgba(21, 24, 41, 0.96)",
              borderColor: COLORS[hoveredNode.category],
              boxShadow: `0 0 35px ${COLORS[hoveredNode.category]}50, 0 4px 20px rgba(0,0,0,0.4)`,
            }}
          >
            <p
              className="text-base font-semibold"
              style={{ color: COLORS[hoveredNode.category] }}
            >
              {hoveredNode.title}
            </p>
            <p className="text-xs text-gray-400 mt-1">{"点击进入章节 →"}</p>
          </div>
        </div>
      )}
    </div>
  );
}
