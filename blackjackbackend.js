//shuffle deck method
//instead of deleting the first element, shift them to the end
let player = {
    name: "Bob",
    chips: 150
}
let deck = [];
let sum = 0;
let possibleCards = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
createDeck();

function startGame() {
    createDeck();
    let firstCard = deck[0];
    let secondCard = deck[1];
    sum = firstCard + secondCard;
    document.getElementById("cards-el").textContent = "Cards: " + firstCard + " " + secondCard;
    document.getElementById("message-el").textContent = checkBlackjack();
    document.getElementById("sum-el").textContent = "Sum: " + sum;
    deck.shift();
    deck.shift();
    document.getElementById("player-el").textContent = player.name + ": $" + player.chips;
}

function renderGame() {
    if (sum < 21) {
        let newCard = deck[0];
        deck.shift();
        sum += newCard;
        document.getElementById("cards-el").textContent += " " + newCard;
        document.getElementById("message-el").textContent = checkBlackjack();
        document.getElementById("sum-el").textContent = "Sum: " + sum;
    }
    
} 

function getRandomCard() {

    let numRand = Math.floor ( Math.random() * possibleCards.length );
    let newCard = possibleCards[numRand];
    return newCard;
}

function createDeck() {
    emptyArr(deck);
    while (deck.length < 52) {
        let newCard = getRandomCard();
        if (deck.length >= 4) {
            let copies = 0;
            let overFour = true;
            while (overFour) {
                for ( let i = 0; i < deck.length; i++ ) {
                    if ( deck[i] === newCard ) {
                        copies++;
                    }
                }
                if (copies > 3) {
                    removeArr(possibleCards, newCard);
                    newCard = getRandomCard();
                    copies = 0;
                } else {
                    overFour = false;
                }
            }
        }
            
        deck.push(newCard);
    }

    cleanDeck();
    populateArray(possibleCards, 13, 1);


}

function emptyArr (arr) {
    while (arr.length > 0) {
        arr.pop();
    }
}

function removeArr (arr, element) {
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] === element) {
            arr.splice(i, 1);
        }
    }
} 

function cleanDeck() {
    for ( let i = 0; i < deck.length; i++ ) {
        if ( deck[i] === 1 ) {
            deck[i] = 11;
        } else if ( deck[i] >= 11 ) {
            deck[i] = 10;
        }
    }
}

function checkBlackjack() {
    if ( sum === 21 ) {
        return( "You've got Blackjack!" );
    } else if ( sum < 21 ) {
        return ( "Do you want to draw a new card?" );
    } else {
        return ( "You're out of the game!" );
    }
} 

function populateArray(arr, len, start) {
    for ( let i = start; i < start + len; i++ ) {
        arr.push(i);
    }
}