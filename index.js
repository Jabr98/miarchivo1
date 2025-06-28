require('dotenv').config(); 
console.log("JWT_SECRET:", process.env.JWT_SECRET);

const express = require('express');
const passport = require('passport');
const session = require('express-session');
const jwt = require('jsonwebtoken');
require('./auth');

const app = express();

// Middleware para sesión
app.use(session({
  secret: 'clave_secreta_temporal',
  resave: false,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());

// Middleware para verificar JWT
function verificarToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // "Bearer token"
  
  if (!token) return res.status(401).json({ error: 'Token no proporcionado' });

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ error: 'Token inválido' });
    req.user = user;
    next();
  });
}

// Rutas
app.get('/', (req, res) => res.send('🟢 API funcionando'));

// Ruta de login con Google
app.get('/auth/google',
  passport.authenticate('google', { scope: ['profile', 'email'] }));

// Callback de Google + generación de JWT
app.get('/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/' }),
  (req, res) => {
    const token = jwt.sign({ user: req.user }, process.env.JWT_SECRET);
    res.send(`
      <h2>Bienvenido ${req.user.displayName}</h2>
      <p>Tu token JWT es:</p>
      <code>${token}</code>
      <p>Copia este token y úsalo en rutas protegidas como:</p>
      <pre>
fetch('/api/protegido', {
  headers: {
    "Authorization": "Bearer AQUÍ_EL_TOKEN"
  }
})
.then(r => r.json())
.then(console.log);
      </pre>
    `);
  });

// Ruta protegida con JWT
app.get('/api/protegido', verificarToken, (req, res) => {
  res.json({
    mensaje: "✅ Acceso concedido a ruta protegida",
    usuario: req.user.user.displayName
  });
});

// Servidor
if (require.main === module) {
  app.listen(3000, () => console.log('Servidor en http://localhost:3000'));
}

module.exports = app; // 👈 Esto es necesario para que supertest lo use
