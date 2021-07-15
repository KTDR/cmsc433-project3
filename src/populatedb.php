
<?php
// This will add two tables to an existing database

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "pokemon";

// Establish connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
  }

// Create the tables
$sql = "CREATE TABLE `moves` (
    `id` int(11) NOT NULL,
    `name` text NOT NULL,
    `type` text NOT NULL,
    `category` text NOT NULL,
    `power` int(11) NOT NULL,
    `accuracy` int(11) NOT NULL,
    `status` text NOT NULL,
    `statuschance` float NOT NULL,
    `pp` int(11) NOT NULL
  )";

$conn->query($sql);

$sql = "CREATE TABLE `stats` (
    `id` int(11) NOT NULL,
    `name` text NOT NULL,
    `type` text NOT NULL,
    `hp` int(11) NOT NULL,
    `att` int(11) NOT NULL,
    `spatt` int(11) NOT NULL,
    `def` int(11) NOT NULL,
    `spdef` int(11) NOT NULL,
    `spd` int(11) NOT NULL
  )";

$conn->query($sql);

?>