import { Suspense } from "react";
import {
  CarouselItem,
  HomeCarousel,
} from "@/app/(frontend)/components/home-carousel";
import { getArchitectures } from "@/app/(frontend)/actions";
import { payload } from "@/app/(frontend)/lib/payload";
import { Media, ProjectType } from "@/payload-types";
import { LandingVideoSection } from "@/app/(frontend)/components/video-section";
import { transformToWork } from "@/app/(frontend)/lib/utils";

async function Hero() {
  const [architectures, interiors] = await Promise.all([
    getArchitectures(),
    payload.find({
      collection: "interiors",
      where: {
        gallery: {
          exists: true,
        },
      },
    }),
  ]);

  const items: CarouselItem[] = [];

  for (const architecture of architectures.docs) {
    if (!architecture.gallery) {
      continue;
    }

    items.push({
      title: architecture.name,
      tagline: architecture.tagline,
      slug: architecture.slug,
      site: architecture.site,
      image: architecture.gallery[0] as Media,
      type: (architecture.projectType as ProjectType).type,
      workType: "architecture",
    });
  }

  for (const interior of interiors.docs) {
    if (!interior.gallery) {
      continue;
    }

    items.push({
      title: interior.name,
      slug: interior.slug,
      site: interior.site,
      image: interior.gallery[0] as Media,
      type: (interior.projectType as ProjectType).type,
      workType: "interior",
    });
  }

  return (
    <Suspense fallback={<div className="min-h-svh w-full bg-white" />}>
      <HomeCarousel items={items} />
    </Suspense>
  );
}

async function VideoSection() {
  const [{ docs: architectures }, { docs: interiors }] = await Promise.all([
    payload.find({
      collection: "architectures",
      where: {
        video: {
          exists: true,
        },
      },
    }),
    payload.find({
      collection: "interiors",
      where: {
        video: {
          exists: true,
        },
      },
    }),
  ]);

  return (
    <LandingVideoSection
      works={transformToWork({ architectures, interiors })}
    />
  );
}

export default function Home() {
  return (
    <main>
      <Hero />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-y-4 gap-x-10 padding padding-y">
        <div className="shrink-0">
          <p className="text-lg">About Analis Architect</p>
        </div>
        <article className="lg:col-span-2 text-left max-w-[120ch] gap-x-10 gap-y-10 grid lg:grid-cols-2 text-balance">
          <p>
            Analis Architects is an architecture firm established in 2024, built
            on the belief that every design holds a unique story waiting to be
            told. We see architecture not merely as a building, but as a spatial
            narrative, a composition of shapes, materials, and ideas that speak
            to both people and place. Each project is an opportunity to explore
            bold concepts, deeply rooted in local context and shaped by the
            environment that surrounds it.
            <br />
            <br />
            Founded by Adrian Putra Wahono, a young aspiring architect who is
            interested in blending modern innovation with timeless aesthetics,
            and after gaining valuable experience at the renowned KThengono
            Design Studio, Analis Architects was born from a passion for
            purposeful design. Our work thrives at the intersection of
            creativity and purpose, from experimental forms to thoughtful
            details, always with a commitment to contextual relevance and
            meaningful design.
          </p>

          <p>
            Sustainability and innovation are at the heart of what we do. We
            explore innovative, contextual solutions that embrace natural
            elements and local culture, striving for designs that are
            environmentally responsible and culturally meaningful. Whether
            it&apos;s a compact urban dwelling or a large-scale public facility,
            we approach each project with a fresh lens, seeking the unique story
            that wants to be told through architecture.
            <br />
            <br />
            At Analis Architects, we do not just design buildings, we shape
            experiences. Every curve, material, and space is intentional, aimed
            at creating places that inspire, connect, and endure. Allow us to
            transform your vision into reality, through architecture that
            resonates, evokes emotion, and establishes a sense of belonging.
          </p>
        </article>
      </div>

      {/* <section className="padding padding-y">
        <p className="text-xl">
          At Analis Architects, we do not just design buildings, we shape
          experiences. Every curve, material, and space is intentional, aimed at
          creating places that inspire, connect, and endure. Allow us to
          transform your vision into reality, through architecture that
          resonates, evokes emotion, and establishes a sense of belonging.
        </p>
      </section> */}

      <VideoSection />
    </main>
  );
}
