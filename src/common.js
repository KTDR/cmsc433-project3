
var musicLinks = {};
musicLinks.home = "https://vgmsite.com/soundtracks/pokemon-ruby-sapphire-music-super-complete/ipdpgcaw/1-13%20Pok%C3%A9mon%20Center.mp3";
musicLinks.battle = "https://vgmsite.com/soundtracks/pokemon-ruby-sapphire-music-super-complete/ktnxrati/1-09%20Battle%21%20Wild%20Pok%C3%A9mon.mp3";
var audioObj;
const url = window.location.pathname;
const filename = url.substring(url.lastIndexOf("/") + 1);

window.onload = function(){
    setHomeURL();
    setAudio();
};

function getPokemonByNameSync(name) {
    var xhr = new XMLHttpRequest();
    xhr.open("POST", 'functions.php', false);
    var param = JSON.stringify({functionname: 'getPokemonByName', arguments: [name]});
    
    //Send the proper header information along with the request
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.send(param);
    
    if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
        var responseObject = JSON.parse(xhr.response).result;
        return responseObject;
    }
}


//incomplete, do not use
function getPokemonByNameAsync(name) {
    var xhr = new XMLHttpRequest();
    xhr.open("POST", 'functions.php', true);
    var param = JSON.stringify({functionname: 'getPokemonByName', arguments: [name]});

    //Send the proper header information along with the request
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

    xhr.onreadystatechange = function() { // Call a function when the state changes.
        if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
            var responseObject = JSON.parse(xhr.response).result;
            return responseObject;
        }
    }
    xhr.send(param);
}

function setHomeURL() {
    console.log("called")
    if (document.title === "Pokemon Home") {
        window.localStorage.setItem('homeURL', window.location.href);
    }
}

function setAudio() {
    audioObj = new Audio();
    if (filename.startsWith('homepage.html')) {
        audioObj.src = musicLinks.home;
    }
    else if (filename.startsWith("battle.html")) {
        audioObj.src = musicLinks.battle;
    }
    audioObj.play();
    audioObj.loop = true;
}
