
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
    `id` int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `name` text NOT NULL,
    `type` text NOT NULL,
    `category` text NOT NULL,
    `power` int(11) NOT NULL,
    `accuracy` int(11) NOT NULL,
    `status` text NOT NULL,
    `statuschance` float NOT NULL,
    `pp` int(11) NOT NULL
  );";

$conn->query($sql);

$sql = "CREATE TABLE `stats` (
    `id` int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `name` text NOT NULL,
    `type` text NOT NULL,
    `hp` int(11) NOT NULL,
    `att` int(11) NOT NULL,
    `spatt` int(11) NOT NULL,
    `def` int(11) NOT NULL,
    `spdef` int(11) NOT NULL,
    `spd` int(11) NOT NULL
  );";

$conn->query($sql);

$sql = "CREATE TABLE `movesets` (
  `id` int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `Name` text NOT NULL,
  `Move1` int(11) NOT NULL,
  `Move2` int(11) NOT NULL,
  `Move3` int(11) NOT NULL,
  `Move4` int(11) NOT NULL,
  `Move5` int(11) NOT NULL,
  `Move6` int(11) NOT NULL
);";

$conn->query($sql);

$sql = "INSERT INTO `moves` (`name`, `type`, `category`, `power`, `accuracy`, `status`, `statuschance`, `pp`) VALUES
('Thunder Shock', 'Electric', 'Special', 40, 100, 'Paralyze', 0.1, 30),
( 'Spark', 'Electric', 'Physical', 65, 100, 'Paralyze', 0.3, 20),
( 'Slam', 'Normal', 'Physical', 80, 75, 'Nothing', 0, 30),
( 'Thunderbolt', 'Electric', 'Special', 90, 100, 'Paralyze', 0.1, 15),
( 'Thunder', 'Electric', 'Special', 110, 70, 'Paralyze', 0.3, 10),
('Thunder Wave', 'Electric', 'Special', 0, 90, 'Paralyze', 1, 20),
('Tackle', 'Normal', 'Physical', 40, 100, 'Nothing', 0, 35),
('Psybeam', 'Psychic', 'Special', 65, 100, 'Confuse', .1, 20),
('Bite', 'Dark', 'Physical', 60, 100, 'Flinch', 0.3, 25),
( 'Psychic', 'Psychic', 'Special', 100, 100, 'Nothing', 0, 15),
('Shadow Ball', 'Ghost', 'Special', 95, 100, 'Nothing', 0, 20),
( 'Last Resort', 'Normal', 'Physical', 140, 10, 'Nothing', 0, 10),
( 'Icicle Crash', 'Ice', 'Physical', 85, 90, 'Flinch', 0.3, 10),
( 'Powder Snow', 'Ice', 'Special', 40, 100, 'Freeze', 0.1, 25),
( 'Frost Breath', 'Ice', 'Special', 90, 90, 'Nothing', 0, 10),
( 'Slash', 'Normal', 'Physical', 80, 100, 'Nothing', 0, 20),
( 'Blizzard', 'Ice', 'Special', 110, 70, 'Freeze', 0.1, 5),
( 'Sheer Cold', 'Ice', 'Special', 999, 1, 'Nothing', 0, 3),
( 'Poison Sting', 'Poison', 'Physical', 15, 100, 'Poison', 0.3, 35),
( 'Scratch', 'Normal', 'Physical', 40, 100, 'Nothing', 0, 35),
( 'Sand Attack', 'Ground', 'Effect', 0, 100, 'AccDown', 1, 15),
( 'Swords Dance', 'Normal', 'Effect', 0, 100, 'AtkUp+', 1, 20),
( 'Earthquake', 'Ground', 'Physical', 100, 100, 'Nothing', 0, 10),
( 'Dragon Claw', 'Dragon', 'Physical', 80, 100, 'Nothing', 0, 15),
( 'Crunch', 'Dark', 'Physical', 80, 100, 'DefDown', .2, 15),
( 'Giga Impact', 'Normal', 'Physical', 150, 90, 'SkipNextTurn', 1, 5);";

$conn->query($sql);

$sql = "INSERT INTO `stats` (`name`, `type`, `hp`, `att`, `spatt`, `def`, `spdef`, `spd`) VALUES
( 'Pikachu', 'Electric', 35, 55, 40, 50, 50, 90),
( 'Espeon', 'Psychic', 65, 65, 60, 130, 95, 110),
( 'Beartic', 'Ice', 95, 130, 80, 70, 80, 50),
( 'Sandslash', 'Ground', 75, 100, 110, 45, 55, 65),
( 'Haxorus', 'Dragon', 76, 147, 90, 60, 70, 97);";

$conn->query($sql);

$sql = "INSERT INTO `movesets` (`name`, `Move1`, `Move2`, `Move3`, `Move4`, `Move5`, `Move6`) VALUES 
('Pikachu', 1, 2, 3, 4, 5, 6),
('Espeon', 7, 8, 9, 10, 11, 12),
('Beartic', 13, 14, 15, 16, 17, 18),
('Sandslash', 16, 19, 20, 21, 22, 23),
('Haxorus', 9, 16, 22, 24, 25, 26); ";

$conn->query($sql);

rebuildPokedex();
//Takes data from the .csv and places it in the pokedex table, which serves as storage for all base pokemon stats
function rebuildPokedex() {
  $sql = "CREATE TABLE `pokedex` (
    `id` int(3) UNIQUE NOT NULL,
    `name` text NOT NULL,
    `type1` text NOT NULL,
    `type2` text NOT NULL,
    `total` int(4) NOT NULL,  
    `hp` int(3) NOT NULL,
    `att` int(3) NOT NULL,
    `def` int(3) NOT NULL,
    `spatt` int(3) NOT NULL,
    `spdef` int(3) NOT NULL,
    `speed` int(3) NOT NULL,
    `generation` int(1) NOT NULL,
    `legendary` int(1) NOT NULL
  )";
  global $conn; //Getting the connection variable from the global scope
  $conn->query($sql); //execute create table SQL 
  
  $file = fopen("../assets/pokemon_data.csv", "r");
  fgetcsv($file); //discard the first row since it's just the field names
  while (($data = fgetcsv($file)) !== FALSE) {
    $id = $data[0];
    $name = $data[1];
    $type1 = $data[2];
    $type2 = $data[3];
    $total = $data[4];
    $hp = $data[5];
    $attack = $data[6];
    $defense = $data[7];
    $sp_attack = $data[8];
    $sp_defense = $data[9];
    $speed = $data[10];
    $generation = $data[11];
    $legendary = $data[12];

    //fixing certain values
    $legendary === "FALSE" ? $legendary = 0 : $legendary = 1; 
    echo "legendary      " . $legendary;

    $sql = "INSERT INTO `pokedex` (`id`, `name`, `type1`, `type2`, `total`, `hp`, `att`, `def`, `spatt`, `spdef`, `speed`, `generation`, `legendary`) VALUES
    ($id, '$name', '$type1', '$type2', $total, $hp, $attack, $defense, $sp_attack, $sp_defense, $speed, $generation, $legendary);";
    $conn->query($sql);
    // foreach ($data as $d) {
    //   echo $d . ",";
    //   echo $sql;
    // }

  }
}
?>