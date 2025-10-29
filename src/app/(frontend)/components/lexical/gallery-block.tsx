"use client";

import type { GalleryBlock as GalleryBlockProps } from "@/payload-types";
import { isMedia } from "../../lib/helper";
import Image from "next/image";
import { Carousel, CarouselContent, CarouselItem } from "../ui/carousel";
import { useImageDialog } from "../../provider/dialog-provider";

export const GalleryBlock = ({ gallery }: GalleryBlockProps) => {
  const { openDialog } = useImageDialog();

  return (
    <Carousel
      className="flex gap-x-4 w-full not-prose"
      opts={{
        dragFree: true,
      }}
    >
      <CarouselContent className="will-change-transform">
        {gallery.filter(isMedia).map((image, index) => (
          <CarouselItem
            className="basis-[min(67%,_400px)] not-first:ml-4 will-change-transform"
            key={index}
          >
            <Image
              priority={index <= 3}
              fetchPriority="high"
              loading="eager"
              width={400}
              height={400}
              sizes="400px"
              alt={`image-${index}`}
              src={image.url!}
              className="aspect-square object-cover cursor-pointer"
              onClick={() => openDialog(image)}
            />
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
};
