import { createClient } from '@supabase/supabase-js';
import { Loader } from "@googlemaps/js-api-loader";

const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get('id');

// Crear un cliente Supabase
const supabase = createClient(
    "https://zrwtmvescjmkdenhdaqh.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inpyd3RtdmVzY2pta2RlbmhkYXFoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDk2MDA2ODEsImV4cCI6MjAyNTE3NjY4MX0.nWS7r3cCN_xhpTehJk71wQ19C7JsBuhF66MamPHpNWs"
);

async function obtenerCourts() {
    try {
        const { data: courts, error } = await supabase
            .from('courts')
            .select('*')
            .eq('public_space_id', id);

        if (error) {
            console.error('Error al obtener los datos de los courts:', error.message);
            return;
        }

        mostrarCourts(courts);
    } catch (error) {
        console.error('Error al obtener los datos de los courts:', error.message);
    }
}

async function initMap(_lat, _lng, containerId) {
    const position = { lat: _lat, lng: _lng };
    // Request needed libraries.
    //@ts-ignore
    const { Map } = await google.maps.importLibrary("maps");
    const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");

    // The map, centered at the specified position
    const map = new Map(document.getElementById(containerId), {
        zoom: 16,
        center: position,
        mapId: "DEMO_MAP_ID",
    });

    // The marker, positioned at the specified position
    const marker = new AdvancedMarkerElement({
        map: map,
        position: position,
        title: "Court",
    });
}

function mostrarCourts(courts) {
    const courtsContainer = document.getElementById('courts-container');

    if (courts.length > 0) {
        courts.forEach((court, index) => {
            const courtElement = document.createElement('div');
            courtElement.classList.add('court');

            const courtInfo = document.createElement('p');
            courtInfo.textContent = `| Id: ${court.court_id} | Tipo: ${court.tipo} | Actividad: ${court.actividad_principal} | Ancho: ${court.ancho} | Largo: ${court.largo} | Profundidad: ${court.profundidad} | Techo: ${court.techo} | Altura: ${court.altura_techo} | Iluminación: ${court.largo} Piso: ${court.piso} | Tribunas: ${court.tribunas} | Estado: ${court.status} |`;

            const mapContainerId = `map-${court.id}-${index}`; // Generar ID único para cada mapa
            const mapContainer = document.createElement('div');
            mapContainer.id = mapContainerId;
            mapContainer.classList.add('map');

            courtElement.appendChild(courtInfo);
            courtElement.appendChild(mapContainer);
            courtsContainer.appendChild(courtElement);

            initMap(court.latitud, court.longitud, mapContainerId);
        });
    } else {
        courtsContainer.innerHTML = '<p>No se encontraron courts para mostrar.</p>';
    }
}


obtenerCourts();
