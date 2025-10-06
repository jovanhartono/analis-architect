import { payload } from "@/app/(frontend)/lib/payload";
import { Media } from "@/payload-types";
import Image from "next/image";

export default async function GalleryPage() {
  const [{ docs: interiors }, { docs: architectures }] = await Promise.all([
    payload.find({
      collection: "interiors",
      where: {
        gallery: {
          exists: true,
        },
      },
    }),
    payload.find({
      collection: "architectures",
      where: {
        gallery: {
          exists: true,
        },
      },
    }),
  ]);

  const galleryMedia: Media[] = [
    ...(interiors.flatMap((interior) => interior.gallery) as Media[]),
    ...(architectures.flatMap(
      (architecture) => architecture.gallery
    ) as Media[]),
  ];

  return (
    <main className="margin-header padding padding-y">
      <section className="columns-1 sm:column-2 xl:columns-3 gap-2 lg:gap-4">
        {galleryMedia.map(({ id, url, width, height }, index) => (
          <Image
            key={id}
            alt={`image-${index}`}
            src={url!}
            width={width || 1000}
            height={height || 1000}
            className="break-inside-avoid mb-8"
          />
        ))}
      </section>
    </main>
  );
}
