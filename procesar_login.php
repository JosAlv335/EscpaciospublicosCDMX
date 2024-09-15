<?php
$servidor = "localhost";
$usuario = "root";
$clave = "";
$baseDeDatos = "loginep";
$enlace = mysqli_connect($servidor, $usuario, $clave, $baseDeDatos);

if (!$enlace) {
    die("Error al conectar: " . mysqli_connect_error());
}

if(isset($_POST["login"])){
    $correo = $_POST['correo'];
    $contraseña = $_POST['contraseña'];

    // Consulta SQL para obtener el usuario por correo electrónico
    $consultaUsuario = "SELECT * FROM Login WHERE correo = '$correo'";
    $resultadoConsulta = mysqli_query($enlace, $consultaUsuario);

    if(mysqli_num_rows($resultadoConsulta) == 1) {
        // Usuario encontrado, verificar la contraseña
        $usuario = mysqli_fetch_assoc($resultadoConsulta);
        echo "Contraseña almacenada en la base de datos: " . $usuario['contraseña'] . "<br>";

        // Imprimir la longitud de ambas contraseñas para verificar si son iguales
        echo "Longitud de la contraseña almacenada: " . strlen($usuario['contraseña']) . "<br>";
        echo "Longitud de la contraseña proporcionada: " . strlen($contraseña) . "<br>";

        // Comparar contraseñas
        if(password_verify($contraseña, $usuario['contraseña'])) {
            // Contraseña correcta
            session_start();
            $_SESSION['usuario'] = $usuario['nombre']; // Guardar información del usuario en la sesión
            header("Location: inicio.php"); // Redirigir a la página de inicio
            exit();
        } else {
            // Contraseña incorrecta
            echo "Contraseña incorrecta";
        }
    } else {
        // Usuario no encontrado
        echo "Correo electrónico no registrado";
    }
}
?>
