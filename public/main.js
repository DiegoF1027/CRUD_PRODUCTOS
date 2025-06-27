// main.js
import { inicializarLogin } from './login.js';
import { obtenerProductos, crearProducto, eliminarProducto, obtenerProductoPorId, actualizarProducto } from './api.js';
import { renderTabla, renderPaginacion } from './ui.js';
import { manejarEventosTabla } from './events.js';
import { logout } from './utils/utils.js';
import { convertirAcsv, descargarCSV } from './utils/exportCSV.js';
import { exportarProductosXlsx } from './utils/exportXlsx.js';

let paginaActual = 1;
const LIMITE_POR_PAGINA = 10;
let filtroOrden;

export async function cargarYRenderizarProductos() {
  const orden = filtroOrden.value;
  const respuesta = await obtenerProductos(orden, paginaActual, LIMITE_POR_PAGINA);
  renderTabla(respuesta.productos);
  renderPaginacion(respuesta.page, respuesta.totalPages);
}

document.addEventListener('DOMContentLoaded', async () => {
  const form = document.getElementById('form-producto');
  filtroOrden = document.getElementById('filtro-orden');

  if (document.getElementById('loginForm')) {
    inicializarLogin();
    return;
  }

  await cargarYRenderizarProductos();

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const nombre = document.getElementById('nombre').value;
    const precio = document.getElementById('precio').value;
    await crearProducto({ nombre, precio });
    form.reset();
    paginaActual = 1; // Volver a la primera página tras crear
    await cargarYRenderizarProductos();
  });

  filtroOrden.addEventListener('change', async () => {
    paginaActual = 1;
    await cargarYRenderizarProductos();
  });

  document.getElementById('tabla-productos').addEventListener('click', manejarEventosTabla);

  // Manejar clicks en los botones de paginación
  document.getElementById('paginacion').addEventListener('click', async (e) => {
    if (e.target.classList.contains('pag-btn')) {
      paginaActual = parseInt(e.target.dataset.page);
      await cargarYRenderizarProductos();
    }
  });

  // Función para cerrar la sesión
  document.getElementById('btn-logout').addEventListener('click', () => {
    logout();
  });


  // Función encargada de capturar el id del botón para generar un CSV o XLSX dependiendo de la selección del usuario
  document.getElementById('btn-exportar').addEventListener('click', async () => {
    const { value: formato } = await Swal.fire({
      title: 'Exportar productos',
      html: `
        <select id="swal-formato" class="swal2-select" style="width: 100%; margin-top: 1em;">
          <option value="csv">CSV</option>
          <option value="xlsx">Excel (.xlsx)</option>
        </select>
      `,
      confirmButtonText: 'Exportar',
      focusConfirm: false,
      preConfirm: () => {
        return document.getElementById('swal-formato').value;
      }
    });

    if (!formato) return;

    try {
      const respuesta = await obtenerProductos('', 1, 10000);
      const productos = respuesta.productos || respuesta;

      const productosExportar = productos.map(p => ({
        nombre: p.nombre,
        precio: p.precio,
        fechaCreacion: p.fechaCreacion ? new Date(p.fechaCreacion).toLocaleString() : ''
      }));

      if (formato === 'csv') {
        const csv = convertirAcsv(productosExportar);
        descargarCSV('productos.csv', csv);
      } else if (formato === 'xlsx') {
        exportarProductosXlsx(productosExportar);
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'No se pudo exportar el archivo',
        confirmButtonColor: '#d33'
      });
    }
  });
});