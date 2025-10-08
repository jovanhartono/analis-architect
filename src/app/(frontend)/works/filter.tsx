"use client";

import { useRef, useState } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { createPortal } from "react-dom";

const filters = ["All", "Architecture", "Interior"];

export default function FilterBar() {
  const containerRef = useRef<HTMLDivElement>(null);
  const highlightRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useGSAP(
    () => {
      const container = containerRef.current;
      const highlight = highlightRef.current;
      if (!container || !highlight) return;

      const buttons = gsap.utils.toArray<HTMLButtonElement>(
        "button",
        container
      );

      const moveHighlight = (index: number, animate = true) => {
        const target = buttons[index];
        const rect = target.getBoundingClientRect();
        const parentRect = container.getBoundingClientRect();

        const x = rect.left - parentRect.left;
        const width = rect.width;

        if (animate) {
          gsap.to(highlight, {
            x,
            width,
            duration: 0.4,
            ease: "power2.inOut",
          });
          gsap.to(buttons, { color: "#000", duration: 0.2 });
          gsap.to(target, { color: "#fff", duration: 0.2 });
        } else {
          gsap.set(highlight, { x, width });
          gsap.set(buttons, { color: "#000" });
          gsap.set(target, { color: "#fff" });
        }
      };

      // Move highlight when activeIndex changes
      moveHighlight(activeIndex, true);

      // On resize, recalc position
      const handleResize = () => moveHighlight(activeIndex, false);
      window.addEventListener("resize", handleResize);

      return () => {
        window.removeEventListener("resize", handleResize);
      };
    },
    { scope: containerRef, dependencies: [activeIndex] }
  );

  return createPortal(
    <div className="fixed bottom-0 left-0 right-0 z-50 flex items-center justify-center p-4">
      <div
        ref={containerRef}
        className="relative flex justify-between overflow-hidden backdrop-blur-xs bg-white/10 rounded-md w-xl border border-white/30"
      >
        <div
          ref={highlightRef}
          className="absolute top-0 left-0 h-full bg-black rounded-md z-0"
        />
        {filters.map((label, index) => (
          <button
            key={label}
            onClick={() => setActiveIndex(index)}
            className={`flex-1 py-2 text-sm z-10 transition-colors ${
              activeIndex === index ? "text-white" : "text-black"
            }`}
          >
            {label}
          </button>
        ))}
      </div>
    </div>,
    document.body
  );
}
