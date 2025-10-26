import { formatSlug } from "@/app/(frontend)/lib/helper";
import { revalidatePath } from "next/cache";
import { CollectionConfig } from "payload";

export const Interiors: CollectionConfig = {
  slug: "interiors",
  labels: {
    singular: "Interior",
    plural: "Interiors",
  },
  admin: {
    useAsTitle: "name",
  },
  fields: [
    {
      label: "Project Title",
      name: "name",
      type: "text",
      required: true,
    },
    {
      name: "slug",
      type: "text",
      required: true,
      unique: true,
      index: true,
      admin: {
        placeholder: "Will be auto-geneated based on title",
        position: "sidebar",
      },
      hooks: {
        beforeValidate: [
          ({ value, data }) => {
            if (!value && data?.name) {
              return formatSlug(data.name);
            }
            return value;
          },
        ],
      },
    },
    {
      type: "row",
      fields: [
        {
          name: "projectType",
          type: "relationship",
          relationTo: "project-types",
          required: true,
        },
        {
          name: "site",
          type: "text",
          required: true,
        },
        {
          name: "year",
          type: "number",
          required: true,
          admin: {
            placeholder: "e.g. 2020",
          },
        },
        { name: "award", type: "text" },
      ],
    },
    {
      name: "status",
      type: "radio",
      required: true,
      defaultValue: "conceptual",
      admin: {
        layout: "horizontal",
      },
      options: [
        {
          label: "Conceptual Design",
          value: "conceptual",
        },
        {
          label: "In-Preparation",
          value: "in_preparation",
        },
        {
          label: "Under Construction",
          value: "under_construction",
        },
        {
          label: "Completed",
          value: "completed",
        },
      ],
    },
    {
      name: "description",
      type: "richText",
      required: true,
      admin: {
        description: "Project long description / narrative",
      },
    },
    {
      name: "gallery",
      type: "upload",
      relationTo: "media",
      hasMany: true,
      label: "Image Gallery",
    },
    {
      label: "Video",
      type: "upload",
      name: "video",
      relationTo: "media",
      admin: { position: "sidebar" },
    },
  ],
  hooks: {
    afterOperation: [
      async ({ operation, result }) => {
        if (["create", "updateByID", "deleteByID"].includes(operation)) {
          revalidatePath("/works");
          revalidatePath("/gallery");
          revalidatePath(`/interiors/${result.slug}`);
        }
      },
    ],
  },
};
