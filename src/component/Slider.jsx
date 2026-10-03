import React, { useEffect, useState } from "react";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import required modules
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { Link } from "react-router";
import { getCachedVideo } from "../db/getCachedVideo";
import { BackgroundGradient } from "../components/ui/background-gradient";

const SLIDES = [
  {
    to: "/online-test-series/rrb/rrb-ntpc",
    url: "https://cdn.jsdelivr.net/gh/ankittyagideveloper/first-cdn-test@v1.1.2/banner-0.mp4",
  },
  {
    to: "/online-test-series/rrb/rrb-ntpc",
    url: "https://cdn.jsdelivr.net/gh/ankittyagideveloper/first-cdn-test@v1.1.3/banner-1.mp4",
  },
  {
    to: "/online-test-series/rrb/rrb-ntpc",
    url: "https://cdn.jsdelivr.net/gh/ankittyagideveloper/first-cdn-test@v1.1.2/banner-2.mp4",
  },
  {
    to: "/pdf-category",
    url: "https://cdn.jsdelivr.net/gh/ankittyagideveloper/first-cdn-test@v1.0.9/banner-3.mp4",
  },
];

const Slider = () => {
  const [videoSources, setVideoSources] = useState([]);

  useEffect(() => {
    let active = true;
    const objectUrls = [];

    async function loadVideos() {
      const result = [];
      for (const slide of SLIDES) {
        const localUrl = await getCachedVideo(slide.url);
        objectUrls.push(localUrl);
        result.push(localUrl);
      }
      if (active) setVideoSources(result);
    }

    loadVideos();

    return () => {
      active = false;
      objectUrls.forEach(URL.revokeObjectURL); // prevent memory leak
    };
  }, []);

  return (
    <BackgroundGradient
      containerClassName="w-full max-w-[760px] mx-auto mt-16 md:mt-0"
      className="rounded-[22px] overflow-hidden bg-slate-900/90 dark:bg-zinc-950/90 p-1.5 shadow-2xl backdrop-blur-md border border-slate-700/50 dark:border-zinc-800"
    >
      {/* Sleek App Window Header */}
      <div className="flex items-center justify-between px-3.5 py-2 bg-slate-950/80 rounded-t-[18px] border-b border-slate-800/80">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-rose-500/90 inline-block shadow-xs"></span>
          <span className="w-3 h-3 rounded-full bg-amber-500/90 inline-block shadow-xs"></span>
          <span className="w-3 h-3 rounded-full bg-emerald-500/90 inline-block shadow-xs"></span>
        </div>
        <div className="flex items-center gap-2 px-3 py-0.5 rounded-md bg-slate-800/70 border border-slate-700/50 text-[11px] text-slate-300 font-mono tracking-tight">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          <span>LIVE • RRB Mock Platform</span>
        </div>
        <div className="w-12 text-right text-[11px] text-slate-400 font-medium">CBT 1 &amp; 2</div>
      </div>

      <div className="relative w-full rounded-b-[18px] overflow-hidden bg-slate-950">
        <Swiper
          spaceBetween={0}
          centeredSlides={true}
          autoplay={{
            delay: 3500,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
            dynamicBullets: true,
          }}
          speed={800}
          modules={[Autoplay, Pagination, Navigation]}
          className="w-full rounded-b-[18px] [&_.swiper-pagination-bullet]:bg-white [&_.swiper-pagination-bullet-active]:bg-[#1272ba] [&_.swiper-pagination-bullet]:opacity-70 [&_.swiper-pagination-bullet-active]:opacity-100"
        >
          {SLIDES.map((slide, index) => {
            const videoSrc = videoSources[index] || slide.url;
            return (
              <SwiperSlide
                key={index}
                className="w-full flex justify-center items-center bg-black/40"
              >
                <Link to={slide.to} className="block w-full h-full relative group">
                   <video
                     autoPlay
                     loop
                     muted
                     playsInline
                     src={videoSrc}
                     // First slide is the LCP candidate — hint the browser to load
                     // it at high priority and begin buffering immediately.
                     preload={index === 0 ? "auto" : "none"}
                     fetchPriority={index === 0 ? "high" : "low"}
                     className="w-full h-auto aspect-[16/9] object-cover rounded-b-[18px] block transition-transform duration-500 group-hover:scale-[1.01]"
                   />
                </Link>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </BackgroundGradient>
  );
};
export default Slider;
