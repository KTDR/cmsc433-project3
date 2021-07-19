var wildPokemon;
var party = JSON.parse(localStorage.getItem("party"));
var enemyParty;

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

async function prepareWildFight(){
    document.getElementById("arena").style.backgroundImage = "url('wild_background.png')"
    defaultMenu()
    document.getElementById("menu").innerHTML += "<button class = 'button' onclick='escape()'>Run</button><button class = 'button' onclick='catchPokemon()'>Catch</button>"

    let id = Math.floor(Math.random() * 5 + 1)

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
    document.getElementById("enemy").innerHTML="<img id = 'pokeImg' src = 'background_images/00"+id+wildPokemon.name+".png'>"
}

function getPartyPokemon(){
   displayPartyPokemon(0)
    
}
function displayPartyPokemon(party_number){
    console.log("The heck ", party[party_number])
    document.getElementById("player").innerHTML="<img id = 'pokeImg' src = 'background_images/00"+party[party_number].id+party[party_number].name+".png'>"
}

function prepareEliteFight(){
    let eliteStage = localStorage.getItem("eliteStage");
    document.getElementById("title").innerHTML = "Elite 4 Challenge: ";
    if(!eliteStage || eliteStage == 0){
        document.getElementById("arena").style.backgroundImage = "url('background_images/elite_1.png')"
        document.getElementById("title").innerHTML += "1";
        enemyParty = [4, 4, 4]
    }
    else if(eliteStage == 1){
        document.getElementById("arena").style.backgroundImage = "url('background_images/elite_2.png')"
        document.getElementById("title").innerHTML += "2";
        enemyParty = [4, 4, 4, 4]
    }
    else if(eliteStage == 2){
        document.getElementById("arena").style.backgroundImage = "url('background_images/elite_3.png')"
        document.getElementById("title").innerHTML += "3";
        enemyParty = [4, 4, 4, 4, 4]
    }
    else if(eliteStage == 3){
        document.getElementById("arena").style.backgroundImage = "url('background_images/elite_4.png')"
        document.getElementById("title").innerHTML += "4";
        enemyParty = [4, 4, 4, 4, 4, 4]
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
        document.getElementById("message").innerHTML = ("Pokemon could not be caught! It's health is too high!");
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

console.log("There");