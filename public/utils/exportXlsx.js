export function exportarProductosXlsx(productos) {
  const data = productos.map(p => {
    let fecha = '';
    if (p.fechaCreacion) {
      const d = new Date(p.fechaCreacion);
      fecha = isNaN(d.getTime())
        ? (typeof p.fechaCreacion === 'string' ? p.fechaCreacion : '')
        : d.toLocaleString();
    }
    return {
      Nombre: p.nombre,
      Precio: p.precio,
      FechaCreacion: fecha
    };
  });

  const ws = XLSX.utils.json_to_sheet(data);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Productos");
  XLSX.writeFile(wb, "productos.xlsx");
}