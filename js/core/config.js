// Configuración centralizada para facilitar entorno y escalabilidad.
// Mantén secretos en backend; aquí solo flags públicos.
export const APP_CONFIG = Object.freeze({
  appName: 'TuPijama',
  currency: { locale: 'es-CO', code: 'COP', maxFraction: 0 },
  // WhatsApp FAB
  whatsapp: {
    phone: '573000000000', // +57 300 000 0000 sin espacios
    defaultMessage: 'Hola, quiero información sobre las pijamas.',
  },
  // API preparada (usar HTTPS siempre)
  api: {
    baseUrl: 'https://api.tupijama.com', // placeholder para futuro
    endpoints: {
      products: '/v1/products',
      contact: '/v1/contact',
      checkout: '/v1/checkout/sessions',
    },
    timeoutMs: 8000,
  },
  features: {
    promoDays: 7,
  },
});
