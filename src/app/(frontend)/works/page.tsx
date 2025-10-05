import { capitalize, isMedia } from "@/app/(frontend)/lib/helper";
import { payload } from "@/app/(frontend)/lib/payload";
import { Media, ProjectType } from "@/payload-types";
import { ArrowUpRightIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export interface Work {
  slug: string;
  title: string;
  workType: "architecture" | "interior";
  type: ProjectType;
  year: number;
  site: string;
  status: string;
  media?: Media | number;
}

function WorkCard({ work }: { work: Work }) {
  const { slug, title, media, workType, status, type } = work;
  return (
    <Link
      prefetch
      href={
        workType === "architecture"
          ? `/architectures/${slug}`
          : `/interiors/${slug}`
      }
      className="group"
    >
      <figure className="mb-4 break-inside-avoid">
        {isMedia(media) && (
          <div className="overflow-hidden rounded">
            <Image
              alt={title}
              src={media.url || "https://placehold.co/600x400/png"}
              width={media.width || 600}
              height={media.height || 400}
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
              {workType}
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

export default async function WorksPage() {
  const [arch, int] = await Promise.all([
    payload.find({
      collection: "architectures",
    }),
    payload.find({
      collection: "interiors",
    }),
  ]);
  const architectures = arch.docs;
  const interiors = int.docs;

  const works: Work[] = [];

  for (const architecture of architectures) {
    if (!architecture.gallery?.[0]) {
      continue;
    }
    works.push({
      slug: architecture.slug,
      title: architecture.name,
      type: architecture.projectType as ProjectType,
      year: architecture.year,
      site: architecture.site,
      status: architecture.status,
      media: architecture.gallery?.[0],
      workType: "architecture",
    });
  }

  for (const interior of interiors) {
    if (!interior.gallery?.[0]) {
      continue;
    }
    works.push({
      slug: interior.slug,
      title: interior.name,
      type: interior.projectType as ProjectType,
      year: interior.year,
      site: interior.site,
      status: interior.status,
      media: interior.gallery?.[0],
      workType: "interior",
    });
  }

  return (
    <main className="margin-header padding padding-y">
      <section className="columns-1 sm:column-2 xl:columns-3 gap-2 lg:gap-4">
        {works.map((work, idx) => (
          <WorkCard key={idx} work={work} />
        ))}
      </section>
    </main>
  );
}
