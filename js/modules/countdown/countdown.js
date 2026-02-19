// Contador regresivo modular, accesible.
import { el, safeText } from '../../core/utils.js';

function unitBox(label, value) {
  const box = el('div', 'countdown__box');
  const v = el('div'); safeText(v, value.toString().padStart(2, '0'));
  const l = el('small'); safeText(l, label);
  box.appendChild(v); box.appendChild(l);
  return box;
}

export function initCountdown(rootId, endDate) {
  const root = document.getElementById(rootId);
  if (!root || !(endDate instanceof Date)) return;

  function render(diffMs) {
    root.replaceChildren();
    const total = Math.max(0, Math.floor(diffMs / 1000));
    const days = Math.floor(total / 86400);
    const hours = Math.floor((total % 86400) / 3600);
    const minutes = Math.floor((total % 3600) / 60);
    const seconds = total % 60;

    root.appendChild(unitBox('Días', days));
    root.appendChild(unitBox('Horas', hours));
    root.appendChild(unitBox('Min', minutes));
    root.appendChild(unitBox('Seg', seconds));
  }

  function tick() {
    const now = Date.now();
    const diff = endDate.getTime() - now;
    render(diff);
    if (diff <= 0) clearInterval(timer);
  }

  const timer = setInterval(tick, 1000);
  tick();
}