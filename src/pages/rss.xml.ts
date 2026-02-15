import rss from "@astrojs/rss";
import type { APIRoute } from "astro";
import { getCollection } from "astro:content";

import { SITE_DESCRIPTION, SITE_TITLE } from "@/constants";

export const GET: APIRoute = async context => {
  const posts = await getCollection("blog");

  return rss({
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    site: context.site!,
    items: posts.map(post => ({
      ...post.data,
      link: `/blog/${post.id}/`,
    })),
  });
};
