<?php
$servername = "localhost";
$username = "root";
$password = null;
$dbname = "risikoscore";

// Verbindungsherstellung
$conn = new mysqli($servername, $username, $password, $dbname);

// Verbindung prüfen
if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}

//empfangen der Variablen aus popup.js
$consumerScore = $_POST['consumerScore'];
$behavioral = $_POST['score'];
$Rabatt = $_POST['rabatt'];
$Premium = $_POST['premium'];

//Updaten der DB
$stmt = $conn->prepare("UPDATE kunden SET behavioral = ?, Score = ?, Rabatt = ?, Prämie = ? WHERE Pseudonym = 'Alex'");
$stmt->bind_param("dddd", $behavioral, $consumerScore, $Rabatt, $Premium);


$stmt->execute();

$stmt->close();
$conn->close();
?>


