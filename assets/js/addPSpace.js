import { createClient } from '@supabase/supabase-js'
import yoyoImage from './../img/yoyo.png';
const { createHash } = require('crypto');

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
    "tipo_espacio",
    "latitud",
    "longitud"
];

//Arreglo de días según como aparecen en el formulario
var diasForm = [
    "lunes",
    "martes",
    "miercoles",
    "jueves",
    "viernes",
    "sabado",
    "domingo"
]
var diasBD = [
    "Lunes",
    "Martes",
    "Miércoles",
    "Jueves",
    "Viernes",
    "Sábado",
    "Domingo"
]

document.getElementById('addForm').addEventListener('submit', async (event) => {
    
    // Previene el comportamiento predeterminado del formulario (envío/recarga de la página)
    event.preventDefault();

    //SECCIÓN DE RECOPILACIÓN DE DATOS DEL ENCARGADO
    var IdsEncargado = [
        "man-nombre1",
        "man-nombre2",
        "man-apellido1",
        "man-apellido2",
        "sex-select",
        "num-Empleado",
        "RFC-Empleado",
        "CURP-Empleado",
        "charge-select",
        "man-inicio-actividades",
    ]
    var atributosEncargado = [
        "nombre_1",
        "nombre_2",
        "apellido_1",
        "apellido_2",
        "sexo",
        "num_empleado",
        "RFC",
        "CURP",
        "cargo",
        "inicio_actividades"
    ]
    var datosEncargado = {};

    for (let index = 0; index < IdsEncargado.length; index++) {
        let element = document.getElementById(IdsEncargado[index]).value.trim();
        datosEncargado[atributosEncargado[index]] = element;
    }

    
    // Generar la contraseña del usuario
    const firstName = document.getElementById('man-nombre1').value.trim();
    const lastName = document.getElementById('man-apellido1').value.trim();
    const curp = document.getElementById('CURP-Empleado').value.trim();
    const rfc = document.getElementById('RFC-Empleado').value.trim();
    const userPassword = generateUserPassword(firstName, lastName, curp, rfc);

    datosEncargado['password'] = userPassword;
    console.log(datosEncargado);

    //AQUI VA LA INSERCIÓN DE LOS DATOS PRINCIPALES DEL ENCARGADO
    var { data, error } = await supabase
        .from('encargados_espacios_publicos')
        .insert([{
            "nombre_1" : document.getElementById('man-nombre1').value.trim(),
            "nombre_2" : document.getElementById('man-nombre2').value.trim(),
            "apellido_1" : document.getElementById('man-apellido1').value.trim(),
            "apellido_2" : document.getElementById('man-apellido2').value.trim(),
            "sexo" : document.getElementById('sex-select').value.trim(),
            "num_empleado" : document.getElementById('num-Empleado').value.trim(),
            "RFC" : document.getElementById('RFC-Empleado').value.trim(),
            "CURP" : document.getElementById('CURP-Empleado').value.trim(),
            "cargo" : document.getElementById('charge-select').value.trim(),
            "inicio_actividades" : document.getElementById('man-inicio-actividades').value.trim(),
            "status" : document.getElementById('encargado-status-select') .value.trim(),
            "password" : userPassword
        }])
        .select();

        if(error){
            console.error("No se logró insertar los datos del encargado. Abortando");
            console.error(error);
            return;
        }
        const id_encargado = data[0].id_encargado;
        if(data !== null){
            
            console.log("id_encargado: " );
            console.log('id_encargado :>> ', id_encargado);
        }
        
    //AQUÍ SE RECOPILAN LOS DATOS DE LOS TELEFONOS INTRODUCIDOS
    var datosTelefonos = [];

    for(let i = 0; (document.getElementById('man-telefonos-' + i) !== null) && (document.getElementById('tel-' + i).value.trim() !== null ); i++){
        let newTelefonosToInsert = {};
        
        //Inserta el id del encargado
        newTelefonosToInsert["id_encargado"] = id_encargado;

        //Inserta el número de teléfono
        newTelefonosToInsert["numero_telefono"] = document.getElementById("tel-" + i).value.trim();

        //Inserta el tipo de teléfono
        newTelefonosToInsert["phone_type"] = document.getElementById("tipo-tel-" + i).value.trim();

        datosTelefonos.push(newTelefonosToInsert);

    }

    console.log("Intentando insertar telefonos...");
        console.log(datosTelefonos);
        try {
            // Iterar sobre cada objeto dentro del array 'clase'
            for (var dato of datosTelefonos) {
                console.log(dato);
                // Realizar la inserción del dato en la base de datos
                let { data, error } = await supabase
                    .from('encargados_phone_numbers')
                    .insert(dato)
                    .select()

                if (error) {
                    throw error;
                }

                console.log('Dato insertado con éxito:', data);
            }
        } catch (error) {
            console.log('Error al insertar telefonos:', error);
        };

    //AQUI SE RECOPILAN LOS DATOS DE LOS CORREOS INTRODUCIDOS
    var datosCorreos = [];

    for(let i = 0; (document.getElementById('man-correos-' + i) !== null) && (document.getElementById('email-' + 0).value.trim() !== null ); i++){
        let newCorreosToInsert = {};
        
        //Inserta el id del encargado
        newCorreosToInsert["id_encargado"] = id_encargado;

        //Inserta el correo
        newCorreosToInsert["email"] = document.getElementById("email-" + i).value.trim();

        datosCorreos.push(newCorreosToInsert);

    }

    console.log("Intentando insertar correos...");
        console.log(datosCorreos);
        try {
            // Iterar sobre cada objeto dentro del array 'clase'
            for (var dato of datosCorreos) {
                console.log(dato);
            // Realizar la inserción del dato en la base de datos
            let { data, error } = await supabase
                .from('encargados_email')
                .insert(dato)
                .select()

            if (error) {
                throw error;
            }

            console.log('Dato insertado con éxito:', data);
            }
        } catch (error) {
            console.log('Error al insertar telefonos:', error);
        };
    

    const formulario = document.getElementById('addForm');
    const responseMessage =  document.getElementById('mensaje');

    let datos = [];
    var latitud;
    var longitud;

        //Capturar coordenadas del formulario
        latitud = parseFloat(document.getElementById('PSpace-LatitudX').value);
        longitud = parseFloat(document.getElementById('PSpace-LongitudY').value);
    

    for(let i = 0; i < atributos.length;i++){

        if(atributos[i] == "latitud"){
            datos[atributos[i]] = latitud;
        }else if(atributos[i] == "longitud"){
            datos[atributos[i]] = longitud;
        }else{
            datos[atributos[i]] = formulario.elements[names[i]].value;
        }

    }
    
    var public_space_id;

    datos['id_encargado'] = id_encargado;
    console.log("Datos: ",datos);
    try {
        var { data, error } = await supabase
            .from('espacios_publicos')
            .insert([{
                "nombre" : document.getElementById('nombre').value.trim(),
                "estado": document.getElementById('estado').value.trim(),
                "municipio_delegacion" : document.getElementById('ciudad_municipio').value.trim(),
                "asentamiento" : document.getElementById('asentamiento').value.trim(),
                "calle" : document.getElementById('calle').value.trim(),
                "entre_calles1" : document.getElementById('entCalles1').value.trim(),
                "entre_calles2" : document.getElementById('entCalles2').value.trim(),
                "num_ext" : document.getElementById('numExt').value.trim(),
                "num_int" : document.getElementById('numInt').value.trim(),
                "codigo_postal" : document.getElementById('codigoPostal').value.trim(),
                "tipo_espacio" : document.getElementById('tipo-espacio').value.trim(),
                "latitud" : latitud,
                "longitud" : longitud,
                "id_encargado" : id_encargado
            }])
            .select();

        if (error) {
            throw error;
        }

        console.log('Datos del parque insertado con éxito:', data);
        public_space_id = data[0].id;
        if(data !== null){
            
            console.log("public_space_id: " );
            console.log('public_space_id :>> ', public_space_id);
        }
        
    } catch (error) {
        console.log('Error al insertar los datos del espacio público:', error);
    }

    if(public_space_id !== null){
        var datosHorarios = [];
        for(let i = 0; i < 5; i++){

            let id_hor_inicio = "espacio-publico-" + diasForm[i] + "-inicio";
            let id_hor_fin = "espacio-publico-" + diasForm[i] + "-fin";
            if(document.getElementById(id_hor_inicio).value !== ""){
                datosHorarios[i] = {
                    public_space_id : public_space_id,
                    day : diasBD[i],
                    hora_inicio : document.getElementById(id_hor_inicio).value,
                    hora_fin : document.getElementById(id_hor_fin).value
                }
            }

            console.log("Guardada la entrada de horario: ", datosHorarios[i]);

        }

        console.log("Guardados datos de horarios: ",datosHorarios);

        try {
            var { data, error } = await supabase
                .from('espacios_publicos_horarios')
                .insert(
                    datosHorarios
                )
                .select();
    
            if (error) {
                throw error;
            }
    
            console.log('Horarios registrados exitosamente: ', data);
            
        } catch (error) {
            console.log('Error al insertar los datos de los horarios:', error);
        };
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

//Añadir los campos de horarios a la página
function generarHorarios(prefijo, contenedorId) {
    var diasSemana = ['Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado', 'Domingo'];
    var contenedor = document.getElementById(contenedorId);

    diasSemana.forEach(function(dia) {
        var diaLower = dia.toLowerCase();  // Versión en minúsculas del día para IDs

        var divDia = document.createElement('div');
        divDia.classList.add('dia-horario');
        contenedor.appendChild(divDia);

        var labelDia = document.createElement('label');
        labelDia.textContent = dia + ':';
        divDia.appendChild(labelDia);

        var divHorario = document.createElement('div');
        divHorario.classList.add('horarios');
        divHorario.id = 'horarios-' + prefijo + '-' + diaLower;
        divDia.appendChild(divHorario);

        var labelInicio = document.createElement('label');
        labelInicio.setAttribute('for', prefijo + '-' + diaLower + '-inicio');
        labelInicio.textContent = 'Hora de apertura:';
        divHorario.appendChild(labelInicio);

        var inputInicio = document.createElement('input');
        inputInicio.setAttribute('type', 'time');
        inputInicio.id = prefijo + '-' + diaLower + '-inicio';
        inputInicio.name = prefijo + '-' + diaLower + '-inicio';
        divHorario.appendChild(inputInicio);

        var labelFin = document.createElement('label');
        labelFin.setAttribute('for', prefijo + '-' + diaLower + '-fin');
        labelFin.textContent = 'Hora de cierre:';
        divHorario.appendChild(labelFin);

        var inputFin = document.createElement('input');
        inputFin.setAttribute('type', 'time');
        inputFin.id = prefijo + '-' + diaLower + '-fin';
        inputFin.name = prefijo + '-' + diaLower + '-fin';
        divHorario.appendChild(inputFin);

    });
}

generarHorarios("espacio-publico","horarios");


// Función para generar el hash de una contraseña
function generatePasswordHash(password) {
    const hash = createHash('sha256');
    hash.update(password);
    return hash.digest('hex');
  }
  
  // Función para generar una contraseña basada en el nombre, apellido, CURP y RFC de un usuario
  function generateUserPassword(firstName, lastName, curp, rfc) {
    // Obtener los últimos dos dígitos de la CURP y del RFC
    const curpDigits = curp.slice(-2);
    const rfcDigits = rfc.slice(-2);
  
    // Crear la contraseña combinando el primer nombre, primer apellido, CURP y RFC
    const password = `${firstName}${lastName}${curpDigits}${rfcDigits}`;
  
    return password;
  }
  
