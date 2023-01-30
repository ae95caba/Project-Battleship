function axisButton() {
  const axisButton = document.createElement("button");
  axisButton.type = "button";
  axisButton.setAttribute("data-direction", "horizontal");
  axisButton.id = "axis-button";
  axisButton.innerText = "Direccion: horizontal";

  axisButton.addEventListener("click", () => {
    if (axisButton.dataset.direction === "horizontal") {
      axisButton.dataset.direction = "vertical";
      axisButton.innerText = "Direccion: vertical";
    } else {
      axisButton.dataset.direction = "horizontal";
      axisButton.innerText = "Direccion: horizontal";
    }
  });
  return axisButton;
}

function domPlaceShipImg(length, x, y, playerBoardObj, isvertical = false) {
  const column = document.querySelector(`#playerBoard .row-${y} .column-${x}`);
  const img = document.createElement("img");
  img.classList.add("ship");
  let ship;
  if (isvertical) {
    img.classList.add("vertical");
  }
  switch (length) {
    case 2:
      {
        ship = "patrolBoat";
        img.id = "patrol-boat";
      }
      break;
    case 3:
      {
        if (!playerBoardObj.fleet.submarine) {
          ship = "destroyer";
          img.id = ship;
        } else {
          ship = "submarine";
          img.id = ship;
        }
      }
      break;
    case 4:
      {
        ship = "battleship";
        img.id = ship;
      }
      break;
    case 5:
      {
        ship = "carrier";
        img.id = ship;
      }
      break;
  }
  img.src = `./${ship}.svg`;

  column.appendChild(img);
}

function message(messageBody) {
  const content = document.getElementById("content");
  const div = document.createElement("div");
  div.classList.add("message");
  div.innerText = messageBody;
  content.appendChild(div);
  setTimeout(() => {
    div.remove();
  }, 2000);
}

function boardCoordinates(position) {
  let cellContainer = document.createElement("div");
  cellContainer.classList.add("cell-container");

  cellContainer.classList.add(position);
  for (let i = 0; i < 10; i++) {
    const cell = document.createElement("div");
    cell.innerText = i;
    cell.classList.add("cell");

    cellContainer.appendChild(cell);
  }
  return cellContainer;
}

function domRenderBoard(id) {
  const board = document.createElement("div");
  board.id = id;
  board.classList.add("board");
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
const shotMarker = () => {
  const shotMarker = document.createElement("img");
  shotMarker.src = "./shot-marker.svg";
  shotMarker.classList.add("shot-marker");
  return shotMarker;
};

function domPopulateBoard(boardObj, DomBoardSelector, isPlayerBoard = true) {
  for (let r = 0; r < 10; r++) {
    for (let c = 0; c < 10; c++) {
      const column = document.querySelector(
        `${DomBoardSelector} .row-${r} .column-${c}`
      );

      if (boardObj.board[r][c] !== undefined) {
        if (boardObj.board[r][c].destroyed === true) {
          if (column.classList.contains("hitted") === false) {
            column.append(shotMarker());
            column.classList.add("hitted");
          }
        } else if (boardObj.board[r][c].destroyed === false && isPlayerBoard) {
        } else if (boardObj.board[r][c] === "missed") {
          if (column.classList.contains("missed") === false) {
            column.append(shotMarker());
            column.classList.add("missed");
          }
        }
      }
    }
  }
}

export {
  message,
  domRenderBoard,
  domPopulateBoard,
  axisButton,
  boardCoordinates,
  domPlaceShipImg,
};
