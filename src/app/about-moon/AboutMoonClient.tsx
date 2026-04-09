"use client";

import Link from "next/link";
import { useCallback, useState } from "react";
import { MoonCanvas } from "./MoonCanvas";
import { SectionNavButton } from "./SectionNavButton";
import "./about-moon.css";

type TabKey = "data" | "earth" | "satellites";

const TABS: { key: TabKey; label: string; controls: string; id: string }[] = [
  { key: "data", label: "月球数据", controls: "moon-panel-data", id: "moon-tab-data" },
  { key: "earth", label: "月球与地球", controls: "moon-panel-earth", id: "moon-tab-earth" },
  { key: "satellites", label: "卫星对比", controls: "moon-panel-satellites", id: "moon-tab-satellites" },
];

export default function AboutMoonClient() {
  const [active, setActive] = useState<TabKey>("data");

  const onKeyDown = useCallback((e: React.KeyboardEvent<HTMLDivElement>) => {
    const current = (e.target as HTMLElement | null)?.closest<HTMLButtonElement>(
      '[role="tab"][data-tab]'
    );
    if (!current) return;

    if (e.key !== "ArrowLeft" && e.key !== "ArrowRight" && e.key !== "Home" && e.key !== "End") {
      return;
    }
    e.preventDefault();

    const idx = TABS.findIndex((t) => t.key === (current.dataset.tab as TabKey));
    if (idx < 0) return;

    let nextIdx = idx;
    if (e.key === "ArrowLeft") nextIdx = (idx - 1 + TABS.length) % TABS.length;
    if (e.key === "ArrowRight") nextIdx = (idx + 1) % TABS.length;
    if (e.key === "Home") nextIdx = 0;
    if (e.key === "End") nextIdx = TABS.length - 1;

    setActive(TABS[nextIdx].key);
    document.getElementById(TABS[nextIdx].id)?.focus();
  }, []);

  return (
    <div className="about-moon-root">

      {/* ── Page header — same style as geology-map ── */}
      <div className="am-page-header">
        <div className="am-page-header__top">
          <div className="am-page-header__titles">
            <h2 className="am-page-header__h2">月球的外观</h2>
            <span className="am-page-header__sub">Appearance of the Moon</span>
          </div>
          <div className="am-page-header__back-wrap">
            <div
              className="am-page-header__back-dot"
              style={{ background: "#F1D088", boxShadow: "0 0 6px #F1D088" }}
            />
            <Link
              href="/index-knowledge-map"
              className="am-page-header__back-link"
              style={{
                color: "rgba(193, 250, 248, 0.6)",
                border: "1px solid rgba(193, 250, 248, 0.2)",
                background: "rgba(193, 250, 248, 0.04)",
              }}
            >
              ← 返回主页面
            </Link>
          </div>
        </div>
        <div className="am-page-header__line" />
        <p className="am-page-header__desc">
          探索月球的基本物理参数、与地球的尺寸对比，以及在太阳系卫星中的位置。
        </p>
      </div>

      <header>
        <MoonCanvas />

        <div className="text">
          <h1 className="moon-tabs__pageTitle">Information about the moon</h1>

          <div className="moon-tabs" data-moon-tabs onKeyDown={onKeyDown}>
            <div className="moon-tabs__list" role="tablist" aria-label="月球信息选项卡">
              {TABS.map((t) => {
                const isActive = active === t.key;
                return (
                  <button
                    key={t.key}
                    className={`moon-tabs__tab${isActive ? " is-active" : ""}`}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    aria-controls={t.controls}
                    id={t.id}
                    data-tab={t.key}
                    tabIndex={isActive ? 0 : -1}
                    onClick={() => setActive(t.key)}
                  >
                    {t.label}
                  </button>
                );
              })}
            </div>

            <div className="moon-tabs__panelWrap">
              <div className="moon-tabs__brackets" aria-hidden="true">
                <svg className="moon-tabs__bracket is-tl" viewBox="0 0 16 16">
                  <path
                    d="M0 12 V1 Q1 0 2 0 H12"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  />
                </svg>
                <svg className="moon-tabs__bracket is-tr" viewBox="0 0 16 16">
                  <path
                    d="M16 12 V1 Q15 0 14 0 H4"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  />
                </svg>
                <svg className="moon-tabs__bracket is-bl" viewBox="0 0 16 16">
                  <path
                    d="M0 4 V15 Q1 16 2 16 H12"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  />
                </svg>
                <svg className="moon-tabs__bracket is-br" viewBox="0 0 16 16">
                  <path
                    d="M16 4 V15 Q15 16 14 16 H4"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  />
                </svg>
              </div>

              <div className="moon-tabs__innerBorder" aria-hidden="true" />

              <section
                className={`moon-tabs__panel${active === "data" ? " is-active" : ""}`}
                role="tabpanel"
                aria-labelledby="moon-tab-data"
                id="moon-panel-data"
                data-panel="data"
                hidden={active !== "data"}
              >
                <h2 className="moon-tabs__title">Lunar Statistics</h2>
                <div className="moon-tabs__grid">
                  <div className="moon-tabs__stat">
                    <div className="moon-tabs__label">直径</div>
                    <div className="moon-tabs__value">3,474.8 km</div>
                  </div>
                  <div className="moon-tabs__stat">
                    <div className="moon-tabs__label">质量</div>
                    <div className="moon-tabs__value">7.342 × 10²² kg</div>
                  </div>
                  <div className="moon-tabs__stat">
                    <div className="moon-tabs__label">表面重力</div>
                    <div className="moon-tabs__value">1.62 m/s²</div>
                  </div>
                  <div className="moon-tabs__stat">
                    <div className="moon-tabs__label">公转周期</div>
                    <div className="moon-tabs__value">27.32 天</div>
                  </div>
                  <div className="moon-tabs__stat">
                    <div className="moon-tabs__label">平均轨道距离</div>
                    <div className="moon-tabs__value">384,400 km</div>
                  </div>
                  <div className="moon-tabs__stat">
                    <div className="moon-tabs__label">表面温度</div>
                    <div className="moon-tabs__value">-173°C ~ 127°C</div>
                  </div>
                </div>
              </section>

              <section
                className={`moon-tabs__panel${active === "earth" ? " is-active" : ""}`}
                role="tabpanel"
                aria-labelledby="moon-tab-earth"
                id="moon-panel-earth"
                data-panel="earth"
                hidden={active !== "earth"}
              >
                <h2 className="moon-tabs__title">Earth Comparison</h2>
                <div className="moon-tabs__stack">
                  <div className="moon-tabs__compareTop">
                    <div className="moon-tabs__dotGroup">
                      <div className="moon-tabs__dot is-earth" aria-hidden="true" />
                      <div className="moon-tabs__dotLabel is-earth">地球</div>
                    </div>
                    <div className="moon-tabs__dotGroup">
                      <div className="moon-tabs__dot is-moon" aria-hidden="true" />
                      <div className="moon-tabs__dotLabel is-moon">月球</div>
                    </div>
                    <div className="moon-tabs__hint">直径比 ≈ 1 : 3.67</div>
                  </div>

                  <div className="moon-tabs__rows">
                    <div className="moon-tabs__row">
                      <span className="moon-tabs__rowKey">直径比</span>
                      <span className="moon-tabs__rowEarth">12,742 km</span>
                      <span className="moon-tabs__rowMoon">3,474 km</span>
                    </div>
                    <div className="moon-tabs__row">
                      <span className="moon-tabs__rowKey">质量比</span>
                      <span className="moon-tabs__rowEarth">5.97 × 10²⁴ kg</span>
                      <span className="moon-tabs__rowMoon">7.34 × 10²² kg</span>
                    </div>
                    <div className="moon-tabs__row">
                      <span className="moon-tabs__rowKey">重力比</span>
                      <span className="moon-tabs__rowEarth">9.8 m/s²</span>
                      <span className="moon-tabs__rowMoon">1.62 m/s²</span>
                    </div>
                  </div>
                </div>
              </section>

              <section
                className={`moon-tabs__panel${active === "satellites" ? " is-active" : ""}`}
                role="tabpanel"
                aria-labelledby="moon-tab-satellites"
                id="moon-panel-satellites"
                data-panel="satellites"
                hidden={active !== "satellites"}
              >
                <h2 className="moon-tabs__title">Satellite Ranking</h2>
                <div className="moon-tabs__listCard">
                  <div className="moon-tabs__satRow is-highlight">
                    <span className="moon-tabs__satName">月球</span>
                    <span className="moon-tabs__satPlanet">地球</span>
                    <span className="moon-tabs__satDia">3,474 km</span>
                  </div>
                  <div className="moon-tabs__satRow">
                    <span className="moon-tabs__satName">木卫三</span>
                    <span className="moon-tabs__satPlanet">木星</span>
                    <span className="moon-tabs__satDia">5,268 km</span>
                  </div>
                  <div className="moon-tabs__satRow">
                    <span className="moon-tabs__satName">土卫六</span>
                    <span className="moon-tabs__satPlanet">土星</span>
                    <span className="moon-tabs__satDia">5,150 km</span>
                  </div>
                  <div className="moon-tabs__satRow">
                    <span className="moon-tabs__satName">木卫四</span>
                    <span className="moon-tabs__satPlanet">木星</span>
                    <span className="moon-tabs__satDia">4,821 km</span>
                  </div>
                  <div className="moon-tabs__satRow">
                    <span className="moon-tabs__satName">木卫一</span>
                    <span className="moon-tabs__satPlanet">木星</span>
                    <span className="moon-tabs__satDia">3,643 km</span>
                  </div>
                </div>
              </section>
            </div>
          </div>

        </div>
      </header>

      <div className="fixed bottom-8 left-8 z-50">
        <SectionNavButton
          direction="prev"
          section={{ label: "中国探月工程", href: "/change" }}
        />
      </div>
      <div className="fixed bottom-8 right-8 z-50">
        <SectionNavButton
          direction="next"
          section={{ label: "月球的内部构造", href: "/lunar-interior" }}
        />
      </div>
    </div>
  );
}
