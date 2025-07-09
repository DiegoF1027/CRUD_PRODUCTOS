const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const db = require('./database/db');
const productosRoutes = require('./routes/productos');
const authRoutes = require('./routes/auth');

// Configuración del servidor Express
const app = express();

// Instalacion de middlewares
app.use(bodyParser.json());
app.use(cors());
app.use(express.static('public'));

// Conexión a MongoDB
db.connect();

// Rutas de productos
app.use('/api/productos', productosRoutes);
app.use('/api/auth', authRoutes);

module.exports = app;