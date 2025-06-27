describe('Ruta protegida sin token JWT', () => {
  it('Debe denegar acceso a /api/protegido sin token', () => {
    cy.request({
      method: 'GET',
      url: 'http://localhost:3000/api/protegido',
      failOnStatusCode: false, // Evita que Cypress marque el test como fallido automáticamente
    }).then((response) => {
      expect(response.status).to.equal(401);
      expect(response.body).to.have.property('error', 'Token no proporcionado');
    });
  });
});
