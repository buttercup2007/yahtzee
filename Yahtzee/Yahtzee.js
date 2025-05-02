let diceImages = [
  { src: "Dobbelstenen1.jpg", value: 1 },
  { src: "Dobbelstenen2.jpg", value: 2 },
  { src: "Dobbelstenen3.jpg", value: 3 },
  { src: "Dobbelstenen4.jpg", value: 4 },
  { src: "Dobbelstenen5.jpg", value: 5 },
  { src: "Dobbelstenen6.jpg", value: 6 },
];

let diceValues = [null, null, null, null, null];
let frozenDice = [false, false, false, false, false];
let rollCount = 0;
let lockedScores = {};
let scoreLockedThisRound = false;

function createDiceImage(diceValue, index) {
  const image = new Image();
  const dice = diceImages.find((d) => d.value === diceValue);
  image.src = dice.src;
  image.width = 50;
  image.height = 50;
  image.classList.add("dice");
  image.setAttribute("data-index", index);

  image.addEventListener("click", () => toggleDiceLock(index));

  return image;
}

function randomRoll() {
  if (rollCount >= 3) {
    alert("You've already rolled 3 times! Now, choose a score.");
    return;
  }

  rollCount++;

  diceValues.forEach((value, index) => {
    if (!frozenDice[index]) {
      const randomIndex = Math.floor(Math.random() * diceImages.length);
      diceValues[index] = diceImages[randomIndex].value;
    }
  });

  const diceContainers = [document.getElementById("diceContainer1")];
  diceContainers.forEach((container) => {
    container.innerHTML = "";
    diceValues.forEach((diceValue, index) => {
      const diceImage = createDiceImage(diceValue, index);
      container.appendChild(diceImage);
    });
  });

  updateScores();
}

function resetRound() {
  if (!lockedScores["threeOfAKind"]) {
    const counts = {};
    diceValues.forEach((value) => {
      counts[value] = (counts[value] || 0) + 1;
    });
    for (let value in counts) {
      if (counts[value] >= 3) {
        lockedScores["threeOfAKind"] = diceValues.reduce((a, b) => a + b, 0);
        break;
      }
    }
  }

  if (!lockedScores["fourOfAKind"]) {
    const counts = {};
    diceValues.forEach((value) => {
      counts[value] = (counts[value] || 0) + 1;
    });
    for (let value in counts) {
      if (counts[value] >= 4) {
        lockedScores["fourOfAKind"] = diceValues.reduce((a, b) => a + b, 0);
        break;
      }
    }
  }

  rollCount = 0;
  diceValues = [null, null, null, null, null];
  frozenDice = [false, false, false, false, false];
  scoreLockedThisRound = false;

  const scoreCells = document.querySelectorAll(".score");
  scoreCells.forEach((scoreCell) => {
    scoreCell.classList.remove("locked");
  });

  updateScores();
}

function updateScores() {
  let onesCount = 0;
  let twosScore = 0;
  let threesScore = 0;
  let foursScore = 0;
  let fivesScore = 0;
  let sixsScore = 0;
  let fourOfAKindScore = 0;
  let threeOfAKindScore = 0;
  let fullHouseScore = 0;
  let kleineStraatScore = 0;
  let groteStraatScore = 0;
  let yahtzeeScore = 0;
  let chanceScore = 0;

  if (!lockedScores["onesCount"]) {
    diceValues.forEach((diceValue) => {
      if (diceValue === 1) onesCount++;
    });
  } else {
    onesCount = lockedScores["onesCount"];
  }

  if (!lockedScores["twosCount"]) {
    diceValues.forEach((diceValue) => {
      if (diceValue === 2) twosScore += 2;
    });
  } else {
    twosScore = lockedScores["twosCount"];
  }

  if (!lockedScores["threesCount"]) {
    diceValues.forEach((diceValue) => {
      if (diceValue === 3) threesScore += 3;
    });
  } else {
    threesScore = lockedScores["threesCount"];
  }

  if (!lockedScores["foursCount"]) {
    diceValues.forEach((diceValue) => {
      if (diceValue === 4) foursScore += 4;
    });
  } else {
    foursScore = lockedScores["foursCount"];
  }

  if (!lockedScores["fivesCount"]) {
    diceValues.forEach((diceValue) => {
      if (diceValue === 5) fivesScore += 5;
    });
  } else {
    fivesScore = lockedScores["fivesCount"];
  }

  if (!lockedScores["sixsCount"]) {
    diceValues.forEach((diceValue) => {
      if (diceValue === 6) sixsScore += 6;
    });
  } else {
    sixsScore = lockedScores["sixsCount"];
  }

  if (!lockedScores["fourOfAKind"]) {
    const counts = {};
    diceValues.forEach((value) => {
      counts[value] = (counts[value] || 0) + 1;
    });
    for (let value in counts) {
      if (counts[value] >= 4) {
        fourOfAKindScore = diceValues.reduce((a, b) => a + b, 0);
        break;
      }
    }
  } else {
    fourOfAKindScore = lockedScores["fourOfAKind"];
  }

  if (!lockedScores["threeOfAKind"]) {
    const counts = {};
    diceValues.forEach((value) => {
      counts[value] = (counts[value] || 0) + 1;
    });
    for (let value in counts) {
      if (counts[value] >= 3) {
        threeOfAKindScore = diceValues.reduce((a, b) => a + b, 0);
        break;
      }
    }
  } else {
    threeOfAKindScore = lockedScores["threeOfAKind"];
  }

  if (!lockedScores["fullHouse"]) {
    const counts = {};
    diceValues.forEach((value) => {
      counts[value] = (counts[value] || 0) + 1;
    });
    const values = Object.values(counts);
    if (values.includes(3) && values.includes(2)) {
      fullHouseScore = 25;
    }
  } else {
    fullHouseScore = lockedScores["fullHouse"];
  }

  if (!lockedScores["kleineStaat"]) {
    const sortedValues = [...new Set(diceValues)].sort((a, b) => a - b);
    for (let i = 0; i <= sortedValues.length - 4; i++) {
      const sequence = sortedValues.slice(i, i + 4);
      if (sequence[3] - sequence[0] === 3) {
        kleineStraatScore = 30;
        break;
      }
    }
  } else {
    kleineStraatScore = lockedScores["kleineStaat"];
  }

  if (!lockedScores["groteStaat"]) {
    const largeStraatSequences = [
      [1, 2, 3, 4, 5],
      [2, 3, 4, 5, 6],
    ];
    largeStraatSequences.forEach((sequence) => {
      if (sequence.every((val) => diceValues.includes(val))) {
        groteStraatScore = 40;
      }
    });
  } else {
    groteStraatScore = lockedScores["groteStaat"];
  }

  if ("yahtzee" in lockedScores) {
    yahtzeeScore = lockedScores["yahtzee"];
  } else {
    const uniqueValues = new Set(diceValues);
    if (uniqueValues.size === 1 && diceValues[0] !== null) {
      yahtzeeScore = 50;
    } else {
      yahtzeeScore = 0;
    }
  }

  if (!lockedScores["chance"]) {
    chanceScore = diceValues.reduce((sum, currentValue) => sum + currentValue, 0);
  } else {
    chanceScore = lockedScores["chance"];
  }

  document.getElementById("onesCount").textContent = "Ones: " + onesCount;
  document.getElementById("twosCount").textContent = "Twos: " + twosScore;
  document.getElementById("threesCount").textContent = "Threes: " + threesScore;
  document.getElementById("foursCount").textContent = "Fours: " + foursScore;
  document.getElementById("fivesCount").textContent = "Fives: " + fivesScore;
  document.getElementById("sixsCount").textContent = "Sixes: " + sixsScore;
  document.getElementById("fourOfAKind").textContent = "Four of a Kind: " + fourOfAKindScore;
  document.getElementById("threeOfAKind").textContent = "Three of a Kind: " + threeOfAKindScore;
  document.getElementById("fullHouse").textContent = "Full House: " + fullHouseScore;
  document.getElementById("kleineStaat").textContent = "Kleine Straat: " + kleineStraatScore;
  document.getElementById("groteStaat").textContent = "Grote Straat: " + groteStraatScore;
  document.getElementById("yahtzee").textContent = "Yahtzee: " + yahtzeeScore;
  document.getElementById("chance").textContent = "Chance: " + chanceScore;
}

function Locked(categoryId) {
  if (scoreLockedThisRound) {
    alert("You can only lock one score per round.");
    return;
  }

  if (lockedScores[categoryId] !== undefined) {
    alert("This score has already been locked.");
    return;
  }

  const categoryElement = document.getElementById(categoryId);
  const score = parseInt(categoryElement.textContent.split(": ")[1]);

  lockedScores[categoryId] = score;
  scoreLockedThisRound = true;
  categoryElement.classList.add("locked-score");

  let total = 0;
  for (let key in lockedScores) {
    total += lockedScores[key];
  }
  document.getElementById("totalScore").textContent = "Total Score: " + total;

  const totalCategories = 13;
  if (Object.keys(lockedScores).length === totalCategories) {
    setTimeout(() => {
      alert("\uD83C\uDF89 You've finished playing Yahtzee!\nYour total score is: " + total);
    }, 100);
  }
}

function toggleDiceLock(index) {
  frozenDice[index] = !frozenDice[index];
  const diceElement = document.querySelectorAll(".dice")[index];

  if (frozenDice[index]) {
    diceElement.classList.add("locked");
  } else {
    diceElement.classList.remove("locked");
  }
}

document.querySelectorAll(".score").forEach((scoreElement) => {
  scoreElement.addEventListener("click", (event) => {
    const categoryId = event.target.id;
    Locked(categoryId);
  });
});

document.getElementById("myButton").addEventListener("click", randomRoll);

document.getElementById("nextRoundButton").addEventListener("click", () => {
  if (!scoreLockedThisRound) {
    alert("You must lock a score before starting the next round.");
    return;
  }

  resetRound();

  const diceContainer = document.getElementById("diceContainer1");
  diceContainer.innerHTML = "";
});

document.getElementById("resetGameButton").addEventListener("click", () => {
  resetRound();
  rollCount = 0;
  lockedScores = {};
  scoreLockedThisRound = false;
  diceValues = [null, null, null, null, null];
  frozenDice = [false, false, false, false, false];

  document.querySelectorAll(".score").forEach((cell) => {
    cell.textContent = cell.id.replace(/([A-Z])/g, ' $1').trim() + ": 0";
    cell.classList.remove("locked-score");
  });

  document.getElementById("totalScore").textContent = "Total Score: 0";

  const diceContainers = [document.getElementById("diceContainer1")];
  diceContainers.forEach((container) => (container.innerHTML = ""));
});
