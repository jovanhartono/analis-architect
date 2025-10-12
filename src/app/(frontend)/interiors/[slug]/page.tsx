import { capitalize } from "@/app/(frontend)/lib/helper";
import { payload } from "@/app/(frontend)/lib/payload";
import { ProjectMarquee } from "@/app/(frontend)/architectures/[slug]/marquee";
import { Media, ProjectType } from "@/payload-types";
import { convertLexicalToHTML } from "@payloadcms/richtext-lexical/html";
import { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const slug = (await params).slug;

  const {
    docs: [project],
  } = await payload.find({
    collection: "interiors",
    where: {
      slug: {
        equals: slug,
      },
    },
    limit: 1,
  });

  return {
    title: project.name,
  };
}

export async function generateStaticParams() {
  const { docs: interiors } = await payload.find({
    collection: "interiors",
  });

  return interiors.map(({ slug }) => ({
    slug,
  }));
}

export default async function InteriorDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const {
    docs: [project],
  } = await payload.find({
    collection: "interiors",
    where: {
      slug: {
        equals: slug,
      },
    },
    limit: 1,
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
      label: "Awards",
      value: project.award,
    },
  ].filter((item) => Boolean(item.value));

  const media = project.gallery?.filter(
    (item): item is Media => typeof item === "object"
  );

  return (
    <main>
      <section className="flex flex-col mt-[72] padding py-8 lg:py-10">
        <h1 className="heading-1">{project.name}</h1>
        <hr className="w-full border-t-gray-300 mt-8 lg:mt-6" />
      </section>

      {media?.length && <ProjectMarquee media={media} />}

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
