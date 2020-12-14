const lights = document.querySelectorAll('.bulb');
const count = 14;

let id = 0;
for(let light of lights){
    light.id = id;
    id += 1;
}

for(let i = 0; i < count; i += 2){
    lights[i].style.transform = "skewX(10deg)";
    lights[i + 1].style.transform = "skewX(-10deg)";
    }

function click(){
    if (!isBurn){
        this.classList.add('click');
        if (sequence[step] !== Number(this.id)){
            isBurn = true;
            step = 0;
            attempts++;
            setTimeout(() => {
                for(let light of lights){
                    light.classList.remove('click');
                }
                isBurn = false;
            }, 800)
        }
        else{
            step += 1;
            if (step === count) win();
        }
    }
}

for(let light of lights){
    light.addEventListener("click", click);
}

const sequence = createSequence();
let step = 0;
let attempts = 0;
let isBurn = false;

function createSequence() {
    let numbers = [];
    for (let i = 0; i < count; i++){
        numbers[i] = i;
    }
    numbers.sort(() => Math.random() -0.5)
    return numbers;
}

function win() {
    setTimeout(() => {
        document.querySelector('.modal').style.visibility = 'visible';
    }, 1000);
}