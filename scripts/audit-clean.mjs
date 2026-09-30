import { readFileSync, readdirSync, statSync } from "node:fs";
import { extname, join, relative } from "node:path";

const root = process.cwd();
const skippedDirs = new Set([".git", ".next", "node_modules", "out", ".playwright-cli"]);
const skippedFiles = new Set(["package-lock.json", "audit-clean.mjs"]);
const textExtensions = new Set([".ts", ".tsx", ".js", ".mjs", ".json", ".md", ".css", ".html", ".txt", ".yml", ".yaml"]);

/** Files whose contents are third-party licence text rather than site source. */
const allowedCjk = new Set(["public/fonts/OFL-1.1.txt"]);

const secretPatterns = [
  { label: "private key", pattern: /-----BEGIN [A-Z ]*PRIVATE KEY-----/ },
  { label: "API key", pattern: /\bsk-[A-Za-z0-9]{16,}/ },
  { label: "credential assignment", pattern: /\b(api[_-]?key|access[_-]?token|auth[_-]?token|password|passwd|client[_-]?secret)\b\s*[:=]\s*["'][^"']{8,}["']/i },
  { label: "advertising publisher ID", pattern: /\bca-pub-\d{8,}\b/i },
  { label: "advertising container ID", pattern: /container-[a-f0-9]{24,}/i },
  { label: "analytics site code", pattern: /data-code=["'][A-Za-z0-9_-]{16,}["']/ },
  { label: "absolute user path", pattern: /(\/Users\/[^/\s"']+\/|C:\\Users\\[^\\\s"']+\\|\/home\/[^/\s"']+\/)/ },
];
const approvedNativeContainerId = "container-5be41c9e5d429cdd1a87073169da3df4";

const findings = [];

function walk(directory) {
  for (const name of readdirSync(directory)) {
    if (skippedDirs.has(name)) continue;
    const path = join(directory, name);
    const stat = statSync(path);
    if (stat.isDirectory()) walk(path);
    else if (textExtensions.has(extname(name)) && !skippedFiles.has(name)) inspect(path);
  }
}

function inspect(path) {
  const text = readFileSync(path, "utf8");
  const displayPath = relative(root, path);

  for (const { label, pattern } of secretPatterns) {
    const inspectedText = label === "advertising container ID"
      ? text.replaceAll(approvedNativeContainerId, "")
      : text;
    if (pattern.test(inspectedText)) findings.push(`${displayPath}: possible ${label}`);
  }

  for (const email of text.match(/\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b/gi) ?? []) {
    // Role-based support addresses are safe to publish; personal mailboxes are not.
    if (/^support@[a-z0-9.-]+\.[a-z]{2,}$/i.test(email)) continue;
    findings.push(`${displayPath}: hardcoded email '${email}'`);
  }

  // The site ships English content. CJK characters in source point at leftover
  // material from another project or an internal tool, not at site content.
  if (!allowedCjk.has(displayPath) && /[\u3400-\u4dbf\u4e00-\u9fff]/.test(text)) {
    findings.push(`${displayPath}: non-English (CJK) text in shipped source`);
  }
}

walk(root);

if (findings.length) {
  console.error("Cleanliness audit failed:\n" + [...new Set(findings)].map((item) => `- ${item}`).join("\n"));
  process.exit(1);
}

console.log("Cleanliness audit passed: no secrets, personal data or foreign-language residue in shipped source.");
