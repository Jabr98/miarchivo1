describe('Flujo de autenticación con Google', () => {
  it('Debe redirigir al login de Google', () => {
    cy.visit('http://localhost:3000/auth/google');
    cy.url().should('include', 'accounts.google.com');
  });

  it.skip('Debe mostrar el token JWT tras login manual', () => {
    // ❌ Cypress no puede automatizar este flujo porque Google bloquea automatizaciones.
    // ✅ Hazlo manualmente así:
    // 1. Abre tu navegador (fuera de Cypress).
    // 2. Ve a http://localhost:3000/auth/google
    // 3. Inicia sesión con tu cuenta de Google.
    // 4. Copia el token que se muestra.
    // Ese token lo puedes pegar en `flujo-token.cy.js` para hacer pruebas reales.
  });
});