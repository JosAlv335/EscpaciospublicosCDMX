var nombres = document.querySelectorAll('.nombre');
var test = document.getElementById('campoBusqueda');

var popup = document.getElementById('popup');

test.addEventListener('mouseover',function(event){

    popup.style.display = 'block';

    var mouseX = event.clientX;
    var mouseY = event.clientY;

    //Posición del popupbox
    popup.style.left = mouseX + 'px';
    popup.style.top = mouseY + 'px';

    


});

test.addEventListener('mouseleave',function(event){
    popup.style.display = 'none';
})