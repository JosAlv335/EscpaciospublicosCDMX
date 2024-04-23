import { createClient } from '@supabase/supabase-js';
import { Loader } from "@googlemaps/js-api-loader";

const urlParams = new URLSearchParams(window.location.search);
const nombre = urlParams.get('nombre');

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
            .eq('nombre', nombre)
            .single();

        if (error) {
            console.error('Error al obtener la información:', error.message);
            return;
        }

        mostrarInformacion(data);
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
}

obtenerInformacion();

var posX, posY;

// Initialize and add the map
let map;

async function initMap() {
  // The location of Uluru
  const position = { lat: -25.344, lng: 131.031 };
  // Request needed libraries.
  //@ts-ignore
  const { Map } = await google.maps.importLibrary("maps");
  const { AdvancedMarkerView } = await google.maps.importLibrary("marker");

  // The map, centered at Uluru
  map = new Map(document.getElementById("map"), {
    zoom: 4,
    center: position,
    mapId: "DEMO_MAP_ID",
  });

  // The marker, positioned at Uluru
  const marker = new AdvancedMarkerView({
    map: map,
    position: position,
    title: "Uluru",
  });
}

initMap();