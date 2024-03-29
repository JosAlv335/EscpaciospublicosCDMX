/**
Script Designado para la generación de un cuadro emergente
Diseñado para las páginas:
    -Actualizar.html
    -addCourt.html
    -agregar.html
    -eliminar.html
SE PUEDE HACER USO DE UNA INSTANCIA DE ESTE SCRIPT ESPECIFICO PARA UN DOCUMENTO HTML.
PARA ELLO SOLO DEBE COPIAR ENTERAMENTE EL SCRIPT Y ADAPTAR LOS ID'S Y LA LOGICA DE 
CADA BOTON.
LOS NOMBRES USADOS EN ESTE SCRIPT DEBEN SER RESPETADOS EN LA ESTRUCTURA HTML DONDE 
SE USEN
**/
// Obtener el cuadro emergente
var cuadroEmergente = document.getElementById("popup-box");

// Obtener el botón que abre el cuadro emergente
var btnMostrar = document.getElementById("show-popup");

// Obtener el botón que cierra el cuadro emergente
var btnCancelar = document.getElementById("close-popup");

// Obtener el botón que simula la acción de aceptar
var btnAceptar = document.getElementById("confirm-action");

// Cuando el usuario hace clic en el botón, abrir el cuadro emergente
btnMostrar.onclick = function() {
    cuadroEmergente.style.display = "block";
    setTimeout(() => { // Esto permite que la transición CSS se aplique correctamente
        cuadroEmergente.style.opacity = "1";
        cuadroEmergente.querySelector('.contenido-emergente').style.transform = "scale(1)";
    }, 10);
}

// Cuando el usuario hace clic en "Cancelar", cierra el cuadro emergente
btnCancelar.onclick = function() {
    cuadroEmergente.style.opacity = "0";
    cuadroEmergente.querySelector('.contenido-emergente').style.transform = "scale(0.7)";
    setTimeout(() => {
        cuadroEmergente.style.display = "none";
    }, 500); // Espera hasta que la animación termine
}

// Cuando el usuario hace clic en "Aceptar", realiza una acción y cierra el cuadro
btnAceptar.onclick = function() {
    // Aquí puedes agregar la lógica para manejar la "aceptación"
    cuadroEmergente.style.opacity = "0";
    cuadroEmergente.querySelector('.contenido-emergente').style.transform = "scale(0.7)";
    setTimeout(() => {
        cuadroEmergente.style.display = "none";
    }, 500); // Espera hasta que la animación termine
}

// También puedes cerrar el cuadro emergente si el usuario hace clic fuera de él
window.onclick = function(event) {
    if (event.target == cuadroEmergente) {
        cuadroEmergente.style.display = "none";
    }
}