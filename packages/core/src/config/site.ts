const siteUrl = "https://tntstack.odest.dev";
const repoUrl = "https://github.com/odest/tntstack";
const apiUrl = "https://api.github.com/repos/odest/tntstack";

export const siteConfig = {
  name: "TNTStack",
  owner: "odest",
  headline: "Build Cross-Platform Apps Faster Than Ever",
  description:
    "The solid stack for building cross-platform apps. Write your code once and build for Web, Desktop, and Mobile. Powered by a seamless monorepo setup featuring Next.js and Tauri.",
  links: {
    website: siteUrl,
    github: repoUrl,
    issues: `${repoUrl}/issues`,
    discussions: `${repoUrl}/discussions`,
    releases: `${repoUrl}/releases/latest`,
    license: `${repoUrl}/blob/master/LICENSE`,
    changelog: `${repoUrl}/blob/master/CHANGELOG.md`,
    contributing: `${repoUrl}/blob/master/CONTRIBUTING.md`,
    githubApi: `${apiUrl}/releases?per_page=10`,
  },
};

export type SiteConfig = typeof siteConfig;
