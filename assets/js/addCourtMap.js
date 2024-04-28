import { createClient } from "@supabase/supabase-js";
import yoyoImage from './../img/yoyo.png';

// Crear un cliente Supabase
const supabase = createClient(
    "https://zrwtmvescjmkdenhdaqh.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inpyd3RtdmVzY2pta2RlbmhkYXFoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDk2MDA2ODEsImV4cCI6MjAyNTE3NjY4MX0.nWS7r3cCN_xhpTehJk71wQ19C7JsBuhF66MamPHpNWs"
);

const idSelection = document.getElementById('publicSpaceID');
const id = idSelection.value;

idSelection.onchange = async function(){
    console.log("Select: " + idSelection);
    console.log("Select value : " + idSelection.value);
    console.log("ID: " + id);

    let { data, error } = await supabase
    .from('espacios_publicos')
    .select('latitud,longitud')
    .eq('id',idSelection.value)
    .single();

    if(error){
        console.error('Error al obtener la información: ' + error);
        return;
    }
    console.log("data.latitud: " + data.latitud);
    console.log("data.longitud: " + data.longitud);
    initMap(data.latitud, data.longitud);

}

// Initialize and add the map
let map;



async function initMap(_lat, _lng) {
    // The location of Uluru
    const position = { lat: _lat, lng: _lng }; console.log("Position: " + position);
    // Request needed libraries.
    //@ts-ignore
    const { Map } = await google.maps.importLibrary("maps");
    const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");

    //Mapa centrado en la posición del parque
    map = new Map(document.getElementById("coords-Map"), {
        zoom: 16,
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

let marker = null;

async function placeMarkerAndPanTo(latLng, map) {
    if(marker !== null) {
        marker.setMap(null);
    }
    
    const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");
    let icon = document.createElement('img');
    icon.src = yoyoImage; // URL del ícono personalizado
    icon.style.width = '40px'; // Ancho del ícono
    icon.style.height = '40px'; // Alto del ícono
    
    marker = new AdvancedMarkerElement({
        position: latLng,
        map: map,
        gmpDraggable: true, // Hacer que el marcador sea arrastrable
        content: icon,
    });
    map.panTo(latLng);

    document.getElementById('latitudX').value = marker.position.lat;
    document.getElementById('longitudY').value = marker.position.lng;


    // Evento dragend para obtener las coordenadas finales después de arrastrar el marcador
    marker.addListener('drag', function(event) {
        const newPosition = marker.position;
        const lat = newPosition.lat;
        const lng = newPosition.lng;

        // Aquí puedes enviar las coordenadas a tus campos "latitud" y "longitud"
        document.getElementById('latitudX').value = lat;
        document.getElementById('longitudY').value = lng;
    });

    // Evento dragend para obtener las coordenadas finales después de arrastrar el marcador
    marker.addListener('dragend', function(event) {
        const newPosition = marker.position;
        const lat = newPosition.lat;
        const lng = newPosition.lng;

        // Aquí puedes enviar las coordenadas a tus campos "latitud" y "longitud"
        document.getElementById('latitudX').value = lat;
        document.getElementById('longitudY').value = lng;
    });

}



