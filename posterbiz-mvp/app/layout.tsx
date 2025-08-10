export const metadata = {
  title: "PosterBiz MVP",
  description: "Create, catalog, and sell poster illustrations.",
};

import "./globals.css";
import Link from "next/link";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <div className="container">
          <nav className="nav">
            <div className="brand">PosterBiz</div>
            <Link href="/">Dashboard</Link>
            <Link href="/create">Create</Link>
            <Link href="/catalog">Catalog</Link>
            <Link href="/subscriptions">Subscriptions</Link>
            <Link href="/analytics">Analytics</Link>
          </nav>
          {children}
        </div>
      </body>
    </html>
  );
}
