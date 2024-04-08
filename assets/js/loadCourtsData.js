/*
SCRIPT - loadcourtsData.js
SCRIPT DISEÑADO PARA CARGAR OPCIONES DENTRO DE UN SELECT

INICIALMENTE DISEÑADO PARA USARSE EN:
    -addCourt.html
    En conjunto con
    -courtsData.js
*/
//IMPORTACIÓN DE LOS ARREGLOS NECESARIOS
import { tiposDeInstalacion, deportesPrincipales } from "./courtsData";

/*************************************************************************************************************/
/*********************************DECLARACIÓN DE LOS USOS EN EL SISTEMA***************************************/
/*************************************************************************************************************/
// Obtener elementos select
const tipoInstalacionSelect = document.getElementById('tipoInstalacion');
const deportePrincipalSelect = document.getElementById('deporte-principal');

// Cargar opciones
cargarOpciones(tipoInstalacionSelect, tiposDeInstalacion);
cargarOpciones(deportePrincipalSelect, deportesPrincipales);

/*
FUNCIÓN cargarOpciones(selectElement, opciones)
ARGUMENTOS:
    -selectelement      -       Variable que tiene la información de un elemento <select> al cual insertarle las opciones
    -opciones           -       arreglo con las distintas opciones a agregar
*/
function cargarOpciones(selectElement, opciones) {
    opciones.forEach(opcion => {
      const option = document.createElement('option');
      option.text = opcion;
      option.value = opcion;
      selectElement.appendChild(option);
    });
  }
  

  