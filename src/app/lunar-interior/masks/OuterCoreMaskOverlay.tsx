"use client";

import type { MaskBoxPct } from "../lunarInteriorLayout";
import LunarMaskOverlay from "./LunarMaskOverlay";

/** 在此修改外核 mask 相对「外核层矩形」的百分比位置与占位大小 */
export const outerCoreMaskBoxPct: MaskBoxPct = {
  left: "18%",
  top: "0%",
  width: "100%",
  height: "100%",
};

export const outerCoreMaskScale = 1.4;
export const outerCoreMaskImgWidth: number | string | undefined = undefined;
export const outerCoreMaskImgHeight: number | string | undefined = undefined;

type Props = {
  isExpanded: boolean;
  activeLayer: string | null;
  zIndex?: number;
  boxPct?: MaskBoxPct;
  scale?: number;
  imgWidth?: number | string;
  imgHeight?: number | string;
  visible?: boolean;
};

export default function OuterCoreMaskOverlay({
  isExpanded,
  activeLayer,
  zIndex = 1003,
  boxPct,
  scale,
  imgWidth,
  imgHeight,
  visible = true,
}: Props) {
  return (
    <LunarMaskOverlay
      baseId="outer-core"
      src="/lunar-interior/lunar-outercore-mask.png"
      boxPct={boxPct ?? outerCoreMaskBoxPct}
      isExpanded={isExpanded}
      activeLayer={activeLayer}
      zIndex={zIndex}
      scale={scale ?? outerCoreMaskScale}
      imgWidth={imgWidth ?? outerCoreMaskImgWidth}
      imgHeight={imgHeight ?? outerCoreMaskImgHeight}
      visible={visible}
    />
  );
}
