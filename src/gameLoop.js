import {
  domRenderBoard,
  domPopulateBoard,
  attackWithClick,
} from "./domInteraction";
import gameboardFactory from "./gameboardFactory";
import { computerAttack, playerTurn } from "./players";

function gameLoop() {
  //2 - The game loop should set up a new game by creating Players and Gameboards. For now just populate each Gameboard with predetermined coordinates. You can implement a system for allowing players to place their ships later.
  const content = document.getElementById("content");
  content.appendChild(domRenderBoard("playerBoard")); // make empty board
  content.appendChild(domRenderBoard("computerBoard")); // make empty board

  const playerBoardObj = gameboardFactory();
  const computerBoardObj = gameboardFactory();

  playerBoardObj.placeShip(2, 6, 2);
  computerBoardObj.placeShip(2, 6, 2);
  playerBoardObj.placeShip(3, 3, 3);
  computerBoardObj.placeShip(3, 3, 3);
  playerBoardObj.placeShip(4, 4, 5);
  computerBoardObj.placeShip(4, 4, 5);
  playerBoardObj.placeShip(5, 5, 7);
  computerBoardObj.placeShip(5, 5, 7);
  //3-  We’ll leave the HTML implementation up to you for now, but you should display both the player’s boards and render them using information from the Gameboard class.

  domPopulateBoard(playerBoardObj, "#playerBoard");
  domPopulateBoard(computerBoardObj, "#computerBoard", false);

  // -3-1 You need methods to render the gameboards and to take user input for attacking. For attacks, let the user click on a coordinate in the enemy Gameboard.

  actualGameLoop();
}

export { gameLoop };
