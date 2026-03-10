import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export async function fetchLatestGithubVersion(): Promise<string | null> {
  try {
    const res = await fetch(
      "https://api.github.com/repos/odest/tntstack/releases/latest"
    );
    if (!res.ok) return null;
    const data = await res.json();
    return data.tag_name?.replace(/^v/, "") || null;
  } catch {
    return null;
  }
}
