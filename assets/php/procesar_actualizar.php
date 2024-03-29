<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // URL de la API de Supabase para insertar en espacios_publicos
    $supabaseUrl = $_ENV["REST_URL"] . "/rest/v1/espacios_publicos?id=eq." . $_POST["id"];

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
        "horario_fin" => $_POST["horario-fin"] ?? NULL,

        "tipo_espacio" => $_POST["tipo-espacio"] ?? ""
    ];

    // Convertir los datos a JSON
    $data_json = json_encode($datos);

    // Inicializar cURL
    $ch = curl_init();

    // Configurar la URL y otras opciones
    curl_setopt($ch, CURLOPT_URL, $supabaseUrl); // URL de la fila específica en Supabase con el parámetro
    curl_setopt($ch, CURLOPT_CUSTOMREQUEST, 'PATCH'); // Método de solicitud PUT para actualizar
    curl_setopt($ch, CURLOPT_POSTFIELDS, $data_json); // Datos a actualizar
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true); // Devolver el resultado como cadena

    // Establecer los encabezados de la solicitud
    curl_setopt($ch, CURLOPT_HTTPHEADER, array(
        'Content-Type: application/json',
        'apikey: ' . $supabaseKey,
        'Prefer: return=representation' // Header para que Supabase devuelva los datos de la fila actualizada
    ));

    // Ejecutar la solicitud y guardar la respuesta en una variable
    $response = curl_exec($ch);
    $httpCode = curl_getinfo($curl, CURLINFO_HTTP_CODE);

    // Verificar si hubo algún error en la solicitud
    if(curl_errno($ch)) {
        // Manejar el error de solicitud HTTP
        echo "Error en la solicitud HTTP: " . $httpCode;
        echo "Error CURL: " . curl_error($ch);
    }

    // Cerrar la sesión cURL
    curl_close($ch);

    // Procesar la respuesta recibida
    echo "Actualización exitosa";
} else {
    echo "<h2>Método de solicitud no soportado.</h2>";
}
?>
