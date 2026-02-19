// Utilidades comunes: sanitización, DOM seguro, formatos, helpers
export function sanitizeInput(value) {
  if (typeof value !== 'string') return '';
  const trimmed = value.trim();
  const noTags = trimmed.replace(/[<>]/g, '');
  return noTags.replace(/[\u0000-\u001F\u007F-\u009F]/g, '');
}

export function formatCurrency(value, { locale, code, maxFraction }) {
  return new Intl.NumberFormat(locale, { style: 'currency', currency: code, maximumFractionDigits: maxFraction }).format(value);
}

export function el(tag, className) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  return node;
}

export function setAttrs(elm, attrs = {}) {
  Object.entries(attrs).forEach(([k, v]) => {
    if (v !== undefined && v !== null) elm.setAttribute(k, String(v));
  });
}

export function safeText(elm, text) {
  elm.textContent = typeof text === 'string' ? text : '';
}

export function qs(selector, root = document) { return root.querySelector(selector); }
export function qsa(selector, root = document) { return Array.from(root.querySelectorAll(selector)); }

export function safeOpenNewTab(url) {
  try { window.open(url, '_blank', 'noopener,noreferrer'); } catch (_) { /* noop */ }
}

export function scrollToId(id) {
  const elTarget = document.getElementById(id);
  if (elTarget) elTarget.scrollIntoView({ behavior: 'smooth', block: 'start' });
}
