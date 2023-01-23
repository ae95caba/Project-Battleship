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
  for (let r = 0; r < 10; r++) {
    for (let c = 0; c < 10; c++) {
      const column = document.querySelector(
        `${DomBoardSelector} .row-${r} .column-${c}`
      );

      if (boardObj.board[r][c] !== undefined) {
        if (boardObj.board[r][c].destroyed === true) {
          column.style.backgroundColor = "red";
        } else if (boardObj.board[r][c].destroyed === false && isPlayerBoard) {
          column.style.backgroundColor = "green";
        } else if (boardObj.board[r][c] === "missed") {
          column.style.backgroundColor = "grey";
        }
      }
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
  return new Promise(function asd(resolve) {
    const playerBoard = document.getElementById(playerBoardId);
    playerBoard.addEventListener(
      "click",
      (e) => {
        let x = e.target.dataset.x;

        let y = e.target.parentElement.dataset.y;
        if (playerBoardObj.placeShipWithRules(length, x, y) !== "try again") {
          playerBoardObj.placeShip(length, x, y);

          resolve();
        } else {
          asd(resolve);
        }
      },
      { once: true }
    );
  });
}

export { domRenderBoard, domPlaceShip, domPopulateBoard, attackWithClick };
