// State manager simple (Pub/Sub) preparado para carrito y filtros.
const listeners = new Set();

const state = {
  filter: 'todos',
  cart: [], // futuro
};

export function getState() {
  return { ...state, cart: [...state.cart] };
}

export function setFilter(filter) {
  state.filter = filter;
  notify();
}

export function addToCart(item) {
  state.cart.push({ ...item });
  notify();
}

export function subscribe(fn) {
  listeners.add(fn);
  return () => listeners.delete(fn);
}

function notify() {
  listeners.forEach(fn => {
    try { fn(getState()); } catch (_) { /* noop */ }
  });
}