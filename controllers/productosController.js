const Producto = require('../models/producto');
const moment = require('moment');
const _ = require('lodash');

// Controlador para manejar las operaciones CRUD de productos

// Función encargada de obtener un producto por ID
exports.getProductoPorId = async (req, res) => {
  try {
    const producto = await Producto.findById(req.params.id);
    if (!producto) {
      return res.status(404).json({ mensaje: 'Producto no encontrado' });
    }
    res.json(producto);
  } catch (error) {
    res.status(400).json({ mensaje: 'ID inválido' });
  }
};

// Funcion encargada de crear un nuevo producto
exports.crearProducto = async (req, res) => {
  const { nombre, precio } = req.body;
  const producto = new Producto({ nombre, precio });
  await producto.save();
  res.json(producto);
};

// Función encargada de obtener productos con filtros, ordenamientos y paginación
exports.obtenerProductos = async (req, res) => {
  const { fechaInicio, fechaFin, precioMin, precioMax, orden } = req.query;
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;
  let query = {};

  if (fechaInicio && fechaFin) {
    const inicio = moment(fechaInicio).startOf('day').toDate();
    const fin = moment(fechaFin).endOf('day').toDate();
    query.fechaCreacion = { $gte: inicio, $lte: fin };
  }

  if (precioMin || precioMax) {
    query.precio = {};
    if (precioMin) query.precio.$gte = parseFloat(precioMin);
    if (precioMax) query.precio.$lte = parseFloat(precioMax);
  }

  // Consulta base con filtros y paginación
  let productos = await Producto.find(query).skip(skip).limit(limit);

  // Ordenamiento en memoria (puedes optimizar usando sort en la consulta si lo prefieres)
  if (orden === 'precio_asc') {
    productos = _.orderBy(productos, ['precio'], ['asc']);
  } else if (orden === 'precio_desc') {
    productos = _.orderBy(productos, ['precio'], ['desc']);
  } else if (orden === 'fecha_reciente') {
    productos = _.orderBy(productos, ['fechaCreacion'], ['desc']);
  } else if (orden === 'fecha_antigua') {
    productos = _.orderBy(productos, ['fechaCreacion'], ['asc']);
  }

  // Total de productos para paginación
  const total = await Producto.countDocuments(query);

  res.json({
    productos,
    total,
    page,
    totalPages: Math.ceil(total / limit)
  });
};

// Funcion encargada de actualizar un producto
exports.actualizarProducto = async (req, res) => {
  const { id } = req.params;
  const { nombre, precio } = req.body;
  await Producto.findByIdAndUpdate(id, { nombre, precio });
  res.json({ mensaje: 'Producto actualizado' });
};

// Funcion encargada de eliminar un producto
exports.eliminarProducto = async (req, res) => {
  const { id } = req.params;
  await Producto.findByIdAndDelete(id);
  res.json({ mensaje: 'Producto eliminado' });
};
