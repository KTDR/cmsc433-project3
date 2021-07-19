var wildPokemon;
var party = JSON.parse(localStorage.getItem("party"));
var enemyParty;
var currentPokemon = [25, 196, 614, 28, 612, 242, 227, 9, 248, 539, 94, 47, 38, 254, 282, 130, 537, 154, 275, 257, 727, 308, 448,
82, 311, 312, 89, 65, 442, 609];
var activePokemonIndex=0;
var activeEnemyIndex=0;

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
    document.getElementById("message").innerHTML = "";
    window.location.href = "http://localhost/proj3/cmsc433-project3/src/homepage.html#home"
}

function prepareWildFight(){
    document.getElementById("arena").style.backgroundImage = "url('wild_background.png')"
    defaultMenu()

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
    document.getElementById("enemy").innerHTML="<img id = 'pokeImg' src = '"+ img + "'><div id = 'enemyhp'> Health: "+wildPokemon.hp+"<div>"
}

function getPartyPokemon(){
   displayPartyPokemon(activePokemonIndex);
    
}
function displayPartyPokemon(party_number){
    console.log("The heck ", party[party_number])
    let img = getPokemonImageByNameSync(party[party_number].name);
    document.getElementById("player").innerHTML="<img id = 'pokeImg' src = '"+ img + "'><div id = 'hp'> Health: "+party[party_number].hp+"<div>"
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
    defaultMenu();
    
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
    else{
        displayEnemyParty(0);
        getPartyPokemon();
    }
    
     
}

function displayEnemyParty(index){
    let img = getPokemonImageByNameSync(enemyParty[index].name);
    document.getElementById("enemy").innerHTML="<img id = 'pokeImg' src = '"+ img + "'><div id = 'enemyhp'> Health: "+enemyParty[index].hp+"<div>"
}

function catchPokemon(){
    if(party.length < 6){
        if(wildPokemon.hp < 20){
            party.push(wildPokemon);
            console.log(party);
            document.getElementById("message").innerHTML = ("Pokemon caught!");
            document.getElementById("menu").innerHTML = "<button class = 'button' onclick='goHome()'>Return Home</button>"
        }
        else{
            document.getElementById("message").innerHTML = ("Pokemon could not be caught! Its health is too high!");
        }
    }
    else{
        document.getElementById("message").innerHTML = ("Your party is already full!");
    }
}

function defaultMenu(){
    document.getElementById("menu").innerHTML = "<button class = 'button' onclick='openMoveset()'>Fight</button>"

    let fightType = localStorage.getItem("fightType");
    if(fightType == 0){
        document.getElementById("menu").innerHTML += "<button class = 'button' onclick='escape()'>Run</button><button class = 'button' onclick='catchPokemon()'>Catch</button>"
    }
    else{
        document.getElementById("menu").innerHTML += "<button class = 'button' onclick='goHome()'>Forfeit Battle</button>"
    }
}

function enemyTurn(){
    let chosenMove;
    let fightType = localStorage.getItem("fightType");
    let moves;
    if(fightType == 0){
        moves = getPokemonMovesetByIdSync(wildPokemon.id);
    }
    else{
        moves = getPokemonMovesetByIdSync(enemyParty[activeEnemyIndex].id);
    }
    console.log("Moves", moves)
    let moveID = Math.floor(Math.random() * 6) + 1
    switch(moveID){
        case 1:
            chosenMove = getPokemonMoveByIdSync(moves.Move1);
            break;
        case 2:
            chosenMove = getPokemonMoveByIdSync(moves.Move2);
            break;
        case 3:
            chosenMove = getPokemonMoveByIdSync(moves.Move3);
            break;
        case 4:
            chosenMove = getPokemonMoveByIdSync(moves.Move4);
            break;
        case 5:
            chosenMove = getPokemonMoveByIdSync(moves.Move5);
            break;
        case 6:
            chosenMove = getPokemonMoveByIdSync(moves.Move6);
            break;
    }
    console.log(chosenMove)
    let toHit = Math.floor(Math.random() * 100)
    if(toHit > chosenMove.accuracy){
        document.getElementById("message").innerHTML += "<br>Enemy attack missed!"
    }
    else{
        damage = Math.floor(chosenMove.power / 4)
        multiplier = findMoveEffectiveness(chosenMove.type, party[activePokemonIndex].type1, party[activePokemonIndex].type2);
        damage = damage*multiplier;
        party[activePokemonIndex].hp -= damage;
        document.getElementById("hp").innerHTML = "Health: " + party[activePokemonIndex].hp
        if(party[activePokemonIndex].hp <= 0){
            defeat();
            return;
        }
    }
    document.getElementById("message").innerHTML = ""
}

function playerTurn(moveID){
    console.log("Player");
    let chosenMove;
    let moves = getPokemonMovesetByIdSync(party[activePokemonIndex].id);
    switch(moveID){
        case 1:
            chosenMove = getPokemonMoveByIdSync(moves.Move1);
            break;
        case 2:
            chosenMove = getPokemonMoveByIdSync(moves.Move2);
            break;
        case 3:
            chosenMove = getPokemonMoveByIdSync(moves.Move3);
            break;
        case 4:
            chosenMove = getPokemonMoveByIdSync(moves.Move4);
            break;
        case 5:
            chosenMove = getPokemonMoveByIdSync(moves.Move5);
            break;
        case 6:
            chosenMove = getPokemonMoveByIdSync(moves.Move6);
            break;
    }
    console.log(chosenMove)
    let toHit = Math.floor(Math.random() * 100)
    if(toHit > chosenMove.accuracy){
        document.getElementById("message").innerHTML = "Your attack missed!"
        enemyTurn();
    }
    else{
        damage = Math.floor(chosenMove.power / 4)
        multiplier = findMoveEffectiveness(chosenMove.type, wildPokemon.type1, wildPokemon.type2);
        damage = damage*multiplier;
        wildPokemon.hp -= damage;
        document.getElementById("enemyhp").innerHTML = "Health: " + wildPokemon.hp
        if(wildPokemon.hp <= 0){
            victory();
        }
    }
    document.getElementById("message").innerHTML = ""
    defaultMenu();
    enemyTurn();
}

// Will return a multiplier based on how effective a move is against a pokemon
// -1 means the pokemon being attacked is immune to the attack
// Which means if an electric type status is used
// then it won't hit a ground type.
function findMoveEffectiveness(atkType, pokeType1, pokeType2)
{
		var multiplier = 1;
    // This is absolutely horrid, I am so sorry
    const notEffectiveAgainst = 
    {

    	Normal: ['Rock', 'Steel'],
    	Fire: ['Fire', 'Water', 'Rock', 'Dragon'],
    	Water: ['Water', 'Grass', 'Dragon'],
      Electric: ['Electric', 'Grass', 'Dragon'],
      Grass: ['Fire', 'Grass', 'Poison', 'Flying', 'Bug', 'Dragon', 'Steel'],
      Ice: ['Fire', 'Water', 'Ice', 'Steel'],
      Fighting: ['Poison', 'Flying', 'Psychic', 'Bug', 'Fairy'],
      Poison: ['Poison', 'Ground', 'Rock', 'Ghost'],
      Ground: ['Grass', 'Bug'],
      Flying: ['Electric', 'Rock', 'Steel'],
      Psychic: ['Psychic', 'Steel'],
      Bug: ['Fire', 'Fighting', 'Poison', 'Flying', 'Ghost', 'Steel', 'Fairy'],
      Rock: ['Fighting', 'Ground', 'Steel'],
      Ghost: ['Dark'],
      Dragon: ['Steel'],
      Dark: ['Fighting', 'Dark', 'Fairy'],
      Steel: ['Fire', 'Water', 'Electric', 'Steel'],
      Fairy: ['Fire', 'Poison', 'Steel']
      
    

    };    
    
    const superEffectiveAgainst = 
    {

    	Normal: ['Nothing'],
    	Fire: ['Grass', 'Ice', 'Bug', 'Steel'],
    	Water: ['Fire', 'Ground', 'Rock'],
      Electric: ['Water', 'Flying'],
      Grass: ['Water', 'Ground', 'Rock'],
      Ice: ['Grass', 'Ground', 'Flying', 'Dragon'],
      Fighting: ['Normal', 'Ice', 'Rock', 'Dark', 'Steel'],
      Poison: ['Grass', 'Fairy'],
      Ground: ['Fire', 'Electric', 'Poison', 'Rock', 'Steel'],
      Flying: ['Grass', 'Fighting', 'Bug'],
      Psychic: ['Fighting', 'Poison'],
      Bug: ['Grass', 'Psychic', 'Dark'],
      Rock: ['Fire', 'Ice', 'Flying', 'Bug'],
      Ghost: ['Psychic', 'Ghost'],
      Dragon: ['Dragon'],
      Dark: ['Psychic', 'Ghost'],
      Steel: ['Ice', 'Rock', 'Fairy'],
      Fairy: ['Fighting', 'Dragon', 'Dark']
      
    

    };  
    
    const noEffectOn = 
    {
    	
      Normal: ['Ghost'],
    	Fire: ['Nothing'],
    	Water: ['Nothing'],
      Electric: ['Ground'],
      Grass: ['Nothing'],
      Ice: ['Nothing'],
      Fighting: ['Ghost'],
      Poison: ['Steel'],
      Ground: ['Flying'],
      Flying: ['Nothing'],
      Psychic: ['Dark'],
      Bug: ['Nothing'],
      Rock: ['Nothing'],
      Ghost: ['Normal'],
      Dragon: ['Fairy'],
      Dark: ['Nothing'],
      Steel: ['Nothing'],
      Fairy: ['Nothing']
    };
    var lessDamage = notEffectiveAgainst[atkType];
    var moreDamage = superEffectiveAgainst[atkType];
    var noDamage = noEffectOn[atkType];
    
    if (lessDamage.includes(pokeType1))
    {
    	multiplier /= 2;
    }
    
    if (lessDamage.includes(pokeType2))
    {
    	multiplier /= 2;
    }
    
    if (moreDamage.includes(pokeType1))
    {
    	multiplier *= 2;
    }
    
    if (moreDamage.includes(pokeType2))
    {
    	multiplier *= 2;
    }
    
    if (noDamage.includes(pokeType1))
    {
    	multiplier = -1;
    }
    
    if (noDamage.includes(pokeType2))
    {
    	multiplier = -1;
    }
    return multiplier;

}
function openMoveset(){
    document.getElementById("message").innerHTML = "Select a Move";
    document.getElementById("menu").innerHTML = "<button id = 'move1' class = 'button' onclick='playerTurn(1)'></button>"
    document.getElementById("menu").innerHTML += "<button id = 'move2' class = 'button' onclick='playerTurn(2)'></button>"
    document.getElementById("menu").innerHTML += "<button id = 'move3' class = 'button' onclick='playerTurn(3)'></button>"
    document.getElementById("menu").innerHTML += "<button id = 'move4' class = 'button' onclick='playerTurn(4)'></button>"
    document.getElementById("menu").innerHTML += "<button id = 'move5' class = 'button' onclick='playerTurn(5)'></button>"
    document.getElementById("menu").innerHTML += "<button id = 'move6' class = 'button' onclick='playerTurn(6)'></button>"
    displayMoveset()
    document.getElementById("menu").innerHTML += "<button id = 'return' class = 'button' onclick='defaultMenu()'> Go back</button>"
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
        document.getElementById("message").innerHTML = "You won!";
        if(eliteStage > 3){
            window.location.href = "http://localhost/proj3/cmsc433-project3/src/victory.html"
        }
    }

}
function defeat(){
    document.getElementById("message").innerHTML = "You Lost!";
    document.getElementById("menu").innerHTML = "<button class = 'button' onclick='goHome()'>Return Home</button>"
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