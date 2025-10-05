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

export function ProjectMarquee({ images }: { images: string[] }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [imageLoaded, setImageLoaded] = useState(false);

  const openDialog = (src: string) => {
    setSelectedImage(src);
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
        setSelectedImage(null);
        setImageLoaded(false);
      }, 200);
    }
  };

  // Listen for dialog close event (handles ESC key)
  useEffect(() => {
    const dialog = dialogRef.current;

    const handleClose = () => {
      dialog?.classList.remove("dialog-open");
      setSelectedImage(null);
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
          {images.map((src, index) => (
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
                src={src}
                className="aspect-square object-cover cursor-pointer"
                onClick={() => openDialog(src)}
              />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      {/* Native HTML Dialog */}
      <dialog
        ref={dialogRef}
        className="backdrop:bg-black/50 border-none overflow-hidden bg-white/90 opacity-0 scale-95 transition-all duration-200 ease-out [&.dialog-open]:opacity-100 [&.dialog-open]:scale-100 m-auto outline-none rounded-md"
        onClick={(e) => {
          if (e.target === dialogRef.current) closeDialog();
        }}
      >
        {selectedImage && (
          <div className="relative w-[90vw] h-[90vh] max-w-screen-lg p-4">
            <button
              type="button"
              onClick={closeDialog}
              className="absolute top-4 right-4 bg-white/90 flex items-center justify-center size-8 rounded-full cursor-pointer z-10 hover:bg-white/70 transition-colors"
            >
              <XIcon className="text-gray-700" />
            </button>

            {/* Loading skeleton */}
            {!imageLoaded && (
              <div className="absolute inset-0 bg-gray-200 animate-pulse rounded-lg" />
            )}

            <div className="relative h-full w-full rounded-md overflow-hidden">
              <Image
                fill
                sizes="1024w"
                src={selectedImage}
                alt="preview"
                className={`object-contain rounded-lg transition-all duration-300 ease-out ${
                  imageLoaded ? "opacity-100" : "opacity-0"
                }`}
                onLoad={() => setImageLoaded(true)}
              />
            </div>
          </div>
        )}
      </dialog>
    </section>
  );
}
