// Copies the self-hosted TinyMCE assets into /public so they can be served
// via tinymceScriptSrc without bundling CSS through Next. Runs on prebuild.
import { cp, rm, access } from "node:fs/promises";

const src = "node_modules/tinymce";
const dest = "public/tinymce";

try {
  await access(src);
} catch {
  console.log("tinymce not installed yet — skipping copy");
  process.exit(0);
}

await rm(dest, { recursive: true, force: true });
await cp(src, dest, { recursive: true });
console.log("✓ copied tinymce → public/tinymce");
