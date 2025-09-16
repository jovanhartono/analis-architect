import { CollectionConfig } from "payload";

export const Interiors: CollectionConfig = {
  slug: "interios",
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
  ],
};
