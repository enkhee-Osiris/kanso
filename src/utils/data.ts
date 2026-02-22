import type { CollectionEntry } from "astro:content";

type Blog = CollectionEntry<"blog">;

function byDateDesc(a: Blog, b: Blog) {
  return b.data.pubDate.valueOf() - a.data.pubDate.valueOf();
}

export function getFeaturedBlogs(blogs: Blog[], limit?: number) {
  const filtered = blogs.filter(b => b.data.featured).sort(byDateDesc);

  return limit ? filtered.slice(0, limit) : filtered;
}

export function getNonFeaturedBlogs(blogs: Blog[], limit?: number) {
  const filtered = blogs.filter(b => !b.data.featured).sort(byDateDesc);

  return limit ? filtered.slice(0, limit) : filtered;
}

export function getTagsWithBlogs(blogs: Blog[]) {
  const tagMap = new Map<string, Blog[]>();

  for (const blog of blogs) {
    if (blog.data.tags === undefined || blog.data.tags.length === 0) return;

    for (const tag of blog.data.tags) {
      if (!tagMap.has(tag)) {
        tagMap.set(tag, []);
      }

      tagMap.get(tag)!.push(blog);
    }
  }

  return Array.from(tagMap, ([tag, blogs]) => ({ tag, blogs }));
}
