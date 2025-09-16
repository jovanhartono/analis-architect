"use client";

import Image from "next/image";
import Icon from "../icon0.svg";
import { useDebounce, useWindowScroll } from "@uidotdev/usehooks";
import { memo, useMemo } from "react";
import { cn } from "@/app/(frontend)/lib/utils";
import Link from "next/link";

export const Header = memo(function Header() {
  const [{ y }] = useWindowScroll();
  const debouncedHeight = useDebounce(y, 200);

  const invertColor = useMemo(() => {
    if (debouncedHeight === null) return true;

    return debouncedHeight <= 25;
  }, [debouncedHeight]);

  return (
    <header
      className={cn(
        "z-50 fixed top-0 h-18 p-4 lg:px-10 inset-x-0 bg-white transition-colors duration-200 ease-in-out flex items-center text-black",
        invertColor && "bg-transparent text-white"
      )}
    >
      <Image
        priority
        unoptimized
        src={Icon}
        alt="header logo"
        className={cn(
          "size-8 transition duration-200 ease-in-out cursor-pointer",
          {
            invert: invertColor,
          }
        )}
      />

      <nav className="ml-auto space-x-4 font-medium tracking-widest uppercase text-xs">
        <Link prefetch href="/projects" className="cursor-pointer">
          Projects
        </Link>
        <Link prefetch href="/gallery" className="cursor-pointer">
          Gallery
        </Link>
      </nav>
    </header>
  );
});
