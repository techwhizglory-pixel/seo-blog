import Link from "next/link";
import { Source_Serif_4 } from "next/font/google";
import { SITE } from "@/lib/site";
import "./globals.css";

const serif = Source_Serif_4({ subsets: ["latin"], display: "swap" });

export const metadata = {
  metadataBase: new URL(SITE.url),
  title: { default: `${SITE.name}: practical SEO, tested in public`, template: `%s | ${SITE.name}` },
  description: SITE.description,
  alternates: { canonical: "/" },
  openGraph: { siteName: SITE.name, locale: SITE.locale, type: "website" },
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true, googleBot: { "max-image-preview": "large", "max-snippet": -1 } },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={serif.className}>
      <body>
        <a className="skip" href="#main">Skip to content</a>
        <header className="site-header">
          <Link href="/" className="brand">{SITE.name}</Link>
        </header>
        <main id="main">{children}</main>
        <footer className="site-footer">© {new Date().getFullYear()} {SITE.author}</footer>
      </body>
    </html>
  );
}
