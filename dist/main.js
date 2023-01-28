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
  removeInvalidDirections: function (playerBoardObj) {
    alert(
      `valid moves before 2nd filter : ${this.chaseMode.validMoves} with axis on ${this.chaseMode.chaseSubject.x},${this.chaseMode.chaseSubject.y}`
    );
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
    this.chaseMode.validMoves.forEach((move) => {
      switch (move) {
        case "left":
          {
            console.log(
              `left move is : ${playerBoardObj.willFollowRulesForAttacking(
                this.chaseMode.chaseSubject.x - 1,
                this.chaseMode.chaseSubject.y
              )}`
            );
            if (
              playerBoardObj.willFollowRulesForAttacking(
                this.chaseMode.chaseSubject.x - 1,
                this.chaseMode.chaseSubject.y
              ) === "repetido"
            ) {
              const index = this.chaseMode.validMoves.indexOf("left");

              this.chaseMode.validMoves.splice(index, 1);
            }
          }
          break;
        case "right":
          {
            console.log(
              `right move is : ${playerBoardObj.willFollowRulesForAttacking(
                this.chaseMode.chaseSubject.x + 1,
                this.chaseMode.chaseSubject.y
              )}`
            );
            if (
              playerBoardObj.willFollowRulesForAttacking(
                this.chaseMode.chaseSubject.x + 1,
                this.chaseMode.chaseSubject.y
              ) === "repetido"
            ) {
              const index = this.chaseMode.validMoves.indexOf("right");

              this.chaseMode.validMoves.splice(index, 1);
            }
          }
          break;
        case "top":
          {
            console.log(
              `top move is : ${playerBoardObj.willFollowRulesForAttacking(
                this.chaseMode.chaseSubject.x,
                this.chaseMode.chaseSubject.y - 1
              )}`
            );
            if (
              playerBoardObj.willFollowRulesForAttacking(
                this.chaseMode.chaseSubject.x,
                this.chaseMode.chaseSubject.y - 1
              ) === "repetido"
            ) {
              const index = this.chaseMode.validMoves.indexOf("top");

              this.chaseMode.validMoves.splice(index, 1);
            }
          }
          break;
        case "bottom":
          {
            console.log(
              `bottom move is : ${playerBoardObj.willFollowRulesForAttacking(
                this.chaseMode.chaseSubject.x,
                this.chaseMode.chaseSubject.y + 1
              )}`
            );
            if (
              playerBoardObj.willFollowRulesForAttacking(
                this.chaseMode.chaseSubject.x,
                this.chaseMode.chaseSubject.y + 1
              ) === "repetido"
            ) {
              const index = this.chaseMode.validMoves.indexOf("bottom");

              this.chaseMode.validMoves.splice(index, 1);
            }
          }
          break;
      }
    });
    alert(
      `valid moves after 2nd filter : ${this.chaseMode.validMoves}  with axis on ${this.chaseMode.chaseSubject.x},${this.chaseMode.chaseSubject.y}`
    );
    console.log(playerBoardObj.board);
  },
  //pick a direction
  //this will return a direction
  // if it has 2 consecutive hits{
  // keep in the succesfull direction
  //if posible
  //if not, return the first viable direction}
  //else{return a random direction}
  direction: function () {
    if (this.chaseMode.followDirection) {
      console.log(`followDIrection is :${this.chaseMode.followDirection}`);
      if (this.chaseMode.validMoves.includes(this.chaseMode.followDirection)) {
        console.log(`the follow direction is valid`);
        return this.chaseMode.followDirection;
      } else {
        console.log("first valid direction");
        return this.chaseMode.validMoves[0];
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
    } else {
      this.chaseMode.originalValidMoves = this.chaseMode.validMoves; //this is for reverse mode later
      const directionIndex = _players__WEBPACK_IMPORTED_MODULE_0__.computer.randomIntFromInterval(
        0,
        this.chaseMode.validMoves.length - 1
      );
      const direction = this.chaseMode.validMoves[directionIndex];
      alert(`randomly selected direction : ${direction}`);
      return direction;
    }
  },
  //transform direction into coordinate
  //this will return a coordinate
  // {x,y}
  coordinates: function (direction) {
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
  let missedShoots = [];

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
    console.log("reciveAttackMethod");
    if (typeof board[y][x] === "object") {
      if (board[y][x].destroyed === false) {
        board[y][x].hit();
        return "hit";
      } else if (board[y][x].destroyed === true) {
        return "repetido";
      }
    } else if (board[y][x] === undefined) {
      board[y][x] = "missed";
      console.log("missed");
      return "missed";
    } else if (board[y][x] === "missed") {
      return "repetido";
    }
  };

  const willFollowRulesForAttacking = (x, y) => {
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
    console.log(this.fleet);
    return (
      this.fleet.carrier.isSunk() &&
      this.fleet.patrolBoat.isSunk() &&
      this.fleet.destroyer.isSunk() &&
      this.fleet.battleship.isSunk()
    );
  };

  return {
    willFollowRulesForAttacking,
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

      this.ai.removeInvalidDirections(playerBoardObj);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFDQSxZQUFZO0FBQ1o7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxnQkFBZ0I7QUFDaEI7QUFDQTtBQUNBLGNBQWM7QUFDZDtBQUNBOztBQUVBO0FBQ0EsZ0JBQWdCO0FBQ2hCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUzs7QUFFVCxVQUFVO0FBQ1Y7QUFDQSxLQUFLO0FBQ0wsR0FBRztBQUNIOztBQUU0Qjs7Ozs7Ozs7Ozs7Ozs7O0FDcko1QjtBQUNBO0FBQ0E7QUFDQSxvQ0FBb0MsWUFBWTtBQUNoRDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLFdBQVc7QUFDWDs7QUFFQSxpRUFBZSxXQUFXLEVBQUM7Ozs7Ozs7VUNiM0I7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7Ozs7Ozs7Ozs7OztBQ05rRDtBQUNWO0FBQ3dDO0FBQzFDOztBQUV0QywyREFBVTtBQUNWLG1EQUFRIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vcHJvamVjdC1iYXR0bGVzaGlwLy4vc3JjL2FpLmpzIiwid2VicGFjazovL3Byb2plY3QtYmF0dGxlc2hpcC8uL3NyYy9kb21JbnRlcmFjdGlvbi5qcyIsIndlYnBhY2s6Ly9wcm9qZWN0LWJhdHRsZXNoaXAvLi9zcmMvZ2FtZUxvb3AuanMiLCJ3ZWJwYWNrOi8vcHJvamVjdC1iYXR0bGVzaGlwLy4vc3JjL2dhbWVib2FyZEZhY3RvcnkuanMiLCJ3ZWJwYWNrOi8vcHJvamVjdC1iYXR0bGVzaGlwLy4vc3JjL3BsYXllcnMuanMiLCJ3ZWJwYWNrOi8vcHJvamVjdC1iYXR0bGVzaGlwLy4vc3JjL3NoaXBGYWN0b3J5LmpzIiwid2VicGFjazovL3Byb2plY3QtYmF0dGxlc2hpcC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9wcm9qZWN0LWJhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL3Byb2plY3QtYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3Byb2plY3QtYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3Byb2plY3QtYmF0dGxlc2hpcC8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBjb21wdXRlciB9IGZyb20gXCIuL3BsYXllcnNcIjtcblxuY29uc3QgYWkgPSB7XG4gIGNoYXNlTW9kZToge1xuICAgIGlzUmV2ZXJzZWQ6IGZhbHNlLFxuICAgIHN0YXRlOiBmYWxzZSxcbiAgICBjaGFzZVN1YmplY3Q6IHsgeDogdW5kZWZpbmVkLCB5OiB1bmRlZmluZWQgfSwgLy94LHlcblxuICAgIHZhbGlkTW92ZXM6IFtcImxlZnRcIiwgXCJyaWdodFwiLCBcInRvcFwiLCBcImJvdHRvbVwiXSxcbiAgICBmb2xsb3dEaXJlY3Rpb246IHVuZGVmaW5lZCxcbiAgICBmaXJzdENoYXNlU3ViamVjdDoge30sIC8vZm9yIHJldmVyc2VkXG4gICAgb3JpZ2luYWxWYWxpZE1vdmVzOiBbXSwgLy9mb3IgcmV2ZXJzZWRcbiAgICBpc0NoYXNpbmc6IGZhbHNlLFxuICB9LFxuICAvL3RoaXMgd2lsbCBtb2RpZnkgdGhlIGFycmF5IHZhbGlkTW92ZXNcbiAgcmVtb3ZlSW52YWxpZERpcmVjdGlvbnM6IGZ1bmN0aW9uIChwbGF5ZXJCb2FyZE9iaikge1xuICAgIGFsZXJ0KFxuICAgICAgYHZhbGlkIG1vdmVzIGJlZm9yZSAybmQgZmlsdGVyIDogJHt0aGlzLmNoYXNlTW9kZS52YWxpZE1vdmVzfSB3aXRoIGF4aXMgb24gJHt0aGlzLmNoYXNlTW9kZS5jaGFzZVN1YmplY3QueH0sJHt0aGlzLmNoYXNlTW9kZS5jaGFzZVN1YmplY3QueX1gXG4gICAgKTtcbiAgICAvL3JlbW92ZSBkaXJlY2N0aW9ucyB0aGF0IHdpbGwgYmUgb3V0c2lkZSB0aGUgYm9hcmRcbiAgICBzd2l0Y2ggKHRoaXMuY2hhc2VNb2RlLmNoYXNlU3ViamVjdC54KSB7XG4gICAgICBjYXNlIDA6XG4gICAgICAgIHtcbiAgICAgICAgICBjb25zdCBpbmRleCA9IHRoaXMuY2hhc2VNb2RlLnZhbGlkTW92ZXMuaW5kZXhPZihcImxlZnRcIik7XG5cbiAgICAgICAgICB0aGlzLmNoYXNlTW9kZS52YWxpZE1vdmVzLnNwbGljZShpbmRleCwgMSk7XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIDk6XG4gICAgICAgIHtcbiAgICAgICAgICBjb25zdCBpbmRleCA9IHRoaXMuY2hhc2VNb2RlLnZhbGlkTW92ZXMuaW5kZXhPZihcInJpZ2h0XCIpO1xuXG4gICAgICAgICAgdGhpcy5jaGFzZU1vZGUudmFsaWRNb3Zlcy5zcGxpY2UoaW5kZXgsIDEpO1xuICAgICAgICB9XG4gICAgICAgIGJyZWFrO1xuICAgIH1cbiAgICBzd2l0Y2ggKHRoaXMuY2hhc2VNb2RlLmNoYXNlU3ViamVjdC55KSB7XG4gICAgICBjYXNlIDA6XG4gICAgICAgIHtcbiAgICAgICAgICBjb25zdCBpbmRleCA9IHRoaXMuY2hhc2VNb2RlLnZhbGlkTW92ZXMuaW5kZXhPZihcInRvcFwiKTtcblxuICAgICAgICAgIHRoaXMuY2hhc2VNb2RlLnZhbGlkTW92ZXMuc3BsaWNlKGluZGV4LCAxKTtcbiAgICAgICAgfVxuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgOTpcbiAgICAgICAge1xuICAgICAgICAgIGNvbnN0IGluZGV4ID0gdGhpcy5jaGFzZU1vZGUudmFsaWRNb3Zlcy5pbmRleE9mKFwiYm90dG9tXCIpO1xuXG4gICAgICAgICAgdGhpcy5jaGFzZU1vZGUudmFsaWRNb3Zlcy5zcGxpY2UoaW5kZXgsIDEpO1xuICAgICAgICB9XG4gICAgICAgIGJyZWFrO1xuICAgIH1cbiAgICAvL3JlbW92ZSB0aGUgZGlyZWN0aW9ucyB0aGF0IHdpbGwgbm90IGZvbGxvdyBydWxlcyAhISFcbiAgICAvL29ubHkgaW4gY2hhc2VTdWJqZWN0XG4gICAgdGhpcy5jaGFzZU1vZGUudmFsaWRNb3Zlcy5mb3JFYWNoKChtb3ZlKSA9PiB7XG4gICAgICBzd2l0Y2ggKG1vdmUpIHtcbiAgICAgICAgY2FzZSBcImxlZnRcIjpcbiAgICAgICAgICB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcbiAgICAgICAgICAgICAgYGxlZnQgbW92ZSBpcyA6ICR7cGxheWVyQm9hcmRPYmoud2lsbEZvbGxvd1J1bGVzRm9yQXR0YWNraW5nKFxuICAgICAgICAgICAgICAgIHRoaXMuY2hhc2VNb2RlLmNoYXNlU3ViamVjdC54IC0gMSxcbiAgICAgICAgICAgICAgICB0aGlzLmNoYXNlTW9kZS5jaGFzZVN1YmplY3QueVxuICAgICAgICAgICAgICApfWBcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAgIHBsYXllckJvYXJkT2JqLndpbGxGb2xsb3dSdWxlc0ZvckF0dGFja2luZyhcbiAgICAgICAgICAgICAgICB0aGlzLmNoYXNlTW9kZS5jaGFzZVN1YmplY3QueCAtIDEsXG4gICAgICAgICAgICAgICAgdGhpcy5jaGFzZU1vZGUuY2hhc2VTdWJqZWN0LnlcbiAgICAgICAgICAgICAgKSA9PT0gXCJyZXBldGlkb1wiXG4gICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgY29uc3QgaW5kZXggPSB0aGlzLmNoYXNlTW9kZS52YWxpZE1vdmVzLmluZGV4T2YoXCJsZWZ0XCIpO1xuXG4gICAgICAgICAgICAgIHRoaXMuY2hhc2VNb2RlLnZhbGlkTW92ZXMuc3BsaWNlKGluZGV4LCAxKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgXCJyaWdodFwiOlxuICAgICAgICAgIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFxuICAgICAgICAgICAgICBgcmlnaHQgbW92ZSBpcyA6ICR7cGxheWVyQm9hcmRPYmoud2lsbEZvbGxvd1J1bGVzRm9yQXR0YWNraW5nKFxuICAgICAgICAgICAgICAgIHRoaXMuY2hhc2VNb2RlLmNoYXNlU3ViamVjdC54ICsgMSxcbiAgICAgICAgICAgICAgICB0aGlzLmNoYXNlTW9kZS5jaGFzZVN1YmplY3QueVxuICAgICAgICAgICAgICApfWBcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAgIHBsYXllckJvYXJkT2JqLndpbGxGb2xsb3dSdWxlc0ZvckF0dGFja2luZyhcbiAgICAgICAgICAgICAgICB0aGlzLmNoYXNlTW9kZS5jaGFzZVN1YmplY3QueCArIDEsXG4gICAgICAgICAgICAgICAgdGhpcy5jaGFzZU1vZGUuY2hhc2VTdWJqZWN0LnlcbiAgICAgICAgICAgICAgKSA9PT0gXCJyZXBldGlkb1wiXG4gICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgY29uc3QgaW5kZXggPSB0aGlzLmNoYXNlTW9kZS52YWxpZE1vdmVzLmluZGV4T2YoXCJyaWdodFwiKTtcblxuICAgICAgICAgICAgICB0aGlzLmNoYXNlTW9kZS52YWxpZE1vdmVzLnNwbGljZShpbmRleCwgMSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIFwidG9wXCI6XG4gICAgICAgICAge1xuICAgICAgICAgICAgY29uc29sZS5sb2coXG4gICAgICAgICAgICAgIGB0b3AgbW92ZSBpcyA6ICR7cGxheWVyQm9hcmRPYmoud2lsbEZvbGxvd1J1bGVzRm9yQXR0YWNraW5nKFxuICAgICAgICAgICAgICAgIHRoaXMuY2hhc2VNb2RlLmNoYXNlU3ViamVjdC54LFxuICAgICAgICAgICAgICAgIHRoaXMuY2hhc2VNb2RlLmNoYXNlU3ViamVjdC55IC0gMVxuICAgICAgICAgICAgICApfWBcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAgIHBsYXllckJvYXJkT2JqLndpbGxGb2xsb3dSdWxlc0ZvckF0dGFja2luZyhcbiAgICAgICAgICAgICAgICB0aGlzLmNoYXNlTW9kZS5jaGFzZVN1YmplY3QueCxcbiAgICAgICAgICAgICAgICB0aGlzLmNoYXNlTW9kZS5jaGFzZVN1YmplY3QueSAtIDFcbiAgICAgICAgICAgICAgKSA9PT0gXCJyZXBldGlkb1wiXG4gICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgY29uc3QgaW5kZXggPSB0aGlzLmNoYXNlTW9kZS52YWxpZE1vdmVzLmluZGV4T2YoXCJ0b3BcIik7XG5cbiAgICAgICAgICAgICAgdGhpcy5jaGFzZU1vZGUudmFsaWRNb3Zlcy5zcGxpY2UoaW5kZXgsIDEpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBcImJvdHRvbVwiOlxuICAgICAgICAgIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFxuICAgICAgICAgICAgICBgYm90dG9tIG1vdmUgaXMgOiAke3BsYXllckJvYXJkT2JqLndpbGxGb2xsb3dSdWxlc0ZvckF0dGFja2luZyhcbiAgICAgICAgICAgICAgICB0aGlzLmNoYXNlTW9kZS5jaGFzZVN1YmplY3QueCxcbiAgICAgICAgICAgICAgICB0aGlzLmNoYXNlTW9kZS5jaGFzZVN1YmplY3QueSArIDFcbiAgICAgICAgICAgICAgKX1gXG4gICAgICAgICAgICApO1xuICAgICAgICAgICAgaWYgKFxuICAgICAgICAgICAgICBwbGF5ZXJCb2FyZE9iai53aWxsRm9sbG93UnVsZXNGb3JBdHRhY2tpbmcoXG4gICAgICAgICAgICAgICAgdGhpcy5jaGFzZU1vZGUuY2hhc2VTdWJqZWN0LngsXG4gICAgICAgICAgICAgICAgdGhpcy5jaGFzZU1vZGUuY2hhc2VTdWJqZWN0LnkgKyAxXG4gICAgICAgICAgICAgICkgPT09IFwicmVwZXRpZG9cIlxuICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgIGNvbnN0IGluZGV4ID0gdGhpcy5jaGFzZU1vZGUudmFsaWRNb3Zlcy5pbmRleE9mKFwiYm90dG9tXCIpO1xuXG4gICAgICAgICAgICAgIHRoaXMuY2hhc2VNb2RlLnZhbGlkTW92ZXMuc3BsaWNlKGluZGV4LCAxKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfSk7XG4gICAgYWxlcnQoXG4gICAgICBgdmFsaWQgbW92ZXMgYWZ0ZXIgMm5kIGZpbHRlciA6ICR7dGhpcy5jaGFzZU1vZGUudmFsaWRNb3Zlc30gIHdpdGggYXhpcyBvbiAke3RoaXMuY2hhc2VNb2RlLmNoYXNlU3ViamVjdC54fSwke3RoaXMuY2hhc2VNb2RlLmNoYXNlU3ViamVjdC55fWBcbiAgICApO1xuICAgIGNvbnNvbGUubG9nKHBsYXllckJvYXJkT2JqLmJvYXJkKTtcbiAgfSxcbiAgLy9waWNrIGEgZGlyZWN0aW9uXG4gIC8vdGhpcyB3aWxsIHJldHVybiBhIGRpcmVjdGlvblxuICAvLyBpZiBpdCBoYXMgMiBjb25zZWN1dGl2ZSBoaXRze1xuICAvLyBrZWVwIGluIHRoZSBzdWNjZXNmdWxsIGRpcmVjdGlvblxuICAvL2lmIHBvc2libGVcbiAgLy9pZiBub3QsIHJldHVybiB0aGUgZmlyc3QgdmlhYmxlIGRpcmVjdGlvbn1cbiAgLy9lbHNle3JldHVybiBhIHJhbmRvbSBkaXJlY3Rpb259XG4gIGRpcmVjdGlvbjogZnVuY3Rpb24gKCkge1xuICAgIGlmICh0aGlzLmNoYXNlTW9kZS5mb2xsb3dEaXJlY3Rpb24pIHtcbiAgICAgIGNvbnNvbGUubG9nKGBmb2xsb3dESXJlY3Rpb24gaXMgOiR7dGhpcy5jaGFzZU1vZGUuZm9sbG93RGlyZWN0aW9ufWApO1xuICAgICAgaWYgKHRoaXMuY2hhc2VNb2RlLnZhbGlkTW92ZXMuaW5jbHVkZXModGhpcy5jaGFzZU1vZGUuZm9sbG93RGlyZWN0aW9uKSkge1xuICAgICAgICBjb25zb2xlLmxvZyhgdGhlIGZvbGxvdyBkaXJlY3Rpb24gaXMgdmFsaWRgKTtcbiAgICAgICAgcmV0dXJuIHRoaXMuY2hhc2VNb2RlLmZvbGxvd0RpcmVjdGlvbjtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiZmlyc3QgdmFsaWQgZGlyZWN0aW9uXCIpO1xuICAgICAgICByZXR1cm4gdGhpcy5jaGFzZU1vZGUudmFsaWRNb3Zlc1swXTtcbiAgICAgIH1cblxuICAgICAgLyogZWxzZSB7XG4gICAgICAgICAgLy9nbyBvcG9zaXRlIGRpcmVjdGlvbiBmcm9tIHRoZSBzdGFydFxcXG4gICAgICAgICAgLy8gaXQgc2hvdWxkIGJlIHNhdmVkLCB0aGUgdmFsaWQgbW92ZXMgZnJvbSB0aGUgb3JpZ2luYWwgY2hhc2Ugb2JqZWN0aXZlXG4gICAgICAgICAgLy9pZiBpdCBpcyBub3QgcG9zaWJsZSwgZW5kIGhlcmVcbiAgICAgICAgICBhbGVydChcImdvaW5nIGluIG9wcG9zaXRlIGRpcmVjdGlvblwiKTtcblxuICAgICAgICAgIHN3aXRjaCAodGhpcy5jaGFzZU1vZGUuZm9sbG93RGlyZWN0aW9uKSB7XG4gICAgICAgICAgICBjYXNlIFwibGVmdFwiOlxuICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuY2hhc2VNb2RlLm9yaWdpbmFsVmFsaWRNb3Zlcy5pbmNsdWRlcyhcInJpZ2h0XCIpKSB7XG4gICAgICAgICAgICAgICAgICB2YXIgZGlyZWN0aW9uID0gXCJyaWdodFwiO1xuICAgICAgICAgICAgICAgICAgdGhpcy5jaGFzZU1vZGUuaXNSZXZlcnNlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgIGFsZXJ0KFwiY2hhc2UgbW9kZSBmaW5pc2hlZFwiKTtcbiAgICAgICAgICAgICAgICAgIHRoaXMuY2hhc2VNb2RlLnN0YXRlID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAvL3Jlc2V0IHZhbGlkIG1vdmVzXG4gICAgICAgICAgICAgICAgICB0aGlzLmNoYXNlTW9kZS52YWxpZE1vdmVzID0gW1xuICAgICAgICAgICAgICAgICAgICBcImxlZnRcIixcbiAgICAgICAgICAgICAgICAgICAgXCJyaWdodFwiLFxuICAgICAgICAgICAgICAgICAgICBcInRvcFwiLFxuICAgICAgICAgICAgICAgICAgICBcImJvdHRvbVwiLFxuICAgICAgICAgICAgICAgICAgXTtcbiAgICAgICAgICAgICAgICAgIHJldHVybiBcImNoYXNlIG1vZGUgZW5kZWRcIjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIFwicmlnaHRcIjpcbiAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLmNoYXNlTW9kZS5vcmlnaW5hbFZhbGlkTW92ZXMuaW5jbHVkZXMoXCJsZWZ0XCIpKSB7XG4gICAgICAgICAgICAgICAgICB2YXIgZGlyZWN0aW9uID0gXCJsZWZ0XCI7XG4gICAgICAgICAgICAgICAgICB0aGlzLmNoYXNlTW9kZS5pc1JldmVyc2VkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgYWxlcnQoXCJjaGFzZSBtb2RlIGZpbmlzaGVkXCIpO1xuICAgICAgICAgICAgICAgICAgdGhpcy5jaGFzZU1vZGUuc3RhdGUgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgIC8vcmVzZXQgdmFsaWQgbW92ZXNcbiAgICAgICAgICAgICAgICAgIHRoaXMuY2hhc2VNb2RlLnZhbGlkTW92ZXMgPSBbXG4gICAgICAgICAgICAgICAgICAgIFwibGVmdFwiLFxuICAgICAgICAgICAgICAgICAgICBcInJpZ2h0XCIsXG4gICAgICAgICAgICAgICAgICAgIFwidG9wXCIsXG4gICAgICAgICAgICAgICAgICAgIFwiYm90dG9tXCIsXG4gICAgICAgICAgICAgICAgICBdO1xuICAgICAgICAgICAgICAgICAgcmV0dXJuIFwiY2hhc2UgbW9kZSBlbmRlZFwiO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgXCJ0b3BcIjpcbiAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLmNoYXNlTW9kZS5vcmlnaW5hbFZhbGlkTW92ZXMuaW5jbHVkZXMoXCJib3R0b21cIikpIHtcbiAgICAgICAgICAgICAgICAgIHZhciBkaXJlY3Rpb24gPSBcImJvdHRvbVwiO1xuICAgICAgICAgICAgICAgICAgdGhpcy5jaGFzZU1vZGUuaXNSZXZlcnNlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgIGFsZXJ0KFwiY2hhc2UgbW9kZSBmaW5pc2hlZFwiKTtcbiAgICAgICAgICAgICAgICAgIHRoaXMuY2hhc2VNb2RlLnN0YXRlID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAvL3Jlc2V0IHZhbGlkIG1vdmVzXG4gICAgICAgICAgICAgICAgICB0aGlzLmNoYXNlTW9kZS52YWxpZE1vdmVzID0gW1xuICAgICAgICAgICAgICAgICAgICBcImxlZnRcIixcbiAgICAgICAgICAgICAgICAgICAgXCJyaWdodFwiLFxuICAgICAgICAgICAgICAgICAgICBcInRvcFwiLFxuICAgICAgICAgICAgICAgICAgICBcImJvdHRvbVwiLFxuICAgICAgICAgICAgICAgICAgXTtcbiAgICAgICAgICAgICAgICAgIHJldHVybiBcImNoYXNlIG1vZGUgZW5kZWRcIjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIFwiYm90dG9tXCI6XG4gICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5jaGFzZU1vZGUub3JpZ2luYWxWYWxpZE1vdmVzLmluY2x1ZGVzKFwidG9wXCIpKSB7XG4gICAgICAgICAgICAgICAgICB2YXIgZGlyZWN0aW9uID0gXCJ0b3BcIjtcbiAgICAgICAgICAgICAgICAgIHRoaXMuY2hhc2VNb2RlLmlzUmV2ZXJzZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICBhbGVydChcImNoYXNlIG1vZGUgZmluaXNoZWRcIik7XG4gICAgICAgICAgICAgICAgICB0aGlzLmNoYXNlTW9kZS5zdGF0ZSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgLy9yZXNldCB2YWxpZCBtb3Zlc1xuICAgICAgICAgICAgICAgICAgdGhpcy5jaGFzZU1vZGUudmFsaWRNb3ZlcyA9IFtcbiAgICAgICAgICAgICAgICAgICAgXCJsZWZ0XCIsXG4gICAgICAgICAgICAgICAgICAgIFwicmlnaHRcIixcbiAgICAgICAgICAgICAgICAgICAgXCJ0b3BcIixcbiAgICAgICAgICAgICAgICAgICAgXCJib3R0b21cIixcbiAgICAgICAgICAgICAgICAgIF07XG4gICAgICAgICAgICAgICAgICByZXR1cm4gXCJjaGFzZSBtb2RlIGVuZGVkXCI7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIH1cbiAgICAgICAgICB0aGlzLmNoYXNlTW9kZS5jaGFzZVN1YmplY3QgPSB0aGlzLmNoYXNlTW9kZS5maXJzdENoYXNlU3ViamVjdDtcbiAgICAgICAgfSAqL1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmNoYXNlTW9kZS5vcmlnaW5hbFZhbGlkTW92ZXMgPSB0aGlzLmNoYXNlTW9kZS52YWxpZE1vdmVzOyAvL3RoaXMgaXMgZm9yIHJldmVyc2UgbW9kZSBsYXRlclxuICAgICAgY29uc3QgZGlyZWN0aW9uSW5kZXggPSBjb21wdXRlci5yYW5kb21JbnRGcm9tSW50ZXJ2YWwoXG4gICAgICAgIDAsXG4gICAgICAgIHRoaXMuY2hhc2VNb2RlLnZhbGlkTW92ZXMubGVuZ3RoIC0gMVxuICAgICAgKTtcbiAgICAgIGNvbnN0IGRpcmVjdGlvbiA9IHRoaXMuY2hhc2VNb2RlLnZhbGlkTW92ZXNbZGlyZWN0aW9uSW5kZXhdO1xuICAgICAgYWxlcnQoYHJhbmRvbWx5IHNlbGVjdGVkIGRpcmVjdGlvbiA6ICR7ZGlyZWN0aW9ufWApO1xuICAgICAgcmV0dXJuIGRpcmVjdGlvbjtcbiAgICB9XG4gIH0sXG4gIC8vdHJhbnNmb3JtIGRpcmVjdGlvbiBpbnRvIGNvb3JkaW5hdGVcbiAgLy90aGlzIHdpbGwgcmV0dXJuIGEgY29vcmRpbmF0ZVxuICAvLyB7eCx5fVxuICBjb29yZGluYXRlczogZnVuY3Rpb24gKGRpcmVjdGlvbikge1xuICAgIHN3aXRjaCAoZGlyZWN0aW9uKSB7XG4gICAgICBjYXNlIFwibGVmdFwiOiB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgeDogdGhpcy5jaGFzZU1vZGUuY2hhc2VTdWJqZWN0LnggLSAxLFxuICAgICAgICAgIHk6IHRoaXMuY2hhc2VNb2RlLmNoYXNlU3ViamVjdC55LFxuICAgICAgICB9O1xuICAgICAgfVxuXG4gICAgICBjYXNlIFwicmlnaHRcIjoge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIHg6IHRoaXMuY2hhc2VNb2RlLmNoYXNlU3ViamVjdC54ICsgMSxcbiAgICAgICAgICB5OiB0aGlzLmNoYXNlTW9kZS5jaGFzZVN1YmplY3QueSxcbiAgICAgICAgfTtcbiAgICAgIH1cblxuICAgICAgY2FzZSBcInRvcFwiOlxuICAgICAgICB7XG4gICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHg6IHRoaXMuY2hhc2VNb2RlLmNoYXNlU3ViamVjdC54LFxuICAgICAgICAgICAgeTogdGhpcy5jaGFzZU1vZGUuY2hhc2VTdWJqZWN0LnkgLSAxLFxuICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIFwiYm90dG9tXCI6IHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICB4OiB0aGlzLmNoYXNlTW9kZS5jaGFzZVN1YmplY3QueCxcbiAgICAgICAgICB5OiB0aGlzLmNoYXNlTW9kZS5jaGFzZVN1YmplY3QueSArIDEsXG4gICAgICAgIH07XG4gICAgICB9XG4gICAgfVxuICB9LFxuICAvL3VzZSB0aGUgbmV3IGNvb3JkaW5hdGUgYW5kIGRpcmVjdGlvblxuICBhdHRhY2s6IGZ1bmN0aW9uIChwbGF5ZXJCb2FyZE9iaikge1xuICAgIC8vc2F2ZSBkaXJlY3Rpb25cblxuICAgIGNvbnN0IGRpcmVjdGlvbiA9IHRoaXMuZGlyZWN0aW9uKCk7XG4gICAgLy9hdHRhY2s7XG4gICAgLy9zYXZlIGNvb3JkaW5hdGVzXG4gICAgY29uc3QgY29vcmRpbmF0ZXMgPSB0aGlzLmNvb3JkaW5hdGVzKGRpcmVjdGlvbik7XG5cbiAgICBpZiAodGhpcy5jaGFzZU1vZGUuaXNDaGFzaW5nKSB7XG4gICAgICBzd2l0Y2ggKHBsYXllckJvYXJkT2JqLnJlY2l2ZUF0dGFjayhjb29yZGluYXRlcy54LCBjb29yZGluYXRlcy55KSkge1xuICAgICAgICBjYXNlIFwiaGl0XCI6XG4gICAgICAgICAge1xuICAgICAgICAgICAgLy91cGRhdGUgY2hhc2Ugc3ViamVjdFxuICAgICAgICAgICAgdGhpcy5jaGFzZU1vZGUuY2hhc2VTdWJqZWN0ID0gY29vcmRpbmF0ZXM7XG5cbiAgICAgICAgICAgIC8vcmVzZXQgdmFsaWQgbW92ZXNcbiAgICAgICAgICAgIHRoaXMuY2hhc2VNb2RlLnZhbGlkTW92ZXMgPSBbXCJsZWZ0XCIsIFwicmlnaHRcIiwgXCJ0b3BcIiwgXCJib3R0b21cIl07XG4gICAgICAgICAgfVxuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIFwibWlzc2VkXCI6XG4gICAgICAgICAge1xuICAgICAgICAgICAgLyogICAvL2lmIHJ1bmluZyBmb3JtIHRoZSBvcG9zaXRlIGRpcmVjdGlvbiwgdGhlIGNoYXNlIG1vZGUgc2hvdWxkIHN0b3BcbiAgICAgICAgICAgICAgaWYgKHRoaXMuY2hhc2VNb2RlLmlzUmV2ZXJzZWQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmNoYXNlTW9kZS5zdGF0ZSA9IGZhbHNlO1xuICAgICAgICAgICAgICB9ICovXG4gICAgICAgICAgICAvL2dldCByYW5kb20gbnVtYmVyIGNob29zZWQgZnJvbSBhcnJheSBtb3ZlcyBhbmQgZGVsZXRlZCBmcm9tXG4gICAgICAgICAgICAvL3RoZSBhcnJheSBzbyBvbmx5IHRoZSBsZWZ0IHBvc2libGUgbW92ZSByZW1haW5zXG4gICAgICAgICAgICAvL2l0cyBub3QgbmVjZXNhcnkgYmVhY2F1c2UgdGhlIGZ1bmN0aW9uIGRldGVjdHMgbWlzc2VkIHNob290c1xuICAgICAgICAgICAgLy9ubyBuZWVkIHRvIGRvIGFueXRoaW5nLCBpdCBtYXJrcyBtaXNzXG4gICAgICAgICAgICB0aGlzLmNoYXNlTW9kZS5zdGF0ZSA9IGZhbHNlO1xuICAgICAgICAgICAgdGhpcy5jaGFzZU1vZGUuaXNDaGFzaW5nID0gZmFsc2U7XG4gICAgICAgICAgICB0aGlzLmNoYXNlTW9kZS5mb2xsb3dEaXJlY3Rpb24gPSB1bmRlZmluZWQ7XG4gICAgICAgICAgICB0aGlzLmNoYXNlTW9kZS52YWxpZE1vdmVzID0gW1wibGVmdFwiLCBcInJpZ2h0XCIsIFwidG9wXCIsIFwiYm90dG9tXCJdO1xuICAgICAgICAgIH1cbiAgICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKHRoaXMuY2hhc2VNb2RlLmlzQ2hhc2luZyA9PT0gZmFsc2UpIHtcbiAgICAgIHN3aXRjaCAocGxheWVyQm9hcmRPYmoucmVjaXZlQXR0YWNrKGNvb3JkaW5hdGVzLngsIGNvb3JkaW5hdGVzLnkpKSB7XG4gICAgICAgIGNhc2UgXCJoaXRcIjpcbiAgICAgICAgICB7XG4gICAgICAgICAgICAvL3NhdmUgY29vcmRpbmF0ZXMgb2YgdGhpcyBmaXJzdCBoaXRcbiAgICAgICAgICAgIHRoaXMuY2hhc2VNb2RlLmZpcnN0Q2hhc2VTdWJqZWN0ID0gdGhpcy5jaGFzZU1vZGUuY2hhc2VTdWJqZWN0OyAvL2ZvciByZXZlcnNlZFxuXG4gICAgICAgICAgICAvL2NoYW5nZSB0aGUgY2hhc2Ugc3ViamVjdFxuXG4gICAgICAgICAgICB0aGlzLmNoYXNlTW9kZS5jaGFzZVN1YmplY3QgPSBjb29yZGluYXRlcztcblxuICAgICAgICAgICAgLy9zYXZlIHZhbGlkIG1vdmVzIG9mIHRoZSBmaXJzdCBjaGFzZSBzdWJqZWN0XG4gICAgICAgICAgICB0aGlzLmNoYXNlTW9kZS5vcmlnaW5hbFZhbGlkTW92ZXMgPSB0aGlzLmNoYXNlTW9kZS52YWxpZE1vdmVzOyAvL2ZvciByZXZlcnNlICFcbiAgICAgICAgICAgIC8vcmVzZXQgdmFsaWQgbW92ZXNcbiAgICAgICAgICAgIHRoaXMuY2hhc2VNb2RlLnZhbGlkTW92ZXMgPSBbXCJsZWZ0XCIsIFwicmlnaHRcIiwgXCJ0b3BcIiwgXCJib3R0b21cIl07XG5cbiAgICAgICAgICAgIC8vc3RhcnQgYSBjaGFzaW4gZGlyZWN0aW9uIC4uLi5hbmQgYXhpc1xuICAgICAgICAgICAgdGhpcy5jaGFzZU1vZGUuZm9sbG93RGlyZWN0aW9uID0gZGlyZWN0aW9uO1xuICAgICAgICAgICAgdGhpcy5jaGFzZU1vZGUuaXNDaGFzaW5nID0gdHJ1ZTtcbiAgICAgICAgICB9XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgXCJtaXNzZWRcIjpcbiAgICAgICAgICB7XG4gICAgICAgICAgICAvL2lmIHJ1bmluZyBmb3JtIHRoZSBvcG9zaXRlIGRpcmVjdGlvbiwgdGhlIGNoYXNlIG1vZGUgc2hvdWxkIHN0b3BcbiAgICAgICAgICAgIC8qIGlmICh0aGlzLmNoYXNlTW9kZS5pc1JldmVyc2VkKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5jaGFzZU1vZGUuc3RhdGUgPSBmYWxzZTtcbiAgICAgICAgICAgICAgfSAqL1xuICAgICAgICAgICAgLy9nZXQgcmFuZG9tIG51bWJlciBjaG9vc2VkIGZyb20gYXJyYXkgbW92ZXMgYW5kIGRlbGV0ZWQgZnJvbVxuICAgICAgICAgICAgLy90aGUgYXJyYXkgc28gb25seSB0aGUgbGVmdCBwb3NpYmxlIG1vdmUgcmVtYWluc1xuICAgICAgICAgICAgLy9pdHMgbm90IG5lY2VzYXJ5IGJlYWNhdXNlIHRoZSBmdW5jdGlvbiBkZXRlY3RzIG1pc3NlZCBzaG9vdHNcbiAgICAgICAgICAgIC8vaXQgaXMgbm90IG5lY2VzYXJ5IHRvIGRvIGFueXRoaW5nIGhlcmUgYmVjYXVzZSB0aGUgYWkgd2lsbCBrZWVwIHRyeWluZyB1bnRpbCBpdCBnZXRzIGEgaGl0XG4gICAgICAgICAgICB0aGlzLmNoYXNlTW9kZS52YWxpZE1vdmVzID0gW1wibGVmdFwiLCBcInJpZ2h0XCIsIFwidG9wXCIsIFwiYm90dG9tXCJdO1xuICAgICAgICAgIH1cbiAgICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9XG4gIH0sXG59O1xuXG5leHBvcnQgeyBhaSB9O1xuIiwiZnVuY3Rpb24gYXhpc0J1dHRvbigpIHtcbiAgY29uc3QgYXhpc0J1dHRvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiYXhpcy1zZWxlY3RvclwiKTtcbiAgYXhpc0J1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgIGlmIChheGlzQnV0dG9uLmRhdGFzZXQuZGlyZWN0aW9uID09PSBcImhvcml6b250YWxcIikge1xuICAgICAgYXhpc0J1dHRvbi5kYXRhc2V0LmRpcmVjdGlvbiA9IFwidmVydGljYWxcIjtcbiAgICB9IGVsc2Uge1xuICAgICAgYXhpc0J1dHRvbi5kYXRhc2V0LmRpcmVjdGlvbiA9IFwiaG9yaXpvbnRhbFwiO1xuICAgIH1cbiAgfSk7XG59XG5mdW5jdGlvbiBib2FyZENvb3JkaW5hdGVzKHBvc2l0aW9uKSB7XG4gIGxldCBjZWxsQ29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgY2VsbENvbnRhaW5lci5pZCA9IFwiY2VsbC1jb250YWluZXJcIjtcbiAgY2VsbENvbnRhaW5lci5jbGFzc0xpc3QuYWRkKHBvc2l0aW9uKTtcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCAxMDsgaSsrKSB7XG4gICAgY29uc3QgY2VsbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgY2VsbC5pbm5lclRleHQgPSBpO1xuICAgIGNlbGwuY2xhc3NMaXN0LmFkZChcImNlbGxcIik7XG5cbiAgICBjZWxsQ29udGFpbmVyLmFwcGVuZENoaWxkKGNlbGwpO1xuICB9XG4gIHJldHVybiBjZWxsQ29udGFpbmVyO1xufVxuXG5mdW5jdGlvbiBkb21SZW5kZXJCb2FyZChpZCkge1xuICBjb25zdCBib2FyZCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gIGJvYXJkLmlkID0gaWQ7XG4gIGJvYXJkLmNsYXNzTGlzdC5hZGQoXCJib2FyZFwiKTtcbiAgZm9yIChsZXQgciA9IDA7IHIgPCAxMDsgcisrKSB7XG4gICAgY29uc3Qgcm93ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICByb3cuY2xhc3NMaXN0LmFkZChgcm93LSR7cn1gLCBcInJvd1wiKTtcbiAgICByb3cuZGF0YXNldC55ID0gcjtcblxuICAgIGZvciAobGV0IGMgPSAwOyBjIDwgMTAgPiAwOyBjKyspIHtcbiAgICAgIGNvbnN0IGNvbHVtbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG5cbiAgICAgIGNvbHVtbi5jbGFzc0xpc3QuYWRkKGBjb2x1bW4tJHtjfWAsIFwiY29sdW1uXCIpO1xuICAgICAgY29sdW1uLmRhdGFzZXQueCA9IGM7XG4gICAgICByb3cuYXBwZW5kQ2hpbGQoY29sdW1uKTtcbiAgICB9XG4gICAgYm9hcmQuYXBwZW5kQ2hpbGQocm93KTtcbiAgfVxuICByZXR1cm4gYm9hcmQ7XG59XG5cbmZ1bmN0aW9uIGRvbVBvcHVsYXRlQm9hcmQoYm9hcmRPYmosIERvbUJvYXJkU2VsZWN0b3IsIGlzUGxheWVyQm9hcmQgPSB0cnVlKSB7XG4gIGZvciAobGV0IHIgPSAwOyByIDwgMTA7IHIrKykge1xuICAgIGZvciAobGV0IGMgPSAwOyBjIDwgMTA7IGMrKykge1xuICAgICAgY29uc3QgY29sdW1uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcbiAgICAgICAgYCR7RG9tQm9hcmRTZWxlY3Rvcn0gLnJvdy0ke3J9IC5jb2x1bW4tJHtjfWBcbiAgICAgICk7XG5cbiAgICAgIGlmIChib2FyZE9iai5ib2FyZFtyXVtjXSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIGlmIChib2FyZE9iai5ib2FyZFtyXVtjXS5kZXN0cm95ZWQgPT09IHRydWUpIHtcbiAgICAgICAgICBjb2x1bW4uc3R5bGUuYmFja2dyb3VuZENvbG9yID0gXCJyZWRcIjtcbiAgICAgICAgfSBlbHNlIGlmIChib2FyZE9iai5ib2FyZFtyXVtjXS5kZXN0cm95ZWQgPT09IGZhbHNlICYmIGlzUGxheWVyQm9hcmQpIHtcbiAgICAgICAgICBjb2x1bW4uc3R5bGUuYmFja2dyb3VuZENvbG9yID0gXCJncmVlblwiO1xuICAgICAgICB9IGVsc2UgaWYgKGJvYXJkT2JqLmJvYXJkW3JdW2NdID09PSBcIm1pc3NlZFwiKSB7XG4gICAgICAgICAgY29sdW1uLnN0eWxlLmJhY2tncm91bmRDb2xvciA9IFwiZ3JleVwiO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG59XG5cbi8qIGZ1bmN0aW9uIGF0dGFja1dpdGhDbGljayhkb21Cb2FyZCwgY29tcHV0ZXJCb2FyZE9iaikge1xuICBkb21Cb2FyZC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGUpID0+IHtcbiAgICBsZXQgeCA9IGUudGFyZ2V0LmRhdGFzZXQueDtcbiAgICBsZXQgeSA9IGUudGFyZ2V0LnBhcmVudEVsZW1lbnQuZGF0YXNldC55O1xuICB9KTtcbiAgaWYgKGNvbXB1dGVyQm9hcmRPYmoucmVjaXZlQXR0YWNrKHgsIHkpICE9PSBcInJlcGV0aWRvXCIpIHtcbiAgICBjb21wdXRlckJvYXJkT2JqLnJlY2l2ZUF0dGFjayh4LCB5KTtcbiAgfSBlbHNlIHtcbiAgICBhdHRhY2tXaXRoQ2xpY2soZG9tQm9hcmQsIGNvbXB1dGVyQm9hcmRPYmopO1xuICB9XG4gIC8vXG4gIGlmIChjb21wdXRlckJvYXJkT2JqLnJlY2l2ZUF0dGFjayh4LCB5KSAhPT0gXCJyZXBldGlkb1wiKSB7XG4gICAgY29tcHV0ZXJCb2FyZE9iai5yZWNpdmVBdHRhY2soeCwgeSk7XG5cbiAgICBkb21Qb3B1bGF0ZUJvYXJkKGNvbXB1dGVyQm9hcmRPYmosIFwiI2NvbXB1dGVyQm9hcmRcIiwgZmFsc2UpO1xuXG4gICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICBjb21wdXRlcnR0YWNrKCk7XG4gICAgICBkb21Qb3B1bGF0ZUJvYXJkKHBsYXllckJvYXJkT2JqLCBcIiNwbGF5ZXJCb2FyZFwiKTtcbiAgICAgIGxldFRoZW1QbGF5KCk7XG4gICAgfSwgMjAwMCk7XG4gIH0gZWxzZSB7XG4gICAgYWxlcnQoXCJyZXBldGlkb1wiKTtcbiAgICBsZXRUaGVtUGxheSgpO1xuICB9XG59ICovXG5cbmV4cG9ydCB7IGRvbVJlbmRlckJvYXJkLCBkb21Qb3B1bGF0ZUJvYXJkLCBheGlzQnV0dG9uLCBib2FyZENvb3JkaW5hdGVzIH07XG4iLCJpbXBvcnQge1xuICBkb21SZW5kZXJCb2FyZCxcbiAgZG9tUG9wdWxhdGVCb2FyZCxcbiAgYm9hcmRDb29yZGluYXRlcyxcbn0gZnJvbSBcIi4vZG9tSW50ZXJhY3Rpb25cIjtcbmltcG9ydCBnYW1lYm9hcmRGYWN0b3J5IGZyb20gXCIuL2dhbWVib2FyZEZhY3RvcnlcIjtcbmltcG9ydCB7IGNvbXB1dGVyLCBwbGF5ZXIgfSBmcm9tIFwiLi9wbGF5ZXJzXCI7XG5cbmFzeW5jIGZ1bmN0aW9uIGdhbWVMb29wKCkge1xuICAvLzIgLSBUaGUgZ2FtZSBsb29wIHNob3VsZCBzZXQgdXAgYSBuZXcgZ2FtZSBieSBjcmVhdGluZyBQbGF5ZXJzIGFuZCBHYW1lYm9hcmRzLiBGb3Igbm93IGp1c3QgcG9wdWxhdGUgZWFjaCBHYW1lYm9hcmQgd2l0aCBwcmVkZXRlcm1pbmVkIGNvb3JkaW5hdGVzLiBZb3UgY2FuIGltcGxlbWVudCBhIHN5c3RlbSBmb3IgYWxsb3dpbmcgcGxheWVycyB0byBwbGFjZSB0aGVpciBzaGlwcyBsYXRlci5cblxuICBjb25zdCBjb250ZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJjb250ZW50XCIpO1xuICAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG5cbiAgY29uc3QgcGxheWVyQm9hcmRDb250YWluZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcbiAgICBcInBsYXllci1ib2FyZC1jb250YWluZXJcIlxuICApO1xuICBwbGF5ZXJCb2FyZENvbnRhaW5lci5hcHBlbmRDaGlsZChib2FyZENvb3JkaW5hdGVzKFwibGVmdFwiKSk7XG4gIHBsYXllckJvYXJkQ29udGFpbmVyLmFwcGVuZENoaWxkKGJvYXJkQ29vcmRpbmF0ZXMoXCJ0b3BcIikpO1xuICBwbGF5ZXJCb2FyZENvbnRhaW5lci5hcHBlbmRDaGlsZChkb21SZW5kZXJCb2FyZChcInBsYXllckJvYXJkXCIpKTsgLy8gbWFrZSBlbXB0eSBib2FyZFxuICBwbGF5ZXJCb2FyZENvbnRhaW5lci5hcHBlbmRDaGlsZChib2FyZENvb3JkaW5hdGVzKFwiYm90dG9tXCIpKTtcbiAgcGxheWVyQm9hcmRDb250YWluZXIuYXBwZW5kQ2hpbGQoYm9hcmRDb29yZGluYXRlcyhcInJpZ2h0XCIpKTtcbiAgLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbiAgY29uc3QgY29tcHV0ZXJCb2FyZENvbnRhaW5lciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFxuICAgIFwiY29tcHV0ZXItYm9hcmQtY29udGFpbmVyXCJcbiAgKTtcbiAgY29tcHV0ZXJCb2FyZENvbnRhaW5lci5hcHBlbmRDaGlsZChib2FyZENvb3JkaW5hdGVzKFwibGVmdFwiKSk7XG4gIGNvbXB1dGVyQm9hcmRDb250YWluZXIuYXBwZW5kQ2hpbGQoYm9hcmRDb29yZGluYXRlcyhcInRvcFwiKSk7XG4gIGNvbXB1dGVyQm9hcmRDb250YWluZXIuYXBwZW5kQ2hpbGQoZG9tUmVuZGVyQm9hcmQoXCJjb21wdXRlckJvYXJkXCIpKTsgLy8gbWFrZSBlbXB0eSBib2FyZFxuICBjb21wdXRlckJvYXJkQ29udGFpbmVyLmFwcGVuZENoaWxkKGJvYXJkQ29vcmRpbmF0ZXMoXCJyaWdodFwiKSk7XG4gIGNvbXB1dGVyQm9hcmRDb250YWluZXIuYXBwZW5kQ2hpbGQoYm9hcmRDb29yZGluYXRlcyhcImJvdHRvbVwiKSk7XG5cbiAgY29udGVudC5hcHBlbmRDaGlsZChwbGF5ZXJCb2FyZENvbnRhaW5lcik7XG4gIGNvbnRlbnQuYXBwZW5kQ2hpbGQoY29tcHV0ZXJCb2FyZENvbnRhaW5lcik7XG4gIC8vLy8vLy8vLy8vLy8vLy8vXG5cbiAgY29uc3QgcGxheWVyQm9hcmRPYmogPSBnYW1lYm9hcmRGYWN0b3J5KCk7XG4gIGNvbnN0IGNvbXB1dGVyQm9hcmRPYmogPSBnYW1lYm9hcmRGYWN0b3J5KCk7XG5cbiAgY29tcHV0ZXIucGxhY2VTaGlwKGNvbXB1dGVyQm9hcmRPYmosIDIpO1xuICAvL2NvbnNvbGUubG9nKGNvbXB1dGVyQm9hcmRPYmouZmxlZXQpO1xuICBjb25zb2xlLmxvZyhcInBsYWNlIHlvdXIgMiBzaGlwXCIpO1xuICBhd2FpdCBwbGF5ZXIucGxhY2VTaGlwKDIsIFwicGxheWVyQm9hcmRcIiwgcGxheWVyQm9hcmRPYmopO1xuICBkb21Qb3B1bGF0ZUJvYXJkKHBsYXllckJvYXJkT2JqLCBcIiNwbGF5ZXJCb2FyZFwiLCB0cnVlKTtcblxuICBjb21wdXRlci5wbGFjZVNoaXAoY29tcHV0ZXJCb2FyZE9iaiwgMyk7XG4gIC8vY29uc29sZS5sb2coY29tcHV0ZXJCb2FyZE9iai5mbGVldCk7XG4gIGNvbnNvbGUubG9nKFwicGxhY2UgeW91ciAzIHNoaXBcIik7XG4gIGF3YWl0IHBsYXllci5wbGFjZVNoaXAoMywgXCJwbGF5ZXJCb2FyZFwiLCBwbGF5ZXJCb2FyZE9iaik7XG4gIGRvbVBvcHVsYXRlQm9hcmQocGxheWVyQm9hcmRPYmosIFwiI3BsYXllckJvYXJkXCIsIHRydWUpO1xuXG4gIGNvbXB1dGVyLnBsYWNlU2hpcChjb21wdXRlckJvYXJkT2JqLCA0KTtcbiAgLy9jb25zb2xlLmxvZyhjb21wdXRlckJvYXJkT2JqLmZsZWV0KTtcbiAgY29uc29sZS5sb2coXCJwbGFjZSB5b3VyIDQgc2hpcFwiKTtcbiAgYXdhaXQgcGxheWVyLnBsYWNlU2hpcCg0LCBcInBsYXllckJvYXJkXCIsIHBsYXllckJvYXJkT2JqKTtcbiAgZG9tUG9wdWxhdGVCb2FyZChwbGF5ZXJCb2FyZE9iaiwgXCIjcGxheWVyQm9hcmRcIiwgdHJ1ZSk7XG5cbiAgY29tcHV0ZXIucGxhY2VTaGlwKGNvbXB1dGVyQm9hcmRPYmosIDUpO1xuICAvL2NvbnNvbGUubG9nKGNvbXB1dGVyQm9hcmRPYmouZmxlZXQpO1xuICBjb25zb2xlLmxvZyhcInBsYWNlIHlvdXIgNSBzaGlwXCIpO1xuICBhd2FpdCBwbGF5ZXIucGxhY2VTaGlwKDUsIFwicGxheWVyQm9hcmRcIiwgcGxheWVyQm9hcmRPYmopO1xuICBkb21Qb3B1bGF0ZUJvYXJkKHBsYXllckJvYXJkT2JqLCBcIiNwbGF5ZXJCb2FyZFwiLCB0cnVlKTtcblxuICAvLzMtICBXZeKAmWxsIGxlYXZlIHRoZSBIVE1MIGltcGxlbWVudGF0aW9uIHVwIHRvIHlvdSBmb3Igbm93LCBidXQgeW91IHNob3VsZCBkaXNwbGF5IGJvdGggdGhlIHBsYXllcuKAmXMgYm9hcmRzIGFuZCByZW5kZXIgdGhlbSB1c2luZyBpbmZvcm1hdGlvbiBmcm9tIHRoZSBHYW1lYm9hcmQgY2xhc3MuXG5cbiAgLyogZG9tUG9wdWxhdGVCb2FyZChwbGF5ZXJCb2FyZE9iaiwgXCIjcGxheWVyQm9hcmRcIik7XG4gIGRvbVBvcHVsYXRlQm9hcmQoY29tcHV0ZXJCb2FyZE9iaiwgXCIjY29tcHV0ZXJCb2FyZFwiLCBmYWxzZSk7ICovXG5cbiAgLy8gLTMtMSBZb3UgbmVlZCBtZXRob2RzIHRvIHJlbmRlciB0aGUgZ2FtZWJvYXJkcyAvZG9uZS8gYW5kIHRvIHRha2UgdXNlciBpbnB1dCBmb3IgYXR0YWNraW5nL2RvbmUvLiBGb3IgYXR0YWNrcywgbGV0IHRoZSB1c2VyIGNsaWNrIG9uIGEgY29vcmRpbmF0ZSBpbiB0aGUgZW5lbXkgR2FtZWJvYXJkLlxuICAvLy00IFRoZSBnYW1lIGxvb3Agc2hvdWxkIHN0ZXAgdGhyb3VnaCB0aGUgZ2FtZSB0dXJuIGJ5IHR1cm4gdXNpbmcgb25seSBtZXRob2RzIGZyb20gb3RoZXIgb2JqZWN0cy4gSWYgYXQgYW55IHBvaW50IHlvdSBhcmUgdGVtcHRlZCB0byB3cml0ZSBhIG5ldyBmdW5jdGlvbiBpbnNpZGUgdGhlIGdhbWUgbG9vcCwgc3RlcCBiYWNrIGFuZCBmaWd1cmUgb3V0IHdoaWNoIGNsYXNzIG9yIG1vZHVsZSB0aGF0IGZ1bmN0aW9uIHNob3VsZCBiZWxvbmcgdG8uXG5cbiAgZm9yIChcbiAgICBsZXQgdHVybiA9IDE7XG4gICAgLy9DcmVhdGUgY29uZGl0aW9ucyBzbyB0aGF0IHRoZSBnYW1lIGVuZHMgb25jZSBvbmUgcGxheWVycyBzaGlwcyBoYXZlIGFsbCBiZWVuIHN1bmsuIFRoaXMgZnVuY3Rpb24gaXMgYXBwcm9wcmlhdGUgZm9yIHRoZSBHYW1lIG1vZHVsZS5cbiAgICBjb21wdXRlckJvYXJkT2JqLmlzR2FtZU92ZXIoKSA9PT0gZmFsc2UgJiZcbiAgICBwbGF5ZXJCb2FyZE9iai5pc0dhbWVPdmVyKCkgPT09IGZhbHNlO1xuICAgIHR1cm4rK1xuICApIHtcbiAgICBjb25zb2xlLmxvZyhcImF3YWl0aW5nIHBsYXllciBhdHRhY2tcIik7XG5cbiAgICBhd2FpdCBwbGF5ZXIuYXR0YWNrKGNvbXB1dGVyQm9hcmRPYmopO1xuICAgIGRvbVBvcHVsYXRlQm9hcmQoY29tcHV0ZXJCb2FyZE9iaiwgXCIjY29tcHV0ZXJCb2FyZFwiLCBmYWxzZSk7XG5cbiAgICBjb25zb2xlLmxvZyhcImNvbXB1dGVyQXR0YWNrTkV4dFwiKTtcblxuICAgIGNvbXB1dGVyLmF0dGFjayhwbGF5ZXJCb2FyZE9iaik7XG4gICAgZG9tUG9wdWxhdGVCb2FyZChwbGF5ZXJCb2FyZE9iaiwgXCIjcGxheWVyQm9hcmRcIik7XG4gIH1cblxuICBhbGVydChcImdhbWUgb3ZlclwiKTtcbn1cblxuZXhwb3J0IHsgZ2FtZUxvb3AgfTtcbiIsImltcG9ydCBzaGlwRmFjdG9yeSBmcm9tIFwiLi9zaGlwRmFjdG9yeVwiO1xuXG5mdW5jdGlvbiBnYW1lYm9hcmRGYWN0b3J5KCkge1xuICBsZXQgYm9hcmQgPSBbW10sIFtdLCBbXSwgW10sIFtdLCBbXSwgW10sIFtdLCBbXSwgW11dO1xuICBsZXQgZmxlZXQgPSB7fTtcbiAgbGV0IG1pc3NlZFNob290cyA9IFtdO1xuXG4gIGNvbnN0IHBsYWNlU2hpcCA9IGZ1bmN0aW9uIChsZW5ndGgsIHgsIHkpIHtcbiAgICBsZXQgY3VycmVudFNoaXA7XG4gICAgc3dpdGNoIChsZW5ndGgpIHtcbiAgICAgIGNhc2UgNTpcbiAgICAgICAge1xuICAgICAgICAgIGZsZWV0LmNhcnJpZXIgPSBzaGlwRmFjdG9yeShsZW5ndGgpO1xuICAgICAgICAgIGN1cnJlbnRTaGlwID0gXCJjYXJyaWVyXCI7XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIDQ6XG4gICAgICAgIHtcbiAgICAgICAgICBmbGVldC5iYXR0bGVzaGlwID0gc2hpcEZhY3RvcnkobGVuZ3RoKTtcbiAgICAgICAgICBjdXJyZW50U2hpcCA9IFwiYmF0dGxlc2hpcFwiO1xuICAgICAgICB9XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAzOlxuICAgICAgICB7XG4gICAgICAgICAgZmxlZXQuZGVzdHJveWVyID0gc2hpcEZhY3RvcnkobGVuZ3RoKTtcbiAgICAgICAgICBjdXJyZW50U2hpcCA9IFwiZGVzdHJveWVyXCI7XG4gICAgICAgIH1cbiAgICAgICAgLy9mbGVldC5zdWJtYXJpbmUgPSBzaGlwRmFjdG9yeShsZW5ndGgpO1xuICAgICAgICBicmVhaztcblxuICAgICAgY2FzZSAyOlxuICAgICAgICB7XG4gICAgICAgICAgZmxlZXQucGF0cm9sQm9hdCA9IHNoaXBGYWN0b3J5KGxlbmd0aCk7XG4gICAgICAgICAgY3VycmVudFNoaXAgPSBcInBhdHJvbEJvYXRcIjtcbiAgICAgICAgfVxuXG4gICAgICAgIGJyZWFrO1xuICAgIH1cblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICAgIGJvYXJkW3ldWyt4ICsgaV0gPSB7XG4gICAgICAgIGRlc3Ryb3llZDogZmFsc2UsXG5cbiAgICAgICAgaGl0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgZmxlZXRbY3VycmVudFNoaXBdLmhpdCgpO1xuICAgICAgICAgIHRoaXMuZGVzdHJveWVkID0gdHJ1ZTtcbiAgICAgICAgfSxcbiAgICAgIH07XG4gICAgfVxuICAgIGNvbnNvbGUubG9nKGZsZWV0KTtcbiAgfTtcblxuICBjb25zdCBwbGFjZVNoaXBWZXJ0aWNhbGx5ID0gZnVuY3Rpb24gKGxlbmd0aCwgeCwgeSkge1xuICAgIGxldCBjdXJyZW50U2hpcDtcbiAgICBzd2l0Y2ggKGxlbmd0aCkge1xuICAgICAgY2FzZSA1OlxuICAgICAgICB7XG4gICAgICAgICAgZmxlZXQuY2FycmllciA9IHNoaXBGYWN0b3J5KGxlbmd0aCk7XG4gICAgICAgICAgY3VycmVudFNoaXAgPSBcImNhcnJpZXJcIjtcbiAgICAgICAgfVxuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgNDpcbiAgICAgICAge1xuICAgICAgICAgIGZsZWV0LmJhdHRsZXNoaXAgPSBzaGlwRmFjdG9yeShsZW5ndGgpO1xuICAgICAgICAgIGN1cnJlbnRTaGlwID0gXCJiYXR0bGVzaGlwXCI7XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIDM6XG4gICAgICAgIHtcbiAgICAgICAgICBmbGVldC5kZXN0cm95ZXIgPSBzaGlwRmFjdG9yeShsZW5ndGgpO1xuICAgICAgICAgIGN1cnJlbnRTaGlwID0gXCJkZXN0cm95ZXJcIjtcbiAgICAgICAgfVxuICAgICAgICAvL2ZsZWV0LnN1Ym1hcmluZSA9IHNoaXBGYWN0b3J5KGxlbmd0aCk7XG4gICAgICAgIGJyZWFrO1xuXG4gICAgICBjYXNlIDI6XG4gICAgICAgIHtcbiAgICAgICAgICBmbGVldC5wYXRyb2xCb2F0ID0gc2hpcEZhY3RvcnkobGVuZ3RoKTtcbiAgICAgICAgICBjdXJyZW50U2hpcCA9IFwicGF0cm9sQm9hdFwiO1xuICAgICAgICB9XG5cbiAgICAgICAgYnJlYWs7XG4gICAgfVxuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgICAgYm9hcmRbK3kgKyBpXVt4XSA9IHtcbiAgICAgICAgZGVzdHJveWVkOiBmYWxzZSxcblxuICAgICAgICBoaXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICBmbGVldFtjdXJyZW50U2hpcF0uaGl0KCk7XG4gICAgICAgICAgdGhpcy5kZXN0cm95ZWQgPSB0cnVlO1xuICAgICAgICB9LFxuICAgICAgfTtcbiAgICB9XG4gICAgY29uc29sZS5sb2coZmxlZXQpO1xuICB9O1xuXG4gIGNvbnN0IHJlY2l2ZUF0dGFjayA9ICh4LCB5KSA9PiB7XG4gICAgY29uc29sZS5sb2coXCJyZWNpdmVBdHRhY2tNZXRob2RcIik7XG4gICAgaWYgKHR5cGVvZiBib2FyZFt5XVt4XSA9PT0gXCJvYmplY3RcIikge1xuICAgICAgaWYgKGJvYXJkW3ldW3hdLmRlc3Ryb3llZCA9PT0gZmFsc2UpIHtcbiAgICAgICAgYm9hcmRbeV1beF0uaGl0KCk7XG4gICAgICAgIHJldHVybiBcImhpdFwiO1xuICAgICAgfSBlbHNlIGlmIChib2FyZFt5XVt4XS5kZXN0cm95ZWQgPT09IHRydWUpIHtcbiAgICAgICAgcmV0dXJuIFwicmVwZXRpZG9cIjtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKGJvYXJkW3ldW3hdID09PSB1bmRlZmluZWQpIHtcbiAgICAgIGJvYXJkW3ldW3hdID0gXCJtaXNzZWRcIjtcbiAgICAgIGNvbnNvbGUubG9nKFwibWlzc2VkXCIpO1xuICAgICAgcmV0dXJuIFwibWlzc2VkXCI7XG4gICAgfSBlbHNlIGlmIChib2FyZFt5XVt4XSA9PT0gXCJtaXNzZWRcIikge1xuICAgICAgcmV0dXJuIFwicmVwZXRpZG9cIjtcbiAgICB9XG4gIH07XG5cbiAgY29uc3Qgd2lsbEZvbGxvd1J1bGVzRm9yQXR0YWNraW5nID0gKHgsIHkpID0+IHtcbiAgICBpZiAodHlwZW9mIGJvYXJkW3ldW3hdID09PSBcIm9iamVjdFwiKSB7XG4gICAgICBpZiAoYm9hcmRbeV1beF0uZGVzdHJveWVkID09PSBmYWxzZSkge1xuICAgICAgICByZXR1cm4gXCJoaXRcIjtcbiAgICAgIH0gZWxzZSBpZiAoYm9hcmRbeV1beF0uZGVzdHJveWVkID09PSB0cnVlKSB7XG4gICAgICAgIHJldHVybiBcInJlcGV0aWRvXCI7XG4gICAgICB9XG4gICAgfSBlbHNlIGlmIChib2FyZFt5XVt4XSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICByZXR1cm4gXCJtaXNzZWRcIjtcbiAgICB9IGVsc2UgaWYgKGJvYXJkW3ldW3hdID09PSBcIm1pc3NlZFwiKSB7XG4gICAgICByZXR1cm4gXCJyZXBldGlkb1wiO1xuICAgIH1cbiAgfTtcbiAgLy9mb3IgcGxhY2luZ1xuICBjb25zdCB3aWxsRm9sbG93UnVsZXMgPSBmdW5jdGlvbiAobGVuZ3RoLCB4LCB5KSB7XG4gICAgY29uc3Qgd2lsbE92ZXJsYXAgPSBmdW5jdGlvbiAobGVuZ3RoLCB4LCB5KSB7XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGlmICh0eXBlb2YgYm9hcmRbeV1bK3ggKyBpXSA9PT0gXCJvYmplY3RcIikge1xuICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfTtcblxuICAgIGNvbnN0IHdpbGxPdmVyZmxvdyA9IGZ1bmN0aW9uIChsZW5ndGgsIHgpIHtcbiAgICAgIGlmIChsZW5ndGggKyAreCA+IDEwKSB7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfSBlbHNlIHJldHVybiBmYWxzZTtcbiAgICB9O1xuICAgIGlmICghd2lsbE92ZXJsYXAobGVuZ3RoLCB4LCB5KSAmJiAhd2lsbE92ZXJmbG93KGxlbmd0aCwgeCkpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICB9O1xuXG4gIC8vZm9yIHBsYWNpbmdcbiAgY29uc3Qgd2lsbEZvbGxvd1J1bGVzVmVydGljYWxseSA9IGZ1bmN0aW9uIChsZW5ndGgsIHgsIHkpIHtcbiAgICBjb25zdCB3aWxsT3ZlcmxhcCA9IGZ1bmN0aW9uIChsZW5ndGgsIHgsIHkpIHtcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICAgICAgaWYgKHR5cGVvZiBib2FyZFsreSArIGldW3hdID09PSBcIm9iamVjdFwiKSB7XG4gICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9O1xuXG4gICAgY29uc3Qgd2lsbE92ZXJmbG93ID0gZnVuY3Rpb24gKGxlbmd0aCwgeSkge1xuICAgICAgY29uc29sZS5sb2cobGVuZ3RoICsgK3kgPiAxMCk7XG4gICAgICBpZiAobGVuZ3RoICsgK3kgPiAxMCkge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH0gZWxzZSByZXR1cm4gZmFsc2U7XG4gICAgfTtcbiAgICBpZiAoIXdpbGxPdmVyZmxvdyhsZW5ndGgsIHkpKSB7XG4gICAgICBpZiAoIXdpbGxPdmVybGFwKGxlbmd0aCwgeCwgeSkpIHtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgfVxuICB9O1xuXG4gIGNvbnN0IGlzR2FtZU92ZXIgPSBmdW5jdGlvbiAoKSB7XG4gICAgY29uc29sZS5sb2codGhpcy5mbGVldCk7XG4gICAgcmV0dXJuIChcbiAgICAgIHRoaXMuZmxlZXQuY2Fycmllci5pc1N1bmsoKSAmJlxuICAgICAgdGhpcy5mbGVldC5wYXRyb2xCb2F0LmlzU3VuaygpICYmXG4gICAgICB0aGlzLmZsZWV0LmRlc3Ryb3llci5pc1N1bmsoKSAmJlxuICAgICAgdGhpcy5mbGVldC5iYXR0bGVzaGlwLmlzU3VuaygpXG4gICAgKTtcbiAgfTtcblxuICByZXR1cm4ge1xuICAgIHdpbGxGb2xsb3dSdWxlc0ZvckF0dGFja2luZyxcbiAgICBib2FyZCxcbiAgICBmbGVldCxcbiAgICBwbGFjZVNoaXAsXG4gICAgcGxhY2VTaGlwVmVydGljYWxseSxcbiAgICB3aWxsRm9sbG93UnVsZXMsXG4gICAgcmVjaXZlQXR0YWNrLFxuICAgIGlzR2FtZU92ZXIsXG4gICAgd2lsbEZvbGxvd1J1bGVzVmVydGljYWxseSxcbiAgfTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgZ2FtZWJvYXJkRmFjdG9yeTtcbiIsImltcG9ydCB7IGFpIH0gZnJvbSBcIi4vYWlcIjtcblxubGV0IGNvbXB1dGVyID0ge1xuICBhaSxcblxuICBhdHRhY2s6IGZ1bmN0aW9uIChwbGF5ZXJCb2FyZE9iaikge1xuICAgIGlmICh0aGlzLmFpLmNoYXNlTW9kZS5zdGF0ZSA9PT0gdHJ1ZSkge1xuICAgICAgLy9hbGVydChcImFpIGlzIHdvcmtpbmdcIik7XG5cbiAgICAgIHRoaXMuYWkucmVtb3ZlSW52YWxpZERpcmVjdGlvbnMocGxheWVyQm9hcmRPYmopO1xuICAgICAgdGhpcy5haS5hdHRhY2socGxheWVyQm9hcmRPYmopO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCB4ID0gdGhpcy5yYW5kb21JbnRGcm9tSW50ZXJ2YWwoMCwgOSk7XG4gICAgICBjb25zdCB5ID0gdGhpcy5yYW5kb21JbnRGcm9tSW50ZXJ2YWwoMCwgOSk7XG5cbiAgICAgIHN3aXRjaCAocGxheWVyQm9hcmRPYmoucmVjaXZlQXR0YWNrKHgsIHkpKSB7XG4gICAgICAgIGNhc2UgXCJoaXRcIjpcbiAgICAgICAgICB7XG4gICAgICAgICAgICB0aGlzLmFpLmNoYXNlTW9kZS5zdGF0ZSA9IHRydWU7XG4gICAgICAgICAgICB0aGlzLmFpLmNoYXNlTW9kZS5jaGFzZVN1YmplY3QueCA9IHg7XG4gICAgICAgICAgICB0aGlzLmFpLmNoYXNlTW9kZS5jaGFzZVN1YmplY3QueSA9IHk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIFwibWlzc2VkXCI6XG4gICAgICAgICAge1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJjb21wdXRlciBtaXNzZWRcIik7XG4gICAgICAgICAgfVxuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIFwicmVwZXRpZG9cIjpcbiAgICAgICAgICB7XG4gICAgICAgICAgICBjb21wdXRlci5hdHRhY2socGxheWVyQm9hcmRPYmopO1xuICAgICAgICAgIH1cbiAgICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9XG4gIH0sXG4gIHBsYWNlU2hpcDogZnVuY3Rpb24gKGNvbXB1dGVyQm9hcmRPYmosIGxlbmd0aCkge1xuICAgIGlmICh0aGlzLnJhbmRvbUludEZyb21JbnRlcnZhbCgwLCAxKSA9PT0gMCkge1xuICAgICAgLy9wbGFjZXNoaXAgaG9yaXpvbnRhbGx5XG4gICAgICBjb25zdCB4ID0gdGhpcy5yYW5kb21JbnRGcm9tSW50ZXJ2YWwoMCwgOSk7XG4gICAgICBjb25zdCB5ID0gdGhpcy5yYW5kb21JbnRGcm9tSW50ZXJ2YWwoMCwgOSk7XG4gICAgICBpZiAoY29tcHV0ZXJCb2FyZE9iai53aWxsRm9sbG93UnVsZXMobGVuZ3RoLCB4LCB5KSkge1xuICAgICAgICBjb21wdXRlckJvYXJkT2JqLnBsYWNlU2hpcChsZW5ndGgsIHgsIHkpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5wbGFjZVNoaXAoY29tcHV0ZXJCb2FyZE9iaiwgbGVuZ3RoKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgLy9wbGFjZXNoaXAgdmVydGljYWxseVxuICAgICAgY29uc3QgeCA9IHRoaXMucmFuZG9tSW50RnJvbUludGVydmFsKDAsIDkpO1xuICAgICAgY29uc3QgeSA9IHRoaXMucmFuZG9tSW50RnJvbUludGVydmFsKDAsIDkpO1xuICAgICAgaWYgKGNvbXB1dGVyQm9hcmRPYmoud2lsbEZvbGxvd1J1bGVzVmVydGljYWxseShsZW5ndGgsIHgsIHkpKSB7XG4gICAgICAgIGNvbXB1dGVyQm9hcmRPYmoucGxhY2VTaGlwVmVydGljYWxseShsZW5ndGgsIHgsIHkpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5wbGFjZVNoaXAoY29tcHV0ZXJCb2FyZE9iaiwgbGVuZ3RoKTtcbiAgICAgIH1cbiAgICB9XG4gIH0sXG4gIHJhbmRvbUludEZyb21JbnRlcnZhbDogZnVuY3Rpb24gKG1pbiwgbWF4KSB7XG4gICAgLy8gbWluIGFuZCBtYXggaW5jbHVkZWRcblxuICAgIHJldHVybiBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAobWF4IC0gbWluICsgMSkgKyBtaW4pO1xuICB9LFxufTtcblxubGV0IHBsYXllciA9IHtcbiAgYXR0YWNrOiBmdW5jdGlvbiAoY29tcHV0ZXJCb2FyZE9iaikge1xuICAgIGNvbnNvbGUubG9nKFwicGxheWVyQXR0YWNrIGZ1bmN0aW9uXCIpO1xuICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiBhc2QocmVzb2x2ZSkge1xuICAgICAgY29uc3QgY29tcHV0ZXJCb2FyZCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiY29tcHV0ZXJCb2FyZFwiKTtcbiAgICAgIGNvbXB1dGVyQm9hcmQuYWRkRXZlbnRMaXN0ZW5lcihcbiAgICAgICAgXCJjbGlja1wiLFxuICAgICAgICAoZSkgPT4ge1xuICAgICAgICAgIGlmIChcbiAgICAgICAgICAgIGUudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucyhcImJvYXJkXCIpIHx8XG4gICAgICAgICAgICBlLnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoXCJyb3dcIilcbiAgICAgICAgICApIHtcbiAgICAgICAgICAgIGFzZChyZXNvbHZlKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgbGV0IHggPSBlLnRhcmdldC5kYXRhc2V0Lng7XG4gICAgICAgICAgICBsZXQgeSA9IGUudGFyZ2V0LnBhcmVudEVsZW1lbnQuZGF0YXNldC55O1xuXG4gICAgICAgICAgICBzd2l0Y2ggKGNvbXB1dGVyQm9hcmRPYmoucmVjaXZlQXR0YWNrKHgsIHkpKSB7XG4gICAgICAgICAgICAgIGNhc2UgXCJoaXRcIjpcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICByZXNvbHZlKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICBjYXNlIFwibWlzc2VkXCI6XG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgcmVzb2x2ZSgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgY2FzZSBcInJlcGV0aWRvXCI6XG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJyZXBldGlkbyBpbnRlbnRhIGRlbnVldm9cIik7XG4gICAgICAgICAgICAgICAgICBhc2QocmVzb2x2ZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfSxcblxuICAgICAgICB7IG9uY2U6IHRydWUgfVxuICAgICAgKTtcbiAgICB9KTtcbiAgfSxcbiAgcGxhY2VTaGlwOiBmdW5jdGlvbiAobGVuZ3RoLCBwbGF5ZXJCb2FyZElkLCBwbGF5ZXJCb2FyZE9iaikge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiBhc2QocmVzb2x2ZSkge1xuICAgICAgY29uc3QgcGxheWVyQm9hcmQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChwbGF5ZXJCb2FyZElkKTtcbiAgICAgIHBsYXllckJvYXJkLmFkZEV2ZW50TGlzdGVuZXIoXG4gICAgICAgIFwiY2xpY2tcIixcbiAgICAgICAgKGUpID0+IHtcbiAgICAgICAgICBpZiAoXG4gICAgICAgICAgICBlLnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoXCJib2FyZFwiKSB8fFxuICAgICAgICAgICAgZS50YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKFwicm93XCIpXG4gICAgICAgICAgKSB7XG4gICAgICAgICAgICBhc2QocmVzb2x2ZSk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGxldCB4ID0gZS50YXJnZXQuZGF0YXNldC54O1xuXG4gICAgICAgICAgICBsZXQgeSA9IGUudGFyZ2V0LnBhcmVudEVsZW1lbnQuZGF0YXNldC55O1xuXG4gICAgICAgICAgICBjb25zdCBheGlzQnV0dG9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJheGlzLXNlbGVjdG9yXCIpO1xuICAgICAgICAgICAgaWYgKGF4aXNCdXR0b24uZGF0YXNldC5kaXJlY3Rpb24gPT09IFwiaG9yaXpvbnRhbFwiKSB7XG4gICAgICAgICAgICAgIGlmIChwbGF5ZXJCb2FyZE9iai53aWxsRm9sbG93UnVsZXMobGVuZ3RoLCB4LCB5KSkge1xuICAgICAgICAgICAgICAgIHBsYXllckJvYXJkT2JqLnBsYWNlU2hpcChsZW5ndGgsIHgsIHkpO1xuXG4gICAgICAgICAgICAgICAgcmVzb2x2ZSgpO1xuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGFzZChyZXNvbHZlKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIGlmIChheGlzQnV0dG9uLmRhdGFzZXQuZGlyZWN0aW9uID09PSBcInZlcnRpY2FsXCIpIHtcbiAgICAgICAgICAgICAgaWYgKHBsYXllckJvYXJkT2JqLndpbGxGb2xsb3dSdWxlc1ZlcnRpY2FsbHkobGVuZ3RoLCB4LCB5KSkge1xuICAgICAgICAgICAgICAgIHBsYXllckJvYXJkT2JqLnBsYWNlU2hpcFZlcnRpY2FsbHkobGVuZ3RoLCB4LCB5KTtcblxuICAgICAgICAgICAgICAgIHJlc29sdmUoKTtcbiAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBhc2QocmVzb2x2ZSk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH0sXG5cbiAgICAgICAgeyBvbmNlOiB0cnVlIH1cbiAgICAgICk7XG4gICAgfSk7XG4gIH0sXG59O1xuXG5leHBvcnQgeyBwbGF5ZXIsIGNvbXB1dGVyIH07XG4iLCJjb25zdCBzaGlwRmFjdG9yeSA9IChsZW5ndGgpID0+IHtcbiAgbGV0IGhpdHMgPSAwO1xuICBjb25zdCBpc1N1bmsgPSBmdW5jdGlvbiAoKSB7XG4gICAgLy9jb25zb2xlLmxvZyhgdGhpcy5sZW5ndGggaXM6JHt0aGlzLmxlbmd0aH1gKTtcbiAgICByZXR1cm4gdGhpcy5sZW5ndGggLSB0aGlzLmhpdHMgPT0gMDtcbiAgfTtcbiAgY29uc3QgaGl0ID0gZnVuY3Rpb24gKCkge1xuICAgIHRoaXMuaGl0cysrO1xuICB9O1xuXG4gIHJldHVybiB7IGxlbmd0aCwgaGl0cywgaXNTdW5rLCBoaXQgfTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IHNoaXBGYWN0b3J5O1xuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgZ2FtZWJvYXJkRmFjdG9yeSBmcm9tIFwiLi9nYW1lYm9hcmRGYWN0b3J5XCI7XG5pbXBvcnQgc2hpcEZhY3RvcnkgZnJvbSBcIi4vc2hpcEZhY3RvcnlcIjtcbmltcG9ydCB7IGRvbVJlbmRlckJvYXJkLCBkb21Qb3B1bGF0ZUJvYXJkLCBheGlzQnV0dG9uIH0gZnJvbSBcIi4vZG9tSW50ZXJhY3Rpb25cIjtcbmltcG9ydCB7IGdhbWVMb29wIH0gZnJvbSBcIi4vZ2FtZUxvb3BcIjtcblxuYXhpc0J1dHRvbigpO1xuZ2FtZUxvb3AoKTtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==