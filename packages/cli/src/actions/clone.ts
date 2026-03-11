import { downloadTemplate } from "giget";
import { TEMPLATE_SOURCE } from "../consts.js";

export async function cloneTemplate(directory: string): Promise<string> {
  const { dir } = await downloadTemplate(TEMPLATE_SOURCE, {
    dir: directory,
    force: true,
  });
  return dir;
}
