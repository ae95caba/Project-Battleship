import { attackWithClick } from "./domInteraction";

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
    alert("computer repetido");
    computerAttack(playerBoardObj);
  }
}

function Players() {
  let computerAttack = function () {
    function randomIntFromInterval(min, max) {
      // min and max included

      return Math.floor(Math.random() * (max - min + 1) + min);
    }

    const x = randomIntFromInterval(0, 9);
    const y = randomIntFromInterval(0, 9);

    if (playerBoardObj.reciveAttack(x, y) !== "repetido") {
      playerBoardObj.reciveAttack(x, y);
    } else {
      alert("computer repetido");
      computerAttack(playerBoardObj);
    }
  };
  let letThemPlay = function () {
    const computerBoard = document.getElementById("computerBoard");
    computerBoard.addEventListener(
      "click",
      (e) => {
        let x = e.target.dataset.x;
        let y = e.target.parentElement.dataset.y;

        if (computerBoardObj.reciveAttack(x, y) !== "repetido") {
          computerBoardObj.reciveAttack(x, y);

          domPopulateBoard(computerBoardObj, "#computerBoard", false);

          setTimeout(() => {
            computerAttack();
            domPopulateBoard(playerBoardObj, "#playerBoard");
            letThemPlay();
          }, 2000);
        } else {
          alert("repetido");
          letThemPlay();
        }
      },
      { once: true }
    );
  };
  return { letThemPlay };
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

export { Players, playerAttack, computerAttack };
