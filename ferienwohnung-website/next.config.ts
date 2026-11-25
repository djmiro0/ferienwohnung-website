import type { NextConfig } from "next";
import { PHASE_DEVELOPMENT_SERVER } from "next/constants";

export default function nextConfig(phase: string): NextConfig {
  if (phase === PHASE_DEVELOPMENT_SERVER) {
    return { experimental: { agentFeedback: true } };
  }

  return {
    output: "export",
    images: {
      loader: "custom",
      loaderFile: "./lib/netlify-image-loader.ts",
    },
  };
}
