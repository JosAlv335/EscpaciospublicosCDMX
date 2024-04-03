const inputBusqueda = document.getElementById('campoBusqueda');
const tablaResultados = document.getElementById('resultado-busqueda');

inputBusqueda.addEventListener('input', async () => {
  const textoBusqueda = inputBusqueda.value.trim();
  
  // Obtener la estructura de la tabla de parques
  const { data: schema, error: schemaError } = await supabase
    .from('parques')
    .describe();

  if (schemaError) {
    console.error('Error al obtener la estructura de la tabla:', schemaError.message);
    return;
  }

  // Construir dinámicamente la lista de columnas a seleccionar
  const columnas = schema.map(columna => columna.name);

  // Realizar la consulta a la base de datos utilizando Supabase
  const { data, error } = await supabase
    .from('parques')
    .select(columnas)
    .filter('*', 'ilike', `%${textoBusqueda}%`); // Buscar coincidencias parciales en todas las columnas

  if (error) {
    console.error('Error al realizar la consulta:', error.message);
    return;
  }

  // Limpiar la tabla de resultados
  tablaResultados.innerHTML = '';

  // Mostrar los resultados en la tabla
  if (data && data.length > 0) {
    data.forEach(registro => {
      const fila = document.createElement('tr');
      Object.values(registro).forEach(valor => {
        const celda = document.createElement('td');
        celda.textContent = valor;
        fila.appendChild(celda);
      });
      tablaResultados.appendChild(fila);
    });
  } else {
    const mensaje = document.createElement('tr');
    mensaje.innerHTML = `<td colspan="${columnas.length}">No se encontraron resultados</td>`;
    tablaResultados.appendChild(mensaje);
  }
});