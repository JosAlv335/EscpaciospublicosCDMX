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
        var { data, error } = await supabase
            .from('espacios_publicos')
            .select('*')
            .eq('id', id)
            .single();

        if (error) {
            console.error('Error al obtener la información:', error.message);
            return;
        }

        mostrarInformacion(data);

        const id_encargado = data.id_encargado;
        console.log(id_encargado);
        console.log(data);
    } catch (error) {
        console.error('Error al obtener la información:', error.message);
    }

    try {
        var { data, error } = await supabase
            .from('encargados_espacios_publicos')
            .select('*')
            .eq('id_encargado', id_encargado)
            .single();

        if (error) {
            console.error('Error al obtener la información:', error.message);
            return;
        }

        mostrarInformacion(data);

        console.log(data);
    } catch (error) {
        
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
// async function obtenerCanchas() {
//     try {
//         const { data: canchas, error } = await supabase
//             .from('courts')
//             .select('*')
//             .eq('public_space_id', id);

//         if (error) {
//             console.error('Error al obtener las canchas:', error.message);
//             return;
//         }

//         mostrarCanchas(canchas);
//     } catch (error) {
//         console.error('Error al obtener las canchas:', error.message);
//     }
// }

// function mostrarCanchas(canchas) {
//     const canchasContainer = document.createElement('div');
//     canchasContainer.id = 'canchas-container';

//     if (canchas && canchas.length > 0) {
//         const canchasHTML = canchas.map(cancha => {
//             let canchaHTML = '<div class="cancha">';
//             for (const key in cancha) {
//                 canchaHTML += `<p><strong>${key}:</strong> ${cancha[key]}</p>`;
//             }
//             canchaHTML += '</div>';
//             return canchaHTML;
//         }).join('');
//         canchasContainer.innerHTML = canchasHTML;
//     } else {
//         canchasContainer.innerHTML = '<p>No se encontraron canchas asociadas a este espacio.</p>';
//     }

//     // Agrega el contenedor de las canchas debajo del mapa
//     const mapContainer = document.getElementById('map');
//     mapContainer.insertAdjacentElement('afterend', canchasContainer);
// }

// // Llama a la función para obtener y mostrar las canchas al cargar la página
// obtenerCanchas();
