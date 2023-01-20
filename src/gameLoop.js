import {
  domRenderBoard,
  domPopulateBoard,
  attackWithClick,
} from "./domInteraction";
import gameboardFactory from "./gameboardFactory";

function gameLoop() {
  //computerAttack(player1board);

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

  function computerAttack(boardObj) {
    function randomIntFromInterval(min, max) {
      // min and max included

      return Math.floor(Math.random() * (max - min + 1) + min);
    }

    const x = randomIntFromInterval(0, 9);
    const y = randomIntFromInterval(0, 9);

    if (boardObj.reciveAttack(x, y) !== "repetido") {
      boardObj.reciveAttack(x, y);
    } else {
      alert("computer repetido");
      computerAttack(boardObj);
    }
  }

  function playerTurn() {
    const computerBoard = document.getElementById("computerBoard");
    //const playerBoard = document.getElementById("playerBoard");
    computerBoard.addEventListener(
      "click",
      (e) => {
        let x = e.target.dataset.x;
        let y = e.target.parentElement.dataset.y;

        if (computerBoardObj.reciveAttack(x, y) !== "repetido") {
          computerBoardObj.reciveAttack(x, y);
          domPopulateBoard(computerBoardObj, "#computerBoard", false);

          if (!computerBoardObj.isGameOver()) {
            setTimeout(() => {
              computerAttack(playerBoardObj);
              domPopulateBoard(playerBoardObj, "#playerBoard");
              playerTurn();
            }, 2000);
          } else {
            console.log("game over");
          }
        } else {
          alert("repetido");
          playerTurn();
        }
      },
      { once: true }
    );
  }
  playerTurn();
}

export { gameLoop };
