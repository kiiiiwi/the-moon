"use client";

import type { MaskBoxPct } from "../lunarInteriorLayout";
import LunarMaskOverlay from "./LunarMaskOverlay";

/** 在此修改月幔 mask 相对「月幔层矩形」的百分比位置与占位大小 */
export const mantleMaskBoxPct: MaskBoxPct = {
  left: "25%",
  top: "0%",
  width: "100%",
  height: "100%",
};

export const mantleMaskScale = 1.4;
export const mantleMaskImgWidth: number | string | undefined = undefined;
export const mantleMaskImgHeight: number | string | undefined = undefined;

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

export default function MantleMaskOverlay({
  isExpanded,
  activeLayer,
  zIndex = 1001,
  boxPct,
  scale,
  imgWidth,
  imgHeight,
  visible = true,
}: Props) {
  return (
    <LunarMaskOverlay
      baseId="mantle"
      src="/lunar-interior/lunar-mantle-mask.png"
      boxPct={boxPct ?? mantleMaskBoxPct}
      isExpanded={isExpanded}
      activeLayer={activeLayer}
      zIndex={zIndex}
      scale={scale ?? mantleMaskScale}
      imgWidth={imgWidth ?? mantleMaskImgWidth}
      imgHeight={imgHeight ?? mantleMaskImgHeight}
      visible={visible}
    />
  );
}
