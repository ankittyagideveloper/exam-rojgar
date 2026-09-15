import React, { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { Spotlight } from "@/components/ui/spotlight";

export default function SpotlightPreview({ children }) {
  // Defer the expensive Spotlight SVG (feGaussianBlur) until after the browser
  // has completed the first paint so it never competes with the LCP element.
  const [showSpotlight, setShowSpotlight] = useState(false);
  useEffect(() => {
    // requestIdleCallback gives the browser a chance to paint first;
    // fall back to a short setTimeout in browsers that don't support it.
    const id =
      typeof requestIdleCallback !== "undefined"
        ? requestIdleCallback(() => setShowSpotlight(true), { timeout: 200 })
        : setTimeout(() => setShowSpotlight(true), 200);
    return () => {
      typeof requestIdleCallback !== "undefined"
        ? cancelIdleCallback(id)
        : clearTimeout(id);
    };
  }, []);

  return (
    <div
      className="bg-[#EEF7FF] relative w-full overflow-hidden antialiased dark:bg-black/[0.96] [--spotlight-color:#FE8316] "

    >
      <div
        className={cn(
          "pointer-events-none absolute inset-0 [background-size:40px_40px] select-none",
          "bg-[linear-gradient(to_right,#c8e4f8_1px,transparent_1px),linear-gradient(to_bottom,#c8e4f8_1px,transparent_1px)]",
          "dark:bg-[linear-gradient(to_right,#262626_1px,transparent_1px),linear-gradient(to_bottom,#262626_1px,transparent_1px)]"
        )}
      />

      {showSpotlight && (
        <Spotlight className="-top-40 left-0 md:-top-20 md:left-60" fill="var(--spotlight-color)" />
      )}
      <div className="relative z-10 w-full">{children}</div>
    </div>
  );
}
