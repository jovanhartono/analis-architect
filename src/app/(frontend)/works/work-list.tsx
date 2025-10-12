"use client";

import { isMedia, capitalize } from "@/app/(frontend)/lib/helper";
import { cn } from "@/app/(frontend)/lib/utils";
const FilterBar = dynamic(
  () => import("@/app/(frontend)/works/filter").then((m) => m.default),
  {
    ssr: false,
  }
);
import { ProjectType, Media } from "@/payload-types";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Flip } from "gsap/Flip";
import {
  ArrowRightIcon,
  ArrowUpRightIcon,
  ChevronRightIcon,
} from "lucide-react";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { useMemo, useRef, useState } from "react";

gsap.registerPlugin(Flip);

export interface Work {
  slug: string;
  title: string;
  scope: "architecture" | "interior";
  type: ProjectType;
  year: number;
  site: string;
  status: string;
  media?: Media | number;
  video?: Media | null | number;
}

export type FilterKey = "scope" | "projectType";

function WorkCard({ work }: { work: Work }) {
  const { slug, title, media, scope, status, type } = work;
  return (
    <Link
      prefetch
      href={
        scope === "architecture"
          ? `/architectures/${slug}`
          : `/interiors/${slug}`
      }
      className="group block bg-white"
    >
      <figure className="mb-4 break-inside-avoid">
        {isMedia(media) && (
          <div className="overflow-hidden rounded-xs">
            <Image
              alt={title}
              src={media.url || "https://placehold.co/600x400/png"}
              width={media.width || 600}
              height={media.height || 400}
              sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 33vw"
              className="group-hover:scale-103 group-hover:brightness-70 transition duration-500 ease-in-out"
            />
          </div>
        )}
        <figcaption className="py-2 pl-0.5 pr-2">
          <div className="flex items-baseline justify-between">
            <p className="text-lg tracking-tight leading-snug">
              {title}
              <ArrowUpRightIcon className="opacity-0 align-baseline inline ml-1 group-hover:opacity-100 transition-opacity duration-500 ease-in-out size-4" />
            </p>
            <span className="text-xs uppercase tracking-wide border-black opacity-60">
              {scope}
            </span>
          </div>
          <p className="opacity-60 leading-5 text-xs uppercase tracking-wide">
            {capitalize(status)} / {type.type}
          </p>
        </figcaption>
      </figure>
    </Link>
  );
}

export function WorkList({ works }: { works: Work[] }) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const filterRef = useRef<HTMLDivElement | null>(null);
  const q = gsap.utils.selector(containerRef);

  const [isFilterOpen, setIsFilterOpen] = useState<boolean>(false);
  const [activeFilters, setActiveFilters] = useState<Record<FilterKey, string>>(
    {
      scope: "all",
      projectType: "all",
    }
  );

  useGSAP(
    () => {
      if (filterRef.current === null) return;
      const filterQuery = gsap.utils.selector(filterRef.current);

      // Kill all ongoing animations on this element before starting new ones
      gsap.killTweensOf(filterRef.current);
      gsap.killTweensOf(filterQuery("p"));
      gsap.killTweensOf(filterQuery("button"));

      if (isFilterOpen) {
        gsap.set(filterQuery("p"), { autoAlpha: 0 });
        gsap.set(filterQuery("button"), { autoAlpha: 0 });

        gsap.to(filterRef.current, {
          autoAlpha: 1,
          height: "auto",
          duration: 0.5,
          ease: "power4.out",
        });

        gsap
          .timeline()
          .to(filterQuery("p"), {
            autoAlpha: 1,
            duration: 0.3,
            ease: "power1.in",
          })
          .to(filterQuery("button"), {
            autoAlpha: 1,
            duration: 0.3,
            ease: "power1.in",
            stagger: 0.07,
          });
      } else {
        gsap.to(filterRef.current, {
          autoAlpha: 0,
          height: 0,
          duration: 0.5,
          ease: "power4.out",
        });
      }
    },
    {
      scope: filterRef,
      dependencies: [isFilterOpen],
    }
  );

  useGSAP(
    () => {
      gsap.to(".work-item", {
        opacity: 1,
        y: 0,
        stagger: 0.08,
        duration: 0.3,
        ease: "expo.inOut",
      });
    },
    {
      scope: containerRef,
    }
  );

  const filters = useMemo(
    () => [
      {
        label: "SCOPE",
        key: "scope",
        values: [
          {
            label: "All",
            value: "all",
          },
          {
            label: "Interior",
            value: "interior",
          },
          {
            label: "Architecture",
            value: "architecture",
          },
        ],
      },
      {
        label: "PROJECT TYPE",
        key: "projectType",
        values: [
          {
            label: "All",
            value: "all",
          },
          {
            label: "Commercial",
            value: "commercial",
          },
          {
            label: "Residential",
            value: "residential",
          },
        ],
      },
    ],
    []
  );

  function handleFilterChange(key: FilterKey, value: string) {
    if (!containerRef.current) return;

    const state = Flip.getState(q(".work-item"));
    setActiveFilters((af) => ({
      ...af,
      [key]: value,
    }));

    requestAnimationFrame(() => {
      Flip.from(state, {
        duration: 0.5,
        ease: "power1.inOut",
        stagger: 0.08,
        absolute: true,
        scale: true,
        onEnter: (elements) =>
          gsap.fromTo(
            elements,
            { scale: 0.9, autoAlpha: 0 },
            {
              autoAlpha: 1,
              scale: 1,
              delay: 0.2,
              duration: 0.3,
              ease: "power1.out",
            }
          ),
        onLeave: (elements) =>
          gsap.to(elements, {
            autoAlpha: 0,
            scale: 0.9,
            duration: 0.3,
            ease: "power1.out",
          }),
      });
    });
  }

  return (
    <>
      <div className="mb-6">
        <button
          onClick={() => setIsFilterOpen(!isFilterOpen)}
          className="uppercase text-xs text-gray-500 tracking-widest inline-flex"
        >
          <span>FILTER</span>
          <ChevronRightIcon
            className={cn(
              "size-4 transition-transform duration-300 ease-in-out",
              isFilterOpen && "rotate-90"
            )}
          />
        </button>
      </div>

      <div
        ref={filterRef}
        className="gap-x-12 gap-y-1 flex-col lg:flex-row h-0 flex overflow-hidden"
      >
        {filters.map(({ key, label, values }) => (
          <div key={key} className="flex text-black mb-6 flex-col gap-y-1.5">
            <p className="tracking-widest text-gray-500 text-xs">{label}</p>
            <div className="flex items-center gap-x-4 overflow-x-auto">
              {values.map(({ label, value }) => (
                <button
                  key={value}
                  onClick={() => handleFilterChange(key as FilterKey, value)}
                  className={cn(
                    "cursor-pointer max-sm:text-sm shrink-0",
                    activeFilters[key as FilterKey] === value && "underline"
                  )}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* <FilterBar /> */}

      <section
        ref={containerRef}
        className="columns-1 sm:columns-2 xl:columns-3 gap-2 lg:gap-4 min-h-screen"
      >
        {works.map((work) => {
          const scopeMismatch =
            activeFilters.scope !== "all" && work.scope !== activeFilters.scope;

          const projectTypeMismatch =
            activeFilters.projectType !== "all" &&
            !work.type.type
              .toLowerCase()
              .includes(activeFilters.projectType.toLowerCase());

          const isHidden = scopeMismatch || projectTypeMismatch;

          return (
            <div
              key={work.slug}
              className={cn(
                "work-item block translate-y-0 opacity-0 transition-opacity duration-300",
                { hidden: isHidden }
              )}
            >
              <WorkCard work={work} />
            </div>
          );
        })}
      </section>
    </>
  );
}
