// events.js
import { eliminarProducto, obtenerProductoPorId, actualizarProducto, obtenerProductos } from './api.js';
import { cargarYRenderizarProductos } from './main.js';

// Maneja los eventos de la tabla de productos
export async function manejarEventosTabla(e) {
    // Evento para eliminar un producto
    if (e.target.classList.contains('btn-danger')) {
        const id = e.target.dataset.id;
        const nombre = e.target.dataset.nombre;

        const result = await Swal.fire({
            title: '¿Estás seguro?',
            text: `¿Deseas eliminar el producto "${nombre}"?`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Sí, eliminar',
            cancelButtonText: 'Cancelar'
        });

        if (result.isConfirmed) {
            await eliminarProducto(id);
            await cargarYRenderizarProductos();

            Swal.fire({
                title: 'Eliminado',
                text: `El producto "${nombre}" ha sido eliminado.`,
                icon: 'success',
                timer: 1000,
                showConfirmButton: false
            });
        }
    }

    // Evento para editar un producto
    if (e.target.classList.contains('btn-edit')) {
        const id = e.target.dataset.id;
        const producto = await obtenerProductoPorId(id);

        const { value: formValues } = await Swal.fire({
            title: 'Editar producto',
            html: `
        <input id="swal-nombre" class="swal2-input" placeholder="Nombre" value="${producto.nombre}">
        <input id="swal-precio" type="number" class="swal2-input" placeholder="Precio" value="${producto.precio}">
      `,
            focusConfirm: false,
            showCancelButton: true,
            confirmButtonText: 'Guardar cambios',
            preConfirm: () => {
                const nombre = document.getElementById('swal-nombre').value;
                const precio = document.getElementById('swal-precio').value;
                if (!nombre || !precio) {
                    Swal.showValidationMessage('Todos los campos son obligatorios');
                    return false;
                }
                return { nombre, precio };
            }
        });

        if (formValues) {
            await actualizarProducto(id, formValues);
            await cargarYRenderizarProductos();

            Swal.fire({
                title: 'Producto actualizado',
                icon: 'success',
                timer: 1000,
                showConfirmButton: false
            });
        }
    }
}