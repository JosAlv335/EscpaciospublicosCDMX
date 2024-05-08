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
    var datosEncargado = [];

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
    var { error } = await supabase
        .from('encargados_espacios_publicos')
        .insert(datosEncargado)
        .select();

        if(error){
            console.error("No se logró insertar los datos del encargado. Abortando");
            console.error(error);
            return;
        }

    var { data, error } = await supabase
        .from("encargados_espacios_publicos")
        .select("id_encargado")
        .eq('CURP',curp)

        if(error){
            console.error("No se logró recuperar el id del encargado. Abortando");
            console.error(error);
            return;
        }

        if (data && data.length > 0){
            
            console.log('Inserción completada...');
        }
        console.log(data);
        const manager_id = data[0].id_encargado;

    //AQUÍ SE RECOPILAN LOS DATOS DE LOS TELEFONOS INTRODUCIDOS
    var datosTelefonos = [];

    for(let i = 0; (document.getElementById('man-telefonos-' + i) !== null) && (document.getElementById('tel-' + 0).value.trim() !== null ); i++){
        let newTelefonosToInsert = [];
        
        //Inserta el id del encargado
        newTelefonosToInsert["manager_id"] = manager_id;

        //Inserta el número de teléfono
        newTelefonosToInsert["phone_number"] = document.getElementById("tel-" + i).value.trim();

        //Inserta el tipo de teléfono
        newTelefonosToInsert["phone_type"] = document.getElementById("tipo-tel-" + i).value.trim();

        datosTelefonos.push(newTelefonosToInsert);

    }

    let { data: dataTEL, error: errorTEL } = await supabase
        .from('encargados_phone_numbers')
        .insert(datosTelefonos)
        .select();

        if(errorTEL){
            console.error("No se logró insertar los datos del teléfono del encargado. Abortando");
            console.error(errorTEL);
            return;
        }

        if (dataTEL && dataTEL.length > 0){
            responseMessage.innerHTML = "Insertado exitosamente!";
            console.log('Inserción completada...');
        }

    //AQUI SE RECOPILAN LOS DATOS DE LOS CORREOS INTRODUCIDOS
    var datosCorreos = [];

    for(let i = 0; (document.getElementById('man-correos-' + i) !== null) && (document.getElementById('email-' + 0).value.trim() !== null ); i++){
        let newCorreosToInsert = [];
        
        //Inserta el id del encargado
        newCorreosToInsert["manager_id"] = manager_id;

        //Inserta el correo
        newCorreosToInsert["email"] = document.getElementById("email-" + i).value.trim();

        datosCorreos.push(newCorreosToInsert);

    }

    let { data: dataMAIL, error: errorMAIL } = await supabase
        .from('encargados_phone_numbers')
        .insert(datosCorreos)
        .select();

        if(errorMAIL){
            console.error("No se logró insertar los datos del teléfono del encargado. Abortando");
            console.error(errorMAIL);
            return;
        }

        if (dataMAIL && dataMAIL.length > 0){
            responseMessage.innerHTML = "Insertado exitosamente!";
            console.log('Inserción completada...');
        }
    

    const formulario = document.getElementById('addForm');
    const responseMessage =  document.getElementById('mensaje');

    let datos = {};
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

    var { data: dataMAIN, error: errorMAIN } = await supabase
        .from('espacios_publicos')
        .insert(datos)
        .select();

    if(errorMAIN){
        
        console.log('Error al insertar: ' + dataMAIN.message);
        return;
    }

    if (dataMAIN && dataMAIN.length > 0){
        
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
  
