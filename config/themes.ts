import type { ThemeConfig, ThemePresetName } from "./types";

/**
 * Design tokens for the site theme. Values are HSL channel triplets consumed as
 * `hsl(var(--token))`, so a token can be retuned without recompiling Tailwind.
 */
export const themes: Record<ThemePresetName, ThemeConfig> = {
  "anime-dice": {
    name: "anime-dice",
    label: "Anime Dice",
    tokens: {
      background: "220 16% 96%",
      foreground: "0 0% 7%",
      card: "220 6% 100%",
      "card-foreground": "0 0% 7%",
      primary: "189 94% 43%",
      "primary-foreground": "0 0% 0%",
      secondary: "220 16% 89%",
      muted: "220 16% 91%",
      "muted-foreground": "0 0% 7%",
      border: "220 16% 80%",
      radius: ".35rem",
      "card-shadow": "0 8px 18px rgba(15, 23, 42, .06)",
      "hero-gradient": "linear-gradient(180deg, hsl(189 94% 43% / .08), transparent 70%)",
      "background-pattern": "none",
      "font-sans": "\"Source Sans 3\", ui-sans-serif, system-ui, sans-serif",
      "font-heading": "\"Source Sans 3\", ui-sans-serif, system-ui, sans-serif",
      "heading-weight": "700",
      "heading-letter-spacing": "-0.02em",
    },
  },
};

export const defaultTheme = themes["anime-dice"];
