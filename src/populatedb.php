
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

$sql = "INSERT INTO `moves` (`id`, `name`, `type`, `category`, `power`, `accuracy`, `status`, `statuschance`, `pp`) VALUES
(1, 'Thunder Shock', 'Electric', 'Special', 40, 100, 'Paralyze', 0.1, 30),
(2, 'Spark', 'Electric', 'Physical', 65, 100, 'Paralyze', 0.3, 20),
(3, 'Slam', 'Normal', 'Physical', 80, 75, 'Nothing', 0, 30),
(4, 'Thunderbolt', 'Electric', 'Special', 90, 100, 'Paralyze', 0.1, 15),
(5, 'Thunder', 'Electric', 'Special', 110, 70, 'Paralyze', 0.3, 10),
(6, 'Thunder Wave', 'Electric', 'Special', 0, 90, 'Paralyze', 1, 20)";

$conn->query($sql);

$sql = "INSERT INTO `stats` (`id`, `name`, `type`, `hp`, `att`, `spatt`, `def`, `spdef`, `spd`) VALUES
(1, 'Pikachu', 'Electric', 35, 55, 40, 50, 50, 90);";

$conn->query($sql);

?>