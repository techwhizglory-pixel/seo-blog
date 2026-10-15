export const SITE = {
  name: "Garuba",
  description: "A practice blog for learning SEO: every page is built to be crawled, indexed and shared properly.",
  url: (process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000").replace(/\/$/, ""),
  author: "Judah glory",
  locale: "en_US",
};
