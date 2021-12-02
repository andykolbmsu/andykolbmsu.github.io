//    Andy Kolb
//    andykolbmsu.github.io
//    The Great Race
//    scripts.js
//    12/01/2021

// Initialize global variables
var characters = ['psylocke','cyclops','gambit','beast','wolverine'];
var charCount = 3;

var finishLine = getFinishLine();

var interval;
var gameState = 0;
var winnerObj = {name:'',px:0};



// Randomizes characters in array
function shuffle(arr) {
  arr.sort(() => Math.random() - 0.5);
}


// Get finish line pixel integer
function getFinishLine() {
    return window.innerWidth - 200;
}


// Runs initial code on load
window.onload = function() {
    initialize();
};


// Sets new finish line on window resize
window.onresize = function() {
    finishLine = getFinishLine();
}


// Initializes game
function initialize() {

    startScreen();

    shuffle(characters);

    // Set background image and initializes local variables
    var bg = document.getElementById("background");
    
    // Sets three characters determined by shuffle()
    for(var i=0; i < charCount; i++) {
        var c = characters[i];
        bg.innerHTML += '<img id="'+c+'" class="character" src="./images/'+c+'_idle.gif">';
    }

    // Displays characters on screen
    var charDistance = 30;
    var startPos = charCount * charDistance;
    var cImages = document.getElementsByClassName("character");
    for(var i=0; i<cImages.length; i++) {
        var e = cImages[i];

        e.style.bottom = startPos + "px";
        startPos -= charDistance;

    };
}


// Sets start screen
function startScreen() {
    // Displays start screen
    var startScreen = document.getElementById("startContainer");
    startScreen.style.display = "block";

    // Sets button class
    var button = document.getElementById("button");
    button.classList.remove("buttonStart");
    button.classList.add("buttonStop");
    button.setAttribute("onclick","startRace()");
}


// Start race
// Run once upon button click
function startRace() {

    if(gameState==0) {

        // Hides start screen
        var startScreen = document.getElementById("startContainer");
        startScreen.style.display = "none";

        // Changes characters to walk animations
        var arr = document.getElementsByClassName("character");
        for(var i=0; i < charCount; i++) {
            var e = arr[i];
            e.src = './images/' + e.id + '_walk.gif';
        }
    
        // Start interval
        gameState = 1;
        interval = setInterval(run, 500);

        // Changes button class
        var button = document.getElementById("button");
        button.removeAttribute("onclick");
        button.classList.remove("buttonStop");
        button.classList.add("buttonStart");

    }

}


// Running game
function run() {

    // Cycle through each character and move them forward
    var arr = document.getElementsByClassName("character");
    for(var i=0; i < charCount; i++) {
        var e = arr[i];
        var p = e.offsetLeft;
        p += getRandMove();
        e.style.left = p + "px";

        // Once character passes finish line, stop interval and determine final winner
        if(p >= finishLine) {
            gameState = 0;
            clearInterval(interval);
            endRace();

            if(p > winnerObj.px) {
                winnerObj.name = e.id;
                winnerObj.px = p;
            }
        }
    };

    // Displays winner screen
    if(!gameState) {
        var winnerContainer = document.getElementById("winnerContainer");
        var winnerCard = document.getElementById("winnerCard");
        winnerCard.innerHTML = '<img src="./images/'+winnerObj.name+'_card.gif">';
        winnerContainer.style.display = "block";
    }

}


// End race
function endRace() {
    // Changes character animation back to idle
    var arr = document.getElementsByClassName("character");
    for(var i=0; i<arr.length; i++) {
        var e = arr[i];
        e.src = './images/' + e.id + '_idle.gif';
    };

    // Sets click listener for winner image to reset game
    document.getElementById("winner").addEventListener("click", function () {
        resetGame();
    });

}


// Returns random integer for pixels moved forward
function getRandMove() {
    // Returns range 20 to 50
    var n = 20 + Math.floor(Math.random()  * 30);
    return n;
}


// Resets game
function resetGame() {
    // Remove winner card
    var winnerCard = document.getElementById("winnerCard");
    winnerCard.innerHTML = "";

    // Hide winner screen
    document.getElementById("winnerContainer").style.display = "none";

    // Display start screen
    startScreen();

    // Return characters to starting line
    var chars = document.getElementsByClassName("character");
    for(var i=0; i<chars.length; i++) {
        chars[i].style.left = "50px";
   }
}