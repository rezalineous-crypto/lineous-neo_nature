"use client";

import Script from "next/script";

export default function ThemeCleanupScript() {
  return (
    <Script
      id="theme-cleanup"
      strategy="beforeInteractive"
      dangerouslySetInnerHTML={{
        __html: `
        (function() {
          try {
            if (!localStorage.getItem('theme-cleanup-done')) {
              localStorage.removeItem('theme-default');
              localStorage.removeItem('theme-session');
              localStorage.setItem('theme-cleanup-done', '1');
              document.documentElement.setAttribute('data-theme', 'light');
            }
          } catch (e) {}
        })();
      `,
      }}
    />
  );
}