<?php
$enlace = pg_connect(getenv("DATABASE_URL"));

//Detecta si hubo algun error
if (!$enlace) {
    die("Error al conectar: " . pg_last_error());
}

//Busca el correo si es que existe para un nuevo registro
if(isset($_POST["registro"])){
    $nombre = $_POST['nombre'];
    $correo = $_POST['correo'];
    $contraseña = $_POST['contraseña'];

    // Consulta para verificar si el correo ya existe
    $consultaCorreo = "SELECT correo FROM users WHERE correo='$correo'";
    $resultado = pg_query($enlace, $consultaCorreo);

    // Verificar si se encontraron resultados (correo ya existe)
    if(pg_num_rows($resultado) > 0) {
        echo "El correo electrónico ya está registrado. Por favor, utiliza otro correo.";
    } else {
        // El correo no existe, insertar los datos en la base de datos
        $insertarDatos = "INSERT INTO users (nombre, correo, contraseña) VALUES ('$nombre', '$correo', '$contraseña')";
        $ejecutarInsertar = pg_query($enlace, $insertarDatos);

        // Verificar si se pudo insertar correctamente
        if($ejecutarInsertar) {
            // Redirigir a index.html si se insertó correctamente
            echo "<p style='color: green;'>¡Proceso completado exitosamente!</p>";
            header("Location: index.html");
            exit(); // Terminar el script para evitar que se siga ejecutando código innecesario
        } else {
            echo "<p style='color: red;'>¡Error! El proceso ha fallado.</p>";
        }
    }
}

if(isset($_POST["login"])){
    $correo = $_POST['correo'];
    $contraseña = $_POST['contraseña'];

    // Consulta para verificar si el correo y la contraseña coinciden
    $consultaUsuario = "SELECT * FROM users WHERE correo='$correo' AND contraseña='$contraseña'";
    $resultado = pg_query($enlace, $consultaUsuario);

    // Verificar si se encontró un usuario con el correo y contraseña proporcionados
    if(pg_num_rows($resultado) == 1) {
        // Redirigir a index.html si el inicio de sesión fue exitoso
        header("Location: tabla.html");
        exit(); // Terminar el script para evitar que se siga ejecutando código innecesario
    } else {
        echo "Correo electrónico o contraseña incorrectos. Por favor, intenta nuevamente.";
    }
}
?>
