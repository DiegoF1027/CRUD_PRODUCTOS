const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const e = require('express');

const usuarioSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, required: true },
  email: { type: String, required: true, unique: true }
});

// Hash de contraseña antes de guardar
usuarioSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Método para comparar contraseñas
usuarioSchema.methods.compararPassword = function(password) {
  return bcrypt.compare(password, this.password);
};

module.exports = mongoose.model('Usuario', usuarioSchema);