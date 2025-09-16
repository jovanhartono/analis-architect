"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/app/(frontend)/components/ui/carousel";
import { useGSAP } from "@gsap/react";
import Image from "next/image";
import AutoScroll from "embla-carousel-auto-scroll";

export function ProjectMarquee({ images }: { images: string[] }) {
  return (
    <section className="w-full">
      <Carousel
        plugins={[
          AutoScroll({
            speed: 1,
            stopOnInteraction: false,
          }),
        ]}
        className="flex gap-x-4"
        opts={{
          loop: true,
          skipSnaps: true,
          dragFree: true,
        }}
      >
        <CarouselContent>
          {images.map((src, index) => (
            <CarouselItem className="basis-[400] pl-4" key={index}>
              <Image
                width={400}
                height={400}
                sizes="400w"
                alt={`image-${index}`}
                src={src}
                className="aspect-square"
              />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </section>
  );
}
