import { createClient } from '@supabase/supabase-js'

// Create a single supabase client for interacting with your database
const supabase = createClient(
    "https://zrwtmvescjmkdenhdaqh.supabase.co", 
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inpyd3RtdmVzY2pta2RlbmhkYXFoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDk2MDA2ODEsImV4cCI6MjAyNTE3NjY4MX0.nWS7r3cCN_xhpTehJk71wQ19C7JsBuhF66MamPHpNWs"
)

//Arreglo de nombres de atributos segun el formulario
var names = [
    "publicSpaceID",            //public_space_id
    "tipoInstalacion",          //tipo
    "deporte-principal",        //actividad_principal
    "dim-ancho",                //ancho
    "dim-largo",                //largo
    "dim-profundidad",          //profundidad
    "techo",                    //techo
    "altura_techo",             //altura_techo
    "iluminacion",              //iluminacion
    "piso",                     //piso
    "tribunas",                 //tribunas
    "cancha-status",            //status
    "latitudX",
    "longitudY"
];

//Arreglo de nombres de atributos segun la tabla de la BD
var atributos = [
    "public_space_id",
    "tipo",
    "actividad_principal",
    "ancho",
    "largo",
    "profundidad",
    "techo",
    "altura_techo",
    "iluminacion",
    "piso",
    "tribunas",
    "status",
    "latitud",
    "longitud"
];

var checkboxes = [
    "act-clases",
    "act-entrenamiento",
    "act-libre"
];

var checkboxesBD = [
    "clases",
    "entrenamiento",
    "libre"
];

document.getElementById('courtForm').addEventListener('submit', async(event) => {
    
    // Previene el comportamiento predeterminado del formulario (envío/recarga de la página)
    event.preventDefault();

    const formulario = document.getElementById('courtForm');
    const responseMessage =  document.getElementById('mensaje');

    var datosMain = {};
    
    /**RECOGER DATOS DE CADA ELEMENTO DEL FORMULARIO PARA LA TABLA PRINCIPAL**/
    for(let i = 0; i < atributos.length;i++){
        datosMain[atributos[i]] = document.getElementById(names[i]).value;
    }

    /**RECOGE LOS DATOS DE LAS CHECKBOX NECESARIAS PARA LA TABLA MAIN**/
    for(let i = 0; i < checkboxes.length;i++){
        if(document.getElementById(checkboxes[i]).checked){
            datosMain[checkboxesBD[i]] = true;
        }else{
            datosMain[checkboxesBD[i]] = false;
        }
        
    }

    
    //Arreglo de objetos que almacenará los horarios para los elementos correspondientes
    var datosHorarios = [];

    //Arreglo de cadenas que indican los campos en el HTML que consideran horarios
    var horariosToGet = [
        "clase",
        "train",
        "libre",
        "vest",
        "wc",
        "showers",
        "sauna",
        "hidmasaje"
    ];

    var allCheckboxes = [
        "act-clases",
        "act-entrenamiento",
        "act-libre",
        "vestidores",
        "wc",
        "regaderas",
        "sauna",
        "hidromasaje"
    ];
    
    
    //ALMACENA TODOS LOS HORARIOS PARA LAS CLASES EN UN ARREGLO DE OBJETOS PARA LUEGO INSERTARLOS

    

    //PARA ESTE PUNTO, YA SE TIENEN LOS DATOS DE LOS HORARIOS DE TODOS LOS ELEMENTOS QUE LOS INVOLUCRAN
    //AHORA SE GUARDARÁN LOS DATOS INDIVIDUALMENTE
    

    //AHORA SE HARÁN INSERCIONES INDIVIDUALES A CADA TABLA

    //INSERCIÓN A "courts"
    console.log("datosMain: ");
    console.log(datosMain);
    var { data, error } = await supabase
        .from('courts')
        .insert(datosMain)
        .select();

    if(error){
        console.log("Error al insertar los datos en la tabla courts: ");
        console.log(error);
        return;
    }

    console.log("Iserción exitosa!\nDatos:");
    console.log(data);
    //Obtiene el ID generado para la inserción anterior
    const court_id = data[0].court_id;
    console.log(court_id);

    //INSERCIÓN DE LOS DATOS DE ACTIVIDADES DE LA CANCHA
    var activitiesIDs = [
        null,   //clases_id
        null,   //train_id
        null    //libre_id
    ]
    //**********************************Inserción a "court_activities"**********************//
    //INSERCIÓN DE DATOS DE CLASE
    if(document.getElementById('act-clases').checked){
        let { data, error } = await supabase
            .from('court_activities')
            .insert([{
                "court_id" : court_id,
                "activity" : "Clases",
                "detalles" : document.getElementById('clases-desc').value.trim()
            }])
            .select();

        if(error){
            console.log("Error al insertar los datos de clases en la tabla courts: ");
            console.log(error);
            return;
        }

        console.log("Datos de insercion clase:");
        console.log(data);

        var clase_id = data[0].activity_id;
        activitiesIDs[0] = clase_id;
    }
    //INSERCIÓN DE DATOS DE ENTRENAMIENTO
    if(document.getElementById('act-entrenamiento').checked){
        let { data, error } = await supabase
            .from('court_activities')
            .insert([{
                "court_id" : court_id,
                "activity" : "Entrenamiento",
                "detalles" : document.getElementById('train-desc').value.trim()
            }])
            .select()

        if(error){
            console.log("Error al insertar los datos de entrenamiento en la tabla courts: ");
            console.log(error);
            return;
        }

        var train_id = data[0].activity_id;
        activitiesIDs[1] = train_id;
    }
    //INSERCIÓN DE DATOS DE LIBRE
    if(document.getElementById('act-libre').checked){
        let { data, error } = await supabase
            .from('court_activities')
            .insert([{
                "court_id" : court_id,
                "activity" : "Libre",
                "detalles" : document.getElementById('libre-desc').value.trim()
            }])
            .select()

        if(error){
            console.log("Error al insertar los datos de libre en la tabla courts: ");
            console.log(error)
            return;
        }

        var libre_id = data[0].activity_id;
        activitiesIDs[2] = libre_id;
    }

    //INSERCION DE DATOS DE SERVICIOS
    //Arreglo para los IDs de servicios

    var servicesIDs = [
        null,   //Vestidores
        null,   //WC
        null,   //Showers
        null,   //sauna
        null    //Hidmasaje
    ]

    var servicesNames = [
        "Vestidores",
        "WC",
        "Regaderas",
        "Sauna",
        "Hidromasaje"
    ]

    //**********************************Inserción a "court_services"**********************//
    //INSERCIÓN DE DATOS DE VESTIDORES

    for(let i = 0; i < 5;i++){
        if(document.getElementById(allCheckboxes[i+3]).checked){
            let { data, error } = await supabase
                .from('court_services')
                .insert([{
                    "court_id" : court_id,
                    "servicio" : servicesNames[i],
                    "descripcion" : document.getElementById( horariosToGet[i+3] + '-desc').value.trim(),
                    "costo"    : document.getElementById( horariosToGet[i+3] + '-cost' ).value.trim(),
                    "capacidad": document.getElementById( horariosToGet[i+3] + '-capacity' ).value.trim()
                }])
                .select();
    
            if(error){
                console.log("Error al insertar los datos de" + servicesNames[i] + " en la tabla courts: ");
                console.log(error);
                return;
            }
    
            console.log("Datos de insercion clase:");
            console.log(data);
    
            var obtainedID = data[0].service_id;
            servicesIDs[i] = obtainedID;
        }
    }
    console.log("Services IDS:");
    console.log(servicesIDs);

    //ALMACENA TODOS LOS HORARIOS DE TODAS LAS ACTIVIDADES QUE INVOLUCRAN HORARIOS 
    var dias = [
        "lunes",
        "martes",
        "miercoles",
        "jueves",
        "viernes",
        "sabado",
        "domingo"
    ];
    /**
     * El ID de los checkboxes es <prefijo>-<dia>-abierto
     * EL ID de los inputs son <prefijo>-<dia>-<inicio/fin>
     */
    var datosHorarios = {}

    for(let j = 0;j < 8;j++){
        
        var prefijo = horariosToGet[j];

        // Verificar si existe un objeto para este prefijo en datosHorarios
        if (!datosHorarios.hasOwnProperty(prefijo) && document.getElementById(allCheckboxes[j]).checked) {
            datosHorarios[prefijo] = [];
        }

        //Itera sobre cada checkbox de "día"
        for(let i = 0;i < 7;i++){

            let idCheckboxDia = prefijo + "-" + dias[i] + "-abierto" 

            if(document.getElementById(idCheckboxDia).checked && document.getElementById(allCheckboxes[j]).checked){

                let newActivitiesInsert ={};
                if(j < 3){
                    console.log("activity_id : " + activitiesIDs[j]);
                    newActivitiesInsert['activity_id'] = activitiesIDs[j];
                }else{
                    newActivitiesInsert['service_id'] = servicesIDs[j-3]
                }
                
                /**
                 * Campos a recoger:
                 *      Dia                 -   dia             - dias[i]
                 *      Hora de apertura    -   hora_apertura   - <prefijo>-<dias[i]>-<inicio>
                 *      Hora de cierre      -   hora_cierre     - <prefijo>-<dias[i]>-<fin>
                 */
                newActivitiesInsert['dia'] = dias[i];
                let IDhoraApertura = prefijo + '-' + dias[i] + '-inicio';
                let insertHoraApertura = document.getElementById(IDhoraApertura).value.trim();
                newActivitiesInsert['hora_apertura'] = ( insertHoraApertura !== null ) ? insertHoraApertura : null;
                let IDhoraCierre = prefijo + '-' + dias[i] + '-fin';
                let insertHoracierre = document.getElementById(IDhoraCierre).value.trim();
                newActivitiesInsert['hora_cierre'] = ( insertHoracierre !== null ) ? insertHoracierre : null;
                console.log(newActivitiesInsert);
                
                // Agregar el nuevo objeto al arreglo correspondiente en datosHorarios[prefijo]
                datosHorarios[prefijo].push(newActivitiesInsert);

            }
            
        }

    }

    

    //******************INSERCIÓN EN LA TABLA "horarios_activities"**********************/

    //Si hubo inserción de "clase"
    if(activitiesIDs[0] !== null){
        console.log("Intentando insertar horarios de clase...");
        console.log(datosHorarios);
        const datosDeClase = datosHorarios.clase;
        try {
            // Iterar sobre cada objeto dentro del array 'clase'
            for (var dato of datosDeClase) {
                console.log(dato);
            // Realizar la inserción del dato en la base de datos
            let { data, error } = await supabase
                .from('horarios_actividades')
                .insert(dato)
                .select()

            if (error) {
                throw error;
            }

            console.log('Dato insertado con éxito:', data);
            }
        } catch (error) {
            console.log('Error al insertar datos de clase:', error);
        };

    }

    //Si hubo inserción de "entrenamiento"
    if(activitiesIDs[1] !== null){
        console.log("Intentando insertar horarios de entrenamiento...");
        console.log(datosHorarios);
        let datosTrain = datosHorarios.train;
        try {
            // Iterar sobre cada objeto dentro del array 'clase'
            for (var dato of datosTrain) {
                console.log(dato);
                // Realizar la inserción del dato en la base de datos
                let { data, error } = await supabase
                    .from('horarios_actividades')
                    .insert(dato)
                    .select()

                if (error) {
                    throw error;
                }

                console.log('Dato insertado con éxito:', data);
            }
        } catch (error) {
            console.log('Error al insertar datos de entrenamiento:', error);
        };

        console.log("Inserción de horario de entrenamiento exitoso, ID retornado: ");
        console.log(data);

    }

    //Si hubo inserción de "libre"
    if(activitiesIDs[2] !== null){
        console.log("Intentando insertar horarios de disponibilidad...");
        console.log(datosHorarios);
        let datosLibre = datosHorarios.libre;
        try {
            // Iterar sobre cada objeto dentro del array 'clase'
            for (var dato of datosLibre) {
                console.log(dato);
                // Realizar la inserción del dato en la base de datos
                let { data, error } = await supabase
                    .from('horarios_actividades')
                    .insert(dato)
                    .select()

                if (error) {
                    throw error;
                }

                console.log('Dato insertado con éxito:', data);
            }
        } catch (error) {
            console.log('Error al insertar datos de disponibilidad:', error);
        };

        console.log("Inserción de horario de disponibilidad exitoso, ID retornado: ");
        console.log(data);

    }
    

    //************************************************************************************************************//
    //***********************************INSERTAR HORARIOS DE LOS SERVICIOS***************************************//
    var datosHorServicios = [
        null,   //Vestidores
        null,   //WC
        null,   //Showers
        null,   //sauna
        null    //Hidmasaje
    ]

    datosHorServicios[0] = datosHorarios.vest;
    datosHorServicios[1] = datosHorarios.wc;
    datosHorServicios[2] = datosHorarios.showers;
    datosHorServicios[3] = datosHorarios.sauna;
    datosHorServicios[4] = datosHorarios.hidmasaje;

    for(let i = 0; i < 5;i++){
        if(document.getElementById(allCheckboxes[i+3]).checked){
            console.log("Intentando insertar horarios de clase...");
            console.log(datosHorServicios[i]);
            try {
                // Iterar sobre cada objeto dentro del array 'clase'
                for (var dato of datosHorServicios[i]) {
                    console.log(dato);
                    // Realizar la inserción del dato en la base de datos
                    let { data, error } = await supabase
                        .from('horarios_servicios')
                        .insert(dato)
                        .select()
        
                    if (error) {
                        throw error;
                    }
        
                    console.log('Dato insertado con éxito:', data);
                }
            } catch (error) {
                console.log('Error al insertar datos de clase:', error);
            };
        }
    }

    //Si hubo inserción de "clase"
    if(activitiesIDs[0] !== null){
        
        try {
            // Iterar sobre cada objeto dentro del array 'clase'
            for (var dato of datosDeClase) {
                console.log(dato);
            // Realizar la inserción del dato en la base de datos
            let { data, error } = await supabase
                .from('horarios_actividades')
                .insert(dato)
                .select()

            if (error) {
                throw error;
            }

            console.log('Dato insertado con éxito:', data);
            }
        } catch (error) {
            console.log('Error al insertar datos de clase:', error);
        };

    }
    

    //****************************************************************************** */

    // Utiliza el objeto datos para enviar los datos a donde necesites
    console.log(datosHorarios);
    console.log(datosMain);
    

})