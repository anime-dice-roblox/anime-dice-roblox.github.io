"use client";

import { useEffect } from "react";

const socialBarScriptUrl = "https://pl31582341.profitableratecpmnetwork.com/ca/29/73/ca29737860ab4c09bc56f8fa482b5d6c.js";

export function SocialBar() {
  useEffect(() => {
    const timer = window.setTimeout(() => {
      if (document.querySelector("script[data-adsterra-social-bar]")) return;
      const script = document.createElement("script");
      script.src = socialBarScriptUrl;
      script.dataset.adsterraSocialBar = "";
      document.body.appendChild(script);
    }, 0);

    return () => window.clearTimeout(timer);
  }, []);

  return null;
}
