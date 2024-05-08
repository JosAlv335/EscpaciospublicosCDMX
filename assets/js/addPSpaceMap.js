import { Loader } from "@googlemaps/js-api-loader"
import yoyoImage from './../img/yoyo.png';

let map;
let geocoder;

document.getElementById('buscarEnMapa').addEventListener('click',initMap);


async function initMap() {

    const { Map } = await google.maps.importLibrary("maps");

    // Inicializar mapa
    map = new Map(document.getElementById("map"), {
        center: { lat: 19.435142396751985, lng: -99.1855168896331 },
        zoom: 15,
        mapId: "ca90f74a89a75fc",
    });
    console.log("Creado mapa");
    geocoder = new google.maps.Geocoder();
    console.log("Instanciado el geocoder");
    
    await geocodeAddress(geocoder, map);

    // Oyente para evento clic en el mapa
    map.addListener('click', function(e) {
        placeMarkerAndPanTo(e.latLng, map);
    });

    
    
}

async function geocodeAddress(geocoder, resultMap) {

    const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");
    let numExt = document.getElementById('numExt').value.trim();
    let calle = document.getElementById('calle').value.trim();
    let ent1 = document.getElementById('entCalles1').value.trim();
    let ent2 = document.getElementById('entCalles2').value.trim();
    let asentamiento = document.getElementById('asentamiento').value.trim();
    let municipio = document.getElementById('ciudad_municipio').value.trim();
    let estado = document.getElementById('estado').value.trim();
    let codigoPostal = document.getElementById('codigoPostal').value.trim();
    
    let direccion = `${numExt},${calle}, Entre ${ent1} y ${ent2}, ${asentamiento}, ${municipio}, ${estado}, ${codigoPostal}, México`;
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

    document.getElementById('PSpace-LatitudX').value = marker.position.lat;
    document.getElementById('PSpace-LongitudY').value = marker.position.lng;


    // Evento dragend para obtener las coordenadas finales después de arrastrar el marcador
    marker.addListener('drag', function(event) {
        const newPosition = marker.position;
        const lat = newPosition.lat;
        const lng = newPosition.lng;

        // Aquí puedes enviar las coordenadas a tus campos "latitud" y "longitud"
        document.getElementById('PSpace-LatitudX').value = lat;
        document.getElementById('PSpace-LongitudY').value = lng;
    });

    // Evento dragend para obtener las coordenadas finales después de arrastrar el marcador
    marker.addListener('dragend', function(event) {
        const newPosition = marker.position;
        const lat = newPosition.lat;
        const lng = newPosition.lng;

        // Aquí puedes enviar las coordenadas a tus campos "latitud" y "longitud"
        document.getElementById('PSpace-LatitudX').value = lat;
        document.getElementById('PSpace-LongitudY').value = lng;
    });

}