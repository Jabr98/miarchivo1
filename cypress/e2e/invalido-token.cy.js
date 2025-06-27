// cypress/e2e/invalido-token.cy.js
describe('Ruta protegida con JWT inválido', () => {
  it('Debe denegar acceso a /api/protegido con token inválido', () => {
    const tokenFalso = 'Bearer token.falso.no.valido';

    cy.request({
      method: 'GET',
      url: 'http://localhost:3000/api/protegido',
      headers: {
        Authorization: tokenFalso
      },
      failOnStatusCode: false
    }).then((res) => {
      expect(res.status).to.equal(403);
      expect(res.body).to.have.property('error');
      expect(res.body.error).to.equal('Token inválido');
    });
  });
});
