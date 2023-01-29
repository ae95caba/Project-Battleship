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
    invalidDirections: [],
    isReversed: false,
    state: false,
    chaseSubject: { x: undefined, y: undefined }, //x,y

    validMoves: ["left", "right", "top", "bottom"],
    followDirection: undefined,
    firstChaseSubject: {}, //for reversed
    originalValidMoves: [], //for reversed
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
    alert(`valid directions are ${this.chaseMode.validMoves}`);
  },
  removeInvalidDirections: function (playerBoardObj) {
    //remove direcctions that will be outside the board
    switch (this.chaseMode.chaseSubject.x) {
      case 0:
        {
          const index = this.chaseMode.validMoves.indexOf("left");

          this.chaseMode.validMoves.splice(index, 1);
        }
        break;
      case 9:
        {
          const index = this.chaseMode.validMoves.indexOf("right");

          this.chaseMode.validMoves.splice(index, 1);
        }
        break;
    }
    switch (this.chaseMode.chaseSubject.y) {
      case 0:
        {
          const index = this.chaseMode.validMoves.indexOf("top");

          this.chaseMode.validMoves.splice(index, 1);
        }
        break;
      case 9:
        {
          const index = this.chaseMode.validMoves.indexOf("bottom");

          this.chaseMode.validMoves.splice(index, 1);
        }
        break;
    }
    //remove the directions that will not follow rules !!!
    //only in chaseSubject
  },
  //pick a direction
  //this will return a direction
  // if it has 2 consecutive hits{
  // keep in the succesfull direction
  //if posible
  //if not, return the first viable direction}
  //else{return a random direction}
  direction: function () {
    if (this.chaseMode.isChasing) {
      console.log(`followDIrection is :${this.chaseMode.followDirection}`);
      if (this.chaseMode.validMoves.includes(this.chaseMode.followDirection)) {
        console.log(`the follow direction is valid`);
        return this.chaseMode.followDirection;
      } else {
        console.log("random direction");
        this.chaseMode.state = false;
        this.chaseMode.isChasing = false;
        return undefined;
      }

      /* else {
          //go oposite direction from the start\
          // it should be saved, the valid moves from the original chase objective
          //if it is not posible, end here
          alert("going in opposite direction");

          switch (this.chaseMode.followDirection) {
            case "left":
              {
                if (this.chaseMode.originalValidMoves.includes("right")) {
                  var direction = "right";
                  this.chaseMode.isReversed = true;
                } else {
                  alert("chase mode finished");
                  this.chaseMode.state = false;
                  //reset valid moves
                  this.chaseMode.validMoves = [
                    "left",
                    "right",
                    "top",
                    "bottom",
                  ];
                  return "chase mode ended";
                }
              }
              break;
            case "right":
              {
                if (this.chaseMode.originalValidMoves.includes("left")) {
                  var direction = "left";
                  this.chaseMode.isReversed = true;
                } else {
                  alert("chase mode finished");
                  this.chaseMode.state = false;
                  //reset valid moves
                  this.chaseMode.validMoves = [
                    "left",
                    "right",
                    "top",
                    "bottom",
                  ];
                  return "chase mode ended";
                }
              }
              break;
            case "top":
              {
                if (this.chaseMode.originalValidMoves.includes("bottom")) {
                  var direction = "bottom";
                  this.chaseMode.isReversed = true;
                } else {
                  alert("chase mode finished");
                  this.chaseMode.state = false;
                  //reset valid moves
                  this.chaseMode.validMoves = [
                    "left",
                    "right",
                    "top",
                    "bottom",
                  ];
                  return "chase mode ended";
                }
              }
              break;
            case "bottom":
              {
                if (this.chaseMode.originalValidMoves.includes("top")) {
                  var direction = "top";
                  this.chaseMode.isReversed = true;
                } else {
                  alert("chase mode finished");
                  this.chaseMode.state = false;
                  //reset valid moves
                  this.chaseMode.validMoves = [
                    "left",
                    "right",
                    "top",
                    "bottom",
                  ];
                  return "chase mode ended";
                }
              }
              break;
          }
          this.chaseMode.chaseSubject = this.chaseMode.firstChaseSubject;
        } */
    } else if (this.chaseMode.isChasing === false) {
      if (this.chaseMode.validMoves.length >= 1) {
        this.chaseMode.originalValidMoves = this.chaseMode.validMoves; //this is for reverse mode later
        const directionIndex = _players__WEBPACK_IMPORTED_MODULE_0__.computer.randomIntFromInterval(
          0,
          this.chaseMode.validMoves.length - 1
        );
        const direction = this.chaseMode.validMoves[directionIndex];

        alert(`randomly selected direction : ${direction}`);
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
  attack: function (playerBoardObj) {
    //save direction

    const direction = this.direction();
    //attack;
    //save coordinates
    const coordinates = this.coordinates(direction);

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

            //reset valid moves
            this.chaseMode.validMoves = ["left", "right", "top", "bottom"];
          }
          break;
        case "missed":
          {
            /*   //if runing form the oposite direction, the chase mode should stop
              if (this.chaseMode.isReversed) {
                this.chaseMode.state = false;
              } */
            //get random number choosed from array moves and deleted from
            //the array so only the left posible move remains
            //its not necesary beacause the function detects missed shoots
            //no need to do anything, it marks miss
            this.chaseMode.state = false;
            this.chaseMode.isChasing = false;
            this.chaseMode.followDirection = undefined;
            this.chaseMode.validMoves = ["left", "right", "top", "bottom"];
          }
          break;
      }
    } else if (this.chaseMode.isChasing === false) {
      switch (playerBoardObj.reciveAttack(coordinates.x, coordinates.y)) {
        case "hit":
          {
            //save coordinates of this first hit
            this.chaseMode.firstChaseSubject = this.chaseMode.chaseSubject; //for reversed

            //change the chase subject

            this.chaseMode.chaseSubject = coordinates;

            //save valid moves of the first chase subject
            this.chaseMode.originalValidMoves = this.chaseMode.validMoves; //for reverse !
            //reset valid moves
            this.chaseMode.validMoves = ["left", "right", "top", "bottom"];

            //start a chasin direction ....and axis
            this.chaseMode.followDirection = direction;
            this.chaseMode.isChasing = true;
          }
          break;
        case "missed":
          {
            //if runing form the oposite direction, the chase mode should stop
            /* if (this.chaseMode.isReversed) {
                this.chaseMode.state = false;
              } */
            //get random number choosed from array moves and deleted from
            //the array so only the left posible move remains
            //its not necesary beacause the function detects missed shoots
            //it is not necesary to do anything here because the ai will keep trying until it gets a hit
            this.chaseMode.validMoves = ["left", "right", "top", "bottom"];
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
/* harmony export */   "domPopulateBoard": () => (/* binding */ domPopulateBoard),
/* harmony export */   "domRenderBoard": () => (/* binding */ domRenderBoard)
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
function boardCoordinates(position) {
  let cellContainer = document.createElement("div");
  cellContainer.id = "cell-container";
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

/* function attackWithClick(domBoard, computerBoardObj) {
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
      computerttack();
      domPopulateBoard(playerBoardObj, "#playerBoard");
      letThemPlay();
    }, 2000);
  } else {
    alert("repetido");
    letThemPlay();
  }
} */




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
  playerBoardContainer.appendChild((0,_domInteraction__WEBPACK_IMPORTED_MODULE_0__.boardCoordinates)("bottom"));
  playerBoardContainer.appendChild((0,_domInteraction__WEBPACK_IMPORTED_MODULE_0__.boardCoordinates)("right"));
  //////////////////////////////////////
  const computerBoardContainer = document.getElementById(
    "computer-board-container"
  );
  computerBoardContainer.appendChild((0,_domInteraction__WEBPACK_IMPORTED_MODULE_0__.boardCoordinates)("left"));
  computerBoardContainer.appendChild((0,_domInteraction__WEBPACK_IMPORTED_MODULE_0__.boardCoordinates)("top"));
  computerBoardContainer.appendChild((0,_domInteraction__WEBPACK_IMPORTED_MODULE_0__.domRenderBoard)("computerBoard")); // make empty board
  computerBoardContainer.appendChild((0,_domInteraction__WEBPACK_IMPORTED_MODULE_0__.boardCoordinates)("right"));
  computerBoardContainer.appendChild((0,_domInteraction__WEBPACK_IMPORTED_MODULE_0__.boardCoordinates)("bottom"));

  content.appendChild(playerBoardContainer);
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
          fleet.destroyer = (0,_shipFactory__WEBPACK_IMPORTED_MODULE_0__["default"])(length);
          currentShip = "destroyer";
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
          fleet.destroyer = (0,_shipFactory__WEBPACK_IMPORTED_MODULE_0__["default"])(length);
          currentShip = "destroyer";
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
      this.fleet.battleship.isSunk()
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


let computer = {
  ai: _ai__WEBPACK_IMPORTED_MODULE_0__.ai,

  attack: function (playerBoardObj) {
    if (this.ai.chaseMode.state === true) {
      //alert("ai is working");

      //this.ai.removeInvalidDirections(playerBoardObj);
      this.ai.addValidDirections(playerBoardObj);
      this.ai.attack(playerBoardObj);
    } else {
      const x = this.randomIntFromInterval(0, 9);
      const y = this.randomIntFromInterval(0, 9);

      switch (playerBoardObj.reciveAttack(x, y)) {
        case "hit":
          {
            this.ai.chaseMode.state = true;
            this.ai.chaseMode.chaseSubject.x = x;
            this.ai.chaseMode.chaseSubject.y = y;
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

            const axisButton = document.getElementById("axis-selector");
            if (axisButton.dataset.direction === "horizontal") {
              if (playerBoardObj.willFollowRules(length, x, y)) {
                playerBoardObj.placeShip(length, x, y);

                resolve();
              } else {
                asd(resolve);
              }
            } else if (axisButton.dataset.direction === "vertical") {
              if (playerBoardObj.willFollowRulesVertically(length, x, y)) {
                playerBoardObj.placeShipVertically(length, x, y);

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Q1I7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsaUVBQWUsZ0JBQWdCLEVBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDck1OOztBQUUxQjtBQUNBLElBQUk7O0FBRUo7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRO0FBQ1I7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBUTtBQUNSO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBOztBQUVBO0FBQ0EsR0FBRztBQUNIOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBWTtBQUNaO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTOztBQUVULFVBQVU7QUFDVjtBQUNBLEtBQUs7QUFDTCxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVk7QUFDWjs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLGdCQUFnQjtBQUNoQjtBQUNBO0FBQ0EsY0FBYztBQUNkO0FBQ0E7O0FBRUE7QUFDQSxnQkFBZ0I7QUFDaEI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTOztBQUVULFVBQVU7QUFDVjtBQUNBLEtBQUs7QUFDTCxHQUFHO0FBQ0g7O0FBRTRCOzs7Ozs7Ozs7Ozs7Ozs7QUN0SjVCO0FBQ0E7QUFDQTtBQUNBLG9DQUFvQyxZQUFZO0FBQ2hEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsV0FBVztBQUNYOztBQUVBLGlFQUFlLFdBQVcsRUFBQzs7Ozs7OztVQ2IzQjtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7Ozs7Ozs7Ozs7O0FDTmtEO0FBQ1Y7QUFDd0M7QUFDMUM7O0FBRXRDLDJEQUFVO0FBQ1YsbURBQVEiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9wcm9qZWN0LWJhdHRsZXNoaXAvLi9zcmMvYWkuanMiLCJ3ZWJwYWNrOi8vcHJvamVjdC1iYXR0bGVzaGlwLy4vc3JjL2RvbUludGVyYWN0aW9uLmpzIiwid2VicGFjazovL3Byb2plY3QtYmF0dGxlc2hpcC8uL3NyYy9nYW1lTG9vcC5qcyIsIndlYnBhY2s6Ly9wcm9qZWN0LWJhdHRsZXNoaXAvLi9zcmMvZ2FtZWJvYXJkRmFjdG9yeS5qcyIsIndlYnBhY2s6Ly9wcm9qZWN0LWJhdHRsZXNoaXAvLi9zcmMvcGxheWVycy5qcyIsIndlYnBhY2s6Ly9wcm9qZWN0LWJhdHRsZXNoaXAvLi9zcmMvc2hpcEZhY3RvcnkuanMiLCJ3ZWJwYWNrOi8vcHJvamVjdC1iYXR0bGVzaGlwL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3Byb2plY3QtYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vcHJvamVjdC1iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vcHJvamVjdC1iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vcHJvamVjdC1iYXR0bGVzaGlwLy4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGNvbXB1dGVyIH0gZnJvbSBcIi4vcGxheWVyc1wiO1xuXG5jb25zdCBhaSA9IHtcbiAgY2hhc2VNb2RlOiB7XG4gICAgaW52YWxpZERpcmVjdGlvbnM6IFtdLFxuICAgIGlzUmV2ZXJzZWQ6IGZhbHNlLFxuICAgIHN0YXRlOiBmYWxzZSxcbiAgICBjaGFzZVN1YmplY3Q6IHsgeDogdW5kZWZpbmVkLCB5OiB1bmRlZmluZWQgfSwgLy94LHlcblxuICAgIHZhbGlkTW92ZXM6IFtcImxlZnRcIiwgXCJyaWdodFwiLCBcInRvcFwiLCBcImJvdHRvbVwiXSxcbiAgICBmb2xsb3dEaXJlY3Rpb246IHVuZGVmaW5lZCxcbiAgICBmaXJzdENoYXNlU3ViamVjdDoge30sIC8vZm9yIHJldmVyc2VkXG4gICAgb3JpZ2luYWxWYWxpZE1vdmVzOiBbXSwgLy9mb3IgcmV2ZXJzZWRcbiAgICBpc0NoYXNpbmc6IGZhbHNlLFxuICB9LFxuICAvL3RoaXMgd2lsbCBtb2RpZnkgdGhlIGFycmF5IHZhbGlkTW92ZXNcbiAgYWRkVmFsaWREaXJlY3Rpb25zOiBmdW5jdGlvbiAocGxheWVyQm9hcmRPYmopIHtcbiAgICB0aGlzLmNoYXNlTW9kZS52YWxpZE1vdmVzID0gW107XG4gICAgY29uc3QgcG9zaWJsZURpcmVjdGlvbnMgPSBbXCJsZWZ0XCIsIFwicmlnaHRcIiwgXCJ0b3BcIiwgXCJib3R0b21cIl07XG5cbiAgICAvLyAvL3JlbW92ZSBkaXJlY2N0aW9ucyB0aGF0IHdpbGwgYmUgb3V0c2lkZSB0aGUgYm9hcmRcbiAgICBzd2l0Y2ggKHRoaXMuY2hhc2VNb2RlLmNoYXNlU3ViamVjdC54KSB7XG4gICAgICBjYXNlIDA6XG4gICAgICAgIHtcbiAgICAgICAgICBjb25zdCBpbmRleCA9IHBvc2libGVEaXJlY3Rpb25zLmluZGV4T2YoXCJsZWZ0XCIpO1xuXG4gICAgICAgICAgcG9zaWJsZURpcmVjdGlvbnMuc3BsaWNlKGluZGV4LCAxKTtcbiAgICAgICAgfVxuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgOTpcbiAgICAgICAge1xuICAgICAgICAgIGNvbnN0IGluZGV4ID0gcG9zaWJsZURpcmVjdGlvbnMuaW5kZXhPZihcInJpZ2h0XCIpO1xuXG4gICAgICAgICAgcG9zaWJsZURpcmVjdGlvbnMuc3BsaWNlKGluZGV4LCAxKTtcbiAgICAgICAgfVxuICAgICAgICBicmVhaztcbiAgICB9XG4gICAgc3dpdGNoICh0aGlzLmNoYXNlTW9kZS5jaGFzZVN1YmplY3QueSkge1xuICAgICAgY2FzZSAwOlxuICAgICAgICB7XG4gICAgICAgICAgY29uc3QgaW5kZXggPSBwb3NpYmxlRGlyZWN0aW9ucy5pbmRleE9mKFwidG9wXCIpO1xuXG4gICAgICAgICAgcG9zaWJsZURpcmVjdGlvbnMuc3BsaWNlKGluZGV4LCAxKTtcbiAgICAgICAgfVxuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgOTpcbiAgICAgICAge1xuICAgICAgICAgIGNvbnN0IGluZGV4ID0gcG9zaWJsZURpcmVjdGlvbnMuaW5kZXhPZihcImJvdHRvbVwiKTtcblxuICAgICAgICAgIHBvc2libGVEaXJlY3Rpb25zLnNwbGljZShpbmRleCwgMSk7XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG4gICAgfVxuXG4gICAgLy9yZW1vdmUgdGhlIGRpcmVjdGlvbnMgdGhhdCBub3QgZm9sbG93IHJ1bGVzXG4gICAgcG9zaWJsZURpcmVjdGlvbnMuZm9yRWFjaCgoZGlyZWN0aW9uKSA9PiB7XG4gICAgICBpZiAoXG4gICAgICAgIHBsYXllckJvYXJkT2JqLmF0dGFja1Jlc3VsdE9ubHkoXG4gICAgICAgICAgdGhpcy5jb29yZGluYXRlcyhkaXJlY3Rpb24pLngsXG4gICAgICAgICAgdGhpcy5jb29yZGluYXRlcyhkaXJlY3Rpb24pLnlcbiAgICAgICAgKSAhPT0gXCJyZXBldGlkb1wiXG4gICAgICApIHtcbiAgICAgICAgdGhpcy5jaGFzZU1vZGUudmFsaWRNb3Zlcy5wdXNoKGRpcmVjdGlvbik7XG4gICAgICB9XG4gICAgfSk7XG4gICAgYWxlcnQoYHZhbGlkIGRpcmVjdGlvbnMgYXJlICR7dGhpcy5jaGFzZU1vZGUudmFsaWRNb3Zlc31gKTtcbiAgfSxcbiAgcmVtb3ZlSW52YWxpZERpcmVjdGlvbnM6IGZ1bmN0aW9uIChwbGF5ZXJCb2FyZE9iaikge1xuICAgIC8vcmVtb3ZlIGRpcmVjY3Rpb25zIHRoYXQgd2lsbCBiZSBvdXRzaWRlIHRoZSBib2FyZFxuICAgIHN3aXRjaCAodGhpcy5jaGFzZU1vZGUuY2hhc2VTdWJqZWN0LngpIHtcbiAgICAgIGNhc2UgMDpcbiAgICAgICAge1xuICAgICAgICAgIGNvbnN0IGluZGV4ID0gdGhpcy5jaGFzZU1vZGUudmFsaWRNb3Zlcy5pbmRleE9mKFwibGVmdFwiKTtcblxuICAgICAgICAgIHRoaXMuY2hhc2VNb2RlLnZhbGlkTW92ZXMuc3BsaWNlKGluZGV4LCAxKTtcbiAgICAgICAgfVxuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgOTpcbiAgICAgICAge1xuICAgICAgICAgIGNvbnN0IGluZGV4ID0gdGhpcy5jaGFzZU1vZGUudmFsaWRNb3Zlcy5pbmRleE9mKFwicmlnaHRcIik7XG5cbiAgICAgICAgICB0aGlzLmNoYXNlTW9kZS52YWxpZE1vdmVzLnNwbGljZShpbmRleCwgMSk7XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG4gICAgfVxuICAgIHN3aXRjaCAodGhpcy5jaGFzZU1vZGUuY2hhc2VTdWJqZWN0LnkpIHtcbiAgICAgIGNhc2UgMDpcbiAgICAgICAge1xuICAgICAgICAgIGNvbnN0IGluZGV4ID0gdGhpcy5jaGFzZU1vZGUudmFsaWRNb3Zlcy5pbmRleE9mKFwidG9wXCIpO1xuXG4gICAgICAgICAgdGhpcy5jaGFzZU1vZGUudmFsaWRNb3Zlcy5zcGxpY2UoaW5kZXgsIDEpO1xuICAgICAgICB9XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSA5OlxuICAgICAgICB7XG4gICAgICAgICAgY29uc3QgaW5kZXggPSB0aGlzLmNoYXNlTW9kZS52YWxpZE1vdmVzLmluZGV4T2YoXCJib3R0b21cIik7XG5cbiAgICAgICAgICB0aGlzLmNoYXNlTW9kZS52YWxpZE1vdmVzLnNwbGljZShpbmRleCwgMSk7XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG4gICAgfVxuICAgIC8vcmVtb3ZlIHRoZSBkaXJlY3Rpb25zIHRoYXQgd2lsbCBub3QgZm9sbG93IHJ1bGVzICEhIVxuICAgIC8vb25seSBpbiBjaGFzZVN1YmplY3RcbiAgfSxcbiAgLy9waWNrIGEgZGlyZWN0aW9uXG4gIC8vdGhpcyB3aWxsIHJldHVybiBhIGRpcmVjdGlvblxuICAvLyBpZiBpdCBoYXMgMiBjb25zZWN1dGl2ZSBoaXRze1xuICAvLyBrZWVwIGluIHRoZSBzdWNjZXNmdWxsIGRpcmVjdGlvblxuICAvL2lmIHBvc2libGVcbiAgLy9pZiBub3QsIHJldHVybiB0aGUgZmlyc3QgdmlhYmxlIGRpcmVjdGlvbn1cbiAgLy9lbHNle3JldHVybiBhIHJhbmRvbSBkaXJlY3Rpb259XG4gIGRpcmVjdGlvbjogZnVuY3Rpb24gKCkge1xuICAgIGlmICh0aGlzLmNoYXNlTW9kZS5pc0NoYXNpbmcpIHtcbiAgICAgIGNvbnNvbGUubG9nKGBmb2xsb3dESXJlY3Rpb24gaXMgOiR7dGhpcy5jaGFzZU1vZGUuZm9sbG93RGlyZWN0aW9ufWApO1xuICAgICAgaWYgKHRoaXMuY2hhc2VNb2RlLnZhbGlkTW92ZXMuaW5jbHVkZXModGhpcy5jaGFzZU1vZGUuZm9sbG93RGlyZWN0aW9uKSkge1xuICAgICAgICBjb25zb2xlLmxvZyhgdGhlIGZvbGxvdyBkaXJlY3Rpb24gaXMgdmFsaWRgKTtcbiAgICAgICAgcmV0dXJuIHRoaXMuY2hhc2VNb2RlLmZvbGxvd0RpcmVjdGlvbjtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwicmFuZG9tIGRpcmVjdGlvblwiKTtcbiAgICAgICAgdGhpcy5jaGFzZU1vZGUuc3RhdGUgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5jaGFzZU1vZGUuaXNDaGFzaW5nID0gZmFsc2U7XG4gICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgICB9XG5cbiAgICAgIC8qIGVsc2Uge1xuICAgICAgICAgIC8vZ28gb3Bvc2l0ZSBkaXJlY3Rpb24gZnJvbSB0aGUgc3RhcnRcXFxuICAgICAgICAgIC8vIGl0IHNob3VsZCBiZSBzYXZlZCwgdGhlIHZhbGlkIG1vdmVzIGZyb20gdGhlIG9yaWdpbmFsIGNoYXNlIG9iamVjdGl2ZVxuICAgICAgICAgIC8vaWYgaXQgaXMgbm90IHBvc2libGUsIGVuZCBoZXJlXG4gICAgICAgICAgYWxlcnQoXCJnb2luZyBpbiBvcHBvc2l0ZSBkaXJlY3Rpb25cIik7XG5cbiAgICAgICAgICBzd2l0Y2ggKHRoaXMuY2hhc2VNb2RlLmZvbGxvd0RpcmVjdGlvbikge1xuICAgICAgICAgICAgY2FzZSBcImxlZnRcIjpcbiAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLmNoYXNlTW9kZS5vcmlnaW5hbFZhbGlkTW92ZXMuaW5jbHVkZXMoXCJyaWdodFwiKSkge1xuICAgICAgICAgICAgICAgICAgdmFyIGRpcmVjdGlvbiA9IFwicmlnaHRcIjtcbiAgICAgICAgICAgICAgICAgIHRoaXMuY2hhc2VNb2RlLmlzUmV2ZXJzZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICBhbGVydChcImNoYXNlIG1vZGUgZmluaXNoZWRcIik7XG4gICAgICAgICAgICAgICAgICB0aGlzLmNoYXNlTW9kZS5zdGF0ZSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgLy9yZXNldCB2YWxpZCBtb3Zlc1xuICAgICAgICAgICAgICAgICAgdGhpcy5jaGFzZU1vZGUudmFsaWRNb3ZlcyA9IFtcbiAgICAgICAgICAgICAgICAgICAgXCJsZWZ0XCIsXG4gICAgICAgICAgICAgICAgICAgIFwicmlnaHRcIixcbiAgICAgICAgICAgICAgICAgICAgXCJ0b3BcIixcbiAgICAgICAgICAgICAgICAgICAgXCJib3R0b21cIixcbiAgICAgICAgICAgICAgICAgIF07XG4gICAgICAgICAgICAgICAgICByZXR1cm4gXCJjaGFzZSBtb2RlIGVuZGVkXCI7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBcInJpZ2h0XCI6XG4gICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5jaGFzZU1vZGUub3JpZ2luYWxWYWxpZE1vdmVzLmluY2x1ZGVzKFwibGVmdFwiKSkge1xuICAgICAgICAgICAgICAgICAgdmFyIGRpcmVjdGlvbiA9IFwibGVmdFwiO1xuICAgICAgICAgICAgICAgICAgdGhpcy5jaGFzZU1vZGUuaXNSZXZlcnNlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgIGFsZXJ0KFwiY2hhc2UgbW9kZSBmaW5pc2hlZFwiKTtcbiAgICAgICAgICAgICAgICAgIHRoaXMuY2hhc2VNb2RlLnN0YXRlID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAvL3Jlc2V0IHZhbGlkIG1vdmVzXG4gICAgICAgICAgICAgICAgICB0aGlzLmNoYXNlTW9kZS52YWxpZE1vdmVzID0gW1xuICAgICAgICAgICAgICAgICAgICBcImxlZnRcIixcbiAgICAgICAgICAgICAgICAgICAgXCJyaWdodFwiLFxuICAgICAgICAgICAgICAgICAgICBcInRvcFwiLFxuICAgICAgICAgICAgICAgICAgICBcImJvdHRvbVwiLFxuICAgICAgICAgICAgICAgICAgXTtcbiAgICAgICAgICAgICAgICAgIHJldHVybiBcImNoYXNlIG1vZGUgZW5kZWRcIjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIFwidG9wXCI6XG4gICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5jaGFzZU1vZGUub3JpZ2luYWxWYWxpZE1vdmVzLmluY2x1ZGVzKFwiYm90dG9tXCIpKSB7XG4gICAgICAgICAgICAgICAgICB2YXIgZGlyZWN0aW9uID0gXCJib3R0b21cIjtcbiAgICAgICAgICAgICAgICAgIHRoaXMuY2hhc2VNb2RlLmlzUmV2ZXJzZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICBhbGVydChcImNoYXNlIG1vZGUgZmluaXNoZWRcIik7XG4gICAgICAgICAgICAgICAgICB0aGlzLmNoYXNlTW9kZS5zdGF0ZSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgLy9yZXNldCB2YWxpZCBtb3Zlc1xuICAgICAgICAgICAgICAgICAgdGhpcy5jaGFzZU1vZGUudmFsaWRNb3ZlcyA9IFtcbiAgICAgICAgICAgICAgICAgICAgXCJsZWZ0XCIsXG4gICAgICAgICAgICAgICAgICAgIFwicmlnaHRcIixcbiAgICAgICAgICAgICAgICAgICAgXCJ0b3BcIixcbiAgICAgICAgICAgICAgICAgICAgXCJib3R0b21cIixcbiAgICAgICAgICAgICAgICAgIF07XG4gICAgICAgICAgICAgICAgICByZXR1cm4gXCJjaGFzZSBtb2RlIGVuZGVkXCI7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBcImJvdHRvbVwiOlxuICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuY2hhc2VNb2RlLm9yaWdpbmFsVmFsaWRNb3Zlcy5pbmNsdWRlcyhcInRvcFwiKSkge1xuICAgICAgICAgICAgICAgICAgdmFyIGRpcmVjdGlvbiA9IFwidG9wXCI7XG4gICAgICAgICAgICAgICAgICB0aGlzLmNoYXNlTW9kZS5pc1JldmVyc2VkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgYWxlcnQoXCJjaGFzZSBtb2RlIGZpbmlzaGVkXCIpO1xuICAgICAgICAgICAgICAgICAgdGhpcy5jaGFzZU1vZGUuc3RhdGUgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgIC8vcmVzZXQgdmFsaWQgbW92ZXNcbiAgICAgICAgICAgICAgICAgIHRoaXMuY2hhc2VNb2RlLnZhbGlkTW92ZXMgPSBbXG4gICAgICAgICAgICAgICAgICAgIFwibGVmdFwiLFxuICAgICAgICAgICAgICAgICAgICBcInJpZ2h0XCIsXG4gICAgICAgICAgICAgICAgICAgIFwidG9wXCIsXG4gICAgICAgICAgICAgICAgICAgIFwiYm90dG9tXCIsXG4gICAgICAgICAgICAgICAgICBdO1xuICAgICAgICAgICAgICAgICAgcmV0dXJuIFwiY2hhc2UgbW9kZSBlbmRlZFwiO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICB9XG4gICAgICAgICAgdGhpcy5jaGFzZU1vZGUuY2hhc2VTdWJqZWN0ID0gdGhpcy5jaGFzZU1vZGUuZmlyc3RDaGFzZVN1YmplY3Q7XG4gICAgICAgIH0gKi9cbiAgICB9IGVsc2UgaWYgKHRoaXMuY2hhc2VNb2RlLmlzQ2hhc2luZyA9PT0gZmFsc2UpIHtcbiAgICAgIGlmICh0aGlzLmNoYXNlTW9kZS52YWxpZE1vdmVzLmxlbmd0aCA+PSAxKSB7XG4gICAgICAgIHRoaXMuY2hhc2VNb2RlLm9yaWdpbmFsVmFsaWRNb3ZlcyA9IHRoaXMuY2hhc2VNb2RlLnZhbGlkTW92ZXM7IC8vdGhpcyBpcyBmb3IgcmV2ZXJzZSBtb2RlIGxhdGVyXG4gICAgICAgIGNvbnN0IGRpcmVjdGlvbkluZGV4ID0gY29tcHV0ZXIucmFuZG9tSW50RnJvbUludGVydmFsKFxuICAgICAgICAgIDAsXG4gICAgICAgICAgdGhpcy5jaGFzZU1vZGUudmFsaWRNb3Zlcy5sZW5ndGggLSAxXG4gICAgICAgICk7XG4gICAgICAgIGNvbnN0IGRpcmVjdGlvbiA9IHRoaXMuY2hhc2VNb2RlLnZhbGlkTW92ZXNbZGlyZWN0aW9uSW5kZXhdO1xuXG4gICAgICAgIGFsZXJ0KGByYW5kb21seSBzZWxlY3RlZCBkaXJlY3Rpb24gOiAke2RpcmVjdGlvbn1gKTtcbiAgICAgICAgcmV0dXJuIGRpcmVjdGlvbjtcbiAgICAgIH0gZWxzZSBpZiAodGhpcy5jaGFzZU1vZGUudmFsaWRNb3Zlcy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgdGhpcy5jaGFzZU1vZGUuc3RhdGUgPSBmYWxzZTtcbiAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICAgIH1cbiAgICB9XG4gIH0sXG4gIC8vdHJhbnNmb3JtIGRpcmVjdGlvbiBpbnRvIGNvb3JkaW5hdGVcbiAgLy90aGlzIHdpbGwgcmV0dXJuIGEgY29vcmRpbmF0ZVxuICAvLyB7eCx5fVxuICBjb29yZGluYXRlczogZnVuY3Rpb24gKGRpcmVjdGlvbikge1xuICAgIGlmIChkaXJlY3Rpb24gPT09IHVuZGVmaW5lZCkge1xuICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICB9XG4gICAgc3dpdGNoIChkaXJlY3Rpb24pIHtcbiAgICAgIGNhc2UgXCJsZWZ0XCI6IHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICB4OiB0aGlzLmNoYXNlTW9kZS5jaGFzZVN1YmplY3QueCAtIDEsXG4gICAgICAgICAgeTogdGhpcy5jaGFzZU1vZGUuY2hhc2VTdWJqZWN0LnksXG4gICAgICAgIH07XG4gICAgICB9XG5cbiAgICAgIGNhc2UgXCJyaWdodFwiOiB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgeDogdGhpcy5jaGFzZU1vZGUuY2hhc2VTdWJqZWN0LnggKyAxLFxuICAgICAgICAgIHk6IHRoaXMuY2hhc2VNb2RlLmNoYXNlU3ViamVjdC55LFxuICAgICAgICB9O1xuICAgICAgfVxuXG4gICAgICBjYXNlIFwidG9wXCI6XG4gICAgICAgIHtcbiAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgeDogdGhpcy5jaGFzZU1vZGUuY2hhc2VTdWJqZWN0LngsXG4gICAgICAgICAgICB5OiB0aGlzLmNoYXNlTW9kZS5jaGFzZVN1YmplY3QueSAtIDEsXG4gICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgXCJib3R0b21cIjoge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIHg6IHRoaXMuY2hhc2VNb2RlLmNoYXNlU3ViamVjdC54LFxuICAgICAgICAgIHk6IHRoaXMuY2hhc2VNb2RlLmNoYXNlU3ViamVjdC55ICsgMSxcbiAgICAgICAgfTtcbiAgICAgIH1cbiAgICB9XG4gIH0sXG4gIC8vdXNlIHRoZSBuZXcgY29vcmRpbmF0ZSBhbmQgZGlyZWN0aW9uXG4gIGF0dGFjazogZnVuY3Rpb24gKHBsYXllckJvYXJkT2JqKSB7XG4gICAgLy9zYXZlIGRpcmVjdGlvblxuXG4gICAgY29uc3QgZGlyZWN0aW9uID0gdGhpcy5kaXJlY3Rpb24oKTtcbiAgICAvL2F0dGFjaztcbiAgICAvL3NhdmUgY29vcmRpbmF0ZXNcbiAgICBjb25zdCBjb29yZGluYXRlcyA9IHRoaXMuY29vcmRpbmF0ZXMoZGlyZWN0aW9uKTtcblxuICAgIGlmIChjb29yZGluYXRlcyA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICBjb21wdXRlci5hdHRhY2socGxheWVyQm9hcmRPYmopO1xuICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5jaGFzZU1vZGUuaXNDaGFzaW5nKSB7XG4gICAgICBzd2l0Y2ggKHBsYXllckJvYXJkT2JqLnJlY2l2ZUF0dGFjayhjb29yZGluYXRlcy54LCBjb29yZGluYXRlcy55KSkge1xuICAgICAgICBjYXNlIFwiaGl0XCI6XG4gICAgICAgICAge1xuICAgICAgICAgICAgLy91cGRhdGUgY2hhc2Ugc3ViamVjdFxuICAgICAgICAgICAgdGhpcy5jaGFzZU1vZGUuY2hhc2VTdWJqZWN0ID0gY29vcmRpbmF0ZXM7XG5cbiAgICAgICAgICAgIC8vcmVzZXQgdmFsaWQgbW92ZXNcbiAgICAgICAgICAgIHRoaXMuY2hhc2VNb2RlLnZhbGlkTW92ZXMgPSBbXCJsZWZ0XCIsIFwicmlnaHRcIiwgXCJ0b3BcIiwgXCJib3R0b21cIl07XG4gICAgICAgICAgfVxuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIFwibWlzc2VkXCI6XG4gICAgICAgICAge1xuICAgICAgICAgICAgLyogICAvL2lmIHJ1bmluZyBmb3JtIHRoZSBvcG9zaXRlIGRpcmVjdGlvbiwgdGhlIGNoYXNlIG1vZGUgc2hvdWxkIHN0b3BcbiAgICAgICAgICAgICAgaWYgKHRoaXMuY2hhc2VNb2RlLmlzUmV2ZXJzZWQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmNoYXNlTW9kZS5zdGF0ZSA9IGZhbHNlO1xuICAgICAgICAgICAgICB9ICovXG4gICAgICAgICAgICAvL2dldCByYW5kb20gbnVtYmVyIGNob29zZWQgZnJvbSBhcnJheSBtb3ZlcyBhbmQgZGVsZXRlZCBmcm9tXG4gICAgICAgICAgICAvL3RoZSBhcnJheSBzbyBvbmx5IHRoZSBsZWZ0IHBvc2libGUgbW92ZSByZW1haW5zXG4gICAgICAgICAgICAvL2l0cyBub3QgbmVjZXNhcnkgYmVhY2F1c2UgdGhlIGZ1bmN0aW9uIGRldGVjdHMgbWlzc2VkIHNob290c1xuICAgICAgICAgICAgLy9ubyBuZWVkIHRvIGRvIGFueXRoaW5nLCBpdCBtYXJrcyBtaXNzXG4gICAgICAgICAgICB0aGlzLmNoYXNlTW9kZS5zdGF0ZSA9IGZhbHNlO1xuICAgICAgICAgICAgdGhpcy5jaGFzZU1vZGUuaXNDaGFzaW5nID0gZmFsc2U7XG4gICAgICAgICAgICB0aGlzLmNoYXNlTW9kZS5mb2xsb3dEaXJlY3Rpb24gPSB1bmRlZmluZWQ7XG4gICAgICAgICAgICB0aGlzLmNoYXNlTW9kZS52YWxpZE1vdmVzID0gW1wibGVmdFwiLCBcInJpZ2h0XCIsIFwidG9wXCIsIFwiYm90dG9tXCJdO1xuICAgICAgICAgIH1cbiAgICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKHRoaXMuY2hhc2VNb2RlLmlzQ2hhc2luZyA9PT0gZmFsc2UpIHtcbiAgICAgIHN3aXRjaCAocGxheWVyQm9hcmRPYmoucmVjaXZlQXR0YWNrKGNvb3JkaW5hdGVzLngsIGNvb3JkaW5hdGVzLnkpKSB7XG4gICAgICAgIGNhc2UgXCJoaXRcIjpcbiAgICAgICAgICB7XG4gICAgICAgICAgICAvL3NhdmUgY29vcmRpbmF0ZXMgb2YgdGhpcyBmaXJzdCBoaXRcbiAgICAgICAgICAgIHRoaXMuY2hhc2VNb2RlLmZpcnN0Q2hhc2VTdWJqZWN0ID0gdGhpcy5jaGFzZU1vZGUuY2hhc2VTdWJqZWN0OyAvL2ZvciByZXZlcnNlZFxuXG4gICAgICAgICAgICAvL2NoYW5nZSB0aGUgY2hhc2Ugc3ViamVjdFxuXG4gICAgICAgICAgICB0aGlzLmNoYXNlTW9kZS5jaGFzZVN1YmplY3QgPSBjb29yZGluYXRlcztcblxuICAgICAgICAgICAgLy9zYXZlIHZhbGlkIG1vdmVzIG9mIHRoZSBmaXJzdCBjaGFzZSBzdWJqZWN0XG4gICAgICAgICAgICB0aGlzLmNoYXNlTW9kZS5vcmlnaW5hbFZhbGlkTW92ZXMgPSB0aGlzLmNoYXNlTW9kZS52YWxpZE1vdmVzOyAvL2ZvciByZXZlcnNlICFcbiAgICAgICAgICAgIC8vcmVzZXQgdmFsaWQgbW92ZXNcbiAgICAgICAgICAgIHRoaXMuY2hhc2VNb2RlLnZhbGlkTW92ZXMgPSBbXCJsZWZ0XCIsIFwicmlnaHRcIiwgXCJ0b3BcIiwgXCJib3R0b21cIl07XG5cbiAgICAgICAgICAgIC8vc3RhcnQgYSBjaGFzaW4gZGlyZWN0aW9uIC4uLi5hbmQgYXhpc1xuICAgICAgICAgICAgdGhpcy5jaGFzZU1vZGUuZm9sbG93RGlyZWN0aW9uID0gZGlyZWN0aW9uO1xuICAgICAgICAgICAgdGhpcy5jaGFzZU1vZGUuaXNDaGFzaW5nID0gdHJ1ZTtcbiAgICAgICAgICB9XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgXCJtaXNzZWRcIjpcbiAgICAgICAgICB7XG4gICAgICAgICAgICAvL2lmIHJ1bmluZyBmb3JtIHRoZSBvcG9zaXRlIGRpcmVjdGlvbiwgdGhlIGNoYXNlIG1vZGUgc2hvdWxkIHN0b3BcbiAgICAgICAgICAgIC8qIGlmICh0aGlzLmNoYXNlTW9kZS5pc1JldmVyc2VkKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5jaGFzZU1vZGUuc3RhdGUgPSBmYWxzZTtcbiAgICAgICAgICAgICAgfSAqL1xuICAgICAgICAgICAgLy9nZXQgcmFuZG9tIG51bWJlciBjaG9vc2VkIGZyb20gYXJyYXkgbW92ZXMgYW5kIGRlbGV0ZWQgZnJvbVxuICAgICAgICAgICAgLy90aGUgYXJyYXkgc28gb25seSB0aGUgbGVmdCBwb3NpYmxlIG1vdmUgcmVtYWluc1xuICAgICAgICAgICAgLy9pdHMgbm90IG5lY2VzYXJ5IGJlYWNhdXNlIHRoZSBmdW5jdGlvbiBkZXRlY3RzIG1pc3NlZCBzaG9vdHNcbiAgICAgICAgICAgIC8vaXQgaXMgbm90IG5lY2VzYXJ5IHRvIGRvIGFueXRoaW5nIGhlcmUgYmVjYXVzZSB0aGUgYWkgd2lsbCBrZWVwIHRyeWluZyB1bnRpbCBpdCBnZXRzIGEgaGl0XG4gICAgICAgICAgICB0aGlzLmNoYXNlTW9kZS52YWxpZE1vdmVzID0gW1wibGVmdFwiLCBcInJpZ2h0XCIsIFwidG9wXCIsIFwiYm90dG9tXCJdO1xuICAgICAgICAgIH1cbiAgICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9XG4gIH0sXG59O1xuXG5leHBvcnQgeyBhaSB9O1xuIiwiZnVuY3Rpb24gYXhpc0J1dHRvbigpIHtcbiAgY29uc3QgYXhpc0J1dHRvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiYXhpcy1zZWxlY3RvclwiKTtcbiAgYXhpc0J1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgIGlmIChheGlzQnV0dG9uLmRhdGFzZXQuZGlyZWN0aW9uID09PSBcImhvcml6b250YWxcIikge1xuICAgICAgYXhpc0J1dHRvbi5kYXRhc2V0LmRpcmVjdGlvbiA9IFwidmVydGljYWxcIjtcbiAgICB9IGVsc2Uge1xuICAgICAgYXhpc0J1dHRvbi5kYXRhc2V0LmRpcmVjdGlvbiA9IFwiaG9yaXpvbnRhbFwiO1xuICAgIH1cbiAgfSk7XG59XG5mdW5jdGlvbiBib2FyZENvb3JkaW5hdGVzKHBvc2l0aW9uKSB7XG4gIGxldCBjZWxsQ29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgY2VsbENvbnRhaW5lci5pZCA9IFwiY2VsbC1jb250YWluZXJcIjtcbiAgY2VsbENvbnRhaW5lci5jbGFzc0xpc3QuYWRkKHBvc2l0aW9uKTtcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCAxMDsgaSsrKSB7XG4gICAgY29uc3QgY2VsbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgY2VsbC5pbm5lclRleHQgPSBpO1xuICAgIGNlbGwuY2xhc3NMaXN0LmFkZChcImNlbGxcIik7XG5cbiAgICBjZWxsQ29udGFpbmVyLmFwcGVuZENoaWxkKGNlbGwpO1xuICB9XG4gIHJldHVybiBjZWxsQ29udGFpbmVyO1xufVxuXG5mdW5jdGlvbiBkb21SZW5kZXJCb2FyZChpZCkge1xuICBjb25zdCBib2FyZCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gIGJvYXJkLmlkID0gaWQ7XG4gIGJvYXJkLmNsYXNzTGlzdC5hZGQoXCJib2FyZFwiKTtcbiAgZm9yIChsZXQgciA9IDA7IHIgPCAxMDsgcisrKSB7XG4gICAgY29uc3Qgcm93ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICByb3cuY2xhc3NMaXN0LmFkZChgcm93LSR7cn1gLCBcInJvd1wiKTtcbiAgICByb3cuZGF0YXNldC55ID0gcjtcblxuICAgIGZvciAobGV0IGMgPSAwOyBjIDwgMTAgPiAwOyBjKyspIHtcbiAgICAgIGNvbnN0IGNvbHVtbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG5cbiAgICAgIGNvbHVtbi5jbGFzc0xpc3QuYWRkKGBjb2x1bW4tJHtjfWAsIFwiY29sdW1uXCIpO1xuICAgICAgY29sdW1uLmRhdGFzZXQueCA9IGM7XG4gICAgICByb3cuYXBwZW5kQ2hpbGQoY29sdW1uKTtcbiAgICB9XG4gICAgYm9hcmQuYXBwZW5kQ2hpbGQocm93KTtcbiAgfVxuICByZXR1cm4gYm9hcmQ7XG59XG5cbmZ1bmN0aW9uIGRvbVBvcHVsYXRlQm9hcmQoYm9hcmRPYmosIERvbUJvYXJkU2VsZWN0b3IsIGlzUGxheWVyQm9hcmQgPSB0cnVlKSB7XG4gIGZvciAobGV0IHIgPSAwOyByIDwgMTA7IHIrKykge1xuICAgIGZvciAobGV0IGMgPSAwOyBjIDwgMTA7IGMrKykge1xuICAgICAgY29uc3QgY29sdW1uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcbiAgICAgICAgYCR7RG9tQm9hcmRTZWxlY3Rvcn0gLnJvdy0ke3J9IC5jb2x1bW4tJHtjfWBcbiAgICAgICk7XG5cbiAgICAgIGlmIChib2FyZE9iai5ib2FyZFtyXVtjXSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIGlmIChib2FyZE9iai5ib2FyZFtyXVtjXS5kZXN0cm95ZWQgPT09IHRydWUpIHtcbiAgICAgICAgICBjb2x1bW4uc3R5bGUuYmFja2dyb3VuZENvbG9yID0gXCJyZWRcIjtcbiAgICAgICAgfSBlbHNlIGlmIChib2FyZE9iai5ib2FyZFtyXVtjXS5kZXN0cm95ZWQgPT09IGZhbHNlICYmIGlzUGxheWVyQm9hcmQpIHtcbiAgICAgICAgICBjb2x1bW4uc3R5bGUuYmFja2dyb3VuZENvbG9yID0gXCJncmVlblwiO1xuICAgICAgICB9IGVsc2UgaWYgKGJvYXJkT2JqLmJvYXJkW3JdW2NdID09PSBcIm1pc3NlZFwiKSB7XG4gICAgICAgICAgY29sdW1uLnN0eWxlLmJhY2tncm91bmRDb2xvciA9IFwiZ3JleVwiO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG59XG5cbi8qIGZ1bmN0aW9uIGF0dGFja1dpdGhDbGljayhkb21Cb2FyZCwgY29tcHV0ZXJCb2FyZE9iaikge1xuICBkb21Cb2FyZC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGUpID0+IHtcbiAgICBsZXQgeCA9IGUudGFyZ2V0LmRhdGFzZXQueDtcbiAgICBsZXQgeSA9IGUudGFyZ2V0LnBhcmVudEVsZW1lbnQuZGF0YXNldC55O1xuICB9KTtcbiAgaWYgKGNvbXB1dGVyQm9hcmRPYmoucmVjaXZlQXR0YWNrKHgsIHkpICE9PSBcInJlcGV0aWRvXCIpIHtcbiAgICBjb21wdXRlckJvYXJkT2JqLnJlY2l2ZUF0dGFjayh4LCB5KTtcbiAgfSBlbHNlIHtcbiAgICBhdHRhY2tXaXRoQ2xpY2soZG9tQm9hcmQsIGNvbXB1dGVyQm9hcmRPYmopO1xuICB9XG4gIC8vXG4gIGlmIChjb21wdXRlckJvYXJkT2JqLnJlY2l2ZUF0dGFjayh4LCB5KSAhPT0gXCJyZXBldGlkb1wiKSB7XG4gICAgY29tcHV0ZXJCb2FyZE9iai5yZWNpdmVBdHRhY2soeCwgeSk7XG5cbiAgICBkb21Qb3B1bGF0ZUJvYXJkKGNvbXB1dGVyQm9hcmRPYmosIFwiI2NvbXB1dGVyQm9hcmRcIiwgZmFsc2UpO1xuXG4gICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICBjb21wdXRlcnR0YWNrKCk7XG4gICAgICBkb21Qb3B1bGF0ZUJvYXJkKHBsYXllckJvYXJkT2JqLCBcIiNwbGF5ZXJCb2FyZFwiKTtcbiAgICAgIGxldFRoZW1QbGF5KCk7XG4gICAgfSwgMjAwMCk7XG4gIH0gZWxzZSB7XG4gICAgYWxlcnQoXCJyZXBldGlkb1wiKTtcbiAgICBsZXRUaGVtUGxheSgpO1xuICB9XG59ICovXG5cbmV4cG9ydCB7IGRvbVJlbmRlckJvYXJkLCBkb21Qb3B1bGF0ZUJvYXJkLCBheGlzQnV0dG9uLCBib2FyZENvb3JkaW5hdGVzIH07XG4iLCJpbXBvcnQge1xuICBkb21SZW5kZXJCb2FyZCxcbiAgZG9tUG9wdWxhdGVCb2FyZCxcbiAgYm9hcmRDb29yZGluYXRlcyxcbn0gZnJvbSBcIi4vZG9tSW50ZXJhY3Rpb25cIjtcbmltcG9ydCBnYW1lYm9hcmRGYWN0b3J5IGZyb20gXCIuL2dhbWVib2FyZEZhY3RvcnlcIjtcbmltcG9ydCB7IGNvbXB1dGVyLCBwbGF5ZXIgfSBmcm9tIFwiLi9wbGF5ZXJzXCI7XG5cbmFzeW5jIGZ1bmN0aW9uIGdhbWVMb29wKCkge1xuICAvLzIgLSBUaGUgZ2FtZSBsb29wIHNob3VsZCBzZXQgdXAgYSBuZXcgZ2FtZSBieSBjcmVhdGluZyBQbGF5ZXJzIGFuZCBHYW1lYm9hcmRzLiBGb3Igbm93IGp1c3QgcG9wdWxhdGUgZWFjaCBHYW1lYm9hcmQgd2l0aCBwcmVkZXRlcm1pbmVkIGNvb3JkaW5hdGVzLiBZb3UgY2FuIGltcGxlbWVudCBhIHN5c3RlbSBmb3IgYWxsb3dpbmcgcGxheWVycyB0byBwbGFjZSB0aGVpciBzaGlwcyBsYXRlci5cblxuICBjb25zdCBjb250ZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJjb250ZW50XCIpO1xuICAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG5cbiAgY29uc3QgcGxheWVyQm9hcmRDb250YWluZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcbiAgICBcInBsYXllci1ib2FyZC1jb250YWluZXJcIlxuICApO1xuICBwbGF5ZXJCb2FyZENvbnRhaW5lci5hcHBlbmRDaGlsZChib2FyZENvb3JkaW5hdGVzKFwibGVmdFwiKSk7XG4gIHBsYXllckJvYXJkQ29udGFpbmVyLmFwcGVuZENoaWxkKGJvYXJkQ29vcmRpbmF0ZXMoXCJ0b3BcIikpO1xuICBwbGF5ZXJCb2FyZENvbnRhaW5lci5hcHBlbmRDaGlsZChkb21SZW5kZXJCb2FyZChcInBsYXllckJvYXJkXCIpKTsgLy8gbWFrZSBlbXB0eSBib2FyZFxuICBwbGF5ZXJCb2FyZENvbnRhaW5lci5hcHBlbmRDaGlsZChib2FyZENvb3JkaW5hdGVzKFwiYm90dG9tXCIpKTtcbiAgcGxheWVyQm9hcmRDb250YWluZXIuYXBwZW5kQ2hpbGQoYm9hcmRDb29yZGluYXRlcyhcInJpZ2h0XCIpKTtcbiAgLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbiAgY29uc3QgY29tcHV0ZXJCb2FyZENvbnRhaW5lciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFxuICAgIFwiY29tcHV0ZXItYm9hcmQtY29udGFpbmVyXCJcbiAgKTtcbiAgY29tcHV0ZXJCb2FyZENvbnRhaW5lci5hcHBlbmRDaGlsZChib2FyZENvb3JkaW5hdGVzKFwibGVmdFwiKSk7XG4gIGNvbXB1dGVyQm9hcmRDb250YWluZXIuYXBwZW5kQ2hpbGQoYm9hcmRDb29yZGluYXRlcyhcInRvcFwiKSk7XG4gIGNvbXB1dGVyQm9hcmRDb250YWluZXIuYXBwZW5kQ2hpbGQoZG9tUmVuZGVyQm9hcmQoXCJjb21wdXRlckJvYXJkXCIpKTsgLy8gbWFrZSBlbXB0eSBib2FyZFxuICBjb21wdXRlckJvYXJkQ29udGFpbmVyLmFwcGVuZENoaWxkKGJvYXJkQ29vcmRpbmF0ZXMoXCJyaWdodFwiKSk7XG4gIGNvbXB1dGVyQm9hcmRDb250YWluZXIuYXBwZW5kQ2hpbGQoYm9hcmRDb29yZGluYXRlcyhcImJvdHRvbVwiKSk7XG5cbiAgY29udGVudC5hcHBlbmRDaGlsZChwbGF5ZXJCb2FyZENvbnRhaW5lcik7XG4gIGNvbnRlbnQuYXBwZW5kQ2hpbGQoY29tcHV0ZXJCb2FyZENvbnRhaW5lcik7XG4gIC8vLy8vLy8vLy8vLy8vLy8vXG5cbiAgY29uc3QgcGxheWVyQm9hcmRPYmogPSBnYW1lYm9hcmRGYWN0b3J5KCk7XG4gIGNvbnN0IGNvbXB1dGVyQm9hcmRPYmogPSBnYW1lYm9hcmRGYWN0b3J5KCk7XG5cbiAgLyogcGxheWVyQm9hcmRPYmouYm9hcmRbMV1bMV0gPSBcIm1pc3NlZFwiO1xuICBwbGF5ZXJCb2FyZE9iai5ib2FyZFsxXVsyXSA9IFwibWlzc2VkXCI7XG4gIHBsYXllckJvYXJkT2JqLmJvYXJkWzFdWzNdID0gXCJtaXNzZWRcIjtcbiAgcGxheWVyQm9hcmRPYmouYm9hcmRbMV1bNF0gPSBcIm1pc3NlZFwiO1xuICBwbGF5ZXJCb2FyZE9iai5ib2FyZFsxXVs1XSA9IFwibWlzc2VkXCI7XG4gIHBsYXllckJvYXJkT2JqLmJvYXJkWzFdWzZdID0gXCJtaXNzZWRcIjtcblxuICAvL1xuICBwbGF5ZXJCb2FyZE9iai5ib2FyZFsxXVsxXSA9IFwibWlzc2VkXCI7XG4gIHBsYXllckJvYXJkT2JqLmJvYXJkWzJdWzFdID0gXCJtaXNzZWRcIjtcbiAgcGxheWVyQm9hcmRPYmouYm9hcmRbM11bMV0gPSBcIm1pc3NlZFwiO1xuICBwbGF5ZXJCb2FyZE9iai5ib2FyZFs0XVsxXSA9IFwibWlzc2VkXCI7XG4gIC8vXG4gIHBsYXllckJvYXJkT2JqLmJvYXJkWzFdWzddID0gXCJtaXNzZWRcIjtcbiAgcGxheWVyQm9hcmRPYmouYm9hcmRbMl1bN10gPSBcIm1pc3NlZFwiO1xuICBwbGF5ZXJCb2FyZE9iai5ib2FyZFszXVs3XSA9IFwibWlzc2VkXCI7XG4gIHBsYXllckJvYXJkT2JqLmJvYXJkWzRdWzddID0gXCJtaXNzZWRcIjtcbiAgLy9cblxuICBwbGF5ZXJCb2FyZE9iai5ib2FyZFs1XVsxXSA9IFwibWlzc2VkXCI7XG4gIHBsYXllckJvYXJkT2JqLmJvYXJkWzVdWzJdID0gXCJtaXNzZWRcIjtcbiAgcGxheWVyQm9hcmRPYmouYm9hcmRbNV1bM10gPSBcIm1pc3NlZFwiO1xuICBwbGF5ZXJCb2FyZE9iai5ib2FyZFs1XVs0XSA9IFwibWlzc2VkXCI7XG4gIHBsYXllckJvYXJkT2JqLmJvYXJkWzVdWzVdID0gXCJtaXNzZWRcIjtcbiAgcGxheWVyQm9hcmRPYmouYm9hcmRbNV1bNl0gPSBcIm1pc3NlZFwiO1xuICBwbGF5ZXJCb2FyZE9iai5ib2FyZFs1XVs3XSA9IFwibWlzc2VkXCI7ICovXG4gIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbiAgY29tcHV0ZXIucGxhY2VTaGlwKGNvbXB1dGVyQm9hcmRPYmosIDIpO1xuICAvL2NvbnNvbGUubG9nKGNvbXB1dGVyQm9hcmRPYmouZmxlZXQpO1xuICBjb25zb2xlLmxvZyhcInBsYWNlIHlvdXIgMiBzaGlwXCIpO1xuICBhd2FpdCBwbGF5ZXIucGxhY2VTaGlwKDIsIFwicGxheWVyQm9hcmRcIiwgcGxheWVyQm9hcmRPYmopO1xuICBkb21Qb3B1bGF0ZUJvYXJkKHBsYXllckJvYXJkT2JqLCBcIiNwbGF5ZXJCb2FyZFwiLCB0cnVlKTtcblxuICBjb21wdXRlci5wbGFjZVNoaXAoY29tcHV0ZXJCb2FyZE9iaiwgMyk7XG4gIC8vY29uc29sZS5sb2coY29tcHV0ZXJCb2FyZE9iai5mbGVldCk7XG4gIGNvbnNvbGUubG9nKFwicGxhY2UgeW91ciAzIHNoaXBcIik7XG4gIGF3YWl0IHBsYXllci5wbGFjZVNoaXAoMywgXCJwbGF5ZXJCb2FyZFwiLCBwbGF5ZXJCb2FyZE9iaik7XG4gIGRvbVBvcHVsYXRlQm9hcmQocGxheWVyQm9hcmRPYmosIFwiI3BsYXllckJvYXJkXCIsIHRydWUpO1xuXG4gIGNvbXB1dGVyLnBsYWNlU2hpcChjb21wdXRlckJvYXJkT2JqLCA0KTtcbiAgLy9jb25zb2xlLmxvZyhjb21wdXRlckJvYXJkT2JqLmZsZWV0KTtcbiAgY29uc29sZS5sb2coXCJwbGFjZSB5b3VyIDQgc2hpcFwiKTtcbiAgYXdhaXQgcGxheWVyLnBsYWNlU2hpcCg0LCBcInBsYXllckJvYXJkXCIsIHBsYXllckJvYXJkT2JqKTtcbiAgZG9tUG9wdWxhdGVCb2FyZChwbGF5ZXJCb2FyZE9iaiwgXCIjcGxheWVyQm9hcmRcIiwgdHJ1ZSk7XG5cbiAgY29tcHV0ZXIucGxhY2VTaGlwKGNvbXB1dGVyQm9hcmRPYmosIDUpO1xuICAvL2NvbnNvbGUubG9nKGNvbXB1dGVyQm9hcmRPYmouZmxlZXQpO1xuICBjb25zb2xlLmxvZyhcInBsYWNlIHlvdXIgNSBzaGlwXCIpO1xuICBhd2FpdCBwbGF5ZXIucGxhY2VTaGlwKDUsIFwicGxheWVyQm9hcmRcIiwgcGxheWVyQm9hcmRPYmopO1xuICBkb21Qb3B1bGF0ZUJvYXJkKHBsYXllckJvYXJkT2JqLCBcIiNwbGF5ZXJCb2FyZFwiLCB0cnVlKTtcblxuICAvLzMtICBXZeKAmWxsIGxlYXZlIHRoZSBIVE1MIGltcGxlbWVudGF0aW9uIHVwIHRvIHlvdSBmb3Igbm93LCBidXQgeW91IHNob3VsZCBkaXNwbGF5IGJvdGggdGhlIHBsYXllcuKAmXMgYm9hcmRzIGFuZCByZW5kZXIgdGhlbSB1c2luZyBpbmZvcm1hdGlvbiBmcm9tIHRoZSBHYW1lYm9hcmQgY2xhc3MuXG5cbiAgLyogZG9tUG9wdWxhdGVCb2FyZChwbGF5ZXJCb2FyZE9iaiwgXCIjcGxheWVyQm9hcmRcIik7XG4gIGRvbVBvcHVsYXRlQm9hcmQoY29tcHV0ZXJCb2FyZE9iaiwgXCIjY29tcHV0ZXJCb2FyZFwiLCBmYWxzZSk7ICovXG5cbiAgLy8gLTMtMSBZb3UgbmVlZCBtZXRob2RzIHRvIHJlbmRlciB0aGUgZ2FtZWJvYXJkcyAvZG9uZS8gYW5kIHRvIHRha2UgdXNlciBpbnB1dCBmb3IgYXR0YWNraW5nL2RvbmUvLiBGb3IgYXR0YWNrcywgbGV0IHRoZSB1c2VyIGNsaWNrIG9uIGEgY29vcmRpbmF0ZSBpbiB0aGUgZW5lbXkgR2FtZWJvYXJkLlxuICAvLy00IFRoZSBnYW1lIGxvb3Agc2hvdWxkIHN0ZXAgdGhyb3VnaCB0aGUgZ2FtZSB0dXJuIGJ5IHR1cm4gdXNpbmcgb25seSBtZXRob2RzIGZyb20gb3RoZXIgb2JqZWN0cy4gSWYgYXQgYW55IHBvaW50IHlvdSBhcmUgdGVtcHRlZCB0byB3cml0ZSBhIG5ldyBmdW5jdGlvbiBpbnNpZGUgdGhlIGdhbWUgbG9vcCwgc3RlcCBiYWNrIGFuZCBmaWd1cmUgb3V0IHdoaWNoIGNsYXNzIG9yIG1vZHVsZSB0aGF0IGZ1bmN0aW9uIHNob3VsZCBiZWxvbmcgdG8uXG5cbiAgZm9yIChcbiAgICBsZXQgdHVybiA9IDE7XG4gICAgLy9DcmVhdGUgY29uZGl0aW9ucyBzbyB0aGF0IHRoZSBnYW1lIGVuZHMgb25jZSBvbmUgcGxheWVycyBzaGlwcyBoYXZlIGFsbCBiZWVuIHN1bmsuIFRoaXMgZnVuY3Rpb24gaXMgYXBwcm9wcmlhdGUgZm9yIHRoZSBHYW1lIG1vZHVsZS5cbiAgICBjb21wdXRlckJvYXJkT2JqLmlzR2FtZU92ZXIoKSA9PT0gZmFsc2UgJiZcbiAgICBwbGF5ZXJCb2FyZE9iai5pc0dhbWVPdmVyKCkgPT09IGZhbHNlO1xuICAgIHR1cm4rK1xuICApIHtcbiAgICBjb25zb2xlLmxvZyhcImF3YWl0aW5nIHBsYXllciBhdHRhY2tcIik7XG5cbiAgICBhd2FpdCBwbGF5ZXIuYXR0YWNrKGNvbXB1dGVyQm9hcmRPYmopO1xuICAgIGRvbVBvcHVsYXRlQm9hcmQoY29tcHV0ZXJCb2FyZE9iaiwgXCIjY29tcHV0ZXJCb2FyZFwiLCBmYWxzZSk7XG5cbiAgICBjb25zb2xlLmxvZyhcImNvbXB1dGVyQXR0YWNrTkV4dFwiKTtcblxuICAgIGNvbXB1dGVyLmF0dGFjayhwbGF5ZXJCb2FyZE9iaik7XG4gICAgZG9tUG9wdWxhdGVCb2FyZChwbGF5ZXJCb2FyZE9iaiwgXCIjcGxheWVyQm9hcmRcIik7XG4gIH1cblxuICBhbGVydChcImdhbWUgb3ZlclwiKTtcbn1cblxuZXhwb3J0IHsgZ2FtZUxvb3AgfTtcbiIsImltcG9ydCBzaGlwRmFjdG9yeSBmcm9tIFwiLi9zaGlwRmFjdG9yeVwiO1xuXG5mdW5jdGlvbiBnYW1lYm9hcmRGYWN0b3J5KCkge1xuICBsZXQgYm9hcmQgPSBbW10sIFtdLCBbXSwgW10sIFtdLCBbXSwgW10sIFtdLCBbXSwgW11dO1xuICBsZXQgZmxlZXQgPSB7fTtcblxuICBjb25zdCBwbGFjZVNoaXAgPSBmdW5jdGlvbiAobGVuZ3RoLCB4LCB5KSB7XG4gICAgbGV0IGN1cnJlbnRTaGlwO1xuICAgIHN3aXRjaCAobGVuZ3RoKSB7XG4gICAgICBjYXNlIDU6XG4gICAgICAgIHtcbiAgICAgICAgICBmbGVldC5jYXJyaWVyID0gc2hpcEZhY3RvcnkobGVuZ3RoKTtcbiAgICAgICAgICBjdXJyZW50U2hpcCA9IFwiY2FycmllclwiO1xuICAgICAgICB9XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSA0OlxuICAgICAgICB7XG4gICAgICAgICAgZmxlZXQuYmF0dGxlc2hpcCA9IHNoaXBGYWN0b3J5KGxlbmd0aCk7XG4gICAgICAgICAgY3VycmVudFNoaXAgPSBcImJhdHRsZXNoaXBcIjtcbiAgICAgICAgfVxuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgMzpcbiAgICAgICAge1xuICAgICAgICAgIGZsZWV0LmRlc3Ryb3llciA9IHNoaXBGYWN0b3J5KGxlbmd0aCk7XG4gICAgICAgICAgY3VycmVudFNoaXAgPSBcImRlc3Ryb3llclwiO1xuICAgICAgICB9XG4gICAgICAgIC8vZmxlZXQuc3VibWFyaW5lID0gc2hpcEZhY3RvcnkobGVuZ3RoKTtcbiAgICAgICAgYnJlYWs7XG5cbiAgICAgIGNhc2UgMjpcbiAgICAgICAge1xuICAgICAgICAgIGZsZWV0LnBhdHJvbEJvYXQgPSBzaGlwRmFjdG9yeShsZW5ndGgpO1xuICAgICAgICAgIGN1cnJlbnRTaGlwID0gXCJwYXRyb2xCb2F0XCI7XG4gICAgICAgIH1cblxuICAgICAgICBicmVhaztcbiAgICB9XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgICBib2FyZFt5XVsreCArIGldID0ge1xuICAgICAgICBkZXN0cm95ZWQ6IGZhbHNlLFxuXG4gICAgICAgIGhpdDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgIGZsZWV0W2N1cnJlbnRTaGlwXS5oaXQoKTtcbiAgICAgICAgICB0aGlzLmRlc3Ryb3llZCA9IHRydWU7XG4gICAgICAgIH0sXG4gICAgICB9O1xuICAgIH1cbiAgICBjb25zb2xlLmxvZyhmbGVldCk7XG4gIH07XG5cbiAgY29uc3QgcGxhY2VTaGlwVmVydGljYWxseSA9IGZ1bmN0aW9uIChsZW5ndGgsIHgsIHkpIHtcbiAgICBsZXQgY3VycmVudFNoaXA7XG4gICAgc3dpdGNoIChsZW5ndGgpIHtcbiAgICAgIGNhc2UgNTpcbiAgICAgICAge1xuICAgICAgICAgIGZsZWV0LmNhcnJpZXIgPSBzaGlwRmFjdG9yeShsZW5ndGgpO1xuICAgICAgICAgIGN1cnJlbnRTaGlwID0gXCJjYXJyaWVyXCI7XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIDQ6XG4gICAgICAgIHtcbiAgICAgICAgICBmbGVldC5iYXR0bGVzaGlwID0gc2hpcEZhY3RvcnkobGVuZ3RoKTtcbiAgICAgICAgICBjdXJyZW50U2hpcCA9IFwiYmF0dGxlc2hpcFwiO1xuICAgICAgICB9XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAzOlxuICAgICAgICB7XG4gICAgICAgICAgZmxlZXQuZGVzdHJveWVyID0gc2hpcEZhY3RvcnkobGVuZ3RoKTtcbiAgICAgICAgICBjdXJyZW50U2hpcCA9IFwiZGVzdHJveWVyXCI7XG4gICAgICAgIH1cbiAgICAgICAgLy9mbGVldC5zdWJtYXJpbmUgPSBzaGlwRmFjdG9yeShsZW5ndGgpO1xuICAgICAgICBicmVhaztcblxuICAgICAgY2FzZSAyOlxuICAgICAgICB7XG4gICAgICAgICAgZmxlZXQucGF0cm9sQm9hdCA9IHNoaXBGYWN0b3J5KGxlbmd0aCk7XG4gICAgICAgICAgY3VycmVudFNoaXAgPSBcInBhdHJvbEJvYXRcIjtcbiAgICAgICAgfVxuXG4gICAgICAgIGJyZWFrO1xuICAgIH1cblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICAgIGJvYXJkWyt5ICsgaV1beF0gPSB7XG4gICAgICAgIGRlc3Ryb3llZDogZmFsc2UsXG5cbiAgICAgICAgaGl0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgZmxlZXRbY3VycmVudFNoaXBdLmhpdCgpO1xuICAgICAgICAgIHRoaXMuZGVzdHJveWVkID0gdHJ1ZTtcbiAgICAgICAgfSxcbiAgICAgIH07XG4gICAgfVxuICAgIGNvbnNvbGUubG9nKGZsZWV0KTtcbiAgfTtcblxuICBjb25zdCByZWNpdmVBdHRhY2sgPSAoeCwgeSkgPT4ge1xuICAgIGlmICh0eXBlb2YgYm9hcmRbeV1beF0gPT09IFwib2JqZWN0XCIpIHtcbiAgICAgIGlmIChib2FyZFt5XVt4XS5kZXN0cm95ZWQgPT09IGZhbHNlKSB7XG4gICAgICAgIGJvYXJkW3ldW3hdLmhpdCgpO1xuICAgICAgICByZXR1cm4gXCJoaXRcIjtcbiAgICAgIH0gZWxzZSBpZiAoYm9hcmRbeV1beF0uZGVzdHJveWVkID09PSB0cnVlKSB7XG4gICAgICAgIHJldHVybiBcInJlcGV0aWRvXCI7XG4gICAgICB9XG4gICAgfSBlbHNlIGlmIChib2FyZFt5XVt4XSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICBib2FyZFt5XVt4XSA9IFwibWlzc2VkXCI7XG5cbiAgICAgIHJldHVybiBcIm1pc3NlZFwiO1xuICAgIH0gZWxzZSBpZiAoYm9hcmRbeV1beF0gPT09IFwibWlzc2VkXCIpIHtcbiAgICAgIHJldHVybiBcInJlcGV0aWRvXCI7XG4gICAgfVxuICB9O1xuXG4gIGNvbnN0IGF0dGFja1Jlc3VsdE9ubHkgPSAoeCwgeSkgPT4ge1xuICAgIGlmICh0eXBlb2YgYm9hcmRbeV1beF0gPT09IFwib2JqZWN0XCIpIHtcbiAgICAgIGlmIChib2FyZFt5XVt4XS5kZXN0cm95ZWQgPT09IGZhbHNlKSB7XG4gICAgICAgIHJldHVybiBcImhpdFwiO1xuICAgICAgfSBlbHNlIGlmIChib2FyZFt5XVt4XS5kZXN0cm95ZWQgPT09IHRydWUpIHtcbiAgICAgICAgcmV0dXJuIFwicmVwZXRpZG9cIjtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKGJvYXJkW3ldW3hdID09PSB1bmRlZmluZWQpIHtcbiAgICAgIHJldHVybiBcIm1pc3NlZFwiO1xuICAgIH0gZWxzZSBpZiAoYm9hcmRbeV1beF0gPT09IFwibWlzc2VkXCIpIHtcbiAgICAgIHJldHVybiBcInJlcGV0aWRvXCI7XG4gICAgfVxuICB9O1xuICAvL2ZvciBwbGFjaW5nXG4gIGNvbnN0IHdpbGxGb2xsb3dSdWxlcyA9IGZ1bmN0aW9uIChsZW5ndGgsIHgsIHkpIHtcbiAgICBjb25zdCB3aWxsT3ZlcmxhcCA9IGZ1bmN0aW9uIChsZW5ndGgsIHgsIHkpIHtcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICAgICAgaWYgKHR5cGVvZiBib2FyZFt5XVsreCArIGldID09PSBcIm9iamVjdFwiKSB7XG4gICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9O1xuXG4gICAgY29uc3Qgd2lsbE92ZXJmbG93ID0gZnVuY3Rpb24gKGxlbmd0aCwgeCkge1xuICAgICAgaWYgKGxlbmd0aCArICt4ID4gMTApIHtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9IGVsc2UgcmV0dXJuIGZhbHNlO1xuICAgIH07XG4gICAgaWYgKCF3aWxsT3ZlcmxhcChsZW5ndGgsIHgsIHkpICYmICF3aWxsT3ZlcmZsb3cobGVuZ3RoLCB4KSkge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH07XG5cbiAgLy9mb3IgcGxhY2luZ1xuICBjb25zdCB3aWxsRm9sbG93UnVsZXNWZXJ0aWNhbGx5ID0gZnVuY3Rpb24gKGxlbmd0aCwgeCwgeSkge1xuICAgIGNvbnN0IHdpbGxPdmVybGFwID0gZnVuY3Rpb24gKGxlbmd0aCwgeCwgeSkge1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgICAgICBpZiAodHlwZW9mIGJvYXJkWyt5ICsgaV1beF0gPT09IFwib2JqZWN0XCIpIHtcbiAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH07XG5cbiAgICBjb25zdCB3aWxsT3ZlcmZsb3cgPSBmdW5jdGlvbiAobGVuZ3RoLCB5KSB7XG4gICAgICBjb25zb2xlLmxvZyhsZW5ndGggKyAreSA+IDEwKTtcbiAgICAgIGlmIChsZW5ndGggKyAreSA+IDEwKSB7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfSBlbHNlIHJldHVybiBmYWxzZTtcbiAgICB9O1xuICAgIGlmICghd2lsbE92ZXJmbG93KGxlbmd0aCwgeSkpIHtcbiAgICAgIGlmICghd2lsbE92ZXJsYXAobGVuZ3RoLCB4LCB5KSkge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICB9XG4gIH07XG5cbiAgY29uc3QgaXNHYW1lT3ZlciA9IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gKFxuICAgICAgdGhpcy5mbGVldC5jYXJyaWVyLmlzU3VuaygpICYmXG4gICAgICB0aGlzLmZsZWV0LnBhdHJvbEJvYXQuaXNTdW5rKCkgJiZcbiAgICAgIHRoaXMuZmxlZXQuZGVzdHJveWVyLmlzU3VuaygpICYmXG4gICAgICB0aGlzLmZsZWV0LmJhdHRsZXNoaXAuaXNTdW5rKClcbiAgICApO1xuICB9O1xuXG4gIHJldHVybiB7XG4gICAgYXR0YWNrUmVzdWx0T25seSxcbiAgICBib2FyZCxcbiAgICBmbGVldCxcbiAgICBwbGFjZVNoaXAsXG4gICAgcGxhY2VTaGlwVmVydGljYWxseSxcbiAgICB3aWxsRm9sbG93UnVsZXMsXG4gICAgcmVjaXZlQXR0YWNrLFxuICAgIGlzR2FtZU92ZXIsXG4gICAgd2lsbEZvbGxvd1J1bGVzVmVydGljYWxseSxcbiAgfTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgZ2FtZWJvYXJkRmFjdG9yeTtcbiIsImltcG9ydCB7IGFpIH0gZnJvbSBcIi4vYWlcIjtcblxubGV0IGNvbXB1dGVyID0ge1xuICBhaSxcblxuICBhdHRhY2s6IGZ1bmN0aW9uIChwbGF5ZXJCb2FyZE9iaikge1xuICAgIGlmICh0aGlzLmFpLmNoYXNlTW9kZS5zdGF0ZSA9PT0gdHJ1ZSkge1xuICAgICAgLy9hbGVydChcImFpIGlzIHdvcmtpbmdcIik7XG5cbiAgICAgIC8vdGhpcy5haS5yZW1vdmVJbnZhbGlkRGlyZWN0aW9ucyhwbGF5ZXJCb2FyZE9iaik7XG4gICAgICB0aGlzLmFpLmFkZFZhbGlkRGlyZWN0aW9ucyhwbGF5ZXJCb2FyZE9iaik7XG4gICAgICB0aGlzLmFpLmF0dGFjayhwbGF5ZXJCb2FyZE9iaik7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IHggPSB0aGlzLnJhbmRvbUludEZyb21JbnRlcnZhbCgwLCA5KTtcbiAgICAgIGNvbnN0IHkgPSB0aGlzLnJhbmRvbUludEZyb21JbnRlcnZhbCgwLCA5KTtcblxuICAgICAgc3dpdGNoIChwbGF5ZXJCb2FyZE9iai5yZWNpdmVBdHRhY2soeCwgeSkpIHtcbiAgICAgICAgY2FzZSBcImhpdFwiOlxuICAgICAgICAgIHtcbiAgICAgICAgICAgIHRoaXMuYWkuY2hhc2VNb2RlLnN0YXRlID0gdHJ1ZTtcbiAgICAgICAgICAgIHRoaXMuYWkuY2hhc2VNb2RlLmNoYXNlU3ViamVjdC54ID0geDtcbiAgICAgICAgICAgIHRoaXMuYWkuY2hhc2VNb2RlLmNoYXNlU3ViamVjdC55ID0geTtcbiAgICAgICAgICB9XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgXCJtaXNzZWRcIjpcbiAgICAgICAgICB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcImNvbXB1dGVyIG1pc3NlZFwiKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgXCJyZXBldGlkb1wiOlxuICAgICAgICAgIHtcbiAgICAgICAgICAgIGNvbXB1dGVyLmF0dGFjayhwbGF5ZXJCb2FyZE9iaik7XG4gICAgICAgICAgfVxuICAgICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH1cbiAgfSxcbiAgcGxhY2VTaGlwOiBmdW5jdGlvbiAoY29tcHV0ZXJCb2FyZE9iaiwgbGVuZ3RoKSB7XG4gICAgaWYgKHRoaXMucmFuZG9tSW50RnJvbUludGVydmFsKDAsIDEpID09PSAwKSB7XG4gICAgICAvL3BsYWNlc2hpcCBob3Jpem9udGFsbHlcbiAgICAgIGNvbnN0IHggPSB0aGlzLnJhbmRvbUludEZyb21JbnRlcnZhbCgwLCA5KTtcbiAgICAgIGNvbnN0IHkgPSB0aGlzLnJhbmRvbUludEZyb21JbnRlcnZhbCgwLCA5KTtcbiAgICAgIGlmIChjb21wdXRlckJvYXJkT2JqLndpbGxGb2xsb3dSdWxlcyhsZW5ndGgsIHgsIHkpKSB7XG4gICAgICAgIGNvbXB1dGVyQm9hcmRPYmoucGxhY2VTaGlwKGxlbmd0aCwgeCwgeSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLnBsYWNlU2hpcChjb21wdXRlckJvYXJkT2JqLCBsZW5ndGgpO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICAvL3BsYWNlc2hpcCB2ZXJ0aWNhbGx5XG4gICAgICBjb25zdCB4ID0gdGhpcy5yYW5kb21JbnRGcm9tSW50ZXJ2YWwoMCwgOSk7XG4gICAgICBjb25zdCB5ID0gdGhpcy5yYW5kb21JbnRGcm9tSW50ZXJ2YWwoMCwgOSk7XG4gICAgICBpZiAoY29tcHV0ZXJCb2FyZE9iai53aWxsRm9sbG93UnVsZXNWZXJ0aWNhbGx5KGxlbmd0aCwgeCwgeSkpIHtcbiAgICAgICAgY29tcHV0ZXJCb2FyZE9iai5wbGFjZVNoaXBWZXJ0aWNhbGx5KGxlbmd0aCwgeCwgeSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLnBsYWNlU2hpcChjb21wdXRlckJvYXJkT2JqLCBsZW5ndGgpO1xuICAgICAgfVxuICAgIH1cbiAgfSxcbiAgcmFuZG9tSW50RnJvbUludGVydmFsOiBmdW5jdGlvbiAobWluLCBtYXgpIHtcbiAgICAvLyBtaW4gYW5kIG1heCBpbmNsdWRlZFxuXG4gICAgcmV0dXJuIE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIChtYXggLSBtaW4gKyAxKSArIG1pbik7XG4gIH0sXG59O1xuXG5sZXQgcGxheWVyID0ge1xuICBhdHRhY2s6IGZ1bmN0aW9uIChjb21wdXRlckJvYXJkT2JqKSB7XG4gICAgY29uc29sZS5sb2coXCJwbGF5ZXJBdHRhY2sgZnVuY3Rpb25cIik7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIGFzZChyZXNvbHZlKSB7XG4gICAgICBjb25zdCBjb21wdXRlckJvYXJkID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJjb21wdXRlckJvYXJkXCIpO1xuICAgICAgY29tcHV0ZXJCb2FyZC5hZGRFdmVudExpc3RlbmVyKFxuICAgICAgICBcImNsaWNrXCIsXG4gICAgICAgIChlKSA9PiB7XG4gICAgICAgICAgaWYgKFxuICAgICAgICAgICAgZS50YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKFwiYm9hcmRcIikgfHxcbiAgICAgICAgICAgIGUudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucyhcInJvd1wiKVxuICAgICAgICAgICkge1xuICAgICAgICAgICAgYXNkKHJlc29sdmUpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBsZXQgeCA9IGUudGFyZ2V0LmRhdGFzZXQueDtcbiAgICAgICAgICAgIGxldCB5ID0gZS50YXJnZXQucGFyZW50RWxlbWVudC5kYXRhc2V0Lnk7XG5cbiAgICAgICAgICAgIHN3aXRjaCAoY29tcHV0ZXJCb2FyZE9iai5yZWNpdmVBdHRhY2soeCwgeSkpIHtcbiAgICAgICAgICAgICAgY2FzZSBcImhpdFwiOlxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgIHJlc29sdmUoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgIGNhc2UgXCJtaXNzZWRcIjpcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICByZXNvbHZlKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICBjYXNlIFwicmVwZXRpZG9cIjpcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcInJlcGV0aWRvIGludGVudGEgZGVudWV2b1wiKTtcbiAgICAgICAgICAgICAgICAgIGFzZChyZXNvbHZlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9LFxuXG4gICAgICAgIHsgb25jZTogdHJ1ZSB9XG4gICAgICApO1xuICAgIH0pO1xuICB9LFxuICBwbGFjZVNoaXA6IGZ1bmN0aW9uIChsZW5ndGgsIHBsYXllckJvYXJkSWQsIHBsYXllckJvYXJkT2JqKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIGFzZChyZXNvbHZlKSB7XG4gICAgICBjb25zdCBwbGF5ZXJCb2FyZCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHBsYXllckJvYXJkSWQpO1xuICAgICAgcGxheWVyQm9hcmQuYWRkRXZlbnRMaXN0ZW5lcihcbiAgICAgICAgXCJjbGlja1wiLFxuICAgICAgICAoZSkgPT4ge1xuICAgICAgICAgIGlmIChcbiAgICAgICAgICAgIGUudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucyhcImJvYXJkXCIpIHx8XG4gICAgICAgICAgICBlLnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoXCJyb3dcIilcbiAgICAgICAgICApIHtcbiAgICAgICAgICAgIGFzZChyZXNvbHZlKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgbGV0IHggPSBlLnRhcmdldC5kYXRhc2V0Lng7XG5cbiAgICAgICAgICAgIGxldCB5ID0gZS50YXJnZXQucGFyZW50RWxlbWVudC5kYXRhc2V0Lnk7XG5cbiAgICAgICAgICAgIGNvbnN0IGF4aXNCdXR0b24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImF4aXMtc2VsZWN0b3JcIik7XG4gICAgICAgICAgICBpZiAoYXhpc0J1dHRvbi5kYXRhc2V0LmRpcmVjdGlvbiA9PT0gXCJob3Jpem9udGFsXCIpIHtcbiAgICAgICAgICAgICAgaWYgKHBsYXllckJvYXJkT2JqLndpbGxGb2xsb3dSdWxlcyhsZW5ndGgsIHgsIHkpKSB7XG4gICAgICAgICAgICAgICAgcGxheWVyQm9hcmRPYmoucGxhY2VTaGlwKGxlbmd0aCwgeCwgeSk7XG5cbiAgICAgICAgICAgICAgICByZXNvbHZlKCk7XG4gICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgYXNkKHJlc29sdmUpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2UgaWYgKGF4aXNCdXR0b24uZGF0YXNldC5kaXJlY3Rpb24gPT09IFwidmVydGljYWxcIikge1xuICAgICAgICAgICAgICBpZiAocGxheWVyQm9hcmRPYmoud2lsbEZvbGxvd1J1bGVzVmVydGljYWxseShsZW5ndGgsIHgsIHkpKSB7XG4gICAgICAgICAgICAgICAgcGxheWVyQm9hcmRPYmoucGxhY2VTaGlwVmVydGljYWxseShsZW5ndGgsIHgsIHkpO1xuXG4gICAgICAgICAgICAgICAgcmVzb2x2ZSgpO1xuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGFzZChyZXNvbHZlKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfSxcblxuICAgICAgICB7IG9uY2U6IHRydWUgfVxuICAgICAgKTtcbiAgICB9KTtcbiAgfSxcbn07XG5cbmV4cG9ydCB7IHBsYXllciwgY29tcHV0ZXIgfTtcbiIsImNvbnN0IHNoaXBGYWN0b3J5ID0gKGxlbmd0aCkgPT4ge1xuICBsZXQgaGl0cyA9IDA7XG4gIGNvbnN0IGlzU3VuayA9IGZ1bmN0aW9uICgpIHtcbiAgICAvL2NvbnNvbGUubG9nKGB0aGlzLmxlbmd0aCBpczoke3RoaXMubGVuZ3RofWApO1xuICAgIHJldHVybiB0aGlzLmxlbmd0aCAtIHRoaXMuaGl0cyA9PSAwO1xuICB9O1xuICBjb25zdCBoaXQgPSBmdW5jdGlvbiAoKSB7XG4gICAgdGhpcy5oaXRzKys7XG4gIH07XG5cbiAgcmV0dXJuIHsgbGVuZ3RoLCBoaXRzLCBpc1N1bmssIGhpdCB9O1xufTtcblxuZXhwb3J0IGRlZmF1bHQgc2hpcEZhY3Rvcnk7XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCBnYW1lYm9hcmRGYWN0b3J5IGZyb20gXCIuL2dhbWVib2FyZEZhY3RvcnlcIjtcbmltcG9ydCBzaGlwRmFjdG9yeSBmcm9tIFwiLi9zaGlwRmFjdG9yeVwiO1xuaW1wb3J0IHsgZG9tUmVuZGVyQm9hcmQsIGRvbVBvcHVsYXRlQm9hcmQsIGF4aXNCdXR0b24gfSBmcm9tIFwiLi9kb21JbnRlcmFjdGlvblwiO1xuaW1wb3J0IHsgZ2FtZUxvb3AgfSBmcm9tIFwiLi9nYW1lTG9vcFwiO1xuXG5heGlzQnV0dG9uKCk7XG5nYW1lTG9vcCgpO1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9