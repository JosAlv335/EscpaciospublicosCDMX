import { createClient } from '@supabase/supabase-js'

// Create a single supabase client for interacting with your database
const supabase = createClient(
    "https://zrwtmvescjmkdenhdaqh.supabase.co", 
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inpyd3RtdmVzY2pta2RlbmhkYXFoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDk2MDA2ODEsImV4cCI6MjAyNTE3NjY4MX0.nWS7r3cCN_xhpTehJk71wQ19C7JsBuhF66MamPHpNWs"
)

//Arreglo de nombres de atributos segun el formulario
var names = [
    "nombre",
    "estado",
    "ciudad_municipio",
    "asentamiento",
    "calle",
    "entCalles",
    "numExt",
    "numInt",
    "codigoPostal",
    "horario-inicio",
    "horario-fin",
    "tipo-espacio"
];

//Arreglo de nombres de atributos segun la tabla de la BD
var atributos = [
    "nombre",
    "estado",
    "municipio_delegacion",
    "asentamiento",
    "calle",
    "entre_calles",
    "num_ext",
    "num_int",
    "codigo_postal",
    "horario_inicio",
    "horario_fin",
    "tipo_espacio"
];

document.getElementById('updateForm').addEventListener('submit', async (event) => {
    event.preventDefault(); // Prevenir el comportamiento predeterminado del formulario

    const formulario = document.getElementById('updateForm');
    const responseMessage = document.getElementById('mensaje');
    const id = document.getElementById('id').value;

    let actualizaciones = {};

    for (let i = 0; i < atributos.length; i++) {
        const valorCampo = formulario.elements[names[i]].value.trim();
        
        // Si el valor del campo no está vacío, lo incluimos en los datos de actualización
        if (valorCampo !== '') {
            actualizaciones[atributos[i]] = valorCampo;
        }
    }

    // Verificar si hay campos para actualizar
    if (Object.keys(actualizaciones).length === 0) {
        responseMessage.innerHTML = "No hay campos para actualizar.";
        return;
    }

    // Realizar la actualización en la base de datos
    const { data, error } = await supabase
        .from('espacios_publicos')
        .update(actualizaciones)
        .eq('id', id) // Especifica el id de la fila que deseas actualizar
        .select();

    if (error) {
        responseMessage.innerHTML = "No se logró actualizar los datos.";
        console.log('Error al actualizar: ' + error.message);
        return;
    }

    if (data && data.length > 0){
        responseMessage.innerHTML = "Datos actualizados exitosamente!";
        console.log('Actualización completada...');
    }
});
