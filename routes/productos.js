const express = require('express');
const router = express.Router();
const productosController = require('../controllers/productosController');
const auth = require('../middleware/middlewareAuth'); // Middleware de autenticación
const whitelistAuthentication = require('../middleware/middlewareWhiteList'); // Middleware de lista blanca

router.get('/', auth, whitelistAuthentication('ver'), productosController.obtenerProductos);
router.get('/:id', auth, whitelistAuthentication('ver'), productosController.getProductoPorId);
router.post('/', auth, whitelistAuthentication('crear'), productosController.crearProducto);
router.put('/:id', auth, whitelistAuthentication('editar'), productosController.actualizarProducto);
router.delete('/:id', auth, whitelistAuthentication('eliminar'), productosController.eliminarProducto);

module.exports = router;