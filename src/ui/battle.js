function escape(){

    let escaped = Math.floor(Math.random()*100)
    if(escaped > 25){
        window.location.href = localStorage.getItem('homeURL');
        console.log("Escaped!")
    }
    else{
        alert("Couldn't escape!")
    }

}

function prepareFight(){
    
}

function defaultMenu(){
    document.getElementById("menu").innerHTML = "<button class = 'button'>Fight</button><button class = 'button' onclick='escape()'>Run</button>"
}

function enemyTurn(){

}
function playerTurn(){

}
console.log("Here");