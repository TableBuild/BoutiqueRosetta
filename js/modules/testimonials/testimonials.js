// Módulo de testimonios: render desacoplado, escalable a API.
import { el, safeText } from '../../core/utils.js';

const TESTIMONIALS = [
  { name: 'María P.', text: '¡Las mejores pijamas! Suaves y frescas. La atención fue excelente.'},
  { name: 'Ana G.', text: 'Me encantó la calidad y el empaque. Volveré a comprar.'},
  { name: 'Camila R.', text: 'Mi familia quedó feliz con el set. 10/10.'},
];

export function renderTestimonials(rootId = 'testimonials-list') {
  const list = document.getElementById(rootId);
  if (!list) return;
  list.setAttribute('aria-busy', 'true');
  list.replaceChildren();

  TESTIMONIALS.forEach(t => {
    const card = el('article', 'testimonial');

    const name = el('h3', 'testimonial__name'); safeText(name, t.name);
    const text = el('p', 'testimonial__text'); safeText(text, t.text);
   
    card.appendChild(name);
    card.appendChild(text);
   
    list.appendChild(card);
  });

  list.setAttribute('aria-busy', 'false');
}
