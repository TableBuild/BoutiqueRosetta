// Validación y sanitización robusta. XSS-safe (sin innerHTML).
import { sanitizeInput } from '../../core/utils.js';

export function isValidName(name) {
  return /^[A-Za-zÁÉÍÓÚáéíóúÑñÜü' -]{2,}$/.test(name);
}

export function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email);
}

export function validateContactForm(fields) {
  const name = sanitizeInput(fields.name || '');
  const email = sanitizeInput(fields.email || '');
  const message = sanitizeInput(fields.message || '');

  const errors = {};
  if (!isValidName(name)) errors.name = 'Ingresa un nombre válido.';
  if (!isValidEmail(email)) errors.email = 'Ingresa un email válido.';
  if (message && message.length < 3) errors.message = 'El mensaje es muy corto.';

  return {
    ok: Object.keys(errors).length === 0,
    values: { name, email, message },
    errors
  };
}
