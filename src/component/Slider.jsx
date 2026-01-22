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

const SLIDES = [
  {
    to: "/test-category/rrb/rrb-ntpc",
    url: "https://cdn.jsdelivr.net/gh/ankittyagideveloper/first-cdn-test@v1.1.2/banner-0.mp4",
  },
  {
    to: "/test-category/rrb/rrb-ntpc",
    url: "https://cdn.jsdelivr.net/gh/ankittyagideveloper/first-cdn-test@v1.1.3/banner-1.mp4",
  },
  {
    to: "/test-category/rrb/rrb-ntpc",
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
    debugger;
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
    <div className="w-full  h-full">
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        speed={1200}
        // navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="w-full  h-48 md:h-90 lg:h-90 md:w-[725px]  rounded  mt-0"
      >
        {/* Common slide styles applied via Tailwind */}
        {/* <SwiperSlide className="md:w-[725px] z-0 flex justify-center items-center text-center bg-gray-700">
          <img
            src="https://cdn.jsdelivr.net/gh/ankittyagideveloper/first-cdn-test@v1.0.5/banner-1.gif"
            alt="slide-1"
            className="w-full h-64 lg:h-full md:h-full object-cover lg:object-fill "
          />
        </SwiperSlide> */}

        {/* <SwiperSlide className=" md:w-[725px] z-0 flex justify-center items-center text-center bg-gray-700">
          <Link to="/test-category/rrc/rrc-group-d">
            <img
              src="/rrc-group-D.png"
              alt="slide-1"
              className="w-full h-64 lg:h-full md:h-full object-cover lg:object-fill "
            />
          </Link>
        </SwiperSlide>

        <SwiperSlide className="md:w-[725px] z-0 flex justify-center items-center text-center bg-gray-700">
          <Link to="/test-category">
            <img
              src="/govt-exam.png"
              alt="slide-1"
              className="w-full h-64 lg:h-full md:h-full  object-cover lg:object-fill "
            />
          </Link>
        </SwiperSlide> */}
        {/* <SwiperSlide className="md:w-[725px] z-0 flex justify-center items-center text-center bg-gray-700">
          <Link to="/test-category/rrb/rrb-ntpc">
            <video
              autoPlay
              loop
              muted
              playsInline
              src="https://cdn.jsdelivr.net/gh/ankittyagideveloper/first-cdn-test@v1.1.2/banner-0.mp4"
              className="w-full h-auto"
            />
          </Link>
        </SwiperSlide>
        <SwiperSlide className="md:w-[725px] z-0 flex justify-center items-center text-center bg-gray-700">
          <Link to="/test-category/rrb/rrb-ntpc">
            <video
              autoPlay
              loop
              muted
              playsInline
              src="https://cdn.jsdelivr.net/gh/ankittyagideveloper/first-cdn-test@v1.1.3/banner-1.mp4"
              className="w-full h-auto"
            />
          </Link>
        </SwiperSlide>
        <SwiperSlide className="md:w-[725px] z-0 flex justify-center items-center text-center bg-gray-700">
          <Link to="/test-category/rrb/rrb-ntpc">
            <video
              autoPlay
              loop
              muted
              playsInline
              src="https://cdn.jsdelivr.net/gh/ankittyagideveloper/first-cdn-test@v1.1.2/banner-2.mp4"
              className="w-full h-auto"
            />
          </Link>
        </SwiperSlide>
        <SwiperSlide className="md:w-[725px] z-0 flex justify-center items-center text-center bg-gray-700">
          <Link to="/pdf-category">
            <video
              autoPlay
              loop
              muted
              playsInline
              src="https://cdn.jsdelivr.net/gh/ankittyagideveloper/first-cdn-test@v1.0.9/banner-3.mp4"
              className="w-full h-auto"
            />
          </Link>
        </SwiperSlide> */}
        {/* <SwiperSlide className="flex justify-center items-center text-center bg-gray-700">
          <img
            src="/slide-3.jpg"
            alt="slide-3"
            className="w-full h-64 object-cover rounded-lg"
          />
        </SwiperSlide> */}
        {/* <SwiperSlide className="flex justify-center items-center text-center text-lg bg-gray-700 text-white">
          Slide 2
        </SwiperSlide>
        <SwiperSlide className="flex justify-center items-center text-center text-lg bg-gray-700 text-white">
          Slide 3
        </SwiperSlide>
        <SwiperSlide className="flex justify-center items-center text-center text-lg bg-gray-700 text-white">
          Slide 4
        </SwiperSlide>
        <SwiperSlide className="flex justify-center items-center text-center text-lg bg-gray-700 text-white">
          Slide 5
        </SwiperSlide>
        <SwiperSlide className="flex justify-center items-center text-center text-lg bg-gray-700 text-white">
          Slide 6
        </SwiperSlide>
        <SwiperSlide className="flex justify-center items-center text-center text-lg bg-gray-700 text-white">
          Slide 7
        </SwiperSlide>
        <SwiperSlide className="flex justify-center items-center text-center text-lg bg-gray-700 text-white">
          Slide 8
        </SwiperSlide>
        <SwiperSlide className="flex justify-center items-center text-center text-lg bg-gray-700 text-white">
          Slide 9
        </SwiperSlide> */}

        {SLIDES.map((slide, index) => (
          <SwiperSlide
            key={index}
            className="md:w-[725px] flex justify-center items-center bg-gray-700"
          >
            <Link to={slide.to}>
              {videoSources[index] && (
                <video
                  autoPlay
                  loop
                  muted
                  playsInline
                  src={videoSources[index]}
                  className="w-full h-auto"
                />
              )}
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
export default Slider;
