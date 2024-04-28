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

};

//MOSTRAR Y OCULTAR OPCIONES PARA ACTIVIDAD-ENTRENAMIENTO
var chkTrain = document.getElementById("act-entrenamiento");
chkTrain.onchange = function() {

    showOptions(chkTrain, "datos-train");

};

//MOSTRAR Y OCULTAR OPCIONES PARA ACTIVIDAD-LIBRE
var chkFree = document.getElementById("act-libre");
chkFree.onchange = function() {

    showOptions(chkFree, "datos-libre");

};

//MOSTRAR Y OCULTAR OPCIONES PARA VESTIDORES
var chkVest = document.getElementById("vestidores");
chkVest.onchange = function() {

    showOptions(chkVest, "datos-vest");

};
//MOSTRAR Y OCULTAR OPCIONES PARA WC
var chkWC = document.getElementById("wc");
chkWC.onchange = function() {

    showOptions(this, "datos-WC");

};
//MOSTRAR Y OCULTAR OPCIONES PARA REGADERAS
var chkShowers = document.getElementById("regaderas");
chkShowers.onchange = function() {

    showOptions(this, "datos-showers");

};
//MOSTRAR Y OCULTAR OPCIONES PARA SAUNA
var chkSauna = document.getElementById("sauna");
chkSauna.onchange = function() {

    showOptions(this, "datos-sauna");

};
//MOSTRAR Y OCULTAR OPCIONES PARA HIDROMASAJE
var chkHidMas = document.getElementById("hidromasaje");
chkHidMas.onchange = function() {

    showOptions(this, "datos-hidmasaje");

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