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
/* harmony export */   "fightMessage": () => (/* binding */ fightMessage)
/* harmony export */ });
function axisButton() {
  const axisButton = document.getElementById("axis-selector");
  axisButton.addEventListener("click", () => {
    if (axisButton.dataset.direction === "horizontal") {
      axisButton.dataset.direction = "vertical";
    } else {
      axisButton.dataset.direction = "horizontal";
    }
  });
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

function fightMessage() {
  const content = document.getElementById("content");
  const div = document.createElement("div");
  div.id = "figth-message";
  div.innerText = " Que empieze la batalla...";
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
  console.log("place your 2 ship");
  await _players__WEBPACK_IMPORTED_MODULE_2__.player.placeShip(2, "playerBoard", playerBoardObj);
  (0,_domInteraction__WEBPACK_IMPORTED_MODULE_0__.domPopulateBoard)(playerBoardObj, "#playerBoard", true);

  _players__WEBPACK_IMPORTED_MODULE_2__.computer.placeShip(computerBoardObj, 3);
  //console.log(computerBoardObj.fleet);
  console.log("place your 3 ship");
  await _players__WEBPACK_IMPORTED_MODULE_2__.player.placeShip(3, "playerBoard", playerBoardObj);
  (0,_domInteraction__WEBPACK_IMPORTED_MODULE_0__.domPopulateBoard)(playerBoardObj, "#playerBoard", true);

  _players__WEBPACK_IMPORTED_MODULE_2__.computer.placeShip(computerBoardObj, 3);
  //console.log(computerBoardObj.fleet);
  console.log("place your 3 ship");
  await _players__WEBPACK_IMPORTED_MODULE_2__.player.placeShip(3, "playerBoard", playerBoardObj);
  (0,_domInteraction__WEBPACK_IMPORTED_MODULE_0__.domPopulateBoard)(playerBoardObj, "#playerBoard", true);

  _players__WEBPACK_IMPORTED_MODULE_2__.computer.placeShip(computerBoardObj, 4);
  //console.log(computerBoardObj.fleet);
  console.log("place your 4 ship");
  await _players__WEBPACK_IMPORTED_MODULE_2__.player.placeShip(4, "playerBoard", playerBoardObj);
  (0,_domInteraction__WEBPACK_IMPORTED_MODULE_0__.domPopulateBoard)(playerBoardObj, "#playerBoard", true);

  _players__WEBPACK_IMPORTED_MODULE_2__.computer.placeShip(computerBoardObj, 5);
  //console.log(computerBoardObj.fleet);
  console.log("place your 5 ship");
  await _players__WEBPACK_IMPORTED_MODULE_2__.player.placeShip(5, "playerBoard", playerBoardObj);
  (0,_domInteraction__WEBPACK_IMPORTED_MODULE_0__.domPopulateBoard)(playerBoardObj, "#playerBoard", true);

  //3-  We’ll leave the HTML implementation up to you for now, but you should display both the player’s boards and render them using information from the Gameboard class.

  /* domPopulateBoard(playerBoardObj, "#playerBoard");
  domPopulateBoard(computerBoardObj, "#computerBoard", false); */

  // -3-1 You need methods to render the gameboards /done/ and to take user input for attacking/done/. For attacks, let the user click on a coordinate in the enemy Gameboard.
  //-4 The game loop should step through the game turn by turn using only methods from other objects. If at any point you are tempted to write a new function inside the game loop, step back and figure out which class or module that function should belong to.

  //display message !!!
  (0,_domInteraction__WEBPACK_IMPORTED_MODULE_0__.fightMessage)();
  for (
    let turn = 1;
    //Create conditions so that the game ends once one players ships have all been sunk. This function is appropriate for the Game module.
    computerBoardObj.isGameOver() === false &&
    playerBoardObj.isGameOver() === false;
    turn++
  ) {
    console.log("awaiting player attack");

    await _players__WEBPACK_IMPORTED_MODULE_2__.player.attack(computerBoardObj);
    (0,_domInteraction__WEBPACK_IMPORTED_MODULE_0__.domPopulateBoard)(computerBoardObj, "#computerBoard", false);

    console.log("computerAttackNExt");

    _players__WEBPACK_IMPORTED_MODULE_2__.computer.attack(playerBoardObj);
    (0,_domInteraction__WEBPACK_IMPORTED_MODULE_0__.domPopulateBoard)(playerBoardObj, "#playerBoard");
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

            const axisButton = document.getElementById("axis-selector");
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





(0,_domInteraction__WEBPACK_IMPORTED_MODULE_2__.axisButton)();
(0,_gameLoop__WEBPACK_IMPORTED_MODULE_3__.gameLoop)();

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFBcUM7O0FBRXJDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQkFBb0IsNEJBQTRCOztBQUVoRDtBQUNBO0FBQ0EseUJBQXlCLDRCQUE0QjtBQUNyRDtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTCxHQUFHOztBQUVIO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVk7QUFDWjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxRQUFRO0FBQ1I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBLG9FQUFvRTtBQUNwRSwrQkFBK0Isb0VBQThCO0FBQzdEO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsUUFBUTtBQUNSO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLDRCQUE0QjtBQUM1Qjs7QUFFQTtBQUNBLE1BQU0scURBQWU7QUFDckI7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxjQUFjO0FBQ2Q7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLHdFQUF3RTs7QUFFeEU7QUFDQTtBQUNBOztBQUVBLDRFQUE0RTtBQUM1RTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDs7QUFFYzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNsVGQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0EsR0FBRztBQUNIOztBQUVBO0FBQ0EsNkRBQTZELEdBQUcsVUFBVSxFQUFFO0FBQzVFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUIsS0FBSzs7QUFFdEI7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLGtCQUFrQixRQUFRO0FBQzFCO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtCQUFrQixRQUFRO0FBQzFCO0FBQ0EsNkJBQTZCLEVBQUU7QUFDL0I7O0FBRUEsb0JBQW9CLFlBQVk7QUFDaEM7O0FBRUEscUNBQXFDLEVBQUU7QUFDdkM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxrQkFBa0IsUUFBUTtBQUMxQixvQkFBb0IsUUFBUTtBQUM1QjtBQUNBLFdBQVcsa0JBQWtCLE9BQU8sR0FBRyxVQUFVLEVBQUU7QUFDbkQ7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWLFVBQVU7QUFDVjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBU0U7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ3ZJd0I7QUFDd0I7QUFDTDs7QUFFN0M7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1DQUFtQyxpRUFBZ0I7QUFDbkQsbUNBQW1DLGlFQUFnQjtBQUNuRCxtQ0FBbUMsK0RBQWMsa0JBQWtCO0FBQ25FO0FBQ0EsbUNBQW1DLGlFQUFnQjtBQUNuRDs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxxQ0FBcUMsaUVBQWdCO0FBQ3JEO0FBQ0EscUNBQXFDLCtEQUFjLG9CQUFvQjtBQUN2RSxxQ0FBcUMsaUVBQWdCO0FBQ3JELHFDQUFxQyxpRUFBZ0I7O0FBRXJEO0FBQ0Esc0JBQXNCLGlFQUFnQjtBQUN0QztBQUNBO0FBQ0E7O0FBRUEseUJBQXlCLDZEQUFnQjtBQUN6QywyQkFBMkIsNkRBQWdCOztBQUUzQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx5Q0FBeUM7QUFDekM7QUFDQSxFQUFFLHdEQUFrQjtBQUNwQjtBQUNBO0FBQ0EsUUFBUSxzREFBZ0I7QUFDeEIsRUFBRSxpRUFBZ0I7O0FBRWxCLEVBQUUsd0RBQWtCO0FBQ3BCO0FBQ0E7QUFDQSxRQUFRLHNEQUFnQjtBQUN4QixFQUFFLGlFQUFnQjs7QUFFbEIsRUFBRSx3REFBa0I7QUFDcEI7QUFDQTtBQUNBLFFBQVEsc0RBQWdCO0FBQ3hCLEVBQUUsaUVBQWdCOztBQUVsQixFQUFFLHdEQUFrQjtBQUNwQjtBQUNBO0FBQ0EsUUFBUSxzREFBZ0I7QUFDeEIsRUFBRSxpRUFBZ0I7O0FBRWxCLEVBQUUsd0RBQWtCO0FBQ3BCO0FBQ0E7QUFDQSxRQUFRLHNEQUFnQjtBQUN4QixFQUFFLGlFQUFnQjs7QUFFbEI7O0FBRUE7QUFDQSwrREFBK0Q7O0FBRS9EO0FBQ0E7O0FBRUE7QUFDQSxFQUFFLDZEQUFZO0FBQ2Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxVQUFVLG1EQUFhO0FBQ3ZCLElBQUksaUVBQWdCOztBQUVwQjs7QUFFQSxJQUFJLHFEQUFlO0FBQ25CLElBQUksaUVBQWdCO0FBQ3BCOztBQUVBO0FBQ0E7O0FBRW9COzs7Ozs7Ozs7Ozs7Ozs7O0FDbklvQjs7QUFFeEM7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwwQkFBMEIsd0RBQVc7QUFDckM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDZCQUE2Qix3REFBVztBQUN4QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw4QkFBOEIsd0RBQVc7QUFDekM7QUFDQSxZQUFZO0FBQ1osOEJBQThCLHdEQUFXO0FBQ3pDO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0EsNkJBQTZCLHdEQUFXO0FBQ3hDO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQSxvQkFBb0IsWUFBWTtBQUNoQztBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMEJBQTBCLHdEQUFXO0FBQ3JDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw2QkFBNkIsd0RBQVc7QUFDeEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsOEJBQThCLHdEQUFXO0FBQ3pDO0FBQ0EsWUFBWTtBQUNaLDhCQUE4Qix3REFBVztBQUN6QztBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSw2QkFBNkIsd0RBQVc7QUFDeEM7QUFDQTs7QUFFQTtBQUNBOztBQUVBLG9CQUFvQixZQUFZO0FBQ2hDO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRO0FBQ1I7QUFDQTtBQUNBLE1BQU07QUFDTjs7QUFFQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRO0FBQ1I7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzQkFBc0IsWUFBWTtBQUNsQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxRQUFRO0FBQ1I7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxzQkFBc0IsWUFBWTtBQUNsQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRO0FBQ1I7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRO0FBQ1I7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxpRUFBZSxnQkFBZ0IsRUFBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDak5OO0FBQ3lCOztBQUVuRDtBQUNBLElBQUk7O0FBRUo7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQVE7QUFDUjtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRO0FBQ1I7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7O0FBRUE7QUFDQSxHQUFHO0FBQ0g7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFZO0FBQ1o7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7O0FBRVQsVUFBVTtBQUNWO0FBQ0EsS0FBSztBQUNMLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBWTtBQUNaOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdCQUFnQixnRUFBZTtBQUMvQjtBQUNBLGdCQUFnQjtBQUNoQjtBQUNBO0FBQ0EsY0FBYztBQUNkO0FBQ0E7QUFDQSxnQkFBZ0IsZ0VBQWU7QUFDL0I7QUFDQSxnQkFBZ0I7QUFDaEI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTOztBQUVULFVBQVU7QUFDVjtBQUNBLEtBQUs7QUFDTCxHQUFHO0FBQ0g7O0FBRTRCOzs7Ozs7Ozs7Ozs7Ozs7QUNsTTVCO0FBQ0E7QUFDQTtBQUNBLG9DQUFvQyxZQUFZO0FBQ2hEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsV0FBVztBQUNYOztBQUVBLGlFQUFlLFdBQVcsRUFBQzs7Ozs7OztVQ2IzQjtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7Ozs7Ozs7Ozs7O0FDTmtEO0FBQ1Y7QUFDd0M7QUFDMUM7O0FBRXRDLDJEQUFVO0FBQ1YsbURBQVEiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9wcm9qZWN0LWJhdHRsZXNoaXAvLi9zcmMvYWkuanMiLCJ3ZWJwYWNrOi8vcHJvamVjdC1iYXR0bGVzaGlwLy4vc3JjL2RvbUludGVyYWN0aW9uLmpzIiwid2VicGFjazovL3Byb2plY3QtYmF0dGxlc2hpcC8uL3NyYy9nYW1lTG9vcC5qcyIsIndlYnBhY2s6Ly9wcm9qZWN0LWJhdHRsZXNoaXAvLi9zcmMvZ2FtZWJvYXJkRmFjdG9yeS5qcyIsIndlYnBhY2s6Ly9wcm9qZWN0LWJhdHRsZXNoaXAvLi9zcmMvcGxheWVycy5qcyIsIndlYnBhY2s6Ly9wcm9qZWN0LWJhdHRsZXNoaXAvLi9zcmMvc2hpcEZhY3RvcnkuanMiLCJ3ZWJwYWNrOi8vcHJvamVjdC1iYXR0bGVzaGlwL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3Byb2plY3QtYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vcHJvamVjdC1iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vcHJvamVjdC1iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vcHJvamVjdC1iYXR0bGVzaGlwLy4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGNvbXB1dGVyIH0gZnJvbSBcIi4vcGxheWVyc1wiO1xuXG5jb25zdCBhaSA9IHtcbiAgY2hhc2VNb2RlOiB7XG4gICAgd2FzUmV2ZXJzZUFjdGl2YXRlZDogZmFsc2UsXG4gICAgcmV2ZXJzZU1vZGU6IGZhbHNlLFxuICAgIHN0YXRlOiBmYWxzZSxcbiAgICBjaGFzZVN1YmplY3Q6IHsgeDogdW5kZWZpbmVkLCB5OiB1bmRlZmluZWQgfSwgLy94LHlcblxuICAgIHZhbGlkTW92ZXM6IFtcImxlZnRcIiwgXCJyaWdodFwiLCBcInRvcFwiLCBcImJvdHRvbVwiXSxcbiAgICBmb2xsb3dEaXJlY3Rpb246IHVuZGVmaW5lZCxcbiAgICBmaXJzdENoYXNlU3ViamVjdDogeyB4OiB1bmRlZmluZWQsIHk6IHVuZGVmaW5lZCB9LCAvL2ZvciByZXZlcnNlZFxuICAgIGZpcnN0VmFsaWRNb3ZlczogW10sIC8vZm9yIHJldmVyc2VkXG4gICAgZmlyc3REaXJlY3Rpb246IHVuZGVmaW5lZCxcbiAgICBpc0NoYXNpbmc6IGZhbHNlLFxuICB9LFxuICAvL3RoaXMgd2lsbCBtb2RpZnkgdGhlIGFycmF5IHZhbGlkTW92ZXNcbiAgYWRkVmFsaWREaXJlY3Rpb25zOiBmdW5jdGlvbiAocGxheWVyQm9hcmRPYmopIHtcbiAgICB0aGlzLmNoYXNlTW9kZS52YWxpZE1vdmVzID0gW107XG4gICAgY29uc3QgcG9zaWJsZURpcmVjdGlvbnMgPSBbXCJsZWZ0XCIsIFwicmlnaHRcIiwgXCJ0b3BcIiwgXCJib3R0b21cIl07XG5cbiAgICAvLyAvL3JlbW92ZSBkaXJlY2N0aW9ucyB0aGF0IHdpbGwgYmUgb3V0c2lkZSB0aGUgYm9hcmRcbiAgICBzd2l0Y2ggKHRoaXMuY2hhc2VNb2RlLmNoYXNlU3ViamVjdC54KSB7XG4gICAgICBjYXNlIDA6XG4gICAgICAgIHtcbiAgICAgICAgICBjb25zdCBpbmRleCA9IHBvc2libGVEaXJlY3Rpb25zLmluZGV4T2YoXCJsZWZ0XCIpO1xuXG4gICAgICAgICAgcG9zaWJsZURpcmVjdGlvbnMuc3BsaWNlKGluZGV4LCAxKTtcbiAgICAgICAgfVxuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgOTpcbiAgICAgICAge1xuICAgICAgICAgIGNvbnN0IGluZGV4ID0gcG9zaWJsZURpcmVjdGlvbnMuaW5kZXhPZihcInJpZ2h0XCIpO1xuXG4gICAgICAgICAgcG9zaWJsZURpcmVjdGlvbnMuc3BsaWNlKGluZGV4LCAxKTtcbiAgICAgICAgfVxuICAgICAgICBicmVhaztcbiAgICB9XG4gICAgc3dpdGNoICh0aGlzLmNoYXNlTW9kZS5jaGFzZVN1YmplY3QueSkge1xuICAgICAgY2FzZSAwOlxuICAgICAgICB7XG4gICAgICAgICAgY29uc3QgaW5kZXggPSBwb3NpYmxlRGlyZWN0aW9ucy5pbmRleE9mKFwidG9wXCIpO1xuXG4gICAgICAgICAgcG9zaWJsZURpcmVjdGlvbnMuc3BsaWNlKGluZGV4LCAxKTtcbiAgICAgICAgfVxuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgOTpcbiAgICAgICAge1xuICAgICAgICAgIGNvbnN0IGluZGV4ID0gcG9zaWJsZURpcmVjdGlvbnMuaW5kZXhPZihcImJvdHRvbVwiKTtcblxuICAgICAgICAgIHBvc2libGVEaXJlY3Rpb25zLnNwbGljZShpbmRleCwgMSk7XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG4gICAgfVxuXG4gICAgLy9yZW1vdmUgdGhlIGRpcmVjdGlvbnMgdGhhdCBub3QgZm9sbG93IHJ1bGVzXG4gICAgLy9vbmx5IGluIGNoYXNlU3ViamVjdFxuICAgIHBvc2libGVEaXJlY3Rpb25zLmZvckVhY2goKGRpcmVjdGlvbikgPT4ge1xuICAgICAgaWYgKFxuICAgICAgICBwbGF5ZXJCb2FyZE9iai5hdHRhY2tSZXN1bHRPbmx5KFxuICAgICAgICAgIHRoaXMuY29vcmRpbmF0ZXMoZGlyZWN0aW9uKS54LFxuICAgICAgICAgIHRoaXMuY29vcmRpbmF0ZXMoZGlyZWN0aW9uKS55XG4gICAgICAgICkgIT09IFwicmVwZXRpZG9cIlxuICAgICAgKSB7XG4gICAgICAgIHRoaXMuY2hhc2VNb2RlLnZhbGlkTW92ZXMucHVzaChkaXJlY3Rpb24pO1xuICAgICAgfVxuICAgIH0pO1xuICB9LFxuXG4gIC8vcGljayBhIGRpcmVjdGlvblxuICAvL3RoaXMgd2lsbCByZXR1cm4gYSBkaXJlY3Rpb25cblxuICAvLyBpZiBpdCBoYXMgMiBjb25zZWN1dGl2ZSBoaXRze1xuICAvLyBrZWVwIGluIHRoZSBzdWNjZXNmdWxsIGRpcmVjdGlvblxuICAvL2lmIHBvc2libGVcbiAgLy9pZiBub3QsIHJldHVybiB1bmRlZmluZWQsYSByYW5kb20gZGlyZWN0aW9uIHdpbGwgdHJpZ2dlciBsYXRlciBpbiB0aGUgY29kZX1cbiAgLy9lbHNlIGlmIHRoZXJlIHdhcyBvbmx5IDEgaGl0IHtcbiAgLy8gcGljayBhIHJhbmRvbSBkaXJlY3Rpb24gb2YgdGhlIHZhbGlkIGRpcmVjdGlvbnMgYXJyYXksIGlmIHRoZSBhcnJheSBpcyBlbXB0eSwgZ28gdG8gYSByYW5kb20gZGlyZWN0aW9uIG9mIHRoZSBib2FyZChhIHJhbmRvbSBkaXJlY3Rpb24gd2lsbCB0cmlnZ2VyIGxhdGVyIGluIHRoZSBjb2RlKVxuXG4gIGRpcmVjdGlvbjogZnVuY3Rpb24gKCkge1xuICAgIGlmICh0aGlzLmNoYXNlTW9kZS5pc0NoYXNpbmcpIHtcbiAgICAgIGlmICghdGhpcy5jaGFzZU1vZGUud2FzUmV2ZXJzZUFjdGl2YXRlZCkge1xuICAgICAgICBpZiAoXG4gICAgICAgICAgIXRoaXMuY2hhc2VNb2RlLnZhbGlkTW92ZXMuaW5jbHVkZXModGhpcy5jaGFzZU1vZGUuZm9sbG93RGlyZWN0aW9uKVxuICAgICAgICApIHtcbiAgICAgICAgICAvL3RpbGwgaGVyZSB0aGUgbG9naSBpcyBncmVhdCFcblxuICAgICAgICAgIC8vYWxlcnQoXCJhIHJhbmRvbSBhdHRhY2sgd2lsbCBvY2N1ciAhIEJ1dCBpdCBzaG91bGRudCAhXCIpO1xuICAgICAgICAgIGNvbnNvbGUubG9nKFwiYSByYW5kb20gYXR0YWNrIHdpbGwgb2NjdXIgISBCdXQgaXQgc2hvdWxkbnQgIVwiKTtcbiAgICAgICAgICAvL2FsZXJ0KHRoaXMuY2hhc2VNb2RlLndhc1JldmVyc2VBY3RpdmF0ZWQpO1xuICAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMuY2hhc2VNb2RlLndhc1JldmVyc2VBY3RpdmF0ZWQpO1xuICAgICAgICAgIC8vdHJ5IHJldmVyc2VcblxuICAgICAgICAgIGxldCBvcG9zaXRlID0gdW5kZWZpbmVkO1xuICAgICAgICAgIHN3aXRjaCAodGhpcy5jaGFzZU1vZGUuZm9sbG93RGlyZWN0aW9uKSB7XG4gICAgICAgICAgICBjYXNlIFwibGVmdFwiOlxuICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgb3Bvc2l0ZSA9IFwicmlnaHRcIjtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgXCJyaWdodFwiOlxuICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgb3Bvc2l0ZSA9IFwibGVmdFwiO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBcInRvcFwiOlxuICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgb3Bvc2l0ZSA9IFwiYm90dG9tXCI7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIFwiYm90dG9tXCI6XG4gICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBvcG9zaXRlID0gXCJ0b3BcIjtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKHRoaXMuY2hhc2VNb2RlLmZpcnN0VmFsaWRNb3Zlcy5pbmNsdWRlcyhvcG9zaXRlKSkge1xuICAgICAgICAgICAgLy91c2UgcmV2ZXJzZVxuICAgICAgICAgICAgdGhpcy5jaGFzZU1vZGUud2FzUmV2ZXJzZUFjdGl2YXRlZCA9IHRydWU7XG4gICAgICAgICAgICB0aGlzLmNoYXNlTW9kZS5jaGFzZVN1YmplY3QgPSB0aGlzLmNoYXNlTW9kZS5maXJzdENoYXNlU3ViamVjdDtcbiAgICAgICAgICAgIHRoaXMuY2hhc2VNb2RlLmZvbGxvd0RpcmVjdGlvbiA9IG9wb3NpdGU7XG4gICAgICAgICAgICByZXR1cm4gb3Bvc2l0ZTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgLy9hIHJhbmRvbSBkaXJlY3Rpb24gd2lsbCB0cmlnZ2VyIGxhdGVyIGluIHRoZSBjb2RlXG4gICAgICAgICAgICB0aGlzLmNoYXNlTW9kZS5zdGF0ZSA9IGZhbHNlO1xuICAgICAgICAgICAgdGhpcy5jaGFzZU1vZGUuaXNDaGFzaW5nID0gZmFsc2U7XG4gICAgICAgICAgICAvL3RoaXMuY2hhc2VNb2RlLndhc1JldmVyc2VBY3RpdmF0ZWQgPSBmYWxzZVxuICAgICAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAodGhpcy5jaGFzZU1vZGUuaXNDaGFzaW5nKSB7XG4gICAgICBpZiAodGhpcy5jaGFzZU1vZGUud2FzUmV2ZXJzZUFjdGl2YXRlZCkge1xuICAgICAgICBpZiAoXG4gICAgICAgICAgIXRoaXMuY2hhc2VNb2RlLnZhbGlkTW92ZXMuaW5jbHVkZXModGhpcy5jaGFzZU1vZGUuZm9sbG93RGlyZWN0aW9uKVxuICAgICAgICApIHtcbiAgICAgICAgICB0aGlzLmNoYXNlTW9kZS53YXNSZXZlcnNlQWN0aXZhdGVkID0gZmFsc2U7XG4gICAgICAgICAgLy9hbGVydChcInRoaXMgc2hvdWxkIHRyaWdnZXIgYSByYW5kb20gZGlyZWN0aW9uIGJ1dCBpdCBkb2VzbnQgIVwiKTtcbiAgICAgICAgICBjb25zb2xlLmxvZyhcInRoaXMgc2hvdWxkIHRyaWdnZXIgYSByYW5kb20gZGlyZWN0aW9uIGJ1dCBpdCBkb2VzbnQgIVwiKTtcbiAgICAgICAgICAvL2FsZXJ0KHRoaXMuY2hhc2VNb2RlLndhc1JldmVyc2VBY3RpdmF0ZWQpO1xuICAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMuY2hhc2VNb2RlLndhc1JldmVyc2VBY3RpdmF0ZWQpO1xuICAgICAgICAgIC8vYSByYW5kb20gZGlyZWN0aW9uIHdpbGwgdHJpZ2dlciBsYXRlciBpbiB0aGUgY29kZVxuICAgICAgICAgIHRoaXMuY2hhc2VNb2RlLnN0YXRlID0gZmFsc2U7XG4gICAgICAgICAgdGhpcy5jaGFzZU1vZGUuaXNDaGFzaW5nID0gZmFsc2U7XG4gICAgICAgICAgLy90aGlzLmNoYXNlTW9kZS53YXNSZXZlcnNlQWN0aXZhdGVkID0gZmFsc2VcblxuICAgICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAodGhpcy5jaGFzZU1vZGUuaXNDaGFzaW5nKSB7XG4gICAgICBpZiAodGhpcy5jaGFzZU1vZGUudmFsaWRNb3Zlcy5pbmNsdWRlcyh0aGlzLmNoYXNlTW9kZS5mb2xsb3dEaXJlY3Rpb24pKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmNoYXNlTW9kZS5mb2xsb3dEaXJlY3Rpb247XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvL2EgcmFuZG9tIGRpcmVjdGlvbiB3aWxsIHRyaWdnZXIgbGF0ZXIgaW4gdGhlIGNvZGVcbiAgICAgICAgdGhpcy5jaGFzZU1vZGUuc3RhdGUgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5jaGFzZU1vZGUuaXNDaGFzaW5nID0gZmFsc2U7XG4gICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgICB9XG4gICAgfSBlbHNlIGlmICh0aGlzLmNoYXNlTW9kZS5pc0NoYXNpbmcgPT09IGZhbHNlKSB7XG4gICAgICBpZiAodGhpcy5jaGFzZU1vZGUudmFsaWRNb3Zlcy5sZW5ndGggPj0gMSkge1xuICAgICAgICB0aGlzLmNoYXNlTW9kZS5maXJzdFZhbGlkTW92ZXMgPSB0aGlzLmNoYXNlTW9kZS52YWxpZE1vdmVzOyAvL3RoaXMgaXMgZm9yIHJldmVyc2UgbW9kZSBsYXRlclxuICAgICAgICBjb25zdCBkaXJlY3Rpb25JbmRleCA9IGNvbXB1dGVyLnJhbmRvbUludEZyb21JbnRlcnZhbChcbiAgICAgICAgICAwLFxuICAgICAgICAgIHRoaXMuY2hhc2VNb2RlLnZhbGlkTW92ZXMubGVuZ3RoIC0gMVxuICAgICAgICApO1xuICAgICAgICBjb25zdCBkaXJlY3Rpb24gPSB0aGlzLmNoYXNlTW9kZS52YWxpZE1vdmVzW2RpcmVjdGlvbkluZGV4XTtcblxuICAgICAgICByZXR1cm4gZGlyZWN0aW9uO1xuICAgICAgfSBlbHNlIGlmICh0aGlzLmNoYXNlTW9kZS52YWxpZE1vdmVzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICB0aGlzLmNoYXNlTW9kZS5zdGF0ZSA9IGZhbHNlO1xuICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgICAgfVxuICAgIH1cbiAgfSxcbiAgLy90cmFuc2Zvcm0gZGlyZWN0aW9uIGludG8gY29vcmRpbmF0ZVxuICAvL3RoaXMgd2lsbCByZXR1cm4gYSBjb29yZGluYXRlXG4gIC8vIHt4LHl9XG4gIGNvb3JkaW5hdGVzOiBmdW5jdGlvbiAoZGlyZWN0aW9uKSB7XG4gICAgaWYgKGRpcmVjdGlvbiA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgIH1cblxuICAgIHN3aXRjaCAoZGlyZWN0aW9uKSB7XG4gICAgICBjYXNlIFwibGVmdFwiOiB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgeDogdGhpcy5jaGFzZU1vZGUuY2hhc2VTdWJqZWN0LnggLSAxLFxuICAgICAgICAgIHk6IHRoaXMuY2hhc2VNb2RlLmNoYXNlU3ViamVjdC55LFxuICAgICAgICB9O1xuICAgICAgfVxuXG4gICAgICBjYXNlIFwicmlnaHRcIjoge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIHg6IHRoaXMuY2hhc2VNb2RlLmNoYXNlU3ViamVjdC54ICsgMSxcbiAgICAgICAgICB5OiB0aGlzLmNoYXNlTW9kZS5jaGFzZVN1YmplY3QueSxcbiAgICAgICAgfTtcbiAgICAgIH1cblxuICAgICAgY2FzZSBcInRvcFwiOlxuICAgICAgICB7XG4gICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHg6IHRoaXMuY2hhc2VNb2RlLmNoYXNlU3ViamVjdC54LFxuICAgICAgICAgICAgeTogdGhpcy5jaGFzZU1vZGUuY2hhc2VTdWJqZWN0LnkgLSAxLFxuICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIFwiYm90dG9tXCI6IHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICB4OiB0aGlzLmNoYXNlTW9kZS5jaGFzZVN1YmplY3QueCxcbiAgICAgICAgICB5OiB0aGlzLmNoYXNlTW9kZS5jaGFzZVN1YmplY3QueSArIDEsXG4gICAgICAgIH07XG4gICAgICB9XG4gICAgfVxuICB9LFxuXG4gIC8vdXNlIHRoZSBuZXcgY29vcmRpbmF0ZSBhbmQgZGlyZWN0aW9uXG5cbiAgLy9pZiBubyBkaXJlY3Rpb24gd2FzIHNlbGVjdGVkXG4gIC8vYXR0YWNrIGEgcmFuZG9tIHBvc2l0aW9uIG9uIHRoZSBib2FyZFxuXG4gIC8vaWYgYSBkaXJlY3Rpb24gd2FzIHNlbGVjdGVkXG4gIC8vdGhlcmUgYXJlIDIgYnJhbmNoZXNcblxuICAvL2ZpcnN0IGlmIGlzQ2hhc2luXG4gIC8vYW5kIGhpdHMgdGhlbiB1cGRhdGUgdGhlIGNoYXNlIHN1YmplY3RcblxuICAvLyBpZiBtaXNzZXMgYW5kIGl0IGlzICBpbiByZXZlcnNlTW9kZVxuICAvLyBkaXNhYmxlIGNoYXNlZU1vZGUgYW5kIGl0cyBtb2Rlc1xuXG4gIC8vaWYgaXQgd2FzIG5vdCBpbiByZXZlcnNlIG1vZGVcbiAgLy8gZW5hYmxlIHJldmVyc2VNb2RlXG4gIC8vXG4gIGF0dGFjazogZnVuY3Rpb24gKHBsYXllckJvYXJkT2JqKSB7XG4gICAgLy9zYXZlIGRpcmVjdGlvblxuICAgIGNvbnN0IGRpcmVjdGlvbiA9IHRoaXMuZGlyZWN0aW9uKCk7XG5cbiAgICAvL3NhdmUgY29vcmRpbmF0ZXNcbiAgICBjb25zdCBjb29yZGluYXRlcyA9IHRoaXMuY29vcmRpbmF0ZXMoZGlyZWN0aW9uKTtcblxuICAgIC8vaWYgdGhlIGRpcmVjdGlvbnMgbWV0aG9kIGRpbmR0IHJldHVybiBhbnkgZGlyZWN0aW9uLCBoZW5jZSBjb29yZGluYXRlcyB3aWxsIHJldHVybiB1bmRlZmluZWRcbiAgICAvL2lmIG5vIGluIHJldmVyc2UgbW9kZXthdHRhY2sgaW4gYSByYW5kb20gZGlyZWN0aW9ufVxuICAgIC8vZWxzZXt9XG5cbiAgICBpZiAoY29vcmRpbmF0ZXMgPT09IHVuZGVmaW5lZCkge1xuICAgICAgY29tcHV0ZXIuYXR0YWNrKHBsYXllckJvYXJkT2JqKTtcbiAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuY2hhc2VNb2RlLmlzQ2hhc2luZykge1xuICAgICAgc3dpdGNoIChwbGF5ZXJCb2FyZE9iai5yZWNpdmVBdHRhY2soY29vcmRpbmF0ZXMueCwgY29vcmRpbmF0ZXMueSkpIHtcbiAgICAgICAgY2FzZSBcImhpdFwiOlxuICAgICAgICAgIHtcbiAgICAgICAgICAgIC8vdXBkYXRlIGNoYXNlIHN1YmplY3RcbiAgICAgICAgICAgIHRoaXMuY2hhc2VNb2RlLmNoYXNlU3ViamVjdCA9IGNvb3JkaW5hdGVzO1xuICAgICAgICAgIH1cbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBcIm1pc3NlZFwiOlxuICAgICAgICAgIHtcbiAgICAgICAgICAgIC8vaWYgcmV2ZXJzZSBtb2RlIHdhcyBub3QgaW4gYWN0aXZhdGVke1xuICAgICAgICAgICAgLy9zdGFydCByZXZlcnNlTW9kZX1cbiAgICAgICAgICAgIC8vL2lmIGl0IHdhc3tcbiAgICAgICAgICAgIC8vZW5kIGNoYXNpbk1vZGUgYW5kIGl0cyBtb2Rlc31cblxuICAgICAgICAgICAgaWYgKHRoaXMuY2hhc2VNb2RlLndhc1JldmVyc2VBY3RpdmF0ZWQgIT09IHRydWUpIHtcbiAgICAgICAgICAgICAgdGhpcy5jaGFzZU1vZGUucmV2ZXJzZU1vZGUgPSB0cnVlO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgdGhpcy5jaGFzZU1vZGUuc3RhdGUgPSBmYWxzZTtcbiAgICAgICAgICAgICAgdGhpcy5jaGFzZU1vZGUuaXNDaGFzaW5nID0gZmFsc2U7XG5cbiAgICAgICAgICAgICAgdGhpcy5jaGFzZU1vZGUuZm9sbG93RGlyZWN0aW9uID0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgICB0aGlzLmNoYXNlTW9kZS53YXNSZXZlcnNlQWN0aXZhdGVkID0gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAodGhpcy5jaGFzZU1vZGUuaXNDaGFzaW5nID09PSBmYWxzZSkge1xuICAgICAgc3dpdGNoIChwbGF5ZXJCb2FyZE9iai5yZWNpdmVBdHRhY2soY29vcmRpbmF0ZXMueCwgY29vcmRpbmF0ZXMueSkpIHtcbiAgICAgICAgY2FzZSBcImhpdFwiOlxuICAgICAgICAgIHtcbiAgICAgICAgICAgIC8vdXBkYXRlIHRoZSBjaGFzZSBzdWJqZWN0XG4gICAgICAgICAgICB0aGlzLmNoYXNlTW9kZS5jaGFzZVN1YmplY3QgPSBjb29yZGluYXRlcztcblxuICAgICAgICAgICAgLy9zYXZlIHZhbGlkIG1vdmVzIG9mIHRoZSBmaXJzdCBjaGFzZSBzdWJqZWN0XG4gICAgICAgICAgICB0aGlzLmNoYXNlTW9kZS5maXJzdFZhbGlkTW92ZXMgPSB0aGlzLmNoYXNlTW9kZS52YWxpZE1vdmVzOyAvL2ZvciByZXZlcnNlICFcblxuICAgICAgICAgICAgLy9zdGFydCBhIGNoYXNpbmcgZGlyZWN0aW9uXG4gICAgICAgICAgICB0aGlzLmNoYXNlTW9kZS5mb2xsb3dEaXJlY3Rpb24gPSBkaXJlY3Rpb247XG4gICAgICAgICAgICB0aGlzLmNoYXNlTW9kZS5pc0NoYXNpbmcgPSB0cnVlO1xuXG4gICAgICAgICAgICB0aGlzLmNoYXNlTW9kZS5maXJzdERpcmVjdGlvbiA9IHRoaXMuY2hhc2VNb2RlLmZvbGxvd0RpcmVjdGlvbjsgLy8gZm9yIHJldmVyc2VkXG4gICAgICAgICAgfVxuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIFwibWlzc2VkXCI6XG4gICAgICAgICAge1xuICAgICAgICAgICAgLy9pdCBpcyBub3QgbmVjZXNhcnkgdG8gZG8gYW55dGhpbmcgaGVyZSBiZWNhdXNlIHRoZSBhaSB3aWxsIGtlZXAgdHJ5aW5nIHVudGlsIGl0IGdldHMgYSBoaXRcbiAgICAgICAgICAgIC8vIGFuZCBldmVyeSBtaXNzIGlzIHJlbW92ZWQgZnJvbSB0aGUgdmFsaWQgZGlyZWN0aW9ucyBhcnJheVxuICAgICAgICAgIH1cbiAgICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9XG4gIH0sXG59O1xuXG5leHBvcnQgeyBhaSB9O1xuIiwiZnVuY3Rpb24gYXhpc0J1dHRvbigpIHtcbiAgY29uc3QgYXhpc0J1dHRvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiYXhpcy1zZWxlY3RvclwiKTtcbiAgYXhpc0J1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgIGlmIChheGlzQnV0dG9uLmRhdGFzZXQuZGlyZWN0aW9uID09PSBcImhvcml6b250YWxcIikge1xuICAgICAgYXhpc0J1dHRvbi5kYXRhc2V0LmRpcmVjdGlvbiA9IFwidmVydGljYWxcIjtcbiAgICB9IGVsc2Uge1xuICAgICAgYXhpc0J1dHRvbi5kYXRhc2V0LmRpcmVjdGlvbiA9IFwiaG9yaXpvbnRhbFwiO1xuICAgIH1cbiAgfSk7XG59XG5cbmZ1bmN0aW9uIGRvbVBsYWNlU2hpcEltZyhsZW5ndGgsIHgsIHksIHBsYXllckJvYXJkT2JqLCBpc3ZlcnRpY2FsID0gZmFsc2UpIHtcbiAgY29uc3QgY29sdW1uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgI3BsYXllckJvYXJkIC5yb3ctJHt5fSAuY29sdW1uLSR7eH1gKTtcbiAgY29uc3QgaW1nID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImltZ1wiKTtcbiAgaW1nLmNsYXNzTGlzdC5hZGQoXCJzaGlwXCIpO1xuICBsZXQgc2hpcDtcbiAgaWYgKGlzdmVydGljYWwpIHtcbiAgICBpbWcuY2xhc3NMaXN0LmFkZChcInZlcnRpY2FsXCIpO1xuICB9XG4gIHN3aXRjaCAobGVuZ3RoKSB7XG4gICAgY2FzZSAyOlxuICAgICAge1xuICAgICAgICBzaGlwID0gXCJwYXRyb2xCb2F0XCI7XG4gICAgICAgIGltZy5pZCA9IFwicGF0cm9sLWJvYXRcIjtcbiAgICAgIH1cbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgMzpcbiAgICAgIHtcbiAgICAgICAgaWYgKCFwbGF5ZXJCb2FyZE9iai5mbGVldC5zdWJtYXJpbmUpIHtcbiAgICAgICAgICBzaGlwID0gXCJkZXN0cm95ZXJcIjtcbiAgICAgICAgICBpbWcuaWQgPSBzaGlwO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHNoaXAgPSBcInN1Ym1hcmluZVwiO1xuICAgICAgICAgIGltZy5pZCA9IHNoaXA7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgNDpcbiAgICAgIHtcbiAgICAgICAgc2hpcCA9IFwiYmF0dGxlc2hpcFwiO1xuICAgICAgICBpbWcuaWQgPSBzaGlwO1xuICAgICAgfVxuICAgICAgYnJlYWs7XG4gICAgY2FzZSA1OlxuICAgICAge1xuICAgICAgICBzaGlwID0gXCJjYXJyaWVyXCI7XG4gICAgICAgIGltZy5pZCA9IHNoaXA7XG4gICAgICB9XG4gICAgICBicmVhaztcbiAgfVxuICBpbWcuc3JjID0gYC4vJHtzaGlwfS5zdmdgO1xuXG4gIGNvbHVtbi5hcHBlbmRDaGlsZChpbWcpO1xufVxuXG5mdW5jdGlvbiBmaWdodE1lc3NhZ2UoKSB7XG4gIGNvbnN0IGNvbnRlbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImNvbnRlbnRcIik7XG4gIGNvbnN0IGRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gIGRpdi5pZCA9IFwiZmlndGgtbWVzc2FnZVwiO1xuICBkaXYuaW5uZXJUZXh0ID0gXCIgUXVlIGVtcGllemUgbGEgYmF0YWxsYS4uLlwiO1xuICBjb250ZW50LmFwcGVuZENoaWxkKGRpdik7XG4gIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgIGRpdi5yZW1vdmUoKTtcbiAgfSwgMjAwMCk7XG59XG5cbmZ1bmN0aW9uIGJvYXJkQ29vcmRpbmF0ZXMocG9zaXRpb24pIHtcbiAgbGV0IGNlbGxDb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICBjZWxsQ29udGFpbmVyLmNsYXNzTGlzdC5hZGQoXCJjZWxsLWNvbnRhaW5lclwiKTtcblxuICBjZWxsQ29udGFpbmVyLmNsYXNzTGlzdC5hZGQocG9zaXRpb24pO1xuICBmb3IgKGxldCBpID0gMDsgaSA8IDEwOyBpKyspIHtcbiAgICBjb25zdCBjZWxsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICBjZWxsLmlubmVyVGV4dCA9IGk7XG4gICAgY2VsbC5jbGFzc0xpc3QuYWRkKFwiY2VsbFwiKTtcblxuICAgIGNlbGxDb250YWluZXIuYXBwZW5kQ2hpbGQoY2VsbCk7XG4gIH1cbiAgcmV0dXJuIGNlbGxDb250YWluZXI7XG59XG5cbmZ1bmN0aW9uIGRvbVJlbmRlckJvYXJkKGlkKSB7XG4gIGNvbnN0IGJvYXJkID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgYm9hcmQuaWQgPSBpZDtcbiAgYm9hcmQuY2xhc3NMaXN0LmFkZChcImJvYXJkXCIpO1xuICBmb3IgKGxldCByID0gMDsgciA8IDEwOyByKyspIHtcbiAgICBjb25zdCByb3cgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgIHJvdy5jbGFzc0xpc3QuYWRkKGByb3ctJHtyfWAsIFwicm93XCIpO1xuICAgIHJvdy5kYXRhc2V0LnkgPSByO1xuXG4gICAgZm9yIChsZXQgYyA9IDA7IGMgPCAxMCA+IDA7IGMrKykge1xuICAgICAgY29uc3QgY29sdW1uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcblxuICAgICAgY29sdW1uLmNsYXNzTGlzdC5hZGQoYGNvbHVtbi0ke2N9YCwgXCJjb2x1bW5cIik7XG4gICAgICBjb2x1bW4uZGF0YXNldC54ID0gYztcbiAgICAgIHJvdy5hcHBlbmRDaGlsZChjb2x1bW4pO1xuICAgIH1cbiAgICBib2FyZC5hcHBlbmRDaGlsZChyb3cpO1xuICB9XG4gIHJldHVybiBib2FyZDtcbn1cbmNvbnN0IHNob3RNYXJrZXIgPSAoKSA9PiB7XG4gIGNvbnN0IHNob3RNYXJrZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaW1nXCIpO1xuICBzaG90TWFya2VyLnNyYyA9IFwiLi9zaG90LW1hcmtlci5zdmdcIjtcbiAgc2hvdE1hcmtlci5jbGFzc0xpc3QuYWRkKFwic2hvdC1tYXJrZXJcIik7XG4gIHJldHVybiBzaG90TWFya2VyO1xufTtcblxuZnVuY3Rpb24gZG9tUG9wdWxhdGVCb2FyZChib2FyZE9iaiwgRG9tQm9hcmRTZWxlY3RvciwgaXNQbGF5ZXJCb2FyZCA9IHRydWUpIHtcbiAgZm9yIChsZXQgciA9IDA7IHIgPCAxMDsgcisrKSB7XG4gICAgZm9yIChsZXQgYyA9IDA7IGMgPCAxMDsgYysrKSB7XG4gICAgICBjb25zdCBjb2x1bW4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFxuICAgICAgICBgJHtEb21Cb2FyZFNlbGVjdG9yfSAucm93LSR7cn0gLmNvbHVtbi0ke2N9YFxuICAgICAgKTtcblxuICAgICAgaWYgKGJvYXJkT2JqLmJvYXJkW3JdW2NdICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgaWYgKGJvYXJkT2JqLmJvYXJkW3JdW2NdLmRlc3Ryb3llZCA9PT0gdHJ1ZSkge1xuICAgICAgICAgIGlmIChjb2x1bW4uY2xhc3NMaXN0LmNvbnRhaW5zKFwiaGl0dGVkXCIpID09PSBmYWxzZSkge1xuICAgICAgICAgICAgY29sdW1uLmFwcGVuZChzaG90TWFya2VyKCkpO1xuICAgICAgICAgICAgY29sdW1uLmNsYXNzTGlzdC5hZGQoXCJoaXR0ZWRcIik7XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2UgaWYgKGJvYXJkT2JqLmJvYXJkW3JdW2NdLmRlc3Ryb3llZCA9PT0gZmFsc2UgJiYgaXNQbGF5ZXJCb2FyZCkge1xuICAgICAgICB9IGVsc2UgaWYgKGJvYXJkT2JqLmJvYXJkW3JdW2NdID09PSBcIm1pc3NlZFwiKSB7XG4gICAgICAgICAgaWYgKGNvbHVtbi5jbGFzc0xpc3QuY29udGFpbnMoXCJtaXNzZWRcIikgPT09IGZhbHNlKSB7XG4gICAgICAgICAgICBjb2x1bW4uYXBwZW5kKHNob3RNYXJrZXIoKSk7XG4gICAgICAgICAgICBjb2x1bW4uY2xhc3NMaXN0LmFkZChcIm1pc3NlZFwiKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cblxuZXhwb3J0IHtcbiAgZmlnaHRNZXNzYWdlLFxuICBkb21SZW5kZXJCb2FyZCxcbiAgZG9tUG9wdWxhdGVCb2FyZCxcbiAgYXhpc0J1dHRvbixcbiAgYm9hcmRDb29yZGluYXRlcyxcbiAgZG9tUGxhY2VTaGlwSW1nLFxufTtcbiIsImltcG9ydCB7XG4gIGRvbVJlbmRlckJvYXJkLFxuICBkb21Qb3B1bGF0ZUJvYXJkLFxuICBib2FyZENvb3JkaW5hdGVzLFxuICBmaWdodE1lc3NhZ2UsXG59IGZyb20gXCIuL2RvbUludGVyYWN0aW9uXCI7XG5pbXBvcnQgZ2FtZWJvYXJkRmFjdG9yeSBmcm9tIFwiLi9nYW1lYm9hcmRGYWN0b3J5XCI7XG5pbXBvcnQgeyBjb21wdXRlciwgcGxheWVyIH0gZnJvbSBcIi4vcGxheWVyc1wiO1xuXG5hc3luYyBmdW5jdGlvbiBnYW1lTG9vcCgpIHtcbiAgLy8yIC0gVGhlIGdhbWUgbG9vcCBzaG91bGQgc2V0IHVwIGEgbmV3IGdhbWUgYnkgY3JlYXRpbmcgUGxheWVycyBhbmQgR2FtZWJvYXJkcy4gRm9yIG5vdyBqdXN0IHBvcHVsYXRlIGVhY2ggR2FtZWJvYXJkIHdpdGggcHJlZGV0ZXJtaW5lZCBjb29yZGluYXRlcy4gWW91IGNhbiBpbXBsZW1lbnQgYSBzeXN0ZW0gZm9yIGFsbG93aW5nIHBsYXllcnMgdG8gcGxhY2UgdGhlaXIgc2hpcHMgbGF0ZXIuXG5cbiAgY29uc3QgY29udGVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiY29udGVudFwiKTtcbiAgLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuXG4gIGNvbnN0IHBsYXllckJvYXJkQ29udGFpbmVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXG4gICAgXCJwbGF5ZXItYm9hcmQtY29udGFpbmVyXCJcbiAgKTtcbiAgcGxheWVyQm9hcmRDb250YWluZXIuYXBwZW5kQ2hpbGQoYm9hcmRDb29yZGluYXRlcyhcImxlZnRcIikpO1xuICBwbGF5ZXJCb2FyZENvbnRhaW5lci5hcHBlbmRDaGlsZChib2FyZENvb3JkaW5hdGVzKFwidG9wXCIpKTtcbiAgcGxheWVyQm9hcmRDb250YWluZXIuYXBwZW5kQ2hpbGQoZG9tUmVuZGVyQm9hcmQoXCJwbGF5ZXJCb2FyZFwiKSk7IC8vIG1ha2UgZW1wdHkgYm9hcmRcbiAgLy9wbGF5ZXJCb2FyZENvbnRhaW5lci5hcHBlbmRDaGlsZChib2FyZENvb3JkaW5hdGVzKFwiYm90dG9tXCIpKTtcbiAgcGxheWVyQm9hcmRDb250YWluZXIuYXBwZW5kQ2hpbGQoYm9hcmRDb29yZGluYXRlcyhcInJpZ2h0XCIpKTtcbiAgLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cblxuICBjb25zdCBjb21wdXRlckJvYXJkQ29udGFpbmVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXG4gICAgXCJjb21wdXRlci1ib2FyZC1jb250YWluZXJcIlxuICApO1xuICBjb21wdXRlckJvYXJkQ29udGFpbmVyLmFwcGVuZENoaWxkKGJvYXJkQ29vcmRpbmF0ZXMoXCJsZWZ0XCIpKTtcbiAgLy8gY29tcHV0ZXJCb2FyZENvbnRhaW5lci5hcHBlbmRDaGlsZChib2FyZENvb3JkaW5hdGVzKFwidG9wXCIpKTtcbiAgY29tcHV0ZXJCb2FyZENvbnRhaW5lci5hcHBlbmRDaGlsZChkb21SZW5kZXJCb2FyZChcImNvbXB1dGVyQm9hcmRcIikpOyAvLyBtYWtlIGVtcHR5IGJvYXJkXG4gIGNvbXB1dGVyQm9hcmRDb250YWluZXIuYXBwZW5kQ2hpbGQoYm9hcmRDb29yZGluYXRlcyhcInJpZ2h0XCIpKTtcbiAgY29tcHV0ZXJCb2FyZENvbnRhaW5lci5hcHBlbmRDaGlsZChib2FyZENvb3JkaW5hdGVzKFwiYm90dG9tXCIpKTtcblxuICBjb250ZW50LmFwcGVuZENoaWxkKHBsYXllckJvYXJkQ29udGFpbmVyKTtcbiAgY29udGVudC5hcHBlbmRDaGlsZChib2FyZENvb3JkaW5hdGVzKFwibWlkZGxlXCIpKTtcbiAgLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbiAgY29udGVudC5hcHBlbmRDaGlsZChjb21wdXRlckJvYXJkQ29udGFpbmVyKTtcbiAgLy8vLy8vLy8vLy8vLy8vLy9cblxuICBjb25zdCBwbGF5ZXJCb2FyZE9iaiA9IGdhbWVib2FyZEZhY3RvcnkoKTtcbiAgY29uc3QgY29tcHV0ZXJCb2FyZE9iaiA9IGdhbWVib2FyZEZhY3RvcnkoKTtcblxuICAvKiBwbGF5ZXJCb2FyZE9iai5ib2FyZFsxXVsxXSA9IFwibWlzc2VkXCI7XG4gIHBsYXllckJvYXJkT2JqLmJvYXJkWzFdWzJdID0gXCJtaXNzZWRcIjtcbiAgcGxheWVyQm9hcmRPYmouYm9hcmRbMV1bM10gPSBcIm1pc3NlZFwiO1xuICBwbGF5ZXJCb2FyZE9iai5ib2FyZFsxXVs0XSA9IFwibWlzc2VkXCI7XG4gIHBsYXllckJvYXJkT2JqLmJvYXJkWzFdWzVdID0gXCJtaXNzZWRcIjtcbiAgcGxheWVyQm9hcmRPYmouYm9hcmRbMV1bNl0gPSBcIm1pc3NlZFwiO1xuXG4gIC8vXG4gIHBsYXllckJvYXJkT2JqLmJvYXJkWzFdWzFdID0gXCJtaXNzZWRcIjtcbiAgcGxheWVyQm9hcmRPYmouYm9hcmRbMl1bMV0gPSBcIm1pc3NlZFwiO1xuICBwbGF5ZXJCb2FyZE9iai5ib2FyZFszXVsxXSA9IFwibWlzc2VkXCI7XG4gIHBsYXllckJvYXJkT2JqLmJvYXJkWzRdWzFdID0gXCJtaXNzZWRcIjtcbiAgLy9cbiAgcGxheWVyQm9hcmRPYmouYm9hcmRbMV1bN10gPSBcIm1pc3NlZFwiO1xuICBwbGF5ZXJCb2FyZE9iai5ib2FyZFsyXVs3XSA9IFwibWlzc2VkXCI7XG4gIHBsYXllckJvYXJkT2JqLmJvYXJkWzNdWzddID0gXCJtaXNzZWRcIjtcbiAgcGxheWVyQm9hcmRPYmouYm9hcmRbNF1bN10gPSBcIm1pc3NlZFwiO1xuICAvL1xuXG4gIHBsYXllckJvYXJkT2JqLmJvYXJkWzVdWzFdID0gXCJtaXNzZWRcIjtcbiAgcGxheWVyQm9hcmRPYmouYm9hcmRbNV1bMl0gPSBcIm1pc3NlZFwiO1xuICBwbGF5ZXJCb2FyZE9iai5ib2FyZFs1XVszXSA9IFwibWlzc2VkXCI7XG4gIHBsYXllckJvYXJkT2JqLmJvYXJkWzVdWzRdID0gXCJtaXNzZWRcIjtcbiAgcGxheWVyQm9hcmRPYmouYm9hcmRbNV1bNV0gPSBcIm1pc3NlZFwiO1xuICBwbGF5ZXJCb2FyZE9iai5ib2FyZFs1XVs2XSA9IFwibWlzc2VkXCI7XG4gIHBsYXllckJvYXJkT2JqLmJvYXJkWzVdWzddID0gXCJtaXNzZWRcIjsgKi9cbiAgLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuICBjb21wdXRlci5wbGFjZVNoaXAoY29tcHV0ZXJCb2FyZE9iaiwgMik7XG4gIC8vY29uc29sZS5sb2coY29tcHV0ZXJCb2FyZE9iai5mbGVldCk7XG4gIGNvbnNvbGUubG9nKFwicGxhY2UgeW91ciAyIHNoaXBcIik7XG4gIGF3YWl0IHBsYXllci5wbGFjZVNoaXAoMiwgXCJwbGF5ZXJCb2FyZFwiLCBwbGF5ZXJCb2FyZE9iaik7XG4gIGRvbVBvcHVsYXRlQm9hcmQocGxheWVyQm9hcmRPYmosIFwiI3BsYXllckJvYXJkXCIsIHRydWUpO1xuXG4gIGNvbXB1dGVyLnBsYWNlU2hpcChjb21wdXRlckJvYXJkT2JqLCAzKTtcbiAgLy9jb25zb2xlLmxvZyhjb21wdXRlckJvYXJkT2JqLmZsZWV0KTtcbiAgY29uc29sZS5sb2coXCJwbGFjZSB5b3VyIDMgc2hpcFwiKTtcbiAgYXdhaXQgcGxheWVyLnBsYWNlU2hpcCgzLCBcInBsYXllckJvYXJkXCIsIHBsYXllckJvYXJkT2JqKTtcbiAgZG9tUG9wdWxhdGVCb2FyZChwbGF5ZXJCb2FyZE9iaiwgXCIjcGxheWVyQm9hcmRcIiwgdHJ1ZSk7XG5cbiAgY29tcHV0ZXIucGxhY2VTaGlwKGNvbXB1dGVyQm9hcmRPYmosIDMpO1xuICAvL2NvbnNvbGUubG9nKGNvbXB1dGVyQm9hcmRPYmouZmxlZXQpO1xuICBjb25zb2xlLmxvZyhcInBsYWNlIHlvdXIgMyBzaGlwXCIpO1xuICBhd2FpdCBwbGF5ZXIucGxhY2VTaGlwKDMsIFwicGxheWVyQm9hcmRcIiwgcGxheWVyQm9hcmRPYmopO1xuICBkb21Qb3B1bGF0ZUJvYXJkKHBsYXllckJvYXJkT2JqLCBcIiNwbGF5ZXJCb2FyZFwiLCB0cnVlKTtcblxuICBjb21wdXRlci5wbGFjZVNoaXAoY29tcHV0ZXJCb2FyZE9iaiwgNCk7XG4gIC8vY29uc29sZS5sb2coY29tcHV0ZXJCb2FyZE9iai5mbGVldCk7XG4gIGNvbnNvbGUubG9nKFwicGxhY2UgeW91ciA0IHNoaXBcIik7XG4gIGF3YWl0IHBsYXllci5wbGFjZVNoaXAoNCwgXCJwbGF5ZXJCb2FyZFwiLCBwbGF5ZXJCb2FyZE9iaik7XG4gIGRvbVBvcHVsYXRlQm9hcmQocGxheWVyQm9hcmRPYmosIFwiI3BsYXllckJvYXJkXCIsIHRydWUpO1xuXG4gIGNvbXB1dGVyLnBsYWNlU2hpcChjb21wdXRlckJvYXJkT2JqLCA1KTtcbiAgLy9jb25zb2xlLmxvZyhjb21wdXRlckJvYXJkT2JqLmZsZWV0KTtcbiAgY29uc29sZS5sb2coXCJwbGFjZSB5b3VyIDUgc2hpcFwiKTtcbiAgYXdhaXQgcGxheWVyLnBsYWNlU2hpcCg1LCBcInBsYXllckJvYXJkXCIsIHBsYXllckJvYXJkT2JqKTtcbiAgZG9tUG9wdWxhdGVCb2FyZChwbGF5ZXJCb2FyZE9iaiwgXCIjcGxheWVyQm9hcmRcIiwgdHJ1ZSk7XG5cbiAgLy8zLSAgV2XigJlsbCBsZWF2ZSB0aGUgSFRNTCBpbXBsZW1lbnRhdGlvbiB1cCB0byB5b3UgZm9yIG5vdywgYnV0IHlvdSBzaG91bGQgZGlzcGxheSBib3RoIHRoZSBwbGF5ZXLigJlzIGJvYXJkcyBhbmQgcmVuZGVyIHRoZW0gdXNpbmcgaW5mb3JtYXRpb24gZnJvbSB0aGUgR2FtZWJvYXJkIGNsYXNzLlxuXG4gIC8qIGRvbVBvcHVsYXRlQm9hcmQocGxheWVyQm9hcmRPYmosIFwiI3BsYXllckJvYXJkXCIpO1xuICBkb21Qb3B1bGF0ZUJvYXJkKGNvbXB1dGVyQm9hcmRPYmosIFwiI2NvbXB1dGVyQm9hcmRcIiwgZmFsc2UpOyAqL1xuXG4gIC8vIC0zLTEgWW91IG5lZWQgbWV0aG9kcyB0byByZW5kZXIgdGhlIGdhbWVib2FyZHMgL2RvbmUvIGFuZCB0byB0YWtlIHVzZXIgaW5wdXQgZm9yIGF0dGFja2luZy9kb25lLy4gRm9yIGF0dGFja3MsIGxldCB0aGUgdXNlciBjbGljayBvbiBhIGNvb3JkaW5hdGUgaW4gdGhlIGVuZW15IEdhbWVib2FyZC5cbiAgLy8tNCBUaGUgZ2FtZSBsb29wIHNob3VsZCBzdGVwIHRocm91Z2ggdGhlIGdhbWUgdHVybiBieSB0dXJuIHVzaW5nIG9ubHkgbWV0aG9kcyBmcm9tIG90aGVyIG9iamVjdHMuIElmIGF0IGFueSBwb2ludCB5b3UgYXJlIHRlbXB0ZWQgdG8gd3JpdGUgYSBuZXcgZnVuY3Rpb24gaW5zaWRlIHRoZSBnYW1lIGxvb3AsIHN0ZXAgYmFjayBhbmQgZmlndXJlIG91dCB3aGljaCBjbGFzcyBvciBtb2R1bGUgdGhhdCBmdW5jdGlvbiBzaG91bGQgYmVsb25nIHRvLlxuXG4gIC8vZGlzcGxheSBtZXNzYWdlICEhIVxuICBmaWdodE1lc3NhZ2UoKTtcbiAgZm9yIChcbiAgICBsZXQgdHVybiA9IDE7XG4gICAgLy9DcmVhdGUgY29uZGl0aW9ucyBzbyB0aGF0IHRoZSBnYW1lIGVuZHMgb25jZSBvbmUgcGxheWVycyBzaGlwcyBoYXZlIGFsbCBiZWVuIHN1bmsuIFRoaXMgZnVuY3Rpb24gaXMgYXBwcm9wcmlhdGUgZm9yIHRoZSBHYW1lIG1vZHVsZS5cbiAgICBjb21wdXRlckJvYXJkT2JqLmlzR2FtZU92ZXIoKSA9PT0gZmFsc2UgJiZcbiAgICBwbGF5ZXJCb2FyZE9iai5pc0dhbWVPdmVyKCkgPT09IGZhbHNlO1xuICAgIHR1cm4rK1xuICApIHtcbiAgICBjb25zb2xlLmxvZyhcImF3YWl0aW5nIHBsYXllciBhdHRhY2tcIik7XG5cbiAgICBhd2FpdCBwbGF5ZXIuYXR0YWNrKGNvbXB1dGVyQm9hcmRPYmopO1xuICAgIGRvbVBvcHVsYXRlQm9hcmQoY29tcHV0ZXJCb2FyZE9iaiwgXCIjY29tcHV0ZXJCb2FyZFwiLCBmYWxzZSk7XG5cbiAgICBjb25zb2xlLmxvZyhcImNvbXB1dGVyQXR0YWNrTkV4dFwiKTtcblxuICAgIGNvbXB1dGVyLmF0dGFjayhwbGF5ZXJCb2FyZE9iaik7XG4gICAgZG9tUG9wdWxhdGVCb2FyZChwbGF5ZXJCb2FyZE9iaiwgXCIjcGxheWVyQm9hcmRcIik7XG4gIH1cblxuICBhbGVydChcImdhbWUgb3ZlclwiKTtcbn1cblxuZXhwb3J0IHsgZ2FtZUxvb3AgfTtcbiIsImltcG9ydCBzaGlwRmFjdG9yeSBmcm9tIFwiLi9zaGlwRmFjdG9yeVwiO1xuXG5mdW5jdGlvbiBnYW1lYm9hcmRGYWN0b3J5KCkge1xuICBsZXQgYm9hcmQgPSBbW10sIFtdLCBbXSwgW10sIFtdLCBbXSwgW10sIFtdLCBbXSwgW11dO1xuICBsZXQgZmxlZXQgPSB7fTtcblxuICBjb25zdCBwbGFjZVNoaXAgPSBmdW5jdGlvbiAobGVuZ3RoLCB4LCB5KSB7XG4gICAgbGV0IGN1cnJlbnRTaGlwO1xuICAgIHN3aXRjaCAobGVuZ3RoKSB7XG4gICAgICBjYXNlIDU6XG4gICAgICAgIHtcbiAgICAgICAgICBmbGVldC5jYXJyaWVyID0gc2hpcEZhY3RvcnkobGVuZ3RoKTtcbiAgICAgICAgICBjdXJyZW50U2hpcCA9IFwiY2FycmllclwiO1xuICAgICAgICB9XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSA0OlxuICAgICAgICB7XG4gICAgICAgICAgZmxlZXQuYmF0dGxlc2hpcCA9IHNoaXBGYWN0b3J5KGxlbmd0aCk7XG4gICAgICAgICAgY3VycmVudFNoaXAgPSBcImJhdHRsZXNoaXBcIjtcbiAgICAgICAgfVxuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgMzpcbiAgICAgICAge1xuICAgICAgICAgIGlmICghZmxlZXQuZGVzdHJveWVyKSB7XG4gICAgICAgICAgICBmbGVldC5kZXN0cm95ZXIgPSBzaGlwRmFjdG9yeShsZW5ndGgpO1xuICAgICAgICAgICAgY3VycmVudFNoaXAgPSBcImRlc3Ryb3llclwiO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBmbGVldC5zdWJtYXJpbmUgPSBzaGlwRmFjdG9yeShsZW5ndGgpO1xuICAgICAgICAgICAgY3VycmVudFNoaXAgPSBcInN1Ym1hcmluZVwiO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGJyZWFrO1xuXG4gICAgICBjYXNlIDI6XG4gICAgICAgIHtcbiAgICAgICAgICBmbGVldC5wYXRyb2xCb2F0ID0gc2hpcEZhY3RvcnkobGVuZ3RoKTtcbiAgICAgICAgICBjdXJyZW50U2hpcCA9IFwicGF0cm9sQm9hdFwiO1xuICAgICAgICB9XG5cbiAgICAgICAgYnJlYWs7XG4gICAgfVxuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgICAgYm9hcmRbeV1bK3ggKyBpXSA9IHtcbiAgICAgICAgZGVzdHJveWVkOiBmYWxzZSxcblxuICAgICAgICBoaXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICBmbGVldFtjdXJyZW50U2hpcF0uaGl0KCk7XG4gICAgICAgICAgdGhpcy5kZXN0cm95ZWQgPSB0cnVlO1xuICAgICAgICB9LFxuICAgICAgfTtcbiAgICB9XG4gICAgY29uc29sZS5sb2coZmxlZXQpO1xuICB9O1xuXG4gIGNvbnN0IHBsYWNlU2hpcFZlcnRpY2FsbHkgPSBmdW5jdGlvbiAobGVuZ3RoLCB4LCB5KSB7XG4gICAgbGV0IGN1cnJlbnRTaGlwO1xuICAgIHN3aXRjaCAobGVuZ3RoKSB7XG4gICAgICBjYXNlIDU6XG4gICAgICAgIHtcbiAgICAgICAgICBmbGVldC5jYXJyaWVyID0gc2hpcEZhY3RvcnkobGVuZ3RoKTtcbiAgICAgICAgICBjdXJyZW50U2hpcCA9IFwiY2FycmllclwiO1xuICAgICAgICB9XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSA0OlxuICAgICAgICB7XG4gICAgICAgICAgZmxlZXQuYmF0dGxlc2hpcCA9IHNoaXBGYWN0b3J5KGxlbmd0aCk7XG4gICAgICAgICAgY3VycmVudFNoaXAgPSBcImJhdHRsZXNoaXBcIjtcbiAgICAgICAgfVxuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgMzpcbiAgICAgICAge1xuICAgICAgICAgIGlmICghZmxlZXQuZGVzdHJveWVyKSB7XG4gICAgICAgICAgICBmbGVldC5kZXN0cm95ZXIgPSBzaGlwRmFjdG9yeShsZW5ndGgpO1xuICAgICAgICAgICAgY3VycmVudFNoaXAgPSBcImRlc3Ryb3llclwiO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBmbGVldC5zdWJtYXJpbmUgPSBzaGlwRmFjdG9yeShsZW5ndGgpO1xuICAgICAgICAgICAgY3VycmVudFNoaXAgPSBcInN1Ym1hcmluZVwiO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICAvL2ZsZWV0LnN1Ym1hcmluZSA9IHNoaXBGYWN0b3J5KGxlbmd0aCk7XG4gICAgICAgIGJyZWFrO1xuXG4gICAgICBjYXNlIDI6XG4gICAgICAgIHtcbiAgICAgICAgICBmbGVldC5wYXRyb2xCb2F0ID0gc2hpcEZhY3RvcnkobGVuZ3RoKTtcbiAgICAgICAgICBjdXJyZW50U2hpcCA9IFwicGF0cm9sQm9hdFwiO1xuICAgICAgICB9XG5cbiAgICAgICAgYnJlYWs7XG4gICAgfVxuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgICAgYm9hcmRbK3kgKyBpXVt4XSA9IHtcbiAgICAgICAgZGVzdHJveWVkOiBmYWxzZSxcblxuICAgICAgICBoaXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICBmbGVldFtjdXJyZW50U2hpcF0uaGl0KCk7XG4gICAgICAgICAgdGhpcy5kZXN0cm95ZWQgPSB0cnVlO1xuICAgICAgICB9LFxuICAgICAgfTtcbiAgICB9XG4gICAgY29uc29sZS5sb2coZmxlZXQpO1xuICB9O1xuXG4gIGNvbnN0IHJlY2l2ZUF0dGFjayA9ICh4LCB5KSA9PiB7XG4gICAgaWYgKHR5cGVvZiBib2FyZFt5XVt4XSA9PT0gXCJvYmplY3RcIikge1xuICAgICAgaWYgKGJvYXJkW3ldW3hdLmRlc3Ryb3llZCA9PT0gZmFsc2UpIHtcbiAgICAgICAgYm9hcmRbeV1beF0uaGl0KCk7XG4gICAgICAgIHJldHVybiBcImhpdFwiO1xuICAgICAgfSBlbHNlIGlmIChib2FyZFt5XVt4XS5kZXN0cm95ZWQgPT09IHRydWUpIHtcbiAgICAgICAgcmV0dXJuIFwicmVwZXRpZG9cIjtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKGJvYXJkW3ldW3hdID09PSB1bmRlZmluZWQpIHtcbiAgICAgIGJvYXJkW3ldW3hdID0gXCJtaXNzZWRcIjtcblxuICAgICAgcmV0dXJuIFwibWlzc2VkXCI7XG4gICAgfSBlbHNlIGlmIChib2FyZFt5XVt4XSA9PT0gXCJtaXNzZWRcIikge1xuICAgICAgcmV0dXJuIFwicmVwZXRpZG9cIjtcbiAgICB9XG4gIH07XG5cbiAgY29uc3QgYXR0YWNrUmVzdWx0T25seSA9ICh4LCB5KSA9PiB7XG4gICAgaWYgKHR5cGVvZiBib2FyZFt5XVt4XSA9PT0gXCJvYmplY3RcIikge1xuICAgICAgaWYgKGJvYXJkW3ldW3hdLmRlc3Ryb3llZCA9PT0gZmFsc2UpIHtcbiAgICAgICAgcmV0dXJuIFwiaGl0XCI7XG4gICAgICB9IGVsc2UgaWYgKGJvYXJkW3ldW3hdLmRlc3Ryb3llZCA9PT0gdHJ1ZSkge1xuICAgICAgICByZXR1cm4gXCJyZXBldGlkb1wiO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAoYm9hcmRbeV1beF0gPT09IHVuZGVmaW5lZCkge1xuICAgICAgcmV0dXJuIFwibWlzc2VkXCI7XG4gICAgfSBlbHNlIGlmIChib2FyZFt5XVt4XSA9PT0gXCJtaXNzZWRcIikge1xuICAgICAgcmV0dXJuIFwicmVwZXRpZG9cIjtcbiAgICB9XG4gIH07XG4gIC8vZm9yIHBsYWNpbmdcbiAgY29uc3Qgd2lsbEZvbGxvd1J1bGVzID0gZnVuY3Rpb24gKGxlbmd0aCwgeCwgeSkge1xuICAgIGNvbnN0IHdpbGxPdmVybGFwID0gZnVuY3Rpb24gKGxlbmd0aCwgeCwgeSkge1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgICAgICBjb25zb2xlLmxvZyh5KTtcbiAgICAgICAgaWYgKHR5cGVvZiBib2FyZFt5XVsreCArIGldID09PSBcIm9iamVjdFwiKSB7XG4gICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9O1xuXG4gICAgY29uc3Qgd2lsbE92ZXJmbG93ID0gZnVuY3Rpb24gKGxlbmd0aCwgeCkge1xuICAgICAgaWYgKGxlbmd0aCArICt4ID4gMTApIHtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9IGVsc2UgcmV0dXJuIGZhbHNlO1xuICAgIH07XG4gICAgaWYgKCF3aWxsT3ZlcmxhcChsZW5ndGgsIHgsIHkpICYmICF3aWxsT3ZlcmZsb3cobGVuZ3RoLCB4KSkge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH07XG5cbiAgLy9mb3IgcGxhY2luZ1xuICBjb25zdCB3aWxsRm9sbG93UnVsZXNWZXJ0aWNhbGx5ID0gZnVuY3Rpb24gKGxlbmd0aCwgeCwgeSkge1xuICAgIGNvbnN0IHdpbGxPdmVybGFwID0gZnVuY3Rpb24gKGxlbmd0aCwgeCwgeSkge1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgICAgICBpZiAodHlwZW9mIGJvYXJkWyt5ICsgaV1beF0gPT09IFwib2JqZWN0XCIpIHtcbiAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH07XG5cbiAgICBjb25zdCB3aWxsT3ZlcmZsb3cgPSBmdW5jdGlvbiAobGVuZ3RoLCB5KSB7XG4gICAgICBjb25zb2xlLmxvZyhsZW5ndGggKyAreSA+IDEwKTtcbiAgICAgIGlmIChsZW5ndGggKyAreSA+IDEwKSB7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfSBlbHNlIHJldHVybiBmYWxzZTtcbiAgICB9O1xuICAgIGlmICghd2lsbE92ZXJmbG93KGxlbmd0aCwgeSkpIHtcbiAgICAgIGlmICghd2lsbE92ZXJsYXAobGVuZ3RoLCB4LCB5KSkge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICB9XG4gIH07XG5cbiAgY29uc3QgaXNHYW1lT3ZlciA9IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gKFxuICAgICAgdGhpcy5mbGVldC5jYXJyaWVyLmlzU3VuaygpICYmXG4gICAgICB0aGlzLmZsZWV0LnBhdHJvbEJvYXQuaXNTdW5rKCkgJiZcbiAgICAgIHRoaXMuZmxlZXQuZGVzdHJveWVyLmlzU3VuaygpICYmXG4gICAgICB0aGlzLmZsZWV0LmJhdHRsZXNoaXAuaXNTdW5rKCkgJiZcbiAgICAgIHRoaXMuZmxlZXQuc3VibWFyaW5lLmlzU3VuaygpXG4gICAgKTtcbiAgfTtcblxuICByZXR1cm4ge1xuICAgIGF0dGFja1Jlc3VsdE9ubHksXG4gICAgYm9hcmQsXG4gICAgZmxlZXQsXG4gICAgcGxhY2VTaGlwLFxuICAgIHBsYWNlU2hpcFZlcnRpY2FsbHksXG4gICAgd2lsbEZvbGxvd1J1bGVzLFxuICAgIHJlY2l2ZUF0dGFjayxcbiAgICBpc0dhbWVPdmVyLFxuICAgIHdpbGxGb2xsb3dSdWxlc1ZlcnRpY2FsbHksXG4gIH07XG59XG5cbmV4cG9ydCBkZWZhdWx0IGdhbWVib2FyZEZhY3Rvcnk7XG4iLCJpbXBvcnQgeyBhaSB9IGZyb20gXCIuL2FpXCI7XG5pbXBvcnQgeyBkb21QbGFjZVNoaXBJbWcgfSBmcm9tIFwiLi9kb21JbnRlcmFjdGlvblwiO1xuXG5sZXQgY29tcHV0ZXIgPSB7XG4gIGFpLFxuXG4gIGF0dGFjazogZnVuY3Rpb24gKHBsYXllckJvYXJkT2JqKSB7XG4gICAgLy9pZiByZXZlcnNlTW9kZSBpcyB0cnVlXG4gICAgLy9jaGVjayB0byBzZWUgaWYgdGhlIG9wb3NpdGUgZGlyZWN0aW9uIG9mIHRoZSBmb2xsb3dEaXJlY3Rpb24vZmlyc3REaXJlY3Rpb24gaXMgaW4gdGhlIGZpcnN0VmFsaWRNb3ZlcyBhcnJheXtcbiAgICAvL2lmIGl0IGlzIGNoYWdlIHRoZSBjaGFzZVN1YmplY3QgYW5kIHRoZSBmb2xsb3dEaXJlY3Rpb259XG4gICAgLy9lbHNlIGRvbnQgZG8gYW5pdGhpbmcgKHRoZSBuZXh0IGF0dGFjayB3aWxsIGJlIHJhbmRvbSlcbiAgICAvL2FmdGVyIGFueSBvZiB0aGUgdHdvLCBkaXNhYmxlIHRoZSByZXZlcnNlTW9kZSBiZWNhdXNlIGl0IGlzIG9ubHkgYSBtb2RpZmllciBhbmQgaXQgc2hvdWxkIG5vdCBydW4gb24gZXZlcnkgYXR0YWNrIG9mIHRoZSByZXZlcnNlZCBjaGFzZVxuICAgIC8vIGFuZCBlbmFibGUgdGhlIHdhc1JldmVyc2VBY3RpdmF0ZWQsIGJlY2FzdWUgdGhlIHJldmVyc2VNb2RlIHNob3VsZCBubyBiZSB1c2VkIGEgc2Vjb25kIHRpbWUgb24gdGhlIHNhbWUgc3ViamVjdFxuICAgIGlmICh0aGlzLmFpLmNoYXNlTW9kZS5yZXZlcnNlTW9kZSkge1xuICAgICAgbGV0IG9wb3NpdGUgPSB1bmRlZmluZWQ7XG4gICAgICBzd2l0Y2ggKHRoaXMuYWkuY2hhc2VNb2RlLmZpcnN0RGlyZWN0aW9uKSB7XG4gICAgICAgIGNhc2UgXCJsZWZ0XCI6XG4gICAgICAgICAge1xuICAgICAgICAgICAgb3Bvc2l0ZSA9IFwicmlnaHRcIjtcbiAgICAgICAgICB9XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgXCJyaWdodFwiOlxuICAgICAgICAgIHtcbiAgICAgICAgICAgIG9wb3NpdGUgPSBcImxlZnRcIjtcbiAgICAgICAgICB9XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgXCJ0b3BcIjpcbiAgICAgICAgICB7XG4gICAgICAgICAgICBvcG9zaXRlID0gXCJib3R0b21cIjtcbiAgICAgICAgICB9XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgXCJib3R0b21cIjpcbiAgICAgICAgICB7XG4gICAgICAgICAgICBvcG9zaXRlID0gXCJ0b3BcIjtcbiAgICAgICAgICB9XG4gICAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgICBpZiAodGhpcy5haS5jaGFzZU1vZGUuZmlyc3RWYWxpZE1vdmVzLmluY2x1ZGVzKG9wb3NpdGUpKSB7XG4gICAgICAgIHRoaXMuYWkuY2hhc2VNb2RlLmNoYXNlU3ViamVjdCA9IHRoaXMuYWkuY2hhc2VNb2RlLmZpcnN0Q2hhc2VTdWJqZWN0O1xuICAgICAgICB0aGlzLmFpLmNoYXNlTW9kZS5zdGF0ZSA9IHRydWU7XG4gICAgICAgIHRoaXMuYWkuY2hhc2VNb2RlLmZvbGxvd0RpcmVjdGlvbiA9IG9wb3NpdGU7XG4gICAgICAgIHRoaXMuYWkuY2hhc2VNb2RlLmlzQ2hhc2luZyA9IHRydWU7XG4gICAgICAgIC8vYXR0YWNrIG9wb3NpdGUgZGlyZWN0aW9uIG9mIGNoYXNlU3ViamVjdFxuICAgICAgICAvL2dldCBjb29yZGluYXRlcyBvZlwiIG9wb3NpdGUgXCJvZiBjaGFzZVNVYmplY3RcbiAgICAgIH1cbiAgICAgIHRoaXMuYWkuY2hhc2VNb2RlLnJldmVyc2VNb2RlID0gZmFsc2U7XG4gICAgICB0aGlzLmFpLmNoYXNlTW9kZS53YXNSZXZlcnNlQWN0aXZhdGVkID0gdHJ1ZTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5haS5jaGFzZU1vZGUuc3RhdGUgPT09IHRydWUpIHtcbiAgICAgIHRoaXMuYWkuYWRkVmFsaWREaXJlY3Rpb25zKHBsYXllckJvYXJkT2JqKTtcbiAgICAgIHRoaXMuYWkuYXR0YWNrKHBsYXllckJvYXJkT2JqKTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgeCA9IHRoaXMucmFuZG9tSW50RnJvbUludGVydmFsKDAsIDkpO1xuICAgICAgY29uc3QgeSA9IHRoaXMucmFuZG9tSW50RnJvbUludGVydmFsKDAsIDkpO1xuICAgICAgLy9hbGVydChcInJhbmRvbSBkaXJlY3Rpb24gYnkgY29tcHV0ZXIuYXR0YWNrXCIpO1xuICAgICAgc3dpdGNoIChwbGF5ZXJCb2FyZE9iai5yZWNpdmVBdHRhY2soeCwgeSkpIHtcbiAgICAgICAgY2FzZSBcImhpdFwiOlxuICAgICAgICAgIHtcbiAgICAgICAgICAgIHRoaXMuYWkuY2hhc2VNb2RlLnN0YXRlID0gdHJ1ZTtcbiAgICAgICAgICAgIHRoaXMuYWkuY2hhc2VNb2RlLmNoYXNlU3ViamVjdC54ID0geDtcbiAgICAgICAgICAgIHRoaXMuYWkuY2hhc2VNb2RlLmZpcnN0Q2hhc2VTdWJqZWN0LnggPSB4O1xuICAgICAgICAgICAgdGhpcy5haS5jaGFzZU1vZGUuY2hhc2VTdWJqZWN0LnkgPSB5O1xuICAgICAgICAgICAgdGhpcy5haS5jaGFzZU1vZGUuZmlyc3RDaGFzZVN1YmplY3QueSA9IHk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIFwibWlzc2VkXCI6XG4gICAgICAgICAge1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJjb21wdXRlciBtaXNzZWRcIik7XG4gICAgICAgICAgfVxuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIFwicmVwZXRpZG9cIjpcbiAgICAgICAgICB7XG4gICAgICAgICAgICBjb21wdXRlci5hdHRhY2socGxheWVyQm9hcmRPYmopO1xuICAgICAgICAgIH1cbiAgICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9XG4gIH0sXG4gIHBsYWNlU2hpcDogZnVuY3Rpb24gKGNvbXB1dGVyQm9hcmRPYmosIGxlbmd0aCkge1xuICAgIGlmICh0aGlzLnJhbmRvbUludEZyb21JbnRlcnZhbCgwLCAxKSA9PT0gMCkge1xuICAgICAgLy9wbGFjZXNoaXAgaG9yaXpvbnRhbGx5XG4gICAgICBjb25zdCB4ID0gdGhpcy5yYW5kb21JbnRGcm9tSW50ZXJ2YWwoMCwgOSk7XG4gICAgICBjb25zdCB5ID0gdGhpcy5yYW5kb21JbnRGcm9tSW50ZXJ2YWwoMCwgOSk7XG4gICAgICBpZiAoY29tcHV0ZXJCb2FyZE9iai53aWxsRm9sbG93UnVsZXMobGVuZ3RoLCB4LCB5KSkge1xuICAgICAgICBjb21wdXRlckJvYXJkT2JqLnBsYWNlU2hpcChsZW5ndGgsIHgsIHkpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5wbGFjZVNoaXAoY29tcHV0ZXJCb2FyZE9iaiwgbGVuZ3RoKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgLy9wbGFjZXNoaXAgdmVydGljYWxseVxuICAgICAgY29uc3QgeCA9IHRoaXMucmFuZG9tSW50RnJvbUludGVydmFsKDAsIDkpO1xuICAgICAgY29uc3QgeSA9IHRoaXMucmFuZG9tSW50RnJvbUludGVydmFsKDAsIDkpO1xuICAgICAgaWYgKGNvbXB1dGVyQm9hcmRPYmoud2lsbEZvbGxvd1J1bGVzVmVydGljYWxseShsZW5ndGgsIHgsIHkpKSB7XG4gICAgICAgIGNvbXB1dGVyQm9hcmRPYmoucGxhY2VTaGlwVmVydGljYWxseShsZW5ndGgsIHgsIHkpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5wbGFjZVNoaXAoY29tcHV0ZXJCb2FyZE9iaiwgbGVuZ3RoKTtcbiAgICAgIH1cbiAgICB9XG4gIH0sXG4gIHJhbmRvbUludEZyb21JbnRlcnZhbDogZnVuY3Rpb24gKG1pbiwgbWF4KSB7XG4gICAgLy8gbWluIGFuZCBtYXggaW5jbHVkZWRcblxuICAgIHJldHVybiBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAobWF4IC0gbWluICsgMSkgKyBtaW4pO1xuICB9LFxufTtcblxubGV0IHBsYXllciA9IHtcbiAgYXR0YWNrOiBmdW5jdGlvbiAoY29tcHV0ZXJCb2FyZE9iaikge1xuICAgIGNvbnNvbGUubG9nKFwicGxheWVyQXR0YWNrIGZ1bmN0aW9uXCIpO1xuICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiBhc2QocmVzb2x2ZSkge1xuICAgICAgY29uc3QgY29tcHV0ZXJCb2FyZCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiY29tcHV0ZXJCb2FyZFwiKTtcbiAgICAgIGNvbXB1dGVyQm9hcmQuYWRkRXZlbnRMaXN0ZW5lcihcbiAgICAgICAgXCJjbGlja1wiLFxuICAgICAgICAoZSkgPT4ge1xuICAgICAgICAgIGlmIChcbiAgICAgICAgICAgIGUudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucyhcImJvYXJkXCIpIHx8XG4gICAgICAgICAgICBlLnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoXCJyb3dcIilcbiAgICAgICAgICApIHtcbiAgICAgICAgICAgIGFzZChyZXNvbHZlKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgbGV0IHggPSBlLnRhcmdldC5kYXRhc2V0Lng7XG4gICAgICAgICAgICBsZXQgeSA9IGUudGFyZ2V0LnBhcmVudEVsZW1lbnQuZGF0YXNldC55O1xuXG4gICAgICAgICAgICBzd2l0Y2ggKGNvbXB1dGVyQm9hcmRPYmoucmVjaXZlQXR0YWNrKHgsIHkpKSB7XG4gICAgICAgICAgICAgIGNhc2UgXCJoaXRcIjpcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICByZXNvbHZlKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICBjYXNlIFwibWlzc2VkXCI6XG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgcmVzb2x2ZSgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgY2FzZSBcInJlcGV0aWRvXCI6XG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJyZXBldGlkbyBpbnRlbnRhIGRlbnVldm9cIik7XG4gICAgICAgICAgICAgICAgICBhc2QocmVzb2x2ZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfSxcblxuICAgICAgICB7IG9uY2U6IHRydWUgfVxuICAgICAgKTtcbiAgICB9KTtcbiAgfSxcbiAgcGxhY2VTaGlwOiBmdW5jdGlvbiAobGVuZ3RoLCBwbGF5ZXJCb2FyZElkLCBwbGF5ZXJCb2FyZE9iaikge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiBhc2QocmVzb2x2ZSkge1xuICAgICAgY29uc3QgcGxheWVyQm9hcmQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChwbGF5ZXJCb2FyZElkKTtcbiAgICAgIHBsYXllckJvYXJkLmFkZEV2ZW50TGlzdGVuZXIoXG4gICAgICAgIFwiY2xpY2tcIixcbiAgICAgICAgKGUpID0+IHtcbiAgICAgICAgICBpZiAoXG4gICAgICAgICAgICBlLnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoXCJib2FyZFwiKSB8fFxuICAgICAgICAgICAgZS50YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKFwicm93XCIpXG4gICAgICAgICAgKSB7XG4gICAgICAgICAgICBhc2QocmVzb2x2ZSk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGxldCB4ID0gZS50YXJnZXQuZGF0YXNldC54O1xuXG4gICAgICAgICAgICBsZXQgeSA9IGUudGFyZ2V0LnBhcmVudEVsZW1lbnQuZGF0YXNldC55O1xuICAgICAgICAgICAgY29uc29sZS5sb2coZS50YXJnZXQpO1xuXG4gICAgICAgICAgICBjb25zdCBheGlzQnV0dG9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJheGlzLXNlbGVjdG9yXCIpO1xuICAgICAgICAgICAgaWYgKGF4aXNCdXR0b24uZGF0YXNldC5kaXJlY3Rpb24gPT09IFwiaG9yaXpvbnRhbFwiKSB7XG4gICAgICAgICAgICAgIGlmIChwbGF5ZXJCb2FyZE9iai53aWxsRm9sbG93UnVsZXMobGVuZ3RoLCB4LCB5KSkge1xuICAgICAgICAgICAgICAgIHBsYXllckJvYXJkT2JqLnBsYWNlU2hpcChsZW5ndGgsIHgsIHkpO1xuICAgICAgICAgICAgICAgIC8vZG9tIGZ1bmN0aW9uIHRvIGRpc3BsYXkgYW5kIGltYWdlIG9mIHRoZSBzaGlwXG4gICAgICAgICAgICAgICAgZG9tUGxhY2VTaGlwSW1nKGxlbmd0aCwgeCwgeSwgcGxheWVyQm9hcmRPYmopO1xuICAgICAgICAgICAgICAgIHJlc29sdmUoKTtcbiAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBhc2QocmVzb2x2ZSk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSBpZiAoYXhpc0J1dHRvbi5kYXRhc2V0LmRpcmVjdGlvbiA9PT0gXCJ2ZXJ0aWNhbFwiKSB7XG4gICAgICAgICAgICAgIGlmIChwbGF5ZXJCb2FyZE9iai53aWxsRm9sbG93UnVsZXNWZXJ0aWNhbGx5KGxlbmd0aCwgeCwgeSkpIHtcbiAgICAgICAgICAgICAgICBwbGF5ZXJCb2FyZE9iai5wbGFjZVNoaXBWZXJ0aWNhbGx5KGxlbmd0aCwgeCwgeSk7XG4gICAgICAgICAgICAgICAgZG9tUGxhY2VTaGlwSW1nKGxlbmd0aCwgeCwgeSwgcGxheWVyQm9hcmRPYmosIHRydWUpO1xuICAgICAgICAgICAgICAgIHJlc29sdmUoKTtcbiAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBhc2QocmVzb2x2ZSk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH0sXG5cbiAgICAgICAgeyBvbmNlOiB0cnVlIH1cbiAgICAgICk7XG4gICAgfSk7XG4gIH0sXG59O1xuXG5leHBvcnQgeyBwbGF5ZXIsIGNvbXB1dGVyIH07XG4iLCJjb25zdCBzaGlwRmFjdG9yeSA9IChsZW5ndGgpID0+IHtcbiAgbGV0IGhpdHMgPSAwO1xuICBjb25zdCBpc1N1bmsgPSBmdW5jdGlvbiAoKSB7XG4gICAgLy9jb25zb2xlLmxvZyhgdGhpcy5sZW5ndGggaXM6JHt0aGlzLmxlbmd0aH1gKTtcbiAgICByZXR1cm4gdGhpcy5sZW5ndGggLSB0aGlzLmhpdHMgPT0gMDtcbiAgfTtcbiAgY29uc3QgaGl0ID0gZnVuY3Rpb24gKCkge1xuICAgIHRoaXMuaGl0cysrO1xuICB9O1xuXG4gIHJldHVybiB7IGxlbmd0aCwgaGl0cywgaXNTdW5rLCBoaXQgfTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IHNoaXBGYWN0b3J5O1xuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgZ2FtZWJvYXJkRmFjdG9yeSBmcm9tIFwiLi9nYW1lYm9hcmRGYWN0b3J5XCI7XG5pbXBvcnQgc2hpcEZhY3RvcnkgZnJvbSBcIi4vc2hpcEZhY3RvcnlcIjtcbmltcG9ydCB7IGRvbVJlbmRlckJvYXJkLCBkb21Qb3B1bGF0ZUJvYXJkLCBheGlzQnV0dG9uIH0gZnJvbSBcIi4vZG9tSW50ZXJhY3Rpb25cIjtcbmltcG9ydCB7IGdhbWVMb29wIH0gZnJvbSBcIi4vZ2FtZUxvb3BcIjtcblxuYXhpc0J1dHRvbigpO1xuZ2FtZUxvb3AoKTtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==