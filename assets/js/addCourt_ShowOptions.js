/*
SCRIPT DISEÑADO PARA MOSTRAR Y OCULTAR LAS OPCIONES DE CADA CHECKBOX
*/
/*********************************DECLARACIÓN DE LOS USOS EN EL SISTEMA***************************************/

//MOSTRAR Y OCULTAR OPCIONES PARA ILUMINACIÓN
var chkIlum = document.getElementById("IlumChkBox");
chkIlum.onchange = function(){
    showOptions(chkIlum,"datos-Ilum");
}

//MOSTRAR Y OCULTAR OPCIONES PARA TRIBUNAS
var chkTrib = document.getElementById("TribChkBox");
chkTrib.onchange = function(){
    showOptions(chkTrib,"datos-trib");
}

//MOSTRAR Y OCULTAR OPCIONES PARA TECHO
var chkTecho = document.getElementById("TechoChkBox");
chkTecho.onchange = function(){
    showOptions(chkTecho,"datos-techo");
}

//MOSTRAR Y OCULTAR OPCIONES PARA ACTIVIDAD-CLASE
var chkClass = document.getElementById("act-clases");
chkClass.onchange = function() {

    showOptions(chkClass, "datos-clases");
    configurarValidacionCheckbox('clase','act-clases','horarios-clase-lunes');

};

//MOSTRAR Y OCULTAR OPCIONES PARA ACTIVIDAD-ENTRENAMIENTO
var chkTrain = document.getElementById("act-entrenamiento");
chkTrain.onchange = function() {

    showOptions(chkTrain, "datos-train");
    configurarValidacionCheckbox('train','act-entrenamiento','horarios-train-lunes');

};

//MOSTRAR Y OCULTAR OPCIONES PARA ACTIVIDAD-LIBRE
var chkFree = document.getElementById("act-libre");
chkFree.onchange = function() {

    showOptions(chkFree, "datos-libre");
    configurarValidacionCheckbox('libre','act-libre','horarios-libre-lunes');

};

//MOSTRAR Y OCULTAR OPCIONES PARA VESTIDORES
var chkVest = document.getElementById("vestidores");
chkVest.onchange = function() {

    showOptions(chkVest, "datos-vest");
    configurarValidacionCheckbox('vest','vestidores','horarios-vest-lunes');

};
//MOSTRAR Y OCULTAR OPCIONES PARA WC
var chkWC = document.getElementById("wc");
chkWC.onchange = function() {

    showOptions(this, "datos-WC");
    configurarValidacionCheckbox('wc','wc','horarios-wc-lunes');

};
//MOSTRAR Y OCULTAR OPCIONES PARA REGADERAS
var chkShowers = document.getElementById("regaderas");
chkShowers.onchange = function() {

    showOptions(this, "datos-showers");
    configurarValidacionCheckbox('showers','regaderas','horarios-showers-lunes');

};
//MOSTRAR Y OCULTAR OPCIONES PARA SAUNA
var chkSauna = document.getElementById("sauna");
chkSauna.onchange = function() {

    showOptions(this, "datos-sauna");
    configurarValidacionCheckbox('sauna','sauna','horarios-sauna-lunes');

};
//MOSTRAR Y OCULTAR OPCIONES PARA HIDROMASAJE
var chkHidMas = document.getElementById("hidromasaje");
chkHidMas.onchange = function() {

    showOptions(this, "datos-hidmasaje");
    configurarValidacionCheckbox('hidmasaje','hidromasaje','horarios-hidmasaje-lunes');

};

/*
FUNCIÓN showOptions(checkboxElem,hiddenID)
Parámetros:
    -checkboxElemen     -       variable que contiene los datos de un campo "input" de tipo "checkbox"
    -hiddenID           -       ID de la sección a mostrar/ocultar
*/
function showOptions(checkboxElem,hiddenID){
    if(checkboxElem.checked){
        document.getElementById(hiddenID).style.display = "block";
    }else{
        document.getElementById(hiddenID).style.display = "none"; //Ocultar elementos
    }
}


/* 
 * ******************************COMPORTAMIENTO DE LOS HORARIOS***********************
 *

FUNCIONAMIENTO:
Se asegura de que en cada sección de checkbox ("clase","train","libre",etc.) siempre
haya al menos un horario activo ("lunes","martes",etc.)

*/

/**
 * Implementación de las funciones de verificación
 */

//CONFIGURAR PARA clase




/**
 * Verifica que haya al menos un checkbox de horario "Abierto" activo cuando el checkbox
 * cuyo ID es "checkboxPrincipalID" esté activo, de querer desactivar todos los checkboxes
 * "Abierto", se emitirá una alerta
 * 
 * @param {string} prefijo - Prefijo de la sección de horarios
 * @param {string} checkboxPrincipalId - ID del checkbox que despliega la sección
 */
function configurarValidacionCheckbox(prefijo, checkboxPrincipalId, hiddenID) {
    console.log("IDPrincipal: " + checkboxPrincipalId);
    var checkboxPrincipal = document.getElementById(checkboxPrincipalId);
    var checkboxesDias = document.querySelectorAll(`input[id^="${prefijo}-"][id$="-abierto"]`); // Selecciona todos los checkboxes de "Abierto" según el prefijo

    // Función que verifica si al menos uno de los checkboxes de "Abierto" está seleccionado
    function validarCheckboxesDias() {
        if (checkboxPrincipal.checked) {
            const algunoActivo = Array.from(checkboxesDias).some(checkbox => checkbox.checked);
            if (!algunoActivo) {
                alert('Debe haber al menos un día abierto si las clases están activas.');
                // Podrías deshabilitar el checkbox principal o forzar la activación de un checkbox de "Abierto", por ejemplo:
                checkboxesDias[0].checked = true; // Activa el primer checkbox de día como fallback
                document.getElementById(hiddenID).style.display = "block";
            }
        }
    }

    // Evento para cuando se cambia el estado del checkbox principal
    checkboxPrincipal.onchange = validarCheckboxesDias;

    // Eventos para cada checkbox de día para revalidar cuando estos cambian
    checkboxesDias.forEach(checkbox => {
        checkbox.onchange = validarCheckboxesDias;
    });
}

