"use client";

import { useRef, useState, useEffect } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/app/(frontend)/components/ui/carousel";
import Image from "next/image";
import AutoScroll from "embla-carousel-auto-scroll";
import { XIcon } from "lucide-react";
import { Media } from "@/payload-types";

export function ProjectMarquee({ media }: { media: Media[] }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [selectedMedia, setSelectedMedia] = useState<Media | null>(null);
  const [imageLoaded, setImageLoaded] = useState(false);

  const openDialog = (image: Media) => {
    setSelectedMedia(image);
    setImageLoaded(false);
    const dialog = dialogRef.current;
    if (dialog) {
      dialog.showModal();
      // Trigger animation
      requestAnimationFrame(() => {
        dialog.classList.add("dialog-open");
      });
    }
  };

  const closeDialog = () => {
    const dialog = dialogRef.current;
    if (dialog) {
      dialog.classList.remove("dialog-open");
      // Wait for animation to complete before closing
      setTimeout(() => {
        dialog.close();
        setSelectedMedia(null);
        setImageLoaded(false);
      }, 200);
    }
  };

  // Listen for dialog close event (handles ESC key)
  useEffect(() => {
    const dialog = dialogRef.current;

    const handleClose = () => {
      dialog?.classList.remove("dialog-open");
      setSelectedMedia(null);
      setImageLoaded(false);
    };

    dialog?.addEventListener("close", handleClose);

    return () => {
      dialog?.removeEventListener("close", handleClose);
    };
  }, []);

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

      {/* Native HTML Dialog */}
      <dialog
        ref={dialogRef}
        className="backdrop:bg-black/90 backdrop:backdrop-blur-sm bg-transparent opacity-0 scale-95 transition-all duration-200 ease-out [&.dialog-open]:opacity-100 [&.dialog-open]:scale-100 m-auto outline-none z-50 p-0 max-w-screen-xl"
        onClick={(e) => {
          if (e.target === dialogRef.current) closeDialog();
        }}
      >
        {selectedMedia && (
          <div className="relative flex items-center justify-center">
            <button
              type="button"
              onClick={closeDialog}
              className="absolute top-3 right-3 flex items-center justify-center size-6 rounded-full cursor-pointer z-10 bg-white"
            >
              <XIcon className="text-gray-700 size-4" />
            </button>

            <Image
              alt="preview"
              src={selectedMedia.url!}
              width={selectedMedia.width || 1000}
              height={selectedMedia.height || 1000}
              sizes="(max-width: 1024px) 100vw, 1440w"
              draggable="false"
              className={`transition-all duration-300 object-contain max-w-[min(1440px,_calc(100vw_-_32px))] max-h-[95vh] ease-out ${
                imageLoaded ? "opacity-100" : "opacity-0"
              }`}
              onLoad={() => setImageLoaded(true)}
            />
          </div>
        )}
      </dialog>
    </section>
  );
}
