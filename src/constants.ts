export const SITE_TITLE = "Kanso";
export const SITE_DESCRIPTION = "A minimal blog theme for Astro";

const BASE = import.meta.env.BASE_URL;

export const HOME_LATEST_WRITINGS_LIMIT = 5;
export const HOME_FEATURED_WRITINGS_LIMIT = 2;

export const URLS = {
  home: `${BASE}`,
  blog: `${BASE}blog/`,
  blogPost: (id: string) => `${BASE}blog/${id}/`,
  search: `${BASE}search/`,
  about: `${BASE}about/`,
};
