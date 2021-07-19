var musicLinks = {};
musicLinks.home = "https://vgmsite.com/soundtracks/pokemon-ruby-sapphire-music-super-complete/ipdpgcaw/1-13%20Pok%C3%A9mon%20Center.mp3";
musicLinks.battle = "https://vgmsite.com/soundtracks/pokemon-ruby-sapphire-music-super-complete/ktnxrati/1-09%20Battle%21%20Wild%20Pok%C3%A9mon.mp3";
var audioObj = new Audio();
audioObj.loop = true;
var musicEnabled;
var musicButton;
const url = window.location.pathname;
const filename = url.substring(url.lastIndexOf("/") + 1);



window.onload = function(){
    musicButton = document.getElementById("musicButton");
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

function getPokemonImageByNameSync(name) {
    var xhr = new XMLHttpRequest();
    xhr.open("POST", '../functions.php', false);
    console.log("tes")
    var param = JSON.stringify({functionname: 'getPokemonImageByName', arguments: [name]});
    
    //Send the proper header information along with the request
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.send(param);
    
    if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
        var responseObject = JSON.parse(xhr.response).result;
        return responseObject;
    }
}

function setHomeURL() {
    if (document.title === "Pokemon Home") {
        window.localStorage.setItem('homeURL', window.location.href);
    }
}

function setAudio() {
    musicEnabled = true;
    if (!localStorage.getItem("musicEnabled")) {
        localStorage.setItem("musicEnabled", "1")
        audioObj.play();
    }
    else if (localStorage.getItem("musicEnabled") == "0") {
        musicEnabled = false;
        audioObj.pause();
        if (musicButton) {musicButton.innerHTML = "Enable Music"};
    }
    
    if (musicEnabled) {
        if (filename.startsWith('homepage.html')) {
            audioObj.src = musicLinks.home;
        }
        else if (filename.startsWith("battle.html")) {
            audioObj.src = musicLinks.battle;
        }
        audioObj.play();
        if (musicButton) {musicButton.innerHTML = "Disable Music"};
    }
    
}

function toggleMusic() {
    musicEnabled = !musicEnabled;
    localStorage.setItem('musicEnabled', musicEnabled ? "1" : "0");
    setAudio();
}
