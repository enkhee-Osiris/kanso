export const SITE_TITLE = "Kanso";
export const SITE_DESCRIPTION = "A minimal writing theme for Astro";

const BASE = import.meta.env.BASE_URL;

// DEFAULTS
export const HOME_LATEST_WRITINGS_LIMIT = 5;
export const HOME_FEATURED_WRITINGS_LIMIT = 2;
export const AUTHOR = "Enkherdene Bolormaa";

export const URLS = {
  home: `${BASE}`,
  writings: `${BASE}writing/`,
  writing(id: string) {
    return `${BASE}writing/${id}/`;
  },
  search: `${BASE}search/`,
  about: `${BASE}about/`,
};
