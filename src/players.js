function computerAttack() {
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

function actualGameLoop() {
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
          playerTurn();
        }, 2000);
      } else {
        alert("repetido");
        playerTurn();
      }
    },
    { once: true }
  );
}

function Player() {
  let name = undefined;
  let turn = function (asddf) {
    asdf;
  };
  return { name, turn };
}

export { computerAttack, actualGameLoop };
