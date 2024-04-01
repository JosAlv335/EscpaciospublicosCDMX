<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // URL de la API de Supabase para insertar en espacios_publicos
    $supabaseUrl = $_ENV["REST_URL"] . "/rest/v1/courts";

    // Clave pública de la API de Supabase
    $supabaseKey = getenv("REST_PUBLIC_KEY");

    //Arreglo de nombres de atributos segun el formulario
    $names = array(
        "id",                       //public_space_id
        "tipoInstalacion",          //tipo
        "deporte-principal",        //actividad_principal
        "act-clases",               //clases
        "act-entrenamiento",        //entrenamiento
        "act-libre",                //libre
        "dim-ancho",                //ancho
        "dim-largo",                //largo
        "dim-profundidad",          //profundidad
        "techo",                    //techo
        "piso",                     //piso
        "iluminacion",              //iluminacion
        "tribunas",                 //tribunas
        "cancha-status"             //status
    );

    $checkboxes = array(
        "act-clases",
        "act-entrenamiento",
        "act-libre"
    );
    
    //Arreglo de nombres de atributos segun la tabla de la BD
    $atributos = array(
        "public_space_id",
        "tipo",
        "actividad_principal",
        "clases",
        "entrenamiento",
        "libre",
        "ancho",
        "largo",
        "profundidad",
        "techo",
        "altura_techo",
        "iluminacion",
        "piso",
        "tribunas",
        "status"
    );

    // Recoger los datos enviados desde el formulario
    $datos = [];
    foreach ($names as $key => $value) {
        // Verifica si el campo es un checkbox
        if (in_array($value, $checkboxes)) {
            // Verifica si el checkbox está marcado
            if (isset($_POST[$value])) {
                $datos[$atributos[$key]] = true;
            } else {
                $datos[$atributos[$key]] = false;
            }
        } else {
            // Para los campos que no son checkbox, verifica si el valor no está vacío o es NULL
            if (isset($_POST[$value]) && $_POST[$value] !== "") {
                $datos[$atributos[$key]] = $_POST[$value];
            } else {
                // Si el campo está vacío, asigna null o algún otro valor predeterminado si lo deseas
                $datos[$atributos[$key]] = null;
            }
        }
    }
    

    // Convertir los datos a JSON
    $data_json = json_encode($datos);

    // Configurar la solicitud HTTP a Supabase para insertar datos
    $options = array(
        'http' => array(
            'header' => "Content-Type: application/json\r\n" .
                        "apikey: $supabaseKey\r\n" .
                        "Prefer: return=representation\r\n", // Header para que Supabase devuelva los datos de la fila insertada
            'method' => 'POST',
            'content' => $data_json, // Datos a insertar
        ),
    );

    // Realizar la solicitud HTTP
    $context = stream_context_create($options);
    $response = @file_get_contents($supabaseUrl, false, $context);

    if ($response === FALSE) {
        if (isset($http_response_header)) {
            echo "Headers de respuesta: \n";
            print_r($http_response_header);
            echo "Datos: \n";
            print_r($datos);
        }
        echo "Error al realizar la solicitud HTTP.";
    } else {
        //echo $response;
        echo "Inserción exitosa";
    }
} else {
    echo "<h2>Método de solicitud no soportado.</h2>";
}
?>
