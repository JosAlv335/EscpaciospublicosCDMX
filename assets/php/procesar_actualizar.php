<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // URL de la API de Supabase para insertar en espacios_publicos
    $supabaseUrl = $_ENV["REST_URL"] . "/rest/v1/espacios_publicos";

    // Clave pública de la API de Supabase
    $supabaseKey = getenv("REST_PUBLIC_KEY");

    // Recoger los datos enviados desde el formulario
    $datos = [
        "nombre" => $_POST["nombre"] ?? "",
        "estado" => $_POST["estado"] ?? "",
        "municipio_delegacion" => $_POST["ciudad_municipio"] ?? "",
        "asentamiento" => $_POST["asentamiento"] ?? "",
        "calle" => $_POST["calle"] ?? "",
        "entre_calles" => $_POST["entCalles"] ?? "",
        "num_ext" => $_POST["numExt"] ?? "",
        "num_int" => $_POST["numInt"] ?? "",
        "codigo_postal" => $_POST["codigoPostal"] ?? "",
        "horario_inicio" => $_POST["horario-inicio"] ?? "",
        "horario_fin" => $_POST["horario-fin"] ?? "",

        "tipo_espacio" => $_POST["tipo-espacio"] ?? ""
    ];

    // Convertir los datos a JSON
    $data_json = json_encode($datos);

    // Configurar la solicitud HTTP a Supabase para insertar datos
    $options = array(
        'http' => array(
            'header' => "Content-Type: application/json\r\n" .
                        "apikey: $supabaseKey\r\n" .
                        "Prefer: resolution=merge-duplicates\r\n", // Header para que Supabase devuelva los datos de la fila insertada
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
