function domRenderBoard(id) {
  const board = document.createElement("div");
  board.id = id;
  for (let r = 0; r < 10; r++) {
    const row = document.createElement("div");
    row.classList.add(`row-${r}`, "row");
    row.dataset.y = r;

    for (let c = 0; c < 10 > 0; c++) {
      const column = document.createElement("div");

      column.classList.add(`column-${c}`, "column");
      column.dataset.x = c;
      row.appendChild(column);
    }
    board.appendChild(row);
  }
  return board;
}

function domPopulateBoard(boardObj, DomBoardSelector, isPlayerBoard = true) {
  console.log("domPopulateBoard started");
  for (let r = 0; r < 10; r++) {
    console.log("first for");
    for (let c = 0; c < 10; c++) {
      console.log("second for");
      const column = document.querySelector(
        `${DomBoardSelector} .row-${r} .column-${c}`
      );
      console.log(boardObj.board[r][c]);
      if (boardObj.board[r][c] !== undefined) {
        console.log("first if");
        if (boardObj.board[r][c].destroyed === true) {
          console.log("second if");
          column.style.backgroundColor = "red";
        } else if (boardObj.board[r][c].destroyed === false && isPlayerBoard) {
          console.log("setting color to green");
          column.style.backgroundColor = "green";
        } else if (boardObj.board[r][c] === "missed") {
          console.log("setting color to grey");
          column.style.backgroundColor = "grey";
        }
        console.log("after last else if");
      }
      console.log("after first if");
    }
  }
}

function attackWithClick(domBoard, computerBoardObj) {
  domBoard.addEventListener("click", (e) => {
    let x = e.target.dataset.x;
    let y = e.target.parentElement.dataset.y;
  });
  if (computerBoardObj.reciveAttack(x, y) !== "repetido") {
    computerBoardObj.reciveAttack(x, y);
  } else {
    attackWithClick(domBoard, computerBoardObj);
  }
  //
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
}

function domPlaceShip(length, playerBoardId, playerBoardObj) {
  return new Promise(function (resolve, reject) {
    const playerBoard = document.getElementById(playerBoardId);
    playerBoard.addEventListener(
      "click",
      (e) => {
        let x = e.target.dataset.x;
        console.log(x);

        let y = e.target.parentElement.dataset.y;
        console.log(y);
        playerBoardObj.placeShip(length, x, y);
        console.log(playerBoardObj.fleet);
        console.log(playerBoardObj.board[y]);
        console.log(playerBoardObj.board);
        resolve();
      },
      { once: true }
    );
  });
}

export { domRenderBoard, domPlaceShip, domPopulateBoard, attackWithClick };
