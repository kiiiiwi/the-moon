/* eslint-disable @typescript-eslint/no-explicit-any, @typescript-eslint/no-empty-object-type */
"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import * as d3 from "d3";
import { sankey as d3Sankey, sankeyLinkHorizontal } from "d3-sankey";

interface SankeyData {
  nodes: { name: string; category: string }[];
  links: { source: number; target: number; value: number; missions?: string[] }[];
}

const buildSankeyData = (): SankeyData => {
  const nodes: { name: string; category: string }[] = [
    { name: "China", category: "country" },        // 0
    { name: "Europe", category: "country" },       // 1
    { name: "India", category: "country" },        // 2
    { name: "Japan", category: "country" },        // 3
    { name: "South Korea", category: "country" },  // 4
    { name: "USA", category: "country" },          // 5
    { name: "USSR", category: "country" },         // 6
    { name: "Luna", category: "program" },         // 7
    { name: "Pioneer", category: "program" },      // 8
    { name: "Ranger", category: "program" },       // 9
    { name: "Zond", category: "program" },         // 10
    { name: "Surveyor", category: "program" },     // 11
    { name: "Lunar Orbiter", category: "program" },// 12
    { name: "Apollo", category: "program" },       // 13
    { name: "Chang'e", category: "program" },      // 14
    { name: "Chandrayaan", category: "program" },  // 15
    { name: "ARTEMIS", category: "program" },      // 16
    { name: "Others", category: "program" },       // 17
    { name: "Commercial", category: "program" },   // 18
    { name: "Flyby", category: "type" },           // 19
    { name: "Impactor", category: "type" },        // 20
    { name: "Orbiter", category: "type" },         // 21
    { name: "Lander", category: "type" },          // 22
    { name: "Rover", category: "type" },           // 23
    { name: "Sample Return", category: "type" },   // 24
  ];

  const links: SankeyData["links"] = [
    // USSR -> programs
    { source: 6, target: 7, value: 17, missions: ["Luna 1", "Luna 2", "Luna 3", "Luna 9", "Luna 10", "Luna 11", "Luna 12", "Luna 13", "Luna 14", "Luna 15", "Luna 16", "Luna 17", "Luna 19", "Luna 20", "Luna 21", "Luna 22", "Luna 24"] },
    { source: 6, target: 10, value: 5, missions: ["Zond 3", "Zond 5", "Zond 6", "Zond 7", "Zond 8"] },
    // USA -> programs
    { source: 5, target: 8, value: 1, missions: ["Pioneer 4"] },
    { source: 5, target: 9, value: 3, missions: ["Ranger 7", "Ranger 8", "Ranger 9"] },
    { source: 5, target: 11, value: 5, missions: ["Surveyor 1", "Surveyor 3", "Surveyor 5", "Surveyor 6", "Surveyor 7"] },
    { source: 5, target: 12, value: 5, missions: ["Lunar Orbiter 1", "Lunar Orbiter 2", "Lunar Orbiter 3", "Lunar Orbiter 4", "Lunar Orbiter 5"] },
    { source: 5, target: 13, value: 9, missions: ["Apollo 8", "Apollo 10", "Apollo 11", "Apollo 12", "Apollo 14", "Apollo 15", "Apollo 16", "Apollo 17"] },
    { source: 5, target: 16, value: 2, missions: ["ARTEMIS-THEMIS", "Artemis I"] },
    { source: 5, target: 17, value: 6, missions: ["Clementine", "Lunar Prospector", "LRO", "LCROSS", "GRAIL", "LADEE"] },
    { source: 5, target: 18, value: 3, missions: ["IM-1", "Blue Ghost 1", "IM-2"] },
    // China -> programs
    { source: 0, target: 14, value: 8, missions: ["Chang'e 1", "Chang'e 2", "Chang'e 3", "Chang'e 5-Test Vehicle", "Queqiao", "Chang'e 4", "Chang'e 5", "Chang'e 6"] },
    // India -> programs
    { source: 2, target: 15, value: 3, missions: ["Chandrayaan-1", "Chandrayaan-2", "Chandrayaan-3"] },
    // Japan -> programs
    { source: 3, target: 17, value: 3, missions: ["Hiten", "SELENE (Kaguya)", "SLIM"] },
    // Europe -> programs
    { source: 1, target: 17, value: 1, missions: ["SMART-1"] },
    // South Korea -> programs
    { source: 4, target: 17, value: 1, missions: ["Danuri"] },

    // Programs -> Mission Types
    { source: 7, target: 19, value: 2, missions: ["Luna 1", "Luna 3"] },
    { source: 7, target: 20, value: 1, missions: ["Luna 2"] },
    { source: 7, target: 21, value: 9, missions: ["Luna 10", "Luna 11", "Luna 12", "Luna 14", "Luna 15", "Luna 19", "Luna 20", "Luna 21", "Luna 22"] },
    { source: 7, target: 22, value: 3, missions: ["Luna 9", "Luna 13", "Luna 17 (with Lunokhod 1)"] },
    { source: 7, target: 23, value: 2, missions: ["Luna 17 (with Lunokhod 1)", "Luna 21 (with Lunokhod 2)"] },
    { source: 7, target: 24, value: 3, missions: ["Luna 16", "Luna 20", "Luna 24"] },
    { source: 8, target: 19, value: 1, missions: ["Pioneer 4"] },
    { source: 9, target: 20, value: 3, missions: ["Ranger 7", "Ranger 8", "Ranger 9"] },
    { source: 10, target: 19, value: 5, missions: ["Zond 3", "Zond 5", "Zond 6", "Zond 7", "Zond 8"] },
    { source: 11, target: 22, value: 5, missions: ["Surveyor 1", "Surveyor 3", "Surveyor 5", "Surveyor 6", "Surveyor 7"] },
    { source: 12, target: 21, value: 5, missions: ["Lunar Orbiter 1", "Lunar Orbiter 2", "Lunar Orbiter 3", "Lunar Orbiter 4", "Lunar Orbiter 5"] },
    { source: 13, target: 21, value: 8, missions: ["Apollo 8", "Apollo 10", "Apollo 11", "Apollo 12", "Apollo 14", "Apollo 15", "Apollo 16", "Apollo 17"] },
    { source: 13, target: 24, value: 6, missions: ["Apollo 11", "Apollo 12", "Apollo 14", "Apollo 15", "Apollo 16", "Apollo 17"] },
    { source: 14, target: 19, value: 1, missions: ["Chang'e 5-Test Vehicle"] },
    { source: 14, target: 20, value: 1, missions: ["Chang'e 1"] },
    { source: 14, target: 21, value: 3, missions: ["Chang'e 1", "Chang'e 2", "Queqiao"] },
    { source: 14, target: 22, value: 2, missions: ["Chang'e 3", "Chang'e 4 and Yutu 2"] },
    { source: 14, target: 23, value: 1, missions: ["Chang'e 4 and Yutu 2"] },
    { source: 14, target: 24, value: 2, missions: ["Chang'e 5", "Chang'e 6"] },
    { source: 15, target: 21, value: 1, missions: ["Chandrayaan-1", "Chandrayaan-2"] },
    { source: 15, target: 22, value: 1, missions: ["Chandrayaan-3"] },
    { source: 15, target: 23, value: 1, missions: ["Chandrayaan-3"] },
    { source: 16, target: 19, value: 1, missions: ["Artemis I"] },
    { source: 16, target: 21, value: 1, missions: ["ARTEMIS-THEMIS"] },
    { source: 17, target: 20, value: 5, missions: ["Hiten", "Lunar Prospector", "SMART-1", "SELENE (Kaguya)", "LCROSS"] },
    { source: 17, target: 21, value: 9, missions: ["Hiten", "Clementine", "Lunar Prospector", "SMART-1", "SELENE (Kaguya)", "LRO", "GRAIL", "LADEE", "Danuri"] },
    { source: 17, target: 22, value: 1, missions: ["SLIM"] },
    { source: 17, target: 23, value: 1, missions: ["SLIM"] },
    { source: 18, target: 22, value: 3, missions: ["IM-1", "Blue Ghost 1", "IM-2"] },
  ];

  return { nodes, links };
};

interface LunarSankeyProps {
  onHoverMissions: (missions: string[]) => void;
  highlightedNode?: string | null;
}

export function LunarSankey({ onHoverMissions, highlightedNode }: LunarSankeyProps) {
  void highlightedNode; // acknowledged unused prop
  const svgRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [tooltip, setTooltip] = useState<{ x: number; y: number; content: string } | null>(null);

  const drawSankey = useCallback(() => {
    if (!svgRef.current || !containerRef.current) return;

    const container = containerRef.current;
    const width = container.clientWidth;
    const height = Math.max(container.clientHeight, 500);

    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();
    svg.attr("width", width).attr("height", height);

    const data = buildSankeyData();

    const sankeyGenerator = d3Sankey<{ name: string; category: string }, {}>()
      .nodeId((node) => node.index ?? 0)
      .nodeWidth(18)
      .nodePadding(14)
      .nodeAlign((node) => {
        const cat = data.nodes[node.index!]?.category;
        if (cat === "country") return 0;
        if (cat === "program") return 1;
        return 2;
      })
      .extent([[40, 30], [width - 40, height - 30]]);

    const graph = sankeyGenerator({
      nodes: data.nodes.map(d => ({ ...d })),
      links: data.links.map(d => ({ ...d })),
     
    } as any);

    const colorMap: Record<string, string> = {
      USSR: "#D4A056",
      USA: "#3DC8E0",
      China: "#D98E6A",
      India: "#E8C170",
      Japan: "#B266FF",
      Europe: "#4D9DE0",
      "South Korea": "#A78BBA",
      Luna: "#C28B3A",
      Zond: "#E0B86C",
      Pioneer: "#9AD8D3",
      Apollo: "#2AB5CC",
      Surveyor: "#6DE0F0",
      Ranger: "#1A9BB0",
      "Lunar Orbiter": "#88ECF5",
      ARTEMIS: "#50D4E8",
      "Chang'e": "#CC7A52",
      Chandrayaan: "#F1D088",
      Others: "#B9A0CC",
      Commercial: "#82E0B8",
      Orbiter: "#C1FAF8",
      Lander: "#F1D088",
      Rover: "#17BECF",
      "Sample Return": "#E8A8C8",
      Flyby: "#A8E0A0",
      Impactor: "#C8B8E0",
    };

     
    const getNodeColor = (node: any) => {
      return colorMap[node.name] || "#F1D088";
    };

    const defs = svg.append("defs");

     
    const linkGradients = graph.links.map((link: any, i: number) => {
      const srcColor = colorMap[(link.source as any).name] || "#F1D088";
      const tgtColor = colorMap[(link.target as any).name] || "#C1FAF8";
      const gradientId = `link-grad-${i}`;
      const grad = defs.append("linearGradient")
        .attr("id", gradientId)
        .attr("gradientUnits", "userSpaceOnUse")
        .attr("x1", (link.source as any).x1)
        .attr("x2", (link.target as any).x0)
        .attr("y1", 0)
        .attr("y2", 0);
      grad.append("stop").attr("offset", "0%").attr("stop-color", srcColor);
      grad.append("stop").attr("offset", "100%").attr("stop-color", tgtColor);
      return gradientId;
    });

    const filter = defs.append("filter").attr("id", "glow");
    filter.append("feGaussianBlur").attr("stdDeviation", "3").attr("result", "coloredBlur");
    const feMerge = filter.append("feMerge");
    feMerge.append("feMergeNode").attr("in", "coloredBlur");
    feMerge.append("feMergeNode").attr("in", "SourceGraphic");

    const linkGroup = svg.append("g").attr("class", "links");

    linkGroup
      .selectAll("path")
      .data(graph.links)
      .join("path")
      .attr("d", sankeyLinkHorizontal())
      .attr("fill", "none")
       
      .attr("stroke", (_d: any, i: number) => `url(#${linkGradients[i]})`)
      .attr("stroke-opacity", 0.4)
       
      .attr("stroke-width", (d: any) => Math.max(1, d.width))
      .style("transition", "stroke-opacity 0.3s")
       
      .on("mouseenter", function (event: MouseEvent, d: any) {
        d3.select(this).attr("stroke-opacity", 0.8);
        const originalLink = data.links[graph.links.indexOf(d)];
        const missions = (d as any).missions || originalLink?.missions || [];
        onHoverMissions(missions);
        setTooltip({
          x: event.offsetX,
          y: event.offsetY,
          content: `${d.source.name} → ${d.target.name}\n${missions.join(", ")}`,
        });
      })
      .on("mouseleave", function () {
        d3.select(this).attr("stroke-opacity", 0.4);
        onHoverMissions([]);
        setTooltip(null);
      });

    const nodeGroup = svg.append("g").attr("class", "nodes");

    nodeGroup
      .selectAll("rect")
      .data(graph.nodes)
      .join("rect")
       
      .attr("x", (d: any) => d.x0)
       
      .attr("y", (d: any) => d.y0)
       
      .attr("width", (d: any) => d.x1 - d.x0)
       
      .attr("height", (d: any) => Math.max(1, d.y1 - d.y0))
       
      .attr("fill", (d: any) => getNodeColor(d))
      .attr("rx", 3)
      .attr("opacity", 0.9)
      .style("filter", "url(#glow)")
      .style("cursor", "pointer")
       
      .on("mouseenter", function (event: MouseEvent, d: any) {
        d3.select(this).attr("opacity", 1).style("filter", "url(#glow) drop-shadow(0 0 8px rgba(241,208,136,0.6))");
        const missions: string[] = [];
         
        graph.links.forEach((link: any, i: number) => {
          if (link.source === d || link.target === d) {
            const orig = data.links[i];
            if (orig?.missions) missions.push(...orig.missions);
          }
        });
        const unique = [...new Set(missions)];
        onHoverMissions(unique);
        setTooltip({
          x: event.offsetX,
          y: event.offsetY,
          content: `${d.name}\n${unique.length} 个相关任务`,
        });

         
        linkGroup.selectAll("path").attr("stroke-opacity", (l: any) =>
          l.source === d || l.target === d ? 0.8 : 0.1
        );
      })
      .on("mouseleave", function () {
        d3.select(this).attr("opacity", 0.9).style("filter", "url(#glow)");
        onHoverMissions([]);
        setTooltip(null);
        linkGroup.selectAll("path").attr("stroke-opacity", 0.4);
      });

    nodeGroup
      .selectAll("text")
      .data(graph.nodes)
      .join("text")
       
      .attr("x", (d: any) => (d.x0 < width / 2 ? d.x1 + 8 : d.x0 - 8))
       
      .attr("y", (d: any) => (d.y0 + d.y1) / 2)
      .attr("dy", "0.35em")
       
      .attr("text-anchor", (d: any) => (d.x0 < width / 2 ? "start" : "end"))
      .attr("fill", "rgba(241, 208, 136, 0.9)")
      .attr("font-size", "11px")
       
      .text((d: any) => d.name);
  }, [onHoverMissions]);

  useEffect(() => {
    drawSankey();
    const handleResize = () => drawSankey();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [drawSankey]);

  return (
    <div ref={containerRef} className="w-full h-full relative">
      <svg ref={svgRef} className="w-full h-full" />
      {tooltip && (
        <div
          className="absolute pointer-events-none px-3 py-2 rounded-lg text-xs whitespace-pre-line max-w-[280px]"
          style={{
            left: tooltip.x + 15,
            top: tooltip.y - 10,
            background: "rgba(15, 15, 30, 0.92)",
            border: "1px solid rgba(241, 208, 136, 0.3)",
            color: "#F1D088",
            backdropFilter: "blur(8px)",
            boxShadow: "0 0 20px rgba(193, 250, 248, 0.1)",
          }}
        >
          {tooltip.content}
        </div>
      )}
    </div>
  );
}
