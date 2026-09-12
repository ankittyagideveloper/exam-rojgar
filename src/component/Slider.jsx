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
      containerClassName="w-full max-w-[760px] mx-auto"
      className="rounded-[22px] overflow-hidden bg-white dark:bg-zinc-900"
    >
      <div className="w-full rounded-[20px] overflow-hidden">
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
          className="w-full rounded-[20px] [&_.swiper-pagination-bullet]:bg-white [&_.swiper-pagination-bullet-active]:bg-[#1272ba] [&_.swiper-pagination-bullet]:opacity-70 [&_.swiper-pagination-bullet-active]:opacity-100"
        >
          {SLIDES.map((slide, index) => {
            const videoSrc = videoSources[index] || slide.url;
            return (
              <SwiperSlide
                key={index}
                className="w-full flex justify-center items-center bg-black/5"
              >
                <Link to={slide.to} className="block w-full h-full">
                  <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    src={videoSrc}
                    className="w-full h-auto aspect-[16/9] object-cover rounded-[20px] block"
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
