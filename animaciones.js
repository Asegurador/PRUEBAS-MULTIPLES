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

// 4. Detectar apertura de herramientas de desarrollador y redireccionar tras 5s
setInterval(() => {
  const devtools = /./;
  devtools.toString = function () {
    this.opened = true;
    return '';
  };
  console.log('%c', devtools);

  if (devtools.opened) {
    let seconds = 5;
    document.body.innerHTML = `
      <div style="display:flex;flex-direction:column;justify-content:center;align-items:center;height:100vh;background:black;color:white;font-family:sans-serif;">
        <h1 style="color:red;font-size:2rem;">⚠️ Acceso no autorizado</h1>
        <p style="margin-top:1rem;">Redireccionando en <span id="contador">5</span> segundos...</p>
      </div>`;

    const intervalo = setInterval(() => {
      seconds--;
      document.getElementById('contador').textContent = seconds;
      if (seconds <= 0) {
        clearInterval(intervalo);
        window.location.href = window.location.href.split('#')[0]; // Recarga limpia
      }
    }, 1000);
  }
}, 1000);
