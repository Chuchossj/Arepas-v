import { icon, image, productCard } from "../components.mjs";

const featured = [
  {
    name: "Arepas",
    items: [
      ["Arepa rellena de huevo", "food1", "10.000"],
      ["Arepa de aguacate con pollo", "food2", "10.000"],
      ["Arepa de queso rellena con granos", "food3", "10.000"],
    ],
  },
  {
    name: "Burritos",
    items: [
      ["Burrito · Opción 1", "food4", "10.000"],
      ["Burrito · Opción 2", "food5", "10.000"],
      ["Burrito · Opción 3", "food6", "10.000"],
    ],
  },
  {
    name: "Bebidas",
    items: [
      ["Jugos naturales", "food7", "10.999"],
      ["Gaseosas", "food9", "14.000"],
      ["Cócteles", "food8", "25.000"],
    ],
  },
];
const slides = [
  [
    "queso",
    "slider1",
    "El antojo de siempre.",
    "Con el queso en su punto,",
    "y el corazón contento.",
    "Te presentamos nuestra arepa rellena de queso, un manjar irresistible que combina el sabor tradicional del maíz con el derretido perfecto del queso fresco. Ideal para disfrutar como desayuno, merienda o snack.",
  ],
  [
    "pollo",
    "slider2",
    "Sabor a cocina de casa.",
    "Doradita por fuera,",
    "llena de sabor por dentro.",
    "La arepa rellena de pollo reúne lo mejor de nuestra cocina: masa de maíz suave y doradita, pollo desmechado jugoso y perfectamente sazonado. Frescura, textura y sabor casero en cada bocado.",
  ],
  [
    "carne",
    "slider3",
    "Tradición en cada bocado.",
    "Una buena arepa.",
    "Un gran momento.",
    "Nuestra arepa rellena de carne es el equilibrio perfecto entre tradición y sabor. Masa de maíz recién hecha y un relleno generoso de carne jugosa y sazonada al punto exacto. Una experiencia que no querrás perderte.",
  ],
];
export const home = {
  file: "index.html",
  active: "index.html",
  title: "Tío Nené · Arepas y jugos en Barranquilla",
  description:
    "Arepas doraditas, rellenos generosos y el sabor de casa. Descubre el menú de Tío Nené, nuestros jugos, horarios y sedes en Barranquilla.",
  content: `<h1 class="sr-only">Tío Nené · Arepas y jugos en Barranquilla</h1><section class="hero" aria-label="Nuestras arepas" aria-roledescription="carrusel"><div class="container hero-container">
 ${slides.map(([flavor, asset, eyebrow, line1, line2, description], i) => `<article class="hero-slide" data-slide="${i}" aria-roledescription="diapositiva" aria-label="${i + 1} de 3: arepa rellena de ${flavor}"${i ? " hidden" : ""}><div class="hero-copy"><p class="eyebrow"><span class="eyebrow-line"></span> ${eyebrow}</p><h2 class="hero-title">${line1}<br><em>${line2}</em></h2><p class="hero-description">${description}</p><div class="hero-actions"><a class="button" href="contacto.html?producto=${encodeURIComponent("Arepa rellena de " + flavor)}">Quiero una arepa </a><a class="text-link" href="#favoritos">Explorar el menú</a></div><p class="hero-note">${icon("heart")} Hecha con maíz, tradición y mucho cariño.</p></div><div class="hero-art"><span class="hero-ring" aria-hidden="true"></span><span class="hero-orbit" aria-hidden="true"></span><span class="ingredient-note" aria-hidden="true">Sabor que<br>enamora </span>${image(asset, `Arepa dorada rellena de ${flavor}`, { loading: i === 0 ? "eager" : "lazy" })}<div class="hero-stamp">HECHA CON<span>mucho<br>cariño</span>${icon("heart")}</div><div class="hero-image-caption"><span>LA PROTAGONISTA DE HOY</span><strong>Arepa rellena de ${flavor}</strong></div></div></article>`).join("")}
 <div class="hero-controls"><div class="slide-selector" aria-label="Elegir arepa">${slides.map((s, i) => `<button type="button" data-go-slide="${i}" aria-label="0${i + 1}: Ver arepa de ${s[0]}" aria-pressed="${i === 0}"><span>0${i + 1}</span><span class="selector-line"></span></button>`).join("")}</div><div class="slide-arrows"><button class="round-button" data-prev-slide aria-label="Arepa anterior">Anterior</button><button class="round-button" data-next-slide aria-label="Siguiente arepa">Siguiente</button></div></div><p class="sr-only" data-slide-status aria-live="polite"></p>
 </div></section>
 <div class="values-strip"><div class="container"><span>${icon("sun")} Maíz y tradición</span><span>${icon("leaf")} Ingredientes frescos</span><span>${icon("heart")} Preparadas con cariño</span><span>${icon("pin")} Sabor de Barranquilla</span></div></div>
 <section class="section container favorites" id="favoritos" aria-labelledby="favorites-title"><div class="section-heading"><div><p class="eyebrow">PARA TODOS LOS ANTOJOS</p><h2 id="favorites-title">Encuentra tu próximo favorito.</h2></div><a class="text-link" href="servicios.html">Ver todas las arepas </a></div>
 <div class="category-tabs" role="tablist" aria-label="Categorías del menú">${featured.map((category, i) => `<button role="tab" type="button" id="tab-${i}" aria-controls="panel-${i}" aria-selected="${i === 0}" tabindex="${i === 0 ? 0 : -1}">${category.name}<span>03</span></button>`).join("")}</div>
 ${featured.map((category, i) => `<div class="product-grid" id="panel-${i}" role="tabpanel" aria-labelledby="tab-${i}" tabindex="0"${i ? " hidden" : ""}>${category.items.map(([name, asset, price]) => productCard({ name, asset, price, description: "Calidad premium, para disfrutar a tu manera.", badge: "Nuevo" })).join("")}</div>`).join("")}
 <p class="menu-footnote">Precios en pesos colombianos (COP).</p></section>
 <section class="story-band"><div class="container split"><div class="story-art">${image("boli", "El equipo de Tío Nené en el negocio")}<span class="story-label">El ingrediente especial<br><em>siempre es el cariño.</em></span></div><div class="prose"><p class="eyebrow">DE NUESTRA COCINA A TU MESA</p><h2>Sabores que cuentan<br>nuestra historia.</h2><p>Nuestro negocio nació del amor por la comida tradicional y la idea de compartir los sabores auténticos de nuestras raíces.</p><p>Cada arepa que preparamos está hecha con ingredientes frescos y mucho cariño. Conservamos nuestras tradiciones culinarias, combinando lo mejor de lo clásico con un toque especial.</p><a class="button button-secondary" href="qnso.html">Así somos </a></div></div></section>
 <section class="visit-banner container"><div><p class="eyebrow">LA MESA ESTÁ LISTA</p><h2>Tu próxima arepa<br>te espera aquí.</h2></div><div><p>Encuentra tu sede y ven a disfrutar<br>de un buen momento con nosotros.</p><a class="button" href="horarios.html">Ver horarios y sedes ${icon("pin")}</a></div><span class="visit-decoration" aria-hidden="true">${icon("sun")}</span></section>`,
};
