"use client";

import { useEffect, useRef } from "react";

type BannerSize = "mobile" | "desktop";

const bannerCodes = {
  desktop: {
    options: `  atOptions = {
    'key' : 'cb2d1f485ef8d70c5d6eee649a27d46c',
    'format' : 'iframe',
    'height' : 90,
    'width' : 728,
    'params' : {}
  };`,
    src: "https://www.highrevenueformat.com/cb2d1f485ef8d70c5d6eee649a27d46c/invoke.js",
  },
  mobile: {
    options: `  atOptions = {
    'key' : '40f129790aae6a6c3bd40a3cb0df163e',
    'format' : 'iframe',
    'height' : 50,
    'width' : 320,
    'params' : {}
  };`,
    src: "https://www.highrevenueformat.com/40f129790aae6a6c3bd40a3cb0df163e/invoke.js",
  },
} as const;

export function ResponsiveBanner() {
  const hostRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;
    // Choose once per mount: a visit never executes both Adsterra banner codes.
    const size: BannerSize = window.innerWidth < 768 ? "mobile" : "desktop";

    const timer = window.setTimeout(() => {
      const code = bannerCodes[size];
      const options = document.createElement("script");
      options.textContent = code.options;
      const invoke = document.createElement("script");
      invoke.src = code.src;
      host.append(options, invoke);
    }, 0);

    return () => {
      window.clearTimeout(timer);
      host.replaceChildren();
    };
  }, []);

  return (
    <div className="site-container ad-banner-outer">
      <div className="ad-banner" aria-label="Advertisement">
        <span className="ad-label">Advertisement</span>
        <div ref={hostRef} data-banner-ad-slot />
      </div>
    </div>
  );
}
