import { mkdir, cp, writeFile, readFile, rm } from "node:fs/promises";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { layout } from "../src/components.mjs";
import { home } from "../src/pages/home.mjs";
import { menu } from "../src/pages/menu.mjs";
import { details } from "../src/pages/details.mjs";

const siteUrl = process.env.SITE_URL || process.env.CF_PAGES_URL || "";
if (siteUrl && !/^https:\/\/[^/]+\/?$/.test(siteUrl))
  throw new Error("SITE_URL must be an HTTPS origin without a path.");
const pages = [home, menu, ...details];
const repositoryRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const outputDirectory = resolve(repositoryRoot, "dist");
if (
  resolve(process.cwd()) !== repositoryRoot ||
  dirname(outputDirectory) !== repositoryRoot
) {
  throw new Error("Run the build from the repository root.");
}
await rm(outputDirectory, { recursive: true, force: true });
await mkdir("dist", { recursive: true });
await cp("assets", "dist/assets", { recursive: true });
for (const page of pages)
  await writeFile(`dist/${page.file}`, layout(page, siteUrl));
await writeFile(
  "dist/404.html",
  layout(
    {
      file: "404.html",
      title: "Página no encontrada | Tío Nené",
      description:
        "Vuelve al menú de Tío Nené y encuentra tu próxima arepa favorita.",
      content:
        '<section class="page-intro section container"><p class="eyebrow">404 · ESTA PÁGINA NO ESTÁ EN EL MENÚ</p><h1>Volvamos a lo bueno.</h1><p>La página que buscas no existe. Nuestro menú te está esperando.</p><p><a class="button" href="/index.html">Volver al inicio</a></p></section>',
    },
    siteUrl,
  )
    .replaceAll('href="assets/', 'href="/assets/')
    .replaceAll('src="assets/', 'src="/assets/')
    .replace(
      /href="(index|servicios|qnso|horarios|contacto)\.html/g,
      'href="/$1.html',
    ),
);
await writeFile(
  "dist/_headers",
  `/*\n  X-Content-Type-Options: nosniff\n  Referrer-Policy: strict-origin-when-cross-origin\n  X-Frame-Options: DENY\n  Permissions-Policy: camera=(), microphone=(), geolocation=()\n/assets/images/*\n  Cache-Control: public, max-age=86400\n`,
);
await writeFile(
  "dist/robots.txt",
  `User-agent: *\nAllow: /\n${siteUrl ? `Sitemap: ${new URL("/sitemap.xml", siteUrl).href}\n` : ""}`,
);
if (siteUrl)
  await writeFile(
    "dist/sitemap.xml",
    `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${pages.map((page) => `<url><loc>${new URL(page.file === "index.html" ? "/" : `/${page.file.replace(".html", "")}`, siteUrl).href}</loc></url>`).join("")}</urlset>`,
  );
else await rm("dist/sitemap.xml", { force: true });
// Verify local asset references before shipping the build.
for (const page of pages) {
  const html = await readFile(`dist/${page.file}`, "utf8");
  for (const match of html.matchAll(/(?:src|href)="(assets\/[^"?#]+)"/g))
    await readFile(`dist/${match[1]}`);
}
console.log(
  `Built ${pages.length} pages + 404 in dist/ (${siteUrl || "local preview"})`,
);
