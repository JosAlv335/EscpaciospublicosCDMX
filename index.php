<?php

$servidor = "localhost";
$usuario = "root";
$clave = "";
$baseDeDatos = "loginep";

$enlace = mysqli_connect($servidor, $usuario, $clave, $baseDeDatos);

if (!$enlace) {
    echo "Error: No se pudo conectar a MySQL.";
    exit;
}

if (isset($_POST["registro"])) {
    $nombre = $_POST['nombre'];
    $correo = $_POST['correo'];
    $contraseña = $_POST['contraseña'];

    // Consulta para verificar si el correo ya existe
    $consultaCorreo = "SELECT correo FROM Login WHERE correo='$correo'";
    $resultado = mysqli_query($enlace, $consultaCorreo);

    // Verificar si se encontraron resultados (correo ya existe)
    if (mysqli_num_rows($resultado) > 0) {
        echo "El correo electrónico ya está registrado. Por favor, utiliza otro correo.";
    } else {
        // El correo no existe, insertar los datos en la base de datos
        $insertarDatos = "INSERT INTO Login VALUES ('$nombre', '$correo', '$contraseña', '')";
        $ejecutarInsertar = mysqli_query($enlace, $insertarDatos);

        // Verificar si se pudo insertar correctamente
        if ($ejecutarInsertar) {
            // Redirigir a tabla.php si se insertó correctamente
            header("Location: tabla.php");
            exit(); // Terminar el script para evitar que se siga ejecutando código innecesario
        } else {
            echo "Error al registrar. Por favor, intenta nuevamente.";
        }
    }
}

?>
