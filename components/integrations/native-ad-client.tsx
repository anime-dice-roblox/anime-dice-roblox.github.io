"use client";

import { useEffect, useRef } from "react";

const nativeContainerId = "container-5be41c9e5d429cdd1a87073169da3df4";
const nativeScriptUrl = "https://pl31582342.profitableratecpmnetwork.com/5be41c9e5d429cdd1a87073169da3df4/invoke.js";

export function NativeAdClient() {
  const hostRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    // Defer injection so React's development effect replay cannot request the ad twice.
    const timer = window.setTimeout(() => {
      const script = document.createElement("script");
      script.async = true;
      script.dataset.cfasync = "false";
      script.src = nativeScriptUrl;

      const container = document.createElement("div");
      container.id = nativeContainerId;

      host.append(script, container);
    }, 0);

    return () => {
      window.clearTimeout(timer);
      host.replaceChildren();
    };
  }, []);

  return (
    <div className="ad-native" aria-label="Advertisement">
      <span className="ad-label">Advertisement</span>
      <div ref={hostRef} data-native-ad-slot />
    </div>
  );
}
