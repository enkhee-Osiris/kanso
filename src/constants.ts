const BASE = import.meta.env.BASE_URL;

const hasTrailingSlash = import.meta.env.BASE_URL.endsWith("/");

const CLEAN_BASE = hasTrailingSlash ? BASE.slice(0, -1) : BASE;
const URL_ENDING = hasTrailingSlash ? "/" : "";

export const SITE_TITLE = "Kanso";
export const SITE_DESCRIPTION = "A minimal writing theme for Astro";
export const HOME_LATEST_WRITINGS_LIMIT = 5;
export const HOME_FEATURED_WRITINGS_LIMIT = 2;
export const AUTHOR = "Enkherdene Bolormaa";

export const URLS = {
  home: `${CLEAN_BASE}`,
  writings: `${CLEAN_BASE}/writing${URL_ENDING}`,
  writing(slug: string) {
    return `${CLEAN_BASE}/writing/${slug}${URL_ENDING}`;
  },
  tags: `${CLEAN_BASE}/tag${URL_ENDING}`,
  tag(slug: string) {
    return `${CLEAN_BASE}/tag/${slug}${URL_ENDING}`;
  },
  search: `${CLEAN_BASE}/search${URL_ENDING}`,
  about: `${CLEAN_BASE}/about${URL_ENDING}`,
};
