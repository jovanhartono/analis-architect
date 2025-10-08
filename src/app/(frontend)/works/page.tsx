import { payload } from "@/app/(frontend)/lib/payload";
import { Work, WorkList } from "@/app/(frontend)/works/work-list";
import { ProjectType } from "@/payload-types";

export default async function WorksPage() {
  const [{ docs: architectures }, { docs: interiors }] = await Promise.all([
    payload.find({
      collection: "architectures",
    }),
    payload.find({
      collection: "interiors",
    }),
  ]);

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
    });
  }

  return (
    <main className="margin-header padding padding-y">
      <WorkList works={works} />
    </main>
  );
}
