/** 剖面图与 mask 动画共用的布局常量（727×651 边界框内百分比） */

export const layerImages = [
  {
    id: "shadow",
    src: "/lunar-interior/lunar-shadow.png",
    style: { left: "1.8%", top: "92.8%", width: "98.2%", height: "7.2%" },
  },
  {
    id: "crust",
    src: "/lunar-interior/lunar-crust.png",
    style: { left: "0%", top: "0%", width: "54.2%", height: "95.9%" },
  },
  {
    id: "mantle",
    src: "/lunar-interior/lunar-mantle.png",
    style: { left: "18.3%", top: "2.3%", width: "50.9%", height: "90%" },
  },
  {
    id: "molten",
    src: "/lunar-interior/lunar-molten.png",
    style: { left: "54.2%", top: "29.8%", width: "19.7%", height: "34.7%" },
  },
  {
    id: "outer-core",
    src: "/lunar-interior/lunar-outer-core.png",
    style: { left: "65.9%", top: "35.3%", width: "13.5%", height: "23.8%" },
  },
  {
    id: "inner-core",
    src: "/lunar-interior/lunar-inner-core.png",
    style: { left: "73.9%", top: "38.4%", width: "16.4%", height: "18.3%" },
  },
] as const;

export const collapsedTx: Record<string, number> = {
  mantle: 0,
  molten: 0,
  "outer-core": 0,
  "inner-core": 0,
};

export const staggerMs: Record<string, number> = {
  shadow: 200,
  crust: 0,
  mantle: 0,
  molten: 60,
  "outer-core": 120,
  "inner-core": 180,
};

export const expandedShiftTxPct: Record<string, number> = {
  crust: 0,
  mantle: 60,
  molten: 200,
  "outer-core": 330,
  "inner-core": 290,
};

export const maskExtraShiftTxPct: Record<string, number> = {
  crust: 0,
  mantle: 0,
  molten: 0,
  "outer-core": 0,
};

export type MaskBaseId = "crust" | "mantle" | "molten" | "outer-core";

export type MaskBoxPct = {
  left: string;
  top: string;
  width: string;
  height: string;
};
