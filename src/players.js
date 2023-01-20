const computer = {
  turn: function (boardObj) {
    function randomIntFromInterval(min, max) {
      // min and max included
      return Math.floor(Math.random() * (max - min + 1) + min);
    }

    boardObj.reciveAttack(
      randomIntFromInterval(0, 9),
      randomIntFromInterval(0, 9)
    );
  },
};

const player = {
  turn: function () {
    const computerBoard = document.getElementById("computerBoard");
    //const playerBoard = document.getElementById("playerBoard");
    computerBoard.addEventListener(
      "click",
      (e) => {
        let y = e.target.dataset.x;
        let x = e.target.parentElement.dataset.y;
        computerBoardObj.reciveAttack(x, y);
        domPopulateBoard(computerBoardObj, "#computerBoard", false);
        ///here ends player interaction
        setTimeout(() => {
          computer.attack(playerBoardObj);
          domPopulateBoard(playerBoardObj, "#playerBoard");
          playerTurn();
        }, 2000);
      },
      { once: true }
    );
  },
};

export { computer, player };
