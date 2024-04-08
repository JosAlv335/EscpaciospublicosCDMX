/*
SCRIPT DISEÑADO PARA AÑAIDR ENTRADA DE HORARIO EN EL FORMULARIO PARA LAS OPCIONES CON CHECKBOX
*/

/*************************************************************************************************************/
/*********************************DECLARACIÓN DE LOS USOS EN EL SISTEMA***************************************/
/*************************************************************************************************************/
//SECIÓN DE CLASE
var classBtnAdd = document.getElementById("clase-add-horario");
var classBtnRem = document.getElementById("clase-rem-horario");
classBtnAdd.onclick = function(){
    agregarHorario("clase","horarios-clase","hor-clase-container");
}
classBtnRem.onclick = function(){
    eliminarUltimoHorario("horarios-clase");
}
//
//SECIÓN DE ENTRENAMIENTO
//
var trainBtnAdd = document.getElementById("train-add-horario");
var trainBtnRem = document.getElementById("train-rem-horario");
trainBtnAdd.onclick = function(){
    agregarHorario("train","horarios-train","hor-train-container");
}
trainBtnRem.onclick = function(){
    eliminarUltimoHorario("horarios-train");
}
//
//SECIÓN DE LIBRE
//
var libreBtnAdd = document.getElementById("libre-add-horario");
var libreBtnRem = document.getElementById("libre-rem-horario");
libreBtnAdd.onclick = function(){
    agregarHorario("libre","horarios-libre","hor-libre-container");
}
libreBtnRem.onclick = function(){
    eliminarUltimoHorario("horarios-libre");
}
//
//SECIÓN DE VESTIDORES
//
var vestBtnAdd = document.getElementById("vest-add-horario");
var vestBtnRem = document.getElementById("vest-rem-horario");
vestBtnAdd.onclick = function(){
    agregarHorario("vest","horarios-vest","hor-vest-container");
}
vestBtnRem.onclick = function(){
    eliminarUltimoHorario("horarios-vest");
}
//
//SECIÓN DE WC
//
var wcBtnAdd = document.getElementById("wc-add-horario");
var wcBtnRem = document.getElementById("wc-rem-horario");
wcBtnAdd.onclick = function(){
    agregarHorario("wc","horarios-wc","hor-wc-container");
}
wcBtnRem.onclick = function(){
    eliminarUltimoHorario("horarios-wc");
}
//
//SECIÓN DE REGADERAS
//
var showersBtnAdd = document.getElementById("showers-add-horario");
var showersBtnRem = document.getElementById("showers-rem-horario");
showersBtnAdd.onclick = function(){
    agregarHorario("showers","horarios-showers","hor-showers-container");
}
showersBtnRem.onclick = function(){
    eliminarUltimoHorario("horarios-showers");
}
//
//SECIÓN DE SAUNA
//
var saunaBtnAdd = document.getElementById("sauna-add-horario");
var saunaBtnRem = document.getElementById("sauna-rem-horario");
saunaBtnAdd.onclick = function(){
    agregarHorario("sauna","horarios-sauna","hor-sauna-container");
}
saunaBtnRem.onclick = function(){
    eliminarUltimoHorario("horarios-sauna");
}
//
//SECIÓN DE HIDROMASAJE
//
var hidmasajeBtnAdd = document.getElementById("hidmasaje-add-horario");
var hidmasajeBtnRem = document.getElementById("hidmasaje-rem-horario");
hidmasajeBtnAdd.onclick = function(){
    agregarHorario("hidmasaje","horarios-hidmasaje","hor-hidmasaje-container");
}
hidmasajeBtnRem.onclick = function(){
    eliminarUltimoHorario("horarios-hidmasaje");
}









// Función para eliminar el último campo de horario
function eliminarUltimoHorario(containerID) {
    const container = document.getElementById(containerID);
    const numHorarios = container.children.length;
    if (numHorarios > 1) {
        container.removeChild(container.lastChild);
    }
}

// Función para agregar un nuevo campo de horario
function agregarHorario(prefijo, containerID, containerClass) {
    const horariosContainer = document.getElementById(containerID);
    const numHorarios = horariosContainer.children.length;

    const nuevoHorarioDiv = document.createElement('div');
    nuevoHorarioDiv.className = containerClass;
    nuevoHorarioDiv.id = "hor-" + prefijo + "-container-" + numHorarios;

    nuevoHorarioDiv.innerHTML = `
        <label for="${prefijo}-dia-inicio-${numHorarios}">Desde:</label>
        <input type="text" id="${prefijo}-dia-inicio-${numHorarios}" name="${prefijo}-dia-inicio-${numHorarios}" placeholder="Lunes | Martes | Miercoles |...">
        <label for="${prefijo}-dia-fin-${numHorarios}">Hasta:</label>
        <input type="text" id="${prefijo}-dia-fin-${numHorarios}" name="${prefijo}-dia-fin-${numHorarios}" placeholder="Lunes | Martes | Miercoles |...">
        <label for="${prefijo}-hor-inicio-${numHorarios}">Inicia:</label>
        <input type="time" id="${prefijo}-hor-inicio-${numHorarios}" name="${prefijo}-hor-inicio-${numHorarios}">
        <label for="${prefijo}-hor-fin-${numHorarios}">Termina:</label>
        <input type="time" id="${prefijo}-hor-fin-${numHorarios}" name="${prefijo}-hor-fin-${numHorarios}">
    `;

    horariosContainer.appendChild(nuevoHorarioDiv);
    
}
