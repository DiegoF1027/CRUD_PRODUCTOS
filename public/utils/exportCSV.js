// ExportCSV.js

// Esta función convierte un array de objetos a formato CSV
export function convertirAcsv(productos) {
  if (!productos.length) return '';
  const encabezados = Object.keys(productos[0]);
  const filas = productos.map(prod => encabezados.map(key => `"${prod[key]}"`).join(','));
  return [encabezados.join(','), ...filas].join('\r\n');
}

// Esta función descarga un archivo CSV con el contenido proporcionado
export function descargarCSV(nombreArchivo, contenido) {
  const blob = new Blob([contenido], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.setAttribute('download', nombreArchivo);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}