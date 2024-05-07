import { createClient } from '@supabase/supabase-js'
import yoyoImage from './../img/yoyo.png';

// Create a single supabase client for interacting with your database
const supabase = createClient(
    "https://zrwtmvescjmkdenhdaqh.supabase.co", 
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inpyd3RtdmVzY2pta2RlbmhkYXFoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDk2MDA2ODEsImV4cCI6MjAyNTE3NjY4MX0.nWS7r3cCN_xhpTehJk71wQ19C7JsBuhF66MamPHpNWs"
)

//Arreglo de nombres de atributos segun el formulario
var names = [
    "nombre",
    "estado",
    "ciudad_municipio",
    "asentamiento",
    "calle",
    "entCalles1",
    "entCalles2",
    "numExt",
    "numInt",
    "codigoPostal",
    "horario-inicio",
    "horario-fin",
    "tipo-espacio",
];

//Arreglo de nombres de atributos segun la tabla de la BD
var atributos = [
    "nombre",
    "estado",
    "municipio_delegacion",
    "asentamiento",
    "calle",
    "entre_calles1",
    "entre_calles2",
    "num_ext",
    "num_int",
    "codigo_postal",
    "horario_inicio",
    "horario_fin",
    "tipo_espacio",
    "latitud",
    "longitud"
];

document.getElementById('addForm').addEventListener('submit', async (event) => {
    
    // Previene el comportamiento predeterminado del formulario (envío/recarga de la página)
    event.preventDefault();

    const formulario = document.getElementById('addForm');
    const responseMessage =  document.getElementById('mensaje');

    let datos = {};
    var latitud;
    var longitud;

    if(document.getElementById('toggleFormat').textContent === 'Cambiar a Grados, Minutos, Segundos'){
        //Capturar coordenadas del formulario
        latitud = parseFloat(document.getElementById('PSpace-LatitudX').value);
        longitud = parseFloat(document.getElementById('PSpace-LongitudY').value);
        //Construir el objeto geometry(Point)
        var coordenadas = `POINT(${longitud} ${latitud})`;
    }else{
        //Obtiene los datos de Latitud
        var LatitudGrados = document.getElementById('LatitudGrados').value;
        var LatitudMinutos = document.getElementById('LatitudGrados').value;
        var LatitudSegundos = document.getElementById('LatitudGrados').value;
        //Obtiene los datos de Longtud
        var LongitudGrados = document.getElementById('LongitudGrados').value;
        var LongitudMinutos = document.getElementById('LongitudGrados').value;
        var LongitudSegundos = document.getElementById('LongitudGrados').value;

        latitud = convertirDMSToDecimal(LatitudGrados,LatitudMinutos,LatitudSegundos);
        longitud = convertirDMSToDecimal(LongitudGrados,LongitudMinutos,LongitudSegundos);

        var coordenadas = `POINT(${longitud} ${latitud})`;

    }

    for(let i = 0; i < atributos.length;i++){

        if(atributos[i] == "latitud"){
            datos[atributos[i]] = latitud;
        }else if(atributos[i] == "longitud"){
            datos[atributos[i]] = longitud;
        }else{
            datos[atributos[i]] = formulario.elements[names[i]].value;
        }

    }

    const { data, error } = await supabase
        .from('espacios_publicos')
        .insert(datos)
        .select();

    if(error){
        responseMessage.innerHTML="No se logró insertar...";
        console.log('Error al insertar: ' + error.message);
        return;
    }

    if (data && data.length > 0){
        responseMessage.innerHTML = "Insertado exitosamente!";
        console.log('Inserción completada...');
    }

})

function convertirDMSToDecimal(grados, minutos, segundos) {
    var decimal = grados + minutos / 60 + segundos / 3600;
    /*
    if (direccion == "S" || direccion == "W") {
        decimal = -decimal;
    }
    */
    return decimal;
}

//Añadir los campos de horarios a la página
function generarHorarios(prefijo, contenedorId) {
    var diasSemana = ['Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado', 'Domingo'];
    var contenedor = document.getElementById(contenedorId);

    diasSemana.forEach(function(dia) {
        var diaLower = dia.toLowerCase();  // Versión en minúsculas del día para IDs

        var divDia = document.createElement('div');
        divDia.classList.add('dia-horario');
        contenedor.appendChild(divDia);

        var labelDia = document.createElement('label');
        labelDia.textContent = dia + ':';
        divDia.appendChild(labelDia);

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

    });
}

generarHorarios("espacio-publico","horarios");


//Generación del mapa de la página
// Initialize and add the map
let map;

//initMap(19.432600481483338,-99.13324356079103);

async function initMap(_lat, _lng) {
    // The location of Uluru
    const position = { lat: _lat, lng: _lng }; console.log("Position: " + position);
    // Request needed libraries.
    //@ts-ignore
    const { Map } = await google.maps.importLibrary("maps");
    const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");

    //Mapa centrado en la posición del parque
    map = new Map(document.getElementById("map"), {
        zoom: 13,
        center: position,
        mapId: "ca90f74a89a75fc",
    });

    //Marcador centrado en el mapa
    const marker = new AdvancedMarkerElement({
        map: map,
        position: position,
        title: "Parque",
    });

    // Oyente para evento clic en el mapa
    map.addListener('click', function(e) {
        placeMarkerAndPanTo(e.latLng, map);
    });

    // Create an info window to share between markers.
    const infoWindow = new google.maps.InfoWindow();

    // Add a click listener for each marker, and set up the info window.
    marker.addListener("click", ({ domEvent, latLng }) => {
        const { target } = domEvent;

        infoWindow.close();
        infoWindow.setContent(marker.title);
        infoWindow.open(marker.map, marker);
    });

}

