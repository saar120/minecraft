This project mainly involved working with some complex grid system of HTML, advanced features of CSS and DOM functions to make it alive.

The basic functions of creating the basic structure was creating a dynamic JS grid system to fill in the blocks that the HTML created fo us:

1. function landScapeMaker(material,rowStart = 1,rowEnd = 20,columnStart = 1,columnEnd = 25) {
   for (let row = rowStart; row <= rowEnd; row++) {
   for (let column = columnStart; column <= columnEnd; column++) {
   objOfBoxes[`${row}.${column}`].classList.add(material);
   }
   }
   }

2. function boxGameCreator(
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

After that the functions was used for each use case of building materials, instering the material and asking starting locations with ending locations, something like that for the basic wood and leaves materials:

3.  function treeMaker() {
    let treeX = Math.floor(Math.random() \* 10 + 12);
    landScapeMaker("wood", 10, 13, treeX, treeX);
    landScapeMaker("leaves", 7, 9, treeX - 1, treeX + 1);
    }

I used some lowkey random positioning with Math.random() to ask the function to position the tree and leaves in random starting points.

To collect and put material back to the game were created together with inventory update function, working together to notify how much and which material was added and picked by the user to build and destory the world that was created.

4. function collectMaterial(event) {
   material = event.target.classList[1];
   if (materialObj[tool].includes(material)) {
   inventory[material]
   ? (inventory[material] += 1)
   : (inventory[material] = 1); //// updated inventory obj amounts
   event.target.classList.remove(material);
   updateInventory();
   } else wrongPick(event);
   }

5. function updateInventory() {
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
   case "sun":
   sunInventory.innerHTML = `<h4>${amount}</h4>`;
   break;
   case "bushLeaves":
   bushLeavesInventory.innerHTML = `<h4>${amount}</h4>`;
   break;
   }
   }
   }

6. function putMaterialBackOnGrid(event) {
   if (inventory[material]) {
   if (event.target.classList.length == 1) {
   event.target.classList.add(material);
   inventory[material] -= 1;
   updateInventory();
   }
   }
   }

For the most parts of this project I used addEventListener to specify the action that must be taken when a user presses certain areas of the game, together with removeEventListener the stop the actions of previously selected tools and materials.

SPREAD IT AMONG YOUR YOUNGSTERS! (it's better than drugs)
