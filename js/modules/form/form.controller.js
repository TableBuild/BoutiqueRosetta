// Controlador de formulario: eventos desacoplados, feedback accesible.
import { qs, safeText } from '../../core/utils.js';
import { validateContactForm } from './validation.js';

export function initContactFormController(formId = 'contact-form') {
  const form = document.getElementById(formId);
  if (!form) return;

  const nameEl = qs('#name', form);
  const emailEl = qs('#email', form);
  const messageEl = qs('#message', form);

  const errName = qs('#error-name', form);
  const errEmail = qs('#error-email', form);
  const errMessage = qs('#error-message', form);
  const statusEl = qs('#form-status', form);

  function showErrors(errors) {
    safeText(errName, errors.name || '');
    safeText(errEmail, errors.email || '');
    safeText(errMessage, errors.message || '');

    if (errors.name) nameEl.setAttribute('aria-invalid', 'true'); else nameEl.removeAttribute('aria-invalid');
    if (errors.email) emailEl.setAttribute('aria-invalid', 'true'); else emailEl.removeAttribute('aria-invalid');
    if (errors.message) messageEl.setAttribute('aria-invalid', 'true'); else messageEl.removeAttribute('aria-invalid');
  }

  function handleSubmit(e) {
    e.preventDefault();
    safeText(statusEl, '');

    const result = validateContactForm({
      name: nameEl.value,
      email: emailEl.value,
      message: messageEl.value
    });

    if (!result.ok) {
      showErrors(result.errors);
      return;
    }

    showErrors({});
    // Futura integración: fetch(POST /api/contact) con HTTPS, timeout y manejo de errores.
    safeText(statusEl, '¡Gracias! Hemos recibido tu mensaje.');
    form.reset();
  }

  function handleBlur() {
    const result = validateContactForm({
      name: nameEl.value,
      email: emailEl.value,
      message: messageEl.value
    });
    showErrors(result.errors);
  }

  form.addEventListener('submit', handleSubmit);
  [nameEl, emailEl, messageEl].forEach(el => el.addEventListener('blur', handleBlur));
}