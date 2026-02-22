import type { CollectionEntry } from "astro:content";

type Writing = CollectionEntry<"writing">;

function byDateDesc(a: Writing, b: Writing) {
  return b.data.pubDatetime.valueOf() - a.data.pubDatetime.valueOf();
}

export function getWritings(writings: Writing[]) {
  return [...writings].sort(byDateDesc);
}

export function getFeaturedWritings(writings: Writing[], limit?: number) {
  const filtered = writings.filter(b => b.data.featured).sort(byDateDesc);

  return limit ? filtered.slice(0, limit) : filtered;
}

export function getNonFeaturedWritings(writings: Writing[], limit?: number) {
  const filtered = writings.filter(b => !b.data.featured).sort(byDateDesc);

  return limit ? filtered.slice(0, limit) : filtered;
}

export function getTagsWithWritings(writings: Writing[]) {
  const tagMap = new Map<string, Writing[]>();

  for (const writing of writings) {
    if (writing.data.tags === undefined || writing.data.tags.length === 0) continue;

    for (const tag of writing.data.tags) {
      if (!tagMap.has(tag)) {
        tagMap.set(tag, []);
      }

      tagMap.get(tag)!.push(writing);
    }
  }

  return Array.from(tagMap, ([tag, writings]) => ({ tag, writings }));
}
