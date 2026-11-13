# Tío Nené · Arepas y jugos

Sitio estático responsive de cinco páginas, hecho con HTML semántico, CSS y JavaScript. Un generador pequeño en Node comparte navegación, footer y tarjetas sin dependencias en el navegador. Conserva las rutas originales.

## Desarrollo

Requiere Node.js 22 o posterior.

```sh
npm ci
npm run dev
```

Abre http://127.0.0.1:4173. Para reconstruir tras editar una plantilla, ejecuta `npm run build` y recarga el navegador. El servidor solo sirve `dist/`.

```sh
npm run build
npx playwright install chromium
npm test
```

## Estructura

- `src/components.mjs`: layout, SEO, cabecera, footer, iconos y tarjetas.
- `src/pages/home.mjs`: portada, carrusel y categorías.
- `src/pages/menu.mjs`: diez productos, ingredientes y precios.
- `src/pages/details.mjs`: historia, horarios, sedes y contacto.
- `assets/site.css`: sistema visual mobile-first, estados de foco y movimiento reducido.
- `assets/app.js`: menú móvil, carrusel, pestañas accesibles y preparación del mensaje.
- `assets/images/`: imágenes locales WebP y tarjeta Open Graph.
- `scripts/`: build y servidor local. `dist/` es generado y no se versiona.
- `tests/`: regresión de navegación, responsive, accesibilidad e interacciones.

## Contacto

El sitio original no tenía backend de envío. El formulario valida y prepara un mensaje para copiar, sin guardar datos ni afirmar que se envió. Los botones de producto rellenan el mensaje. Los teléfonos originales se mantienen como enlaces de llamada. Para habilitar entrega real, hay que confirmar el correo o WhatsApp del negocio y conectar ese destino. No hay enlaces ficticios a redes sociales.

Se conservan los precios originales, incluso las diferencias entre los destacados y la carta. La variante con huevo se presenta como vegetariana. El mapa existente se identifica como referencia de Barranquilla; cada sede tiene su propia búsqueda por dirección.

## Cloudflare Pages

Recomendado: conectar `Chuchossj/Arepas-v` desde Workers & Pages → Create → Pages → Connect to Git.

| Ajuste | Valor |
| --- | --- |
| Rama de producción | `main` |
| Framework | None |
| Comando de build | `npm run build` |
| Directorio de salida | `dist` |
| Directorio raíz | raíz del repositorio |
| Node | `22` |
| `SITE_URL` | URL HTTPS definitiva, sin ruta (para canonical, sitemap y Open Graph) |

GitHub integra automáticamente los nuevos cambios y previews. Un proyecto Pages creado inicialmente con Direct Upload no puede convertirse a integración Git; para cambiar esa modalidad se necesita otro proyecto.

Alternativa manual, tras iniciar sesión en Cloudflare:

```sh
npx wrangler login
npx wrangler pages project create arepas-v --production-branch main
npm run deploy
```

Si el nombre está ocupado, elige otro y actualiza `wrangler.jsonc` y el script `deploy`. Una vez conocida la URL final, configura `SITE_URL`, reconstruye y despliega de nuevo. No añadas tokens al repositorio. La configuración incluye caché de imágenes, headers de seguridad, `robots.txt`, una página 404 real y sitemap al definir `SITE_URL`.

Documentación: [HTML estático](https://developers.cloudflare.com/pages/framework-guides/deploy-anything/) · [Direct Upload](https://developers.cloudflare.com/pages/get-started/direct-upload/).
