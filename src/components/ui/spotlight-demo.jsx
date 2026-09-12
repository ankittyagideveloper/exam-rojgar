import React from "react";
import { cn } from "@/lib/utils";
import { Spotlight } from "@/components/ui/spotlight";

export default function SpotlightPreview({ children }) {
  return (
    <div
      className="relative w-full overflow-hidden antialiased"
      style={{ backgroundColor: "#EEF7FF" }}
      >
      <div
        className={cn(
          "pointer-events-none absolute inset-0 [background-size:40px_40px] select-none",
          "[background-image:linear-gradient(to_right,#c8e4f8_1px,transparent_1px),linear-gradient(to_bottom,#c8e4f8_1px,transparent_1px)]"
        )} />

      <Spotlight className="-top-40 left-0 md:-top-20 md:left-60" fill="#FE8316" />
      <div className="relative z-10 w-full">
        {children}
      </div>
    </div>
  );
}
