import createNextIntlPlugin from "@workspace/i18n/plugin";

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["@workspace/ui", "@workspace/i18n"],
};

export default withNextIntl(nextConfig);
