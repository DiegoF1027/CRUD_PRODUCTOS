# 🚀 CRUD de Productos - Práctica Fullstack

Este proyecto es una aplicación CRUD de productos construida con **Node.js**, **Express**, **MongoDB** y un frontend en **HTML/CSS/JS** puro. Incluye autenticación JWT, control de acceso por roles, paginación, ordenamiento y exportación de productos a **CSV** o **Excel (.xlsx)**.

---

## ✨ Características

- 🔒 **Autenticación JWT** (login seguro)
- 🛡️ **Control de acceso por roles** (`superadmin`, `admin`, `user`)
- 📝 **CRUD de productos** (crear, leer, actualizar, eliminar)
- 📄 **Paginación y ordenamiento** de productos
- 📤 **Exportación** de productos a **CSV** o **Excel (.xlsx)**
- 🎨 **Alertas** elegantes con SweetAlert2 (tema oscuro)
- 🧩 **Protección de rutas** y middlewares personalizados

---

## ⚙️ Instalación

1. **Clona el repositorio**
   ```bash
   git clone <url-del-repo>
   cd crud-practica
   ```

2. **Instala las dependencias**
   ```bash
   npm install
   ```

3. **Configura las variables de entorno**

   Crea un archivo `.env` en la raíz con el siguiente contenido (ajusta tus datos de MongoDB):

   ```
   MONGO_USER=tu_usuario
   MONGO_PASSWORD=tu_password
   MONGO_CLUSTER=tu_cluster
   MONGO_DB=crud-practica
   JWT_SECRET=tu_secreto
   ```

4. **Inicia el servidor**
   ```bash
   node server.js
   ```

5. **Abre el frontend**

   Ve a [http://localhost:5000](http://localhost:5000) en tu navegador.

---

## 🖱️ Uso

- 🔑 **Login:** Ingresa con un usuario registrado (ver colección `usuarios` en MongoDB).
- 🛠️ **CRUD:** Crea, edita, elimina y visualiza productos según tu rol.
- 📤 **Exportar:** Haz clic en "Exportar productos", elige el formato (CSV o Excel) y descarga el archivo.
- 🚪 **Cerrar sesión:** Usa el botón "Cerrar sesión".

---

## 📁 Estructura del proyecto

```
crud-practica/
│
├── controllers/
│   └── productosController.js
├── database/
│   └── db.js
├── middleware/
│   ├── middlewareAuth.js
│   └── middlewareWhiteList.js
├── models/
│   ├── producto.js
│   └── usuario.js
├── public/
│   ├── utils/
│   │   ├── exportCSV.js
│   │   ├── exportXlsx.js
│   │   └── utils.js
│   ├── api.js
│   ├── crud.html
│   ├── events.js
│   ├── index.html
│   ├── login.js
│   ├── main.js
│   └── ui.js
├── routes/
│   ├── auth.js
│   └── productos.js
├── .env
├── package.json
└── server.js
```

---

## 📝 Notas

- 📦 **Exportación a Excel** usa [SheetJS](https://sheetjs.com/) vía CDN.
- 📄 **Exportación a CSV** es nativa en JS.
- 💬 **SweetAlert2** se usa para todas las alertas y confirmaciones.
- 🛡️ **Roles y permisos** se controlan en el backend con middlewares.

---

## 👨‍💻 Créditos

Desarrollado por Diego Forero como práctica de CRUD Fullstack.

---