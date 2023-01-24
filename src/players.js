import { attackWithClick } from "./domInteraction";

const computer = {
  attack: function () {},
  placeShip: function () {},
};

function computerAttack(playerBoardObj) {
  function randomIntFromInterval(min, max) {
    // min and max included

    return Math.floor(Math.random() * (max - min + 1) + min);
  }
  const x = randomIntFromInterval(0, 9);
  const y = randomIntFromInterval(0, 9);

  if (playerBoardObj.reciveAttack(x, y) !== "repetido") {
    playerBoardObj.reciveAttack(x, y);
  } else {
    console.log("computer repetido");
    computerAttack(playerBoardObj);
  }
}

function computerPlaceShip(computerBoardObj, length) {
  function randomIntFromInterval(min, max) {
    // min and max included

    return Math.floor(Math.random() * (max - min + 1) + min);
  }
  const x = randomIntFromInterval(0, 9);
  const y = randomIntFromInterval(0, 9);
  if (computerBoardObj.willFollowRules(length, x, y)) {
    computerBoardObj.placeShip(length, x, y);
  } else {
    computerPlaceShip(computerBoardObj, length);
  }
}

function playerAttack(computerBoardObj) {
  console.log("playerAttack function");
  return new Promise(function asd(resolve, reject) {
    const computerBoard = document.getElementById("computerBoard");
    computerBoard.addEventListener(
      "click",
      (e) => {
        let x = e.target.dataset.x;
        let y = e.target.parentElement.dataset.y;

        console.log(x);
        console.log(y);

        if (computerBoardObj.reciveAttack(x, y) !== "repetido") {
          computerBoardObj.reciveAttack(x, y);
          resolve();
        } else {
          console.log("repetido intenta denuevo");
          asd(resolve, reject);
        }
      },
      { once: true }
    );
  });
}

export { playerAttack, computerAttack, computerPlaceShip };
