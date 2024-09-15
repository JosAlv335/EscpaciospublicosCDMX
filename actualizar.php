<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Actualizar</title>
    <link rel="stylesheet" href="actualizar.css">
</head>
<body>
    <header>
        <h1>Actualizar</h1>
    </header>
    <main>
        <?php
        // Verificar si se han enviado datos por POST
        if ($_SERVER["REQUEST_METHOD"] == "POST") {
            // Conectar a la base de datos
            $servername = "localhost";
            $username = "root"; // Cambiar por tu nombre de usuario
            $password = ""; // Cambiar por tu contraseña
            $dbname = "parques";

            $conn = new mysqli($servername, $username, $password, $dbname);

            // Verificar la conexión
            if ($conn->connect_error) {
                die("Error de conexión: " . $conn->connect_error);
            }

            // Recibir datos del formulario
            $id = $_POST['id'];
            $estado = $_POST['estado'];
            $ciudad_municipio = $_POST['ciudad_municipio'];
            $colonia = $_POST['colonia'];
            $calle = $_POST['calle'];
            $nombre = $_POST['nombre'];

            // Preparar la consulta SQL para actualizar
            $sql = "UPDATE datos 
                    SET estado='$estado', ciudad_municipio='$ciudad_municipio', colonia='$colonia', calle='$calle', nombre='$nombre'
                    WHERE id='$id'";

            // Ejecutar la consulta SQL
            if ($conn->query($sql) === TRUE) {
                echo "Registro actualizado correctamente";
            } else {
                echo "Error al actualizar el registro: " . $conn->error;
            }

            // Cerrar conexión
            $conn->close();
        }
        ?>
        <form action="<?php echo htmlspecialchars($_SERVER["PHP_SELF"]); ?>" method="POST">
            <div class="form-group">
                <label for="id">ID:</label>
                <input type="text" id="id" name="id" required>
            </div>
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
                <button type="button" id="regresarTabla" class="cancel-button">Regresar</button>
                <button type="submit" class="update-button">Actualizar</button>
            </div>
        </form>
    </main>
    
    <script>
    // Obtener referencia al botón de "Regresar"
    var regresarButton = document.getElementById("regresarTabla");

    // Agregar un evento de clic al botón de "Regresar"
    regresarButton.addEventListener("click", function() {
        // Redireccionar a la página tabla.php
        window.location.href = "tabla.php";
    });
</script>


</body>
</html>
