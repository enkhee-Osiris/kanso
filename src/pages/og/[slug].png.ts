import type { APIRoute, GetStaticPaths } from "astro";
import type { CollectionEntry } from "astro:content";
import { getCollection } from "astro:content";

import { generateOgImage } from "@/utils/og-image";

export const getStaticPaths: GetStaticPaths = async () => {
  const writings = await getCollection("writing", (w: CollectionEntry<"writing">) => !w.data.draft);

  return writings.map((w: CollectionEntry<"writing">) => ({ params: { slug: w.id } }));
};

export const GET: APIRoute = async ({ params }) => {
  const writings = await getCollection("writing");
  const writing = writings.find((w: CollectionEntry<"writing">) => w.id === params.slug);
  if (!writing) return new Response("Not found", { status: 404 });

  const png = await generateOgImage({
    title: writing.data.title,
    pubDatetime: writing.data.pubDatetime,
    tags: writing.data.tags,
  });

  return new Response(png, {
    headers: {
      "Content-Type": "image/png",
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  });
};
