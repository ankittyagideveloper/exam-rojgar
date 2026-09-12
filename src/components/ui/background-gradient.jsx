import { cn } from "../../../lib/utils";
import React from "react";
import { motion } from "motion/react";

export const BackgroundGradient = ({
  children,
  className,
  containerClassName,
  animate = true,
}) => {
  const variants = {
    initial: {
      backgroundPosition: "0 50%",
    },
    animate: {
      backgroundPosition: ["0, 50%", "100% 50%", "0 50%"],
    },
  };
  return (
    <div className={cn("relative p-[4px] group", containerClassName)}>
      <motion.div
        variants={animate ? variants : undefined}
        initial={animate ? "initial" : undefined}
        animate={animate ? "animate" : undefined}
        transition={
          animate
            ? {
                duration: 5,
                repeat: Infinity,
                repeatType: "reverse",
              }
            : undefined
        }
        style={{
          backgroundSize: animate ? "400% 400%" : undefined,
        }}
        className={cn(
          "absolute inset-0 rounded-3xl z-[1] opacity-60 group-hover:opacity-100 blur-xl  transition duration-500 will-change-transform",
          " bg-[radial-gradient(circle_farthest-side_at_0_100%,#ff7e07,#ff7e0755),radial-gradient(circle_farthest-side_at_100%_0,#ffffff,transparent),radial-gradient(circle_farthest-side_at_100%_100%,#3386c5,#3386c555),radial-gradient(circle_farthest-side_at_0_0,#267dc0,#1a5fa0)]",
        )}
      />
      <motion.div
        variants={animate ? variants : undefined}
        initial={animate ? "initial" : undefined}
        animate={animate ? "animate" : undefined}
        transition={
          animate
            ? {
                duration: 5,
                repeat: Infinity,
                repeatType: "reverse",
              }
            : undefined
        }
        style={{
          backgroundSize: animate ? "400% 400%" : undefined,
        }}
        className={cn(
          "absolute inset-0 rounded-3xl z-[1] will-change-transform",
          "bg-[radial-gradient(circle_farthest-side_at_0_100%,#ff7e07,#ff7e0755),radial-gradient(circle_farthest-side_at_100%_0,#ffffff,transparent),radial-gradient(circle_farthest-side_at_100%_100%,#3386c5,#3386c555),radial-gradient(circle_farthest-side_at_0_0,#267dc0,#1a5fa0)]",
        )}
      />
      <div className={cn("relative z-10", className)}>{children}</div>
    </div>
  );
};
