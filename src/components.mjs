import { readFileSync, existsSync } from "node:fs";

export const escape = (value) =>
  String(value).replace(
    /[&<>"']/g,
    (c) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[
        c
      ],
  );
const paths = {
  clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
  pin: '<path d="M20 10c0 6-8 11-8 11S4 16 4 10a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="2.5"/>',
  phone:
    '<path d="m7 3 3 5-3 3c2 3 3 4 6 6l3-3 5 3c0 3-2 4-4 4C10 21 3 14 3 7c0-2 1-4 4-4Z"/>',
  leaf: '<path d="M20 3C8 2 2 8 5 15c3 7 15 4 15-12ZM4 21 15 10"/>',
  heart:
    '<path d="M20 5a5 5 0 0 0-8 1 5 5 0 0 0-8-1c-5 5 3 11 8 15 5-4 13-10 8-15Z"/>',
  check: '<path d="m5 12 4 4L19 6"/>',
  plus: '<path d="M12 5v14M5 12h14"/>',
  menu: '<path d="M4 7h16M4 12h16M4 17h16"/>',
  sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2m0 16v2M2 12h2m16 0h2M5 5l1 1m12 12 1 1M5 19l1-1M18 6l1-1"/>',
  mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 6 9 7 9-7"/>',
};
export function icon(name) {
  return `<svg class="icon" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${paths[name] || ""}</svg>`;
}
export function image(name, alt, options = {}) {
  const file = `assets/images/${name}.webp`;
  const dimensions = existsSync("assets/images/sizes.json")
    ? JSON.parse(readFileSync("assets/images/sizes.json", "utf8"))[name]
    : null;
  return `<img src="${file}" alt="${escape(alt)}" width="${dimensions?.[0] || options.width || 600}" height="${dimensions?.[1] || options.height || 450}" loading="${options.loading || "lazy"}" decoding="async"${options.loading === "eager" ? ' fetchpriority="high"' : ""}${options.className ? ` class="${options.className}"` : ""}>`;
}
const navItems = [
  ["index.html", "Inicio"],
  ["servicios.html", "Menú"],
  ["qnso.html", "Nosotros"],
  ["horarios.html", "Horarios y sedes"],
  ["contacto.html", "Contacto"],
];
const brand =
  '<img src="assets/images/logo.webp" width="494" height="505" alt="El Tío Nené · Arepas y jugos" decoding="async">';
export function layout(page, siteUrl = "") {
  const canonical = siteUrl
    ? new URL(
        page.file === "index.html" ? "/" : `/${page.file.replace(".html", "")}`,
        siteUrl,
      ).href
    : "";
  return `<!doctype html>
<html lang="es"><head>
<meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<title>${escape(page.title)}</title><meta name="description" content="${escape(page.description)}">
<meta name="theme-color" content="#171717"><meta property="og:type" content="website"><meta property="og:locale" content="es_CO"><meta property="og:site_name" content="Tío Nené · Arepas y jugos"><meta property="og:title" content="${escape(page.title)}"><meta property="og:description" content="${escape(page.description)}"><meta property="og:image" content="${siteUrl ? new URL("/assets/images/social.jpg", siteUrl).href : "/assets/images/social.jpg"}"><meta property="og:image:alt" content="Tío Nené, arepas y jugos. El sabor de nuestras raíces."><meta name="twitter:card" content="summary_large_image">${canonical ? `<link rel="canonical" href="${canonical}"><meta property="og:url" content="${canonical}">` : ""}
<link rel="icon" href="assets/favicon.png" type="image/png">
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Fraunces:opsz,wght@9..144,500;9..144,600;9..144,700&display=swap" rel="stylesheet">
<link rel="stylesheet" href="assets/site.css"><script src="assets/app.js" defer></script>
</head><body>
<a class="skip-link" href="#contenido">Saltar al contenido</a>
<div class="announcement"><span>Hechas con cariño. Llenas de tradición.</span><a href="horarios.html">${icon("pin")} Barranquilla, Colombia </a></div>
<header class="site-header"><div class="container nav-wrap"><a class="brand" href="index.html" aria-label="El Tío Nené · Arepas y jugos · Inicio">${brand}</a>
<button type="button" class="menu-toggle" aria-expanded="false" aria-controls="navigation" aria-label="Abrir menú">${icon("menu")}</button>
<nav id="navigation" class="navigation" aria-label="Navegación principal">${navItems.map(([url, label]) => `<a href="${url}"${page.active === url ? ' aria-current="page"' : ""}>${label}</a>`).join("")}</nav><a class="button nav-cta" href="servicios.html">Se me antoja </a></div></header>
<main id="contenido" tabindex="-1">${page.content}</main>
<footer class="site-footer"><div class="container footer-grid"><div class="footer-brand"><a class="brand" href="index.html" aria-label="El Tío Nené · Arepas y jugos · Inicio">${brand}</a><p>El sabor de nuestras raíces.<br>El cariño de nuestra cocina.</p><a class="text-link" href="qnso.html">Conoce nuestra historia </a></div>
<div><h2>Encuéntranos</h2><p class="footer-label">Juan Bolívar</p><a href="horarios.html">Principal: Carrera 46 #75-32</a><a href="horarios.html">Norte: Calle 84 #53-20</a><p class="footer-label">Jesús Castillo</p><a href="horarios.html">Central: Carrera 54 #70-40</a><a href="horarios.html">Sur: Calle 30 #33-28</a></div>
<div><h2>Hablemos</h2><p class="footer-label">Camilo Rebolledo</p><a href="tel:+573001234567">+57 300 123 4567</a><a href="tel:+573009876543">+57 300 987 6543</a><a class="text-link" href="contacto.html">Ir a contacto </a></div>
<div><h2>Te esperamos</h2><p>Lunes a viernes<br><strong>8:00 a. m. – 6:00 p. m.</strong></p><p>Sábado<br><strong>9:00 a. m. – 1:00 p. m.</strong></p><p>Domingo cerrado</p></div></div>
<div class="container footer-bottom"><span>© ${new Date().getUTCFullYear()} Tío Nené · Arepas y jugos</span><span>Tradición que se comparte.</span><a href="#contenido">Volver arriba</a></div></footer>
</body></html>`;
}

export function productCard({
  name,
  description,
  ingredients,
  price,
  asset,
  badge = "Hecha con cariño",
  photo = false,
}) {
  return `<article class="product-card"><div class="product-visual${photo ? " product-photo" : ""}"><span class="product-badge">${badge}</span>${image(asset, badge === "Imagen de referencia" ? "Imagen de referencia de una arepa rellena" : name)}</div><div class="product-body"><h3>${name}</h3><p>${description}</p>${ingredients ? `<p class="ingredients">${ingredients}</p>` : ""}<div class="product-bottom"><span class="price">$${price}<small> COP</small></span><a class="product-link" href="contacto.html?producto=${encodeURIComponent(name)}" aria-label="Consultar por ${escape(name)}">Consultar</a></div></div></article>`;
}
