"use client";

import { cn } from "@/lib/utils";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Icon from "./icon0.svg";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(SplitText);

const projectPreviewLinks = [
  "https://tfslhhlj4cdsasg9.public.blob.vercel-storage.com/webp/project-1-SBNCz4N340QWiOIA7I3qm7kiFi7Vzf.webp",
  "https://tfslhhlj4cdsasg9.public.blob.vercel-storage.com/webp/project-2-yVXL1mELp4CnRYJkMlTGEdEDsj67vo.webp",
  "https://tfslhhlj4cdsasg9.public.blob.vercel-storage.com/webp/project-3-GNg2MQDxe03w9awlWW3Aco1Bd91YmD.webp",
  "https://tfslhhlj4cdsasg9.public.blob.vercel-storage.com/webp/project-4-taBYboLgl1CbCBH1bU3qYfbYn39Ldz.webp",
  "https://tfslhhlj4cdsasg9.public.blob.vercel-storage.com/webp/project-5-eJeBWzysG9LsZFoklD7xyWAjQPwCj4.webp",
];

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  useGSAP(
    () => {
      gsap.to("img", {
        autoAlpha: 1,
        duration: 1,
        ease: "expo.out",
      });

      SplitText.create("h1", {
        type: "chars",
        onSplit(self) {
          gsap.set("h1", { autoAlpha: 1 });

          return gsap.from(self.chars, {
            duration: 0.75,
            autoAlpha: 0,
            stagger: 0.03,
            ease: "expo.in",
          });
        },
      });

      gsap.to(".stagger", {
        opacity: 1,
        y: 0,
        stagger: 0.1,
        delay: 1,
        ease: "power2.out",
      });
    },
    { scope: containerRef }
  );

  return (
    <main>
      <header className="z-50 fixed top-0 h-18 p-4 lg:px-10">
        <Image src={Icon} alt="header logo" className="invert size-8" />
      </header>
      <section
        ref={containerRef}
        className="flex flex-col mx-auto items-center justify-end text-white p-4 gap-y-6 relative h-[100svh] z-0"
      >
        <Image
          priority
          fill
          src="https://tfslhhlj4cdsasg9.public.blob.vercel-storage.com/project-3-Wf6G84tn1r50vjk6ReXpEEUciMkgHc.jpg"
          alt="project background z-0"
          className="brightness-50 object-cover opacity-0 invisible"
          sizes="100vw"
        />
        <div className="z-10 absolute bottom-10 left-0 right-0 px-4 lg:px-10">
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
      <section className="z-10">
        <ul className="grid grid-cols-2">
          {projectPreviewLinks.map((link, index) => (
            <li
              key={index}
              className={cn(
                "relative aspect-square w-full col-span-2 sm:col-span-1",
                {
                  "!col-span-2": index + 1 === projectPreviewLinks.length,
                }
              )}
            >
              <Image
                fill
                alt={`project-${index + 1}`}
                src={link}
                className="object-cover"
              />
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
