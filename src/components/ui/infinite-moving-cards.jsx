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
        "scroller relative z-20 w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_10%,white_90%,transparent)]",
        className
      )}>
      <ul
        ref={scrollerRef}
        className={cn(
          "flex w-max min-w-full shrink-0 flex-nowrap gap-5 py-4",
          start && "animate-scroll",
          pauseOnHover && "hover:[animation-play-state:paused]"
        )}>
        {items.map((item, idx) => (
          <li
            className="relative w-[340px] max-w-full shrink-0 rounded-2xl border border-teal-100 bg-white px-7 py-6 shadow-sm md:w-[420px] dark:border-teal-800 dark:bg-[#0f2320]"
            key={item.name}>
            <blockquote>
              {/* teal accent bar */}
              <div className="absolute top-0 left-0 h-1 w-16 rounded-t-2xl bg-teal-600" />
              {/* quote mark */}
              <span className="absolute top-4 right-6 text-4xl font-serif leading-none text-teal-200 select-none dark:text-teal-800">
                "
              </span>
              <span className="relative z-20 block text-sm leading-relaxed font-normal text-gray-700 dark:text-gray-200">
                {item.quote}
              </span>
              <div className="relative z-20 mt-5 flex flex-row items-center gap-3">
                {/* avatar circle */}
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-teal-600 text-sm font-bold text-white">
                  {item.name.charAt(0)}
                </div>
                <span className="flex flex-col gap-0.5">
                  <span className="text-sm font-semibold text-teal-700 dark:text-teal-400">
                    {item.name}
                  </span>
                  <span className="text-xs text-gray-500 dark:text-gray-400">
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
