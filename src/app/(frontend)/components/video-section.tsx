"use client";

import { capitalize } from "@/app/(frontend)/lib/helper";
import { Work } from "@/app/(frontend)/works/work-list";
import { Media, ProjectType } from "@/payload-types";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";

gsap.registerPlugin(ScrollTrigger);
const mm = gsap.matchMedia();

export function LandingVideoSection({ works }: { works: Work[] }) {
  const sectionRef = useRef<HTMLDivElement | null>(null);

  useGSAP(() => {
    mm.add("(min-width: 1024px)", () => {
      if (!sectionRef.current) return;

      const figures = gsap.utils.toArray(
        ".figure-container",
        sectionRef.current
      );

      gsap.to(figures, {
        xPercent: -80 * (figures.length - 1),
        ease: "none",
        scrollTrigger: {
          markers: true,
          trigger: sectionRef.current,
          start: "top 72px",
          anticipatePin: 1,
          end: `+=${sectionRef.current.offsetWidth}`,
          pin: true,
          scrub: 1,
        },
      });
    });
  });

  return (
    <section
      ref={sectionRef}
      className="lg:h-[calc(100vh_-_72px)] items-stretch overflow-x-auto lg:overflow-hidden w-full grid auto-cols-[max(400px,_80%)] grid-flow-col  *:will-change-transform py-6"
    >
      {works.map((work) => (
        <figure
          key={work.slug}
          className="figure-container padding grid max-sm:grid-rows-[400px_auto] sm:grid-cols-2 sm:grid-rows-[auto_1fr] h-full"
        >
          <div className="relative h-full shrink-0 sm:row-span-2">
            <video
              autoPlay
              loop
              muted
              playsInline
              draggable="false"
              src={(work.video as Media).url!}
              className="absolute w-full h-full object-cover inset-0 rounded-xs"
            />
          </div>

          <div className="space-y-6 pt-4 px-0 sm:p-6 grid grid-rows-subgrid row-span-2">
            <h1 className="text-3xl tracking-tighter lg:text-5xl text-gray-900 max-sm:mt-auto">
              {work.title}
            </h1>
            <ul className="divide-y divide-gray-300 max-lg:text-sm">
              <li className="py-4 flex justify-between items-start gap-x-3 first:pt-1">
                <span className="opacity-70">Site</span>
                <span className="text-right">{work.site}</span>
              </li>
              <li className="py-3 flex justify-between items-start gap-x-3 first:pt-1">
                <span className="opacity-70">Project Type</span>
                <span className="text-right">{work.type.type}</span>
              </li>
              <li className="py-3 flex justify-between items-start gap-x-3 first:pt-1">
                <span className="opacity-70">Year</span>
                <span className="text-right">{work.year}</span>
              </li>
              <li className="py-3 flex justify-between items-start gap-x-3 first:pt-1">
                <span className="opacity-70">Status</span>
                <span className="text-right">{capitalize(work.status)}</span>
              </li>
            </ul>
          </div>
        </figure>
      ))}
    </section>
  );
}
