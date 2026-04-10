"use client";

import {
  collapsedTx,
  expandedShiftTxPct,
  layerImages,
  maskExtraShiftTxPct,
  staggerMs,
  type MaskBaseId,
  type MaskBoxPct,
} from "../lunarInteriorLayout";
import { withBasePath } from "@/lib/base-path";

export type LunarMaskOverlayProps = {
  baseId: MaskBaseId;
  src: string;
  /** 相对 base 层矩形的百分比框（控制 mask 在层内的位置与占位大小） */
  boxPct: MaskBoxPct;
  isExpanded: boolean;
  activeLayer: string | null;
  zIndex: number;
  /** 以框中心为原点缩放 PNG，默认 1 */
  scale?: number;
  /**
   * 图片宽度：数字为 CSS px；字符串可为任意 CSS 长度（如 `"120px"`、`"50%"`）。
   * 不传则 `width: auto`（按资源原始像素）。
   */
  imgWidth?: number | string;
  /** 图片高度，规则同 imgWidth；不传则 `height: auto` */
  imgHeight?: number | string;
  /** 为 false 时不显示（可与剖面展开同步隐藏 mask） */
  visible?: boolean;
};

const TRANSFORM_MS = 5000;
const EASE = "cubic-bezier(0.16, 1, 0.3, 1)";

export default function LunarMaskOverlay({
  baseId,
  src,
  boxPct,
  isExpanded,
  activeLayer,
  zIndex,
  scale = 1,
  imgWidth,
  imgHeight,
  visible = true,
}: LunarMaskOverlayProps) {
  const layerStyle = layerImages.find((l) => l.id === baseId)?.style;
  if (!layerStyle) return null;

  const baseTx = collapsedTx[baseId] ?? 0;
  const baseExpandedShift = expandedShiftTxPct[baseId] ?? 0;
  const extra = maskExtraShiftTxPct[baseId] ?? 0;
  const delay = staggerMs[baseId] ?? 0;

  const transformValue = isExpanded
    ? `translateX(${baseExpandedShift + extra}%)`
    : `translateX(${baseTx + extra}%)`;

  const shouldDim = activeLayer !== null && activeLayer !== baseId;
  const shouldBright = activeLayer === baseId;

  const widthStyle =
    imgWidth === undefined
      ? "auto"
      : typeof imgWidth === "number"
        ? imgWidth
        : imgWidth;
  const heightStyle =
    imgHeight === undefined
      ? "auto"
      : typeof imgHeight === "number"
        ? imgHeight
        : imgHeight;

  const imgTransform = `translate(-50%, -50%) scale(${scale})`;

  return (
    <div
      style={{
        position: "absolute",
        ...layerStyle,
        transform: transformValue,
        transition: [
          `opacity 0.45s ease`,
          `transform ${TRANSFORM_MS}ms ${EASE} ${delay}ms`,
        ].join(", "),
        opacity: visible ? 1 : 0,
        pointerEvents: "none",
        zIndex,
      }}
    >
      <div
        style={{
          position: "absolute",
          left: boxPct.left,
          top: boxPct.top,
          width: boxPct.width,
          height: boxPct.height,
          overflow: "visible",
          pointerEvents: "none",
        }}
      >
        <img
          src={withBasePath(src)}
          alt={`${baseId}-mask`}
          draggable={false}
          style={{
            position: "absolute",
            left: "50%",
            top: "50%",
            width: widthStyle,
            height: heightStyle,
            maxWidth: imgWidth === undefined ? "none" : undefined,
            maxHeight: imgHeight === undefined ? "none" : undefined,
            transform: imgTransform,
            transformOrigin: "center center",
            userSelect: "none",
            filter: shouldBright
              ? "brightness(1.1) saturate(1.2)"
              : shouldDim
                ? "brightness(0.3) saturate(0.3)"
                : "none",
          }}
        />
      </div>
    </div>
  );
}
