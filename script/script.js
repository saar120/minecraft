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

let indexOfBox = 0;
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
      indexOfBox++;
    }
  }
}

landScapeMaker();

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

function rockMaker(x = 2, double = false) {
  landScapeMaker("rock", 13, 13, x, x);
}

function bushMaker(x = 5) {
  landScapeMaker("leaves", 13, 13, x, x + 2);
  landScapeMaker("leaves", 12, 12, x + 1, x + 1);
}

function basicWorldMaker() {
  spaceMaker();
  treeMaker();
  rockMaker();
  rockMaker();
  bushMaker();
}

landScapeMaker();
basicWorldMaker();

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
