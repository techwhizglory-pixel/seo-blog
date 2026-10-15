# Field Notes: an SEO practice blog (Next.js)

## Run it
```bash
npm install
cp .env.example .env.local   # set NEXT_PUBLIC_SITE_URL to your real domain when deploying
npm run dev                  # http://localhost:3000
```

## Add a post
Create `content/posts/your-slug.md` with front matter: `title`, `description`, `date`, optional `updated`, `tags`. The file name becomes the URL: `/blog/your-slug`.

## What's already built in
- Unique `<title>` and meta description per page, with a title template
- Canonical URLs, Open Graph and Twitter tags
- JSON-LD structured data: WebSite, BlogPosting, BreadcrumbList
- `/sitemap.xml` and `/robots.txt` generated automatically
- Semantic HTML (one `h1`, `article`, `time`, breadcrumb nav), `lang` attribute, skip link
- Static generation (fast, fully crawlable HTML), optimized font loading, no layout shift
- 404 page marked `noindex`

## Practice checklist
1. Deploy (Vercel or Netlify), set `NEXT_PUBLIC_SITE_URL`, and verify `/sitemap.xml` and `/robots.txt` load.
2. Add the site to Google Search Console and submit the sitemap.
3. Run Lighthouse and PageSpeed Insights; aim for 90+ on SEO, Performance and Accessibility.
4. Test structured data with Google's Rich Results Test.
5. Publish one post per target keyword. Add internal links between related posts.
6. Add images with `next/image`, descriptive `alt` text and explicit dimensions.
7. Track impressions, clicks, CTR and position in Search Console; revise titles based on data.

## Good next additions
RSS feed, per-post Open Graph images, tag pages, an About page (helps E-E-A-T), and a search-friendly 301 redirect plan if URLs ever change.
