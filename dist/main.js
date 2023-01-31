/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/ai.js":
/*!*******************!*\
  !*** ./src/ai.js ***!
  \*******************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ai": () => (/* binding */ ai)
/* harmony export */ });
/* harmony import */ var _players__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./players */ "./src/players.js");


const ai = {
  chaseMode: {
    wasReverseActivated: false,
    reverseMode: false,
    state: false,
    chaseSubject: { x: undefined, y: undefined }, //x,y

    validMoves: ["left", "right", "top", "bottom"],
    followDirection: undefined,
    firstChaseSubject: { x: undefined, y: undefined }, //for reversed
    firstValidMoves: [], //for reversed
    firstDirection: undefined,
    isChasing: false,
  },
  //this will modify the array validMoves
  addValidDirections: function (playerBoardObj) {
    this.chaseMode.validMoves = [];
    const posibleDirections = ["left", "right", "top", "bottom"];

    // //remove direcctions that will be outside the board
    switch (this.chaseMode.chaseSubject.x) {
      case 0:
        {
          const index = posibleDirections.indexOf("left");

          posibleDirections.splice(index, 1);
        }
        break;
      case 9:
        {
          const index = posibleDirections.indexOf("right");

          posibleDirections.splice(index, 1);
        }
        break;
    }
    switch (this.chaseMode.chaseSubject.y) {
      case 0:
        {
          const index = posibleDirections.indexOf("top");

          posibleDirections.splice(index, 1);
        }
        break;
      case 9:
        {
          const index = posibleDirections.indexOf("bottom");

          posibleDirections.splice(index, 1);
        }
        break;
    }

    //remove the directions that not follow rules
    //only in chaseSubject
    posibleDirections.forEach((direction) => {
      if (
        playerBoardObj.attackResultOnly(
          this.coordinates(direction).x,
          this.coordinates(direction).y
        ) !== "repetido"
      ) {
        this.chaseMode.validMoves.push(direction);
      }
    });
  },

  //pick a direction
  //this will return a direction

  // if it has 2 consecutive hits{
  // keep in the succesfull direction
  //if posible
  //if not, return undefined,a random direction will trigger later in the code}
  //else if there was only 1 hit {
  // pick a random direction of the valid directions array, if the array is empty, go to a random direction of the board(a random direction will trigger later in the code)

  direction: function () {
    if (this.chaseMode.isChasing) {
      if (!this.chaseMode.wasReverseActivated) {
        if (
          !this.chaseMode.validMoves.includes(this.chaseMode.followDirection)
        ) {
          //till here the logi is great!

          //alert("a random attack will occur ! But it shouldnt !");
          console.log("a random attack will occur ! But it shouldnt !");
          //alert(this.chaseMode.wasReverseActivated);
          console.log(this.chaseMode.wasReverseActivated);
          //try reverse

          let oposite = undefined;
          switch (this.chaseMode.followDirection) {
            case "left":
              {
                oposite = "right";
              }
              break;
            case "right":
              {
                oposite = "left";
              }
              break;
            case "top":
              {
                oposite = "bottom";
              }
              break;
            case "bottom":
              {
                oposite = "top";
              }
              break;
          }
          if (this.chaseMode.firstValidMoves.includes(oposite)) {
            //use reverse
            this.chaseMode.wasReverseActivated = true;
            this.chaseMode.chaseSubject = this.chaseMode.firstChaseSubject;
            this.chaseMode.followDirection = oposite;
            return oposite;
          } else {
            //a random direction will trigger later in the code
            this.chaseMode.state = false;
            this.chaseMode.isChasing = false;
            //this.chaseMode.wasReverseActivated = false
            return undefined;
          }
        }
      }
    }

    if (this.chaseMode.isChasing) {
      if (this.chaseMode.wasReverseActivated) {
        if (
          !this.chaseMode.validMoves.includes(this.chaseMode.followDirection)
        ) {
          this.chaseMode.wasReverseActivated = false;
          //alert("this should trigger a random direction but it doesnt !");
          console.log("this should trigger a random direction but it doesnt !");
          //alert(this.chaseMode.wasReverseActivated);
          console.log(this.chaseMode.wasReverseActivated);
          //a random direction will trigger later in the code
          this.chaseMode.state = false;
          this.chaseMode.isChasing = false;
          //this.chaseMode.wasReverseActivated = false

          return undefined;
        }
      }
    }

    if (this.chaseMode.isChasing) {
      if (this.chaseMode.validMoves.includes(this.chaseMode.followDirection)) {
        return this.chaseMode.followDirection;
      } else {
        //a random direction will trigger later in the code
        this.chaseMode.state = false;
        this.chaseMode.isChasing = false;
        return undefined;
      }
    } else if (this.chaseMode.isChasing === false) {
      if (this.chaseMode.validMoves.length >= 1) {
        this.chaseMode.firstValidMoves = this.chaseMode.validMoves; //this is for reverse mode later
        const directionIndex = _players__WEBPACK_IMPORTED_MODULE_0__.computer.randomIntFromInterval(
          0,
          this.chaseMode.validMoves.length - 1
        );
        const direction = this.chaseMode.validMoves[directionIndex];

        return direction;
      } else if (this.chaseMode.validMoves.length === 0) {
        this.chaseMode.state = false;
        return undefined;
      }
    }
  },
  //transform direction into coordinate
  //this will return a coordinate
  // {x,y}
  coordinates: function (direction) {
    if (direction === undefined) {
      return undefined;
    }

    switch (direction) {
      case "left": {
        return {
          x: this.chaseMode.chaseSubject.x - 1,
          y: this.chaseMode.chaseSubject.y,
        };
      }

      case "right": {
        return {
          x: this.chaseMode.chaseSubject.x + 1,
          y: this.chaseMode.chaseSubject.y,
        };
      }

      case "top":
        {
          return {
            x: this.chaseMode.chaseSubject.x,
            y: this.chaseMode.chaseSubject.y - 1,
          };
        }
        break;
      case "bottom": {
        return {
          x: this.chaseMode.chaseSubject.x,
          y: this.chaseMode.chaseSubject.y + 1,
        };
      }
    }
  },

  //use the new coordinate and direction

  //if no direction was selected
  //attack a random position on the board

  //if a direction was selected
  //there are 2 branches

  //first if isChasin
  //and hits then update the chase subject

  // if misses and it is  in reverseMode
  // disable chaseeMode and its modes

  //if it was not in reverse mode
  // enable reverseMode
  //
  attack: function (playerBoardObj) {
    //save direction
    const direction = this.direction();

    //save coordinates
    const coordinates = this.coordinates(direction);

    //if the directions method dindt return any direction, hence coordinates will return undefined
    //if no in reverse mode{attack in a random direction}
    //else{}

    if (coordinates === undefined) {
      _players__WEBPACK_IMPORTED_MODULE_0__.computer.attack(playerBoardObj);
      return undefined;
    }

    if (this.chaseMode.isChasing) {
      switch (playerBoardObj.reciveAttack(coordinates.x, coordinates.y)) {
        case "hit":
          {
            //update chase subject
            this.chaseMode.chaseSubject = coordinates;
          }
          break;
        case "missed":
          {
            //if reverse mode was not in activated{
            //start reverseMode}
            ///if it was{
            //end chasinMode and its modes}

            if (this.chaseMode.wasReverseActivated !== true) {
              this.chaseMode.reverseMode = true;
            } else {
              this.chaseMode.state = false;
              this.chaseMode.isChasing = false;

              this.chaseMode.followDirection = undefined;
              this.chaseMode.wasReverseActivated = false;
            }
          }
          break;
      }
    } else if (this.chaseMode.isChasing === false) {
      switch (playerBoardObj.reciveAttack(coordinates.x, coordinates.y)) {
        case "hit":
          {
            //update the chase subject
            this.chaseMode.chaseSubject = coordinates;

            //save valid moves of the first chase subject
            this.chaseMode.firstValidMoves = this.chaseMode.validMoves; //for reverse !

            //start a chasing direction
            this.chaseMode.followDirection = direction;
            this.chaseMode.isChasing = true;

            this.chaseMode.firstDirection = this.chaseMode.followDirection; // for reversed
          }
          break;
        case "missed":
          {
            //it is not necesary to do anything here because the ai will keep trying until it gets a hit
            // and every miss is removed from the valid directions array
          }
          break;
      }
    }
  },
};




/***/ }),

/***/ "./src/domInteraction.js":
/*!*******************************!*\
  !*** ./src/domInteraction.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "axisButton": () => (/* binding */ axisButton),
/* harmony export */   "boardCoordinates": () => (/* binding */ boardCoordinates),
/* harmony export */   "domPlaceShipImg": () => (/* binding */ domPlaceShipImg),
/* harmony export */   "domPopulateBoard": () => (/* binding */ domPopulateBoard),
/* harmony export */   "domRenderBoard": () => (/* binding */ domRenderBoard),
/* harmony export */   "message": () => (/* binding */ message)
/* harmony export */ });
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

/* function message(messageBody) {
  const content = document.getElementById("content");
  const div = document.createElement("div");
  div.classList.add("message");
  div.innerText = messageBody;
  content.appendChild(div);
  setTimeout(() => {
    div.remove();
  }, 1000);
}
 */
function message(messageBody) {
  return new Promise((resolve) => {
    const content = document.getElementById("content");
    const div = document.createElement("div");
    div.classList.add("message");
    div.innerText = messageBody;
    content.appendChild(div);
    setTimeout(() => {
      div.remove();
      resolve();
    }, 1500);
  });
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




/***/ }),

/***/ "./src/gameLoop.js":
/*!*************************!*\
  !*** ./src/gameLoop.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "gameLoop": () => (/* binding */ gameLoop)
/* harmony export */ });
/* harmony import */ var _domInteraction__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./domInteraction */ "./src/domInteraction.js");
/* harmony import */ var _gameboardFactory__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./gameboardFactory */ "./src/gameboardFactory.js");
/* harmony import */ var _players__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./players */ "./src/players.js");




async function gameLoop() {
  //2 - The game loop should set up a new game by creating Players and Gameboards. For now just populate each Gameboard with predetermined coordinates. You can implement a system for allowing players to place their ships later.

  const content = document.getElementById("content");
  //////////////////////////////////

  const playerBoardContainer = document.getElementById(
    "player-board-container"
  );
  playerBoardContainer.appendChild((0,_domInteraction__WEBPACK_IMPORTED_MODULE_0__.boardCoordinates)("left"));
  playerBoardContainer.appendChild((0,_domInteraction__WEBPACK_IMPORTED_MODULE_0__.boardCoordinates)("top"));
  playerBoardContainer.appendChild((0,_domInteraction__WEBPACK_IMPORTED_MODULE_0__.domRenderBoard)("playerBoard")); // make empty board
  //playerBoardContainer.appendChild(boardCoordinates("bottom"));
  playerBoardContainer.appendChild((0,_domInteraction__WEBPACK_IMPORTED_MODULE_0__.boardCoordinates)("right"));
  //////////////////////////////////////

  const computerBoardContainer = document.getElementById(
    "computer-board-container"
  );
  computerBoardContainer.appendChild((0,_domInteraction__WEBPACK_IMPORTED_MODULE_0__.boardCoordinates)("left"));
  // computerBoardContainer.appendChild(boardCoordinates("top"));
  computerBoardContainer.appendChild((0,_domInteraction__WEBPACK_IMPORTED_MODULE_0__.domRenderBoard)("computerBoard")); // make empty board
  computerBoardContainer.appendChild((0,_domInteraction__WEBPACK_IMPORTED_MODULE_0__.boardCoordinates)("right"));
  computerBoardContainer.appendChild((0,_domInteraction__WEBPACK_IMPORTED_MODULE_0__.boardCoordinates)("bottom"));

  content.appendChild(playerBoardContainer);
  content.appendChild((0,_domInteraction__WEBPACK_IMPORTED_MODULE_0__.boardCoordinates)("middle"));
  const botton = (0,_domInteraction__WEBPACK_IMPORTED_MODULE_0__.axisButton)();
  content.appendChild(botton);

  /////////////////////////////////////////
  content.appendChild(computerBoardContainer);
  /////////////////

  const playerBoardObj = (0,_gameboardFactory__WEBPACK_IMPORTED_MODULE_1__["default"])();
  const computerBoardObj = (0,_gameboardFactory__WEBPACK_IMPORTED_MODULE_1__["default"])();

  /* playerBoardObj.board[1][1] = "missed";
  playerBoardObj.board[1][2] = "missed";
  playerBoardObj.board[1][3] = "missed";
  playerBoardObj.board[1][4] = "missed";
  playerBoardObj.board[1][5] = "missed";
  playerBoardObj.board[1][6] = "missed";

  //
  playerBoardObj.board[1][1] = "missed";
  playerBoardObj.board[2][1] = "missed";
  playerBoardObj.board[3][1] = "missed";
  playerBoardObj.board[4][1] = "missed";
  //
  playerBoardObj.board[1][7] = "missed";
  playerBoardObj.board[2][7] = "missed";
  playerBoardObj.board[3][7] = "missed";
  playerBoardObj.board[4][7] = "missed";
  //

  playerBoardObj.board[5][1] = "missed";
  playerBoardObj.board[5][2] = "missed";
  playerBoardObj.board[5][3] = "missed";
  playerBoardObj.board[5][4] = "missed";
  playerBoardObj.board[5][5] = "missed";
  playerBoardObj.board[5][6] = "missed";
  playerBoardObj.board[5][7] = "missed"; */
  /////////////////////////
  _players__WEBPACK_IMPORTED_MODULE_2__.computer.placeShip(computerBoardObj, 2);
  //console.log(computerBoardObj.fleet);
  const instructions = document.getElementById("instructions");
  instructions.innerText = "Coloca tu bote de patrulla";

  await _players__WEBPACK_IMPORTED_MODULE_2__.player.placeShip(2, "playerBoard", playerBoardObj);
  (0,_domInteraction__WEBPACK_IMPORTED_MODULE_0__.domPopulateBoard)(playerBoardObj, "#playerBoard", true);

  _players__WEBPACK_IMPORTED_MODULE_2__.computer.placeShip(computerBoardObj, 3);
  //console.log(computerBoardObj.fleet);
  instructions.innerText = "Coloca tu destructor";
  await _players__WEBPACK_IMPORTED_MODULE_2__.player.placeShip(3, "playerBoard", playerBoardObj);
  (0,_domInteraction__WEBPACK_IMPORTED_MODULE_0__.domPopulateBoard)(playerBoardObj, "#playerBoard", true);

  _players__WEBPACK_IMPORTED_MODULE_2__.computer.placeShip(computerBoardObj, 3);
  //console.log(computerBoardObj.fleet);
  instructions.innerText = "Coloca tu submarino";
  await _players__WEBPACK_IMPORTED_MODULE_2__.player.placeShip(3, "playerBoard", playerBoardObj);
  (0,_domInteraction__WEBPACK_IMPORTED_MODULE_0__.domPopulateBoard)(playerBoardObj, "#playerBoard", true);

  _players__WEBPACK_IMPORTED_MODULE_2__.computer.placeShip(computerBoardObj, 4);
  //console.log(computerBoardObj.fleet);
  instructions.innerText = "Coloca tu nave de batalla";
  await _players__WEBPACK_IMPORTED_MODULE_2__.player.placeShip(4, "playerBoard", playerBoardObj);
  (0,_domInteraction__WEBPACK_IMPORTED_MODULE_0__.domPopulateBoard)(playerBoardObj, "#playerBoard", true);

  _players__WEBPACK_IMPORTED_MODULE_2__.computer.placeShip(computerBoardObj, 5);
  //console.log(computerBoardObj.fleet);
  instructions.innerText = "Coloca tu carguero";
  await _players__WEBPACK_IMPORTED_MODULE_2__.player.placeShip(5, "playerBoard", playerBoardObj);
  (0,_domInteraction__WEBPACK_IMPORTED_MODULE_0__.domPopulateBoard)(playerBoardObj, "#playerBoard", true);

  //3-  We’ll leave the HTML implementation up to you for now, but you should display both the player’s boards and render them using information from the Gameboard class.

  /* domPopulateBoard(playerBoardObj, "#playerBoard");
  domPopulateBoard(computerBoardObj, "#computerBoard", false); */

  // -3-1 You need methods to render the gameboards /done/ and to take user input for attacking/done/. For attacks, let the user click on a coordinate in the enemy Gameboard.
  //-4 The game loop should step through the game turn by turn using only methods from other objects. If at any point you are tempted to write a new function inside the game loop, step back and figure out which class or module that function should belong to.

  //display message !!!
  instructions.style.display = "none";

  computerBoardContainer.style.display = "grid";
  botton.remove();
  await (0,_domInteraction__WEBPACK_IMPORTED_MODULE_0__.message)("Empieza la batalla...");

  for (
    let turn = 1;
    //Create conditions so that the game ends once one players ships have all been sunk. This function is appropriate for the Game module.
    computerBoardObj.isGameOver() === false &&
    playerBoardObj.isGameOver() === false;
    turn++
  ) {
    var audio = new Audio("./shoot.mp3");
    await (0,_domInteraction__WEBPACK_IMPORTED_MODULE_0__.message)("Esperando ordenes capitan!");
    await _players__WEBPACK_IMPORTED_MODULE_2__.player.attack(computerBoardObj);
    audio.play();
    (0,_domInteraction__WEBPACK_IMPORTED_MODULE_0__.domPopulateBoard)(computerBoardObj, "#computerBoard", false);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    await (0,_domInteraction__WEBPACK_IMPORTED_MODULE_0__.message)("Ataque enemigo aproximandoce");

    audio.play();
    _players__WEBPACK_IMPORTED_MODULE_2__.computer.attack(playerBoardObj);
    (0,_domInteraction__WEBPACK_IMPORTED_MODULE_0__.domPopulateBoard)(playerBoardObj, "#playerBoard");
    await new Promise((resolve) => setTimeout(resolve, 1000));
  }

  alert("game over");
}




/***/ }),

/***/ "./src/gameboardFactory.js":
/*!*********************************!*\
  !*** ./src/gameboardFactory.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _shipFactory__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./shipFactory */ "./src/shipFactory.js");


function gameboardFactory() {
  let board = [[], [], [], [], [], [], [], [], [], []];
  let fleet = {};

  const placeShip = function (length, x, y) {
    let currentShip;
    switch (length) {
      case 5:
        {
          fleet.carrier = (0,_shipFactory__WEBPACK_IMPORTED_MODULE_0__["default"])(length);
          currentShip = "carrier";
        }
        break;
      case 4:
        {
          fleet.battleship = (0,_shipFactory__WEBPACK_IMPORTED_MODULE_0__["default"])(length);
          currentShip = "battleship";
        }
        break;
      case 3:
        {
          if (!fleet.destroyer) {
            fleet.destroyer = (0,_shipFactory__WEBPACK_IMPORTED_MODULE_0__["default"])(length);
            currentShip = "destroyer";
          } else {
            fleet.submarine = (0,_shipFactory__WEBPACK_IMPORTED_MODULE_0__["default"])(length);
            currentShip = "submarine";
          }
        }

        break;

      case 2:
        {
          fleet.patrolBoat = (0,_shipFactory__WEBPACK_IMPORTED_MODULE_0__["default"])(length);
          currentShip = "patrolBoat";
        }

        break;
    }

    for (let i = 0; i < length; i++) {
      board[y][+x + i] = {
        destroyed: false,

        hit: function () {
          fleet[currentShip].hit();
          this.destroyed = true;
        },
      };
    }
    console.log(fleet);
  };

  const placeShipVertically = function (length, x, y) {
    let currentShip;
    switch (length) {
      case 5:
        {
          fleet.carrier = (0,_shipFactory__WEBPACK_IMPORTED_MODULE_0__["default"])(length);
          currentShip = "carrier";
        }
        break;
      case 4:
        {
          fleet.battleship = (0,_shipFactory__WEBPACK_IMPORTED_MODULE_0__["default"])(length);
          currentShip = "battleship";
        }
        break;
      case 3:
        {
          if (!fleet.destroyer) {
            fleet.destroyer = (0,_shipFactory__WEBPACK_IMPORTED_MODULE_0__["default"])(length);
            currentShip = "destroyer";
          } else {
            fleet.submarine = (0,_shipFactory__WEBPACK_IMPORTED_MODULE_0__["default"])(length);
            currentShip = "submarine";
          }
        }
        //fleet.submarine = shipFactory(length);
        break;

      case 2:
        {
          fleet.patrolBoat = (0,_shipFactory__WEBPACK_IMPORTED_MODULE_0__["default"])(length);
          currentShip = "patrolBoat";
        }

        break;
    }

    for (let i = 0; i < length; i++) {
      board[+y + i][x] = {
        destroyed: false,

        hit: function () {
          fleet[currentShip].hit();
          this.destroyed = true;
        },
      };
    }
    console.log(fleet);
  };

  const reciveAttack = (x, y) => {
    if (typeof board[y][x] === "object") {
      if (board[y][x].destroyed === false) {
        board[y][x].hit();
        return "hit";
      } else if (board[y][x].destroyed === true) {
        return "repetido";
      }
    } else if (board[y][x] === undefined) {
      board[y][x] = "missed";

      return "missed";
    } else if (board[y][x] === "missed") {
      return "repetido";
    }
  };

  const attackResultOnly = (x, y) => {
    if (typeof board[y][x] === "object") {
      if (board[y][x].destroyed === false) {
        return "hit";
      } else if (board[y][x].destroyed === true) {
        return "repetido";
      }
    } else if (board[y][x] === undefined) {
      return "missed";
    } else if (board[y][x] === "missed") {
      return "repetido";
    }
  };
  //for placing
  const willFollowRules = function (length, x, y) {
    const willOverlap = function (length, x, y) {
      for (let i = 0; i < length; i++) {
        console.log(y);
        if (typeof board[y][+x + i] === "object") {
          return true;
        }
      }
      return false;
    };

    const willOverflow = function (length, x) {
      if (length + +x > 10) {
        return true;
      } else return false;
    };
    if (!willOverlap(length, x, y) && !willOverflow(length, x)) {
      return true;
    } else {
      return false;
    }
  };

  //for placing
  const willFollowRulesVertically = function (length, x, y) {
    const willOverlap = function (length, x, y) {
      for (let i = 0; i < length; i++) {
        if (typeof board[+y + i][x] === "object") {
          return true;
        }
      }
      return false;
    };

    const willOverflow = function (length, y) {
      console.log(length + +y > 10);
      if (length + +y > 10) {
        return true;
      } else return false;
    };
    if (!willOverflow(length, y)) {
      if (!willOverlap(length, x, y)) {
        return true;
      } else {
        return false;
      }
    }
  };

  const isGameOver = function () {
    return (
      this.fleet.carrier.isSunk() &&
      this.fleet.patrolBoat.isSunk() &&
      this.fleet.destroyer.isSunk() &&
      this.fleet.battleship.isSunk() &&
      this.fleet.submarine.isSunk()
    );
  };

  return {
    attackResultOnly,
    board,
    fleet,
    placeShip,
    placeShipVertically,
    willFollowRules,
    reciveAttack,
    isGameOver,
    willFollowRulesVertically,
  };
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (gameboardFactory);


/***/ }),

/***/ "./src/players.js":
/*!************************!*\
  !*** ./src/players.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "computer": () => (/* binding */ computer),
/* harmony export */   "player": () => (/* binding */ player)
/* harmony export */ });
/* harmony import */ var _ai__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ai */ "./src/ai.js");
/* harmony import */ var _domInteraction__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./domInteraction */ "./src/domInteraction.js");



let computer = {
  ai: _ai__WEBPACK_IMPORTED_MODULE_0__.ai,

  attack: function (playerBoardObj) {
    //if reverseMode is true
    //check to see if the oposite direction of the followDirection/firstDirection is in the firstValidMoves array{
    //if it is chage the chaseSubject and the followDirection}
    //else dont do anithing (the next attack will be random)
    //after any of the two, disable the reverseMode because it is only a modifier and it should not run on every attack of the reversed chase
    // and enable the wasReverseActivated, becasue the reverseMode should no be used a second time on the same subject
    if (this.ai.chaseMode.reverseMode) {
      let oposite = undefined;
      switch (this.ai.chaseMode.firstDirection) {
        case "left":
          {
            oposite = "right";
          }
          break;
        case "right":
          {
            oposite = "left";
          }
          break;
        case "top":
          {
            oposite = "bottom";
          }
          break;
        case "bottom":
          {
            oposite = "top";
          }
          break;
      }
      if (this.ai.chaseMode.firstValidMoves.includes(oposite)) {
        this.ai.chaseMode.chaseSubject = this.ai.chaseMode.firstChaseSubject;
        this.ai.chaseMode.state = true;
        this.ai.chaseMode.followDirection = oposite;
        this.ai.chaseMode.isChasing = true;
        //attack oposite direction of chaseSubject
        //get coordinates of" oposite "of chaseSUbject
      }
      this.ai.chaseMode.reverseMode = false;
      this.ai.chaseMode.wasReverseActivated = true;
    }

    if (this.ai.chaseMode.state === true) {
      this.ai.addValidDirections(playerBoardObj);
      this.ai.attack(playerBoardObj);
    } else {
      const x = this.randomIntFromInterval(0, 9);
      const y = this.randomIntFromInterval(0, 9);
      //alert("random direction by computer.attack");
      switch (playerBoardObj.reciveAttack(x, y)) {
        case "hit":
          {
            this.ai.chaseMode.state = true;
            this.ai.chaseMode.chaseSubject.x = x;
            this.ai.chaseMode.firstChaseSubject.x = x;
            this.ai.chaseMode.chaseSubject.y = y;
            this.ai.chaseMode.firstChaseSubject.y = y;
          }
          break;
        case "missed":
          {
            console.log("computer missed");
          }
          break;
        case "repetido":
          {
            computer.attack(playerBoardObj);
          }
          break;
      }
    }
  },
  placeShip: function (computerBoardObj, length) {
    if (this.randomIntFromInterval(0, 1) === 0) {
      //placeship horizontally
      const x = this.randomIntFromInterval(0, 9);
      const y = this.randomIntFromInterval(0, 9);
      if (computerBoardObj.willFollowRules(length, x, y)) {
        computerBoardObj.placeShip(length, x, y);
      } else {
        this.placeShip(computerBoardObj, length);
      }
    } else {
      //placeship vertically
      const x = this.randomIntFromInterval(0, 9);
      const y = this.randomIntFromInterval(0, 9);
      if (computerBoardObj.willFollowRulesVertically(length, x, y)) {
        computerBoardObj.placeShipVertically(length, x, y);
      } else {
        this.placeShip(computerBoardObj, length);
      }
    }
  },
  randomIntFromInterval: function (min, max) {
    // min and max included

    return Math.floor(Math.random() * (max - min + 1) + min);
  },
};

let player = {
  attack: function (computerBoardObj) {
    console.log("playerAttack function");
    return new Promise(function asd(resolve) {
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

            switch (computerBoardObj.reciveAttack(x, y)) {
              case "hit":
                {
                  resolve();
                }
                break;
              case "missed":
                {
                  resolve();
                }
                break;
              case "repetido":
                {
                  console.log("repetido intenta denuevo");
                  asd(resolve);
                }
                break;
            }
          }
        },

        { once: true }
      );
    });
  },
  placeShip: function (length, playerBoardId, playerBoardObj) {
    return new Promise(function asd(resolve) {
      const playerBoard = document.getElementById(playerBoardId);
      playerBoard.addEventListener(
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
            console.log(e.target);

            const axisButton = document.getElementById("axis-button");
            if (axisButton.dataset.direction === "horizontal") {
              if (playerBoardObj.willFollowRules(length, x, y)) {
                playerBoardObj.placeShip(length, x, y);
                //dom function to display and image of the ship
                (0,_domInteraction__WEBPACK_IMPORTED_MODULE_1__.domPlaceShipImg)(length, x, y, playerBoardObj);
                resolve();
              } else {
                asd(resolve);
              }
            } else if (axisButton.dataset.direction === "vertical") {
              if (playerBoardObj.willFollowRulesVertically(length, x, y)) {
                playerBoardObj.placeShipVertically(length, x, y);
                (0,_domInteraction__WEBPACK_IMPORTED_MODULE_1__.domPlaceShipImg)(length, x, y, playerBoardObj, true);
                resolve();
              } else {
                asd(resolve);
              }
            }
          }
        },

        { once: true }
      );
    });
  },
};




/***/ }),

/***/ "./src/shipFactory.js":
/*!****************************!*\
  !*** ./src/shipFactory.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
const shipFactory = (length) => {
  let hits = 0;
  const isSunk = function () {
    //console.log(`this.length is:${this.length}`);
    return this.length - this.hits == 0;
  };
  const hit = function () {
    this.hits++;
  };

  return { length, hits, isSunk, hit };
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (shipFactory);


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _gameboardFactory__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./gameboardFactory */ "./src/gameboardFactory.js");
/* harmony import */ var _shipFactory__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./shipFactory */ "./src/shipFactory.js");
/* harmony import */ var _domInteraction__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./domInteraction */ "./src/domInteraction.js");
/* harmony import */ var _gameLoop__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./gameLoop */ "./src/gameLoop.js");





(0,_gameLoop__WEBPACK_IMPORTED_MODULE_3__.gameLoop)();

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFBcUM7O0FBRXJDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQkFBb0IsNEJBQTRCOztBQUVoRDtBQUNBO0FBQ0EseUJBQXlCLDRCQUE0QjtBQUNyRDtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTCxHQUFHOztBQUVIO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVk7QUFDWjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxRQUFRO0FBQ1I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBLG9FQUFvRTtBQUNwRSwrQkFBK0Isb0VBQThCO0FBQzdEO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsUUFBUTtBQUNSO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLDRCQUE0QjtBQUM1Qjs7QUFFQTtBQUNBLE1BQU0scURBQWU7QUFDckI7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxjQUFjO0FBQ2Q7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLHdFQUF3RTs7QUFFeEU7QUFDQTtBQUNBOztBQUVBLDRFQUE0RTtBQUM1RTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDs7QUFFYzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNsVGQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBOztBQUVBO0FBQ0EsNkRBQTZELEdBQUcsVUFBVSxFQUFFO0FBQzVFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtB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QTs7Ozs7V0NQQTs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7Ozs7Ozs7Ozs7OztBQ05rRDtBQUNWO0FBQ3dDO0FBQzFDOztBQUV0QyxtREFBUSIsInNvdXJjZXMiOlsid2VicGFjazovL3Byb2plY3QtYmF0dGxlc2hpcC8uL3NyYy9haS5qcyIsIndlYnBhY2s6Ly9wcm9qZWN0LWJhdHRsZXNoaXAvLi9zcmMvZG9tSW50ZXJhY3Rpb24uanMiLCJ3ZWJwYWNrOi8vcHJvamVjdC1iYXR0bGVzaGlwLy4vc3JjL2dhbWVMb29wLmpzIiwid2VicGFjazovL3Byb2plY3QtYmF0dGxlc2hpcC8uL3NyYy9nYW1lYm9hcmRGYWN0b3J5LmpzIiwid2VicGFjazovL3Byb2plY3QtYmF0dGxlc2hpcC8uL3NyYy9wbGF5ZXJzLmpzIiwid2VicGFjazovL3Byb2plY3QtYmF0dGxlc2hpcC8uL3NyYy9zaGlwRmFjdG9yeS5qcyIsIndlYnBhY2s6Ly9wcm9qZWN0LWJhdHRsZXNoaXAvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vcHJvamVjdC1iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9wcm9qZWN0LWJhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9wcm9qZWN0LWJhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9wcm9qZWN0LWJhdHRsZXNoaXAvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgY29tcHV0ZXIgfSBmcm9tIFwiLi9wbGF5ZXJzXCI7XG5cbmNvbnN0IGFpID0ge1xuICBjaGFzZU1vZGU6IHtcbiAgICB3YXNSZXZlcnNlQWN0aXZhdGVkOiBmYWxzZSxcbiAgICByZXZlcnNlTW9kZTogZmFsc2UsXG4gICAgc3RhdGU6IGZhbHNlLFxuICAgIGNoYXNlU3ViamVjdDogeyB4OiB1bmRlZmluZWQsIHk6IHVuZGVmaW5lZCB9LCAvL3gseVxuXG4gICAgdmFsaWRNb3ZlczogW1wibGVmdFwiLCBcInJpZ2h0XCIsIFwidG9wXCIsIFwiYm90dG9tXCJdLFxuICAgIGZvbGxvd0RpcmVjdGlvbjogdW5kZWZpbmVkLFxuICAgIGZpcnN0Q2hhc2VTdWJqZWN0OiB7IHg6IHVuZGVmaW5lZCwgeTogdW5kZWZpbmVkIH0sIC8vZm9yIHJldmVyc2VkXG4gICAgZmlyc3RWYWxpZE1vdmVzOiBbXSwgLy9mb3IgcmV2ZXJzZWRcbiAgICBmaXJzdERpcmVjdGlvbjogdW5kZWZpbmVkLFxuICAgIGlzQ2hhc2luZzogZmFsc2UsXG4gIH0sXG4gIC8vdGhpcyB3aWxsIG1vZGlmeSB0aGUgYXJyYXkgdmFsaWRNb3Zlc1xuICBhZGRWYWxpZERpcmVjdGlvbnM6IGZ1bmN0aW9uIChwbGF5ZXJCb2FyZE9iaikge1xuICAgIHRoaXMuY2hhc2VNb2RlLnZhbGlkTW92ZXMgPSBbXTtcbiAgICBjb25zdCBwb3NpYmxlRGlyZWN0aW9ucyA9IFtcImxlZnRcIiwgXCJyaWdodFwiLCBcInRvcFwiLCBcImJvdHRvbVwiXTtcblxuICAgIC8vIC8vcmVtb3ZlIGRpcmVjY3Rpb25zIHRoYXQgd2lsbCBiZSBvdXRzaWRlIHRoZSBib2FyZFxuICAgIHN3aXRjaCAodGhpcy5jaGFzZU1vZGUuY2hhc2VTdWJqZWN0LngpIHtcbiAgICAgIGNhc2UgMDpcbiAgICAgICAge1xuICAgICAgICAgIGNvbnN0IGluZGV4ID0gcG9zaWJsZURpcmVjdGlvbnMuaW5kZXhPZihcImxlZnRcIik7XG5cbiAgICAgICAgICBwb3NpYmxlRGlyZWN0aW9ucy5zcGxpY2UoaW5kZXgsIDEpO1xuICAgICAgICB9XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSA5OlxuICAgICAgICB7XG4gICAgICAgICAgY29uc3QgaW5kZXggPSBwb3NpYmxlRGlyZWN0aW9ucy5pbmRleE9mKFwicmlnaHRcIik7XG5cbiAgICAgICAgICBwb3NpYmxlRGlyZWN0aW9ucy5zcGxpY2UoaW5kZXgsIDEpO1xuICAgICAgICB9XG4gICAgICAgIGJyZWFrO1xuICAgIH1cbiAgICBzd2l0Y2ggKHRoaXMuY2hhc2VNb2RlLmNoYXNlU3ViamVjdC55KSB7XG4gICAgICBjYXNlIDA6XG4gICAgICAgIHtcbiAgICAgICAgICBjb25zdCBpbmRleCA9IHBvc2libGVEaXJlY3Rpb25zLmluZGV4T2YoXCJ0b3BcIik7XG5cbiAgICAgICAgICBwb3NpYmxlRGlyZWN0aW9ucy5zcGxpY2UoaW5kZXgsIDEpO1xuICAgICAgICB9XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSA5OlxuICAgICAgICB7XG4gICAgICAgICAgY29uc3QgaW5kZXggPSBwb3NpYmxlRGlyZWN0aW9ucy5pbmRleE9mKFwiYm90dG9tXCIpO1xuXG4gICAgICAgICAgcG9zaWJsZURpcmVjdGlvbnMuc3BsaWNlKGluZGV4LCAxKTtcbiAgICAgICAgfVxuICAgICAgICBicmVhaztcbiAgICB9XG5cbiAgICAvL3JlbW92ZSB0aGUgZGlyZWN0aW9ucyB0aGF0IG5vdCBmb2xsb3cgcnVsZXNcbiAgICAvL29ubHkgaW4gY2hhc2VTdWJqZWN0XG4gICAgcG9zaWJsZURpcmVjdGlvbnMuZm9yRWFjaCgoZGlyZWN0aW9uKSA9PiB7XG4gICAgICBpZiAoXG4gICAgICAgIHBsYXllckJvYXJkT2JqLmF0dGFja1Jlc3VsdE9ubHkoXG4gICAgICAgICAgdGhpcy5jb29yZGluYXRlcyhkaXJlY3Rpb24pLngsXG4gICAgICAgICAgdGhpcy5jb29yZGluYXRlcyhkaXJlY3Rpb24pLnlcbiAgICAgICAgKSAhPT0gXCJyZXBldGlkb1wiXG4gICAgICApIHtcbiAgICAgICAgdGhpcy5jaGFzZU1vZGUudmFsaWRNb3Zlcy5wdXNoKGRpcmVjdGlvbik7XG4gICAgICB9XG4gICAgfSk7XG4gIH0sXG5cbiAgLy9waWNrIGEgZGlyZWN0aW9uXG4gIC8vdGhpcyB3aWxsIHJldHVybiBhIGRpcmVjdGlvblxuXG4gIC8vIGlmIGl0IGhhcyAyIGNvbnNlY3V0aXZlIGhpdHN7XG4gIC8vIGtlZXAgaW4gdGhlIHN1Y2Nlc2Z1bGwgZGlyZWN0aW9uXG4gIC8vaWYgcG9zaWJsZVxuICAvL2lmIG5vdCwgcmV0dXJuIHVuZGVmaW5lZCxhIHJhbmRvbSBkaXJlY3Rpb24gd2lsbCB0cmlnZ2VyIGxhdGVyIGluIHRoZSBjb2RlfVxuICAvL2Vsc2UgaWYgdGhlcmUgd2FzIG9ubHkgMSBoaXQge1xuICAvLyBwaWNrIGEgcmFuZG9tIGRpcmVjdGlvbiBvZiB0aGUgdmFsaWQgZGlyZWN0aW9ucyBhcnJheSwgaWYgdGhlIGFycmF5IGlzIGVtcHR5LCBnbyB0byBhIHJhbmRvbSBkaXJlY3Rpb24gb2YgdGhlIGJvYXJkKGEgcmFuZG9tIGRpcmVjdGlvbiB3aWxsIHRyaWdnZXIgbGF0ZXIgaW4gdGhlIGNvZGUpXG5cbiAgZGlyZWN0aW9uOiBmdW5jdGlvbiAoKSB7XG4gICAgaWYgKHRoaXMuY2hhc2VNb2RlLmlzQ2hhc2luZykge1xuICAgICAgaWYgKCF0aGlzLmNoYXNlTW9kZS53YXNSZXZlcnNlQWN0aXZhdGVkKSB7XG4gICAgICAgIGlmIChcbiAgICAgICAgICAhdGhpcy5jaGFzZU1vZGUudmFsaWRNb3Zlcy5pbmNsdWRlcyh0aGlzLmNoYXNlTW9kZS5mb2xsb3dEaXJlY3Rpb24pXG4gICAgICAgICkge1xuICAgICAgICAgIC8vdGlsbCBoZXJlIHRoZSBsb2dpIGlzIGdyZWF0IVxuXG4gICAgICAgICAgLy9hbGVydChcImEgcmFuZG9tIGF0dGFjayB3aWxsIG9jY3VyICEgQnV0IGl0IHNob3VsZG50ICFcIik7XG4gICAgICAgICAgY29uc29sZS5sb2coXCJhIHJhbmRvbSBhdHRhY2sgd2lsbCBvY2N1ciAhIEJ1dCBpdCBzaG91bGRudCAhXCIpO1xuICAgICAgICAgIC8vYWxlcnQodGhpcy5jaGFzZU1vZGUud2FzUmV2ZXJzZUFjdGl2YXRlZCk7XG4gICAgICAgICAgY29uc29sZS5sb2codGhpcy5jaGFzZU1vZGUud2FzUmV2ZXJzZUFjdGl2YXRlZCk7XG4gICAgICAgICAgLy90cnkgcmV2ZXJzZVxuXG4gICAgICAgICAgbGV0IG9wb3NpdGUgPSB1bmRlZmluZWQ7XG4gICAgICAgICAgc3dpdGNoICh0aGlzLmNoYXNlTW9kZS5mb2xsb3dEaXJlY3Rpb24pIHtcbiAgICAgICAgICAgIGNhc2UgXCJsZWZ0XCI6XG4gICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBvcG9zaXRlID0gXCJyaWdodFwiO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBcInJpZ2h0XCI6XG4gICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBvcG9zaXRlID0gXCJsZWZ0XCI7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIFwidG9wXCI6XG4gICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBvcG9zaXRlID0gXCJib3R0b21cIjtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgXCJib3R0b21cIjpcbiAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIG9wb3NpdGUgPSBcInRvcFwiO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAodGhpcy5jaGFzZU1vZGUuZmlyc3RWYWxpZE1vdmVzLmluY2x1ZGVzKG9wb3NpdGUpKSB7XG4gICAgICAgICAgICAvL3VzZSByZXZlcnNlXG4gICAgICAgICAgICB0aGlzLmNoYXNlTW9kZS53YXNSZXZlcnNlQWN0aXZhdGVkID0gdHJ1ZTtcbiAgICAgICAgICAgIHRoaXMuY2hhc2VNb2RlLmNoYXNlU3ViamVjdCA9IHRoaXMuY2hhc2VNb2RlLmZpcnN0Q2hhc2VTdWJqZWN0O1xuICAgICAgICAgICAgdGhpcy5jaGFzZU1vZGUuZm9sbG93RGlyZWN0aW9uID0gb3Bvc2l0ZTtcbiAgICAgICAgICAgIHJldHVybiBvcG9zaXRlO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAvL2EgcmFuZG9tIGRpcmVjdGlvbiB3aWxsIHRyaWdnZXIgbGF0ZXIgaW4gdGhlIGNvZGVcbiAgICAgICAgICAgIHRoaXMuY2hhc2VNb2RlLnN0YXRlID0gZmFsc2U7XG4gICAgICAgICAgICB0aGlzLmNoYXNlTW9kZS5pc0NoYXNpbmcgPSBmYWxzZTtcbiAgICAgICAgICAgIC8vdGhpcy5jaGFzZU1vZGUud2FzUmV2ZXJzZUFjdGl2YXRlZCA9IGZhbHNlXG4gICAgICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIGlmICh0aGlzLmNoYXNlTW9kZS5pc0NoYXNpbmcpIHtcbiAgICAgIGlmICh0aGlzLmNoYXNlTW9kZS53YXNSZXZlcnNlQWN0aXZhdGVkKSB7XG4gICAgICAgIGlmIChcbiAgICAgICAgICAhdGhpcy5jaGFzZU1vZGUudmFsaWRNb3Zlcy5pbmNsdWRlcyh0aGlzLmNoYXNlTW9kZS5mb2xsb3dEaXJlY3Rpb24pXG4gICAgICAgICkge1xuICAgICAgICAgIHRoaXMuY2hhc2VNb2RlLndhc1JldmVyc2VBY3RpdmF0ZWQgPSBmYWxzZTtcbiAgICAgICAgICAvL2FsZXJ0KFwidGhpcyBzaG91bGQgdHJpZ2dlciBhIHJhbmRvbSBkaXJlY3Rpb24gYnV0IGl0IGRvZXNudCAhXCIpO1xuICAgICAgICAgIGNvbnNvbGUubG9nKFwidGhpcyBzaG91bGQgdHJpZ2dlciBhIHJhbmRvbSBkaXJlY3Rpb24gYnV0IGl0IGRvZXNudCAhXCIpO1xuICAgICAgICAgIC8vYWxlcnQodGhpcy5jaGFzZU1vZGUud2FzUmV2ZXJzZUFjdGl2YXRlZCk7XG4gICAgICAgICAgY29uc29sZS5sb2codGhpcy5jaGFzZU1vZGUud2FzUmV2ZXJzZUFjdGl2YXRlZCk7XG4gICAgICAgICAgLy9hIHJhbmRvbSBkaXJlY3Rpb24gd2lsbCB0cmlnZ2VyIGxhdGVyIGluIHRoZSBjb2RlXG4gICAgICAgICAgdGhpcy5jaGFzZU1vZGUuc3RhdGUgPSBmYWxzZTtcbiAgICAgICAgICB0aGlzLmNoYXNlTW9kZS5pc0NoYXNpbmcgPSBmYWxzZTtcbiAgICAgICAgICAvL3RoaXMuY2hhc2VNb2RlLndhc1JldmVyc2VBY3RpdmF0ZWQgPSBmYWxzZVxuXG4gICAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIGlmICh0aGlzLmNoYXNlTW9kZS5pc0NoYXNpbmcpIHtcbiAgICAgIGlmICh0aGlzLmNoYXNlTW9kZS52YWxpZE1vdmVzLmluY2x1ZGVzKHRoaXMuY2hhc2VNb2RlLmZvbGxvd0RpcmVjdGlvbikpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY2hhc2VNb2RlLmZvbGxvd0RpcmVjdGlvbjtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8vYSByYW5kb20gZGlyZWN0aW9uIHdpbGwgdHJpZ2dlciBsYXRlciBpbiB0aGUgY29kZVxuICAgICAgICB0aGlzLmNoYXNlTW9kZS5zdGF0ZSA9IGZhbHNlO1xuICAgICAgICB0aGlzLmNoYXNlTW9kZS5pc0NoYXNpbmcgPSBmYWxzZTtcbiAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKHRoaXMuY2hhc2VNb2RlLmlzQ2hhc2luZyA9PT0gZmFsc2UpIHtcbiAgICAgIGlmICh0aGlzLmNoYXNlTW9kZS52YWxpZE1vdmVzLmxlbmd0aCA+PSAxKSB7XG4gICAgICAgIHRoaXMuY2hhc2VNb2RlLmZpcnN0VmFsaWRNb3ZlcyA9IHRoaXMuY2hhc2VNb2RlLnZhbGlkTW92ZXM7IC8vdGhpcyBpcyBmb3IgcmV2ZXJzZSBtb2RlIGxhdGVyXG4gICAgICAgIGNvbnN0IGRpcmVjdGlvbkluZGV4ID0gY29tcHV0ZXIucmFuZG9tSW50RnJvbUludGVydmFsKFxuICAgICAgICAgIDAsXG4gICAgICAgICAgdGhpcy5jaGFzZU1vZGUudmFsaWRNb3Zlcy5sZW5ndGggLSAxXG4gICAgICAgICk7XG4gICAgICAgIGNvbnN0IGRpcmVjdGlvbiA9IHRoaXMuY2hhc2VNb2RlLnZhbGlkTW92ZXNbZGlyZWN0aW9uSW5kZXhdO1xuXG4gICAgICAgIHJldHVybiBkaXJlY3Rpb247XG4gICAgICB9IGVsc2UgaWYgKHRoaXMuY2hhc2VNb2RlLnZhbGlkTW92ZXMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgIHRoaXMuY2hhc2VNb2RlLnN0YXRlID0gZmFsc2U7XG4gICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgICB9XG4gICAgfVxuICB9LFxuICAvL3RyYW5zZm9ybSBkaXJlY3Rpb24gaW50byBjb29yZGluYXRlXG4gIC8vdGhpcyB3aWxsIHJldHVybiBhIGNvb3JkaW5hdGVcbiAgLy8ge3gseX1cbiAgY29vcmRpbmF0ZXM6IGZ1bmN0aW9uIChkaXJlY3Rpb24pIHtcbiAgICBpZiAoZGlyZWN0aW9uID09PSB1bmRlZmluZWQpIHtcbiAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgfVxuXG4gICAgc3dpdGNoIChkaXJlY3Rpb24pIHtcbiAgICAgIGNhc2UgXCJsZWZ0XCI6IHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICB4OiB0aGlzLmNoYXNlTW9kZS5jaGFzZVN1YmplY3QueCAtIDEsXG4gICAgICAgICAgeTogdGhpcy5jaGFzZU1vZGUuY2hhc2VTdWJqZWN0LnksXG4gICAgICAgIH07XG4gICAgICB9XG5cbiAgICAgIGNhc2UgXCJyaWdodFwiOiB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgeDogdGhpcy5jaGFzZU1vZGUuY2hhc2VTdWJqZWN0LnggKyAxLFxuICAgICAgICAgIHk6IHRoaXMuY2hhc2VNb2RlLmNoYXNlU3ViamVjdC55LFxuICAgICAgICB9O1xuICAgICAgfVxuXG4gICAgICBjYXNlIFwidG9wXCI6XG4gICAgICAgIHtcbiAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgeDogdGhpcy5jaGFzZU1vZGUuY2hhc2VTdWJqZWN0LngsXG4gICAgICAgICAgICB5OiB0aGlzLmNoYXNlTW9kZS5jaGFzZVN1YmplY3QueSAtIDEsXG4gICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgXCJib3R0b21cIjoge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIHg6IHRoaXMuY2hhc2VNb2RlLmNoYXNlU3ViamVjdC54LFxuICAgICAgICAgIHk6IHRoaXMuY2hhc2VNb2RlLmNoYXNlU3ViamVjdC55ICsgMSxcbiAgICAgICAgfTtcbiAgICAgIH1cbiAgICB9XG4gIH0sXG5cbiAgLy91c2UgdGhlIG5ldyBjb29yZGluYXRlIGFuZCBkaXJlY3Rpb25cblxuICAvL2lmIG5vIGRpcmVjdGlvbiB3YXMgc2VsZWN0ZWRcbiAgLy9hdHRhY2sgYSByYW5kb20gcG9zaXRpb24gb24gdGhlIGJvYXJkXG5cbiAgLy9pZiBhIGRpcmVjdGlvbiB3YXMgc2VsZWN0ZWRcbiAgLy90aGVyZSBhcmUgMiBicmFuY2hlc1xuXG4gIC8vZmlyc3QgaWYgaXNDaGFzaW5cbiAgLy9hbmQgaGl0cyB0aGVuIHVwZGF0ZSB0aGUgY2hhc2Ugc3ViamVjdFxuXG4gIC8vIGlmIG1pc3NlcyBhbmQgaXQgaXMgIGluIHJldmVyc2VNb2RlXG4gIC8vIGRpc2FibGUgY2hhc2VlTW9kZSBhbmQgaXRzIG1vZGVzXG5cbiAgLy9pZiBpdCB3YXMgbm90IGluIHJldmVyc2UgbW9kZVxuICAvLyBlbmFibGUgcmV2ZXJzZU1vZGVcbiAgLy9cbiAgYXR0YWNrOiBmdW5jdGlvbiAocGxheWVyQm9hcmRPYmopIHtcbiAgICAvL3NhdmUgZGlyZWN0aW9uXG4gICAgY29uc3QgZGlyZWN0aW9uID0gdGhpcy5kaXJlY3Rpb24oKTtcblxuICAgIC8vc2F2ZSBjb29yZGluYXRlc1xuICAgIGNvbnN0IGNvb3JkaW5hdGVzID0gdGhpcy5jb29yZGluYXRlcyhkaXJlY3Rpb24pO1xuXG4gICAgLy9pZiB0aGUgZGlyZWN0aW9ucyBtZXRob2QgZGluZHQgcmV0dXJuIGFueSBkaXJlY3Rpb24sIGhlbmNlIGNvb3JkaW5hdGVzIHdpbGwgcmV0dXJuIHVuZGVmaW5lZFxuICAgIC8vaWYgbm8gaW4gcmV2ZXJzZSBtb2Rle2F0dGFjayBpbiBhIHJhbmRvbSBkaXJlY3Rpb259XG4gICAgLy9lbHNle31cblxuICAgIGlmIChjb29yZGluYXRlcyA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICBjb21wdXRlci5hdHRhY2socGxheWVyQm9hcmRPYmopO1xuICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5jaGFzZU1vZGUuaXNDaGFzaW5nKSB7XG4gICAgICBzd2l0Y2ggKHBsYXllckJvYXJkT2JqLnJlY2l2ZUF0dGFjayhjb29yZGluYXRlcy54LCBjb29yZGluYXRlcy55KSkge1xuICAgICAgICBjYXNlIFwiaGl0XCI6XG4gICAgICAgICAge1xuICAgICAgICAgICAgLy91cGRhdGUgY2hhc2Ugc3ViamVjdFxuICAgICAgICAgICAgdGhpcy5jaGFzZU1vZGUuY2hhc2VTdWJqZWN0ID0gY29vcmRpbmF0ZXM7XG4gICAgICAgICAgfVxuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIFwibWlzc2VkXCI6XG4gICAgICAgICAge1xuICAgICAgICAgICAgLy9pZiByZXZlcnNlIG1vZGUgd2FzIG5vdCBpbiBhY3RpdmF0ZWR7XG4gICAgICAgICAgICAvL3N0YXJ0IHJldmVyc2VNb2RlfVxuICAgICAgICAgICAgLy8vaWYgaXQgd2Fze1xuICAgICAgICAgICAgLy9lbmQgY2hhc2luTW9kZSBhbmQgaXRzIG1vZGVzfVxuXG4gICAgICAgICAgICBpZiAodGhpcy5jaGFzZU1vZGUud2FzUmV2ZXJzZUFjdGl2YXRlZCAhPT0gdHJ1ZSkge1xuICAgICAgICAgICAgICB0aGlzLmNoYXNlTW9kZS5yZXZlcnNlTW9kZSA9IHRydWU7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICB0aGlzLmNoYXNlTW9kZS5zdGF0ZSA9IGZhbHNlO1xuICAgICAgICAgICAgICB0aGlzLmNoYXNlTW9kZS5pc0NoYXNpbmcgPSBmYWxzZTtcblxuICAgICAgICAgICAgICB0aGlzLmNoYXNlTW9kZS5mb2xsb3dEaXJlY3Rpb24gPSB1bmRlZmluZWQ7XG4gICAgICAgICAgICAgIHRoaXMuY2hhc2VNb2RlLndhc1JldmVyc2VBY3RpdmF0ZWQgPSBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfSBlbHNlIGlmICh0aGlzLmNoYXNlTW9kZS5pc0NoYXNpbmcgPT09IGZhbHNlKSB7XG4gICAgICBzd2l0Y2ggKHBsYXllckJvYXJkT2JqLnJlY2l2ZUF0dGFjayhjb29yZGluYXRlcy54LCBjb29yZGluYXRlcy55KSkge1xuICAgICAgICBjYXNlIFwiaGl0XCI6XG4gICAgICAgICAge1xuICAgICAgICAgICAgLy91cGRhdGUgdGhlIGNoYXNlIHN1YmplY3RcbiAgICAgICAgICAgIHRoaXMuY2hhc2VNb2RlLmNoYXNlU3ViamVjdCA9IGNvb3JkaW5hdGVzO1xuXG4gICAgICAgICAgICAvL3NhdmUgdmFsaWQgbW92ZXMgb2YgdGhlIGZpcnN0IGNoYXNlIHN1YmplY3RcbiAgICAgICAgICAgIHRoaXMuY2hhc2VNb2RlLmZpcnN0VmFsaWRNb3ZlcyA9IHRoaXMuY2hhc2VNb2RlLnZhbGlkTW92ZXM7IC8vZm9yIHJldmVyc2UgIVxuXG4gICAgICAgICAgICAvL3N0YXJ0IGEgY2hhc2luZyBkaXJlY3Rpb25cbiAgICAgICAgICAgIHRoaXMuY2hhc2VNb2RlLmZvbGxvd0RpcmVjdGlvbiA9IGRpcmVjdGlvbjtcbiAgICAgICAgICAgIHRoaXMuY2hhc2VNb2RlLmlzQ2hhc2luZyA9IHRydWU7XG5cbiAgICAgICAgICAgIHRoaXMuY2hhc2VNb2RlLmZpcnN0RGlyZWN0aW9uID0gdGhpcy5jaGFzZU1vZGUuZm9sbG93RGlyZWN0aW9uOyAvLyBmb3IgcmV2ZXJzZWRcbiAgICAgICAgICB9XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgXCJtaXNzZWRcIjpcbiAgICAgICAgICB7XG4gICAgICAgICAgICAvL2l0IGlzIG5vdCBuZWNlc2FyeSB0byBkbyBhbnl0aGluZyBoZXJlIGJlY2F1c2UgdGhlIGFpIHdpbGwga2VlcCB0cnlpbmcgdW50aWwgaXQgZ2V0cyBhIGhpdFxuICAgICAgICAgICAgLy8gYW5kIGV2ZXJ5IG1pc3MgaXMgcmVtb3ZlZCBmcm9tIHRoZSB2YWxpZCBkaXJlY3Rpb25zIGFycmF5XG4gICAgICAgICAgfVxuICAgICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH1cbiAgfSxcbn07XG5cbmV4cG9ydCB7IGFpIH07XG4iLCJmdW5jdGlvbiBheGlzQnV0dG9uKCkge1xuICBjb25zdCBheGlzQnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcbiAgYXhpc0J1dHRvbi50eXBlID0gXCJidXR0b25cIjtcbiAgYXhpc0J1dHRvbi5zZXRBdHRyaWJ1dGUoXCJkYXRhLWRpcmVjdGlvblwiLCBcImhvcml6b250YWxcIik7XG4gIGF4aXNCdXR0b24uaWQgPSBcImF4aXMtYnV0dG9uXCI7XG4gIGF4aXNCdXR0b24uaW5uZXJUZXh0ID0gXCJEaXJlY2Npb246IGhvcml6b250YWxcIjtcblxuICBheGlzQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgaWYgKGF4aXNCdXR0b24uZGF0YXNldC5kaXJlY3Rpb24gPT09IFwiaG9yaXpvbnRhbFwiKSB7XG4gICAgICBheGlzQnV0dG9uLmRhdGFzZXQuZGlyZWN0aW9uID0gXCJ2ZXJ0aWNhbFwiO1xuICAgICAgYXhpc0J1dHRvbi5pbm5lclRleHQgPSBcIkRpcmVjY2lvbjogdmVydGljYWxcIjtcbiAgICB9IGVsc2Uge1xuICAgICAgYXhpc0J1dHRvbi5kYXRhc2V0LmRpcmVjdGlvbiA9IFwiaG9yaXpvbnRhbFwiO1xuICAgICAgYXhpc0J1dHRvbi5pbm5lclRleHQgPSBcIkRpcmVjY2lvbjogaG9yaXpvbnRhbFwiO1xuICAgIH1cbiAgfSk7XG4gIHJldHVybiBheGlzQnV0dG9uO1xufVxuXG5mdW5jdGlvbiBkb21QbGFjZVNoaXBJbWcobGVuZ3RoLCB4LCB5LCBwbGF5ZXJCb2FyZE9iaiwgaXN2ZXJ0aWNhbCA9IGZhbHNlKSB7XG4gIGNvbnN0IGNvbHVtbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYCNwbGF5ZXJCb2FyZCAucm93LSR7eX0gLmNvbHVtbi0ke3h9YCk7XG4gIGNvbnN0IGltZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpbWdcIik7XG4gIGltZy5jbGFzc0xpc3QuYWRkKFwic2hpcFwiKTtcbiAgbGV0IHNoaXA7XG4gIGlmIChpc3ZlcnRpY2FsKSB7XG4gICAgaW1nLmNsYXNzTGlzdC5hZGQoXCJ2ZXJ0aWNhbFwiKTtcbiAgfVxuICBzd2l0Y2ggKGxlbmd0aCkge1xuICAgIGNhc2UgMjpcbiAgICAgIHtcbiAgICAgICAgc2hpcCA9IFwicGF0cm9sQm9hdFwiO1xuICAgICAgICBpbWcuaWQgPSBcInBhdHJvbC1ib2F0XCI7XG4gICAgICB9XG4gICAgICBicmVhaztcbiAgICBjYXNlIDM6XG4gICAgICB7XG4gICAgICAgIGlmICghcGxheWVyQm9hcmRPYmouZmxlZXQuc3VibWFyaW5lKSB7XG4gICAgICAgICAgc2hpcCA9IFwiZGVzdHJveWVyXCI7XG4gICAgICAgICAgaW1nLmlkID0gc2hpcDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBzaGlwID0gXCJzdWJtYXJpbmVcIjtcbiAgICAgICAgICBpbWcuaWQgPSBzaGlwO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBicmVhaztcbiAgICBjYXNlIDQ6XG4gICAgICB7XG4gICAgICAgIHNoaXAgPSBcImJhdHRsZXNoaXBcIjtcbiAgICAgICAgaW1nLmlkID0gc2hpcDtcbiAgICAgIH1cbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgNTpcbiAgICAgIHtcbiAgICAgICAgc2hpcCA9IFwiY2FycmllclwiO1xuICAgICAgICBpbWcuaWQgPSBzaGlwO1xuICAgICAgfVxuICAgICAgYnJlYWs7XG4gIH1cbiAgaW1nLnNyYyA9IGAuLyR7c2hpcH0uc3ZnYDtcblxuICBjb2x1bW4uYXBwZW5kQ2hpbGQoaW1nKTtcbn1cblxuLyogZnVuY3Rpb24gbWVzc2FnZShtZXNzYWdlQm9keSkge1xuICBjb25zdCBjb250ZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJjb250ZW50XCIpO1xuICBjb25zdCBkaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICBkaXYuY2xhc3NMaXN0LmFkZChcIm1lc3NhZ2VcIik7XG4gIGRpdi5pbm5lclRleHQgPSBtZXNzYWdlQm9keTtcbiAgY29udGVudC5hcHBlbmRDaGlsZChkaXYpO1xuICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICBkaXYucmVtb3ZlKCk7XG4gIH0sIDEwMDApO1xufVxuICovXG5mdW5jdGlvbiBtZXNzYWdlKG1lc3NhZ2VCb2R5KSB7XG4gIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSkgPT4ge1xuICAgIGNvbnN0IGNvbnRlbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImNvbnRlbnRcIik7XG4gICAgY29uc3QgZGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICBkaXYuY2xhc3NMaXN0LmFkZChcIm1lc3NhZ2VcIik7XG4gICAgZGl2LmlubmVyVGV4dCA9IG1lc3NhZ2VCb2R5O1xuICAgIGNvbnRlbnQuYXBwZW5kQ2hpbGQoZGl2KTtcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIGRpdi5yZW1vdmUoKTtcbiAgICAgIHJlc29sdmUoKTtcbiAgICB9LCAxNTAwKTtcbiAgfSk7XG59XG5cbmZ1bmN0aW9uIGJvYXJkQ29vcmRpbmF0ZXMocG9zaXRpb24pIHtcbiAgbGV0IGNlbGxDb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICBjZWxsQ29udGFpbmVyLmNsYXNzTGlzdC5hZGQoXCJjZWxsLWNvbnRhaW5lclwiKTtcblxuICBjZWxsQ29udGFpbmVyLmNsYXNzTGlzdC5hZGQocG9zaXRpb24pO1xuICBmb3IgKGxldCBpID0gMDsgaSA8IDEwOyBpKyspIHtcbiAgICBjb25zdCBjZWxsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICBjZWxsLmlubmVyVGV4dCA9IGk7XG4gICAgY2VsbC5jbGFzc0xpc3QuYWRkKFwiY2VsbFwiKTtcblxuICAgIGNlbGxDb250YWluZXIuYXBwZW5kQ2hpbGQoY2VsbCk7XG4gIH1cbiAgcmV0dXJuIGNlbGxDb250YWluZXI7XG59XG5cbmZ1bmN0aW9uIGRvbVJlbmRlckJvYXJkKGlkKSB7XG4gIGNvbnN0IGJvYXJkID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgYm9hcmQuaWQgPSBpZDtcbiAgYm9hcmQuY2xhc3NMaXN0LmFkZChcImJvYXJkXCIpO1xuICBmb3IgKGxldCByID0gMDsgciA8IDEwOyByKyspIHtcbiAgICBjb25zdCByb3cgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgIHJvdy5jbGFzc0xpc3QuYWRkKGByb3ctJHtyfWAsIFwicm93XCIpO1xuICAgIHJvdy5kYXRhc2V0LnkgPSByO1xuXG4gICAgZm9yIChsZXQgYyA9IDA7IGMgPCAxMCA+IDA7IGMrKykge1xuICAgICAgY29uc3QgY29sdW1uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcblxuICAgICAgY29sdW1uLmNsYXNzTGlzdC5hZGQoYGNvbHVtbi0ke2N9YCwgXCJjb2x1bW5cIik7XG4gICAgICBjb2x1bW4uZGF0YXNldC54ID0gYztcbiAgICAgIHJvdy5hcHBlbmRDaGlsZChjb2x1bW4pO1xuICAgIH1cbiAgICBib2FyZC5hcHBlbmRDaGlsZChyb3cpO1xuICB9XG4gIHJldHVybiBib2FyZDtcbn1cbmNvbnN0IHNob3RNYXJrZXIgPSAoKSA9PiB7XG4gIGNvbnN0IHNob3RNYXJrZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaW1nXCIpO1xuICBzaG90TWFya2VyLnNyYyA9IFwiLi9zaG90LW1hcmtlci5zdmdcIjtcbiAgc2hvdE1hcmtlci5jbGFzc0xpc3QuYWRkKFwic2hvdC1tYXJrZXJcIik7XG4gIHJldHVybiBzaG90TWFya2VyO1xufTtcblxuZnVuY3Rpb24gZG9tUG9wdWxhdGVCb2FyZChib2FyZE9iaiwgRG9tQm9hcmRTZWxlY3RvciwgaXNQbGF5ZXJCb2FyZCA9IHRydWUpIHtcbiAgZm9yIChsZXQgciA9IDA7IHIgPCAxMDsgcisrKSB7XG4gICAgZm9yIChsZXQgYyA9IDA7IGMgPCAxMDsgYysrKSB7XG4gICAgICBjb25zdCBjb2x1bW4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFxuICAgICAgICBgJHtEb21Cb2FyZFNlbGVjdG9yfSAucm93LSR7cn0gLmNvbHVtbi0ke2N9YFxuICAgICAgKTtcblxuICAgICAgaWYgKGJvYXJkT2JqLmJvYXJkW3JdW2NdICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgaWYgKGJvYXJkT2JqLmJvYXJkW3JdW2NdLmRlc3Ryb3llZCA9PT0gdHJ1ZSkge1xuICAgICAgICAgIGlmIChjb2x1bW4uY2xhc3NMaXN0LmNvbnRhaW5zKFwiaGl0dGVkXCIpID09PSBmYWxzZSkge1xuICAgICAgICAgICAgY29sdW1uLmFwcGVuZChzaG90TWFya2VyKCkpO1xuICAgICAgICAgICAgY29sdW1uLmNsYXNzTGlzdC5hZGQoXCJoaXR0ZWRcIik7XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2UgaWYgKGJvYXJkT2JqLmJvYXJkW3JdW2NdLmRlc3Ryb3llZCA9PT0gZmFsc2UgJiYgaXNQbGF5ZXJCb2FyZCkge1xuICAgICAgICB9IGVsc2UgaWYgKGJvYXJkT2JqLmJvYXJkW3JdW2NdID09PSBcIm1pc3NlZFwiKSB7XG4gICAgICAgICAgaWYgKGNvbHVtbi5jbGFzc0xpc3QuY29udGFpbnMoXCJtaXNzZWRcIikgPT09IGZhbHNlKSB7XG4gICAgICAgICAgICBjb2x1bW4uYXBwZW5kKHNob3RNYXJrZXIoKSk7XG4gICAgICAgICAgICBjb2x1bW4uY2xhc3NMaXN0LmFkZChcIm1pc3NlZFwiKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cblxuZXhwb3J0IHtcbiAgbWVzc2FnZSxcbiAgZG9tUmVuZGVyQm9hcmQsXG4gIGRvbVBvcHVsYXRlQm9hcmQsXG4gIGF4aXNCdXR0b24sXG4gIGJvYXJkQ29vcmRpbmF0ZXMsXG4gIGRvbVBsYWNlU2hpcEltZyxcbn07XG4iLCJpbXBvcnQge1xuICBkb21SZW5kZXJCb2FyZCxcbiAgZG9tUG9wdWxhdGVCb2FyZCxcbiAgYm9hcmRDb29yZGluYXRlcyxcbiAgbWVzc2FnZSxcbiAgYXhpc0J1dHRvbixcbn0gZnJvbSBcIi4vZG9tSW50ZXJhY3Rpb25cIjtcbmltcG9ydCBnYW1lYm9hcmRGYWN0b3J5IGZyb20gXCIuL2dhbWVib2FyZEZhY3RvcnlcIjtcbmltcG9ydCB7IGNvbXB1dGVyLCBwbGF5ZXIgfSBmcm9tIFwiLi9wbGF5ZXJzXCI7XG5cbmFzeW5jIGZ1bmN0aW9uIGdhbWVMb29wKCkge1xuICAvLzIgLSBUaGUgZ2FtZSBsb29wIHNob3VsZCBzZXQgdXAgYSBuZXcgZ2FtZSBieSBjcmVhdGluZyBQbGF5ZXJzIGFuZCBHYW1lYm9hcmRzLiBGb3Igbm93IGp1c3QgcG9wdWxhdGUgZWFjaCBHYW1lYm9hcmQgd2l0aCBwcmVkZXRlcm1pbmVkIGNvb3JkaW5hdGVzLiBZb3UgY2FuIGltcGxlbWVudCBhIHN5c3RlbSBmb3IgYWxsb3dpbmcgcGxheWVycyB0byBwbGFjZSB0aGVpciBzaGlwcyBsYXRlci5cblxuICBjb25zdCBjb250ZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJjb250ZW50XCIpO1xuICAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG5cbiAgY29uc3QgcGxheWVyQm9hcmRDb250YWluZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcbiAgICBcInBsYXllci1ib2FyZC1jb250YWluZXJcIlxuICApO1xuICBwbGF5ZXJCb2FyZENvbnRhaW5lci5hcHBlbmRDaGlsZChib2FyZENvb3JkaW5hdGVzKFwibGVmdFwiKSk7XG4gIHBsYXllckJvYXJkQ29udGFpbmVyLmFwcGVuZENoaWxkKGJvYXJkQ29vcmRpbmF0ZXMoXCJ0b3BcIikpO1xuICBwbGF5ZXJCb2FyZENvbnRhaW5lci5hcHBlbmRDaGlsZChkb21SZW5kZXJCb2FyZChcInBsYXllckJvYXJkXCIpKTsgLy8gbWFrZSBlbXB0eSBib2FyZFxuICAvL3BsYXllckJvYXJkQ29udGFpbmVyLmFwcGVuZENoaWxkKGJvYXJkQ29vcmRpbmF0ZXMoXCJib3R0b21cIikpO1xuICBwbGF5ZXJCb2FyZENvbnRhaW5lci5hcHBlbmRDaGlsZChib2FyZENvb3JkaW5hdGVzKFwicmlnaHRcIikpO1xuICAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuXG4gIGNvbnN0IGNvbXB1dGVyQm9hcmRDb250YWluZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcbiAgICBcImNvbXB1dGVyLWJvYXJkLWNvbnRhaW5lclwiXG4gICk7XG4gIGNvbXB1dGVyQm9hcmRDb250YWluZXIuYXBwZW5kQ2hpbGQoYm9hcmRDb29yZGluYXRlcyhcImxlZnRcIikpO1xuICAvLyBjb21wdXRlckJvYXJkQ29udGFpbmVyLmFwcGVuZENoaWxkKGJvYXJkQ29vcmRpbmF0ZXMoXCJ0b3BcIikpO1xuICBjb21wdXRlckJvYXJkQ29udGFpbmVyLmFwcGVuZENoaWxkKGRvbVJlbmRlckJvYXJkKFwiY29tcHV0ZXJCb2FyZFwiKSk7IC8vIG1ha2UgZW1wdHkgYm9hcmRcbiAgY29tcHV0ZXJCb2FyZENvbnRhaW5lci5hcHBlbmRDaGlsZChib2FyZENvb3JkaW5hdGVzKFwicmlnaHRcIikpO1xuICBjb21wdXRlckJvYXJkQ29udGFpbmVyLmFwcGVuZENoaWxkKGJvYXJkQ29vcmRpbmF0ZXMoXCJib3R0b21cIikpO1xuXG4gIGNvbnRlbnQuYXBwZW5kQ2hpbGQocGxheWVyQm9hcmRDb250YWluZXIpO1xuICBjb250ZW50LmFwcGVuZENoaWxkKGJvYXJkQ29vcmRpbmF0ZXMoXCJtaWRkbGVcIikpO1xuICBjb25zdCBib3R0b24gPSBheGlzQnV0dG9uKCk7XG4gIGNvbnRlbnQuYXBwZW5kQ2hpbGQoYm90dG9uKTtcblxuICAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuICBjb250ZW50LmFwcGVuZENoaWxkKGNvbXB1dGVyQm9hcmRDb250YWluZXIpO1xuICAvLy8vLy8vLy8vLy8vLy8vL1xuXG4gIGNvbnN0IHBsYXllckJvYXJkT2JqID0gZ2FtZWJvYXJkRmFjdG9yeSgpO1xuICBjb25zdCBjb21wdXRlckJvYXJkT2JqID0gZ2FtZWJvYXJkRmFjdG9yeSgpO1xuXG4gIC8qIHBsYXllckJvYXJkT2JqLmJvYXJkWzFdWzFdID0gXCJtaXNzZWRcIjtcbiAgcGxheWVyQm9hcmRPYmouYm9hcmRbMV1bMl0gPSBcIm1pc3NlZFwiO1xuICBwbGF5ZXJCb2FyZE9iai5ib2FyZFsxXVszXSA9IFwibWlzc2VkXCI7XG4gIHBsYXllckJvYXJkT2JqLmJvYXJkWzFdWzRdID0gXCJtaXNzZWRcIjtcbiAgcGxheWVyQm9hcmRPYmouYm9hcmRbMV1bNV0gPSBcIm1pc3NlZFwiO1xuICBwbGF5ZXJCb2FyZE9iai5ib2FyZFsxXVs2XSA9IFwibWlzc2VkXCI7XG5cbiAgLy9cbiAgcGxheWVyQm9hcmRPYmouYm9hcmRbMV1bMV0gPSBcIm1pc3NlZFwiO1xuICBwbGF5ZXJCb2FyZE9iai5ib2FyZFsyXVsxXSA9IFwibWlzc2VkXCI7XG4gIHBsYXllckJvYXJkT2JqLmJvYXJkWzNdWzFdID0gXCJtaXNzZWRcIjtcbiAgcGxheWVyQm9hcmRPYmouYm9hcmRbNF1bMV0gPSBcIm1pc3NlZFwiO1xuICAvL1xuICBwbGF5ZXJCb2FyZE9iai5ib2FyZFsxXVs3XSA9IFwibWlzc2VkXCI7XG4gIHBsYXllckJvYXJkT2JqLmJvYXJkWzJdWzddID0gXCJtaXNzZWRcIjtcbiAgcGxheWVyQm9hcmRPYmouYm9hcmRbM11bN10gPSBcIm1pc3NlZFwiO1xuICBwbGF5ZXJCb2FyZE9iai5ib2FyZFs0XVs3XSA9IFwibWlzc2VkXCI7XG4gIC8vXG5cbiAgcGxheWVyQm9hcmRPYmouYm9hcmRbNV1bMV0gPSBcIm1pc3NlZFwiO1xuICBwbGF5ZXJCb2FyZE9iai5ib2FyZFs1XVsyXSA9IFwibWlzc2VkXCI7XG4gIHBsYXllckJvYXJkT2JqLmJvYXJkWzVdWzNdID0gXCJtaXNzZWRcIjtcbiAgcGxheWVyQm9hcmRPYmouYm9hcmRbNV1bNF0gPSBcIm1pc3NlZFwiO1xuICBwbGF5ZXJCb2FyZE9iai5ib2FyZFs1XVs1XSA9IFwibWlzc2VkXCI7XG4gIHBsYXllckJvYXJkT2JqLmJvYXJkWzVdWzZdID0gXCJtaXNzZWRcIjtcbiAgcGxheWVyQm9hcmRPYmouYm9hcmRbNV1bN10gPSBcIm1pc3NlZFwiOyAqL1xuICAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG4gIGNvbXB1dGVyLnBsYWNlU2hpcChjb21wdXRlckJvYXJkT2JqLCAyKTtcbiAgLy9jb25zb2xlLmxvZyhjb21wdXRlckJvYXJkT2JqLmZsZWV0KTtcbiAgY29uc3QgaW5zdHJ1Y3Rpb25zID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJpbnN0cnVjdGlvbnNcIik7XG4gIGluc3RydWN0aW9ucy5pbm5lclRleHQgPSBcIkNvbG9jYSB0dSBib3RlIGRlIHBhdHJ1bGxhXCI7XG5cbiAgYXdhaXQgcGxheWVyLnBsYWNlU2hpcCgyLCBcInBsYXllckJvYXJkXCIsIHBsYXllckJvYXJkT2JqKTtcbiAgZG9tUG9wdWxhdGVCb2FyZChwbGF5ZXJCb2FyZE9iaiwgXCIjcGxheWVyQm9hcmRcIiwgdHJ1ZSk7XG5cbiAgY29tcHV0ZXIucGxhY2VTaGlwKGNvbXB1dGVyQm9hcmRPYmosIDMpO1xuICAvL2NvbnNvbGUubG9nKGNvbXB1dGVyQm9hcmRPYmouZmxlZXQpO1xuICBpbnN0cnVjdGlvbnMuaW5uZXJUZXh0ID0gXCJDb2xvY2EgdHUgZGVzdHJ1Y3RvclwiO1xuICBhd2FpdCBwbGF5ZXIucGxhY2VTaGlwKDMsIFwicGxheWVyQm9hcmRcIiwgcGxheWVyQm9hcmRPYmopO1xuICBkb21Qb3B1bGF0ZUJvYXJkKHBsYXllckJvYXJkT2JqLCBcIiNwbGF5ZXJCb2FyZFwiLCB0cnVlKTtcblxuICBjb21wdXRlci5wbGFjZVNoaXAoY29tcHV0ZXJCb2FyZE9iaiwgMyk7XG4gIC8vY29uc29sZS5sb2coY29tcHV0ZXJCb2FyZE9iai5mbGVldCk7XG4gIGluc3RydWN0aW9ucy5pbm5lclRleHQgPSBcIkNvbG9jYSB0dSBzdWJtYXJpbm9cIjtcbiAgYXdhaXQgcGxheWVyLnBsYWNlU2hpcCgzLCBcInBsYXllckJvYXJkXCIsIHBsYXllckJvYXJkT2JqKTtcbiAgZG9tUG9wdWxhdGVCb2FyZChwbGF5ZXJCb2FyZE9iaiwgXCIjcGxheWVyQm9hcmRcIiwgdHJ1ZSk7XG5cbiAgY29tcHV0ZXIucGxhY2VTaGlwKGNvbXB1dGVyQm9hcmRPYmosIDQpO1xuICAvL2NvbnNvbGUubG9nKGNvbXB1dGVyQm9hcmRPYmouZmxlZXQpO1xuICBpbnN0cnVjdGlvbnMuaW5uZXJUZXh0ID0gXCJDb2xvY2EgdHUgbmF2ZSBkZSBiYXRhbGxhXCI7XG4gIGF3YWl0IHBsYXllci5wbGFjZVNoaXAoNCwgXCJwbGF5ZXJCb2FyZFwiLCBwbGF5ZXJCb2FyZE9iaik7XG4gIGRvbVBvcHVsYXRlQm9hcmQocGxheWVyQm9hcmRPYmosIFwiI3BsYXllckJvYXJkXCIsIHRydWUpO1xuXG4gIGNvbXB1dGVyLnBsYWNlU2hpcChjb21wdXRlckJvYXJkT2JqLCA1KTtcbiAgLy9jb25zb2xlLmxvZyhjb21wdXRlckJvYXJkT2JqLmZsZWV0KTtcbiAgaW5zdHJ1Y3Rpb25zLmlubmVyVGV4dCA9IFwiQ29sb2NhIHR1IGNhcmd1ZXJvXCI7XG4gIGF3YWl0IHBsYXllci5wbGFjZVNoaXAoNSwgXCJwbGF5ZXJCb2FyZFwiLCBwbGF5ZXJCb2FyZE9iaik7XG4gIGRvbVBvcHVsYXRlQm9hcmQocGxheWVyQm9hcmRPYmosIFwiI3BsYXllckJvYXJkXCIsIHRydWUpO1xuXG4gIC8vMy0gIFdl4oCZbGwgbGVhdmUgdGhlIEhUTUwgaW1wbGVtZW50YXRpb24gdXAgdG8geW91IGZvciBub3csIGJ1dCB5b3Ugc2hvdWxkIGRpc3BsYXkgYm90aCB0aGUgcGxheWVy4oCZcyBib2FyZHMgYW5kIHJlbmRlciB0aGVtIHVzaW5nIGluZm9ybWF0aW9uIGZyb20gdGhlIEdhbWVib2FyZCBjbGFzcy5cblxuICAvKiBkb21Qb3B1bGF0ZUJvYXJkKHBsYXllckJvYXJkT2JqLCBcIiNwbGF5ZXJCb2FyZFwiKTtcbiAgZG9tUG9wdWxhdGVCb2FyZChjb21wdXRlckJvYXJkT2JqLCBcIiNjb21wdXRlckJvYXJkXCIsIGZhbHNlKTsgKi9cblxuICAvLyAtMy0xIFlvdSBuZWVkIG1ldGhvZHMgdG8gcmVuZGVyIHRoZSBnYW1lYm9hcmRzIC9kb25lLyBhbmQgdG8gdGFrZSB1c2VyIGlucHV0IGZvciBhdHRhY2tpbmcvZG9uZS8uIEZvciBhdHRhY2tzLCBsZXQgdGhlIHVzZXIgY2xpY2sgb24gYSBjb29yZGluYXRlIGluIHRoZSBlbmVteSBHYW1lYm9hcmQuXG4gIC8vLTQgVGhlIGdhbWUgbG9vcCBzaG91bGQgc3RlcCB0aHJvdWdoIHRoZSBnYW1lIHR1cm4gYnkgdHVybiB1c2luZyBvbmx5IG1ldGhvZHMgZnJvbSBvdGhlciBvYmplY3RzLiBJZiBhdCBhbnkgcG9pbnQgeW91IGFyZSB0ZW1wdGVkIHRvIHdyaXRlIGEgbmV3IGZ1bmN0aW9uIGluc2lkZSB0aGUgZ2FtZSBsb29wLCBzdGVwIGJhY2sgYW5kIGZpZ3VyZSBvdXQgd2hpY2ggY2xhc3Mgb3IgbW9kdWxlIHRoYXQgZnVuY3Rpb24gc2hvdWxkIGJlbG9uZyB0by5cblxuICAvL2Rpc3BsYXkgbWVzc2FnZSAhISFcbiAgaW5zdHJ1Y3Rpb25zLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcblxuICBjb21wdXRlckJvYXJkQ29udGFpbmVyLnN0eWxlLmRpc3BsYXkgPSBcImdyaWRcIjtcbiAgYm90dG9uLnJlbW92ZSgpO1xuICBhd2FpdCBtZXNzYWdlKFwiRW1waWV6YSBsYSBiYXRhbGxhLi4uXCIpO1xuXG4gIGZvciAoXG4gICAgbGV0IHR1cm4gPSAxO1xuICAgIC8vQ3JlYXRlIGNvbmRpdGlvbnMgc28gdGhhdCB0aGUgZ2FtZSBlbmRzIG9uY2Ugb25lIHBsYXllcnMgc2hpcHMgaGF2ZSBhbGwgYmVlbiBzdW5rLiBUaGlzIGZ1bmN0aW9uIGlzIGFwcHJvcHJpYXRlIGZvciB0aGUgR2FtZSBtb2R1bGUuXG4gICAgY29tcHV0ZXJCb2FyZE9iai5pc0dhbWVPdmVyKCkgPT09IGZhbHNlICYmXG4gICAgcGxheWVyQm9hcmRPYmouaXNHYW1lT3ZlcigpID09PSBmYWxzZTtcbiAgICB0dXJuKytcbiAgKSB7XG4gICAgdmFyIGF1ZGlvID0gbmV3IEF1ZGlvKFwiLi9zaG9vdC5tcDNcIik7XG4gICAgYXdhaXQgbWVzc2FnZShcIkVzcGVyYW5kbyBvcmRlbmVzIGNhcGl0YW4hXCIpO1xuICAgIGF3YWl0IHBsYXllci5hdHRhY2soY29tcHV0ZXJCb2FyZE9iaik7XG4gICAgYXVkaW8ucGxheSgpO1xuICAgIGRvbVBvcHVsYXRlQm9hcmQoY29tcHV0ZXJCb2FyZE9iaiwgXCIjY29tcHV0ZXJCb2FyZFwiLCBmYWxzZSk7XG4gICAgYXdhaXQgbmV3IFByb21pc2UoKHJlc29sdmUpID0+IHNldFRpbWVvdXQocmVzb2x2ZSwgMTAwMCkpO1xuICAgIGF3YWl0IG1lc3NhZ2UoXCJBdGFxdWUgZW5lbWlnbyBhcHJveGltYW5kb2NlXCIpO1xuXG4gICAgYXVkaW8ucGxheSgpO1xuICAgIGNvbXB1dGVyLmF0dGFjayhwbGF5ZXJCb2FyZE9iaik7XG4gICAgZG9tUG9wdWxhdGVCb2FyZChwbGF5ZXJCb2FyZE9iaiwgXCIjcGxheWVyQm9hcmRcIik7XG4gICAgYXdhaXQgbmV3IFByb21pc2UoKHJlc29sdmUpID0+IHNldFRpbWVvdXQocmVzb2x2ZSwgMTAwMCkpO1xuICB9XG5cbiAgYWxlcnQoXCJnYW1lIG92ZXJcIik7XG59XG5cbmV4cG9ydCB7IGdhbWVMb29wIH07XG4iLCJpbXBvcnQgc2hpcEZhY3RvcnkgZnJvbSBcIi4vc2hpcEZhY3RvcnlcIjtcblxuZnVuY3Rpb24gZ2FtZWJvYXJkRmFjdG9yeSgpIHtcbiAgbGV0IGJvYXJkID0gW1tdLCBbXSwgW10sIFtdLCBbXSwgW10sIFtdLCBbXSwgW10sIFtdXTtcbiAgbGV0IGZsZWV0ID0ge307XG5cbiAgY29uc3QgcGxhY2VTaGlwID0gZnVuY3Rpb24gKGxlbmd0aCwgeCwgeSkge1xuICAgIGxldCBjdXJyZW50U2hpcDtcbiAgICBzd2l0Y2ggKGxlbmd0aCkge1xuICAgICAgY2FzZSA1OlxuICAgICAgICB7XG4gICAgICAgICAgZmxlZXQuY2FycmllciA9IHNoaXBGYWN0b3J5KGxlbmd0aCk7XG4gICAgICAgICAgY3VycmVudFNoaXAgPSBcImNhcnJpZXJcIjtcbiAgICAgICAgfVxuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgNDpcbiAgICAgICAge1xuICAgICAgICAgIGZsZWV0LmJhdHRsZXNoaXAgPSBzaGlwRmFjdG9yeShsZW5ndGgpO1xuICAgICAgICAgIGN1cnJlbnRTaGlwID0gXCJiYXR0bGVzaGlwXCI7XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIDM6XG4gICAgICAgIHtcbiAgICAgICAgICBpZiAoIWZsZWV0LmRlc3Ryb3llcikge1xuICAgICAgICAgICAgZmxlZXQuZGVzdHJveWVyID0gc2hpcEZhY3RvcnkobGVuZ3RoKTtcbiAgICAgICAgICAgIGN1cnJlbnRTaGlwID0gXCJkZXN0cm95ZXJcIjtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZmxlZXQuc3VibWFyaW5lID0gc2hpcEZhY3RvcnkobGVuZ3RoKTtcbiAgICAgICAgICAgIGN1cnJlbnRTaGlwID0gXCJzdWJtYXJpbmVcIjtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBicmVhaztcblxuICAgICAgY2FzZSAyOlxuICAgICAgICB7XG4gICAgICAgICAgZmxlZXQucGF0cm9sQm9hdCA9IHNoaXBGYWN0b3J5KGxlbmd0aCk7XG4gICAgICAgICAgY3VycmVudFNoaXAgPSBcInBhdHJvbEJvYXRcIjtcbiAgICAgICAgfVxuXG4gICAgICAgIGJyZWFrO1xuICAgIH1cblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICAgIGJvYXJkW3ldWyt4ICsgaV0gPSB7XG4gICAgICAgIGRlc3Ryb3llZDogZmFsc2UsXG5cbiAgICAgICAgaGl0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgZmxlZXRbY3VycmVudFNoaXBdLmhpdCgpO1xuICAgICAgICAgIHRoaXMuZGVzdHJveWVkID0gdHJ1ZTtcbiAgICAgICAgfSxcbiAgICAgIH07XG4gICAgfVxuICAgIGNvbnNvbGUubG9nKGZsZWV0KTtcbiAgfTtcblxuICBjb25zdCBwbGFjZVNoaXBWZXJ0aWNhbGx5ID0gZnVuY3Rpb24gKGxlbmd0aCwgeCwgeSkge1xuICAgIGxldCBjdXJyZW50U2hpcDtcbiAgICBzd2l0Y2ggKGxlbmd0aCkge1xuICAgICAgY2FzZSA1OlxuICAgICAgICB7XG4gICAgICAgICAgZmxlZXQuY2FycmllciA9IHNoaXBGYWN0b3J5KGxlbmd0aCk7XG4gICAgICAgICAgY3VycmVudFNoaXAgPSBcImNhcnJpZXJcIjtcbiAgICAgICAgfVxuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgNDpcbiAgICAgICAge1xuICAgICAgICAgIGZsZWV0LmJhdHRsZXNoaXAgPSBzaGlwRmFjdG9yeShsZW5ndGgpO1xuICAgICAgICAgIGN1cnJlbnRTaGlwID0gXCJiYXR0bGVzaGlwXCI7XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIDM6XG4gICAgICAgIHtcbiAgICAgICAgICBpZiAoIWZsZWV0LmRlc3Ryb3llcikge1xuICAgICAgICAgICAgZmxlZXQuZGVzdHJveWVyID0gc2hpcEZhY3RvcnkobGVuZ3RoKTtcbiAgICAgICAgICAgIGN1cnJlbnRTaGlwID0gXCJkZXN0cm95ZXJcIjtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZmxlZXQuc3VibWFyaW5lID0gc2hpcEZhY3RvcnkobGVuZ3RoKTtcbiAgICAgICAgICAgIGN1cnJlbnRTaGlwID0gXCJzdWJtYXJpbmVcIjtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgLy9mbGVldC5zdWJtYXJpbmUgPSBzaGlwRmFjdG9yeShsZW5ndGgpO1xuICAgICAgICBicmVhaztcblxuICAgICAgY2FzZSAyOlxuICAgICAgICB7XG4gICAgICAgICAgZmxlZXQucGF0cm9sQm9hdCA9IHNoaXBGYWN0b3J5KGxlbmd0aCk7XG4gICAgICAgICAgY3VycmVudFNoaXAgPSBcInBhdHJvbEJvYXRcIjtcbiAgICAgICAgfVxuXG4gICAgICAgIGJyZWFrO1xuICAgIH1cblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICAgIGJvYXJkWyt5ICsgaV1beF0gPSB7XG4gICAgICAgIGRlc3Ryb3llZDogZmFsc2UsXG5cbiAgICAgICAgaGl0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgZmxlZXRbY3VycmVudFNoaXBdLmhpdCgpO1xuICAgICAgICAgIHRoaXMuZGVzdHJveWVkID0gdHJ1ZTtcbiAgICAgICAgfSxcbiAgICAgIH07XG4gICAgfVxuICAgIGNvbnNvbGUubG9nKGZsZWV0KTtcbiAgfTtcblxuICBjb25zdCByZWNpdmVBdHRhY2sgPSAoeCwgeSkgPT4ge1xuICAgIGlmICh0eXBlb2YgYm9hcmRbeV1beF0gPT09IFwib2JqZWN0XCIpIHtcbiAgICAgIGlmIChib2FyZFt5XVt4XS5kZXN0cm95ZWQgPT09IGZhbHNlKSB7XG4gICAgICAgIGJvYXJkW3ldW3hdLmhpdCgpO1xuICAgICAgICByZXR1cm4gXCJoaXRcIjtcbiAgICAgIH0gZWxzZSBpZiAoYm9hcmRbeV1beF0uZGVzdHJveWVkID09PSB0cnVlKSB7XG4gICAgICAgIHJldHVybiBcInJlcGV0aWRvXCI7XG4gICAgICB9XG4gICAgfSBlbHNlIGlmIChib2FyZFt5XVt4XSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICBib2FyZFt5XVt4XSA9IFwibWlzc2VkXCI7XG5cbiAgICAgIHJldHVybiBcIm1pc3NlZFwiO1xuICAgIH0gZWxzZSBpZiAoYm9hcmRbeV1beF0gPT09IFwibWlzc2VkXCIpIHtcbiAgICAgIHJldHVybiBcInJlcGV0aWRvXCI7XG4gICAgfVxuICB9O1xuXG4gIGNvbnN0IGF0dGFja1Jlc3VsdE9ubHkgPSAoeCwgeSkgPT4ge1xuICAgIGlmICh0eXBlb2YgYm9hcmRbeV1beF0gPT09IFwib2JqZWN0XCIpIHtcbiAgICAgIGlmIChib2FyZFt5XVt4XS5kZXN0cm95ZWQgPT09IGZhbHNlKSB7XG4gICAgICAgIHJldHVybiBcImhpdFwiO1xuICAgICAgfSBlbHNlIGlmIChib2FyZFt5XVt4XS5kZXN0cm95ZWQgPT09IHRydWUpIHtcbiAgICAgICAgcmV0dXJuIFwicmVwZXRpZG9cIjtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKGJvYXJkW3ldW3hdID09PSB1bmRlZmluZWQpIHtcbiAgICAgIHJldHVybiBcIm1pc3NlZFwiO1xuICAgIH0gZWxzZSBpZiAoYm9hcmRbeV1beF0gPT09IFwibWlzc2VkXCIpIHtcbiAgICAgIHJldHVybiBcInJlcGV0aWRvXCI7XG4gICAgfVxuICB9O1xuICAvL2ZvciBwbGFjaW5nXG4gIGNvbnN0IHdpbGxGb2xsb3dSdWxlcyA9IGZ1bmN0aW9uIChsZW5ndGgsIHgsIHkpIHtcbiAgICBjb25zdCB3aWxsT3ZlcmxhcCA9IGZ1bmN0aW9uIChsZW5ndGgsIHgsIHkpIHtcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICAgICAgY29uc29sZS5sb2coeSk7XG4gICAgICAgIGlmICh0eXBlb2YgYm9hcmRbeV1bK3ggKyBpXSA9PT0gXCJvYmplY3RcIikge1xuICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfTtcblxuICAgIGNvbnN0IHdpbGxPdmVyZmxvdyA9IGZ1bmN0aW9uIChsZW5ndGgsIHgpIHtcbiAgICAgIGlmIChsZW5ndGggKyAreCA+IDEwKSB7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfSBlbHNlIHJldHVybiBmYWxzZTtcbiAgICB9O1xuICAgIGlmICghd2lsbE92ZXJsYXAobGVuZ3RoLCB4LCB5KSAmJiAhd2lsbE92ZXJmbG93KGxlbmd0aCwgeCkpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICB9O1xuXG4gIC8vZm9yIHBsYWNpbmdcbiAgY29uc3Qgd2lsbEZvbGxvd1J1bGVzVmVydGljYWxseSA9IGZ1bmN0aW9uIChsZW5ndGgsIHgsIHkpIHtcbiAgICBjb25zdCB3aWxsT3ZlcmxhcCA9IGZ1bmN0aW9uIChsZW5ndGgsIHgsIHkpIHtcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICAgICAgaWYgKHR5cGVvZiBib2FyZFsreSArIGldW3hdID09PSBcIm9iamVjdFwiKSB7XG4gICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9O1xuXG4gICAgY29uc3Qgd2lsbE92ZXJmbG93ID0gZnVuY3Rpb24gKGxlbmd0aCwgeSkge1xuICAgICAgY29uc29sZS5sb2cobGVuZ3RoICsgK3kgPiAxMCk7XG4gICAgICBpZiAobGVuZ3RoICsgK3kgPiAxMCkge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH0gZWxzZSByZXR1cm4gZmFsc2U7XG4gICAgfTtcbiAgICBpZiAoIXdpbGxPdmVyZmxvdyhsZW5ndGgsIHkpKSB7XG4gICAgICBpZiAoIXdpbGxPdmVybGFwKGxlbmd0aCwgeCwgeSkpIHtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgfVxuICB9O1xuXG4gIGNvbnN0IGlzR2FtZU92ZXIgPSBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIHRoaXMuZmxlZXQuY2Fycmllci5pc1N1bmsoKSAmJlxuICAgICAgdGhpcy5mbGVldC5wYXRyb2xCb2F0LmlzU3VuaygpICYmXG4gICAgICB0aGlzLmZsZWV0LmRlc3Ryb3llci5pc1N1bmsoKSAmJlxuICAgICAgdGhpcy5mbGVldC5iYXR0bGVzaGlwLmlzU3VuaygpICYmXG4gICAgICB0aGlzLmZsZWV0LnN1Ym1hcmluZS5pc1N1bmsoKVxuICAgICk7XG4gIH07XG5cbiAgcmV0dXJuIHtcbiAgICBhdHRhY2tSZXN1bHRPbmx5LFxuICAgIGJvYXJkLFxuICAgIGZsZWV0LFxuICAgIHBsYWNlU2hpcCxcbiAgICBwbGFjZVNoaXBWZXJ0aWNhbGx5LFxuICAgIHdpbGxGb2xsb3dSdWxlcyxcbiAgICByZWNpdmVBdHRhY2ssXG4gICAgaXNHYW1lT3ZlcixcbiAgICB3aWxsRm9sbG93UnVsZXNWZXJ0aWNhbGx5LFxuICB9O1xufVxuXG5leHBvcnQgZGVmYXVsdCBnYW1lYm9hcmRGYWN0b3J5O1xuIiwiaW1wb3J0IHsgYWkgfSBmcm9tIFwiLi9haVwiO1xuaW1wb3J0IHsgZG9tUGxhY2VTaGlwSW1nIH0gZnJvbSBcIi4vZG9tSW50ZXJhY3Rpb25cIjtcblxubGV0IGNvbXB1dGVyID0ge1xuICBhaSxcblxuICBhdHRhY2s6IGZ1bmN0aW9uIChwbGF5ZXJCb2FyZE9iaikge1xuICAgIC8vaWYgcmV2ZXJzZU1vZGUgaXMgdHJ1ZVxuICAgIC8vY2hlY2sgdG8gc2VlIGlmIHRoZSBvcG9zaXRlIGRpcmVjdGlvbiBvZiB0aGUgZm9sbG93RGlyZWN0aW9uL2ZpcnN0RGlyZWN0aW9uIGlzIGluIHRoZSBmaXJzdFZhbGlkTW92ZXMgYXJyYXl7XG4gICAgLy9pZiBpdCBpcyBjaGFnZSB0aGUgY2hhc2VTdWJqZWN0IGFuZCB0aGUgZm9sbG93RGlyZWN0aW9ufVxuICAgIC8vZWxzZSBkb250IGRvIGFuaXRoaW5nICh0aGUgbmV4dCBhdHRhY2sgd2lsbCBiZSByYW5kb20pXG4gICAgLy9hZnRlciBhbnkgb2YgdGhlIHR3bywgZGlzYWJsZSB0aGUgcmV2ZXJzZU1vZGUgYmVjYXVzZSBpdCBpcyBvbmx5IGEgbW9kaWZpZXIgYW5kIGl0IHNob3VsZCBub3QgcnVuIG9uIGV2ZXJ5IGF0dGFjayBvZiB0aGUgcmV2ZXJzZWQgY2hhc2VcbiAgICAvLyBhbmQgZW5hYmxlIHRoZSB3YXNSZXZlcnNlQWN0aXZhdGVkLCBiZWNhc3VlIHRoZSByZXZlcnNlTW9kZSBzaG91bGQgbm8gYmUgdXNlZCBhIHNlY29uZCB0aW1lIG9uIHRoZSBzYW1lIHN1YmplY3RcbiAgICBpZiAodGhpcy5haS5jaGFzZU1vZGUucmV2ZXJzZU1vZGUpIHtcbiAgICAgIGxldCBvcG9zaXRlID0gdW5kZWZpbmVkO1xuICAgICAgc3dpdGNoICh0aGlzLmFpLmNoYXNlTW9kZS5maXJzdERpcmVjdGlvbikge1xuICAgICAgICBjYXNlIFwibGVmdFwiOlxuICAgICAgICAgIHtcbiAgICAgICAgICAgIG9wb3NpdGUgPSBcInJpZ2h0XCI7XG4gICAgICAgICAgfVxuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIFwicmlnaHRcIjpcbiAgICAgICAgICB7XG4gICAgICAgICAgICBvcG9zaXRlID0gXCJsZWZ0XCI7XG4gICAgICAgICAgfVxuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIFwidG9wXCI6XG4gICAgICAgICAge1xuICAgICAgICAgICAgb3Bvc2l0ZSA9IFwiYm90dG9tXCI7XG4gICAgICAgICAgfVxuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIFwiYm90dG9tXCI6XG4gICAgICAgICAge1xuICAgICAgICAgICAgb3Bvc2l0ZSA9IFwidG9wXCI7XG4gICAgICAgICAgfVxuICAgICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgICAgaWYgKHRoaXMuYWkuY2hhc2VNb2RlLmZpcnN0VmFsaWRNb3Zlcy5pbmNsdWRlcyhvcG9zaXRlKSkge1xuICAgICAgICB0aGlzLmFpLmNoYXNlTW9kZS5jaGFzZVN1YmplY3QgPSB0aGlzLmFpLmNoYXNlTW9kZS5maXJzdENoYXNlU3ViamVjdDtcbiAgICAgICAgdGhpcy5haS5jaGFzZU1vZGUuc3RhdGUgPSB0cnVlO1xuICAgICAgICB0aGlzLmFpLmNoYXNlTW9kZS5mb2xsb3dEaXJlY3Rpb24gPSBvcG9zaXRlO1xuICAgICAgICB0aGlzLmFpLmNoYXNlTW9kZS5pc0NoYXNpbmcgPSB0cnVlO1xuICAgICAgICAvL2F0dGFjayBvcG9zaXRlIGRpcmVjdGlvbiBvZiBjaGFzZVN1YmplY3RcbiAgICAgICAgLy9nZXQgY29vcmRpbmF0ZXMgb2ZcIiBvcG9zaXRlIFwib2YgY2hhc2VTVWJqZWN0XG4gICAgICB9XG4gICAgICB0aGlzLmFpLmNoYXNlTW9kZS5yZXZlcnNlTW9kZSA9IGZhbHNlO1xuICAgICAgdGhpcy5haS5jaGFzZU1vZGUud2FzUmV2ZXJzZUFjdGl2YXRlZCA9IHRydWU7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuYWkuY2hhc2VNb2RlLnN0YXRlID09PSB0cnVlKSB7XG4gICAgICB0aGlzLmFpLmFkZFZhbGlkRGlyZWN0aW9ucyhwbGF5ZXJCb2FyZE9iaik7XG4gICAgICB0aGlzLmFpLmF0dGFjayhwbGF5ZXJCb2FyZE9iaik7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IHggPSB0aGlzLnJhbmRvbUludEZyb21JbnRlcnZhbCgwLCA5KTtcbiAgICAgIGNvbnN0IHkgPSB0aGlzLnJhbmRvbUludEZyb21JbnRlcnZhbCgwLCA5KTtcbiAgICAgIC8vYWxlcnQoXCJyYW5kb20gZGlyZWN0aW9uIGJ5IGNvbXB1dGVyLmF0dGFja1wiKTtcbiAgICAgIHN3aXRjaCAocGxheWVyQm9hcmRPYmoucmVjaXZlQXR0YWNrKHgsIHkpKSB7XG4gICAgICAgIGNhc2UgXCJoaXRcIjpcbiAgICAgICAgICB7XG4gICAgICAgICAgICB0aGlzLmFpLmNoYXNlTW9kZS5zdGF0ZSA9IHRydWU7XG4gICAgICAgICAgICB0aGlzLmFpLmNoYXNlTW9kZS5jaGFzZVN1YmplY3QueCA9IHg7XG4gICAgICAgICAgICB0aGlzLmFpLmNoYXNlTW9kZS5maXJzdENoYXNlU3ViamVjdC54ID0geDtcbiAgICAgICAgICAgIHRoaXMuYWkuY2hhc2VNb2RlLmNoYXNlU3ViamVjdC55ID0geTtcbiAgICAgICAgICAgIHRoaXMuYWkuY2hhc2VNb2RlLmZpcnN0Q2hhc2VTdWJqZWN0LnkgPSB5O1xuICAgICAgICAgIH1cbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBcIm1pc3NlZFwiOlxuICAgICAgICAgIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiY29tcHV0ZXIgbWlzc2VkXCIpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBcInJlcGV0aWRvXCI6XG4gICAgICAgICAge1xuICAgICAgICAgICAgY29tcHV0ZXIuYXR0YWNrKHBsYXllckJvYXJkT2JqKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfVxuICB9LFxuICBwbGFjZVNoaXA6IGZ1bmN0aW9uIChjb21wdXRlckJvYXJkT2JqLCBsZW5ndGgpIHtcbiAgICBpZiAodGhpcy5yYW5kb21JbnRGcm9tSW50ZXJ2YWwoMCwgMSkgPT09IDApIHtcbiAgICAgIC8vcGxhY2VzaGlwIGhvcml6b250YWxseVxuICAgICAgY29uc3QgeCA9IHRoaXMucmFuZG9tSW50RnJvbUludGVydmFsKDAsIDkpO1xuICAgICAgY29uc3QgeSA9IHRoaXMucmFuZG9tSW50RnJvbUludGVydmFsKDAsIDkpO1xuICAgICAgaWYgKGNvbXB1dGVyQm9hcmRPYmoud2lsbEZvbGxvd1J1bGVzKGxlbmd0aCwgeCwgeSkpIHtcbiAgICAgICAgY29tcHV0ZXJCb2FyZE9iai5wbGFjZVNoaXAobGVuZ3RoLCB4LCB5KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMucGxhY2VTaGlwKGNvbXB1dGVyQm9hcmRPYmosIGxlbmd0aCk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vcGxhY2VzaGlwIHZlcnRpY2FsbHlcbiAgICAgIGNvbnN0IHggPSB0aGlzLnJhbmRvbUludEZyb21JbnRlcnZhbCgwLCA5KTtcbiAgICAgIGNvbnN0IHkgPSB0aGlzLnJhbmRvbUludEZyb21JbnRlcnZhbCgwLCA5KTtcbiAgICAgIGlmIChjb21wdXRlckJvYXJkT2JqLndpbGxGb2xsb3dSdWxlc1ZlcnRpY2FsbHkobGVuZ3RoLCB4LCB5KSkge1xuICAgICAgICBjb21wdXRlckJvYXJkT2JqLnBsYWNlU2hpcFZlcnRpY2FsbHkobGVuZ3RoLCB4LCB5KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMucGxhY2VTaGlwKGNvbXB1dGVyQm9hcmRPYmosIGxlbmd0aCk7XG4gICAgICB9XG4gICAgfVxuICB9LFxuICByYW5kb21JbnRGcm9tSW50ZXJ2YWw6IGZ1bmN0aW9uIChtaW4sIG1heCkge1xuICAgIC8vIG1pbiBhbmQgbWF4IGluY2x1ZGVkXG5cbiAgICByZXR1cm4gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogKG1heCAtIG1pbiArIDEpICsgbWluKTtcbiAgfSxcbn07XG5cbmxldCBwbGF5ZXIgPSB7XG4gIGF0dGFjazogZnVuY3Rpb24gKGNvbXB1dGVyQm9hcmRPYmopIHtcbiAgICBjb25zb2xlLmxvZyhcInBsYXllckF0dGFjayBmdW5jdGlvblwiKTtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gYXNkKHJlc29sdmUpIHtcbiAgICAgIGNvbnN0IGNvbXB1dGVyQm9hcmQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImNvbXB1dGVyQm9hcmRcIik7XG4gICAgICBjb21wdXRlckJvYXJkLmFkZEV2ZW50TGlzdGVuZXIoXG4gICAgICAgIFwiY2xpY2tcIixcbiAgICAgICAgKGUpID0+IHtcbiAgICAgICAgICBpZiAoXG4gICAgICAgICAgICBlLnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoXCJib2FyZFwiKSB8fFxuICAgICAgICAgICAgZS50YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKFwicm93XCIpXG4gICAgICAgICAgKSB7XG4gICAgICAgICAgICBhc2QocmVzb2x2ZSk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGxldCB4ID0gZS50YXJnZXQuZGF0YXNldC54O1xuICAgICAgICAgICAgbGV0IHkgPSBlLnRhcmdldC5wYXJlbnRFbGVtZW50LmRhdGFzZXQueTtcblxuICAgICAgICAgICAgc3dpdGNoIChjb21wdXRlckJvYXJkT2JqLnJlY2l2ZUF0dGFjayh4LCB5KSkge1xuICAgICAgICAgICAgICBjYXNlIFwiaGl0XCI6XG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgcmVzb2x2ZSgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgY2FzZSBcIm1pc3NlZFwiOlxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgIHJlc29sdmUoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgIGNhc2UgXCJyZXBldGlkb1wiOlxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwicmVwZXRpZG8gaW50ZW50YSBkZW51ZXZvXCIpO1xuICAgICAgICAgICAgICAgICAgYXNkKHJlc29sdmUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH0sXG5cbiAgICAgICAgeyBvbmNlOiB0cnVlIH1cbiAgICAgICk7XG4gICAgfSk7XG4gIH0sXG4gIHBsYWNlU2hpcDogZnVuY3Rpb24gKGxlbmd0aCwgcGxheWVyQm9hcmRJZCwgcGxheWVyQm9hcmRPYmopIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gYXNkKHJlc29sdmUpIHtcbiAgICAgIGNvbnN0IHBsYXllckJvYXJkID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQocGxheWVyQm9hcmRJZCk7XG4gICAgICBwbGF5ZXJCb2FyZC5hZGRFdmVudExpc3RlbmVyKFxuICAgICAgICBcImNsaWNrXCIsXG4gICAgICAgIChlKSA9PiB7XG4gICAgICAgICAgaWYgKFxuICAgICAgICAgICAgZS50YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKFwiYm9hcmRcIikgfHxcbiAgICAgICAgICAgIGUudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucyhcInJvd1wiKVxuICAgICAgICAgICkge1xuICAgICAgICAgICAgYXNkKHJlc29sdmUpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBsZXQgeCA9IGUudGFyZ2V0LmRhdGFzZXQueDtcblxuICAgICAgICAgICAgbGV0IHkgPSBlLnRhcmdldC5wYXJlbnRFbGVtZW50LmRhdGFzZXQueTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGUudGFyZ2V0KTtcblxuICAgICAgICAgICAgY29uc3QgYXhpc0J1dHRvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiYXhpcy1idXR0b25cIik7XG4gICAgICAgICAgICBpZiAoYXhpc0J1dHRvbi5kYXRhc2V0LmRpcmVjdGlvbiA9PT0gXCJob3Jpem9udGFsXCIpIHtcbiAgICAgICAgICAgICAgaWYgKHBsYXllckJvYXJkT2JqLndpbGxGb2xsb3dSdWxlcyhsZW5ndGgsIHgsIHkpKSB7XG4gICAgICAgICAgICAgICAgcGxheWVyQm9hcmRPYmoucGxhY2VTaGlwKGxlbmd0aCwgeCwgeSk7XG4gICAgICAgICAgICAgICAgLy9kb20gZnVuY3Rpb24gdG8gZGlzcGxheSBhbmQgaW1hZ2Ugb2YgdGhlIHNoaXBcbiAgICAgICAgICAgICAgICBkb21QbGFjZVNoaXBJbWcobGVuZ3RoLCB4LCB5LCBwbGF5ZXJCb2FyZE9iaik7XG4gICAgICAgICAgICAgICAgcmVzb2x2ZSgpO1xuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGFzZChyZXNvbHZlKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIGlmIChheGlzQnV0dG9uLmRhdGFzZXQuZGlyZWN0aW9uID09PSBcInZlcnRpY2FsXCIpIHtcbiAgICAgICAgICAgICAgaWYgKHBsYXllckJvYXJkT2JqLndpbGxGb2xsb3dSdWxlc1ZlcnRpY2FsbHkobGVuZ3RoLCB4LCB5KSkge1xuICAgICAgICAgICAgICAgIHBsYXllckJvYXJkT2JqLnBsYWNlU2hpcFZlcnRpY2FsbHkobGVuZ3RoLCB4LCB5KTtcbiAgICAgICAgICAgICAgICBkb21QbGFjZVNoaXBJbWcobGVuZ3RoLCB4LCB5LCBwbGF5ZXJCb2FyZE9iaiwgdHJ1ZSk7XG4gICAgICAgICAgICAgICAgcmVzb2x2ZSgpO1xuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGFzZChyZXNvbHZlKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfSxcblxuICAgICAgICB7IG9uY2U6IHRydWUgfVxuICAgICAgKTtcbiAgICB9KTtcbiAgfSxcbn07XG5cbmV4cG9ydCB7IHBsYXllciwgY29tcHV0ZXIgfTtcbiIsImNvbnN0IHNoaXBGYWN0b3J5ID0gKGxlbmd0aCkgPT4ge1xuICBsZXQgaGl0cyA9IDA7XG4gIGNvbnN0IGlzU3VuayA9IGZ1bmN0aW9uICgpIHtcbiAgICAvL2NvbnNvbGUubG9nKGB0aGlzLmxlbmd0aCBpczoke3RoaXMubGVuZ3RofWApO1xuICAgIHJldHVybiB0aGlzLmxlbmd0aCAtIHRoaXMuaGl0cyA9PSAwO1xuICB9O1xuICBjb25zdCBoaXQgPSBmdW5jdGlvbiAoKSB7XG4gICAgdGhpcy5oaXRzKys7XG4gIH07XG5cbiAgcmV0dXJuIHsgbGVuZ3RoLCBoaXRzLCBpc1N1bmssIGhpdCB9O1xufTtcblxuZXhwb3J0IGRlZmF1bHQgc2hpcEZhY3Rvcnk7XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCBnYW1lYm9hcmRGYWN0b3J5IGZyb20gXCIuL2dhbWVib2FyZEZhY3RvcnlcIjtcbmltcG9ydCBzaGlwRmFjdG9yeSBmcm9tIFwiLi9zaGlwRmFjdG9yeVwiO1xuaW1wb3J0IHsgZG9tUmVuZGVyQm9hcmQsIGRvbVBvcHVsYXRlQm9hcmQsIGF4aXNCdXR0b24gfSBmcm9tIFwiLi9kb21JbnRlcmFjdGlvblwiO1xuaW1wb3J0IHsgZ2FtZUxvb3AgfSBmcm9tIFwiLi9nYW1lTG9vcFwiO1xuXG5nYW1lTG9vcCgpO1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9