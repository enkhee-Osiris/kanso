import rss from "@astrojs/rss";
import type { APIRoute } from "astro";
import { getCollection } from "astro:content";

import { SITE_DESCRIPTION, SITE_TITLE } from "@/constants";
import { getSortedWritings } from "@/utils/data";

export const GET: APIRoute = async context => {
  const allWritings = await getCollection("writing");

  const sortedWritings = getSortedWritings(allWritings);

  return rss({
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    site: context.site!,
    items: sortedWritings.map(writing => ({
      ...writing.data,
      link: `/writing/${writing.id}/`,
    })),
  });
};
