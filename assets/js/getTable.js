import { createClient } from '@supabase/supabase-js'

// Create a single supabase client for interacting with your database
const supabase = createClient(process.env.REST_URL, process.env.REST_PUBLIC_KEY)

const inputBusqueda = document.getElementById('campoBusqueda');
const tablaResultados = document.getElementById('resultado-busqueda');

inputBusqueda.addEventListener('input', async () => {
    const textoBusqueda = inputBusqueda.value.trim();
    
    // Realizar la consulta a la base de datos utilizando Supabase para obtener la estructura de la tabla
    const { data: columnsData, error: columnsError } = await supabase
      .from('information_schema.columns')
      .select('column_name')
      .eq('table_name', 'parques');
  
    if (columnsError) {
      console.error('Error al obtener la estructura de la tabla:', columnsError.message);
      return;
    }
  
    // Obtener los nombres de las columnas
    const columnas = columnsData.map(column => column.column_name);
  
    // Realizar la consulta a la base de datos utilizando Supabase para buscar en todas las columnas
    const { data, error } = await supabase
      .from('parques')
      .select('*')
      .filter('*', 'ilike', `%${textoBusqueda}%`); // Buscar en todas las columnas
  
    if (error) {
      console.error('Error al realizar la consulta:', error.message);
      return;
    }
  
    // Limpiar la tabla de resultados
    tablaResultados.innerHTML = '';
  
    // Mostrar los resultados en la tabla
    if (data && data.length > 0) {
      // Crear la cabecera de la tabla con los nombres de las columnas
      const cabecera = document.createElement('tr');
      columnas.forEach(columna => {
        const th = document.createElement('th');
        th.textContent = columna;
        cabecera.appendChild(th);
      });
      tablaResultados.appendChild(cabecera);
  
      // Mostrar los resultados en la tabla
      data.forEach(fila => {
        const filaTabla = document.createElement('tr');
        columnas.forEach(columna => {
          const td = document.createElement('td');
          td.textContent = fila[columna];
          filaTabla.appendChild(td);
        });
        tablaResultados.appendChild(filaTabla);
      });
    } else {
      const mensaje = document.createElement('tr');
      mensaje.innerHTML = `<td colspan="${columnas.length}">No se encontraron resultados</td>`;
      tablaResultados.appendChild(mensaje);
    }
  });