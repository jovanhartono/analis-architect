import { formatSlug } from "@/app/(frontend)/lib/helper";
import { CollectionConfig } from "payload";

export const Architectures: CollectionConfig = {
  slug: "architectures",
  labels: {
    singular: "Architecture",
    plural: "Architectures",
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
        beforeChange: [
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
      type: "row",
      fields: [
        { name: "site", type: "text", required: true },
        {
          label: "Site Area",
          name: "siteArea",
          type: "text",
          required: true,
          admin: {
            placeholder: "e.g. 14.954 sqm",
          },
        },
        {
          name: "buildingArea",
          type: "text",
          required: true,
          admin: {
            placeholder: "e.g. 14.954 sqm",
          },
        },
      ],
    },
    { name: "tagline", type: "textarea" },
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
};
