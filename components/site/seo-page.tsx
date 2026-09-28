import type { SeoPageDefinition } from "@/config/types";
import { siteSkin } from "@/config/skin";
import { SkinSeoPage } from "./skin-seo-page";
import { WikiSeoPage } from "./wiki-seo-page";

export function SeoPage({ page }: { page: SeoPageDefinition }) {
  if (siteSkin() === "wiki") return <WikiSeoPage page={page} />;
  return <SkinSeoPage page={page} />;
}
