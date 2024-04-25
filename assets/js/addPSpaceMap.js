import { Loader } from "@googlemaps/js-api-loader"

let map;
let geocoder;

document.getElementById('buscarEnMapa').addEventListener('click',initMap);


async function initMap() {

    const { Map } = await google.maps.importLibrary("maps");

    // Inicializar mapa
    map = new Map(document.getElementById("map"), {
        mapID: "ca90f74a89a75fc",
        center: { lat: 19.435142396751985, lng: -99.1855168896331 },
        zoom: 8,
        
    });
    console.log("Creado mapa");
    geocoder = new google.maps.Geocoder();
    console.log("Instanciado el geocoder");
    
    await geocodeAddress(geocoder, map);
    
}

async function geocodeAddress(geocoder, resultMap) {

    const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");

    let estado = document.getElementById('estado').value.trim();
    let municipio = document.getElementById('ciudad_municipio').value.trim();
    let calle = document.getElementById('calle').value.trim();
    let direccion = `${calle}, ${municipio}, ${estado}`;
    console.log(direccion);

    geocoder.geocode({ 'address': direccion }, function(results, status) {
        if (status === 'OK') {
            resultMap.setCenter(results[0].geometry.location);
            var Marker = new AdvancedMarkerElement({
                map: resultMap,
                position: results[0].geometry.location,
                title: "search",
            });
        } else {
            alert('Geocode was not successful for the following reason: ' + status);
        }
    });
}
