import { RichText } from "@payloadcms/richtext-lexical/react";
import { ComponentPropsWithoutRef } from "react";
import { jsxConverters } from "./converters";

export function RichTextLexical(
  props: ComponentPropsWithoutRef<typeof RichText>,
) {
  return (
    <RichText
      converters={jsxConverters}
      className="prose max-w-full prose-p:max-w-[65ch] prose-p:text-black [&_>_div_>_*]:first:mt-0"
      {...props}
    />
  );
}
