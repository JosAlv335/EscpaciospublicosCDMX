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
        var labelDia = document.createElement('label');
        labelDia.setAttribute('for', 'horarios-' + prefijo + '-' + dia.toLowerCase());
        labelDia.textContent = dia + ':';
        contenedor.appendChild(labelDia);

        var divHorario = document.createElement('div');
        divHorario.classList.add('horarios');
        divHorario.id = 'horarios-' + prefijo + '-' + dia.toLowerCase();
        contenedor.appendChild(divHorario);

        var labelInicio = document.createElement('label');
        labelInicio.setAttribute('for', prefijo + '-' + dia.toLowerCase() + '-inicio');
        labelInicio.textContent = 'Hora de apertura:';
        divHorario.appendChild(labelInicio);

        var inputInicio = document.createElement('input');
        inputInicio.setAttribute('type', 'time');
        inputInicio.id = prefijo + '-' + dia.toLowerCase() + '-inicio';
        inputInicio.name = prefijo + '-' + dia.toLowerCase() + '-inicio';
        divHorario.appendChild(inputInicio);

        var labelFin = document.createElement('label');
        labelFin.setAttribute('for', prefijo + '-' + dia.toLowerCase() + '-fin');
        labelFin.textContent = 'Hora de cierre:';
        divHorario.appendChild(labelFin);

        var inputFin = document.createElement('input');
        inputFin.setAttribute('type', 'time');
        inputFin.id = prefijo + '-' + dia.toLowerCase() + '-fin';
        inputFin.name = prefijo + '-' + dia.toLowerCase() + '-fin';
        divHorario.appendChild(inputFin);
    });
}