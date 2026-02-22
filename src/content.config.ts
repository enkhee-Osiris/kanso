import { glob } from "astro/loaders";
import { defineCollection, z } from "astro:content";

import { AUTHOR } from "./constants";

const writing = defineCollection({
  loader: glob({ base: "./src/content/writing", pattern: "**/*.{md,mdx}" }),
  schema: ({ image }) =>
    z.object({
      author: z.string().default(AUTHOR),
      pubDatetime: z.date(),
      modDatetime: z.date().optional().nullable(),
      title: z.string(),
      featured: z.boolean().optional(),
      draft: z.boolean().optional(),
      tags: z.array(z.string()).default(["others"]),
      ogImage: image().or(z.string()).optional(),
      description: z.string(),
    }),
});

export const collections = { writing };
