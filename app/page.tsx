import { SkinHomePage } from "@/components/site/skin-home";
import { WikiHomePage } from "@/components/site/wiki-home-page";
import { siteSkin } from "@/config/skin";
import { homePage } from "@/content/home";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata(homePage);

export default function HomePage() {
  if (siteSkin() === "wiki") return <WikiHomePage />;
  return <SkinHomePage />;
}
