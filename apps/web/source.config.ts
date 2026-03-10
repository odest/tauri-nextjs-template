import { defineDocs, defineConfig } from "fumadocs-mdx/config";
import type { z } from "zod";

export const docs = defineDocs({
  dir: "content/docs",
});

export default defineConfig();
