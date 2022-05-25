const cards = document.querySelectorAll(".card");

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;

function flipCard(){

    if (lockBoard) return;
    if (this === firstCard) return;

    this.classList.add("flip");

    // if(!hasFlippedCard){time()}
    if(!hasFlippedCard){
        //first click
        hasFlippedCard = true;
        time();
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
    firstCard.classList.add("shake")
    secondCard.classList.add("shake")
    firstCard.classList.remove("flip");
    secondCard.classList.remove("flip");

    resetBoard();

    }, 1000);   
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
})(); //sera a primeira funcao a realizar de


cards.forEach(card => card.addEventListener("click", flipCard));


// for(let i = 0; i < cards.length; i++){
//     cards[i].addEventListener("click", ()=>{
//         if(!firstCard){time()}
//         firstCard = true;
//         if(cards[i].state == 'unclicked'){
//             cards[i].style.transform = 'rotateY(180deg)'
//             cards[i].state ='clicked'
//             counter++
//             cardPair.push(cards[i])
//             check()
//         }
//     })
// }

function time{
    let secs = 0;
    let mins = 0;
    let SS;
    let MM;
    setInterval(()=>{
        secs++
        if(secs===60){secs=0; mins++}

        secs<10?SS="0${secs}':SS='${secs}"
        secs<10?MM='0${mins}':SS='${mins}'

        document.querySelector('#time').innerHTML = '${MM}:${SS}'
    }, 1000);
}


// function time()
