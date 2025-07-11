//import pokeApiRequest from apiRequest.js;
/*
TODO
Counter for how long it takes to guess
Countdown until next round
Bigger notification of win/loss
delay on picture... more points if they get it before then?

Star Wars API? Switcher?


*/

var pokeList;
var enteredAnswer;
var guessButton = document.querySelector("#guessButton");
var playerScore = 0;
var scoreTracker = document.querySelector("#playerScore");
var currentPokeName;
var currentPokeID;
var pokePageID = document.querySelector("#currentID");
var pokePageName = document.querySelector("#currentName");
var pokePicture;

window.onload = function () {
  NewGame();
  console.log("Page loaded");
};

guessButton.addEventListener("click", () => {
  console.log("guess button clicked");
  GetGuess();
  CheckGuess(enteredAnswer, currentPokeName);
  setTimeout(NewGame, 5000);
})

function NewGame() {
  console.log("starting new game");
  GetRandom();
  document.querySelector("#guess").value = "";
  document.querySelector("#winMessage").innerHTML = "What's Your Guess?";


}

function GetRandom() {
  console.log("getting random");

  let random = Math.floor(Math.random() * 150);
  console.log(random);
  pokeApiRequest(random);
  setTimeout(ApplyRandom, 1000);

}

function ApplyRandom() {
  console.log(pokeList);
  currentPokeID = pokeList.id;
  console.log("poke ID: ", currentPokeID);
  currentPokeName = pokeList["name"];
  pokePicture = pokeList.sprites["front_default"]
  console.log(pokePicture);
  document.querySelector("#currentID").innerHTML = currentPokeID;
  document.querySelector("#currentName").innerHTML = "??";
  document.querySelector("#currentPic").src = pokePicture;
  //console.log("got random: ", currentPokeID, currentPokeName);
  //return random;
}

function GetGuess() {

  enteredAnswer = document.querySelector("#guess").value;
  //return guess;
  console.log("getting guess: ", enteredAnswer);
}

function CheckGuess(guess, answer) {
  console.log("Checking answer...")
  RevealPoke();
  if (guess === answer) {
    console.log("answer correct", guess, answer);
    AddScore();
    Congrats();
  } else {
    console.log("answer wrong", guess, answer);
    TooBad();
  }
  //return correct;
}

function RevealPoke() {
  document.querySelector("#currentName").innerHTML = currentPokeName;
}

function ResetPage() {

  NewGame();

  console.log("resetting page...")

}

function AddScore() {
  console.log("adding to score");
  playerScore += 1;
  document.querySelector("#playerScore").innerHTML = playerScore;

  //return score;
}

function Congrats() {
  document.querySelector("#winMessage").innerHTML = "Correct!";
}

function TooBad() {
  document.querySelector("#winMessage").innerHTML = "Too Bad!";
}

function pokeApiRequest(id) {
  fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`)
    .then(response => response.json())
    .then(json => { /*console.log(json);*/ pokeList = json; })
}

