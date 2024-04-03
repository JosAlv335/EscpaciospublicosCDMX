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

document.getElementById('addForm').addEventListener('submit', async (event) => {
    
    // Previene el comportamiento predeterminado del formulario (envío/recarga de la página)
    event.preventDefault();

    const formulario = document.getElementById('addForm');
    const responseMessage =  document.getElementById('mensaje');

    let datos = {};

    for(let i = 0; i < atributos.length;i++){
        datos[atributos[i]] = formulario.elements[names[i]].value;
    }

    const { data, error } = await supabase
        .from('espacios_publicos')
        .insert(datos)
        .select();

    if(error){
        responseMessage.innerHTML="No se logró insertar...";
        console.log('Error al insertar: ' + error.message);
        return;
    }

    if (data && data.length > 0){
        responseMessage.innerHTML = "Insertado exitosamente!";
        console.log('Inserción completada...');
    }

})

async function addPublicSpce(){

    

}