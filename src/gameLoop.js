import { domRenderBoard, domPopulateBoard } from "./domInteraction";
import gameboardFactory from "./gameboardFactory";
import { computer, player } from "./players";

async function gameLoop() {
  //2 - The game loop should set up a new game by creating Players and Gameboards. For now just populate each Gameboard with predetermined coordinates. You can implement a system for allowing players to place their ships later.

  const content = document.getElementById("content");
  content.appendChild(domRenderBoard("playerBoard")); // make empty board
  content.appendChild(domRenderBoard("computerBoard")); // make empty board
  const playerBoardObj = gameboardFactory();
  const computerBoardObj = gameboardFactory();

  computer.placeShip(computerBoardObj, 2);
  //console.log(computerBoardObj.fleet);
  console.log("place your 2 ship");
  await player.placeShip(2, "playerBoard", playerBoardObj);
  domPopulateBoard(playerBoardObj, "#playerBoard", true);

  computer.placeShip(computerBoardObj, 3);
  //console.log(computerBoardObj.fleet);
  console.log("place your 3 ship");
  await player.placeShip(3, "playerBoard", playerBoardObj);
  domPopulateBoard(playerBoardObj, "#playerBoard", true);

  computer.placeShip(computerBoardObj, 4);
  //console.log(computerBoardObj.fleet);
  console.log("place your 4 ship");
  await player.placeShip(4, "playerBoard", playerBoardObj);
  domPopulateBoard(playerBoardObj, "#playerBoard", true);

  computer.placeShip(computerBoardObj, 5);
  //console.log(computerBoardObj.fleet);
  console.log("place your 5 ship");
  await player.placeShip(5, "playerBoard", playerBoardObj);
  domPopulateBoard(playerBoardObj, "#playerBoard", true);

  //3-  We’ll leave the HTML implementation up to you for now, but you should display both the player’s boards and render them using information from the Gameboard class.

  /* domPopulateBoard(playerBoardObj, "#playerBoard");
  domPopulateBoard(computerBoardObj, "#computerBoard", false); */

  // -3-1 You need methods to render the gameboards /done/ and to take user input for attacking/done/. For attacks, let the user click on a coordinate in the enemy Gameboard.
  //-4 The game loop should step through the game turn by turn using only methods from other objects. If at any point you are tempted to write a new function inside the game loop, step back and figure out which class or module that function should belong to.

  for (
    let turn = 1;
    //Create conditions so that the game ends once one players ships have all been sunk. This function is appropriate for the Game module.
    computerBoardObj.isGameOver() === false &&
    playerBoardObj.isGameOver() === false;
    turn++
  ) {
    console.log("awaiting player attack");

    await player.attack(computerBoardObj);
    domPopulateBoard(computerBoardObj, "#computerBoard", false);

    console.log("computerAttackNExt");

    computer.attack(playerBoardObj);
    domPopulateBoard(playerBoardObj, "#playerBoard");
  }

  alert("game over");
}

export { gameLoop };
