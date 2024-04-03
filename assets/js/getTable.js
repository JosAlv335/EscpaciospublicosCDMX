import { createClient } from '@supabase/supabase-js'

// Create a single supabase client for interacting with your database
const supabase = createClient(
    "https://zrwtmvescjmkdenhdaqh.supabase.co", 
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inpyd3RtdmVzY2pta2RlbmhkYXFoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDk2MDA2ODEsImV4cCI6MjAyNTE3NjY4MX0.nWS7r3cCN_xhpTehJk71wQ19C7JsBuhF66MamPHpNWs"
    )

const inputBusqueda = document.getElementById('campoBusqueda');
const tablaResultados = document.getElementById('resultado-busqueda');

inputBusqueda.addEventListener('input', async () => {
    const textoBusqueda = inputBusqueda.value.trim();
    
    // Realizar la consulta a la base de datos utilizando Supabase
    const { data, error } = await supabase
      .from('espacios_publicos')
      .select('*'); // Seleccionar todos los atributos de la tabla
  
    if (error) {
      console.error('Error al realizar la consulta:', error.message);
      return;
    }
  
    // Limpiar la tabla de resultados
    tablaResultados.innerHTML = '';
  
    // Mostrar los resultados en la tabla
    if (data && data.length > 0) {
      const headers = Object.keys(data[0]); // Obtener los nombres de los atributos
      const headerRow = document.createElement('tr');
      headers.forEach(header => {
        const th = document.createElement('th');
        th.textContent = header;
        headerRow.appendChild(th);
      });
      tablaResultados.appendChild(headerRow);
  
      data.forEach(row => {
        const fila = document.createElement('tr');
        headers.forEach(header => {
          const td = document.createElement('td');
          td.textContent = row[header]; // Mostrar el valor del atributo en la celda
          fila.appendChild(td);
        });
        tablaResultados.appendChild(fila);
      });
    } else {
      const mensaje = document.createElement('tr');
      mensaje.innerHTML = `<td colspan="${headers.length}">No se encontraron resultados</td>`;
      tablaResultados.appendChild(mensaje);
    }
  });