/*
SCRIPT - loadPublicSpacesIDs.js
SCRIPT DISEÑADO PARA CARGAR OPCIONES DENTRO DE UN SELECT

INICIALMENTE DISEÑADO PARA USARSE EN:
    -addCourt.html
*/
//IMPORTACIÓN DE LOS ARREGLOS NECESARIOS
import { createClient } from '@supabase/supabase-js'

// Create a single supabase client for interacting with your database
const supabase = createClient(
    "https://zrwtmvescjmkdenhdaqh.supabase.co", 
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inpyd3RtdmVzY2pta2RlbmhkYXFoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDk2MDA2ODEsImV4cCI6MjAyNTE3NjY4MX0.nWS7r3cCN_xhpTehJk71wQ19C7JsBuhF66MamPHpNWs"
)

/*************************************************************************************************************/
/*********************************DECLARACIÓN DE LOS USOS EN EL SISTEMA***************************************/
/*************************************************************************************************************/
// Obtener elementos select
const idOptions = document.getElementById('publicSpaceID');
console.log("IdOptions: " + idOptions);

// Cargar opciones
loadPublicSpacesIDs(idOptions);

async function loadPublicSpacesIDs(idOptions){

    var { data, error } = await supabase
    .from('espacios_publicos')
    .select('id,nombre')

    if(error){
        console.log("Error al obtener los IDs de los espacios públicos: " + error);
        return;
    }

    
    // Mapea los resultados para obtener solo los IDs
    const options = data.map(item => ({ id: item.id, nombre: item.nombre }));
    console.log(options);
    
        console.log(options);
        console.log(idOptions);

        cargarOpciones(idOptions,options);

}

/*
FUNCIÓN cargarOpciones(selectElement, opciones)
ARGUMENTOS:
    -selectelement      -       Variable que tiene la información de un elemento <select> al cual insertarle las opciones
    -opciones           -       arreglo con las distintas opciones a agregar
*/
function cargarOpciones(selectElement, opciones) {
    opciones.forEach(opcion => {
      const option = document.createElement('option');
      option.text = `${opcion.id} - ${opcion.nombre}`;
      option.value = opcion.id;
      selectElement.appendChild(option);
    });
}