import createNextIntlPlugin from "@workspace/i18n/plugin";
import { createMDX } from "fumadocs-mdx/next";

const withNextIntl = createNextIntlPlugin();
const withMDX = createMDX();

/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["@workspace/ui", "@workspace/i18n"],
};

export default withNextIntl(withMDX(nextConfig));
