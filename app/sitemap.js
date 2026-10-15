import { getAllPosts } from "@/lib/posts";
import { SITE } from "@/lib/site";

export default function sitemap() {
  const posts = getAllPosts().map((p) => ({
    url: `${SITE.url}/blog/${p.slug}`,
    lastModified: new Date(p.updated || p.date),
    changeFrequency: "monthly",
    priority: 0.7,
  }));
  return [{ url: SITE.url, lastModified: new Date(), changeFrequency: "weekly", priority: 1 }, ...posts];
}
