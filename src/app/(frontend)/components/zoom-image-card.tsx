"use client";
import { useRef } from "react";
import { createPortal } from "react-dom";
import gsap from "gsap";
import Flip from "gsap/Flip";

gsap.registerPlugin(Flip);

export function ZoomableItem({
  src = "https://placehold.co/600x400",
  alt = "anything",
}) {
  const thumbRef = useRef<HTMLDivElement>(null);
  const detailRef = useRef<HTMLDivElement>(null);
  const detailImgRef = useRef<HTMLImageElement>(null);

  const open = () => {
    if (!thumbRef.current || !detailRef.current || !detailImgRef.current)
      return;

    detailImgRef.current.src = src;

    detailImgRef.current.onload = () => {
      Flip.fit(detailRef.current!, thumbRef.current!, {
        scale: true,
        fitChild: detailImgRef.current!,
      });

      const state = Flip.getState(detailRef.current!);

      gsap.set(detailRef.current!, { clearProps: true });
      gsap.set(detailRef.current!, {
        xPercent: -50,
        yPercent: -50,
        top: "50%",
        visibility: "visible",
        overflow: "hidden",
      });

      Flip.from(state, {
        duration: 0.6,
        ease: "power2.inOut",
        scale: true,
        onComplete: () => {
          detailRef.current!.style.overflow = "auto";
        },
      });
    };
  };

  const close = () => {
    if (!thumbRef.current || !detailRef.current || !detailImgRef.current)
      return;

    detailRef.current.style.overflow = "hidden";

    const state = Flip.getState(detailRef.current!);
    Flip.fit(detailRef.current!, thumbRef.current!, {
      scale: true,
      fitChild: detailImgRef.current!,
    });

    Flip.from(state, {
      duration: 0.6,
      ease: "power2.inOut",
      scale: true,
      onComplete: () => {
        gsap.set(detailRef.current!, { visibility: "hidden" });
      },
    });
  };

  return (
    <>
      {/* Thumbnail in normal layout */}
      <div
        ref={thumbRef}
        onClick={open}
        style={{ width: 200, cursor: "pointer" }}
        className="margin-header"
      >
        <img src={src} alt={alt} className="w-full" />
      </div>

      {/* Portal for detail dialog */}
      {createPortal(
        <div
          ref={detailRef}
          className="fixed invisible left-1/2 z-[99999] bg-white/70 flex flex-col h-screen w-full max-w-screen-xl p-4"
          onClick={close}
        >
          <img ref={detailImgRef} alt={alt} className="w-xl mx-auto" />
        </div>,
        document.body
      )}
    </>
  );
}
