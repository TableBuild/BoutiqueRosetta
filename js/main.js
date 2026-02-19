import { APP_CONFIG } from './core/config.js';
import { qs, qsa, safeOpenNewTab } from './core/utils.js';
import { getAllProducts, getProductsByCategory } from './modules/products/products.service.js';
import { renderProducts } from './modules/products/products.render.js';
import { initCountdown } from './modules/countdown/countdown.js';
import { initContactFormController } from './modules/form/form.controller.js';
import { initWhatsAppFab, buildWhatsAppLink } from './modules/whatsapp/whatsapp.js';
import { setFilter, getState, subscribe } from './core/state.js';
import { renderTestimonials } from './modules/testimonials/testimonials.js';

async function initializeProducts() {
  const grid = document.getElementById('products-grid');
  if (!grid) return;

  const all = await getAllProducts();
  renderProducts(all, grid, onBuy);

  const filters = qsa('.filters .chip');
  filters.forEach((chip) => {
    chip.addEventListener('click', async () => {
      const filter = chip.getAttribute('data-filter') || 'todos';
      setFilter(filter);

      // UI active state
      filters.forEach(c => {
        const active = c === chip;
        c.classList.toggle('chip--active', active);
        c.setAttribute('aria-pressed', active ? 'true' : 'false');
      });

      const list = await getProductsByCategory(filter);
      renderProducts(list, grid, onBuy);
    });
  });
}

function onBuy(product) {
  const msg = `Hola, quiero información sobre las pijamas. Estoy interesad@ en: ${product.name} (ID ${product.id}).`;
  const url = buildWhatsAppLink(msg);
  safeOpenNewTab(url);
}

function initPromoCountdown() {
  const end = new Date(Date.now() + APP_CONFIG.features.promoDays * 24 * 60 * 60 * 1000);
  initCountdown('promo-countdown', end);
}

function initYear() {
  const y = document.getElementById('year');
  if (y) y.textContent = String(new Date().getFullYear());
}

function initSmoothNav() {
  const navLinks = qsa('.header__nav a[href^="#"]');
  navLinks.forEach(a => {
    a.addEventListener('click', (e) => {
      // Deja que el comportamiento por defecto haga scroll suave (CSS), fallback:
      // e.preventDefault(); scrollToId(a.getAttribute('href').slice(1));
    });
  });
}

function init() {
  initYear();
  initSmoothNav();
  initializeProducts();
  initPromoCountdown();
  renderTestimonials();
  initContactFormController();
  initWhatsAppFab(); // FAB global
  // Subscribirse a cambios de estado (futuro: carrito, auth, etc.)
  subscribe((_state) => { /* hook para debug/analytics */ });
}

document.addEventListener('DOMContentLoaded', init);