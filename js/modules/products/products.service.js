// Servicio de productos: abstracción para futura API.
// Hoy: lee de products.data.js. Mañana: fetch(HTTPS) a REST segura.
import { PRODUCTS_DATA } from './products.data.js';
import { APP_CONFIG } from '../../core/config.js';

let cache = null;

export async function getAllProducts() {
  // Simula caché en memoria (rápido y predecible)
  if (cache) return cache;
  // Futuro: fetch(`${APP_CONFIG.api.baseUrl}${APP_CONFIG.api.endpoints.products}`)
  cache = PRODUCTS_DATA.map(p => ({ ...p }));
  return cache;
}

export async function getProductsByCategory(category) {
  const all = await getAllProducts();
  if (!category || category === 'todos') return all;
  return all.filter(p => p.category === category);
}

export function getAvailableCategories() {
  return ['familia', 'mujer', 'niños'];
}