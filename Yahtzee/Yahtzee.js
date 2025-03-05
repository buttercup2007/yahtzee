let diceImages = [
    "Dobbelstenen1.jpg",
    "Dobbelstenen2.jpg",
    "Dobbelstenen3.jpg",
    "Dobbelstenen4.jpg",
    "Dobbelstenen5.jpg",
    "Dobbelstenen6.jpg"
];

const diceContainer1 = document.getElementById('diceContainer1');
const diceContainer2 = document.getElementById('diceContainer2');
function createDiceImage(diceValue) {
    const image = new Image();
    image.src = diceValue;
    image.width = 50;  
    image.height = 50; 
    return image;
}


function randomRoll() {
    const diceContainers = [diceContainer1, diceContainer2];
    
    diceContainers.forEach(container => {
        container.innerHTML = '';  
      
        for (let i = 0; i < 5; i++) {
            const randomIndex = Math.floor(Math.random() * diceImages.length);
            const diceImage = createDiceImage(diceImages[randomIndex]);
            container.appendChild(diceImage);
        }
    });
}

document.getElementById('myButton').addEventListener('click', randomRoll);

function hold(index){
   vasthoud[index] = !vasthoud[index];
}