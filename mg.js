//Create variables/references to various dom elements
const playBtn = document.querySelector("#play-btn");
const introModal = document.querySelector("#intro-modal");
const difficultyModal = document.querySelector("#difficulty-modal");
const mainContainer = document.querySelector("#main");
const modalContainer = document.querySelector(".modal-container");
const cardContainer = document.querySelector("#card-container");
const easyBtn = document.querySelector("#easy-diff");
const mediumBtn = document.querySelector("#medium-diff");
const hardBtn = document.querySelector("#hard-diff");
const card = document.querySelectorAll(".card");
const tries = document.querySelector("#tries");
const congratsModal = document.querySelector(".congratulations-modal");
const congratsMsg = document.querySelector("#congratulations-message");
const closeModal = document.querySelector("#close-modal");

const difficultyBtns = document.querySelectorAll(".difficulty-btn");

let matchedCard = document.getElementsByClassName("match");

//Variables that are needed throughout the file
let difficultyMode = "";

let tryCounter = 0;

let cards = [...card];
let openedCards = [];

//Function that sets up the game board and removes cards based on the difficulty
function setupBoard (difficulty) {
    modalContainer.style.display = "none";
    mainContainer.style.display = "flex";

    if(difficulty === "easy") {
        startGame();
        difficultyMode = "easy";
        for (var i = 9; i < 17; i++) {
            document.querySelector("#card-container").removeChild(document.querySelector("#card"+[i]));
        }
    }else if(difficulty === "medium") {
        startGame();
        difficultyMode = "medium";
        for (var i = 13; i < 17; i++) {
            document.querySelector("#card-container").removeChild(document.querySelector("#card"+[i]));
        }
    }else if(difficulty === "hard") {
        startGame();
        difficultyMode = "hard";
    } 
}

//Event listeners for various buttons
playBtn.addEventListener("click", function () {
    introModal.style.display = "none";
    difficultyModal.style.display = "flex";
})

for (var i = 0; i < difficultyBtns.length; i++) {
    difficultyBtns[i].addEventListener("click", function () {
        tryCounter = 0;
        modalContainer.style.display = "flex";
        congratsModal.style.display = "none";
        mainContainer.style.display = "none";
    })
}

easyBtn.addEventListener("click", function() {
    setupBoard("easy");
});

mediumBtn.addEventListener("click", function() {
    setupBoard("medium");
})

hardBtn.addEventListener("click", function () {
    setupBoard("hard");
})

closeModal.addEventListener("click", function () {
    congratsModal.style.display = "none";
})

//Loop that adds three different event listeners to each card in the game
for (var i = 0; i < cards.length; i++) {
    cards[i].addEventListener("click", showCard);
    cards[i].addEventListener("click", open);
    cards[i].addEventListener("click", checkEndgame);
}

//Function to "flip"/show the card clicked
function showCard () {
    this.classList.toggle("show");
    this.classList.toggle("disabled");
}

//Function to shuffle the cards so the cards get randomized
function shuffle(arr) {
    let currentIndex = arr.length, tempValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        tempValue = arr[currentIndex];
        arr[currentIndex] = arr[randomIndex];
        arr[randomIndex] = tempValue;
    }
    return arr;
}


//Function that starts the game, uses the shuffle function to shuffle the cards,
//then appends those to the card container element. The function also "resets"
//the cards and the try counter
function startGame() {
    let shuffledCards = shuffle(cards);
    for (var i = 0; i < shuffledCards.length; i++) {
        [].forEach.call(shuffledCards, function (item) {
            cardContainer.appendChild(item);
        })
        shuffledCards[i].classList.remove("show", "match", "disabled");
        shuffledCards[i].classList.add("unflipped");
    }

    tryCounter = 0;
    tries.textContent = 0;
}

//Function that runs when cards are clicked and checks if it matches or if it doesn't
function open () {
    openedCards.push(this);
    let len = openedCards.length;

    if(len === 2) {
        tryCount();
        if(openedCards[0].type === openedCards[1].type) {
            matched();
        } else {
            unmatched();
        }
    }
}

//Function that runs when cards are matched. It 
//adds the match class to matched cards and
//removes the standard card classes
function matched() {
    openedCards[0].classList.add("match");
    openedCards[1].classList.add("match");
    openedCards[0].classList.remove("show");
    openedCards[1].classList.remove("show");
    openedCards[0].classList.remove("unflipped");
    openedCards[1].classList.remove("unflipped");
    openedCards = [];
}

//Function that runs when cards don't match. It adds the 
//the unmatchec class to the cards, and removes it after
//a short delay of 1.1 sec
function unmatched(){
    openedCards[0].classList.add("unmatched");
    openedCards[1].classList.add("unmatched");
    disable();
    setTimeout(function(){
        openedCards[0].classList.remove("show", "unmatched");
        openedCards[1].classList.remove("show", "unmatched");
        enable();
        openedCards = [];
    },1100);
}

//Function to keep track of cards clicked/tries
function tryCount () {
    tryCounter++;
    tries.textContent = tryCounter;
}

//Function that disables cards
function disable(){
    Array.prototype.filter.call(cards, function(card){
        card.classList.add('disabled');
    });
}

//Function that enables cards/removes the disabled class from cards
function enable(){
    Array.prototype.filter.call(cards, function(card){
        card.classList.remove('disabled');
        for(var i = 0; i < matchedCard.length; i++){
            matchedCard[i].classList.add("disabled");
        }
    });
}

//Function to check if the current game has finished and
//if it has, it displays a congratulation modal and gives the
//user a short summary and the option to start a new game/select different difficulty
function checkEndgame () {
    if (difficultyMode === "easy" && matchedCard.length === 8) {
        congratsModal.style.display = "flex";
        congratsMsg.textContent = "Congratulations! You completed the Memory Game on Easy difficulty in " + tryCounter + " tries!"
    }else if (difficultyMode === "medium" && matchedCard.length === 12) {
        congratsModal.style.display = "flex";
        congratsMsg.textContent = "Congratulations! You completed the Memory Game on Medium difficulty in " + tryCounter + " tries!"
    }
    else if (difficultyMode === "hard" && matchedCard.length === 16) {
        congratsModal.style.display = "flex";
        congratsMsg.textContent = "Congratulations! You completed the Memory Game on Hard difficulty in " + tryCounter + " tries!"
    }
}