import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { routePath } from "@/lib/urls";

export const metadata: Metadata = {
  title: "Page Not Found",
  description: `The page you requested is not part of ${siteConfig.siteName}.`,
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <main className="site-container grid min-h-[65vh] place-items-center py-20 text-center">
      <div>
        <p className="eyebrow">404 · Page not found</p>
        <h1>This Page Is Not Available</h1>
        <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-muted-foreground">
          The page may have been renamed or removed. The guides below are the best place to pick up again.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link href="/" className="button-primary"><ArrowLeft size={18} />Back to Anime Dice</Link>
          <Link href={routePath("anime-dice-codes")} className="button-secondary">Anime Dice Codes</Link>
        </div>
      </div>
    </main>
  );
}
