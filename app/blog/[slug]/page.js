import { notFound } from "next/navigation";
import Link from "next/link";
import { getAllPosts, getPost } from "@/lib/posts";
import { SITE } from "@/lib/site";

export function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return {};
  const url = `/blog/${slug}`;
  return {
    title: post.title,
    description: post.description,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      url,
      title: post.title,
      description: post.description,
      publishedTime: post.date,
      modifiedTime: post.updated || post.date,
      authors: [SITE.author],
      tags: post.tags,
    },
    twitter: { title: post.title, description: post.description },
  };
}

export default async function PostPage({ params }) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) notFound();

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      headline: post.title,
      description: post.description,
      datePublished: post.date,
      dateModified: post.updated || post.date,
      wordCount: post.wordCount,
      keywords: (post.tags || []).join(", "),
      mainEntityOfPage: `${SITE.url}/blog/${slug}`,
      author: { "@type": "Person", name: SITE.author },
      publisher: { "@type": "Organization", name: SITE.name, url: SITE.url },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: SITE.url },
        { "@type": "ListItem", position: 2, name: post.title, item: `${SITE.url}/blog/${slug}` },
      ],
    },
  ];

  return (
    <article>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <nav aria-label="Breadcrumb" className="crumbs">
        <Link href="/">Home</Link> / <span aria-current="page">{post.title}</span>
      </nav>
      <h1>{post.title}</h1>
      <p className="meta">
        By {SITE.author} on <time dateTime={post.date}>{new Date(post.date).toLocaleDateString("en-US", { dateStyle: "long" })}</time>
        {post.updated && <>, updated <time dateTime={post.updated}>{new Date(post.updated).toLocaleDateString("en-US", { dateStyle: "long" })}</time></>}
      </p>
      <div className="prose" dangerouslySetInnerHTML={{ __html: post.html }} />
    </article>
  );
}
