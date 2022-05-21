const cards = document.querySelectorAll(".card");

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;

function flipCard(){

    if (lockBoard) return;
    if (this === firstCard) return;

    this.classList.add("flip");

    if(!hasFlippedCard){
        //first click
        hasFlippedCard = true;
        firstCard = this;

        return;
    } 

    //second click

    secondCard = this;

    checkForMatch();
    
}

function checkForMatch(){
    if(firstCard.dataset.framework === secondCard.dataset.framework) {
        disableCards();
    } 
    else {
        unflipCards();
    }
}

function disableCards(){
    // it's a match
    firstCard.removeEventListener("click", flipCard)
    secondCard.removeEventListener("click", flipCard)

    resetBoard();

}

function unflipCards(){

    lockBoard = true;

    //not a match
    setTimeout(() =>{
    firstCard.classList.remove("flip");
    secondCard.classList.remove("flip");

    resetBoard();

    }, 1500);   
}

function resetBoard(){
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null]
}

(function shuffle(){

    cards.forEach(card =>{

        let randomPos = Math.floor(Math.random() * 12);
        card.style.order = randomPos;
    })
})(); // extra parenteses Immediately Invoked Function Expression


cards.forEach(card => card.addEventListener("click", flipCard));