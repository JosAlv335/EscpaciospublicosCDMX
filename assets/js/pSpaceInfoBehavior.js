import { createClient } from '@supabase/supabase-js';
import { Loader } from "@googlemaps/js-api-loader";

const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get('id');



// Crear un cliente Supabase
const supabase = createClient(
    "https://zrwtmvescjmkdenhdaqh.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inpyd3RtdmVzY2pta2RlbmhkYXFoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDk2MDA2ODEsImV4cCI6MjAyNTE3NjY4MX0.nWS7r3cCN_xhpTehJk71wQ19C7JsBuhF66MamPHpNWs"
);

async function obtenerInformacion() {
    try {
        const { data, error } = await supabase
            .from('espacios_publicos')
            .select('*')
            .eq('id', id)
            .single();

        if (error) {
            console.error('Error al obtener la información:', error.message);
            return;
        }

        

        mostrarInformacion(data);

        console.log(data);
    } catch (error) {
        console.error('Error al obtener la información:', error.message);
    }

}

function mostrarInformacion(data) {
    const infoContainer = document.getElementById('info-container');
    if (data) {
        const keys = Object.keys(data);
        const infoHTML = keys.map(key => `<p><strong>${key}:</strong> ${data[key]}</p>`).join('');
        infoContainer.innerHTML = infoHTML;
    } else {
        infoContainer.innerHTML = '<p>No se encontró información para mostrar</p>';
    }

    initMap(data.latitud, data.longitud);
}

obtenerInformacion();

// Initialize and add the map
let map;

async function initMap(_lat, _lng) {
  // The location of Uluru
  const position = { lat: _lat, lng: _lng };
  // Request needed libraries.
  //@ts-ignore
  const { Map } = await google.maps.importLibrary("maps");
  const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");

  // The map, centered at Uluru
  map = new Map(document.getElementById("map"), {
    zoom: 16,
    center: position,
    mapId: "DEMO_MAP_ID",
  });

  // The marker, positioned at Uluru
  const marker = new AdvancedMarkerElement({
    map: map,
    position: position,
    title: "Uluru",
  });
}

// FEERR
async function mostrarCanchas(canchas) {
    const canchasContainer = document.createElement('div');
    canchasContainer.id = 'canchas-container';

    if (canchas && canchas.length > 0) {
        for (const cancha of canchas) {
            const canchaContainer = document.createElement('div');
            canchaContainer.classList.add('cancha');

            // Agregar información de la cancha
            for (const key in cancha) {
                const p = document.createElement('p');
                p.innerHTML = `<strong>${key}:</strong> ${cancha[key]}`;
                canchaContainer.appendChild(p);
            }

            // Agregar mapa
            const mapContainer = document.createElement('div');
            mapContainer.classList.add('map');
            canchaContainer.appendChild(mapContainer);

            // Inicializar y agregar el mapa
            await initMap(cancha.latitud, cancha.longitud, mapContainer);

            canchasContainer.appendChild(canchaContainer);
        }
    } else {
        canchasContainer.innerHTML = '<p>No se encontraron canchas asociadas a este espacio.</p>';
    }

    // Agrega el contenedor de las canchas debajo del mapa
    const mapContainer = document.getElementById('map');
    mapContainer.insertAdjacentElement('afterend', canchasContainer);
}

// Initialize and add the map
async function initMap(_lat, _lng, mapContainer) {
    // The location of the cancha
    const position = { lat: _lat, lng: _lng };

    // Request needed libraries.
    //@ts-ignore
    const { Map } = await google.maps.importLibrary("maps");
    const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");

    // The map, centered at the cancha
    const map = new Map(mapContainer, {
        zoom: 16,
        center: position,
        mapId: "DEMO_MAP_ID",
    });

    // The marker, positioned at the cancha
    const marker = new AdvancedMarkerElement({
        map: map,
        position: position,
        title: "Cancha",
    });
}

// Llama a la función para obtener y mostrar las canchas al cargar la página
obtenerCanchas();

