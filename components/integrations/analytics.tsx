import { integrations } from "@/config/integrations";

export function Analytics() {
  if (integrations.analytics.provider !== "google-analytics") return null;
  const measurementId = integrations.analytics.measurementId;

  // Search Console reads the raw homepage HTML and expects this tag in <head>.
  // next/script only emits a preload plus a client loader, which that check misses.
  return (
    <>
      <script async src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`} />
      <script
        id="google-analytics"
        dangerouslySetInnerHTML={{
          __html: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${measurementId}');`,
        }}
      />
    </>
  );
}
