<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // URL de la API de Supabase para insertar en espacios_publicos
    $supabaseUrl = $_ENV["REST_URL"] . "/rest/v1/espacios_publicos";

    // Clave pública de la API de Supabase
    $supabaseKey = getenv("REST_PUBLIC_KEY");

    $names = array(
        "nombre",
        "estado",
        "ciudad_municipio",
        "asentamiento",
        "calle",
        "entCalles",
        "numExt",
        "numInt",
        "codigoPostal",
        "horario-inicio",
        "horario-fin",
        "tipo-espacio"
    );
    
    $atributos = array(
        "nombre",
        "estado",
        "ciudad_municipio",
        "asentamiento",
        "calle",
        "entre_calles",
        "num_ext",
        "num_int",
        "codigo_postal",
        "horario_inicio",
        "horario_fin",
        "tipo_espacio"
    );

    // Recoger los datos enviados desde el formulario
    $datos = [];
    foreach ($names as $key => $value) {
        //Verifica si el valor no está vacío o es NULL y si la clave no es el ID
        if (isset($_POST[$value]) && $_POST[$value] !== "") {
            //Guardar el par clave-valor en el arreglo $datos
            $datos[$atributos[$key]] = $_POST[$value];
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
