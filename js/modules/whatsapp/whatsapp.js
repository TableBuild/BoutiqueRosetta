// WhatsApp FAB seguro y configurable (desde config.js)
import { APP_CONFIG } from '../../core/config.js';

export function buildWhatsAppLink(message) {
  const msg = typeof message === 'string' ? message.trim() : '';
  return `https://wa.me/${APP_CONFIG.whatsapp.phone}?text=${encodeURIComponent(msg)}`;
}

export function initWhatsAppFab(rootId = 'whatsapp-fab-root', customMsg) {
  const root = document.getElementById(rootId);
  if (!root) return;

  const a = document.createElement('a');
  a.className = 'whatsapp-fab';
  a.href = buildWhatsAppLink(customMsg || APP_CONFIG.whatsapp.defaultMessage);
  a.target = '_blank';
  a.rel = 'noopener noreferrer';
  a.setAttribute('aria-label', 'Chatear por WhatsApp');

  const img = document.createElement('img');
  img.src = './assets/icons/whatsapp.svg';
  img.alt = 'WhatsApp';
  a.appendChild(img);

  root.replaceChildren(a);
}