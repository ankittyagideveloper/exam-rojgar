"use client";

import { cn } from "@/lib/utils";
import React, { useEffect, useRef } from "react";

export const InfiniteMovingCards = ({
  items,
  direction = "left",
  speed = "slow",
  pauseOnHover = true,
  className,
}) => {
  const containerRef = useRef(null);
  const scrollerRef = useRef(null);
  const rafRef = useRef(null);

  // mutable state shared between rAF loop and event handlers — no re-renders needed
  const pos = useRef(0);           // current translateX in px (always negative or 0)
  const halfWidth = useRef(0);     // width of one full set of cards (scroll resets here)
  const isPaused = useRef(false);  // hover pause
  const isDragging = useRef(false);
  const dragStartX = useRef(0);
  const posAtDragStart = useRef(0);

  const PX_PER_SECOND = speed === "fast" ? 120 : speed === "normal" ? 70 : 40;
  const DIR = direction === "left" ? -1 : 1;

  useEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;

    // duplicate items for seamless loop
    const origChildren = Array.from(scroller.children);
    origChildren.forEach((child) => {
      scroller.appendChild(child.cloneNode(true));
    });

    // measure after clones are in the DOM
    halfWidth.current = scroller.scrollWidth / 2;

    let lastTime = null;

    const tick = (timestamp) => {
      if (lastTime !== null && !isDragging.current && !isPaused.current) {
        const dt = (timestamp - lastTime) / 1000; // seconds
        pos.current += DIR * PX_PER_SECOND * dt;

        // wrap: keep pos within [-halfWidth, 0]
        if (pos.current <= -halfWidth.current) pos.current += halfWidth.current;
        if (pos.current > 0) pos.current -= halfWidth.current;
      }
      lastTime = timestamp;
      scroller.style.transform = `translateX(${pos.current}px)`;
      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ── pointer handlers (on the outer container) ─────────────────────────────
  const onPointerDown = (e) => {
    isDragging.current = true;
    dragStartX.current = e.clientX;
    posAtDragStart.current = pos.current;
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e) => {
    if (!isDragging.current) return;
    const dx = e.clientX - dragStartX.current;
    let next = posAtDragStart.current + dx;

    // wrap while dragging so the loop stays seamless
    const hw = halfWidth.current;
    if (hw > 0) {
      next = ((next % hw) - hw) % hw; // always in (-hw, 0]
      if (next > 0) next -= hw;
    }
    pos.current = next;
  };

  const onPointerUp = () => {
    isDragging.current = false;
  };

  const onMouseEnter = () => { if (pauseOnHover) isPaused.current = true; };
  const onMouseLeave = () => { isPaused.current = false; isDragging.current = false; };

  const AVATAR_COLORS = [
    "#006AB7", "#FF7D07", "#db2777", "#d97706",
    "#059669", "#dc2626", "#0891b2", "#65a30d",
  ];

  return (
    <div
      ref={containerRef}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerLeave={onPointerUp}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className={cn(
        "relative z-10 w-full overflow-hidden cursor-grab active:cursor-grabbing select-none",
        "[mask-image:linear-gradient(to_right,transparent,white_5%,white_95%,transparent)]",
        "md:[mask-image:linear-gradient(to_right,transparent,white_10%,white_90%,transparent)]",
        className
      )}
    >
      <ul
        ref={scrollerRef}
        style={{ willChange: "transform" }}
        className="flex w-max min-w-full shrink-0 flex-nowrap gap-3 py-4 md:gap-5"
      >
        {items.map((item, idx) => (
          <li
            className="relative flex flex-col w-[260px] max-w-full shrink-0 rounded-2xl border border-blue-100 bg-white px-4 py-5 shadow-sm md:w-[340px] md:px-7 md:py-6 lg:w-[420px] dark:border-blue-800 dark:bg-[#0f2320]"
            key={item.name}
          >
            <blockquote className="flex flex-col flex-1">
              {/* accent bar */}
              <div className="absolute top-0 left-0 h-1 w-12 rounded-t-2xl bg-[#1272ba] md:w-16" />
              {/* quote mark */}
              <span className="absolute top-3 right-4 text-3xl font-serif leading-none text-[#1272ba] select-none md:top-4 md:right-6 md:text-4xl dark:text-[#1272ba]">
                "
              </span>
              <div className="relative z-20 mt-4 flex flex-row items-center gap-2 md:mt-5 md:gap-3">
                {/* avatar circle */}
                <div
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white md:h-9 md:w-9 md:text-sm"
                  style={{ backgroundColor: AVATAR_COLORS[idx % AVATAR_COLORS.length] }}
                >
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
              <span className="relative z-20 block text-sm mt-3 leading-relaxed font-normal text-gray-700 md:text-sm dark:text-gray-200 flex-1">
                {item.quote}
              </span>

              {/* verified review footer */}
              <div className="mt-auto pt-3 border-t border-gray-100 flex items-center gap-2 dark:border-gray-700">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 text-[#16A34A]">
                  <path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z" />
                  <path d="m9 12 2 2 4-4" />
                </svg>
                <span className="text-[11px] font-bold tracking-[1.5px] text-[#64748B] uppercase dark:text-gray-400">
                  Verified Review
                </span>
              </div>
            </blockquote>
          </li>
        ))}
      </ul>
    </div>
  );
};
