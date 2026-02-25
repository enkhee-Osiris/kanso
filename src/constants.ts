const BASE = import.meta.env.BASE_URL;
const SITE = import.meta.env.SITE;

export const FULL_URL = new URL(BASE, SITE);

const hasTrailingSlash = BASE.endsWith("/");

const CLEAN_BASE = hasTrailingSlash ? BASE.slice(0, -1) : BASE;
const URL_ENDING = hasTrailingSlash ? "/" : "";

export const SITE_TITLE = "Kanso";
export const SITE_DESCRIPTION = "A minimal writing theme for Astro";
export const HOME_LATEST_WRITINGS_LIMIT = 5;
export const HOME_FEATURED_WRITINGS_LIMIT = 2;
export const RELATED_WRITINGS_LIMIT = 5;
export const AUTHOR = "Enkherdene Bolormaa";

export const SOCIAL = {
  github: "https://github.com/enkhee-Osiris",
  linkedin: "https://linkedin.com/in/enkhee",
  email: "mailto:hello@example.com",
};

export const URLS = {
  home: `${CLEAN_BASE}/`,
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

export const TITLES = {
  home: SITE_TITLE,
  writings: "Writings",
  writing(title: string) {
    return title;
  },
  tags: "Tags",
  tag(tag: string) {
    return `Writings tagged with ${tag}`;
  },
  search: "Search",
  about: `About ${AUTHOR}`,
};

export const DESCRIPTIONS = {
  home: SITE_DESCRIPTION,
  writings: `A collection of writings on design, engineering, and code by ${AUTHOR}. Exploring ideas around minimal interfaces, thoughtful typography, and building for the web.`,
  writing(description: string) {
    return description;
  },
  tags: "Explore all tags used across writings. Each tag groups related pieces on design, engineering, CSS, and more.",
  tag(tag: string) {
    return `All writings tagged with "${tag}". Browse related thoughts and ideas on this topic.`;
  },
  search:
    "Search through all writings by title, description, or content. Find specific topics, techniques, or ideas.",
  about: `Learn more about ${AUTHOR} — the person behind ${SITE_TITLE}, their background, interests, and what drives their work.`,
};
