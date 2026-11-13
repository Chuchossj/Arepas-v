import { existsSync } from "node:fs";
import { productCard } from "../components.mjs";
const products = [
  [
    "Arepa de Queso",
    "Deliciosa arepa rellena con queso derretido.",
    "Queso costeño",
    "3.000",
    "queso",
    "slider1",
  ],
  [
    "Arepa de Chorizo",
    "Deliciosa arepa rellena con trozos de chorizo.",
    "Chorizo de cerdo",
    "5.000",
    "chorizo",
    "slider3",
  ],
  [
    "Arepa de Pollo",
    "El sabor único del pollo combinado con nuestra arepa.",
    "Pollo desmechado",
    "6.000",
    "pollo",
    "slider2",
  ],
  [
    "Arepa de Carne",
    "Carne jugosa y sabrosa en tu arepa favorita.",
    "Carne desmechada",
    "6.000",
    "carne",
    "slider3",
  ],
  [
    "Arepa de Chicharrón",
    "¡Para los que aman lo crujiente!",
    "Chicharrón",
    "6.000",
    "chicharron",
    "slider3",
  ],
  [
    "Arepa Combinada",
    "La mejor combinación de sabores en una sola arepa.",
    "Rellenos de libre elección",
    "7.000",
    "combinada",
    "food2",
  ],
  [
    "Arepa con Todo",
    "Todo lo que necesitas en una sola arepa.",
    "Pollo, carne, chorizo y chicharrón",
    "9.000",
    "todo",
    "food2",
  ],
  [
    "Arepa Vegana",
    "Deliciosa arepa con el sabor de los vegetales.",
    "Aguacate, tajada de plátano y cebolla frita",
    "5.000",
    "vegana",
    "food3",
  ],
  [
    "Arepa Vegetariana",
    "Una combinación llena de sabor.",
    "Aguacate, tomate, frijoles y huevo",
    "5.000",
    "vegetariana",
    "food1",
  ],
  [
    "Arepa Vegana de Vegetales",
    "Deliciosa arepa rellena con vegetales.",
    "Aguacate, pimentón, lechuga y finas hierbas",
    "8.000",
    "vegetales",
    "food3",
  ],
];
export const menu = {
  file: "servicios.html",
  active: "servicios.html",
  title: "Nuestro menú | Tío Nené · Arepas y jugos",
  description:
    "Descubre las diez arepas de Tío Nené: queso, pollo, carne, chorizo, combinadas y opciones vegetales. Consulta ingredientes y precios en COP.",
  content: `<section class="page-intro container"><p class="eyebrow">NUESTRO MENÚ</p><h1>Una arepa para<br><em>cada antojo.</em></h1><p>Maíz doradito, rellenos generosos y ese sabor que siempre te hace volver. Elige la tuya.</p></section><section class="section container menu-section" aria-label="Carta de arepas"><div class="menu-toolbar"><span>Las arepas de la casa <span class="count">10</span></span><span>Todos los precios en COP</span></div><div class="product-grid menu-grid">${products
    .map(([name, description, ingredients, price, key, fallback]) => {
      const photo = existsSync(`assets/images/menu-${key}.webp`);
      return productCard({
        name,
        description,
        ingredients,
        price,
        asset: photo ? `menu-${key}` : fallback,
        photo,
        badge: photo ? "Hecha con cariño" : "Imagen de referencia",
      });
    })
    .join(
      "",
    )}</div><p class="menu-footnote">¿Quieres acompañar tu arepa? Encuentra burritos y bebidas en <a href="index.html#favoritos">los favoritos de la casa</a>.</p></section>`,
};
