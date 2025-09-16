"use client";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

import { ReactNode } from "react";
import { usePathname } from "next/navigation";
import { ScrollTrigger, ScrollSmoother } from "gsap/all";

gsap.registerPlugin(useGSAP, ScrollTrigger, ScrollSmoother);

export function GSAPProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  useGSAP(
    () => {
      ScrollSmoother.create({
        smooth: 1.25,
        effects: true,
        smoothTouch: 0.1,
      });
    },
    {
      dependencies: [pathname],
      revertOnUpdate: true,
    }
  );
  return (
    <div id="smooth-wrapper">
      <div id="smooth-content">{children}</div>
    </div>
  );
}
