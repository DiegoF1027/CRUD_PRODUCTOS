// ui.js
export function renderTabla(productos) {
  const tabla = document.getElementById('tabla-productos').querySelector('tbody');
  tabla.innerHTML = productos.map(producto => `
    <tr data-id="${producto._id}">
      <td>${producto.nombre}</td>
      <td>$${producto.precio}</td>
      <td>${moment(producto.fechaCreacion).format('DD/MM/YYYY HH:mm')}</td>
      <td>
        <button class="btn-edit" type="button" data-id="${producto._id}" data-nombre="${producto.nombre}" data-precio="${producto.precio}"><i class="bi bi-pencil-square"></i></button>
        <button class="btn-danger" type="button" data-id="${producto._id}" data-nombre="${producto.nombre}"><i class="bi bi-trash3"></i></button>
      </td>
    </tr>
  `).join('');
}

// Nueva función para renderizar la paginación
export function renderPaginacion(page, totalPages) {
  const paginacion = document.getElementById('paginacion');
  if (totalPages <= 1) {
    paginacion.innerHTML = '';
    return;
  }
  let html = '';
  for (let i = 1; i <= totalPages; i++) {
    html += `<button class="btn btn-sm btn-${i === page ? 'primary' : 'secondary'} mx-1 pag-btn" data-page="${i}">${i}</button>`;
  }
  paginacion.innerHTML = html;
}
