describe('Ruta protegida con JWT caducado', () => {
  it('Debe denegar acceso a /api/protegido con token caducado', () => {
    const token = 'JWT_CADUCADO_GENERADO'; // 🔁 Usa un token expirado

    cy.request({
      method: 'GET',
      url: 'http://localhost:3000/api/protegido',
      failOnStatusCode: false,
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then((res) => {
      expect(res.status).to.equal(403);
      expect(res.body).to.have.property('error', 'Token inválido');
    });
  });
});
