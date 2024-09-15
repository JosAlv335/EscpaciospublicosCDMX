<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Agregar elemento</title>
    <link rel="stylesheet" href="agregar.css">
</head>
<body>
    <header>
        <h1>Agregar elemento</h1>
    </header>
    <main>
        <form action="<?php echo htmlspecialchars($_SERVER["PHP_SELF"]); ?>" method="POST">
            <div class="form-group">
                <label for="estado">Estado:</label>
                <input type="text" id="estado" name="estado" required>
            </div>
            <div class="form-group">
                <label for="ciudad_municipio">Ciudad/Municipio:</label>
                <input type="text" id="ciudad_municipio" name="ciudad_municipio" required>
            </div>
            <div class="form-group">
                <label for="colonia">Colonia:</label>
                <input type="text" id="colonia" name="colonia" required>
            </div>
            <div class="form-group">
                <label for="calle">Calle:</label>
                <input type="text" id="calle" name="calle" required>
            </div>
            <div class="form-group">
                <label for="nombre">Nombre:</label>
                <input type="text" id="nombre" name="nombre" required>
            </div>
            <div class="button-group">
                <!-- Utiliza un enlace para redirigir -->
                <a href="tabla.php" class="cancel-button">Regresar</a>
                <button type="submit" class="add-button" name="agregar">Agregar</button>
            </div>
        </form>
    </main>
</body>
</html>

<?php
// Verificar si el formulario ha sido enviado
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Conectar a la base de datos
    $servername = "localhost";
    $username = "root"; // Cambia esto por tu nombre de usuario
    $password = ""; // Cambia esto por tu contraseña
    $dbname = "parques";

    $conn = new mysqli($servername, $username, $password, $dbname);

    // Verificar conexión
    if ($conn->connect_error) {
        die("Error de conexión: " . $conn->connect_error);
    }

    // Recuperar los datos del formulario
    $estado = $_POST['estado'];
    $ciudad_municipio = $_POST['ciudad_municipio'];
    $colonia = $_POST['colonia'];
    $calle = $_POST['calle'];
    $nombre = $_POST['nombre'];

    // Preparar la consulta SQL
    $sql = "INSERT INTO datos (estado, ciudad_municipio, colonia, calle, nombre) VALUES ('$estado', '$ciudad_municipio', '$colonia', '$calle', '$nombre')";

    if ($conn->query($sql) === TRUE) {
        echo "<script>alert('Registro agregado exitosamente');</script>";
    } else {
        echo "Error: " . $sql . "<br>" . $conn->error;
    }

    // Cerrar la conexión
    $conn->close();
}
?>
