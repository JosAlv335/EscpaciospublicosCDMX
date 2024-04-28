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

