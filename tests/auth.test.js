const request = require('supertest');
const express = require('express');
const session = require('express-session');
const passport = require('passport');
require('../auth');

const app = express();

app.use(session({
  secret: 'testsecret',
  resave: false,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());

app.get('/auth/google', passport.authenticate('google', { scope: ['profile'] }));

describe('Rutas de autenticación', () => {
  it('Debería redirigir a Google para autenticación', async () => {
    const res = await request(app).get('/auth/google');
    expect(res.status).toBe(302); // 302: redirect
    expect(res.headers.location).toContain('accounts.google.com');
  });
});
const jwt = require('jsonwebtoken');

// Agregamos la ruta protegida como en index.js
app.get('/api/protegido', (req, res) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) return res.status(401).json({ error: 'Token no proporcionado' });

  try {
    const decoded = jwt.verify(token, 'testsecretjwt'); // clave usada aquí debe coincidir con la del token simulado
    res.json({ mensaje: '✅ Acceso concedido a ruta protegida', usuario: decoded.user });
  } catch (err) {
    res.status(403).json({ error: 'Token inválido' });
  }
});

describe('Ruta protegida /api/protegido', () => {
  it('Debe permitir acceso con token válido', async () => {
    const token = jwt.sign({ user: 'usuario_de_prueba' }, 'testsecretjwt', { expiresIn: '1h' });

    const res = await request(app)
      .get('/api/protegido')
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('mensaje');
  });

  it('Debe bloquear acceso si no hay token', async () => {
    const res = await request(app).get('/api/protegido');
    expect(res.statusCode).toBe(401);
    expect(res.body.error).toBe('Token no proporcionado');
  });
});
