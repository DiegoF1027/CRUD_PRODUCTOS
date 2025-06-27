const mongoose = require('mongoose');
const moment = require('moment');

// Definición del esquema para el modelo Producto
const ProductoSchema = new mongoose.Schema({
  nombre: String,
  precio: Number,
  fechaCreacion: { type: Date, default: Date.now }
});

const Producto = mongoose.model('Producto', ProductoSchema);

module.exports = Producto;
