import { capitalize } from "@/app/(frontend)/lib/helper";
import { payload } from "@/app/(frontend)/lib/payload";
import { ProjectMarquee } from "@/app/(frontend)/projects/[id]/marquee";
import { Media, ProjectType } from "@/payload-types";
import { convertLexicalToMarkdown } from "@payloadcms/richtext-lexical";
import { convertLexicalToHTML } from "@payloadcms/richtext-lexical/html";

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const project = await payload.findByID({
    collection: "architectures",
    id,
  });

  const html = convertLexicalToHTML({ data: project.description });

  const list = [
    {
      label: "Status",
      value: capitalize(project.status),
    },
    {
      label: "Project Type",
      value: (project.projectType as ProjectType).type,
    },
    {
      label: "Year",
      value: project.year,
    },
    {
      label: "Site",
      value: project.site,
    },
    {
      label: "Site Area",
      value: project.siteArea,
    },
    {
      label: "Building Area",
      value: project.buildingArea,
    },
    {
      label: "Awards",
      value: project.award,
    },
  ].filter((item) => Boolean(item.value));

  const images =
    project.gallery
      ?.filter((item): item is Media => typeof item === "object")
      .map((image) => image.url)
      .filter((url): url is string => Boolean(url)) ?? [];

  return (
    <main>
      <section className="flex flex-col mt-[72] padding py-8 lg:py-10">
        <h1 className="heading-1">{project.name}</h1>
        <p className="mt-3 opacity-70 ml-1 max-w-[65ch] lg:max-w-[80ch]">
          {project.tagline}
        </p>
        <hr className="w-full border-t-gray-300 mt-8 lg:mt-6" />
      </section>

      {images.length > 0 && <ProjectMarquee images={images} />}

      <section className="padding grid grid-cols-1 lg:grid-cols-3 lg:gap-x-10 gap-y-4 pt-4 lg:pt-10">
        <div className="col-span-1">
          <ul className="divide-y divide-gray-300 max-lg:text-sm">
            {list.map((item, idx) => (
              <li
                key={idx}
                className="py-3 flex justify-between items-start gap-x-3 first:pt-1"
              >
                <span className="opacity-70">{item.label}</span>
                <span className="text-right">{item.value}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="col-span-2">
          <article
            className="prose prose-p:text-black [&_>_div_>_*]:first:mt-0"
            dangerouslySetInnerHTML={{ __html: html }}
          />
        </div>
      </section>
    </main>
  );
}
