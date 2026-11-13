import { icon, image } from "../components.mjs";

const locations = [
  ["Principal", "Carrera 46 #75-32"],
  ["Norte", "Calle 84 #53-20"],
  ["Central", "Carrera 54 #70-40"],
  ["Sur", "Calle 30 #33-28"],
];

const phones = `<a href="tel:+573001234567">+57 300 123 4567</a><a href="tel:+573009876543">+57 300 987 6543</a>`;

const hours = `<dl class="schedule">
  <div><dt>Lunes a viernes</dt><dd>8:00 a. m. – 6:00 p. m.</dd></div>
  <div><dt>Sábado</dt><dd>9:00 a. m. – 1:00 p. m.</dd></div>
  <div><dt>Domingo</dt><dd>Cerrado</dd></div>
</dl>`;

export const details = [
  {
    file: "qnso.html",
    title: "Nuestra historia | Tío Nené · Arepas y jugos",
    description:
      "Conoce la historia de Tío Nené: arepas hechas con ingredientes frescos, cariño y el sabor auténtico de nuestras raíces.",
    active: "qnso.html",
    content: `
      <section class="page-intro container">
        <p class="eyebrow">NUESTRA HISTORIA</p>
        <h1>De nuestras raíces,<br>directo a tu mesa.</h1>
        <p>Tradición, ingredientes frescos y mucho cariño. Eso es lo que llevamos dentro.</p>
      </section>
      <section class="section container split" aria-labelledby="story-heading">
        <figure class="story-image">
          ${image("boli", "Una persona del equipo de Tío Nené en el negocio", { loading: "eager", width: 750, height: 1000 })}
          <figcaption class="story-caption">El cariño también es parte de la receta.</figcaption>
        </figure>
        <div class="prose">
          <p class="eyebrow">¿QUIÉNES SOMOS?</p>
          <h2 id="story-heading">Mucho más que<br>una buena arepa.</h2>
          <p>Nuestro negocio nació del amor por la comida tradicional y la idea de compartir los sabores auténticos de nuestras raíces. Cada arepa que preparamos está hecha con ingredientes frescos y mucho cariño, para ofrecerte una experiencia única en cada bocado.</p>
          <p>Creemos en la importancia de preservar nuestras tradiciones culinarias, con recetas que combinan lo mejor de lo clásico y un toque especial que las hace únicas.</p>
          <p>Somos una empresa dedicada a ofrecer productos de la más alta calidad, combinando la tradición con la innovación para brindarte lo mejor. Nuestro compromiso es la excelencia, siempre buscando superar las expectativas de nuestros clientes.</p>
          <a class="button" href="servicios.html">Conoce nuestro menú </a>
        </div>
      </section>
      <section class="section container" aria-labelledby="values-heading">
        <div class="section-heading"><div><p class="eyebrow">LO QUE NOS MUEVE</p><h2 id="values-heading">Nuestra esencia, en cada bocado.</h2></div></div>
        <div class="detail-grid story-values">
          <article class="panel detail-card">${icon("heart")}<h3>El sabor de nuestras raíces</h3><p>Preservamos la tradición de la cocina que nos reúne alrededor de la mesa.</p></article>
          <article class="panel detail-card">${icon("leaf")}<h3>Ingredientes frescos</h3><p>La calidad empieza con lo que elegimos para preparar cada arepa.</p></article>
          <article class="panel detail-card">${icon("check")}<h3>Hechas con cariño</h3><p>Un toque especial y el compromiso de brindarte lo mejor, todos los días.</p></article>
        </div>
      </section>`,
  },
  {
    file: "horarios.html",
    title: "Horarios y sedes | Tío Nené · Arepas y jugos",
    description:
      "Consulta los horarios de atención, direcciones de nuestras cuatro sedes y teléfonos de contacto de Tío Nené en Barranquilla.",
    active: "horarios.html",
    content: `
      <section class="page-intro container">
        <p class="eyebrow">HORARIOS Y SEDES</p>
        <h1>Siempre hay un buen<br>momento para una arepa.</h1>
        <p>Encuentra tu sede, revisa nuestros horarios y ven a disfrutar del sabor de casa.</p>
      </section>
      <section class="section container split" aria-label="Información para tu visita">
        <div class="panel">
          <p class="eyebrow">${icon("clock")} TE ESPERAMOS</p>
          <h2>Horario de atención</h2>
          ${hours}
        </div>
        <div class="panel">
          <p class="eyebrow">${icon("phone")} HABLEMOS</p>
          <h2>¿Planeas visitarnos?</h2>
          <p>Comunícate con nosotros para consultar disponibilidad o resolver tus dudas.</p>
          <div class="info-list">${phones}</div>
          <a href="contacto.html" class="text-link">Ir a contacto </a>
        </div>
      </section>
      <section class="section container" aria-labelledby="locations-heading">
        <div class="section-heading"><div><p class="eyebrow">CERCA DE TI</p><h2 id="locations-heading">Nuestras sedes</h2></div><p>Cuatro direcciones para encontrarnos.</p></div>
        <div class="location-grid">
          ${locations.map(([name, address], index) => `<article class="location-card"><span class="eyebrow">0${index + 1} / BARRANQUILLA</span><h3>${icon("pin")} Sede ${name}</h3><address>${address}</address><a class="text-link" href="https://www.google.com/maps/search/?api=1&amp;query=${encodeURIComponent(`${address}, Barranquilla, Colombia`)}" target="_blank" rel="noopener noreferrer" aria-label="Buscar en el mapa: sede ${name} (abre una pestaña nueva)">Buscar en el mapa </a></article>`).join("")}
        </div>
      </section>
      <section class="section container" aria-labelledby="map-heading">
        <div class="section-heading"><div><p class="eyebrow">BARRANQUILLA</p><h2 id="map-heading">Nos vemos por aquí.</h2></div></div>
        <div class="map-panel"><iframe title="Mapa de referencia de Barranquilla, sector Metropolitana" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3917.502801791871!2d-74.80633622630194!3d10.92534045643206!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8ef5d292d3e0b75b%3A0x9f5215aad9966215!2sCl.%2046c%2C%20Metropolitana%2C%20Barranquilla%2C%20Atl%C3%A1ntico!5e0!3m2!1ses!2sco!4v1731376220489!5m2!1ses!2sco" width="1200" height="400" loading="lazy" allowfullscreen referrerpolicy="no-referrer-when-downgrade"></iframe></div>
        <p class="map-note">Mapa de referencia de la ciudad. Para encontrar una sede, usa el enlace de su dirección.</p>
      </section>`,
  },
  {
    file: "contacto.html",
    title: "Contacto | Tío Nené · Arepas y jugos",
    description:
      "Ponte en contacto con Tío Nené. Consulta nuestros teléfonos y horarios o prepara tu mensaje para conversar con nosotros.",
    active: "contacto.html",
    content: `
      <section class="page-intro container">
        <p class="eyebrow">CONTACTO</p>
        <h1>Las buenas conversaciones<br>empiezan con un antojo.</h1>
        <p>¿Tienes una pregunta o quieres saber más? Aquí encuentras cómo hablar con nosotros.</p>
      </section>
      <section class="section container contact-layout" aria-labelledby="contact-heading">
        <div>
          <div class="panel">
            <p class="eyebrow">${icon("phone")} CONTACTO DIRECTO</p>
            <h2>Estamos para escucharte.</h2>
            <p>Llámanos para consultar nuestros productos y resolver tus dudas.</p>
            <div class="info-list">${phones}</div>
          </div>
          <div class="panel">
            <p class="eyebrow">${icon("clock")} NUESTRO HORARIO</p>
            ${hours}
            <a class="text-link" href="horarios.html">Encuentra tu sede </a>
          </div>
        </div>
        <div class="panel">
          <p class="eyebrow">CUÉNTANOS</p>
          <h2 id="contact-heading">Prepara tu mensaje</h2>
          <p id="contact-help" class="form-hint">Completa los campos para preparar y copiar tu mensaje. Este formulario no lo envía; para contactarnos directamente, usa nuestros teléfonos.</p>
          <form class="contact-form" data-contact-form method="post" aria-describedby="contact-help">
            <div class="field"><label for="name">Tu nombre <span aria-hidden="true">*</span></label><input id="name" name="name" type="text" placeholder="Escribe tu nombre" autocomplete="name" maxlength="100" required></div>
            <div class="field"><label for="email">Correo electrónico <span aria-hidden="true">*</span></label><input id="email" name="email" type="email" placeholder="tu@correo.com" autocomplete="email" maxlength="254" required></div>
            <div class="field"><label for="message">Tu mensaje <span aria-hidden="true">*</span></label><textarea id="message" name="message" rows="5" placeholder="Escribe tu mensaje" maxlength="2000" required></textarea></div>
            <p class="form-hint">Todos los campos son obligatorios. Tus datos no se guardan ni se envían desde este formulario.</p>
            <button class="button" type="submit" data-contact-submit disabled>Preparar mensaje </button>
            <p id="form-status" class="form-status" role="status" aria-live="polite"></p>
          </form>
          <div class="contact-result" data-contact-result hidden>
            <div class="field"><label for="prepared-message">Tu mensaje preparado</label><textarea id="prepared-message" rows="6" readonly></textarea></div>
            <button class="button button-secondary" data-copy-message type="button">Copiar mensaje</button>
          </div>
          <noscript><p>Para preparar el mensaje necesitas activar JavaScript. También puedes llamarnos al <a href="tel:+573001234567">+57 300 123 4567</a>.</p></noscript>
        </div>
      </section>`,
  },
];
