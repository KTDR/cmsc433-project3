<?php
// https://stackoverflow.com/questions/8599595/send-json-data-from-javascript-to-php
// https://www.geeksforgeeks.org/how-to-send-a-json-object-to-a-server-using-javascript/
header('Content-Type: application/json');

$data = json_decode(file_get_contents('php://input'));
$aResult = (object)[];

if( !isset($data->functionname) ) { $aResult->error = 'No function name!'; }

if( !isset($data->arguments) ) { $aResult->error = 'No function arguments!'; }

if( !isset($aResult->error) ) {

    switch($data->functionname) {
        case 'add':
            if( !is_array($data->arguments) || (count($data->arguments) < 2) ) {
                $aResult->error = 'Error in arguments!';
            }
            else {
                $aResult->result = (($data->arguments[0]) + ($data->arguments[1]));
            }
            break;
        case 'getPokemonByName':
            if( !is_array($data->arguments) || (count($data->arguments) < 1) ) {
                $aResult->error = 'Error in arguments!';
            }
            else {
                $aResult->result = getPokemonByName($data->arguments[0]);
            }
            break;
        case 'getPokemonImageByName':
            if( !is_array($data->arguments) || (count($data->arguments) < 1) ) {
                $aResult->error = 'Error in arguments!';
            }
            else {
                $aResult->result = getPokemonImageByName($data->arguments[0]);
            }
            break;

        default:
            $aResult->error = 'Not found function '.$data->functionname.'!';
            break;
    }

}
echo json_encode($aResult);



function getPokemonByName($name) {
    $conn = new mysqli("localhost", "root", "", "pokemon");
    $sql = "SELECT * from pokedex WHERE (name = '$name')";
    $result = $conn->query($sql);
    $pokemon = mysqli_fetch_object($result);
    //fix integers from database being cast into strings, might be a more efficient way to do this
    $pokemon->id = (integer) $pokemon->id;
    $pokemon->total = (integer) $pokemon->total;
    $pokemon->hp = (integer) $pokemon->hp;
    $pokemon->att = (integer) $pokemon->att;
    $pokemon->def = (integer) $pokemon->def;
    $pokemon->spatt = (integer) $pokemon->spatt;
    $pokemon->speed = (integer) $pokemon->speed;
    $pokemon->generation = (integer) $pokemon->generation;
    $pokemon->legendary = (integer) $pokemon->legendary;
    return $pokemon;
}

function getPokemonImageByName($name) {
    $conn = new mysqli("localhost", "root", "", "pokemon");
    $sql = "SELECT id from pokedex WHERE (name = '$name')";
    $result = $conn->query($sql);
    $pokemon = mysqli_fetch_object($result);
    //fix integers from database being cast into strings, might be a more efficient way to do this
    $id_string= str_pad($pokemon->id, 3, "0", STR_PAD_LEFT);
    $imageLocation = "https://assets.pokemon.com/assets/cms2/img/pokedex/full/${id_string}.png";
    return $imageLocation;
}

?>