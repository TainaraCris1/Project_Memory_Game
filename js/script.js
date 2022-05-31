const cards = document.querySelectorAll(".card");

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;


//flipCard 
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


//check match
function checkForMatch(){
    if(firstCard.dataset.framework === secondCard.dataset.framework) {
        disableCards();
    } 
    else {
        unflipCards();
    }
}


//turn card to look 
function disableCards(){
    // it's a match
    firstCard.removeEventListener("click", flipCard)
    secondCard.removeEventListener("click", flipCard)

    resetBoard();

}


//no match
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

//sera a primeira funcao a realizar de
(function shuffle(){

    cards.forEach(card =>{

        let randomPos = Math.floor(Math.random() * 12);
        card.style.order = randomPos;
    })
})(); 


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



//TIMER
var timeleft, time;
timeleft = time = 30;
$("#time").html(timeleft);
$("#timer_container").fadeTo("slow",1);
$("#time").fadeTo("slow",1);
var i, j, rotation, width;  

for(i=0; i<timeleft;i++){
  document.getElementById("timer_container").innerHTML += "<div class='tictic'></div>";
} 
var x = document.getElementById("timer_container");
var y = x.getElementsByTagName("div");
width=document.getElementById("timer_container").offsetWidth;
for(i=0; i<timeleft;i++){
  rotation=(360/timeleft)*(i);
  console.log(rotation+"\n");
  console.log(width+"\n");
  y[i].style.cssText = "transform:rotate("+ rotation +"deg) translate(0px, -"+width/2+"px)";
}
var i = 0;
remainingtime = setInterval(function(){
  $("#time").html(timeleft);
  y[i].style.backgroundColor = "#ffffff";
  if(timeleft <= 5){
    y[i].style.backgroundColor = "red";
  }
  timeleft -= 1;
  i+=1;

  if(timeleft <= 0 && i>=time){
    clearInterval(remainingtime);
    $("div").remove(".tictic");
    $("#time").html("Time out!");
  }
}, 1000);