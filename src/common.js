
window.onload = function(){
    setHomeURL();
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
