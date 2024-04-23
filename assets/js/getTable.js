import { createClient } from '@supabase/supabase-js'

// Create a single supabase client for interacting with your database
const supabase = createClient(
    "https://zrwtmvescjmkdenhdaqh.supabase.co", 
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inpyd3RtdmVzY2pta2RlbmhkYXFoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDk2MDA2ODEsImV4cCI6MjAyNTE3NjY4MX0.nWS7r3cCN_xhpTehJk71wQ19C7JsBuhF66MamPHpNWs"
    )

const inputBusqueda = document.getElementById('campoBusqueda');
const tablaContenedor = document.getElementById('resultado-busqueda');

inputBusqueda.addEventListener('input', async () => {
    const textoBusqueda = inputBusqueda.value.trim();
    
    // Definir la consulta base
    let consulta = supabase.from('espacios_publicos').select('*');

    // Agregar filtro si el campo de búsqueda no está vacío
    if (textoBusqueda) {
        consulta = consulta.filter('nombre', 'ilike', `%${textoBusqueda}%`);
    }

    // Realizar la consulta a la base de datos utilizando Supabase
    const { data, error } = await consulta;
  
    if (error) {
        console.error('Error al realizar la consulta:', error.message);
        return;
    }
  
    // Limpiar el contenido del contenedor
    tablaContenedor.innerHTML = '';
  
    // Crear la tabla
    const tabla = document.createElement('table');
    tabla.classList.add('tabla'); // Puedes añadir clases CSS para dar estilo a la tabla si lo deseas
  
    // Mostrar los resultados en la tabla
    if (data && data.length > 0) {
        const headers = Object.keys(data[0]); // Obtener los nombres de los atributos
  
        // Crear la fila de encabezado
        const encabezado = document.createElement('tr');
        headers.forEach(header => {
            const celda = document.createElement('th');
            celda.textContent = header;
            encabezado.appendChild(celda);
        });
        tabla.appendChild(encabezado);
  
        // Crear las filas de datos solo para los resultados que coinciden con la búsqueda
        data.forEach((row, rowIndex) => {
            const fila = document.createElement('tr');
            headers.forEach((header, index) => {
                const celda = document.createElement('td');
                celda.textContent = row[header]; // Mostrar el valor del atributo en la celda
                celda.classList.add(header.toLowerCase()); // Agregar clase con el nombre de la columna
                celda.id = `${header.toLowerCase()}-${rowIndex}`; // Asignar un ID único a la celda

                // Añadir evento de click a las celdas de la columna "nombre"
                if (header.toLowerCase() === 'id') {
                    celda.addEventListener('click', () => {
                        // Redirigir a la página "info.html" con el nombre como parámetro
                        window.location.href = `./../../paginas/pSpaceInfo.html?id=${encodeURIComponent(row[header])}`;
                    });
                }

                fila.appendChild(celda);
            });
            tabla.appendChild(fila);
        });
    } else {
        const mensaje = document.createElement('tr');
        const celdaMensaje = document.createElement('td');
        celdaMensaje.textContent = 'No se encontraron resultados';
        mensaje.appendChild(celdaMensaje);
        tabla.appendChild(mensaje);
    }
  
    // Insertar la tabla en el contenedor
    tablaContenedor.appendChild(tabla);
});
