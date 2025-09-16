"use client";

import Image from "next/image";
import Icon from "../icon0.svg";
import { useDebounce, useWindowScroll } from "@uidotdev/usehooks";
import { memo, useMemo } from "react";
import { cn } from "@/app/(frontend)/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const Header = memo(function Header() {
  const [{ y }] = useWindowScroll();
  const debouncedHeight = useDebounce(y, 200);
  const pathname = usePathname();

  const invertColor = useMemo(() => {
    if (pathname !== "/") return false;
    if (debouncedHeight === null) return true;

    return debouncedHeight <= 25;
  }, [debouncedHeight, pathname]);

  return (
    <header
      className={cn(
        "z-50 fixed top-0 h-18 padding inset-x-0 bg-white transition-colors duration-400 ease-in-out flex items-center text-black",
        invertColor && "bg-transparent text-white"
      )}
    >
      <Link href="/">
        <Image
          priority
          unoptimized
          src={Icon}
          alt="logo"
          className={cn(
            "size-8 transition duration-400 ease-in-out cursor-pointer",
            {
              invert: invertColor,
            }
          )}
        />
      </Link>

      <nav className="ml-auto space-x-4 font-medium tracking-widest uppercase text-xs [&_>_a]:hover:font-medium">
        <Link prefetch href="/projects" className="cursor-pointer">
          Works
        </Link>
        <Link prefetch href="/gallery" className="cursor-pointer">
          Gallery
        </Link>
      </nav>
    </header>
  );
});
