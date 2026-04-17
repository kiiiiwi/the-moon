"use client";

import Link from "next/link";
import { useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, ZoomIn, ZoomOut, Maximize2, Navigation } from "lucide-react";
import { SectionNavButton } from "@/app/about-moon/SectionNavButton";
import { withBasePath } from "@/lib/base-path";

interface POI {
  id: string;
  name: string;
  nameEn: string;
  type: "mare" | "crater" | "mountain" | "landing";
  x: number;
  y: number;
  description: string;
  stats: { label: string; value: string }[];
  imageUrl: string;
}

const pois: POI[] = [
  {
    id: "mare-tranquillitatis",
    name: "静海",
    nameEn: "Mare Tranquillitatis",
    type: "mare",
    x: 38.5,
    y: 43.5,
    description:
      "静海位于月球正面东部，是最著名的月海之一。其表面以较平坦的玄武岩熔岩平原为主，适合着陆与巡视。1969年7月20日，阿波罗11号在静海西南部着陆，人类首次踏上月球，因此静海也是月球探测史上最具象征意义的地貌单元之一。",
    stats: [
      { label: "直径", value: "~876 km" },
      { label: "面积", value: "421,000 km²" },
      { label: "形成年代", value: "~38.5亿年前" },
    ],
    imageUrl: "/geology-map/Mare_Tranquillitatis_(LRO).png",
  },
  {
    id: "tycho",
    name: "第谷坑",
    nameEn: "Tycho Crater",
    type: "crater",
    x: 28,
    y: 79,
    description:
      "第谷坑位于月球南部高地，是最醒目的年轻辐射纹撞击坑之一。它的坑缘锐利、中央峰明显，向外发散的高反照率辐射纹横跨月球正面大范围区域，因此在满月附近尤为显眼。第谷坑因形成时间较晚、保存度高，是月球年轻撞击事件与表面风化研究的重要标志性地貌。",
    stats: [
      { label: "直径", value: "85.29 km" },
      { label: "深度", value: "4.7 km" },
      { label: "形成年代", value: "~8亿年前" },
    ],
    imageUrl: "/geology-map/Tycho_LRO.png",
  },
  {
    id: "mare-imbrium",
    name: "雨海",
    nameEn: "Mare Imbrium",
    type: "mare",
    x: 28,
    y: 26,
    description:
      "雨海是月球最宏伟的撞击盆地之一，也是最大的规则月海。它由一次极其巨大的早期撞击形成，随后大量玄武岩熔岩涌出并填平盆地，形成今天所见的广阔暗色平原。雨海周缘环绕着阿尔卑斯山、亚平宁山和高加索山等山脉，是月面大型盆地构造的典型代表。苏联月球17号和阿波罗15号都曾在其附近开展探测。",
    stats: [
      { label: "直径", value: "~1,145 km" },
      { label: "面积", value: "830,000 km²" },
      { label: "形成年代", value: "~39亿年前" },
    ],
    imageUrl: "/geology-map/Mare_Imbrium_(LRO).png",
  },
  {
    id: "copernicus",
    name: "哥白尼坑",
    nameEn: "Copernicus Crater",
    type: "crater",
    x: 26.2,
    y: 43.7,
    description:
      "哥白尼坑是月球正面最著名的年轻大型撞击坑之一，位于风暴洋东部、雨海南缘附近。其坑壁陡峭、内部具有明显阶地，中央峰群高耸，并伴随发育良好的辐射纹系统，是研究年轻撞击坑形态和喷出物分布的经典对象。由于保存状态新鲜，它常被用作月球撞击地貌教学的代表案例。",
    stats: [
      { label: "直径", value: "93 km" },
      { label: "深度", value: "3,760 m" },
      { label: "形成年代", value: "~8亿年前" },
    ],
    imageUrl: "/geology-map/Copernicus_(LRO).png",
  },
  {
    id: "mendeleev",
    name: "门捷列夫坑",
    nameEn: "Mendeleev Crater",
    type: "crater",
    x: 61,
    y: 45,
    description:
      "门捷列夫坑是月球背面一座尺度很大的古老撞击坑，直径约 313 千米，已接近小型撞击盆地的规模。其南缘跨越月球赤道，坑内地势相对平坦，但分布着多座后期形成的小撞击坑，内部构造十分复杂。门捷列夫坑西部内部还发育有著名的门捷列夫链坑（Catena Mendeleev），一般认为与远处齐奥尔科夫斯基坑形成时抛射出的次级撞击有关，因此它是研究月球大型古老撞击坑改造过程和次级坑链成因的典型案例。",
    stats: [
      { label: "直径", value: "~325 km" },
      { label: "深度", value: "~5.1 km" },
      { label: "形成年代", value: "~39亿年前" },
    ],
    imageUrl: "/geology-map/Crater Mendeleev.png",
  },
  {
    id: "mare-serenitatis",
    name: "澄海",
    nameEn: "Mare Serenitatis",
    type: "mare",
    x: 35,
    y: 28,
    description:
      "澄海位于雨海以东，是月球正面一处形态较规则、边界清晰的圆形月海。它处在古老多环盆地之内，后期被大面积玄武岩覆盖，因此表面呈现出较暗且较平坦的外观。澄海还属于典型的“质量瘤（mascon）”区域，对月球重力场研究具有重要意义。",
    stats: [
      { label: "直径", value: "~707 km" },
      { label: "面积", value: "318,000 km²" },
      { label: "形成年代", value: "~38.9亿年前" },
    ],
    imageUrl: "/geology-map/Mare_Serenitatis_(LRO).png",
  },
  {
    id: "mare-crisium",
    name: "危海",
    nameEn: "Mare Crisium",
    type: "mare",
    x: 43,
    y: 36,
    description:
      "危海位于月球正面东北部，外形接近独立的圆形暗斑，在地球上观月时非常醒目。它本质上是一个古老撞击盆地，后被玄武岩熔岩覆盖，内部地势较平坦，边缘可见褶皱脊等构造。危海常被作为典型孤立月海案例，用于展示“撞击成盆—火山充填”的复合演化过程。",
    stats: [
      { label: "直径", value: "~556 km" },
      { label: "面积", value: "176,000 km²" },
      { label: "形成年代", value: "-" },
    ],
    imageUrl: "/geology-map/Mare_Crisium_(LRO).png",
  },
  {
    id: "plato",
    name: "柏拉图坑",
    nameEn: "Plato Crater",
    type: "crater",
    x: 28.5,
    y: 12.5,
    description:
      "柏拉图坑位于雨海东北岸，是月球正面最著名的大型熔岩充填撞击坑之一。它最显著的特征是坑底颜色较深、相对平坦，与周围较亮的高地区域形成鲜明对比，因此常被称作月面“黑湖”式地貌。由于轮廓完整、识别度高，柏拉图坑也是业余观月与月面地貌教学中的经典对象。",
    stats: [
      { label: "直径", value: "~100 km" },
      { label: "深度", value: "~1.5 km" },
      { label: "形成年代", value: "~38.4亿年前" },
    ],
    imageUrl: "/geology-map/Plato_(LRO).png",
  },
  {
    id: "gagarin",
    name: "加加林坑",
    nameEn: "Gagarin Crater",
    type: "crater",
    x: 62.5,
    y: 62,
    description:
      "加加林坑位于月球背面南半球，是一座尺度很大的古老撞击坑。由于经历了长期叠加撞击和侵蚀改造，其坑缘已经较不完整，坑底内部又叠置了多座次生或后期撞击坑，整体结构非常复杂。它常被用来展示月球背面大型古老撞击坑的退化特征。",
    stats: [
      { label: "直径", value: "~261 km" },
      { label: "深度", value: "~4.8 km" },
      { label: "形成年代", value: "前酒海纪" },
    ],
    imageUrl: "/geology-map/Gagarin_lunar_crater.jpg",
  },
  {
    id: "kepler",
    name: "开普勒坑",
    nameEn: "Kepler Crater",
    type: "crater",
    x: 22.5,
    y: 41.5,
    description:
      "开普勒坑位于月球正面风暴洋东部附近，虽然尺度不算特别大，但以极其醒目的辐射纹系统著称。其周围高反照率喷出物向外延伸数百千米，使它在月面图像上极易辨认。坑体内部可见塌陷坑壁、阶地和中央隆起，是研究年轻撞击坑喷出物分布与坑体结构的良好案例。",
    stats: [
      { label: "直径", value: "~30 km" },
      { label: "深度", value: "~2.6 km" },
      { label: "形成年代", value: "哥白尼纪" },
    ],
    imageUrl: "/geology-map/Kepler_Martian_crater_500km.jpg",
  },
];

const typeConfig = {
  mare: { label: "月海", color: "#C1FAF8", borderColor: "rgba(193,250,248,0.6)" },
  crater: { label: "撞击坑", color: "#F1D088", borderColor: "rgba(241,208,136,0.6)" },
  mountain: { label: "山脉", color: "#F1D088", borderColor: "rgba(241,208,136,0.6)" },
  landing: { label: "着陆点", color: "#C1FAF8", borderColor: "rgba(193,250,248,0.6)" },
};

export function LunarMap() {
  const asset = (path: string) => withBasePath(path);
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [selectedPOI, setSelectedPOI] = useState<POI | null>(null);
  const touchStartRef = useRef({ x: 0, y: 0 });

  const handleZoom = useCallback((delta: number) => {
    setScale((s) => Math.min(Math.max(s + delta, 1), 4));
  }, []);

  const handleWheel = useCallback(
    (e: React.WheelEvent) => {
      e.preventDefault();
      handleZoom(e.deltaY > 0 ? -0.15 : 0.15);
    },
    [handleZoom]
  );

  const handleMouseDown = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest("[data-poi]")) return;
    setIsDragging(true);
    setDragStart({ x: e.clientX - position.x, y: e.clientY - position.y });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    setPosition({ x: e.clientX - dragStart.x, y: e.clientY - dragStart.y });
  };

  const handleMouseUp = () => setIsDragging(false);

  const resetView = () => {
    setScale(1);
    setPosition({ x: 0, y: 0 });
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 1) {
      setIsDragging(true);
      touchStartRef.current = {
        x: e.touches[0].clientX - position.x,
        y: e.touches[0].clientY - position.y,
      };
    }
  };
  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || e.touches.length !== 1) return;
    setPosition({
      x: e.touches[0].clientX - touchStartRef.current.x,
      y: e.touches[0].clientY - touchStartRef.current.y,
    });
  };
  const handleTouchEnd = () => setIsDragging(false);

  return (
    <section className="relative flex min-h-screen w-full flex-col bg-[#151829]">
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
          <h2 className="text-3xl tracking-wider text-white md:text-4xl">月球表面形态</h2>
          <span className="pb-1 text-sm tracking-widest text-[#C1FAF8]/50">
            Surface Morphology of the Moon
          </span>
        </div>
        <div className="h-px bg-gradient-to-r from-[#F1D088]/60 via-[#C1FAF8]/30 to-transparent" />
        <p className="mt-3 max-w-2xl text-sm text-white/40">
          探索月球地表的主要地貌特征。拖拽移动地图，滚轮缩放，点击标记点查看详细信息。
        </p>
      </div>

      <div className="relative mx-4 mb-6 flex-1 overflow-hidden rounded-xl border border-white/10 md:mx-10">
        <div
          className="pointer-events-none absolute inset-0 z-[1] opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(193,250,248,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(193,250,248,0.5) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />

        <div className="absolute top-0 left-0 z-[2] h-8 w-8 rounded-tl-xl border-t-2 border-l-2 border-[#C1FAF8]/30" />
        <div className="absolute top-0 right-0 z-[2] h-8 w-8 rounded-tr-xl border-t-2 border-r-2 border-[#C1FAF8]/30" />

        <div
          className="relative h-[60vh] w-full cursor-grab overflow-hidden bg-[#0d1020] active:cursor-grabbing md:h-[70vh]"
          onWheel={handleWheel}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div
            className="absolute inset-0 flex items-center justify-center"
            style={{
              transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
              transition: isDragging ? "none" : "transform 0.2s ease-out",
            }}
          >
            <img
              src={asset("/geology-map/geology-map-only-mare.png")}
              alt="Lunar topographic map"
              className="pointer-events-none h-full w-full select-none object-contain"
              draggable={false}
            />

            {pois.map((poi) => (
              <POIMarker
                key={poi.id}
                poi={poi}
                isSelected={selectedPOI?.id === poi.id}
                onClick={() => setSelectedPOI(poi)}
                scale={scale}
              />
            ))}
          </div>
        </div>

        <div className="absolute right-4 bottom-36 z-10 flex flex-col gap-2 max-md:bottom-24 max-md:right-3">
          {[
            { icon: <ZoomIn size={16} />, action: () => handleZoom(0.3), label: "放大" },
            { icon: <ZoomOut size={16} />, action: () => handleZoom(-0.3), label: "缩小" },
            { icon: <Maximize2 size={16} />, action: resetView, label: "重置" },
          ].map((btn) => (
            <button
              key={btn.label}
              onClick={btn.action}
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-[#151829]/80 text-white/60 backdrop-blur transition-all hover:border-[#C1FAF8]/30 hover:text-[#C1FAF8]"
              title={btn.label}
            >
              {btn.icon}
            </button>
          ))}
        </div>

        <div className="absolute bottom-28 left-4 z-10 flex items-center gap-2 text-xs text-white/30 max-md:bottom-24 max-md:left-3">
          <Navigation size={12} className="text-[#C1FAF8]/40" />
          <span>{Math.round(scale * 100)}%</span>
        </div>

        <div className="pointer-events-none absolute right-4 bottom-4 left-4 z-[9] flex justify-center max-md:bottom-3" aria-hidden>
          <div className="flex h-30 max-w-[calc(100%-11rem)] items-center justify-center">
            <img
              src={asset("/geology-map/label.png")}
              alt=""
              className="h-[80%] max-w-full w-auto select-none object-contain"
              draggable={false}
            />
          </div>
        </div>

        <div className="absolute top-4 left-4 z-10 flex flex-col gap-1.5">
          {(["mare", "crater"] as const).map((type) => (
            <div key={type} className="flex items-center gap-2 text-xs">
              <span className="h-2 w-2 rounded-full" style={{ backgroundColor: typeConfig[type].color, opacity: 0.8 }} />
              <span className="text-white/40">{typeConfig[type].label}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="fixed bottom-8 left-12 z-50 max-md:bottom-6 max-md:left-4">
        <SectionNavButton
          direction="prev"
          section={{ label: "月相", href: "/phases" }}
        />
      </div>
      <div className="fixed bottom-8 right-12 z-50 max-md:bottom-6 max-md:right-4">
        <SectionNavButton
          direction="next"
          section={{ label: "月球化学元素", href: "/elements" }}
        />
      </div>

      <AnimatePresence>
        {selectedPOI && <DetailPanel poi={selectedPOI} onClose={() => setSelectedPOI(null)} />}
      </AnimatePresence>
    </section>
  );
}

function POIMarker({
  poi,
  isSelected,
  onClick,
  scale,
}: {
  poi: POI;
  isSelected: boolean;
  onClick: () => void;
  scale: number;
}) {
  const config = typeConfig[poi.type];
  const markerScale = 1 / scale;

  return (
    <div
      data-poi
      className="group absolute cursor-pointer"
      style={{
        left: `${poi.x}%`,
        top: `${poi.y}%`,
        transform: `translate(-50%, -50%) scale(${markerScale})`,
      }}
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
    >
      <div
        className="absolute top-1/2 left-1/2 h-8 w-8 -translate-x-1/2 -translate-y-1/2 animate-ping rounded-full"
        style={{
          backgroundColor: config.color,
          opacity: 0.15,
          animationDuration: "2.5s",
        }}
      />
      <div
        className="absolute top-1/2 left-1/2 h-6 w-6 -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{ background: `radial-gradient(circle, ${config.color}33 0%, transparent 70%)` }}
      />
      <div
        className="relative h-3 w-3 rounded-full border-2 transition-all group-hover:scale-125"
        style={{
          borderColor: config.color,
          backgroundColor: isSelected ? config.color : "transparent",
          boxShadow: `0 0 8px ${config.color}66`,
        }}
      />
      <div className="pointer-events-none absolute top-1/2 left-full ml-2 -translate-y-1/2 whitespace-nowrap opacity-0 transition-opacity group-hover:opacity-100">
        <span
          className="rounded bg-[#151829]/90 px-2 py-1 text-xs backdrop-blur border"
          style={{ color: config.color, borderColor: `${config.color}33` }}
        >
          {poi.name}
        </span>
      </div>
    </div>
  );
}

function DetailPanel({ poi, onClose }: { poi: POI; onClose: () => void }) {
  const config = typeConfig[poi.type];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="fixed right-6 bottom-6 z-50 w-[400px] max-w-[calc(100vw-3rem)]"
    >
      <div
        className="relative overflow-hidden bg-[#0d1020]/92 backdrop-blur-xl"
        style={{ border: "1px solid rgba(255,255,255,0.07)" }}
      >
        <div className="pointer-events-none absolute top-0 left-0 z-10 h-5 w-5">
          <div className="absolute top-0 left-0 h-[2px] w-5" style={{ backgroundColor: `${config.color}99` }} />
          <div className="absolute top-0 left-0 h-5 w-[2px]" style={{ backgroundColor: `${config.color}99` }} />
        </div>
        <div className="pointer-events-none absolute top-0 right-0 z-10 h-5 w-5">
          <div className="absolute top-0 right-0 h-[2px] w-5" style={{ backgroundColor: `${config.color}99` }} />
          <div className="absolute top-0 right-0 h-5 w-[2px]" style={{ backgroundColor: `${config.color}99` }} />
        </div>
        <div className="pointer-events-none absolute bottom-0 left-0 z-10 h-5 w-5">
          <div className="absolute bottom-0 left-0 h-[2px] w-5" style={{ backgroundColor: `${config.color}99` }} />
          <div className="absolute bottom-0 left-0 h-5 w-[2px]" style={{ backgroundColor: `${config.color}99` }} />
        </div>
        <div className="pointer-events-none absolute right-0 bottom-0 z-10 h-5 w-5">
          <div className="absolute right-0 bottom-0 h-[2px] w-5" style={{ backgroundColor: `${config.color}99` }} />
          <div className="absolute right-0 bottom-0 h-5 w-[2px]" style={{ backgroundColor: `${config.color}99` }} />
        </div>

        <button
          onClick={onClose}
          className="absolute top-3 right-3 z-20 flex h-9 w-9 items-center justify-center transition-colors"
          style={{ color: `${config.color}CC` }}
        >
          <X size={20} strokeWidth={2.8} />
        </button>

        <div className="relative w-full overflow-hidden">
          <img
            src={withBasePath(poi.imageUrl)}
            alt={poi.name}
            className="block h-auto max-h-[50vh] w-full max-w-full object-contain object-center"
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0d1020] via-[#0d1020]/30 to-transparent" />
          <div
            className="absolute bottom-4 left-5 rounded px-2.5 py-1 text-xs tracking-wider border"
            style={{ color: config.color, borderColor: `${config.color}40`, backgroundColor: `${config.color}10` }}
          >
            {config.label}
          </div>
        </div>

        <div className="px-5 pb-5">
          <h3 className="mt-4 text-2xl tracking-wide text-white">{poi.name}</h3>
          <p className="mt-1 text-xs tracking-widest text-white/30">{poi.nameEn}</p>

          <div className="my-4 h-px" style={{ background: `linear-gradient(90deg, ${config.color}40, transparent)` }} />

          <div className="mb-5 grid grid-cols-3 gap-3">
            {poi.stats.map((stat) => (
              <div key={stat.label} className="rounded-lg border border-white/5 bg-white/[0.03] p-3">
                <div className="mb-1 text-[10px] tracking-wider text-white/30">{stat.label}</div>
                <div className="text-sm" style={{ color: config.color }}>
                  {stat.value}
                </div>
              </div>
            ))}
          </div>

          <p className="text-sm leading-relaxed text-white/50">{poi.description}</p>
        </div>

        <div className="h-px w-full" style={{ background: `linear-gradient(90deg, transparent, ${config.color}40, transparent)` }} />
      </div>
    </motion.div>
  );
}
