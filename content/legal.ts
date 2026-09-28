import { integrations } from "@/config/integrations";
import { siteConfig } from "@/config/site";
import type { SeoPageDefinition } from "@/config/types";

const privacyIntegrationParagraphs: string[] = [];

if (integrations.analytics.provider === "google-analytics") {
  privacyIntegrationParagraphs.push(
    "Google Analytics 4 is enabled to understand aggregate page usage. Google may process technical visit information under its own privacy terms.",
  );
}

if (integrations.ads.provider === "adsterra-native") {
  privacyIntegrationParagraphs.push(
    "Adsterra Native advertising is enabled. Adsterra may process technical request information and applies its own privacy policy.",
  );
}

export const legalPages: SeoPageDefinition[] = [
  {
    enabled: true,
    slug: "about",
    pageType: "legal",
    navLabel: "About",
    title: "About",
    description: `How ${siteConfig.siteName} is written, where its information comes from and why it is an independent fan resource.`,
    keywords: ["about Anime Dice guide"],
    primaryKeyword: "about this game resource",
    secondaryKeywords: [],
    searchIntent: "Learn who maintains this independent resource",
    priority: "P2",
    navVisible: false,
    hero: { heading: `About ${siteConfig.siteName}`, lead: "Who writes this site, and the standard the guides are held to." },
    sections: [
      {
        id: "mission",
        heading: "What This Site Is For",
        paragraphs: [
          "Anime Dice Guide is an independent fan-made reference based on official game information and cross-checked public sources. Every page exists to answer a question players actually ask, and to answer it quickly enough that you can get back to playing.",
        ],
      },
      {
        id: "standards",
        heading: "How This Reference Is Maintained",
        paragraphs: [
          "Fast-changing details such as codes, update mechanics and panel values are refreshed when newer source material becomes available.",
          "When something on this site turns out to be wrong, it is corrected on the page as soon as it is found.",
        ],
      },
      {
        id: "independence",
        heading: "Independent Status",
        paragraphs: [
          "This is a fan-made site. It is not the game developer, publisher or platform owner, and it does not claim any official endorsement or affiliation.",
        ],
      },
    ],
    relatedSlugs: ["copyright", "terms"],
    lastReviewed: "2026-09-28",
  },
  {
    enabled: false,
    slug: "contact",
    pageType: "legal",
    navLabel: "Contact",
    title: "Contact",
    description: `How to report a correction, attribution concern or copyright question about ${siteConfig.siteName}.`,
    keywords: ["Anime Dice guide contact"],
    primaryKeyword: "contact",
    secondaryKeywords: [],
    searchIntent: "Contact the site about a correction",
    priority: "P2",
    navVisible: false,
    hero: { heading: "Contact", lead: "How to raise a correction or an attribution concern." },
    sections: [
      {
        id: "corrections",
        heading: "Corrections",
        paragraphs: [
          "If a page here is wrong, the fastest fix is a report that names the page and the specific detail, ideally with a way to verify the correct value in game.",
        ],
      },
    ],
    relatedSlugs: ["about", "copyright"],
    lastReviewed: "2026-09-28",
  },
  {
    enabled: true,
    slug: "privacy",
    pageType: "legal",
    navLabel: "Privacy",
    title: "Privacy Policy",
    description: `The privacy policy for ${siteConfig.siteName}, including which optional measurement or advertising services are switched on.`,
    keywords: ["Anime Dice guide privacy"],
    primaryKeyword: "privacy policy",
    secondaryKeywords: [],
    searchIntent: "Understand site privacy practices",
    priority: "P2",
    navVisible: false,
    hero: { heading: "Privacy Policy", lead: "A plain-language summary of the data this static site and its enabled services may process." },
    sections: [
      {
        id: "site-data",
        heading: "Data This Site Collects",
        paragraphs: [
          "This site is a set of static pages. It has no accounts, no comments and no database that stores anything you type.",
        ],
      },
      {
        id: "integrations",
        heading: "Optional Third-Party Services",
        paragraphs: privacyIntegrationParagraphs.length
          ? privacyIntegrationParagraphs
          : ["No audience measurement or advertising service is enabled on this site."],
      },
      {
        id: "external-links",
        heading: "External Links",
        paragraphs: [
          "Links to other websites are governed by those websites' own terms and privacy practices, not by this policy.",
        ],
      },
      {
        id: "changes",
        heading: "Policy Changes",
        paragraphs: [
          "This policy is updated whenever the services used by the site change. The review date above shows when it last changed.",
        ],
      },
    ],
    relatedSlugs: ["terms", "about"],
    lastReviewed: "2026-09-28",
  },
  {
    enabled: true,
    slug: "terms",
    pageType: "legal",
    navLabel: "Terms",
    title: "Terms of Use",
    description: `The terms for using the guides and reference information published on ${siteConfig.siteName}.`,
    keywords: ["Anime Dice guide terms"],
    primaryKeyword: "terms of use",
    secondaryKeywords: [],
    searchIntent: "Read site terms",
    priority: "P2",
    navVisible: false,
    hero: { heading: "Terms of Use", lead: "Conditions for using this independent guide and reference website." },
    sections: [
      {
        id: "informational",
        heading: "Informational Use",
        paragraphs: [
          "Content is published for general game information and may become outdated when the game is updated.",
        ],
      },
      {
        id: "accuracy",
        heading: "Accuracy and Availability",
        paragraphs: [
          "Reasonable care is taken when publishing, but complete accuracy and uninterrupted availability are not guaranteed.",
        ],
      },
      {
        id: "acceptable-use",
        heading: "Acceptable Use",
        paragraphs: [
          "Do not misuse the site, interfere with access to it, or reproduce substantial original content without permission.",
        ],
      },
    ],
    relatedSlugs: ["privacy", "copyright"],
    lastReviewed: "2026-01-15",
  },
  {
    enabled: true,
    slug: "copyright",
    pageType: "legal",
    navLabel: "Copyright",
    title: "Copyright and Attribution",
    description: `Copyright, trademark and attribution information for the independent ${siteConfig.siteName} resource.`,
    keywords: ["Anime Dice guide copyright"],
    primaryKeyword: "copyright and attribution",
    secondaryKeywords: [],
    searchIntent: "Understand rights and attribution",
    priority: "P2",
    navVisible: false,
    hero: { heading: "Copyright and Attribution", lead: "Ownership and reporting guidance for editorial content, game names and media." },
    sections: [
      {
        id: "editorial",
        heading: "Original Editorial Content",
        paragraphs: [
          "The writing, page organisation and design of this site are original work and remain protected unless a separate licence says otherwise.",
        ],
      },
      {
        id: "game-rights",
        heading: "Game and Platform Rights",
        paragraphs: [
          "Game names, trademarks, artwork and related assets belong to their respective owners. Their appearance here does not imply endorsement by, or affiliation with, those owners.",
        ],
      },
      {
        id: "report",
        heading: "Reporting a Concern",
        paragraphs: [
          "If you hold rights to material shown here and believe it is used incorrectly, identify the exact page and the work in question, along with a way to verify ownership. A supported claim is acted on promptly.",
        ],
      },
    ],
    relatedSlugs: ["terms", "about"],
    lastReviewed: "2026-09-28",
  },
];
