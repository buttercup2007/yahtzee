let diceImages = [
    {src: "Dobbelstenen1.jpg", value: 1},
    {src: "Dobbelstenen2.jpg", value: 2},
    {src: "Dobbelstenen3.jpg", value: 3},
    {src: "Dobbelstenen4.jpg", value: 4},
    {src: "Dobbelstenen5.jpg", value: 5},
    {src: "Dobbelstenen6.jpg", value: 6}
];

let diceValues = [null, null, null, null, null];  
let frozenDice = [false, false, false, false, false]; 

function createDiceImage(diceValue, index) {
    const image = new Image();
    const dice = diceImages.find(d => d.value === diceValue);
    image.src = dice.src;
    image.width = 50;
    image.height = 50;
    image.classList.add('dice');  
    image.setAttribute('data-index', index);
    return image;
}

function randomRoll() {
    const diceContainers = [document.getElementById('diceContainer1')];  
    let onesCount = 0;
    let twosScore = 0;
    let threesScore = 0;
    let foursScore = 0;
    let fivesScore = 0;
    let sixsScore = 0;
    let fourOfAKindScore = 0; 
    let threeOfAKindScore = 0;

    diceContainers.forEach(container => {
        container.innerHTML = ''; 

        for (let i = 0; i < 5; i++) {
            if (!frozenDice[i]) { 
                const randomIndex = Math.floor(Math.random() * diceImages.length);
                const diceValue = diceImages[randomIndex].value;
                diceValues[i] = diceValue;

                const diceImage = createDiceImage(diceValue, i);
                container.appendChild(diceImage);
            } else {
                const frozenDiceValue = diceValues[i]; 
                const diceImage = createDiceImage(frozenDiceValue, i);
                container.appendChild(diceImage);
            }
        }
    });

    
    diceValues.forEach(diceValue => {
        switch(diceValue) {
            case 1: onesCount++; break;
            case 2: twosScore += 2; break;
            case 3: threesScore += 3; break;
            case 4: foursScore += 4; break;
            case 5: fivesScore += 5; break;
            case 6: sixsScore += 6; break;
        }
    });

    //four of a kind
    const counts = {};  
    diceValues.forEach(value => {
        counts[value] = (counts[value] || 0) + 1;
    });

    
    for (let value in counts) {
        if (counts[value] >= 4) {
            
            fourOfAKindScore = value * 4; 
            break;  
        }
    }

    //three of a kind
    for (let value in counts) {
        if (counts[value] >= 3) {
            threeOfAKindScore = value * 3;
            break;
        }
    }


    document.getElementById('onesCount').textContent = "enen: " + onesCount;
    document.getElementById('twosCount').textContent = "tweeen: " + twosScore;
    document.getElementById('threesCount').textContent = "drieen: " + threesScore;
    document.getElementById('foursCount').textContent = "vieren: " + foursScore;
    document.getElementById('fivesCount').textContent = "fijven: " + fivesScore;
    document.getElementById('sixsCount').textContent = "zessen: " + sixsScore;
    document.getElementById('fourOfAKind').textContent = "Four of a Kind: " + fourOfAKindScore; 
    document.getElementById('threeOfAKind').textContent = "Three of a kind" + threeOfAKindScore; 


    document.querySelectorAll('.dice').forEach((diceImage) => {
        diceImage.addEventListener('click', () => {
            const index = diceImage.getAttribute('data-index'); 
            frozenDice[index] = !frozenDice[index]; 

            if (frozenDice[index]) {
                diceImage.style.outline = '5px solid red'; 
            } else {
                diceImage.style.outline = '';  
            }
        });
    });
}

document.getElementById('myButton').addEventListener('click', randomRoll);
