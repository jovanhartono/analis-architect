"use client";

import { useRef } from "react";
import { Media } from "@/payload-types";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/app/(frontend)/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";
import Link from "next/link";
import Fade from "embla-carousel-fade";

export type CarouselItem = {
  title: string;
  slug: string;
  site: string;
  tagline?: string | null;
  type: string;
  image: Media;
  workType: "architecture" | "interior";
};

// todo: can also accept interior. make a general type. normalize on Hero
export function HomeCarousel({ items }: { items: CarouselItem[] }) {
  const plugin = useRef([
    Autoplay({ delay: 5000, stopOnInteraction: false }),
    Fade(),
  ]);

  return (
    <Carousel
      className="w-full"
      plugins={plugin.current}
      opts={{
        loop: true,
        containScroll: false,
        duration: 40,
      }}
    >
      <CarouselContent className="w-full h-[100svh] will-change-transform">
        {items.map((item, i) => (
          <CarouselItem key={i} className="relative will-change-transform">
            <Link
              prefetch
              href={
                item.workType === "architecture"
                  ? `/architectures/${item.slug}`
                  : `/interiors/${item.slug}`
              }
              className="cursor-default w-full h-full block"
            >
              <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/50 z-10"></div>
              <Image
                priority={i === 0}
                fetchPriority="high"
                loading="eager"
                sizes="100vw"
                src={item.image.url!}
                width={item.image.width!}
                height={item.image.height!}
                alt={`slide-${i}`}
                className="object-cover w-full h-full"
              />
              <div className="z-10 absolute bottom-20 left-0 right-0 padding text-white">
                <span className="font-medium ml-1 lg:absolute lg:right-10 lg:bottom-0">
                  Architecture / {item.type}
                </span>
                <h1 className="text-5xl lg:text-7xl tracking-tighter mt-3">
                  {item.title}
                </h1>
                <ul className="ml-1 lg:w-1/2 space-y-3 mt-3 lg:mt-6">
                  <li className="text-pretty max-lg:text-sm opacity-85">
                    {item.tagline}
                  </li>
                  <li className="font-medium">{item.site}</li>
                </ul>
              </div>
            </Link>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}
