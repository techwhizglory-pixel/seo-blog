import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

const DIR = path.join(process.cwd(), "content", "posts");

export function getAllPosts() {
  return fs
    .readdirSync(DIR)
    .filter((f) => f.endsWith(".md"))
    .map((f) => {
      const slug = f.replace(/\.md$/, "");
      const { data, content } = matter(fs.readFileSync(path.join(DIR, f), "utf8"));
      return { slug, ...data, date: String(data.date), updated: data.updated ? String(data.updated) : null, wordCount: content.split(/\s+/).length };
    })
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export async function getPost(slug) {
  const file = path.join(DIR, `${slug}.md`);
  if (!fs.existsSync(file)) return null;
  const { data, content } = matter(fs.readFileSync(file, "utf8"));
  const processed = await remark().use(html).process(content);
  return {
    slug,
    ...data,
    date: String(data.date),
    updated: data.updated ? String(data.updated) : null,
    wordCount: content.split(/\s+/).length,
    html: processed.toString(),
  };
}
