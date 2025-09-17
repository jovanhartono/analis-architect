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
import { GetArchitecturesReturnType } from "@/app/(frontend)/actions";

// todo: can also accept interior. make a general type. normalize on Hero
export function HomeCarousel({
  items,
}: {
  items: GetArchitecturesReturnType["docs"];
}) {
  const plugin = useRef(Autoplay({ delay: 5000, stopOnInteraction: false }));

  return (
    <Carousel
      className="w-full"
      plugins={[plugin.current]}
      opts={{
        loop: true,
        duration: 50,
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
              <Link
                prefetch
                href={`/architectures/${item.id}`}
                className="cursor-default w-full h-full block"
              >
                <Image
                  priority={i === 0}
                  sizes="100vw"
                  src={(item.gallery?.[0] as Media).url!}
                  width={(item.gallery?.[0] as Media).width!}
                  height={(item.gallery?.[0] as Media).height!}
                  alt={`slide-${i}`}
                  className="object-cover brightness-40 w-full h-full"
                />
                <div className="z-10 absolute bottom-20 left-0 right-0 padding text-white">
                  <span className="font-medium ml-1 lg:absolute lg:right-10 lg:bottom-0">
                    Architecture / {(item.projectType as ProjectType).type}
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
              </Link>
            </CarouselItem>
          ))}
      </CarouselContent>
    </Carousel>
  );
}
