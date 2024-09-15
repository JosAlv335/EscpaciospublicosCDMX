<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Buscar</title>
    <link rel="stylesheet" href="buscar.css">
</head>
<body>
    <header>
        <h1>Buscar</h1>
    </header>
    <main>
        <?php
        // Verificar si se ha enviado el formulario de búsqueda
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

            // Recibir el nombre de la búsqueda y eliminar espacios
            $nombre_busqueda = str_replace(' ', '', $_POST['nombre']);

            // Preparar la consulta SQL para buscar registros que contengan el nombre (sin importar mayúsculas o minúsculas ni espacios)
            $sql = "SELECT * FROM datos WHERE REPLACE(LOWER(nombre), ' ', '') LIKE REPLACE(LOWER('%$nombre_busqueda%'), ' ', '')";
            $result = $conn->query($sql);

            // Mostrar resultados en una tabla si se encuentran registros
            if ($result->num_rows > 0) {
                echo "<table>";
                echo "<tr><th>ID</th><th>Estado</th><th>Ciudad/Municipio</th><th>Colonia</th><th>Calle</th><th>Nombre</th><th>Activo</th><th>Usuarios Activos</th></tr>";
                while($row = $result->fetch_assoc()) {
                    echo "<tr><td>".$row["id"]."</td><td>".$row["estado"]."</td><td>".$row["ciudad_municipio"]."</td><td>".$row["colonia"]."</td><td>".$row["calle"]."</td><td>".$row["nombre"]."</td><td>".$row["activo"]."</td><td>".$row["usuario_activos"]."</td></tr>";
                }
                echo "</table>";
            } else {
                echo "No se encontraron resultados.";
            }

            // Cerrar conexión
            $conn->close();
        }
        ?>
        <form action="<?php echo htmlspecialchars($_SERVER["PHP_SELF"]); ?>" method="POST">
            <div class="form-group">
                <label for="nombre">Nombre:</label>
                <input type="text" id="nombre" name="nombre" required>
            </div>
            <div class="button-group">
                <!-- Utiliza un enlace para redirigir -->
                <a href="tabla.php" class="cancel-button">Regresar</a>
                <button type="submit" class="search-button">Buscar</button>
            </div>
        </form>
    </main>
</body>
</html>
