const axe = document.querySelector(".axe");
const picaxe = document.querySelector(".picaxe");
const shovel = document.querySelector(".shovel");

const game = document.querySelector(".game-grid");

const grassInventory = document.querySelector(".inventory .grass");
const rockInventory = document.querySelector(".inventory .rock");
const soilInventory = document.querySelector(".inventory .soil");
const leavesInventory = document.querySelector(".inventory .leaves");
const woodInventory = document.querySelector(".inventory .wood");
const sunInventory = document.querySelector(".inventory .sun");

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

let boxIndex = 0;
function landScapeMaker(
  material,
  rowStart = 1,
  rowEnd = 20,
  columnStart = 1,
  columnEnd = 25
) {
  for (let row = rowStart; row <= rowEnd; row++) {
    for (let column = columnStart; column <= columnEnd; column++) {
      let box = document.createElement("div");
      box.classList.add(material);
      objOfBoxes[`${row}.${column}`] = box;
      box.classList.add("box");
      game.appendChild(box);
      box.style.gridRow = row;
      box.style.gridColumn = column;
      boxIndex++;
    }
  }
}

// landScapeMaker();

// basic world builder positions
function spaceMaker(length = 25) {
  landScapeMaker("grass", 14, 14, 1, length);
  landScapeMaker("soil", 15, 20, 1, length);
  landScapeMaker("cloud", 5, 5, 9, 13);
  landScapeMaker("cloud", 4, 4, 10, 13);
  landScapeMaker("cloud", 3, 3, 10, 11);
  landScapeMaker("cloud", 3, 3, 14, 18);
  landScapeMaker("cloud", 2, 2, 15, 18);
  landScapeMaker("cloud", 1, 1, 15, 16);
}

function treeMaker(x = 20) {
  landScapeMaker("wood", 10, 13, x, x);
  landScapeMaker("leaves", 7, 9, x - 1, x + 1);
}

function rockMaker(x = 2) {
  landScapeMaker("rock", 13, 13, x, x);
}

function bushMaker(x = 5) {
  landScapeMaker("leaves", 13, 13, x, x + 2);
  landScapeMaker("leaves", 12, 12, x + 1, x + 1);
}

function sunMaker(x = 3, y = 1) {
  landScapeMaker("sun", y, y, x, x);
  landScapeMaker("sun", y + 1, y + 1, x - 1, x + 1);
  landScapeMaker("sun", y + 2, y + 2, x - 2, x + 2);
  landScapeMaker("sun", y + 5, y + 5, x, x);
  landScapeMaker("sun", y + 4, y + 4, x - 1, x + 1);
  landScapeMaker("sun", y + 3, y + 3, x - 2, x + 2);
}

function basicWorldMaker() {
  spaceMaker();
  treeMaker();
  rockMaker();
  rockMaker();
  bushMaker();
  sunMaker();
}

landScapeMaker();
basicWorldMaker();

function collectMaterial(event) {
  material = event.target.classList[0];
  console.log(event.target.classList);
  console.log(materialObj[tool].includes(material));
  if (materialObj[tool].includes(material)) {
    inventory[material]
      ? (inventory[material] += 1)
      : (inventory[material] = 1); //// updated inventory obj amounts
    event.target.classList.remove(material);

    updateInventory();
  }
}

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

function pickedToolBackground() {
  axe.classList.contains("blue") && axe.classList.remove("blue");
  picaxe.classList.contains("blue") && picaxe.classList.remove("blue");
  shovel.classList.contains("blue") && shovel.classList.remove("blue");
  grassInventory.style.opacity = 0.75;
  woodInventory.style.opacity = 0.75;
  soilInventory.style.opacity = 0.75;
  leavesInventory.style.opacity = 0.75;
  rockInventory.style.opacity = 0.75;
  sunInventory.style.opacity = 0.75;
}

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

function removeOtherEventListeners() {
  game.removeEventListener("click", collectMaterial);
  game.removeEventListener("click", putMaterial);
}

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

grassInventory.addEventListener("click", (event) => {
  removeOtherEventListeners();
  material = "grass";
  pickedToolBackground();
  grassInventory.style.opacity = 1;
  game.addEventListener("click", putMaterial);
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
