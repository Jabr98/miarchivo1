describe('Autenticación con Google', () => {
  it('Debe redirigir y mostrar el token JWT', () => {
    cy.visit('http://localhost:3000/auth/google');
  });
});
