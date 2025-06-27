// middleware/middlewareWhiteList.js

// Lista blanca de roles permitidos para cada acción
const whitelist = {
  ver: ['superadmin', 'admin', 'user'],
  crear: ['superadmin', 'admin'],
  editar: ['superadmin', 'admin'],
  eliminar: ['superadmin']
};

// Middleware para verificar si el rol del usuario está permitido para una acción específica utilizando la lista blanca de arriba 👌
function whitelistAuthentication(accion) {
  return (req, res, next) => {
    const role = req.usuario?.role;
    if (!role || !whitelist[accion]?.includes(role)) {
      return res.status(403).json({ mensaje: 'Acceso denegado: rol no permitido para esta acción' });
    }
    next();
  };
}

module.exports = whitelistAuthentication;