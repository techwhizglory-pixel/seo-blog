import Link from "next/link";
export const metadata = { title: "Page not found", robots: { index: false } };
export default function NotFound() {
  return (
    <>
      <h1>Page not found</h1>
      <p>That page doesn't exist. <Link href="/">Go to the home page</Link> to find a post.</p>
    </>
  );
}
