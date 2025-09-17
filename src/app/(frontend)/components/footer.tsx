import Image from "next/image";
import { memo } from "react";
import logo from "../icon1.png";
import { siteConfig } from "@/app/(frontend)/lib/site-config";
import { ArrowUpRightIcon } from "lucide-react";
import Link from "next/link";

const links = [
  {
    label: "Phone",
    href: siteConfig.link.whatsapp,
    value: siteConfig.phone_number,
  },
  {
    label: "Instagram",
    href: siteConfig.link.instagram,
    value: "analisarchitects",
  },
  {
    label: "Address",
    value: siteConfig.address,
  },
];

export const Footer = memo(function Footer() {
  return (
    <footer className="padding ">
      <div className="border-t py-4 lg:py-10 space-y-8 lg:space-y-10">
        <Link href="/" className="flex items-center gap-x-2">
          <Image
            alt="logo"
            width={32}
            height={32}
            src={logo}
            sizes="32w"
            className="size-8"
          />
          <p className="text-xl tracking-tight">Analis Architect</p>
        </Link>

        <dl className="grid grid-cols-1 lg:grid-cols-3 gap-y-3 gap-x-10">
          {links.map((item, index) => (
            <div key={index} className="space-y-1">
              <dt className="text-gray-500 text-sm tracking-tight">
                {item.label}
              </dt>
              <dd className="!text-sm text-balance">
                {item.href ? (
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-x-1"
                  >
                    <span>{item.value}</span>
                    <ArrowUpRightIcon className="size-4" />
                  </a>
                ) : (
                  <span>{item.value}</span>
                )}
              </dd>
            </div>
          ))}
        </dl>

        <div>
          <small className="text-gray-500">
            &copy;2025 Analis Architect. All right reserved.
          </small>
        </div>
      </div>
    </footer>
  );
});
