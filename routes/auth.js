const express = require('express');
const jwt = require('jsonwebtoken');
const Usuario = require('../models/usuario');
const router = express.Router();

const JWT_SECRET = process.env.JWT_SECRET || 'secreto123';

router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const usuario = await Usuario.findOne({ username });
  if (!usuario) {
    return res.status(401).json({ mensaje: 'Usuario o contraseña incorrectos' });
  }
  const esValido = await usuario.compararPassword(password);
  if (!esValido) {
    return res.status(401).json({ mensaje: 'Usuario o contraseña incorrectos' });
  }
  const token = jwt.sign({ id: usuario._id, username: usuario.username, email: usuario.email, role: usuario.role  }, JWT_SECRET, { expiresIn: '1h' });
  res.json({ token });
});

module.exports = router;