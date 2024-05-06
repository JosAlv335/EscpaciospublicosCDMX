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
async function obtenerCanchas() {
    try {
        const { data: canchas, error } = await supabase
            .from('courts')
            .select('*')
            .eq('public_space_id', id);

        if (error) {
            console.error('Error al obtener las canchas:', error.message);
            return;
        }

        mostrarCanchas(canchas);
    } catch (error) {
        console.error('Error al obtener las canchas:', error.message);
    }
}

function mostrarCanchas(canchas) {
    const mapContainer = document.getElementById('map');
    const mapOptions = {
        zoom: 10,
        center: { lat: canchas[0].latitud, lng: canchas[0].longitud } // Centra el mapa en la primera cancha
    };
    const map = new google.maps.Map(mapContainer, mapOptions);

    canchas.forEach(cancha => {
        const position = { lat: cancha.latitud, lng: cancha.longitud };
        const marker = new google.maps.Marker({
            position: position,
            map: map,
            title: cancha.nombre // Puedes cambiar esto al campo que contiene el nombre de la cancha en tu tabla
        });
    });

    // Crea el contenedor para las especificaciones de cada cancha debajo del mapa
    const specificationsContainer = document.createElement('div');
    specificationsContainer.id = 'specifications-container';

    if (canchas && canchas.length > 0) {
        canchas.forEach(cancha => {
            const canchaHTML = `
                <div class="cancha">
                    <h3>${cancha.nombre}</h3>
                    <p><strong>Deporte:</strong> ${cancha.deporte}</p>
                    <p><strong>Descripción:</strong> ${cancha.descripcion}</p>
                    <!-- Agrega aquí más detalles de la cancha si lo deseas -->
                </div>
            `;
            specificationsContainer.innerHTML += canchaHTML;
        });
    } else {
        specificationsContainer.innerHTML = '<p>No se encontraron canchas asociadas a este espacio.</p>';
    }

    // Agrega el contenedor de las especificaciones debajo del mapa
    mapContainer.insertAdjacentElement('afterend', specificationsContainer);
}


// Llama a la función para obtener y mostrar las canchas al cargar la página
obtenerCanchas();
