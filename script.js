class memoryGame {
  constructor(totalTime, cards) {
    this.cardsArray = cards;
    this.totalTime = totalTime;
    this.timeRemaining = totalTime;
    this.timer = document.getElementById("time-remaining");
    this.ticker = document.getElementById("flips");
  }

  startGame() {
    this.totalClicks = 0;
    this.timeRemaining = this.totalTime;
    this.cardToCheck = null;
    this.matchedCards = [];
    this.busy = true;
    setTimeout(() => {
      this.shuffleCards(this.cardsArray);
      this.countdown = this.startCountdown();
      this.busy = false;
    }, 500);
    this.hideCards();
    this.timer.innerText = this.timeRemaining;
    this.ticker.innerText = this.totalClicks;
  }

  startCountdown() {
    return setInterval(() => {
      this.timeRemaining--;
      this.timer.innerText = this.timeRemaining;
      if (this.timeRemaining === 0) this.gameOver();
    }, 1000);
  }

  gameOver() {
    clearInterval(this.countdown);
    document.getElementById("game-over-text").classList.add("visible");
  }
  victory() {
    clearInterval(this.countdown);
    document.getElementById("victory-text").classList.add("visible");
  }

  hideCards() {
    this.cardsArray.forEach((card) => {
      card.classList.remove("flip");
      card.classList.remove("matched");
    });
  }

  flipCard(card) {
    if (!this.canFlipCard(card)) {
      return;
    }
    this.totalClicks++;
    this.ticker.innerText = this.totalClicks;
    card.classList.add("flip");

    if (this.cardToCheck) {
      this.checkForCardMatch(card);
    } else {
      this.cardToCheck = card;
    }
  }

  checkForCardMatch(card) {
    if (this.getCardType(card) === this.getCardType(this.cardToCheck)) {
      this.cardMatch(card, this.cardToCheck);
    } else {
      this.cardMismatch(card, this.cardToCheck);
    }
    this.cardToCheck = null;
  }

  cardMatch(card1, card2) {
    this.matchedCards.push(card1);
    this.matchedCards.push(card2);
    card1.classList.add("matched");
    card2.classList.add("matched");

    if (this.matchedCards.length === this.cardsArray.length) this.victory();
  }

  cardMismatch(card1, card2) {
    this.busy = true;
    setTimeout(() => {
      card1.classList.add("shake");
      card1.classList.remove("flip");
      card2.classList.add("shake");
      card2.classList.remove("flip");
      this.busy = false;
    }, 1000);
  }

  shuffleCards(cardsArray) {
    // Fisher-Yates Shuffle Algorithm.
    for (let i = cardsArray.length - 1; i > 0; i--) {
      let randIndex = Math.floor(Math.random() * (i + 1));
      cardsArray[randIndex].style.order = i;
      cardsArray[i].style.order = randIndex;
    }
  }

  getCardType(card) {
    return card.getElementsByClassName("card-value")[0].src;
  }

  canFlipCard(card) {
    return (
      !this.busy &&
      !this.matchedCards.includes(card) &&
      card !== this.cardToCheck
    );
  }
}

if (document.readyState == "loading") {
  document.addEventListener("DOMContentLoaded", ready);
} else {
  ready();
}

function ready() {
  let overlays = Array.from(document.getElementsByClassName("overlay-text"));
  let cards = Array.from(document.getElementsByClassName("card"));
  let game = new memoryGame(60, cards);

  overlays.forEach((overlay) => {
    overlay.addEventListener("click", () => {
      overlay.classList.remove("visible");
      game.startGame();
    });
  });

  cards.forEach((card) => {
    card.addEventListener("click", () => {
      game.flipCard(card);
    });
  });
}

function restart() {
  let restart = document.getElementsByClassName("restart");
  restart.addEventListener("click", ready());
}
