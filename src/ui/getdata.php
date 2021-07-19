<?php

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "pokemon";

// Establish connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) 
{
    die("Connection failed: " . $conn->connect_error);
}

$sql = "SELECT * FROM `pokedex` WHERE `id` = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("i", $id);
$id = $_POST['id'];
$stmt->execute();

$result = $stmt->get_result();

$stmt->close();
$conn->close();

$data = array();

while($row = $result->fetch_assoc())
{
    $data[] = $row;
}
echo json_encode($data);
?>
