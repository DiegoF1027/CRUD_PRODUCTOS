// Este archivo contiene funciones de utilidad para la aplicación

// Función para terminar sesión y redirigir al login
export function logout() {
  localStorage.removeItem('token');
  window.location.href = '/index.html';
}