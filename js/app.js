//create array to hold the cards
const cardArr = ["fa fa-diamond", "fa fa-diamond", "fa fa-paper-plane-o",  "fa fa-paper-plane-o", "fa fa-anchor", "fa fa-anchor", "fa fa-bolt", "fa fa-bolt", "fa fa-cube", "fa fa-cube", "fa fa-leaf", "fa fa-leaf","fa fa-bicycle", "fa fa-bicycle", "fa fa-bomb", "fa fa-bomb"];

//set the deck class as container for the cards themselves (dynamic cards instead of static)
const cardsContainer = document.querySelector(".deck");
const starsContainer = document.querySelector(".stars");
const timerContainer = document.querySelector(".timer");

let openedCards = [];
let matchedCards = [];
//var time = 0;
//var timer;
var seconds = 00;
var tens = 00;
var appendTens = document.getElementById("tens")
var appendSeconds = document.getElementById("seconds")
var Interval ;
var appendTens = document.getElementById("tens")
var appendSeconds = document.getElementById("seconds")


// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}
// create cards
init();
restartGame();
//initialize the game - creates cards and canvas
function init(){
    shuffle(cardArr);
  for (let i = 0; i < cardArr.length; i++) {
    const card = document.createElement("li");
    card.classList.add("card");
    card.innerHTML = `<i class="${cardArr[i]}"></i>`;
    cardsContainer.appendChild(card);
    stopStopwatch();
    resetStopwatch();
      // call click event to each card
      click(card);
    }
  firstClick();
}
//actions for clicking cards
function click(card){
  //card click event
    card.addEventListener("click", function(){

      const currentCard = this;
      const previousCard = openedCards[0];

          //existing opened card
          if(openedCards.length === 1){


            card.classList.add("open", "show", "disable");
            openedCards.push(this);
            //compare cards
            compare(currentCard, previousCard);


          } else {
            //no opened cards
            currentCard
      .classList.add("open", "show", "disable");
      openedCards.push(this);
    }

  });

};
//compare the two cards selected against each other
function compare(currentCard, previousCard){
  if(currentCard.innerHTML === previousCard.innerHTML){

    currentCard.classList.add("match");
    previousCard.classList.add("match");

    matchedCards.push(currentCard, previousCard);

    //resets the counter on openedCards to zero to allow multiple matches

    openedCards = [];

    //check for game Over
    winState();

  } else {

    var timeout = setTimeout(function(){
          currentCard.classList.remove("open", "show", "disable");
          previousCard.classList.remove("open", "show", "disable");
          openedCards = [];
        }, 200);

  //add moves
    addMove();
}

}
//is the game over function
function winState(){
    if(matchedCards.length == cardArr.length){
          modal.style.display = "block";
          stopStopwatch();
          showFinalScore();
    }
}
//restart game
function restartGame(){
    $('.restart').click(function() {
      //remove all cards
      cardsContainer.innerHTML = "";
      //reset any [remaining] related variables
      openedCards = [];
      matchedCards = [];
      moves = 0;
      movesContainer.innerHTML = 0;
      starsContainer.innerHTML = `<li><i class="fa fa-star"></i></li>
                                  <li><i class="fa fa-star"></i></li>
                                  <li><i class="fa fa-star"></i></li>`
                                  init();
    });
};

const movesContainer = document.querySelector(".moves");
    let moves = 0;
      movesContainer.innerHTML = moves;
    updateCards();
//add move to counter
function addMove(){
    moves++
    movesContainer.innerHTML = moves;

    //update rating
    rating();
  }
//determine rating
function rating(){
  switch(moves){
    case 15:
      starsContainer.innerHTML = `<li><i class="fa fa-star"></i></li>
                                  <li><i class="fa fa-star"></i></li>`;
    break;
    case 25:
    starsContainer.innerHTML = `<li><i class="fa fa-star"></i></li>`;
    break;
  }

}
//update card contents
function updateCards(){
    //cardArr = shuffle(cardArr);
    var index = 0;
      $.each($(".card i"), function(){
      $(this).attr("class", "fa " + cardArr[index]);
      index++;
    });

}

function firstClick(){
  $(".deck").one("click", function(){
    startStopwatch();
  });
}

// New Timer functionality built from: https://www.cssscript.com/a-minimal-pure-javascript-stopwatch/

function startStopwatch() {
    clearInterval(Interval);
    Interval = setInterval(startTimer, 10);
}

function stopStopwatch() {
    clearInterval(Interval);
}

function resetStopwatch() {
    clearInterval(Interval);
    tens = "00";
    seconds = "00";
    appendTens.innerHTML = tens;
    appendSeconds.innerHTML = seconds;
    started = false;
}

function startTimer () {
    tens++;

    if(tens < 9){
      appendTens.innerHTML = "0" + tens;
    }

    if (tens > 9){
      appendTens.innerHTML = tens;

    }

    if (tens > 99) {
      console.log("seconds");
      seconds++;
      appendSeconds.innerHTML = "0" + seconds;
      tens = 0;
      appendTens.innerHTML = "0" + 0;
    }

    if (seconds > 9){
      appendSeconds.innerHTML = seconds;
    }

  }

  //win screen
function showFinalScore() {
      //use finalMessage variable to string together the victory message
      let finalMessage = "Congratulations! You won!<br/>Time: " + seconds + ":" + tens + "</br> Rating: <br><ul class='stars'> " + starsContainer.innerHTML;

      finalMessage += "<br> Want to <span class='modal-restart'>play again</span>?";
      //function for reset within - page will reload via location.reload()
      document.getElementById("modalText").innerHTML = finalMessage;
        $('.modal-restart').click(function() {
          modal.style.display = "none";
          location.reload();

    });

  }
  // Get the modal
var modal = document.getElementById('myModal');

  // Get the button that opens the modal
var btn = document.getElementById("myBtn");

  // Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    modal.style.display = "none";
}
  // When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}
