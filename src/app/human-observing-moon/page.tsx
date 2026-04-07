import Link from "next/link";
import { SectionNavButton } from "@/app/about-moon/SectionNavButton";
import InfiniteGallery from "@/components/InfiniteGallery";
import { StarField } from "@/components/StarField";

export interface MoonImage {
  src: string;
  alt: string;
  title: string;
  period: string;
  description: string;
}

export default function HumanObservingMoonPage() {
  const moonObservationImages: MoonImage[] = [
    { src: "/moonhistory/23.jpg", alt: "23-Atlas photographique de la Lune", title: "Named Lunar Formations", period: "1960", description: "Named Lunar Formations出版，成为现代月面命名规范化的重要里程碑。" },
    { src: "/moonhistory/22.jpg", alt: "22-Named lunar formation.", title: "《月球摄影图集 Atlas photographique de la Lune》", period: "1896 - 1910", description: "莫里斯·洛维Maurice Loewy与皮埃尔·皮瑟Pierre Puiseux他们在巴黎天文台利用赤道仪和大型折射望远镜，拍摄了数千张高分辨率的月球底片，并精心挑选汇编成了《月球摄影图集》。这是太空时代到来之前，人类掌握的最精准、最权威的月面视觉档案。" },
    { src: "/moonhistory/21.jpg", alt: "21-compositeSchmidt, J. F. Julius", title: "朱利叶斯·施密特完成19世纪后期最重要的大型月图之一", period: "1878", description: "J.F. Julius Schmidt完成19世纪后期最重要的大型月图之一，细节水平超过比尔-梅德勒体系。" },
    { src: "/moonhistory/20.jpg", alt: "20-Warren De la Rue", title: "更清晰的月球摄影与立体影像实践出现", period: "1853 - 1858", description: "沃伦·德拉鲁 Warren De la Rue推动更清晰的月球摄影与立体影像实践，提升月球摄影的科学价值。" },
    { src: "/moonhistory/19.jpg", alt: "19-John William Draper", title: "月球研究进入摄影记录时代。", period: "1840", description: "约翰·威廉·德雷伯 John William Draper拍摄出最早成功的月球照片之一，标志月球研究进入摄影记录时代。" },
    { src: "/moonhistory/18.jpg", alt: "18-Mappa selenographica", title: "《月面图Mappa Selenographica》出版", period: "1834 - 1836", description: "Wilhelm Beer与J.H. von Mädler出版《月面图 Mappa Selenographica》，是当时最完整、最精细的月图，并首次按象限系统组织。" },
    { src: "/moonhistory/17.webp", alt: "17-Johann Hieronymus Schröter", title: "约翰·希罗尼穆斯·施罗特系统研究不同光照条件下的月面地形", period: "1779", description: "Johann Hieronymus Schröter系统研究不同光照条件下的月面地形，是近代月面学发展的关键人物之一。" },
    { src: "/moonhistory/16.jpg", alt: "16-Cassinis map of the Moon", title: "乔瓦尼·多梅尼科·卡西尼绘制更具真实感的月图", period: "1679", description: "Giovanni Domenico Cassini绘制更具真实感的月图，提升月面地形细节表达水平。" },
    { src: "/moonhistory/15.webp", alt: "15-Giovanni Battista Riccioli", title: "《新天文学大成》中发表月图及现代面地名体系基础", period: "1651", description: "里乔利 Giovanni Battista Riccioli和格里马尔迪 Francesco Grimaldi在《新天文学大成》中发表著名月图，所用命名体系成为现代月面地名体系基础。" },
    { src: "/moonhistory/14.jpg", alt: "14-Hevelius_Map", title: "《月面学》——第一部系统而精细的月球图集", period: "1647", description: "约翰内斯·赫维留 Johannes Hevelius出版《月面学》（Selenographia），通常被视为第一部系统而精细的月球图集。" },
    { src: "/moonhistory/13.jpg", alt: "13-langrenusmoon", title: "米歇尔·范·朗格伦率先尝试给月面特征命名", period: "1645", description: "Michael van Langren发表重要早期月图，并率先系统尝试给月面特征命名。" },
    { src: "/moonhistory/12.jpeg", alt: "12-Galileo", title: "伽利略使用改良望远镜观测月球", period: "1609 - 1610", description: "Galileo Galilei使用改良望远镜观测月球，并在1610年《星际信使》中发表月面图，证明月球表面并非完美光滑球体。" },
    { src: "/moonhistory/11.jpg", alt: "11-Thomas Harriot", title: "最早的望远镜月面素描", period: "1609", description: "Thomas Harriot留下已知最早的望远镜月面素描，时间早于伽利略。" },
    { src: "/moonhistory/10.jpg", alt: "10-William Gilbert", title: "威廉·吉尔伯特裸眼观测绘制早期月面图", period: "1603", description: "William Gilbert在望远镜出现前依据裸眼观测绘制早期月面图，是前望远镜时代最重要的月图之一。" },
    { src: "/moonhistory/09.webp", alt: "09-guoshoujing", title: "郭守敬编制《授时历》", period: "1281 CE", description: "主持编成《授时历》，代表中国古代在日月运行计算和历法精度上的高峰之一。" },
    { src: "/moonhistory/08.png", alt: "08-zuchongzhi", title: "祖冲之提高朔望月和月食推算精度", period: "462 CE", description: "编制《大明历》，显著提高朔望月和月食推算精度，是中国古代月球运行计算的重要高峰。" },
    { src: "/moonhistory/07.jpg", alt: "07-Ptolemaic", title: "古希腊 托勒密精准计算月球运动周期", period: "100 - 170 CE", description: "在《天文学大成》中完善月球的本轮 - 均轮轨道模型，精准计算月球运动周期、黄纬变化，建立沿用近 1500 年的月球运动理论体系，可高精度预报月球位置与月食。" },
    { src: "/moonhistory/06.png", alt: "06-zhangheng", title: "东汉 张衡解释日月食机理", period: "78 - 139 CE", description: "讨论月球为球体、月光来自日照，并解释日月食机理，是中国古代月球科学解释的重要节点。" },
    { src: "/moonhistory/05.jpg", alt: "05-Hipparchus", title: "古希腊 喜帕恰斯精准测算朔望月周期", period: "190 - 120 BCE", description: "精准测算朔望月周期为 29.53059 天，与现代实测值误差不足 1 秒；发现月球轨道进动（出差）现象，编制人类最早的月球运行表，实现月食的精准预报。" },
    { src: "/moonhistory/04.png", alt: "04-change", title: "先秦至两汉间对月亮的神话形象", period: "221 BCE - 220 CE", description: "嫦娥奔月、月中玉兔、广寒宫等月亮神话逐步定型，奠定东方观月的文化想象传统。" },
    { src: "/moonhistory/03.jpg", alt: "03-Aristarchus", title: "古希腊 阿里斯塔克首次定量测算地月距离", period: "About 300 BCE", description: "在《论日月的大小和距离》中，首次通过几何方法定量测算地月距离、地日距离与日月直径比值，测算地月距离约为地球直径的 20 倍（现代实测值约 30 倍），是人类首次对月球天体参数的定量测算。" },
    { src: "/moonhistory/02.png", alt: "02-Aristotle", title: "古希腊 亚里士多德通过月食论证地球为球形", period: "About 400 CE", description: "通过月食时地球投射在月面的弧形阴影，科学论证地球为球形；提出月球是距离地球最近的天体，建立地心体系下的早期月球轨道模型，奠定西方古典月球理论基础。" },
    { src: "/moonhistory/01.webp", alt: "01-Chinese-calendar-zodiac", title: "商周至先秦时期的早期历法传统", period: "1600 BCE - 221 BCE", description: "早期天官形成以朔望月为基础的观月与历法传统，“朔、望”成为中国长期稳定的观月核心概念。" },
  ];

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#151829] text-white">
      <StarField />
      <div className="orbital-line top-[15%] left-[5%] w-[25%] opacity-50" />
      <div className="orbital-line top-[15%] right-[5%] w-[25%] opacity-50" />
      <div className="orbital-line bottom-[20%] left-[10%] w-[15%] opacity-30" />
      <div className="orbital-line bottom-[25%] right-[8%] w-[20%] opacity-30" />

      <InfiniteGallery
        images={moonObservationImages}
        speed={1}
        zSpacing={3}
        visibleCount={23}
        falloff={{ near: 0.8, far: 14 }}
        className="h-screen w-full overflow-hidden rounded-lg"
      />

      <div className="fixed top-8 right-8 z-20 flex items-center gap-4 pointer-events-auto">
        <div
          className="h-1.5 w-1.5 shrink-0 rounded-full"
          style={{ background: "#F1D088", boxShadow: "0 0 6px #F1D088" }}
        />
        <Link
          href="/index-knowledge-map"
          className="rounded-full px-3 py-1 text-xs transition-all"
          style={{
            color: "rgba(193, 250, 248, 0.6)",
            border: "1px solid rgba(193, 250, 248, 0.2)",
            background: "rgba(193, 250, 248, 0.04)",
          }}
        >
          ← 返回主页面
        </Link>
      </div>

      <div className="fixed inset-0 z-10 flex flex-col items-center justify-start px-4 pt-12 pointer-events-none md:pt-16">
        <p className="mb-2 font-chinese text-sm tracking-[0.1em] text-white/70 uppercase md:text-base">从远古的抬眼凝望</p>
        <p className="mb-2 font-chinese text-sm tracking-[0.1em] text-white/70 uppercase md:text-base">到深空的亲身奔赴</p>
        <p className="mb-2 font-chinese text-sm tracking-[0.1em] text-primary/90 uppercase md:text-base">人类对月球的探索</p>
        <p className="mb-2 font-chinese text-sm tracking-[0.1em] text-primary/90 uppercase md:text-base">是一场跨越千年的浪漫远征</p>
        <h1 className="text-balance text-center font-serif text-3xl tracking-tight md:text-5xl lg:text-6xl">
          <span className="italic text-secondary">Human History of Observing the Moon</span>
        </h1>
      </div>

      <div className="fixed right-0 bottom-8 left-0 z-10 text-center font-mono text-[10px] tracking-wider uppercase md:text-[11px]">
        <p className="font-chinese text-primary/90">使用鼠标滚轮、方向键或触摸屏进行操作</p>
        <p className="font-chinese text-primary/90">长按图片查看详情</p>
        <p className="mt-1 font-chinese text-white/40">如果3秒内无操作将恢复自动播放</p>
      </div>

      <div className="fixed bottom-8 left-8 z-50 max-md:bottom-6 max-md:left-4">
        <SectionNavButton
          direction="prev"
          section={{ label: "月球表面形态", href: "/geology-map" }}
        />
      </div>
      <div className="fixed bottom-8 right-8 z-50 max-md:bottom-6 max-md:right-4">
        <SectionNavButton
          direction="next"
          section={{ label: "人类探月活动", href: "/mission-sites" }}
        />
      </div>

      <div className="fixed top-8 left-8 h-16 w-16 border-t border-l border-primary/30 pointer-events-none" />
      <div className="fixed top-8 right-8 h-16 w-16 border-t border-r border-primary/30 pointer-events-none" />
      <div className="fixed bottom-8 left-8 h-16 w-16 border-b border-l border-secondary/30 pointer-events-none" />
      <div className="fixed right-8 bottom-8 h-16 w-16 border-r border-b border-secondary/30 pointer-events-none" />
    </main>
  );
}
