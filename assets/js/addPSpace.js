import { createClient } from '@supabase/supabase-js'

// Create a single supabase client for interacting with your database
const supabase = createClient(
    "https://zrwtmvescjmkdenhdaqh.supabase.co", 
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inpyd3RtdmVzY2pta2RlbmhkYXFoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDk2MDA2ODEsImV4cCI6MjAyNTE3NjY4MX0.nWS7r3cCN_xhpTehJk71wQ19C7JsBuhF66MamPHpNWs"
)

//Arreglo de nombres de atributos segun el formulario
var names = [
    "nombre",
    "estado",
    "ciudad_municipio",
    "asentamiento",
    "calle",
    "entCalles1",
    "entCalles2",
    "numExt",
    "numInt",
    "codigoPostal",
    "horario-inicio",
    "horario-fin",
    "tipo-espacio",
];

//Arreglo de nombres de atributos segun la tabla de la BD
var atributos = [
    "nombre",
    "estado",
    "municipio_delegacion",
    "asentamiento",
    "calle",
    "entre_calles1",
    "entre_calles2",
    "num_ext",
    "num_int",
    "codigo_postal",
    "horario_inicio",
    "horario_fin",
    "tipo_espacio",
    "latitud",
    "longitud"
];

document.getElementById('addForm').addEventListener('submit', async (event) => {
    
    // Previene el comportamiento predeterminado del formulario (envío/recarga de la página)
    event.preventDefault();

    const formulario = document.getElementById('addForm');
    const responseMessage =  document.getElementById('mensaje');

    let datos = {};
    var latitud;
    var longitud;

    if(document.getElementById('toggleFormat').textContent === 'Cambiar a Grados, Minutos, Segundos'){
        //Capturar coordenadas del formulario
        latitud = parseFloat(document.getElementById('PSpace-LatitudX').value);
        longitud = parseFloat(document.getElementById('PSpace-LongitudY').value);
        //Construir el objeto geometry(Point)
        var coordenadas = `POINT(${longitud} ${latitud})`;
    }else{
        //Obtiene los datos de Latitud
        var LatitudGrados = document.getElementById('LatitudGrados').value;
        var LatitudMinutos = document.getElementById('LatitudGrados').value;
        var LatitudSegundos = document.getElementById('LatitudGrados').value;
        //Obtiene los datos de Longtud
        var LongitudGrados = document.getElementById('LongitudGrados').value;
        var LongitudMinutos = document.getElementById('LongitudGrados').value;
        var LongitudSegundos = document.getElementById('LongitudGrados').value;

        latitud = convertirDMSToDecimal(LatitudGrados,LatitudMinutos,LatitudSegundos);
        longitud = convertirDMSToDecimal(LongitudGrados,LongitudMinutos,LongitudSegundos);

        var coordenadas = `POINT(${longitud} ${latitud})`;

    }

    for(let i = 0; i < atributos.length;i++){

        if(atributos[i] == "latitud"){
            datos[atributos[i]] = latitud;
        }else if(atributos[i] == "longitud"){
            datos[atributos[i]] = longitud;
        }else{
            datos[atributos[i]] = formulario.elements[names[i]].value;
        }

    }

    const { data, error } = await supabase
        .from('espacios_publicos')
        .insert(datos)
        .select();

    if(error){
        responseMessage.innerHTML="No se logró insertar...";
        console.log('Error al insertar: ' + error.message);
        return;
    }

    if (data && data.length > 0){
        responseMessage.innerHTML = "Insertado exitosamente!";
        console.log('Inserción completada...');
    }

})

function convertirDMSToDecimal(grados, minutos, segundos) {
    var decimal = grados + minutos / 60 + segundos / 3600;
    /*
    if (direccion == "S" || direccion == "W") {
        decimal = -decimal;
    }
    */
    return decimal;
}