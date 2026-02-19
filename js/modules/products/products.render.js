// Render seguro sin innerHTML. BEM + accesible.
import { el, setAttrs, safeText, formatCurrency } from '../../core/utils.js';
import { APP_CONFIG } from '../../core/config.js';

function createStars(rating) {
  const wrap = el('div', 'stars');
  const full = Math.floor(rating);
  const hasHalf = rating - full >= 0.5;
  for (let i = 1; i <= 5; i++) {
    const s = el('span', 'star' + (i <= full ? ' star--filled' : (i === full + 1 && hasHalf ? ' star--half' : '')));
    s.setAttribute('aria-hidden', 'true');
    wrap.appendChild(s);
  }
  setAttrs(wrap, { role: 'img', 'aria-label': `${rating.toFixed(1)} de 5 estrellas` });
  return wrap;
}

function buildBadge(text) {
  const b = el('span', 'badge');
  const t = (text || '').toLowerCase();
  if (t.includes('vendido')) b.classList.add('badge--bestseller');
  if (t.includes('nuevo')) b.classList.add('badge--new');
  safeText(b, text);
  return b;
}

export function renderProducts(list, container, onBuy) {
  if (!container) return;
  container.replaceChildren();
  container.setAttribute('aria-busy', 'true');

  list.forEach((p) => {
    const card = el('article', 'card');
    setAttrs(card, { 'data-id': p.id, 'data-category': p.category });

    const media = el('div', 'card__media');
    const img = el('img', 'card__img');
    setAttrs(img, { src: p.image, alt: p.alt || p.name, loading: 'lazy' });
    media.appendChild(img);

    const badges = el('div', 'card__badges');
    (p.badges || []).forEach(b => badges.appendChild(buildBadge(b)));
    media.appendChild(badges);

    const body = el('div', 'card__body');
    const title = el('h3', 'card__title');
    safeText(title, p.name);

    const meta = el('div', 'card__meta');
    const price = el('span', 'price');
    safeText(price, formatCurrency(p.price, {
      locale: APP_CONFIG.currency.locale,
      code: APP_CONFIG.currency.code,
      maxFraction: APP_CONFIG.currency.maxFraction
    }));

    const stars = createStars(p.rating);
    meta.appendChild(price);
    meta.appendChild(stars);

    body.appendChild(title);
    body.appendChild(meta);

    const actions = el('div', 'card__actions');
    const buy = el('button', 'btn btn--primary card__buy');
    buy.type = 'button';
    safeText(buy, 'Comprar');
    buy.addEventListener('click', () => {
      try { onBuy && onBuy(p); } catch (_) { /* noop */ }
    });

    actions.appendChild(buy);

    card.appendChild(media);
    card.appendChild(body);
    card.appendChild(actions);

    container.appendChild(card);
  });

  container.setAttribute('aria-busy', 'false');
}