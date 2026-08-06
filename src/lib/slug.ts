/** Turn a project name into a URL slug, e.g. "Tony's Woodfire" → "tonys-woodfire". */
export const slugify = (s: string) =>
  s
    .toLowerCase()
    .replace(/['']/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
