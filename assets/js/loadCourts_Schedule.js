/*
SCRIPT DISEÑADO PARA CARGAR LOS CAMPOS DE HORARIOS DE CADA UNO DE LOS ESPACIOS QUE LO REQUIEREN
CON EL OBJETIVO DE EVITAR UN HTML MUY GRANDE

    DISEÑADO PARA USARSE EN:
    -addCourt.html

*/

/********************************************************************************
********************************IMPLEMENTACIÓN***********************************
********************************************************************************/
//HORARIOS DE CLASE
generarHorarios('clase','horarios-clase');

//HORARIOS DE ENTRENAMIENTO
generarHorarios('train','horarios-train');

//HORARIOS DE LIBRE
generarHorarios('libre','horarios-libre');

//HORARIOS DE VESTIDORES
generarHorarios('vest', 'horarios-vest');

//HORARIOS DE WC
generarHorarios('wc','horarios-wc');

//HORARIOS DE REGADERAS
generarHorarios('showers','horarios-showers');

//HORARIOS DE SAUNA
generarHorarios('sauna','horarios-sauna');

//HORARIOS DE HIDROMASAJE
generarHorarios('hidmasaje','horarios-hidmasaje');

/*FUNCIÓN "generarHorarios"
RECIBE:
prefijo             -       Palabra clave para generar los horarios diferentes
contenedorID        -       ID del Div contenedor de los horarios
*/
function generarHorarios(prefijo, contenedorId) {
    var diasSemana = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];
    var contenedor = document.getElementById(contenedorId);

    diasSemana.forEach(function(dia) {
        var diaLower = dia.toLowerCase();  // Versión en minúsculas del día para IDs

        var divDia = document.createElement('div');
        divDia.classList.add('dia-horario');
        contenedor.appendChild(divDia);

        var labelDia = document.createElement('label');
        labelDia.textContent = dia + ':';
        divDia.appendChild(labelDia);

        var checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.id = prefijo + '-' + diaLower + '-abierto';
        checkbox.name = prefijo + '-' + diaLower + '-abierto';
        checkbox.checked = true;  // Por defecto, marcamos los checkboxes como activos

        var labelCheckbox = document.createElement('label');
        labelCheckbox.setAttribute('for', checkbox.id);
        labelCheckbox.textContent = ' Abierto';

        divDia.appendChild(checkbox);
        divDia.appendChild(labelCheckbox);

        var divHorario = document.createElement('div');
        divHorario.classList.add('horarios');
        divHorario.id = 'horarios-' + prefijo + '-' + diaLower;
        divDia.appendChild(divHorario);

        var labelInicio = document.createElement('label');
        labelInicio.setAttribute('for', prefijo + '-' + diaLower + '-inicio');
        labelInicio.textContent = 'Hora de apertura:';
        divHorario.appendChild(labelInicio);

        var inputInicio = document.createElement('input');
        inputInicio.setAttribute('type', 'time');
        inputInicio.id = prefijo + '-' + diaLower + '-inicio';
        inputInicio.name = prefijo + '-' + diaLower + '-inicio';
        divHorario.appendChild(inputInicio);

        var labelFin = document.createElement('label');
        labelFin.setAttribute('for', prefijo + '-' + diaLower + '-fin');
        labelFin.textContent = 'Hora de cierre:';
        divHorario.appendChild(labelFin);

        var inputFin = document.createElement('input');
        inputFin.setAttribute('type', 'time');
        inputFin.id = prefijo + '-' + diaLower + '-fin';
        inputFin.name = prefijo + '-' + diaLower + '-fin';
        divHorario.appendChild(inputFin);

        // Función para manejar la visibilidad de los horarios
        checkbox.addEventListener('change', function() {
            divHorario.style.display = checkbox.checked ? 'block' : 'none';
        });

        // Inicialmente establece la visibilidad según el estado del checkbox
        divHorario.style.display = checkbox.checked ? 'block' : 'none';
    });
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
document.getElementById('act-clases').addEventListener('change',function(){
    configurarValidacionCheckbox('clase','act-clases','horarios-clase-lunes');
})

document.getElementById('act-entrenamiento').addEventListener('change',function(){
    configurarValidacionCheckbox('train','act-entrenamiento','horarios-train-lunes');
})

document.getElementById('act-libre').addEventListener('change',function(){
    configurarValidacionCheckbox('libre','act-libre','horarios-libre-lunes');
})

document.getElementById('vestidores').addEventListener('change',function(){
    configurarValidacionCheckbox('vest','vestidores','horarios-vest-lunes');
})

document.getElementById('wc').addEventListener('change',function(){
    configurarValidacionCheckbox('wc','wc','horarios-wc-lunes');
})

document.getElementById('regaderas').addEventListener('change',function(){
    configurarValidacionCheckbox('showers','regaderas','horarios-showers-lunes');
})

document.getElementById('sauna').addEventListener('change',function(){
    configurarValidacionCheckbox('sauna','sauna','horarios-sauna-lunes');
})

document.getElementById('hidromasaje').addEventListener('change',function(){
    configurarValidacionCheckbox('hidmasaje','hidromasaje','horarios-hidmasaje-lunes');
})


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
