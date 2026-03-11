import type { NextConfig } from "next";
import createNextIntlPlugin from "@workspace/i18n/plugin";
import { createMDX } from "fumadocs-mdx/next";

const withNextIntl = createNextIntlPlugin();
const withMDX = createMDX();

const nextConfig: NextConfig = {
  transpilePackages: ["@workspace/ui", "@workspace/i18n"],
};

export default withNextIntl(withMDX(nextConfig));
