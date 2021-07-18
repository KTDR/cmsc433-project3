var queryingResult = [];

function displayPokemon(id)
{
    getPokemonById(id);
    
}

// This is an example of how to use the data after the query
function interpretResponse(response)
{
    var name = response[0].name;
    var type1 = response[0].type1;
    var type2 = response[0].type2;
    var hp = response[0].hp;
    var att = response[0].att;
    var def = response[0].def;
    var spatt = response[0].spatt;
    var spdef = response[0].spdef;
    var speed = response[0].speed;
    console.log(name);

}

function storeResponse(response)
{
    queryingResult = response;
    interpretResponse(queryingResult);
}

function getPokemonById(id)
{
var myRequest = new XMLHttpRequest();
    var method = "POST";
    var url = "getdata.php"
    var isAsync = true
    var pokemondata = [];
    myRequest.open(method, url, isAsync);

    myRequest.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    myRequest.send("id=" + id);

    myRequest.onreadystatechange = function() 
{
    if (myRequest.readyState == 4 && myRequest.status == 200)
    {
        var response = JSON.parse(myRequest.responseText);
        storeResponse(response);
    }

}
}
