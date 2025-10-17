import {
  DefaultNodeTypes,
  SerializedBlockNode,
} from "@payloadcms/richtext-lexical";
import { JSXConvertersFunction } from "@payloadcms/richtext-lexical/react";
import { GalleryBlock } from "./gallery-block";
import { GalleryBlock as GalleryBlockType } from "@/payload-types";

type NodeTypes = DefaultNodeTypes | SerializedBlockNode<GalleryBlockType>;

export const jsxConverters: JSXConvertersFunction<NodeTypes> = ({
  defaultConverters,
}) => ({
  ...defaultConverters,
  blocks: {
    gallery: ({ node }) => {
      return <GalleryBlock {...node.fields} />;
    },
  },
});
