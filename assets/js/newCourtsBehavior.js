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

async function obtenerActividadesYServicios(courtId) {
    try {
        const { data: activities, error: activitiesError } = await supabase
            .from('court_activities')
            .select('*')
            .eq('court_id', courtId);

        const { data: services, error: servicesError } = await supabase
            .from('court_services')
            .select('*')
            .eq('court_id', courtId);

        if (activitiesError || servicesError) {
            console.error('Error al obtener los datos de actividades o servicios:', activitiesError || servicesError);
            return;
        }

        mostrarActividadesYServicios(activities, services, courtId); // Pasamos courtId como argumento
    } catch (error) {
        console.error('Error al obtener los datos de actividades o servicios:', error.message);
    }
}

function mostrarActividadesYServicios(activities, services, courtId) {
    const activitiesContainer = document.createElement('div');
    const servicesContainer = document.createElement('div');

    activitiesContainer.classList.add('activities', 'text-container'); // Agrega la clase text-container
    servicesContainer.classList.add('services', 'text-container'); // Agrega la clase text-container

    // Selecciona las columnas específicas de actividades que deseas imprimir
    const activitiesColumns = activities.map(activity => ({
        nombre: activity.activity,
        costo: activity.cost,
        detalles: activity.detalles,
        // Agrega más columnas según sea necesario
    }));

    // Selecciona las columnas específicas de servicios que deseas imprimir
    const servicesColumns = services.map(service => ({
        nombre: service.servicio,
        costo: service.costo,
        detalles: service.descripcion,
        capacidad: service.capacidad
        // Agrega más columnas según sea necesario
    }));

    if (activitiesColumns.length > 0) {
        activitiesContainer.innerHTML = '<h3>Actividades</h3>' +
            activitiesColumns.map(activity => `<p>Actividad: ${activity.nombre} - Costo: ${activity.costo} $ - Detalles: ${activity.detalles}</p>`).join('');
    } else {
        activitiesContainer.innerHTML = '<p>No hay actividades disponibles.</p>';
    }

    if (servicesColumns.length > 0) {
        servicesContainer.innerHTML = '<h3>Servicios</h3>' +
            servicesColumns.map(service => `<p>Servicio: ${service.nombre} - Costo: ${service.costo} - Detalles: ${service.detalles} - Capacidad: ${service.capacidad}</p>`).join('');
    } else {
        servicesContainer.innerHTML = '<p>No hay servicios disponibles.</p>';
    }

    const courtElement = document.querySelector(`.court[data-court-id="${courtId}"]`);
    courtElement.appendChild(activitiesContainer);
    courtElement.appendChild(servicesContainer);
}



function mostrarCourts(courts) {
    const courtsContainer = document.getElementById('courts-container');

    if (courts.length > 0) {
        courts.forEach((court, index) => {
            const courtElement = document.createElement('div');
            courtElement.classList.add('court');
            courtElement.dataset.courtId = court.court_id;

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

            obtenerActividadesYServicios(court.court_id);

            // Agregar la línea divisoria después de cada conjunto de información de la cancha
            if (index < courts.length - 1) {
                const dividerLine = document.createElement('hr');
                dividerLine.classList.add('divider-line');
                courtsContainer.appendChild(dividerLine);
            }
        });
    } else {
        courtsContainer.innerHTML = '<p>No se encontraron courts para mostrar.</p>';
    }
}

obtenerCourts();
