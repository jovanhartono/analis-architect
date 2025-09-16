"use client";

import { useEffect, useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Architecture, Media, ProjectType } from "@/payload-types";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/app/(frontend)/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRightIcon } from "lucide-react";

export function HomeCarousel({ items }: { items: Architecture[] }) {
  const plugin = useRef(Autoplay({ delay: 5000, stopOnInteraction: true }));

  return (
    <Carousel
      className="w-full"
      plugins={[plugin.current]}
      onMouseEnter={plugin.current.stop}
      onMouseLeave={plugin.current.reset}
      opts={{
        loop: true,
      }}
    >
      <CarouselContent
        className="w-full h-[100svh] touch-pan-x"
        style={{ willChange: "transform" }}
      >
        {items
          .filter((item) => item.gallery)
          .map((item, i) => (
            <CarouselItem key={item.id} className="relative">
              <Image
                fill
                priority={i === 0}
                quality={100}
                sizes="100vw"
                src={(item.gallery?.[0] as Media).url!}
                alt={`slide-${i}`}
                className="object-cover brightness-40"
              />
              <div className="z-10 absolute bottom-20 left-0 right-0 px-4 lg:px-10 text-white">
                <span className="font-medium ml-1 lg:absolute lg:right-10 lg:bottom-0">
                  {(item.projectType as ProjectType).type}
                </span>
                <h1 className="text-5xl lg:text-7xl tracking-tighter mt-3">
                  {item.name}
                </h1>
                <ul className="ml-1 lg:w-1/2 space-y-3 mt-3 lg:mt-6">
                  <li className="text-pretty max-lg:text-sm opacity-85">
                    {item.tagline}
                  </li>
                  <li className="font-medium">{item.site}</li>
                </ul>
              </div>
            </CarouselItem>
          ))}
      </CarouselContent>
    </Carousel>
  );
}
