import {
  domRenderBoard,
  domPopulateBoard,
  boardCoordinates,
  message,
  axisButton,
} from "./domInteraction";
import gameboardFactory from "./gameboardFactory";
import { computer, player } from "./players";

async function gameLoop() {
  //2 - The game loop should set up a new game by creating Players and Gameboards. For now just populate each Gameboard with predetermined coordinates. You can implement a system for allowing players to place their ships later.

  const content = document.getElementById("content");
  //////////////////////////////////

  const playerBoardContainer = document.getElementById(
    "player-board-container"
  );
  playerBoardContainer.appendChild(boardCoordinates("left"));
  playerBoardContainer.appendChild(boardCoordinates("top"));
  playerBoardContainer.appendChild(domRenderBoard("playerBoard")); // make empty board
  //playerBoardContainer.appendChild(boardCoordinates("bottom"));
  playerBoardContainer.appendChild(boardCoordinates("right"));
  //////////////////////////////////////

  const computerBoardContainer = document.getElementById(
    "computer-board-container"
  );
  computerBoardContainer.appendChild(boardCoordinates("left"));
  // computerBoardContainer.appendChild(boardCoordinates("top"));
  computerBoardContainer.appendChild(domRenderBoard("computerBoard")); // make empty board
  computerBoardContainer.appendChild(boardCoordinates("right"));
  computerBoardContainer.appendChild(boardCoordinates("bottom"));

  content.appendChild(playerBoardContainer);
  content.appendChild(boardCoordinates("middle"));
  const botton = axisButton();
  content.appendChild(botton);

  /////////////////////////////////////////
  content.appendChild(computerBoardContainer);
  /////////////////

  const playerBoardObj = gameboardFactory();
  const computerBoardObj = gameboardFactory();

  /* playerBoardObj.board[1][1] = "missed";
  playerBoardObj.board[1][2] = "missed";
  playerBoardObj.board[1][3] = "missed";
  playerBoardObj.board[1][4] = "missed";
  playerBoardObj.board[1][5] = "missed";
  playerBoardObj.board[1][6] = "missed";

  //
  playerBoardObj.board[1][1] = "missed";
  playerBoardObj.board[2][1] = "missed";
  playerBoardObj.board[3][1] = "missed";
  playerBoardObj.board[4][1] = "missed";
  //
  playerBoardObj.board[1][7] = "missed";
  playerBoardObj.board[2][7] = "missed";
  playerBoardObj.board[3][7] = "missed";
  playerBoardObj.board[4][7] = "missed";
  //

  playerBoardObj.board[5][1] = "missed";
  playerBoardObj.board[5][2] = "missed";
  playerBoardObj.board[5][3] = "missed";
  playerBoardObj.board[5][4] = "missed";
  playerBoardObj.board[5][5] = "missed";
  playerBoardObj.board[5][6] = "missed";
  playerBoardObj.board[5][7] = "missed"; */
  /////////////////////////
  computer.placeShip(computerBoardObj, 2);
  //console.log(computerBoardObj.fleet);
  const instructions = document.getElementById("instructions");
  instructions.innerText = "Coloca tu bote de patrulla";

  await player.placeShip(2, "playerBoard", playerBoardObj);
  domPopulateBoard(playerBoardObj, "#playerBoard", true);

  computer.placeShip(computerBoardObj, 3);
  //console.log(computerBoardObj.fleet);
  instructions.innerText = "Coloca tu destructor";
  await player.placeShip(3, "playerBoard", playerBoardObj);
  domPopulateBoard(playerBoardObj, "#playerBoard", true);

  computer.placeShip(computerBoardObj, 3);
  //console.log(computerBoardObj.fleet);
  instructions.innerText = "Coloca tu submarino";
  await player.placeShip(3, "playerBoard", playerBoardObj);
  domPopulateBoard(playerBoardObj, "#playerBoard", true);

  computer.placeShip(computerBoardObj, 4);
  //console.log(computerBoardObj.fleet);
  instructions.innerText = "Coloca tu nave de batalla";
  await player.placeShip(4, "playerBoard", playerBoardObj);
  domPopulateBoard(playerBoardObj, "#playerBoard", true);

  computer.placeShip(computerBoardObj, 5);
  //console.log(computerBoardObj.fleet);
  instructions.innerText = "Coloca tu carguero";
  await player.placeShip(5, "playerBoard", playerBoardObj);
  domPopulateBoard(playerBoardObj, "#playerBoard", true);

  //3-  We’ll leave the HTML implementation up to you for now, but you should display both the player’s boards and render them using information from the Gameboard class.

  /* domPopulateBoard(playerBoardObj, "#playerBoard");
  domPopulateBoard(computerBoardObj, "#computerBoard", false); */

  // -3-1 You need methods to render the gameboards /done/ and to take user input for attacking/done/. For attacks, let the user click on a coordinate in the enemy Gameboard.
  //-4 The game loop should step through the game turn by turn using only methods from other objects. If at any point you are tempted to write a new function inside the game loop, step back and figure out which class or module that function should belong to.

  //display message !!!
  instructions.style.display = "none";

  computerBoardContainer.style.display = "grid";
  botton.remove();
  await message("Empieza la batalla...");

  for (
    let turn = 1;
    //Create conditions so that the game ends once one players ships have all been sunk. This function is appropriate for the Game module.
    computerBoardObj.isGameOver() === false &&
    playerBoardObj.isGameOver() === false;
    turn++
  ) {
    var audio = new Audio("./shoot.mp3");
    await message("Esperando ordenes capitan!");
    await player.attack(computerBoardObj);
    audio.play();
    domPopulateBoard(computerBoardObj, "#computerBoard", false);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    await message("Ataque enemigo aproximandoce");

    audio.play();
    computer.attack(playerBoardObj);
    domPopulateBoard(playerBoardObj, "#playerBoard");
    await new Promise((resolve) => setTimeout(resolve, 1000));
  }

  alert("game over");
}

export { gameLoop };
