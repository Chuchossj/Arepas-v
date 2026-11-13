const toggle = document.querySelector(".menu-toggle");
const navigation = document.querySelector("#navigation");
function closeMenu(restoreFocus = false) {
  toggle.setAttribute("aria-expanded", "false");
  toggle.setAttribute("aria-label", "Abrir menú");
  navigation.classList.remove("is-open");
  if (restoreFocus) toggle.focus();
}
toggle?.addEventListener("click", () => {
  const open = toggle.getAttribute("aria-expanded") !== "true";
  toggle.setAttribute("aria-expanded", String(open));
  toggle.setAttribute("aria-label", open ? "Cerrar menú" : "Abrir menú");
  navigation.classList.toggle("is-open", open);
});
document.addEventListener("keydown", (event) => {
  if (
    event.key === "Escape" &&
    toggle?.getAttribute("aria-expanded") === "true"
  )
    closeMenu(true);
});
document.addEventListener("click", (event) => {
  if (
    !event.target.closest(".site-header") &&
    toggle?.getAttribute("aria-expanded") === "true"
  )
    closeMenu();
});
navigation
  ?.querySelectorAll("a")
  .forEach((link) => link.addEventListener("click", () => closeMenu()));
matchMedia("(min-width: 1000px)").addEventListener("change", () => closeMenu());

const slides = [...document.querySelectorAll("[data-slide]")];
let currentSlide = 0;
function showSlide(index) {
  currentSlide = (index + slides.length) % slides.length;
  slides.forEach((slide, i) => {
    slide.hidden = i !== currentSlide;
  });
  document
    .querySelectorAll("[data-go-slide]")
    .forEach((button, i) =>
      button.setAttribute("aria-pressed", String(i === currentSlide)),
    );
  document.querySelector("[data-slide-status]").textContent =
    slides[currentSlide].getAttribute("aria-label");
}
document
  .querySelector("[data-next-slide]")
  ?.addEventListener("click", () => showSlide(currentSlide + 1));
document
  .querySelector("[data-prev-slide]")
  ?.addEventListener("click", () => showSlide(currentSlide - 1));
document
  .querySelectorAll("[data-go-slide]")
  .forEach((button) =>
    button.addEventListener("click", () =>
      showSlide(Number(button.dataset.goSlide)),
    ),
  );

let touchStart = null;
const hero = document.querySelector(".hero");
hero?.addEventListener(
  "touchstart",
  (event) => {
    touchStart =
      event.touches.length === 1
        ? { x: event.touches[0].clientX, y: event.touches[0].clientY }
        : null;
  },
  { passive: true },
);
hero?.addEventListener(
  "touchend",
  (event) => {
    if (!touchStart || !event.changedTouches.length) return;
    const dx = event.changedTouches[0].clientX - touchStart.x;
    const dy = event.changedTouches[0].clientY - touchStart.y;
    touchStart = null;
    if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy) * 1.5) {
      showSlide(currentSlide + (dx < 0 ? 1 : -1));
    }
  },
  { passive: true },
);
hero?.addEventListener("touchcancel", () => {
  touchStart = null;
});

const tabs = [...document.querySelectorAll('[role="tab"]')];
function activateTab(index, focus = false) {
  tabs.forEach((tab, i) => {
    tab.setAttribute("aria-selected", String(i === index));
    tab.tabIndex = i === index ? 0 : -1;
    document.getElementById(tab.getAttribute("aria-controls")).hidden =
      i !== index;
  });
  if (focus) tabs[index].focus();
}
tabs.forEach((tab, index) => {
  tab.addEventListener("click", () => activateTab(index));
  tab.addEventListener("keydown", (event) => {
    let next;
    if (event.key === "ArrowRight") next = (index + 1) % tabs.length;
    if (event.key === "ArrowLeft")
      next = (index + tabs.length - 1) % tabs.length;
    if (event.key === "Home") next = 0;
    if (event.key === "End") next = tabs.length - 1;
    if (next !== undefined) {
      event.preventDefault();
      activateTab(next, true);
    }
  });
});

const form = document.querySelector("[data-contact-form]");
if (form) {
  form.querySelector("[data-contact-submit]").disabled = false;
  const product = new URLSearchParams(location.search).get("producto");
  if (product)
    form.elements.message.value = `Hola, me gustaría consultar por ${product.slice(0, 150)}.`;
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!form.reportValidity()) return;
    const result = document.querySelector("#prepared-message");
    result.value = `${form.elements.message.value.trim()}\n\nNombre: ${form.elements.name.value.trim()}\nCorreo: ${form.elements.email.value.trim()}`;
    document.querySelector("[data-contact-result]").hidden = false;
    document.querySelector("#form-status").textContent =
      "Mensaje preparado. Puedes copiarlo; aún no se ha enviado.";
    result.focus();
  });
  document
    .querySelector("[data-copy-message]")
    .addEventListener("click", async () => {
      const result = document.querySelector("#prepared-message");
      try {
        await navigator.clipboard.writeText(result.value);
        document.querySelector("#form-status").textContent =
          "Mensaje copiado. No se ha enviado desde esta página.";
      } catch {
        result.focus();
        result.select();
        document.querySelector("#form-status").textContent =
          "Seleccionamos tu mensaje. Usa la opción Copiar de tu dispositivo.";
      }
    });
}

// Content stays visible when JavaScript or animation support is unavailable.
if (
  "IntersectionObserver" in window &&
  !matchMedia("(prefers-reduced-motion: reduce)").matches
) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("reveal-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 },
  );
  document
    .querySelectorAll(".story-band .prose, .visit-banner, .detail-card")
    .forEach((node) => observer.observe(node));
}
