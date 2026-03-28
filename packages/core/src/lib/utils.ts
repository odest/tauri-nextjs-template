export async function fetchLatestGithubVersion(): Promise<string | null> {
  try {
    const res = await fetch(
      "https://api.github.com/repos/odest/tntstack/releases?per_page=10",
    );
    if (!res.ok) return null;
    const releases: {
      tag_name: string;
      prerelease: boolean;
      draft: boolean;
    }[] = await res.json();
    const appRelease = releases.find(
      (r) => !r.prerelease && !r.draft && /^v\d/.test(r.tag_name),
    );
    return appRelease?.tag_name?.replace(/^v/, "") || null;
  } catch {
    return null;
  }
}
