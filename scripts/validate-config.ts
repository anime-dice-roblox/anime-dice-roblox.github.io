import { readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative } from "node:path";
import { integrations } from "../config/integrations";
import { siteConfig } from "../config/site";
import { themes } from "../config/themes";
import type { InternalLink, PageSection, SeoPageDefinition } from "../config/types";
import { homePage } from "../content/home";
import { allPages, enabledCorePages, enabledPages } from "../content/registry";

const errors: string[] = [];
const slugPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*(?:\/[a-z0-9]+(?:-[a-z0-9]+)*)*$/;
const isoDatePattern = /^\d{4}-\d{2}-\d{2}$/;

// Search results truncate around 60 characters and 160 characters respectively.
const TITLE_MAX = 62;
const DESC_MIN = 130;
const DESC_MAX = 165;
const LEGAL_DESC_MIN = 60;

function fail(message: string) {
  errors.push(message);
}

function linksFromSections(sections: PageSection[]): InternalLink[] {
  return sections.flatMap((section) => section.links ?? []);
}

function checkSnippet(label: string, title: string, description: string, isLegal: boolean) {
  if (!title.trim()) fail(`${label}: title is required`);
  else if (title.length > TITLE_MAX) fail(`${label}: title is ${title.length} characters, maximum is ${TITLE_MAX}`);
  const min = isLegal ? LEGAL_DESC_MIN : DESC_MIN;
  if (description.length < min || description.length > DESC_MAX) {
    fail(`${label}: description is ${description.length} characters, expected ${min}-${DESC_MAX}`);
  }
}

function validatePage(page: SeoPageDefinition) {
  if (!page.slug || !slugPattern.test(page.slug)) fail(`Invalid slug: ${page.slug || "(empty)"}`);
  checkSnippet(page.slug, page.title, page.description, page.pageType === "legal");
  if (!page.hero.heading.trim()) fail(`${page.slug}: H1 is required`);
  if (!page.sections.length) fail(`${page.slug}: at least one H2 section is required`);
  if (!page.primaryKeyword.trim()) fail(`${page.slug}: primaryKeyword is required`);
  if (!page.searchIntent.trim()) fail(`${page.slug}: searchIntent is required`);
  if (!isoDatePattern.test(page.lastReviewed) || Number.isNaN(Date.parse(page.lastReviewed))) fail(`${page.slug}: invalid lastReviewed date`);
  for (const section of page.sections) {
    if (!section.id || !section.heading) fail(`${page.slug}: every section needs an id and H2 heading`);
    for (const subsection of section.subsections ?? []) {
      if (!subsection.heading) fail(`${page.slug}: every subsection needs an H3 heading`);
    }
  }
  for (const target of page.densityTargets ?? []) {
    if (!target.term || target.min < 0 || target.max <= target.min) fail(`${page.slug}: invalid density target for ${target.term}`);
  }
}

if (!themes[siteConfig.theme.preset]) fail(`Unknown theme preset: ${siteConfig.theme.preset}`);

try {
  new URL(siteConfig.hosting.siteUrl);
} catch {
  fail("hosting.siteUrl must be a valid absolute URL");
}

const siteHost = (() => {
  try { return new URL(siteConfig.hosting.siteUrl).hostname; } catch { return ""; }
})();

const productionOrigin = "https://anime-dice-roblox.github.io";
// Split so the retired host is not stored as one literal in this public repo.
const retiredHost = ["anime-dice", "github.io"].join(".");
if (siteConfig.hosting.siteUrl.replace(/\/+$/, "") !== productionOrigin) {
  fail(`production siteUrl must be ${productionOrigin}`);
}
if (siteConfig.hosting.basePath) fail("production basePath must stay empty for the user-site root");
if (siteConfig.hosting.customDomain) fail("production customDomain must stay null");

if (siteConfig.hosting.basePath && !/^\/[a-zA-Z0-9._-]+$/.test(siteConfig.hosting.basePath)) {
  fail("hosting.basePath must be empty or a single path beginning with /");
}

if (siteConfig.hosting.customDomain && siteConfig.hosting.basePath) {
  fail("customDomain and basePath cannot be enabled together");
}

if (siteConfig.hosting.customDomain) {
  if (siteConfig.hosting.customDomain.includes("://") || siteConfig.hosting.customDomain.includes("/")) {
    fail("customDomain must be a hostname without protocol or path");
  }
  if (siteHost && siteConfig.hosting.customDomain !== siteHost) {
    fail("customDomain must match the hostname in siteUrl");
  }
}

const slugs = allPages.map((page) => page.slug);
for (const slug of new Set(slugs)) {
  if (slugs.filter((value) => value === slug).length > 1) fail(`Duplicate page slug: ${slug}`);
}

allPages.forEach(validatePage);
checkSnippet("home", homePage.title, homePage.description, false);
if (!homePage.hero.heading.trim()) fail("home: H1 is required");
if (!homePage.sections.length) fail("home: at least one H2 section is required");
if (!homePage.faq.length) fail("home: at least one FAQ entry is required");

const enabledSlugs = new Set(enabledPages.map((page) => page.slug));
for (const page of enabledPages) {
  for (const related of page.relatedSlugs ?? []) {
    if (!enabledSlugs.has(related)) fail(`${page.slug}: related page is missing or disabled: ${related}`);
  }
  for (const link of linksFromSections(page.sections)) {
    if (!enabledSlugs.has(link.slug)) fail(`${page.slug}: internal link is missing or disabled: ${link.slug}`);
  }
}
for (const link of linksFromSections(homePage.sections)) {
  if (!enabledSlugs.has(link.slug)) fail(`home: internal link is missing or disabled: ${link.slug}`);
}
if (homePage.hero.primaryLink && !enabledSlugs.has(homePage.hero.primaryLink.slug)) fail("home: primary hero link is missing or disabled");

const homeTargets = new Set([
  ...(homePage.hero.primaryLink ? [homePage.hero.primaryLink.slug] : []),
  ...linksFromSections(homePage.sections).map((link) => link.slug),
]);
for (const page of enabledCorePages) {
  if ((page.priority === "P0" || page.priority === "P1") && !homeTargets.has(page.slug)) {
    fail(`home: missing crawlable link to ${page.priority} page ${page.slug}`);
  }
  const inbound = enabledPages.some((source) =>
    source.slug !== page.slug && ((source.relatedSlugs ?? []).includes(page.slug) || linksFromSections(source.sections).some((link) => link.slug === page.slug)),
  );
  if (!homeTargets.has(page.slug) && !inbound) fail(`${page.slug}: orphan page has no inbound link`);
}

const externalUrls = [
  siteConfig.game.officialUrl,
  siteConfig.contact.url,
  siteConfig.repositoryUrl,
].filter((value): value is string => Boolean(value));

for (const url of externalUrls) {
  try {
    const host = new URL(url).hostname;
    if (host !== siteHost && !siteConfig.allowedExternalDomains.includes(host)) {
      fail(`External domain is not allowlisted: ${host}`);
    }
  } catch {
    fail(`Invalid external URL: ${url}`);
  }
}

if (siteConfig.readyForLaunch) {
  // Template scaffolding tokens are defects anywhere; the bare word "placeholder" is only a
  // defect in configuration, where it would mean a real value was never filled in.
  const scaffolding = ["example game", "example studio", "lorem ipsum", "template-logo", "template-cover", "template-og"];
  const configData = JSON.stringify(siteConfig).toLowerCase();
  const contentData = JSON.stringify({ homePage, allPages }).toLowerCase();
  for (const token of [...scaffolding, "placeholder"]) {
    if (configData.includes(token)) fail(`Launch blocked by placeholder config value: ${token}`);
  }
  for (const token of scaffolding) {
    if (contentData.includes(token)) fail(`Launch blocked by placeholder content value: ${token}`);
  }
  if (!siteConfig.hosting.siteUrl.startsWith("https://") || siteHost !== "anime-dice-roblox.github.io") fail("Launch requires the production HTTPS site URL");
  if (!enabledCorePages.length) fail("Launch requires at least one enabled content page");
  if (!homePage.title || !homePage.description || !homePage.sections.length || !homePage.faq.length) fail("Homepage SEO fields are incomplete");
}

const skippedDirs = new Set([".git", ".next", "node_modules", "out", ".idea"]);
const textExtensions = new Set([".ts", ".tsx", ".js", ".mjs", ".json", ".md", ".yml", ".yaml", ".txt", ".example"]);
function walkSource(directory: string): string[] {
  return readdirSync(directory).flatMap((name) => {
    if (skippedDirs.has(name)) return [];
    const path = join(directory, name);
    if (statSync(path).isDirectory()) return walkSource(path);
    const ext = name.includes(".") ? name.slice(name.lastIndexOf(".")) : "";
    return textExtensions.has(ext) ? [path] : [];
  });
}
for (const file of walkSource(process.cwd())) {
  const text = readFileSync(file, "utf8");
  if (text.includes(retiredHost)) fail(`${relative(process.cwd(), file)}: retired hosting hostname`);
}

if (errors.length) {
  console.error("Configuration validation failed:\n" + errors.map((error) => `- ${error}`).join("\n"));
  process.exit(1);
}

console.log(`Configuration valid: ${enabledPages.length + 1} public pages, theme ${siteConfig.theme.preset}, indexing ${siteConfig.readyForLaunch ? "enabled" : "disabled"}.`);
