import { Media } from "@/payload-types";

export function capitalize(input: string): string {
  return (
    input
      // replace underscores and dashes with spaces
      .replace(/[-_]+/g, " ")
      // trim extra spaces
      .trim()
      // split into words and capitalize
      .split(/\s+/)
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ")
  );
}

export function isMedia(val: any): val is Media {
  if (typeof val !== "object") {
    return false;
  }

  return true;
}
