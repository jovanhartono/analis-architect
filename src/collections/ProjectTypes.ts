import { CollectionConfig } from "payload";

export const ProjectTypes: CollectionConfig = {
  slug: "project-types",
  labels: {
    singular: "Project Type",
    plural: "Project Types",
  },
  admin: {
    useAsTitle: "type",
  },
  fields: [
    {
      label: "Project Type",
      name: "type",
      type: "text",
      required: true,
    },
    {
      name: "description",
      type: "textarea",
    },
  ],
};
