var queryingResult = [];

function displayPokemon(id)
{
    
    
    // Used as a test
    getPokemonById(id);
    getMoveById(id);
    getMovesetsById(id);
    
}

// This is an example of how to use the data after the query
function interpretResponse(response, table)
{
    
    if (table === "pokedex")
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

    else if (table === "moves")
    {
        var name = response[0].name;
        var type = response[0].type;
        var category = response[0].category;
        var power = response[0].power;
        var accuracy = response[0].accuracy;
        var status = response[0].status;
        var statuschance = response[0].statuschance;
        var pp = response[0].pp;
        console.log(category);
    }

    else if (table === "movesets")
    {
        var name = response[0].name;
        var move1 = response[0].move1;
        var move2 = response[0].move2;
        var move3 = response[0].move3;
        var move4 = response[0].move4;
        var move5 = response[0].move5;
        var move6 = response[0].move6;
        console.log(move2);

    }

}

function storeResponse(response, table)
{
    queryingResult = response;
    interpretResponse(queryingResult, table);
}

function getPokemonById(id)
{
var myRequest = new XMLHttpRequest();
    var method = "POST";
    var url = "getdata.php";
    var isAsync = true;
    
    myRequest.open(method, url, isAsync);

    myRequest.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    myRequest.send("id=" + id);

    myRequest.onreadystatechange = function() 
{
    if (myRequest.readyState == 4 && myRequest.status == 200)
    {
        var response = JSON.parse(myRequest.responseText);
        storeResponse(response, "pokedex");
    }

}
}

function getMoveById(id)
{
    var myRequest = new XMLHttpRequest();
    var method = "POST";
    var url = "getmove.php";
    var isAsync = true;
    
    myRequest.open(method, url, isAsync);

    myRequest.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    myRequest.send("id=" + id);

    myRequest.onreadystatechange = function() 
{
    if (myRequest.readyState == 4 && myRequest.status == 200)
    {
        var response = JSON.parse(myRequest.responseText);
        storeResponse(response, "moves");
    }

}
}

function getMovesetsById(id)
{
    var myRequest = new XMLHttpRequest();
    var method = "POST";
    var url = "getmovesets.php";
    var isAsync = true;
    
    myRequest.open(method, url, isAsync);

    myRequest.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    myRequest.send("id=" + id);

    myRequest.onreadystatechange = function() 
{
    if (myRequest.readyState == 4 && myRequest.status == 200)
    {
        var response = JSON.parse(myRequest.responseText);
        storeResponse(response, "movesets");
    }

}
}
