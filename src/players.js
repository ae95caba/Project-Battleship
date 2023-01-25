let computer = {
  attack: function (playerBoardObj) {
    const x = this.randomIntFromInterval(0, 9);
    const y = this.randomIntFromInterval(0, 9);

    if (playerBoardObj.reciveAttack(x, y) !== "repetido") {
      playerBoardObj.reciveAttack(x, y);
    } else {
      console.log("computer repetido");
      computer.attack(playerBoardObj);
    }
  },
  placeShip: function (computerBoardObj, length) {
    const x = this.randomIntFromInterval(0, 9);
    const y = this.randomIntFromInterval(0, 9);
    if (computerBoardObj.willFollowRules(length, x, y)) {
      computerBoardObj.placeShip(length, x, y);
    } else {
      computer.placeShip(computerBoardObj, length);
    }
  },
  randomIntFromInterval: function (min, max) {
    // min and max included

    return Math.floor(Math.random() * (max - min + 1) + min);
  },
};

function playerAttack(computerBoardObj) {
  console.log("playerAttack function");
  return new Promise(function asd(resolve, reject) {
    const computerBoard = document.getElementById("computerBoard");
    computerBoard.addEventListener(
      "click",
      (e) => {
        if (
          e.target.classList.contains("board") ||
          e.target.classList.contains("row")
        ) {
          asd(resolve);
        } else {
          let x = e.target.dataset.x;
          let y = e.target.parentElement.dataset.y;

          if (computerBoardObj.reciveAttack(x, y) !== "repetido") {
            computerBoardObj.reciveAttack(x, y);
            resolve();
          } else {
            console.log("repetido intenta denuevo");
            asd(resolve, reject);
          }
        }
      },

      { once: true }
    );
  });
}

export { playerAttack, computer };
