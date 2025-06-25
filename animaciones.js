// =============================
// Protecciones avanzadas para webs
// Archivo: seguridad_pro.js
// =============================

// 1. Bloquear clic derecho
window.addEventListener('contextmenu', e => e.preventDefault());

// 2. Bloquear clic izquierdo fuera de campos permitidos
window.addEventListener('mousedown', e => {
  if (e.button === 0 && !['INPUT', 'TEXTAREA', 'SELECT'].includes(e.target.tagName)) {
    e.preventDefault();
  }
});

// 3. Bloquear teclas especiales y combinaciones peligrosas
window.addEventListener('keydown', e => {
  const key = e.key.toLowerCase();
  const tag = e.target.tagName;

  const bloqueadas = [
    'f1','f2','f3','f4','f5','f6','f7','f8','f9','f10','f11','f12',
    'u','i','s','c','e','j','k','a','d','h'
  ];

  if (
    ['control', 'alt', 'meta', 'shift'].includes(key) ||
    e.ctrlKey || e.altKey || e.metaKey || e.shiftKey ||
    bloqueadas.includes(key)
  ) {
    e.preventDefault();
  }

  // Previene Backspace/Delete fuera de inputs
  if ((key === 'delete' || key === 'backspace') && !['INPUT', 'TEXTAREA'].includes(tag)) {
    e.preventDefault();
  }
});

// 4. Protección básica en móviles (evitar selección y copiado)
document.addEventListener('selectstart', e => e.preventDefault());
document.addEventListener('copy', e => e.preventDefault());
