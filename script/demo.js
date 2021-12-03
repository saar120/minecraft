// creating variables for continue use

const axe = document.querySelector(".axe");
const picaxe = document.querySelector(".picaxe");
const shovel = document.querySelector(".shovel");

const game = document.querySelector(".game-grid");

const grassInventory = document.querySelector(".inventory .grass");
const rockInventory = document.querySelector(".inventory .rock");
const soilInventory = document.querySelector(".inventory .soil");
const leavesInventory = document.querySelector(".inventory .leaves");
const woodInventory = document.querySelector(".inventory .wood");

const timer = document.querySelector(".timer");

const inventory = {};
const objOfBoxes = {};

let material;
let currentTool;
let currentMaterial;

const materialObj = {
  axe: ["leaves", "wood"],
  picaxe: ["rock"],
  shovel: ["soil", "grass"],
};

function landScapeMaker(
  material,
  rowStart = 1,
  rowEnd = 20,
  columnStart = 1,
  columnEnd = 25
) {
  for (let row = rowStart; row <= rowEnd; row++) {
    for (let column = columnStart; column <= columnEnd; column++) {
      objOfBoxes[`${row}.${column}`].classList.add(material);
    }
  }
}

// basic world builder with set positions
function landMaker(length = 25) {
  // grid length
  landScapeMaker("grass", 14, 14, 1, length);
  landScapeMaker("soil", 15, 20, 1, length);
  landScapeMaker("cloud", 5, 5, 9, 13);
  landScapeMaker("cloud", 4, 4, 10, 13);
  landScapeMaker("cloud", 3, 3, 10, 11);
}

// x for future random location generator
function treeMaker(x = 20) {
  landScapeMaker("wood", 10, 13, x, x);
  landScapeMaker("leaves", 7, 9, x - 1, x + 1);
}

function rockMaker(x = 2, double = false) {
  double
    ? landScapeMaker("rock", 12, 13, x, x)
    : landScapeMaker("rock", 13, 13, x, x);
}

function bushMaker(x = 5) {
  landScapeMaker("leaves", 13, 13, x, x + 2);
  landScapeMaker("leaves", 12, 12, x + 1, x + 1);
}

// permanent set
function basicWorldMaker() {
  landMaker();
  treeMaker();
  rockMaker(13, true);
  rockMaker();
  bushMaker();
}

// randomize world maker. works with the modify option of the game and pull from input the amount of elements.
let nonVacantLocations; // array of x grid locations

function worldMaker() {
  //   trees <= 1 || rocks <= 1 || bushes <= 1 // if only one element for each than smaller world. smaller array.
  //     ? (nonVacantLocations = [...Array(24).keys()])
  //     : (nonVacantLocations = [...Array(49).keys()]); // creating list of location on x grid (columns)
  //   nonVacantLocations.shift(); // deletes 0
  //   nonVacantLocations.shift(); // deletes 1 // to prevent element sitting to close to the starts

  //adjust grid to containe bigger world
  //   game.style.gridTemplateColumns = "repeat(50, 1fr)";
  //   game.style.width = "1650px";
  //   game.style.margin = 0;

  boxGameCreator(1, 20, 25, 50);
  landScapeMaker("grass", 14, 14, 1, 50);
  landScapeMaker("soil", 15, 20, 1, 50);

  //   for (let i = 1; i <= trees; i++) {
  //     // creating elements for the world (for amount of user choice)
  //     let location = Math.floor(Math.random() * nonVacantLocations.length); // generate random index of not existed locations
  //     if (nonVacantLocations[location]) {
  //       // checks if location is valid
  //       treeMaker(nonVacantLocations[location]); // creates element
  //       nonVacantLocations[location] = false; // makes element false (not habitable)
  //     } else {
  //       i--; // make loop iterate again
  //     }
  //   }
  //   for (let i = 1; i <= rocks; i++) {
  //     let location = Math.floor(Math.random() * nonVacantLocations.length);
  //     if (nonVacantLocations[location]) {
  //       rockMaker(nonVacantLocations[location]);
  //       nonVacantLocations[location] = false;
  //     } else {
  //       i--;
  //     }
  //   }
  //   for (let i = 1; i <= bushes; i++) {
  //     let location = Math.floor(Math.random() * nonVacantLocations.length);
  //     if (
  //       nonVacantLocations[location] &&
  //       nonVacantLocations[location + 1] &&
  //       nonVacantLocations[location + 2]
  //     ) {
  //       bushMaker(nonVacantLocations[location]);
  //       nonVacantLocations[location + 2] = false;
  //       nonVacantLocations[location + 1] = false;
  //       nonVacantLocations[location] = false;
  //     } else {
  //       i--;
  //     }
  //   }
}

// creating divs. giving them a specific location(row and column), and creating obj of boxes. for future play and positions options.
let indexOfBox = 0;

function boxGameCreator(
  rowStart = 1,
  rowEnd = 20,
  columnStart = 1,
  columnEnd = 25
) {
  for (let row = rowStart; row <= rowEnd; row++) {
    for (let column = columnStart; column <= columnEnd; column++) {
      let box = document.createElement("div");
      box.classList.add("box");
      game.appendChild(box);
      box.style.gridRow = row;
      box.style.gridColumn = column;
      objOfBoxes[`${row}.${column}`] = box;
      indexOfBox++;
    }
  }
}

boxGameCreator(); // creating divs
basicWorldMaker();

// cleaner for reset option - removes second class for each box because thats the background material
function worldCleaner(columnEnd = 25) {
  for (let row = 1; row <= 13; row++) {
    for (let column = 1; column <= columnEnd; column++) {
      objOfBoxes[`${row}.${column}`].classList[1] && // confirming there is a class to clean ([0] is .box)
        objOfBoxes[`${row}.${column}`].classList.remove(
          `${objOfBoxes[`${row}.${column}`].classList[1]}`
        );
    }
  }
  landMaker();
}

function markAsWorng(event) {
  // marks box as wrong with red border for 50ms
  event.target.style.border = "1px solid red";
  setTimeout(() => {
    event.target.style.border = "none";
  }, 400);
}

// collect material functions (game function of harvesting with a tool)
function collectMaterial(event) {
  material = event.target.classList[1];
  // limit mainly the shovel to collect only from material with space near it or any access.
  let [row, column] = [
    event.target.style.gridRow.slice(0, -6) - 1,
    parseInt(event.target.style.gridColumn.slice(0, -7)),
  ]; // location of one box above
  if (
    objOfBoxes[`${row}.${column}`].classList.length == 1 ||
    objOfBoxes[`${row + 1}.${column + 1}`].classList.length == 1 ||
    objOfBoxes[`${row + 1}.${column - 1}`].classList.length == 1 ||
    objOfBoxes[`${row + 2}.${column}`].classList.length == 1
  ) {
    // check if there is material in the one box above // prevent coolecting soil from under ground
    if (materialObj[tool].includes(material)) {
      inventory[material]
        ? (inventory[material] += 1)
        : (inventory[material] = 1); //// updated inventory obj amounts
      event.target.classList.remove(material);
      updateInventory(); // updated the written amount
    } else markAsWorng(event);
  } else markAsWorng(event);
}

// inventory update the html element to show amount
function updateInventory() {
  for (let [material, amount] of Object.entries(inventory)) {
    switch (material) {
      case "grass":
        grassInventory.innerHTML = `<h4>${amount}</h4>`;
        break;
      case "rock":
        rockInventory.innerHTML = `<h4>${amount}</h4>`;
        break;
      case "soil":
        soilInventory.innerHTML = `<h4>${amount}</h4>`;
        break;
      case "leaves":
        leavesInventory.innerHTML = `<h4>${amount}</h4>`;
        break;
      case "wood":
        woodInventory.innerHTML = `<h4>${amount}</h4>`;
        break;
    }
  }
}

// functions to put material on game grid (the player bulding)
function putMaterial(event) {
  if (inventory[material]) {
    if (event.target.classList.length == 1) {
      // check there isnt a material class (not taken)
      event.target.classList.add(material);
      inventory[material] -= 1;
      updateInventory();
    }
  }
}

// short cut to remove listeners
function removeOtherEventListeners() {
  game.removeEventListener("click", collectMaterial);
  game.removeEventListener("click", putMaterial);
}

// background resetter. (to delete illusions of pickes (or clicked) on other elements)
function pickedToolBackground() {
  axe.classList.contains("red") && axe.classList.remove("red");
  axe.classList.contains("blue") && axe.classList.remove("blue");
  picaxe.classList.contains("red") && picaxe.classList.remove("red");
  picaxe.classList.contains("blue") && picaxe.classList.remove("blue");
  shovel.classList.contains("red") && shovel.classList.remove("red");
  shovel.classList.contains("blue") && shovel.classList.remove("blue");
  grassInventory.style.opacity = 0.75;
  woodInventory.style.opacity = 0.75;
  soilInventory.style.opacity = 0.75;
  leavesInventory.style.opacity = 0.75;
  rockInventory.style.opacity = 0.75;
}

// change visibility of html elements
function toggleElementsHidder(el, hide = true) {
  hide ? (el.style.visibility = "hidden") : (el.style.visibility = "visible");
}

function inventoryReset() {
  for (let material of Object.keys(inventory)) {
    // calibrate inventory
    inventory[material] = 0;
  }
  updateInventory();
}

function materialInventoryLoad() {
  for (let material of ["grass", "soil", "rock", "leaves", "wood"]) {
    inventory[material]
      ? (inventory[material] += 1)
      : (inventory[material] = 1); // adding to inventory
    updateInventory(); // updated nunmber showen to player
  }
}

// GAME PLAY -!!-

// making the base world
// creating basic world with one instance of each element

// event listners for tool choise -> collects only the matching material
axe.addEventListener("click", (e) => {
  tool = "axe";
  removeOtherEventListeners();
  pickedToolBackground();
  e.currentTarget.classList.add("blue");
  game.addEventListener("click", collectMaterial);
});

picaxe.addEventListener("click", (e) => {
  tool = "picaxe";
  removeOtherEventListeners();
  pickedToolBackground();
  e.currentTarget.classList.add("blue");
  game.addEventListener("click", collectMaterial);
});

shovel.addEventListener("click", (e) => {
  tool = "shovel";
  removeOtherEventListeners();
  pickedToolBackground();
  e.currentTarget.classList.add("blue");
  game.addEventListener("click", collectMaterial);
});

// event listners for putting material
grassInventory.addEventListener("click", (event) => {
  removeOtherEventListeners(); // clears other event listners
  material = "grass"; // updates the currrent material used
  pickedToolBackground(); //clears clicked effect on others
  grassInventory.style.opacity = 1; // identicate the item as clicked
  game.addEventListener("click", putMaterial); // activate material collection
});

woodInventory.addEventListener("click", (event) => {
  removeOtherEventListeners();
  material = "wood";
  pickedToolBackground();
  woodInventory.style.opacity = 1;
  game.addEventListener("click", putMaterial);
});

rockInventory.addEventListener("click", (event) => {
  removeOtherEventListeners();
  material = "rock";
  pickedToolBackground();
  rockInventory.style.opacity = 1;
  game.addEventListener("click", putMaterial);
});

soilInventory.addEventListener("click", (event) => {
  removeOtherEventListeners();
  material = "soil";
  pickedToolBackground();
  soilInventory.style.opacity = 1;
  game.addEventListener("click", putMaterial);
});

leavesInventory.addEventListener("click", (event) => {
  removeOtherEventListeners();
  material = "leaves";
  pickedToolBackground();
  leavesInventory.style.opacity = 1;
  game.addEventListener("click", putMaterial);
});

// // BUTTONS -
// // reset button event listener
// resetButton.addEventListener('click', () => {
//     inventoryReset() // calibrate inventory
//     updateInventory(); // update amount showen to player.
//     worldCleaner();
//     basicWorldMaker();
//     timerCounter = 0; // resets timer of new resources
// })

// // go back to entrence screen -- to menu
// openMainScreen.addEventListener('click', () => {
//     startGameButton.innerHTML = 'return to game'
//     toggleElementsHidder(entrenceScreen, false);
// })

// // entrence screen
// let firstStart = 0; // to identify first start
// startGameButton.addEventListener('click', () => {
//     if (!firstStart) { // action for starting game (and not return to game)
//         timerCounter = 0; // resets timer of new resources
//         inventoryReset() // prevents collectin material when on entrence screen (resets only if first start)
//         firstStart = 1;
//     }

//     entrenceScreen.style.opacity = 0;
//     entrenceScreen.style.transition = 'all 1.5s'; // animation of fade out

//     toggleElementsHidder(entrenceScreen);
//     setTimeout(() => {
//         entrenceScreen.style.opacity = 1;
//     }, 2000) // set back opacity to reopen window

//     toggleElementsHidder(modifyScreen);
//     toggleElementsHidder(instructionScreen);

// })

// instructionsButton.addEventListener('click', () => {
//     toggleElementsHidder(instructionScreen, false);
// })

// modifyWorldButton.addEventListener('click', () => {
//     toggleElementsHidder(modifyScreen, false);
// })
// instructionsButton.addEventListener('mouseover', () => {
//     toggleElementsHidder(instructionScreen, false);
// })

// modifyWorldButton.addEventListener('mouseover', () => {
//     toggleElementsHidder(modifyScreen, false);
// })

// //leaves window open until mouse out
// modifyScreen.addEventListener('mouseover', () => {
//     toggleElementsHidder(modifyScreen, false);
// })
// instructionScreen.addEventListener('mouseover', () => {
//     toggleElementsHidder(instructionScreen, false);
// })
// instructionScreen.addEventListener('click', () => { // adds option for closing screen (makes it more comftarble for phone users)
//     toggleElementsHidder(instructionScreen, false);
// })
// modifyScreen.addEventListener('mouseout', () => {
//     toggleElementsHidder(modifyScreen);
// })
// instructionScreen.addEventListener('mouseout', () => {
//     toggleElementsHidder(instructionScreen);
// })

// startModifyGameButton.addEventListener('click', () => {
//     firstStart = 1;
//     toggleElementsHidder(entrenceScreen);
//     toggleElementsHidder(modifyScreen);
//     toggleElementsHidder(instructionScreen);
//     inventoryReset();
//     timerCounter = 0;

//     entrenceScreen.style.opacity = 0;
//     entrenceScreen.style.transition = 'all 1.5s'; // animation of fade out

//     toggleElementsHidder(entrenceScreen);
//     setTimeout(() => {
//         entrenceScreen.style.opacity = 1;
//     }, 2000) // set back opacity to reopen window

//     randomWorldMaker(modifyWorldInputs[0].value, modifyWorldInputs[1].value, modifyWorldInputs[2].value)
// })
