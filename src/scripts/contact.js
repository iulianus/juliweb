document.querySelector('#consulta-form button').disabled = false;
// Stage 1: no request is sent and no personal data is stored.
// Stage 2: connect a server-side endpoint here; never expose a Resend key in the browser.
document.querySelector('#consulta-form')?.addEventListener('submit', (event) => {
 event.preventDefault();
 const status = document.querySelector('#form-status');
 status.hidden = false;
 status.textContent = 'El envío del formulario todavía no está disponible. Por favor, intentá nuevamente más adelante.';
});

