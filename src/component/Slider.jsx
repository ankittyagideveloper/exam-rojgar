import React from "react";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import required modules
import { Autoplay, Pagination, Navigation } from "swiper/modules";
const Slider = () => {
  return (
    <div className="w-full lg:w-2/4 h-full">
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
        speed={1000}
        // navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="w-full h-full rounded  mt-0"
      >
        {/* Common slide styles applied via Tailwind */}
        <SwiperSlide className="flex justify-center items-center text-center bg-gray-700">
          <img
            src="/slide-1.webp"
            alt="slide-1"
            className="w-full h-64 object-cover rounded-lg"
          />
        </SwiperSlide>

        <SwiperSlide className="flex justify-center items-center text-center bg-gray-700">
          <img
            src="/slide-2.webp"
            alt="slide-2"
            className="w-full h-64 object-cover rounded-lg"
          />
        </SwiperSlide>

        <SwiperSlide className="flex justify-center items-center text-center bg-gray-700">
          <img
            src="/slide-3.jpg"
            alt="slide-3"
            className="w-full h-64 object-cover rounded-lg"
          />
        </SwiperSlide>
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
      </Swiper>
    </div>
  );
};
export default Slider;
