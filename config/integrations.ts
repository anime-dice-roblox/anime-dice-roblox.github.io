import type { IntegrationConfig } from "./types";
import rawIntegrations from "../content/data/integrations.json";

type FileIntegrations = {
  gaMeasurementId?: string | null;
  googleSiteVerification?: string | null;
  bingSiteVerification?: string | null;
};

const fileIntegrations = rawIntegrations as FileIntegrations;

const adScriptUrl = process.env.NEXT_PUBLIC_ADSTERRA_NATIVE_SCRIPT_URL?.trim();
const adContainerId = process.env.NEXT_PUBLIC_ADSTERRA_NATIVE_CONTAINER_ID?.trim();

function fileValue(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

const gaMeasurementId =
  (process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID?.trim() || "") || fileValue(fileIntegrations.gaMeasurementId);
const googleVerification =
  (process.env.GOOGLE_SITE_VERIFICATION?.trim() || "") || fileValue(fileIntegrations.googleSiteVerification) || null;
const bingVerification =
  (process.env.BING_SITE_VERIFICATION?.trim() || "") || fileValue(fileIntegrations.bingSiteVerification) || null;

export const integrations: IntegrationConfig = {
  analytics: /^G-[A-Z0-9]+$/i.test(gaMeasurementId)
    ? { provider: "google-analytics", measurementId: gaMeasurementId.toUpperCase() }
    : { provider: "none" },
  ads:
    adScriptUrl && adContainerId
      ? {
          provider: "adsterra-native",
          scriptUrl: adScriptUrl,
          containerId: adContainerId,
        }
      : { provider: "none" },
  verification: {
    google: googleVerification,
    bing: bingVerification,
  },
};
