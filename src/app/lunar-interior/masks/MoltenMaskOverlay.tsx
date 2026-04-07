"use client";

import type { MaskBoxPct } from "../lunarInteriorLayout";
import LunarMaskOverlay from "./LunarMaskOverlay";

/** 在此修改熔融区 mask 相对「熔融区层矩形」的百分比位置与占位大小 */
export const moltenMaskBoxPct: MaskBoxPct = {
  left: "19%",
  top: "0%",
  width: "100%",
  height: "100%",
};

export const moltenMaskScale = 1.4;
export const moltenMaskImgWidth: number | string | undefined = undefined;
export const moltenMaskImgHeight: number | string | undefined = undefined;

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

export default function MoltenMaskOverlay({
  isExpanded,
  activeLayer,
  zIndex = 1002,
  boxPct,
  scale,
  imgWidth,
  imgHeight,
  visible = true,
}: Props) {
  return (
    <LunarMaskOverlay
      baseId="molten"
      src="/lunar-interior/lunar-molten-mask.png"
      boxPct={boxPct ?? moltenMaskBoxPct}
      isExpanded={isExpanded}
      activeLayer={activeLayer}
      zIndex={zIndex}
      scale={scale ?? moltenMaskScale}
      imgWidth={imgWidth ?? moltenMaskImgWidth}
      imgHeight={imgHeight ?? moltenMaskImgHeight}
      visible={visible}
    />
  );
}
