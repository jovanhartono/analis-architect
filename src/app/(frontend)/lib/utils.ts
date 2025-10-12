import { Work } from "@/app/(frontend)/works/work-list";
import { Architecture, Interior, ProjectType } from "@/payload-types";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function transformToWork({
  architectures,
  interiors,
}: {
  architectures: Architecture[];
  interiors: Interior[];
}) {
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
      scope: "architecture",
      video: architecture.video,
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
      scope: "interior",
      video: interior.video,
    });
  }

  return works;
}
