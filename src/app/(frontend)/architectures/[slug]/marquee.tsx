"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/app/(frontend)/components/ui/carousel";
import Image from "next/image";
import AutoScroll from "embla-carousel-auto-scroll";
import { Media } from "@/payload-types";
import { useImageDialog } from "../../provider/dialog-provider";

export function ProjectMarquee({ media }: { media: Media[] }) {
  const { openDialog } = useImageDialog();

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
          align: "start",
          loop: true,
          dragFree: true,
        }}
      >
        <CarouselContent className="will-change-transform">
          {media.map((image, index) => (
            <CarouselItem
              className="basis-[min(67%,_400px)] pl-4 will-change-transform"
              key={index}
            >
              <Image
                priority={index <= 3}
                fetchPriority="high"
                loading="eager"
                width={400}
                height={400}
                sizes="400w"
                alt={`image-${index}`}
                src={image.url!}
                className="aspect-square object-cover cursor-pointer"
                onClick={() => openDialog(image)}
              />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </section>
  );
}
