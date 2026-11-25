"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

function languageFromPath(pathname: string) {
  if (pathname === "/sr" || pathname.startsWith("/sr/")) return "sr-Latn";
  if (pathname === "/en" || pathname.startsWith("/en/")) return "en";
  return "de";
}

export function DocumentLanguage() {
  const pathname = usePathname();

  useEffect(() => {
    document.documentElement.lang = languageFromPath(pathname);
  }, [pathname]);

  return null;
}
