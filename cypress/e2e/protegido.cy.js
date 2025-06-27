describe('Ruta protegida con JWT', () => {
  it('Debe acceder a /api/protegido con token válido', () => {
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiMTA1MjgwMDU4OTM0NzA4MDM2MjE2IiwiZGlzcGxheU5hbWUiOiJqZWZmZXJzb24gYWxleGFuZGVyIGJlZG95YSByb2JheW8iLCJuYW1lIjp7ImZhbWlseU5hbWUiOiJiZWRveWEgcm9iYXlvIiwiZ2l2ZW5OYW1lIjoiamVmZmVyc29uIGFsZXhhbmRlciJ9LCJlbWFpbHMiOlt7InZhbHVlIjoiYmVkb3lhcm9iYXlvakBnbWFpbC5jb20iLCJ2ZXJpZmllZCI6dHJ1ZX1dLCJwaG90b3MiOlt7InZhbHVlIjoiaHR0cHM6Ly9saDMuZ29vZ2xldXNlcmNvbnRlbnQuY29tL2EvQUNnOG9jTGhTR19ubHR3enBDNF9CVlFKT1BWTUFkNFlrdUo3Vk8zZHVHeDJGc21VTUJ0OHJsNUNVZz1zOTYtYyJ9XSwicHJvdmlkZXIiOiJnb29nbGUiLCJfcmF3Ijoie1xuICBcInN1YlwiOiBcIjEwNTI4MDA1ODkzNDcwODAzNjIxNlwiLFxuICBcIm5hbWVcIjogXCJqZWZmZXJzb24gYWxleGFuZGVyIGJlZG95YSByb2JheW9cIixcbiAgXCJnaXZlbl9uYW1lXCI6IFwiamVmZmVyc29uIGFsZXhhbmRlclwiLFxuICBcImZhbWlseV9uYW1lXCI6IFwiYmVkb3lhIHJvYmF5b1wiLFxuICBcInBpY3R1cmVcIjogXCJodHRwczovL2xoMy5nb29nbGV1c2VyY29udGVudC5jb20vYS9BQ2c4b2NMaFNHX25sdHd6cEM0X0JWUUpPUFZNQWQ0WWt1SjdWTzNkdUd4MkZzbVVNQnQ4cmw1Q1VnXFx1MDAzZHM5Ni1jXCIsXG4gIFwiZW1haWxcIjogXCJiZWRveWFyb2JheW9qQGdtYWlsLmNvbVwiLFxuICBcImVtYWlsX3ZlcmlmaWVkXCI6IHRydWVcbn0iLCJfanNvbiI6eyJzdWIiOiIxMDUyODAwNTg5MzQ3MDgwMzYyMTYiLCJuYW1lIjoiamVmZmVyc29uIGFsZXhhbmRlciBiZWRveWEgcm9iYXlvIiwiZ2l2ZW5fbmFtZSI6ImplZmZlcnNvbiBhbGV4YW5kZXIiLCJmYW1pbHlfbmFtZSI6ImJlZG95YSByb2JheW8iLCJwaWN0dXJlIjoiaHR0cHM6Ly9saDMuZ29vZ2xldXNlcmNvbnRlbnQuY29tL2EvQUNnOG9jTGhTR19ubHR3enBDNF9CVlFKT1BWTUFkNFlrdUo3Vk8zZHVHeDJGc21VTUJ0OHJsNUNVZz1zOTYtYyIsImVtYWlsIjoiYmVkb3lhcm9iYXlvakBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZX19LCJpYXQiOjE3NTEwNTIzNTUsImV4cCI6MTc1MTA1NTk1NX0.PIBTiGREzklZb4ubZCr3dDVzF9iKc4b8BbwvXkdvQdA'; // 🔁 Reemplaza esto con tu token real

    cy.request({
      method: 'GET',
      url: 'http://localhost:3000/api/protegido',
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property('mensaje', '✅ Acceso concedido a ruta protegida');
    });
  });
});
