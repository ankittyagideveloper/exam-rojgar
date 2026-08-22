"use client";

import { cn } from "@/lib/utils";
import React, { useEffect, useState } from "react";

export const InfiniteMovingCards = ({
  items,
  direction = "left",
  speed = "fast",
  pauseOnHover = true,
  className
}) => {
  const containerRef = React.useRef(null);
  const scrollerRef = React.useRef(null);

  useEffect(() => {
    addAnimation();
  }, []);
  const [start, setStart] = useState(false);
  function addAnimation() {
    if (containerRef.current && scrollerRef.current) {
      const scrollerContent = Array.from(scrollerRef.current.children);

      scrollerContent.forEach((item) => {
        const duplicatedItem = item.cloneNode(true);
        if (scrollerRef.current) {
          scrollerRef.current.appendChild(duplicatedItem);
        }
      });

      getDirection();
      getSpeed();
      setStart(true);
    }
  }
  const getDirection = () => {
    if (containerRef.current) {
      if (direction === "left") {
        containerRef.current.style.setProperty("--animation-direction", "forwards");
      } else {
        containerRef.current.style.setProperty("--animation-direction", "reverse");
      }
    }
  };
  const getSpeed = () => {
    if (containerRef.current) {
      if (speed === "fast") {
        containerRef.current.style.setProperty("--animation-duration", "20s");
      } else if (speed === "normal") {
        containerRef.current.style.setProperty("--animation-duration", "40s");
      } else {
        containerRef.current.style.setProperty("--animation-duration", "80s");
      }
    }
  };
  return (
    <div
      ref={containerRef}
      className={cn(
        "scroller relative z-10 w-full overflow-hidden",
        /* tighter fade on mobile, wider on desktop so cards aren't clipped */
        "[mask-image:linear-gradient(to_right,transparent,white_5%,white_95%,transparent)]",
        "md:[mask-image:linear-gradient(to_right,transparent,white_10%,white_90%,transparent)]",
        className
      )}>
      <ul
        ref={scrollerRef}
        className={cn(
          "flex w-max min-w-full shrink-0 flex-nowrap gap-3 py-4 md:gap-5",
          start && "animate-scroll"
        )}>
        {items.map((item, idx) => (
          <li
            className="relative w-[260px] max-w-full shrink-0 rounded-2xl border border-blue-100 bg-white px-4 py-5 shadow-sm md:w-[340px] md:px-7 md:py-6 lg:w-[420px] dark:border-blue-800 dark:bg-[#0f2320]"
            key={item.name}>
            <blockquote>
              {/*  accent bar */}
              <div className="absolute top-0 left-0 h-1 w-12 rounded-t-2xl bg-[#1272ba] md:w-16" />
              {/* quote mark */}
              <span className="absolute top-3 right-4 text-3xl font-serif leading-none text-[#1272ba] select-none md:top-4 md:right-6 md:text-4xl dark:text-[#1272ba]">
                "
              </span>
              <span className="relative z-20 block text-xs leading-relaxed font-normal text-gray-700 md:text-sm dark:text-gray-200">
                {item.quote}
              </span>
              <div className="relative z-20 mt-4 flex flex-row items-center gap-2 md:mt-5 md:gap-3">
                {/* avatar circle */}
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#1272ba] text-xs font-bold text-white md:h-9 md:w-9 md:text-sm">
                  {item.name.charAt(0)}
                </div>
                <span className="flex flex-col gap-0.5">
                  <span className="text-xs font-semibold text-[#1272ba] md:text-sm dark:text-[#1272ba]">
                    {item.name}
                  </span>
                  <span className="text-[11px] text-gray-500 md:text-xs dark:text-gray-400">
                    {item.title}
                  </span>
                </span>
              </div>
            </blockquote>
          </li>
        ))}
      </ul>
    </div>
  );
};
