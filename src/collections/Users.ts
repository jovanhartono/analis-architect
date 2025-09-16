import type { CollectionConfig } from "payload";

export const Users: CollectionConfig = {
  slug: "users",
  admin: {
    useAsTitle: "username",
  },
  access: {
    create: ({ req }) => req.user?.id.toString() === process.env.ROOT_USERNAME,
  },
  auth: {
    loginWithUsername: true,
  },
  fields: [],
};
