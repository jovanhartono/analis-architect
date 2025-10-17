import type { MetadataRoute } from "next";
import { siteConfig } from "./(frontend)/lib/site-config";
import { payload } from "./(frontend)/lib/payload";

const url = siteConfig.domain;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [architectures, interiors] = await Promise.all([
    payload.find({
      collection: "architectures",
      limit: 0,
    }),
    payload.find({
      collection: "interiors",
      limit: 0,
    }),
  ]);

  return [
    {
      url,
      lastModified: new Date(),
      priority: 1,
      changeFrequency: "monthly",
    },
    {
      url: `${url}/works`,
      lastModified: new Date(),
      priority: 0.9,
      changeFrequency: "monthly",
    },
    ...architectures.docs.map(({ slug, updatedAt }) => ({
      url: `${url}/architectures/${slug}`,
      lastModified: new Date(updatedAt),
      priority: 0.9,
    })),
    ...interiors.docs.map(({ slug, updatedAt }) => ({
      url: `${url}/interiors/${slug}`,
      lastModified: new Date(updatedAt),
      priority: 0.9,
    })),
    {
      url: `${url}/gallery`,
      lastModified: new Date(),
      priority: 0.7,
      changeFrequency: "monthly",
    },
  ];
}
