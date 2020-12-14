for(let i = 1; i <= 16; i++){
    let ind = i % 8 === 0 ? 8 : i % 8;
    let card = document.createElement('div');
    card.className = "card";
    card.innerHTML = `<img class="front" src="images/card${ind}.png" alt="Card${ind}"> <img class="back" src="images/cardBack.png" alt="CardBack">`;
    document.querySelector(".field").prepend(card);
}
const cards = document.querySelectorAll('.card');

(function setOrder(){
    for(let card of cards){
        card.style.order = Math.round(Math.random() * 16);
    }
})();

let firstCard, secondCard;
let firstFlipped = false;
let closedCards = cards.length;
let isCardOpen = false;
let stepCount = 0;

function click(){
    if (!isCardOpen){
        this.classList.add('click');
        if (!firstFlipped) {
            firstFlipped = true;
            firstCard = this;
        }
        else if (this !== firstCard){
            secondCard = this;
            firstFlipped = false;
            checkPair();
        }
    }
}

for(let card of cards){
    card.addEventListener('click', click);
}

function checkPair() {
    stepCount += 1;
    if (firstCard.querySelector('.front').alt === secondCard.querySelector('.front').alt) {
        openCards();
        checkWin();
    }
    else {
        closeCards();
    }
}

function openCards() {
    firstCard.removeEventListener('click', click);
    secondCard.removeEventListener('click', click);
    closedCards -= 2;
}

function closeCards() {
    isCardOpen = true;
    setTimeout(() => {
        firstCard.classList.remove('click');
        secondCard.classList.remove('click');
        isCardOpen = false;
    }, 1000);
}

function checkWin() {
    if (closedCards === 0) {
        let steps = document.createElement('h3');
        steps.textContent = `You found them all in ${stepCount} tries`;
        document.querySelector('.modal_window').append(steps);
        setTimeout(() => {
            document.querySelector('.modal').style.visibility = 'visible';
        }, 1000);
    }
}