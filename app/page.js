import Link from "next/link";
import { getAllPosts } from "@/lib/posts";
import { SITE } from "@/lib/site";

export default function Home() {
  const posts = getAllPosts();
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE.name,
    url: SITE.url,
    description: SITE.description,
  };
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <h1>Practical SEO, tested in public</h1>
      <p className="lede">{SITE.description}</p>
      <ul className="posts">
        {posts.map((p) => (
          <li key={p.slug}>
            <h2><Link href={`/blog/${p.slug}`}>{p.title}</Link></h2>
            <p>{p.description}</p>
            <time dateTime={p.date}>{new Date(p.date).toLocaleDateString("en-US", { dateStyle: "long" })}</time>
          </li>
        ))}
      </ul>
    </>
  );
}
