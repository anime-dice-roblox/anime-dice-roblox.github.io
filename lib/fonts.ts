/** Self-hosted SIL OFL font. The .woff2 files come from the Fontsource distribution. */
const FONT_FILES: Array<{ family: string; weight: number; file: string }> = [
  { family: "Source Sans 3", weight: 400, file: "source-sans-3-latin-400-normal.woff2" },
  { family: "Source Sans 3", weight: 600, file: "source-sans-3-latin-600-normal.woff2" },
  { family: "Source Sans 3", weight: 700, file: "source-sans-3-latin-700-normal.woff2" },
];

export function fontFaceCss(basePath = "") {
  const prefix = basePath.replace(/\/$/, "");
  return FONT_FILES.map((face) => `@font-face{font-family:"${face.family}";src:url("${prefix}/fonts/${face.file}") format("woff2");font-weight:${face.weight};font-style:normal;font-display:swap;}`).join("");
}
