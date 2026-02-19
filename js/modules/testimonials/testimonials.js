// Módulo de testimonios: render desacoplado, escalable a API.
import { el, safeText } from '../../core/utils.js';

const TESTIMONIALS = [
  { name: 'María P.', text: '¡Las mejores pijamas! Suaves y frescas. La atención fue excelente.', rating: 5 },
  { name: 'Ana G.', text: 'Me encantó la calidad y el empaque. Volveré a comprar.', rating: 4.5 },
  { name: 'Camila R.', text: 'Mi familia quedó feliz con el set. 10/10.', rating: 5 },
];

function renderStars(container, rating) {
  const full = Math.floor(rating);
  const hasHalf = rating - full >= 0.5;
  for (let i = 1; i <= 5; i++) {
    const s = el('span', 'star' + (i <= full ? ' star--filled' : (i === full + 1 && hasHalf ? ' star--half' : '')));
    s.setAttribute('aria-hidden', 'true');
    container.appendChild(s);
  }
  container.setAttribute('role', 'img');
  container.setAttribute('aria-label', `${rating.toFixed(1)} de 5 estrellas`);
}

export function renderTestimonials(rootId = 'testimonials-list') {
  const list = document.getElementById(rootId);
  if (!list) return;
  list.setAttribute('aria-busy', 'true');
  list.replaceChildren();

  TESTIMONIALS.forEach(t => {
    const card = el('article', 'testimonial');

    const name = el('h3', 'testimonial__name'); safeText(name, t.name);
    const text = el('p', 'testimonial__text'); safeText(text, t.text);
    const stars = el('div', 'testimonial__stars'); renderStars(stars, t.rating);

    card.appendChild(name);
    card.appendChild(text);
    card.appendChild(stars);

    list.appendChild(card);
  });

  list.setAttribute('aria-busy', 'false');
}