<?php
// MySQL-Datenbankverbindung aufbauen
$servername = "localhost";
$username = "root";
$password = null;
$dbname = "risikoscore";

// Verbindung prüfen
$conn = new mysqli($servername, $username, $password, $dbname);

$name = $_GET["name"];

// Abfrage ausführen um Daten aus der DB zu extrahieren
$sql = "SELECT * FROM kunden WHERE Pseudonym = 'Alex'";
$result = $conn->query($sql);

// Ergebnis als JSON zurückgeben
if ($result->num_rows > 0) {
    $row = $result->fetch_assoc();
    $data = array(
        "cvri" => $row["cvri"],
        "its" => $row["its"]
      );
    echo json_encode($data);
} else {
    echo "0 results";
}

$conn->close();

?>
