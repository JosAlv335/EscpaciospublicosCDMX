<?php
if ($_SERVER["REQUEST_METHOD"] == "GET") {
    // Datos de conexión a la base de datos PostgreSQL
    $servername = "localhost";
    $username = "id21930487_escomadmin"; // Cambiar por tu nombre de usuario
    $password = "escom_Database1"; // Cambiar por tu contraseña
    $dbname = "id21930487_baseparques";
    $port = "5432"; // Puerto por defecto de PostgreSQL

    // Cadena de conexión DSN para PostgreSQL
    $dsn = "pgsql:host=$servername;port=$port;dbname=$dbname;user=$username;password=$password";

    try {
        $db = parse_url(getenv("DATABASE_URL"));

        $conn = new PDO("pgsql:" . sprintf(
            "host=%s;port=%s;user=%s;password=%s;dbname=%s",
            $db["host"],
            $db["port"],
            $db["user"],
            $db["pass"],
            ltrim($db["path"], "/")
        ));


        // Establecer el modo de error de PDO a excepción
        $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

        // Recibir el nombre de la búsqueda y eliminar espacios
        //$nombre_busqueda = str_replace(' ', '', $_GET['nombre']);
        $nombre_busqueda = isset($_GET["nombre"]) ? $_GET["nombre"] :"";

        //Sanitiza la entrada para evitar inyecciones sql
        $nombre_busqueda = htmlspecialchars($nombre_busqueda);

        // Preparar la consulta SQL para buscar registros que contengan el nombre (sin importar mayúsculas o minúsculas ni espacios)
        //$sql = "SELECT * FROM datos WHERE REPLACE(LOWER(nombre), ' ', '') LIKE REPLACE(LOWER(?), ' ', '')";
        $sql = "SELECT * FROM datos WHERE nombre LIKE '%$nombre_busqueda%'";
        $stmt = $conn->prepare($sql);
        //$stmt->bindValue(1, "%$nombre_busqueda%", PDO::PARAM_STR);
        $stmt->execute();

        // Mostrar resultados en una tabla si se encuentran registros
        if ($stmt->rowCount() > 0) {
            echo "<table>";
            echo "<tr><th>ID</th><th>Estado</th><th>Ciudad/Municipio</th><th>Colonia</th><th>Calle</th><th>Nombre</th><th>Activo</th><th>Usuarios Activos</th></tr>";
            while($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
                echo "<tr><td>".$row["id"]."</td><td>".$row["estado"]."</td><td>".$row["ciudad_municipio"]."</td><td>".$row["colonia"]."</td><td>".$row["calle"]."</td><td>".$row["nombre"]."</td><td>".$row["activo"]."</td><td>".$row["usuarios_activos"]."</td></tr>";
            }
            echo "</table>";
        } else {
            echo "No se encontraron resultados.";
        }
    } catch(PDOException $e) {
        echo "Error: " . $e->getMessage();
    }

    // Cerrar la conexión
    $conn = null;
}
else{
    echo "<h2>No matches found...</h2>";
}
?>