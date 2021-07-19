var wildPokemon;
var party = JSON.parse(localStorage.getItem("party"));
var enemyParty;
var currentPokemon = [25, 196, 614, 28, 612, 242, 227, 9, 248, 539, 94, 47, 38, 254, 282, 130, 537, 154, 275, 257, 727, 308, 448,
82, 311, 312, 89, 65, 442, 609];
var activePokemonIndex=0;

window.onload = function() {
    displayMoveset();
}

function escape(){

    let escaped = Math.floor(Math.random()*100)
    if(escaped > 25){
        console.log("Escaped!")
        goHome()
    }
    else{
        document.getElementById("message").innerHTML = ("Couldn't get away!");
        console.log("Couldn't escape!")
    }

}

function goHome(){
    window.location.href = "http://localhost/proj3/cmsc433-project3/src/homepage.html#home"
}

function prepareWildFight(){
    document.getElementById("arena").style.backgroundImage = "url('wild_background.png')"
    defaultMenu()
    document.getElementById("menu").innerHTML += "<button class = 'button' onclick='escape()'>Run</button><button class = 'button' onclick='catchPokemon()'>Catch</button>"

    let id = Math.floor(Math.random() * currentPokemon.length)
    id = currentPokemon[id];

    /*cannot be it's own function, it messes up. No clue why*/
    var myRequest = new XMLHttpRequest();
    var method = "POST";
    var url = "getdata.php"
    var isAsync = true
    
    myRequest.open(method, url, isAsync);

    myRequest.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    myRequest.send("id=" + id);

    myRequest.onreadystatechange = function() {
        if (myRequest.readyState == 4 && myRequest.status == 200)
        {
            var response = JSON.parse(myRequest.responseText);
            wildPokemon = response[0];
            displayWildPokemon(id);
            getPartyPokemon();
        }
    }

    console.log(party[0]);
    /*end of something that should be it's own function*/
}

function displayWildPokemon(id){
    let img = getPokemonImageByNameSync(wildPokemon.name);
    document.getElementById("enemy").innerHTML="<img id = 'pokeImg' src = '"+ img + "'>"
}

function getPartyPokemon(){
   displayPartyPokemon(activePokemonIndex);
    
}
function displayPartyPokemon(party_number){
    console.log("The heck ", party[party_number])
    let img = getPokemonImageByNameSync(party[party_number].name);
    document.getElementById("player").innerHTML="<img id = 'pokeImg' src = '"+ img + "'>"
}

function prepareEliteFight(){
    let eliteStage = localStorage.getItem("eliteStage");
    document.getElementById("title").innerHTML = "Elite 4 Challenge: ";
    if(!eliteStage || eliteStage == 0){
        localStorage.setItem("eliteStage", 0);
        document.getElementById("arena").style.backgroundImage = "url('background_images/elite_1.png')"
        document.getElementById("title").innerHTML += "1";

        // Configures party to Water and Grass focused party
        enemyParty = [130, 537, 154, 275, 254, 47];
    }
    else if(eliteStage == 1){
        document.getElementById("arena").style.backgroundImage = "url('background_images/elite_2.png')"
        document.getElementById("title").innerHTML += "2";

        // Configures party to Fire and Fighting focused party
        enemyParty = [727, 308, 448, 257, 539, 38];
    }
    else if(eliteStage == 2){
        document.getElementById("arena").style.backgroundImage = "url('background_images/elite_3.png')"
        document.getElementById("title").innerHTML += "3";

        // Configures party to Electric and Steel focused party 
        enemyParty = [82, 311, 312, 25, 227, 282];
    }
    else if(eliteStage == 3){
        document.getElementById("arena").style.backgroundImage = "url('background_images/elite_4.png')"
        document.getElementById("title").innerHTML += "4";

        // Configures party to the annoying party
        enemyParty = [47, 65, 89, 442, 609, 242];
    }

    getEnemyParty(enemyParty, 0);
    
}

function getEnemyParty(enemyParty, i){

    if(i < enemyParty.length){
        var myRequest = new XMLHttpRequest();
        var method = "POST";
        var url = "getdata.php"
        var isAsync = true
    
    
        myRequest.open(method, url, isAsync);

        myRequest.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        myRequest.send("id=" + enemyParty[i]);

        myRequest.onreadystatechange = function() {
            if (myRequest.readyState == 4 && myRequest.status == 200)
            {
                var response = JSON.parse(myRequest.responseText);
                enemyParty[i] = response[0];
                console.log("Num: ", i, " ", enemyParty[i]);
                localStorage.setItem("party", JSON.stringify(party));
                console.log(enemyParty)
                getEnemyParty(enemyParty, i+=1)
            }
        }
    }
    
     
}

function catchPokemon(){
    if(wildPokemon.hp < wildPokemon.hp/4){
        party.push(wildPokemon);
        console.log(party);
        document.getElementById("message").innerHTML = ("Pokemon caught!");
        document.getElementById("menu").innerHTML = "<button class = 'button' onclick='goHome()'>Return Home</button>"
    }
    else{
        document.getElementById("message").innerHTML = ("Pokemon could not be caught! Its health is too high!");
    }
}

function defaultMenu(){
    document.getElementById("menu").innerHTML = "<button class = 'button' onclick='openMoveset()'>Fight</button>"
}

function enemyTurn(){

}

function playerTurn(moveID){

}

function openMoveset(){
    document.getElementById("message").innerHTML = "";
}

function victory(){
    let fightType = localStorage.getItem("fightType");
    if(fightType == 0){
        document.getElementById("message").innerHTML = "You won!";
        document.getElementById("menu").innerHTML = "<button class = 'button' onclick='goHome()'>Return Home</button>"
    }
    else{
        let eliteStage = localStorage.get("eliteStage");
        eliteStage ++;
        localStorage.setItem("eliteStage", eliteStage)
        if(eliteStage > 3){
            window.location.href = "http://localhost/proj3/cmsc433-project3/src/victory.html"
        }
    }


}

const getPokemon = async function(id){
    var myRequest = new XMLHttpRequest();
    var method = "POST";
    var url = "getdata.php"
    var id= 1;
    var isAsync = true
    
    myRequest.open(method, url, isAsync);

    myRequest.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    myRequest.send("id=" + id);

    myRequest.onreadystatechange = function() {
        if (myRequest.readyState == 4 && myRequest.status == 200)
        {
            var response = JSON.parse(myRequest.responseText);
            console.log(response[0]);
            document.getElementById("enemy").innerHTML = response[0].name;
            return response[0];
        }
    }
}

function initialize(){
    let fightType = localStorage.getItem("fightType");
    if(fightType == 0){
        prepareWildFight()
    }
    else{
        prepareEliteFight()
    }

    return true;
}


function displayMoveset() {
    let moves = getPokemonMovesetByIdSync(party[activePokemonIndex].id);
    document.getElementById("move1").innerHTML = getPokemonMoveByIdSync(moves.Move1).name;
    document.getElementById("move2").innerHTML = getPokemonMoveByIdSync(moves.Move2).name;
    document.getElementById("move3").innerHTML = getPokemonMoveByIdSync(moves.Move3).name;
    document.getElementById("move4").innerHTML = getPokemonMoveByIdSync(moves.Move4).name;
    document.getElementById("move5").innerHTML = getPokemonMoveByIdSync(moves.Move5).name;
    document.getElementById("move6").innerHTML = getPokemonMoveByIdSync(moves.Move6).name;
    
}
console.log("There");