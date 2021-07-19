
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
    `name` text NOT NULL UNIQUE,
    `type` text NOT NULL,
    `category` text NOT NULL,
    `power` int(11) NOT NULL,
    `accuracy` int(11) NOT NULL,
    `status` text NOT NULL,
    `statuschance` float NOT NULL,
    `pp` int(11) NOT NULL
  );";

$conn->query($sql);


$sql = "CREATE TABLE `movesets` (
  `id` int(11) NOT NULL,
  `Name` text NOT NULL UNIQUE,
  `Move1` int(11) NOT NULL,
  `Move2` int(11) NOT NULL,
  `Move3` int(11) NOT NULL,
  `Move4` int(11) NOT NULL,
  `Move5` int(11) NOT NULL,
  `Move6` int(11) NOT NULL
);";

$conn->query($sql);

$sql = "INSERT INTO `moves` (`id`, `name`, `type`, `category`, `power`, `accuracy`, `status`, `statuschance`, `pp`) VALUES
(1, 'Thunder Shock', 'Electric', 'Special', 40, 100, 'Paralyze', 0.1, 30),
(2, 'Spark', 'Electric', 'Physical', 65, 100, 'Paralyze', 0.3, 20),
(3, 'Slam', 'Normal', 'Physical', 80, 75, 'Nothing', 0, 30),
(4, 'Thunderbolt', 'Electric', 'Special', 90, 100, 'Paralyze', 0.1, 15),
(5, 'Thunder', 'Electric', 'Special', 110, 70, 'Paralyze', 0.3, 10),
(6, 'Thunder Wave', 'Electric', 'Special', 0, 90, 'Paralyze', 1, 20),
(7, 'Tackle', 'Normal', 'Physical', 40, 100, 'Nothing', 0, 35),
(8, 'Psybeam', 'Psychic', 'Special', 65, 100, 'Nothing', 0.1, 20),
(9, 'Bite', 'Dark', 'Physical', 80, 100, 'Nothing', 0, 25),
(10, 'Psychic', 'Psychic', 'Special', 100, 100, 'Nothing', 0, 15),
(11, 'Shadow Ball', 'Ghost', 'Special', 95, 100, 'Nothing', 0, 20),
(12, 'Last Resort', 'Normal', 'Physical', 140, 10, 'Nothing', 0, 10),
(13, 'Icicle Crash', 'Ice', 'Physical', 85, 90, 'Nothing', 0.3, 10),
(14, 'Powder Snow', 'Ice', 'Special', 40, 100, 'Nothing', 0.1, 25),
(15, 'Frost Breath', 'Ice', 'Special', 90, 90, 'Nothing', 0, 10),
(16, 'Slash', 'Normal', 'Physical', 80, 100, 'Nothing', 0, 20),
(17, 'Blizzard', 'Ice', 'Special', 110, 70, 'Nothing', 0.1, 5),
(18, 'Sheer Cold', 'Ice', 'Special', 999, 1, 'Nothing', 0, 3),
(19, 'Poison Sting', 'Poison', 'Physical', 15, 100, 'Poison', 0.3, 35),
(20, 'Scratch', 'Normal', 'Physical', 40, 100, 'Nothing', 0, 35),
(21, 'Burning claws', 'Ground', 'Physical', 50, 100, 'Burning', 0.3, 15),
(22, 'Heavy Slash', 'Normal', 'Physical', 70, 100, 'Sleep', 0.25, 10),
(23, 'Earthquake', 'Ground', 'Physical', 100, 100, 'Nothing', 0, 10),
(24, 'Dragon Claw', 'Dragon', 'Physical', 80, 100, 'Nothing', 0, 15),
(25, 'Crunch', 'Dark', 'Physical', 80, 100, 'Nothing', 0.2, 15),
(26, 'Giga Impact', 'Normal', 'Physical', 150, 40, 'Nothing', 1, 5),
(27, ' Sing', 'Normal', 'Effect', 0, 55, 'Sleep', 1, 15),
(28, ' Egg bomb', 'Normal', 'Physical', 100, 75, 'Nothing', 0, 10),
(29, 'Toxic', 'Poison', 'Effect', 0, 90, 'Poison', 1, 10),
(30, 'Peck', 'Flying', 'Physical', 35, 100, 'Nothing', 0, 35),
(31, 'Metal Claw', 'Steel', 'Physical', 50, 95, 'Burning', 0.1, 35),
(32, 'Wing Attack', 'Flying', 'Physical', 60, 100, 'Nothing', 0, 15),
(33, 'Steel Wing', 'Steel', 'Physical', 70, 90, 'Burning', 0.1, 25),
(34, 'Water Gun', 'Water', 'Special', 40, 100, 'Nothing', 0, 25),
(35, 'Water Pulse', 'Water', 'Special', 80, 100, 'Nothing', 0, 25),
(36, 'Pound', 'Normal', 'Physical', 40, 100, 'Nothing', 0, 35),
(37, 'Aqua Tail', 'Water', 'Physical', 90, 90, 'Nothing', 0, 10),
(38, 'Hydro Pump', 'Water', 'Special', 120, 80, 'Nothing', 0, 5),
(39, 'Skull Bash', 'Normal', 'Physical', 100, 100, 'Nothing', 0, 10),
(40, 'Fire Fang', 'Fire', 'Physical', 65, 95, 'Burning', 0.1, 15),
(41, 'Rock Throw', 'Rock', 'Physical', 50, 90, 'Nothing', 0, 15),
(42, 'Dark Pulse', 'Dark', 'Special', 85, 100, 'Nothing', 0, 15),
(43, 'Rock Smash', 'Fighting', 'Physical', 60, 100, 'Nothing', 0, 15),
(44, 'Low Sweep', 'Fighting', 'Physical', 75, 85, 'Nothing', 1, 25),
(45, 'Brick Break', 'Fighting', 'Physical', 75, 100, 'Nothing', 1, 15),
(46, 'Knockout Punch', 'Fighting', 'Physical', 100, 65, 'Sleep', 0.5, 8),
(47, 'Mega Punch', 'Fighting', 'Physical', 80, 85, 'Nothing', 0, 20),
(48, 'Thunder Punch', 'Electric', 'Physical', 75, 100, 'Paralyze', 0.1, 15),
(49, 'Hypnosis', 'Psychic', 'Effect', 0, 60, 'Sleep', 1, 20),
(50, 'Shadow Punch', 'Ghost', 'Physical', 70, 100, 'Nothing', 0, 20),
(51, 'Sleep Powder', 'Grass', 'Effect', 0, 75, 'Sleep', 1, 15),
(52, 'Stun Spore', 'Grass', 'Effect', 0, 75, 'Paralyze', 1, 30),
(53, 'Poison Powder', 'Poison', 'Effect', 0, 75, 'Poison', 1, 35),
(54, 'X-Scissor', 'Bug', 'Physical', 80, 100, 'Nothing', 0, 15),
(55, 'Ember', 'Fire', 'Special', 40, 100, 'Burning', 0.1, 25),
(56, 'Flamethrower', 'Fire', 'Special', 95, 100, 'Burning', 0.1, 5),
(57, 'Inferno', 'Fire', 'Special', 100, 50, 'Burning', 1, 5),
(58, 'Extrasensory', 'Psychic', 'Special', 80, 100, 'Nothing', 0, 25),
(59, 'Energy Ball', 'Grass', 'Special', 95, 100, 'Nothing', 0, 10),
(60, 'Leaf Blade', 'Grass', 'Physical', 110, 90, 'Nothing', 1, 15),
(61, 'Dazzling Gleam', 'Fairy', 'Special', 80, 100, 'Nothing', 0, 10),
(62, 'Moonblast', 'Fairy', 'Special', 105, 100, 'Nothing', 0, 10),
(63, 'Twister', 'Dragon', 'Special', 50, 100, 'Nothing', 0, 20),
(64, 'Hurricane', 'Flying', 'Special', 120, 70, 'Nothing', 0, 10),
(65, 'Acid', 'Poison', 'Special', 45, 100, 'Nothing', 0, 30),
(66, 'Mud Shot', 'Ground', 'Special', 75, 95, 'Nothing', 0, 15),
(67, 'Muddy Water', 'Water', 'Special', 95, 80, 'Nothing', 0, 10),
(68, 'Razor Leaf', 'Grass', 'Physical', 65, 100, 'Nothing', 0, 25),
(69, 'Petal Blizzard', 'Grass', 'Physical', 105, 90, 'Nothing', 0, 15),
(70, 'Sucker Punch', 'Dark', 'Physical', 75, 100, 'Sleep', 0.1, 10),
(71, 'Fire Punch', 'Fire', 'Physical', 75, 100, 'Burning', 0.1, 15),
(72, 'Blaze Kick', 'Fire', 'Physical', 95, 90, 'Burning', 0.1, 12),
(73, 'Darkest Lariat', 'Dark', 'Physical', 110, 85, 'Nothing', 0, 10),
(74, 'Cross Chop', 'Fighting', 'Physical', 115, 75, 'Nothing', 0, 5),
(75, 'Flare Blitz', 'Fire', 'Physical', 120, 65, 'Burning', 0.2, 5),
(76, 'Zen Headbutt', 'Psychic', 'Physical', 95, 95, 'Nothing', 0, 15),
(77, 'Force Palm', 'Fighting', 'Physical', 60, 100, 'Paralyze', 0.3, 10),
(78, 'High Jump Kick', 'Fighting', 'Physical', 100, 90, 'Nothing', 0, 10),
(79, 'Meteor Mash', 'Steel', 'Physical', 105, 90, 'Nothing', 0, 10),
(80, 'Flash Cannon', 'Steel', 'Special', 85, 100, 'Nothing', 0, 15),
(81, 'Discharge', 'Electric', 'Special', 80, 100, 'Paralyze', 0.3, 10),
(82, 'Zap Cannon', 'Electric', 'Special', 120, 50, 'Paralyze', 1, 5),
(83, 'Sludge', 'Poison', 'Special', 65, 100, 'Poison', 0.3, 20),
(84, 'Psycho Cut', 'Psychic', 'Physical', 85, 100, 'Nothing', 0, 20),
(85, 'Will-O-Wisp', 'Fire', 'Effect', 0, 85, 'Burning', 1, 15);";

$conn->query($sql);


$sql = "INSERT INTO `movesets` (`id`, `Name`, `Move1`, `Move2`, `Move3`, `Move4`, `Move5`, `Move6`) VALUES
(25, 'Pikachu', 1, 2, 3, 4, 5, 6),
(196, 'Espeon', 7, 8, 9, 10, 11, 12),
(614, 'Beartic', 13, 14, 15, 16, 17, 18),
(28, 'Sandslash', 16, 19, 20, 21, 22, 23),
(612, 'Haxorus', 9, 16, 22, 24, 25, 26),
(242, 'Blissey', 7, 27, 28, 29, 10, 12),
(227, 'Skarmory', 30, 31, 32, 16, 33, 21),
(9, 'Blastoise', 34, 35, 37, 7, 38, 39),
(248, 'Tyranitar', 40, 41, 42, 25, 9, 23),
(539, 'Sawk', 43, 44, 45, 46, 47, 48),
(94, 'Gengar', 49, 50, 29, 11, 9, 47),
(47, 'Parasect', 51, 52, 53, 54, 7, 3),
(38, 'Ninetales', 55, 56, 57, 58, 7, 3),
(254, 'Sceptile', 59, 54, 16, 60, 3, 7),
(282, 'Gardevoir', 49, 61, 62, 10, 3, 7),
(130, 'Gyarados', 63, 64, 25, 38, 3, 7),
(537, 'Seismitoad', 65, 66, 67, 38, 3, 7),
(154, 'Meganium', 59, 68, 69, 53, 3, 7),
(275, 'Shiftry', 70, 64, 58, 69, 3, 7),
(257, 'Blaziken', 47, 71, 56, 72, 3, 7),
(727, 'Incineroar', 73, 74, 75, 56, 3, 7),
(308, 'Medichamp', 76, 77, 48, 78, 3, 7),
(448, 'Lucario', 77, 78, 31, 79, 3, 7),
(82, 'Magneton', 2, 80, 81, 82, 3, 7),
(311, 'Plusle', 2, 5, 81, 4, 3, 7),
(312, 'Minun', 5, 6, 4, 81, 3, 7),
(89, 'Muk', 83, 8, 6, 29, 3, 7),
(65, 'Alakazam', 49, 10, 8, 84, 3, 7),
(442, 'Spiritomb', 29, 6, 11, 70, 3, 7),
(609, 'Chandelure', 49, 61, 85, 11, 3, 7);";

$conn->query($sql);

rebuildPokedex();
//Takes data from the .csv and places it in the pokedex table, which serves as storage for all base pokemon stats
function rebuildPokedex() {
 
  $sql = "CREATE TABLE `pokedex` (
    `id` int(3) UNIQUE NOT NULL PRIMARY KEY,
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
    // echo "legendary      " . $legendary;

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