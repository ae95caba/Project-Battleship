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
    //const row1Columns = document.querySelectorAll(`.row-${c} .column-${i}`);
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

function attackWithClick(domBoard, objBoard) {
  domBoard.addEventListener("click", (e) => {
    let y = e.target;
    let x = e.target.parentElement;
  });
  if (objBoard.board[x][y] !== undefined) {
    if (objBoard.board[x][y].destroyed === false) {
      objBoard.board[x][y].destroyed = true;
    }
  } else {
    objBoard.board[x][y] = "missed";
  }
}

export { domRenderBoard, domPopulateBoard, attackWithClick };
