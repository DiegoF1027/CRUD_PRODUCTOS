

const baseUrl = 'http://localhost:5000/api/productos';

function getAuthHeaders() {
  const token = localStorage.getItem('token');
  return {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  };
}

export async function obtenerProductos(orden = '', page = 1, limit = 10) {
  const params = new URLSearchParams();
  if (orden) params.append('orden', orden);
  params.append('page', page);
  params.append('limit', limit);

  const url = `${baseUrl}?${params.toString()}`;
  const res = await fetch(url, {
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    }
  });
  const data = await res.json();
  if (!res.ok) {
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: data.mensaje || 'Ocurrió un error al obtener productos',
      confirmButtonColor: '#d33'
    });
    throw new Error(data.mensaje || 'Error al obtener productos');
  }
  return data;
}

export async function obtenerProductoPorId(id) {
  const res = await fetch(`${baseUrl}/${id}`, {
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    }
  });
  const data = await res.json();
  if (!res.ok) {
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: data.mensaje || 'Ocurrió un error al obtener el producto',
      confirmButtonColor: '#d33'
    });
    throw new Error(data.mensaje || 'Error al obtener producto');
  }
  return data;
}

export async function crearProducto(producto) {
  const res = await fetch(baseUrl, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify(producto),
  });
  const data = await res.json();
  if (!res.ok) {
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: data.mensaje || 'No tienes permisos para crear productos',
      confirmButtonColor: '#d33'
    });
    throw new Error(data.mensaje || 'Error al crear producto');
  }
  return data;
}

export async function actualizarProducto(id, datos) {
  const res = await fetch(`${baseUrl}/${id}`, {
    method: 'PUT',
    headers: getAuthHeaders(),
    body: JSON.stringify(datos),
  });
  const data = await res.json();
  if (!res.ok) {
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: data.mensaje || 'No tienes permisos para editar productos',
      confirmButtonColor: '#d33'
    });
    throw new Error(data.mensaje || 'Error al editar producto');
  }
  return data;
}

export async function eliminarProducto(id) {
  const res = await fetch(`${baseUrl}/${id}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    }
  });
  const data = await res.json();
  if (!res.ok) {
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: data.mensaje || 'No tienes permisos para eliminar productos',
      confirmButtonColor: '#d33'
    });
    throw new Error(data.mensaje || 'Error al eliminar producto');
  }
  return data;
}