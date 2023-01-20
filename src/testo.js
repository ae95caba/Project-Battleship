const player = {
  turn: function () {
    const computerBoard = document.getElementById("computerBoard");
    //const playerBoard = document.getElementById("playerBoard");
    computerBoard.addEventListener(
      "click",
      (e) => {
        let y = e.target.dataset.x;
        let x = e.target.parentElement.dataset.y;
        return [x, y];

        ///here ends player interaction
      },
      { once: true }
    );
  },
};

setTimeout(() => {
  computer.attack(playerBoardObj);
  domPopulateBoard(playerBoardObj, "#playerBoard");
  playerTurn();
}, 2000);
