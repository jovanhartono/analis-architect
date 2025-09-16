// "use client";

import { cn } from "@/app/(frontend)/lib/utils";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import { Suspense } from "react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import { payload } from "@/app/(frontend)/lib/payload";
import { HomeCarousel } from "@/app/(frontend)/components/home-carousel";

gsap.registerPlugin(SplitText);

export default function Home() {
  // const containerRef = useRef<HTMLDivElement>(null);
  // useGSAP(
  //   () => {
  //     gsap.to("img", {
  //       autoAlpha: 1,
  //       duration: 1,
  //       ease: "expo.out",
  //     });

  //     SplitText.create("h1", {
  //       type: "chars",
  //       onSplit(self) {
  //         gsap.set("h1", { autoAlpha: 1 });

  //         return gsap.from(self.chars, {
  //           duration: 0.75,
  //           autoAlpha: 0,
  //           stagger: 0.03,
  //           ease: "expo.in",
  //         });
  //       },
  //     });

  //     gsap.to(".stagger", {
  //       opacity: 1,
  //       y: 0,
  //       stagger: 0.1,
  //       delay: 1,
  //       ease: "power2.out",
  //     });
  //   },
  //   { scope: containerRef }
  // );

  return (
    <main>
      <Hero />
      <section
        // ref={containerRef}
        className="flex flex-col mx-auto items-center justify-end text-white p-4 gap-y-6 relative h-[100svh] z-0"
      >
        <div className="z-10 absolute bottom-10 left-0 right-0 padding">
          <h1 className="text-4xl lg:text-7xl tracking-tighter opacity-0 invisible">
            Under Construction
          </h1>
          <div className="flex flex-col gap-y-1 mt-6">
            <p className="stagger translate-y-4 opacity-0">
              You can reach us at
            </p>
            <ul className="space-y-0.5 *:opacity-0 *:translate-y-4">
              <li className="stagger">
                Whatsapp:&nbsp;
                <a
                  href="https://api.whatsapp.com/send?phone=6287779119390"
                  target="_blank"
                  className="underline underline-offset-2"
                  rel="noopener noreferrer"
                >
                  087779119390
                </a>
              </li>
              <li className="stagger">
                Instagram:&nbsp;
                <a
                  href="https://www.instagram.com/analisarchitects"
                  target="_blank"
                  className="underline underline-offset-2"
                  rel="noopener noreferrer"
                >
                  analisarchitects
                </a>
              </li>
              <li className="stagger text-balance">
                Address : Ruko Elang Laut Boulevard Blok D No.60, Pantai Indah
                Kapuk, Jakarta Utara, Indonesia
              </li>
              <li className="stagger">
                Our&nbsp;
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://drive.google.com/file/d/1R8QgMq3zsDCP_vs7WoLfZuaUSoLBXXcG/view"
                  className="underline underline-offset-2 inline-flex gap-x-1 items-center"
                >
                  Portfolio <ArrowUpRight className="size-4" />
                </a>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </main>
  );
}

export async function Hero() {
  const architectures = await payload.find({
    collection: "architectures",
    pagination: false,
    where: {
      gallery: {
        exists: true,
      },
    },
  });

  return (
    <Suspense>
      <HomeCarousel items={architectures.docs} />
    </Suspense>
  );
}
