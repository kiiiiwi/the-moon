"use client";

import type { MaskBoxPct } from "../lunarInteriorLayout";
import LunarMaskOverlay from "./LunarMaskOverlay";

/** 在此修改月壳 mask 相对「月壳层矩形」的百分比位置与占位大小 */
export const crustMaskBoxPct: MaskBoxPct = {
  left: "3%",
  top: "0%",
  width: "100%",
  height: "100%",
};

/** 图片缩放（相对框中心），默认 1 */
export const crustMaskScale = 1.35;
/** 固定宽度/高度：数字为 px；字符串为任意 CSS 长度；不设则按资源原始像素 */
export const crustMaskImgWidth: number | string | undefined = undefined;
export const crustMaskImgHeight: number | string | undefined = undefined;

type Props = {
  isExpanded: boolean;
  activeLayer: string | null;
  /** 默认 1000，保证在剖面其它层之上 */
  zIndex?: number;
  /** 可选覆盖，不传则用 crustMaskBoxPct */
  boxPct?: MaskBoxPct;
  scale?: number;
  imgWidth?: number | string;
  imgHeight?: number | string;
  visible?: boolean;
};

export default function CrustMaskOverlay({
  isExpanded,
  activeLayer,
  zIndex = 1000,
  boxPct,
  scale,
  imgWidth,
  imgHeight,
  visible = true,
}: Props) {
  return (
    <LunarMaskOverlay
      baseId="crust"
      src="/lunar-interior/lunar-crust-mask.png"
      boxPct={boxPct ?? crustMaskBoxPct}
      isExpanded={isExpanded}
      activeLayer={activeLayer}
      zIndex={zIndex}
      scale={scale ?? crustMaskScale}
      imgWidth={imgWidth ?? crustMaskImgWidth}
      imgHeight={imgHeight ?? crustMaskImgHeight}
      visible={visible}
    />
  );
}
