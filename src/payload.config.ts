import { vercelPostgresAdapter } from "@payloadcms/db-vercel-postgres";
import { lexicalEditor, BlocksFeature } from "@payloadcms/richtext-lexical";
import path from "path";
import { Block, buildConfig } from "payload";
import { fileURLToPath } from "url";
import sharp from "sharp";
import { vercelBlobStorage } from "@payloadcms/storage-vercel-blob";

import { Users } from "./collections/Users";
import { Media } from "./collections/Media";
import CompanyInfo from "@/globals/Company";
import { Architectures } from "@/collections/Architectures";
import { ProjectTypes } from "@/collections/ProjectTypes";
import { Interiors } from "@/collections/Interiors";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export const GalleryBlock: Block = {
  slug: "gallery", // required
  interfaceName: "GalleryBlock",
  fields: [
    {
      name: "gallery",
      type: "upload",
      hasMany: true,
      required: true,
      relationTo: "media",
    },
  ],
};

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  globals: [CompanyInfo],
  collections: [Users, Media, Architectures, Interiors, ProjectTypes],
  editor: lexicalEditor({
    features: ({ defaultFeatures }) => [
      ...defaultFeatures,
      BlocksFeature({
        blocks: [GalleryBlock],
      }),
    ],
  }),
  secret: process.env.PAYLOAD_SECRET || "",
  typescript: {
    outputFile: path.resolve(dirname, "payload-types.ts"),
  },
  db: vercelPostgresAdapter({
    migrationDir: "./src/migrations",
    pool: {
      connectionString: process.env.POSTGRES_URL || "",
    },
  }),
  sharp,
  plugins: [
    vercelBlobStorage({
      enabled: true, // Optional, defaults to true
      // Specify which collections should use Vercel Blob
      collections: {
        media: {
          disablePayloadAccessControl: true,
        },
      },
      // Token provided by Vercel once Blob storage is added to your Vercel project
      token: process.env.BLOB_READ_WRITE_TOKEN,
      clientUploads: true,
    }),
  ],
});
