import { createClient } from '@supabase/supabase-js'

// Create a single supabase client for interacting with your database
const supabase = createClient(
    "https://zrwtmvescjmkdenhdaqh.supabase.co", 
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inpyd3RtdmVzY2pta2RlbmhkYXFoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDk2MDA2ODEsImV4cCI6MjAyNTE3NjY4MX0.nWS7r3cCN_xhpTehJk71wQ19C7JsBuhF66MamPHpNWs"
)

document.getElementById('srchCP').addEventListener('click',function(){

    var codigoPostal = document.getElementById('codigoPostal').value;
    if(codigoPostal.length == 0){
        document.getElementById('codigoPostal').innerHTML = "Ingrese Codigo Postal..";
    }else if(codigoPostal.length <= 5){
        // Limpiar las opciones existentes en las listas desplegables
        document.getElementById("estado").innerHTML = '';
        document.getElementById("ciudad_municipio").innerHTML = '';
        document.getElementById("asentamiento").innerHTML = '';
        buscarAsentamientos();
    }

});

async function buscarAsentamientos(){

    var codigoPostal = document.getElementById('codigoPostal').value;
    
    const { data, error } = await supabase
        .from('catalogo_Direcciones')
        .select()
        .eq('codigo_postal',codigoPostal);
    
        if(error){
            console.log("Error al recuperar los datos postales: " + error.message);
            return;
        }

        // Utiliza 'Set' para almacenar valores únicos y luego convierte de nuevo a arreglo
        let estados = [...new Set(data.map(item => item.Estado))];
        let municipios = [...new Set(data.map(item => item.Municipio))];
        let asentamientos = [...new Set(data.map(item => item.Asentamiento))];

        // Llenar el campo de selección de estados
        var estadoSelect = document.getElementById('estado');
        estados.forEach(function(estado) {
            var option = document.createElement('option');
            option.value = estado;
            option.text = estado;
            estadoSelect.appendChild(option);
        });

        // Llenar el campo de selección de municipios
        var municipioSelect = document.getElementById('ciudad_municipio');
        municipios.forEach(function(municipio) {
            var option = document.createElement('option');
            option.value = municipio;
            option.text = municipio;
            municipioSelect.appendChild(option);
        });

        // Llenar el campo de selección de asentamientos
        var asentamientoSelect = document.getElementById('asentamiento');
        if (Array.isArray(asentamientos)) {
            asentamientos.forEach(function(asentamiento) {
                var option = document.createElement('option');
                option.value = asentamiento;
                option.text = asentamiento;
                asentamientoSelect.appendChild(option);
            });
        } else if (typeof asentamientos === 'object') {
            for (var key in asentamientos) {
                if (asentamientos.hasOwnProperty(key)) {
                    var asentamiento = asentamientos[key];
                    var option = document.createElement('option');
                    option.value = asentamiento;
                    option.text = asentamiento;
                    asentamientoSelect.appendChild(option);
                }
            }
        } else {
            // Manejar el caso en el que response.asentamientos no es ni un array ni un objeto
            console.error('Los asentamientos no están en un formato válido:', response.asentamientos);
        }

}