import { BookOpen, ExternalLink, Gamepad2 } from "lucide-react";
import Link from "next/link";
import { NativeAdSlot } from "@/components/integrations/native-ad-slot";
import { Faq } from "@/components/site/faq";
import { JsonLd } from "@/components/site/json-ld";
import { PageSections } from "@/components/site/page-sections";
import { siteConfig } from "@/config/site";
import { siteSkin } from "@/config/skin";
import { homePage } from "@/content/home";
import { visibleCorePages } from "@/content/registry";
import { homeSchemas } from "@/lib/schema";
import { assetPath, routePath } from "@/lib/urls";

function Cover({ className }: { className: string }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={assetPath(siteConfig.assets.cover)}
      alt={`Anime Dice Roblox thumbnail showing a player rolling a die next to a rare anime character`}
      className={className}
    />
  );
}

function Actions() {
  return (
    <div className="mt-6 flex flex-wrap gap-3">
      {homePage.hero.primaryLink ? (
        <Link href={routePath(homePage.hero.primaryLink.slug)} className="button-primary">
          <BookOpen size={18} />{homePage.hero.primaryLink.label}
        </Link>
      ) : null}
      {siteConfig.game.officialUrl && homePage.hero.secondaryLink ? (
        <a href={siteConfig.game.officialUrl} rel="noopener noreferrer" className="button-secondary">
          <Gamepad2 size={18} />{homePage.hero.secondaryLink.label}<ExternalLink size={15} />
        </a>
      ) : null}
    </div>
  );
}

export function SkinHomePage() {
  const skin = siteSkin();
  // The resource layout is the site default, so it also carries any unrecognised skin.
  const hero = skin === "resource" || skin === "portal" ? "resource" : skin;
  const pages = visibleCorePages;
  const side = pages.slice(0, 3);
  const entries = pages.slice(0, 4);

  return (
    <>
      <JsonLd data={homeSchemas(homePage)} />
      <main className={`skin-home skin-home-${skin}`}>
        {hero === "resource" ? (
          <section className="skin-resource-hero site-container">
            <div className="skin-resource-hero-copy">
              <p className="eyebrow">{homePage.hero.eyebrow}</p>
              <h1>{homePage.hero.heading}</h1>
              <p className="section-lead">{homePage.hero.lead}</p>
              <p className="skin-resource-support">{homePage.hero.supportingText}</p>
              <Actions />
              <nav className="skin-quick-links" aria-label="Anime Dice guides">
                {pages.map((page) => (
                  <Link key={page.slug} href={routePath(page.slug)}>{page.navLabel}</Link>
                ))}
              </nav>
            </div>
            <figure className="skin-resource-cover">
              <Cover className="skin-resource-cover-image" />
            </figure>
          </section>
        ) : null}

        {skin === "editorial" ? (
          <section className="site-container skin-editorial-feature">
            <article>
              <Cover className="skin-editorial-photo" />
              <p className="eyebrow">{homePage.hero.eyebrow}</p>
              <h1>{homePage.hero.heading}</h1>
              <p className="section-lead">{homePage.hero.lead}</p>
              <Actions />
            </article>
            <div>
              {side.map((page) => (
                <Link key={page.slug} href={routePath(page.slug)} className="content-card skin-side-link">
                  <strong>{page.navLabel}</strong>
                  <span>{page.description}</span>
                </Link>
              ))}
            </div>
          </section>
        ) : null}

        {skin === "glass" ? (
          <section className="site-container skin-glass-hero">
            <p className="eyebrow">{homePage.hero.eyebrow}</p>
            <h1>{homePage.hero.heading}</h1>
            <p className="section-lead">{homePage.hero.lead}</p>
            <Actions />
            <div className="skin-glass-entries">
              {entries.map((page) => (
                <Link key={page.slug} href={routePath(page.slug)} className="content-card">
                  <h2>{page.navLabel}</h2>
                  <p>{page.description}</p>
                </Link>
              ))}
            </div>
          </section>
        ) : null}

        {skin === "pixel" ? (
          <section className="site-container skin-pixel-banner">
            <Cover className="skin-pixel-photo" />
            <div>
              <p className="eyebrow">{homePage.hero.eyebrow}</p>
              <h1>{homePage.hero.heading}</h1>
              <p className="section-lead">{homePage.hero.lead}</p>
              <Actions />
            </div>
          </section>
        ) : null}

        {skin === "horror" ? (
          <section className="site-container skin-horror-hero">
            <p className="eyebrow">{homePage.hero.eyebrow}</p>
            <h1>{homePage.hero.heading}</h1>
            <p className="section-lead">{homePage.hero.lead}</p>
            <Actions />
          </section>
        ) : null}

        <div className="site-container"><NativeAdSlot /></div>
        <div className="site-container skin-home-body">
          <PageSections sections={homePage.sections} />
          {homePage.faq.length ? <Faq items={homePage.faq} /> : null}
        </div>
      </main>
    </>
  );
}
