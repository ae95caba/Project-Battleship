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
            var audio = new Audio("./shoot-hit.mp3");
            audio.play();
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
  instructions.innerText = "Posiciona tu bote";

  await _players__WEBPACK_IMPORTED_MODULE_2__.player.placeShip(2, "playerBoard", playerBoardObj);
  (0,_domInteraction__WEBPACK_IMPORTED_MODULE_0__.domPopulateBoard)(playerBoardObj, "#playerBoard", true);

  _players__WEBPACK_IMPORTED_MODULE_2__.computer.placeShip(computerBoardObj, 3);
  //console.log(computerBoardObj.fleet);
  instructions.innerText = "Posiciona tu destructor";
  await _players__WEBPACK_IMPORTED_MODULE_2__.player.placeShip(3, "playerBoard", playerBoardObj);
  (0,_domInteraction__WEBPACK_IMPORTED_MODULE_0__.domPopulateBoard)(playerBoardObj, "#playerBoard", true);

  _players__WEBPACK_IMPORTED_MODULE_2__.computer.placeShip(computerBoardObj, 3);
  //console.log(computerBoardObj.fleet);
  instructions.innerText = "Posiciona tu submarino";
  await _players__WEBPACK_IMPORTED_MODULE_2__.player.placeShip(3, "playerBoard", playerBoardObj);
  (0,_domInteraction__WEBPACK_IMPORTED_MODULE_0__.domPopulateBoard)(playerBoardObj, "#playerBoard", true);

  _players__WEBPACK_IMPORTED_MODULE_2__.computer.placeShip(computerBoardObj, 4);
  //console.log(computerBoardObj.fleet);
  instructions.innerText = "Posiciona tu acorazado";
  await _players__WEBPACK_IMPORTED_MODULE_2__.player.placeShip(4, "playerBoard", playerBoardObj);
  (0,_domInteraction__WEBPACK_IMPORTED_MODULE_0__.domPopulateBoard)(playerBoardObj, "#playerBoard", true);

  _players__WEBPACK_IMPORTED_MODULE_2__.computer.placeShip(computerBoardObj, 5);
  //console.log(computerBoardObj.fleet);
  instructions.innerText = "Posiciona tu carguero";
  await _players__WEBPACK_IMPORTED_MODULE_2__.player.placeShip(5, "playerBoard", playerBoardObj);
  (0,_domInteraction__WEBPACK_IMPORTED_MODULE_0__.domPopulateBoard)(playerBoardObj, "#playerBoard", true);

  //3-  We’ll leave the HTML implementation up to you for now, but you should display both the player’s boards and render them using information from the Gameboard class.

  /* domPopulateBoard(playerBoardObj, "#playerBoard");
  domPopulateBoard(computerBoardObj, "#computerBoard", false); */

  // -3-1 You need methods to render the gameboards /done/ and to take user input for attacking/done/. For attacks, let the user click on a coordinate in the enemy Gameboard.
  //-4 The game loop should step through the game turn by turn using only methods from other objects. If at any point you are tempted to write a new function inside the game loop, step back and figure out which class or module that function should belong to.

  //display message !!!
  const logoContainer = document.getElementById("logo-container");
  logoContainer.style.display = "none";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFBcUM7O0FBRXJDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQkFBb0IsNEJBQTRCOztBQUVoRDtBQUNBO0FBQ0EseUJBQXlCLDRCQUE0QjtBQUNyRDtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTCxHQUFHOztBQUVIO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVk7QUFDWjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxRQUFRO0FBQ1I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBLG9FQUFvRTtBQUNwRSwrQkFBK0Isb0VBQThCO0FBQzdEO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsUUFBUTtBQUNSO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLDRCQUE0QjtBQUM1Qjs7QUFFQTtBQUNBLE1BQU0scURBQWU7QUFDckI7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxjQUFjO0FBQ2Q7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLHdFQUF3RTs7QUFFeEU7QUFDQTtBQUNBOztBQUVBLDRFQUE0RTtBQUM1RTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDs7QUFFYzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNsVGQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBOztBQUVBO0FBQ0EsNkRBQTZELEdBQUcsVUFBVSxFQUFFO0FBQzVFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUIsS0FBSzs7QUFFdEI7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTCxHQUFHO0FBQ0g7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0Esa0JBQWtCLFFBQVE7QUFDMUI7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0JBQWtCLFFBQVE7QUFDMUI7QUFDQSw2QkFBNkIsRUFBRTtBQUMvQjs7QUFFQSxvQkFBb0IsWUFBWTtBQUNoQzs7QUFFQSxxQ0FBcUMsRUFBRTtBQUN2QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLGtCQUFrQixRQUFRO0FBQzFCLG9CQUFvQixRQUFRO0FBQzVCO0FBQ0EsV0FBVyxrQkFBa0IsT0FBTyxHQUFHLFVBQVUsRUFBRTtBQUNuRDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWLFVBQVU7QUFDVjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBU0U7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQzlKd0I7QUFDd0I7QUFDTDs7QUFFN0M7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1DQUFtQyxpRUFBZ0I7QUFDbkQsbUNBQW1DLGlFQUFnQjtBQUNuRCxtQ0FBbUMsK0RBQWMsa0JBQWtCO0FBQ25FO0FBQ0EsbUNBQW1DLGlFQUFnQjtBQUNuRDs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxxQ0FBcUMsaUVBQWdCO0FBQ3JEO0FBQ0EscUNBQXFDLCtEQUFjLG9CQUFvQjtBQUN2RSxxQ0FBcUMsaUVBQWdCO0FBQ3JELHFDQUFxQyxpRUFBZ0I7O0FBRXJEO0FBQ0Esc0JBQXNCLGlFQUFnQjtBQUN0QyxpQkFBaUIsMkRBQVU7QUFDM0I7O0FBRUE7QUFDQTtBQUNBOztBQUVBLHlCQUF5Qiw2REFBZ0I7QUFDekMsMkJBQTJCLDZEQUFnQjs7QUFFM0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EseUNBQXlDO0FBQ3pDO0FBQ0EsRUFBRSx3REFBa0I7QUFDcEI7QUFDQTtBQUNBOztBQUVBLFFBQVEsc0RBQWdCO0FBQ3hCLEVBQUUsaUVBQWdCOztBQUVsQixFQUFFLHdEQUFrQjtBQUNwQjtBQUNBO0FBQ0EsUUFBUSxzREFBZ0I7QUFDeEIsRUFBRSxpRUFBZ0I7O0FBRWxCLEVBQUUsd0RBQWtCO0FBQ3BCO0FBQ0E7QUFDQSxRQUFRLHNEQUFnQjtBQUN4QixFQUFFLGlFQUFnQjs7QUFFbEIsRUFBRSx3REFBa0I7QUFDcEI7QUFDQTtBQUNBLFFBQVEsc0RBQWdCO0FBQ3hCLEVBQUUsaUVBQWdCOztBQUVsQixFQUFFLHdEQUFrQjtBQUNwQjtBQUNBO0FBQ0EsUUFBUSxzREFBZ0I7QUFDeEIsRUFBRSxpRUFBZ0I7O0FBRWxCOztBQUVBO0FBQ0EsK0RBQStEOztBQUUvRDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxRQUFRLHdEQUFPOztBQUVmO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVLHdEQUFPO0FBQ2pCLFVBQVUsbURBQWE7QUFDdkI7QUFDQSxJQUFJLGlFQUFnQjtBQUNwQjtBQUNBLFVBQVUsd0RBQU87O0FBRWpCO0FBQ0EsSUFBSSxxREFBZTtBQUNuQixJQUFJLGlFQUFnQjtBQUNwQjtBQUNBOztBQUVBO0FBQ0E7O0FBRW9COzs7Ozs7Ozs7Ozs7Ozs7O0FDbkpvQjs7QUFFeEM7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwwQkFBMEIsd0RBQVc7QUFDckM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDZCQUE2Qix3REFBVztBQUN4QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw4QkFBOEIsd0RBQVc7QUFDekM7QUFDQSxZQUFZO0FBQ1osOEJBQThCLHdEQUFXO0FBQ3pDO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0EsNkJBQTZCLHdEQUFXO0FBQ3hDO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQSxvQkFBb0IsWUFBWTtBQUNoQztBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMEJBQTBCLHdEQUFXO0FBQ3JDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw2QkFBNkIsd0RBQVc7QUFDeEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsOEJBQThCLHdEQUFXO0FBQ3pDO0FBQ0EsWUFBWTtBQUNaLDhCQUE4Qix3REFBVztBQUN6QztBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSw2QkFBNkIsd0RBQVc7QUFDeEM7QUFDQTs7QUFFQTtBQUNBOztBQUVBLG9CQUFvQixZQUFZO0FBQ2hDO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRO0FBQ1I7QUFDQTtBQUNBLE1BQU07QUFDTjs7QUFFQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRO0FBQ1I7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzQkFBc0IsWUFBWTtBQUNsQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxRQUFRO0FBQ1I7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxzQkFBc0IsWUFBWTtBQUNsQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRO0FBQ1I7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRO0FBQ1I7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxpRUFBZSxnQkFBZ0IsRUFBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDak5OO0FBQ3lCOztBQUVuRDtBQUNBLElBQUk7O0FBRUo7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQVE7QUFDUjtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRO0FBQ1I7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7O0FBRUE7QUFDQSxHQUFHO0FBQ0g7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFZO0FBQ1o7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7O0FBRVQsVUFBVTtBQUNWO0FBQ0EsS0FBSztBQUNMLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBWTtBQUNaOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdCQUFnQixnRUFBZTtBQUMvQjtBQUNBLGdCQUFnQjtBQUNoQjtBQUNBO0FBQ0EsY0FBYztBQUNkO0FBQ0E7QUFDQSxnQkFBZ0IsZ0VBQWU7QUFDL0I7QUFDQSxnQkFBZ0I7QUFDaEI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTOztBQUVULFVBQVU7QUFDVjtBQUNBLEtBQUs7QUFDTCxHQUFHO0FBQ0g7O0FBRTRCOzs7Ozs7Ozs7Ozs7Ozs7QUNsTTVCO0FBQ0E7QUFDQTtBQUNBLG9DQUFvQyxZQUFZO0FBQ2hEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsV0FBVztBQUNYOztBQUVBLGlFQUFlLFdBQVcsRUFBQzs7Ozs7OztVQ2IzQjtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7Ozs7Ozs7Ozs7O0FDTmtEO0FBQ1Y7QUFDd0M7QUFDMUM7O0FBRXRDLG1EQUFRIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vcHJvamVjdC1iYXR0bGVzaGlwLy4vc3JjL2FpLmpzIiwid2VicGFjazovL3Byb2plY3QtYmF0dGxlc2hpcC8uL3NyYy9kb21JbnRlcmFjdGlvbi5qcyIsIndlYnBhY2s6Ly9wcm9qZWN0LWJhdHRsZXNoaXAvLi9zcmMvZ2FtZUxvb3AuanMiLCJ3ZWJwYWNrOi8vcHJvamVjdC1iYXR0bGVzaGlwLy4vc3JjL2dhbWVib2FyZEZhY3RvcnkuanMiLCJ3ZWJwYWNrOi8vcHJvamVjdC1iYXR0bGVzaGlwLy4vc3JjL3BsYXllcnMuanMiLCJ3ZWJwYWNrOi8vcHJvamVjdC1iYXR0bGVzaGlwLy4vc3JjL3NoaXBGYWN0b3J5LmpzIiwid2VicGFjazovL3Byb2plY3QtYmF0dGxlc2hpcC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9wcm9qZWN0LWJhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL3Byb2plY3QtYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3Byb2plY3QtYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3Byb2plY3QtYmF0dGxlc2hpcC8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBjb21wdXRlciB9IGZyb20gXCIuL3BsYXllcnNcIjtcblxuY29uc3QgYWkgPSB7XG4gIGNoYXNlTW9kZToge1xuICAgIHdhc1JldmVyc2VBY3RpdmF0ZWQ6IGZhbHNlLFxuICAgIHJldmVyc2VNb2RlOiBmYWxzZSxcbiAgICBzdGF0ZTogZmFsc2UsXG4gICAgY2hhc2VTdWJqZWN0OiB7IHg6IHVuZGVmaW5lZCwgeTogdW5kZWZpbmVkIH0sIC8veCx5XG5cbiAgICB2YWxpZE1vdmVzOiBbXCJsZWZ0XCIsIFwicmlnaHRcIiwgXCJ0b3BcIiwgXCJib3R0b21cIl0sXG4gICAgZm9sbG93RGlyZWN0aW9uOiB1bmRlZmluZWQsXG4gICAgZmlyc3RDaGFzZVN1YmplY3Q6IHsgeDogdW5kZWZpbmVkLCB5OiB1bmRlZmluZWQgfSwgLy9mb3IgcmV2ZXJzZWRcbiAgICBmaXJzdFZhbGlkTW92ZXM6IFtdLCAvL2ZvciByZXZlcnNlZFxuICAgIGZpcnN0RGlyZWN0aW9uOiB1bmRlZmluZWQsXG4gICAgaXNDaGFzaW5nOiBmYWxzZSxcbiAgfSxcbiAgLy90aGlzIHdpbGwgbW9kaWZ5IHRoZSBhcnJheSB2YWxpZE1vdmVzXG4gIGFkZFZhbGlkRGlyZWN0aW9uczogZnVuY3Rpb24gKHBsYXllckJvYXJkT2JqKSB7XG4gICAgdGhpcy5jaGFzZU1vZGUudmFsaWRNb3ZlcyA9IFtdO1xuICAgIGNvbnN0IHBvc2libGVEaXJlY3Rpb25zID0gW1wibGVmdFwiLCBcInJpZ2h0XCIsIFwidG9wXCIsIFwiYm90dG9tXCJdO1xuXG4gICAgLy8gLy9yZW1vdmUgZGlyZWNjdGlvbnMgdGhhdCB3aWxsIGJlIG91dHNpZGUgdGhlIGJvYXJkXG4gICAgc3dpdGNoICh0aGlzLmNoYXNlTW9kZS5jaGFzZVN1YmplY3QueCkge1xuICAgICAgY2FzZSAwOlxuICAgICAgICB7XG4gICAgICAgICAgY29uc3QgaW5kZXggPSBwb3NpYmxlRGlyZWN0aW9ucy5pbmRleE9mKFwibGVmdFwiKTtcblxuICAgICAgICAgIHBvc2libGVEaXJlY3Rpb25zLnNwbGljZShpbmRleCwgMSk7XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIDk6XG4gICAgICAgIHtcbiAgICAgICAgICBjb25zdCBpbmRleCA9IHBvc2libGVEaXJlY3Rpb25zLmluZGV4T2YoXCJyaWdodFwiKTtcblxuICAgICAgICAgIHBvc2libGVEaXJlY3Rpb25zLnNwbGljZShpbmRleCwgMSk7XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG4gICAgfVxuICAgIHN3aXRjaCAodGhpcy5jaGFzZU1vZGUuY2hhc2VTdWJqZWN0LnkpIHtcbiAgICAgIGNhc2UgMDpcbiAgICAgICAge1xuICAgICAgICAgIGNvbnN0IGluZGV4ID0gcG9zaWJsZURpcmVjdGlvbnMuaW5kZXhPZihcInRvcFwiKTtcblxuICAgICAgICAgIHBvc2libGVEaXJlY3Rpb25zLnNwbGljZShpbmRleCwgMSk7XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIDk6XG4gICAgICAgIHtcbiAgICAgICAgICBjb25zdCBpbmRleCA9IHBvc2libGVEaXJlY3Rpb25zLmluZGV4T2YoXCJib3R0b21cIik7XG5cbiAgICAgICAgICBwb3NpYmxlRGlyZWN0aW9ucy5zcGxpY2UoaW5kZXgsIDEpO1xuICAgICAgICB9XG4gICAgICAgIGJyZWFrO1xuICAgIH1cblxuICAgIC8vcmVtb3ZlIHRoZSBkaXJlY3Rpb25zIHRoYXQgbm90IGZvbGxvdyBydWxlc1xuICAgIC8vb25seSBpbiBjaGFzZVN1YmplY3RcbiAgICBwb3NpYmxlRGlyZWN0aW9ucy5mb3JFYWNoKChkaXJlY3Rpb24pID0+IHtcbiAgICAgIGlmIChcbiAgICAgICAgcGxheWVyQm9hcmRPYmouYXR0YWNrUmVzdWx0T25seShcbiAgICAgICAgICB0aGlzLmNvb3JkaW5hdGVzKGRpcmVjdGlvbikueCxcbiAgICAgICAgICB0aGlzLmNvb3JkaW5hdGVzKGRpcmVjdGlvbikueVxuICAgICAgICApICE9PSBcInJlcGV0aWRvXCJcbiAgICAgICkge1xuICAgICAgICB0aGlzLmNoYXNlTW9kZS52YWxpZE1vdmVzLnB1c2goZGlyZWN0aW9uKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfSxcblxuICAvL3BpY2sgYSBkaXJlY3Rpb25cbiAgLy90aGlzIHdpbGwgcmV0dXJuIGEgZGlyZWN0aW9uXG5cbiAgLy8gaWYgaXQgaGFzIDIgY29uc2VjdXRpdmUgaGl0c3tcbiAgLy8ga2VlcCBpbiB0aGUgc3VjY2VzZnVsbCBkaXJlY3Rpb25cbiAgLy9pZiBwb3NpYmxlXG4gIC8vaWYgbm90LCByZXR1cm4gdW5kZWZpbmVkLGEgcmFuZG9tIGRpcmVjdGlvbiB3aWxsIHRyaWdnZXIgbGF0ZXIgaW4gdGhlIGNvZGV9XG4gIC8vZWxzZSBpZiB0aGVyZSB3YXMgb25seSAxIGhpdCB7XG4gIC8vIHBpY2sgYSByYW5kb20gZGlyZWN0aW9uIG9mIHRoZSB2YWxpZCBkaXJlY3Rpb25zIGFycmF5LCBpZiB0aGUgYXJyYXkgaXMgZW1wdHksIGdvIHRvIGEgcmFuZG9tIGRpcmVjdGlvbiBvZiB0aGUgYm9hcmQoYSByYW5kb20gZGlyZWN0aW9uIHdpbGwgdHJpZ2dlciBsYXRlciBpbiB0aGUgY29kZSlcblxuICBkaXJlY3Rpb246IGZ1bmN0aW9uICgpIHtcbiAgICBpZiAodGhpcy5jaGFzZU1vZGUuaXNDaGFzaW5nKSB7XG4gICAgICBpZiAoIXRoaXMuY2hhc2VNb2RlLndhc1JldmVyc2VBY3RpdmF0ZWQpIHtcbiAgICAgICAgaWYgKFxuICAgICAgICAgICF0aGlzLmNoYXNlTW9kZS52YWxpZE1vdmVzLmluY2x1ZGVzKHRoaXMuY2hhc2VNb2RlLmZvbGxvd0RpcmVjdGlvbilcbiAgICAgICAgKSB7XG4gICAgICAgICAgLy90aWxsIGhlcmUgdGhlIGxvZ2kgaXMgZ3JlYXQhXG5cbiAgICAgICAgICAvL2FsZXJ0KFwiYSByYW5kb20gYXR0YWNrIHdpbGwgb2NjdXIgISBCdXQgaXQgc2hvdWxkbnQgIVwiKTtcbiAgICAgICAgICBjb25zb2xlLmxvZyhcImEgcmFuZG9tIGF0dGFjayB3aWxsIG9jY3VyICEgQnV0IGl0IHNob3VsZG50ICFcIik7XG4gICAgICAgICAgLy9hbGVydCh0aGlzLmNoYXNlTW9kZS53YXNSZXZlcnNlQWN0aXZhdGVkKTtcbiAgICAgICAgICBjb25zb2xlLmxvZyh0aGlzLmNoYXNlTW9kZS53YXNSZXZlcnNlQWN0aXZhdGVkKTtcbiAgICAgICAgICAvL3RyeSByZXZlcnNlXG5cbiAgICAgICAgICBsZXQgb3Bvc2l0ZSA9IHVuZGVmaW5lZDtcbiAgICAgICAgICBzd2l0Y2ggKHRoaXMuY2hhc2VNb2RlLmZvbGxvd0RpcmVjdGlvbikge1xuICAgICAgICAgICAgY2FzZSBcImxlZnRcIjpcbiAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIG9wb3NpdGUgPSBcInJpZ2h0XCI7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIFwicmlnaHRcIjpcbiAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIG9wb3NpdGUgPSBcImxlZnRcIjtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgXCJ0b3BcIjpcbiAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIG9wb3NpdGUgPSBcImJvdHRvbVwiO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBcImJvdHRvbVwiOlxuICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgb3Bvc2l0ZSA9IFwidG9wXCI7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmICh0aGlzLmNoYXNlTW9kZS5maXJzdFZhbGlkTW92ZXMuaW5jbHVkZXMob3Bvc2l0ZSkpIHtcbiAgICAgICAgICAgIC8vdXNlIHJldmVyc2VcbiAgICAgICAgICAgIHRoaXMuY2hhc2VNb2RlLndhc1JldmVyc2VBY3RpdmF0ZWQgPSB0cnVlO1xuICAgICAgICAgICAgdGhpcy5jaGFzZU1vZGUuY2hhc2VTdWJqZWN0ID0gdGhpcy5jaGFzZU1vZGUuZmlyc3RDaGFzZVN1YmplY3Q7XG4gICAgICAgICAgICB0aGlzLmNoYXNlTW9kZS5mb2xsb3dEaXJlY3Rpb24gPSBvcG9zaXRlO1xuICAgICAgICAgICAgcmV0dXJuIG9wb3NpdGU7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIC8vYSByYW5kb20gZGlyZWN0aW9uIHdpbGwgdHJpZ2dlciBsYXRlciBpbiB0aGUgY29kZVxuICAgICAgICAgICAgdGhpcy5jaGFzZU1vZGUuc3RhdGUgPSBmYWxzZTtcbiAgICAgICAgICAgIHRoaXMuY2hhc2VNb2RlLmlzQ2hhc2luZyA9IGZhbHNlO1xuICAgICAgICAgICAgLy90aGlzLmNoYXNlTW9kZS53YXNSZXZlcnNlQWN0aXZhdGVkID0gZmFsc2VcbiAgICAgICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuY2hhc2VNb2RlLmlzQ2hhc2luZykge1xuICAgICAgaWYgKHRoaXMuY2hhc2VNb2RlLndhc1JldmVyc2VBY3RpdmF0ZWQpIHtcbiAgICAgICAgaWYgKFxuICAgICAgICAgICF0aGlzLmNoYXNlTW9kZS52YWxpZE1vdmVzLmluY2x1ZGVzKHRoaXMuY2hhc2VNb2RlLmZvbGxvd0RpcmVjdGlvbilcbiAgICAgICAgKSB7XG4gICAgICAgICAgdGhpcy5jaGFzZU1vZGUud2FzUmV2ZXJzZUFjdGl2YXRlZCA9IGZhbHNlO1xuICAgICAgICAgIC8vYWxlcnQoXCJ0aGlzIHNob3VsZCB0cmlnZ2VyIGEgcmFuZG9tIGRpcmVjdGlvbiBidXQgaXQgZG9lc250ICFcIik7XG4gICAgICAgICAgY29uc29sZS5sb2coXCJ0aGlzIHNob3VsZCB0cmlnZ2VyIGEgcmFuZG9tIGRpcmVjdGlvbiBidXQgaXQgZG9lc250ICFcIik7XG4gICAgICAgICAgLy9hbGVydCh0aGlzLmNoYXNlTW9kZS53YXNSZXZlcnNlQWN0aXZhdGVkKTtcbiAgICAgICAgICBjb25zb2xlLmxvZyh0aGlzLmNoYXNlTW9kZS53YXNSZXZlcnNlQWN0aXZhdGVkKTtcbiAgICAgICAgICAvL2EgcmFuZG9tIGRpcmVjdGlvbiB3aWxsIHRyaWdnZXIgbGF0ZXIgaW4gdGhlIGNvZGVcbiAgICAgICAgICB0aGlzLmNoYXNlTW9kZS5zdGF0ZSA9IGZhbHNlO1xuICAgICAgICAgIHRoaXMuY2hhc2VNb2RlLmlzQ2hhc2luZyA9IGZhbHNlO1xuICAgICAgICAgIC8vdGhpcy5jaGFzZU1vZGUud2FzUmV2ZXJzZUFjdGl2YXRlZCA9IGZhbHNlXG5cbiAgICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuY2hhc2VNb2RlLmlzQ2hhc2luZykge1xuICAgICAgaWYgKHRoaXMuY2hhc2VNb2RlLnZhbGlkTW92ZXMuaW5jbHVkZXModGhpcy5jaGFzZU1vZGUuZm9sbG93RGlyZWN0aW9uKSkge1xuICAgICAgICByZXR1cm4gdGhpcy5jaGFzZU1vZGUuZm9sbG93RGlyZWN0aW9uO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy9hIHJhbmRvbSBkaXJlY3Rpb24gd2lsbCB0cmlnZ2VyIGxhdGVyIGluIHRoZSBjb2RlXG4gICAgICAgIHRoaXMuY2hhc2VNb2RlLnN0YXRlID0gZmFsc2U7XG4gICAgICAgIHRoaXMuY2hhc2VNb2RlLmlzQ2hhc2luZyA9IGZhbHNlO1xuICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAodGhpcy5jaGFzZU1vZGUuaXNDaGFzaW5nID09PSBmYWxzZSkge1xuICAgICAgaWYgKHRoaXMuY2hhc2VNb2RlLnZhbGlkTW92ZXMubGVuZ3RoID49IDEpIHtcbiAgICAgICAgdGhpcy5jaGFzZU1vZGUuZmlyc3RWYWxpZE1vdmVzID0gdGhpcy5jaGFzZU1vZGUudmFsaWRNb3ZlczsgLy90aGlzIGlzIGZvciByZXZlcnNlIG1vZGUgbGF0ZXJcbiAgICAgICAgY29uc3QgZGlyZWN0aW9uSW5kZXggPSBjb21wdXRlci5yYW5kb21JbnRGcm9tSW50ZXJ2YWwoXG4gICAgICAgICAgMCxcbiAgICAgICAgICB0aGlzLmNoYXNlTW9kZS52YWxpZE1vdmVzLmxlbmd0aCAtIDFcbiAgICAgICAgKTtcbiAgICAgICAgY29uc3QgZGlyZWN0aW9uID0gdGhpcy5jaGFzZU1vZGUudmFsaWRNb3Zlc1tkaXJlY3Rpb25JbmRleF07XG5cbiAgICAgICAgcmV0dXJuIGRpcmVjdGlvbjtcbiAgICAgIH0gZWxzZSBpZiAodGhpcy5jaGFzZU1vZGUudmFsaWRNb3Zlcy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgdGhpcy5jaGFzZU1vZGUuc3RhdGUgPSBmYWxzZTtcbiAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICAgIH1cbiAgICB9XG4gIH0sXG4gIC8vdHJhbnNmb3JtIGRpcmVjdGlvbiBpbnRvIGNvb3JkaW5hdGVcbiAgLy90aGlzIHdpbGwgcmV0dXJuIGEgY29vcmRpbmF0ZVxuICAvLyB7eCx5fVxuICBjb29yZGluYXRlczogZnVuY3Rpb24gKGRpcmVjdGlvbikge1xuICAgIGlmIChkaXJlY3Rpb24gPT09IHVuZGVmaW5lZCkge1xuICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICB9XG5cbiAgICBzd2l0Y2ggKGRpcmVjdGlvbikge1xuICAgICAgY2FzZSBcImxlZnRcIjoge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIHg6IHRoaXMuY2hhc2VNb2RlLmNoYXNlU3ViamVjdC54IC0gMSxcbiAgICAgICAgICB5OiB0aGlzLmNoYXNlTW9kZS5jaGFzZVN1YmplY3QueSxcbiAgICAgICAgfTtcbiAgICAgIH1cblxuICAgICAgY2FzZSBcInJpZ2h0XCI6IHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICB4OiB0aGlzLmNoYXNlTW9kZS5jaGFzZVN1YmplY3QueCArIDEsXG4gICAgICAgICAgeTogdGhpcy5jaGFzZU1vZGUuY2hhc2VTdWJqZWN0LnksXG4gICAgICAgIH07XG4gICAgICB9XG5cbiAgICAgIGNhc2UgXCJ0b3BcIjpcbiAgICAgICAge1xuICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICB4OiB0aGlzLmNoYXNlTW9kZS5jaGFzZVN1YmplY3QueCxcbiAgICAgICAgICAgIHk6IHRoaXMuY2hhc2VNb2RlLmNoYXNlU3ViamVjdC55IC0gMSxcbiAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBcImJvdHRvbVwiOiB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgeDogdGhpcy5jaGFzZU1vZGUuY2hhc2VTdWJqZWN0LngsXG4gICAgICAgICAgeTogdGhpcy5jaGFzZU1vZGUuY2hhc2VTdWJqZWN0LnkgKyAxLFxuICAgICAgICB9O1xuICAgICAgfVxuICAgIH1cbiAgfSxcblxuICAvL3VzZSB0aGUgbmV3IGNvb3JkaW5hdGUgYW5kIGRpcmVjdGlvblxuXG4gIC8vaWYgbm8gZGlyZWN0aW9uIHdhcyBzZWxlY3RlZFxuICAvL2F0dGFjayBhIHJhbmRvbSBwb3NpdGlvbiBvbiB0aGUgYm9hcmRcblxuICAvL2lmIGEgZGlyZWN0aW9uIHdhcyBzZWxlY3RlZFxuICAvL3RoZXJlIGFyZSAyIGJyYW5jaGVzXG5cbiAgLy9maXJzdCBpZiBpc0NoYXNpblxuICAvL2FuZCBoaXRzIHRoZW4gdXBkYXRlIHRoZSBjaGFzZSBzdWJqZWN0XG5cbiAgLy8gaWYgbWlzc2VzIGFuZCBpdCBpcyAgaW4gcmV2ZXJzZU1vZGVcbiAgLy8gZGlzYWJsZSBjaGFzZWVNb2RlIGFuZCBpdHMgbW9kZXNcblxuICAvL2lmIGl0IHdhcyBub3QgaW4gcmV2ZXJzZSBtb2RlXG4gIC8vIGVuYWJsZSByZXZlcnNlTW9kZVxuICAvL1xuICBhdHRhY2s6IGZ1bmN0aW9uIChwbGF5ZXJCb2FyZE9iaikge1xuICAgIC8vc2F2ZSBkaXJlY3Rpb25cbiAgICBjb25zdCBkaXJlY3Rpb24gPSB0aGlzLmRpcmVjdGlvbigpO1xuXG4gICAgLy9zYXZlIGNvb3JkaW5hdGVzXG4gICAgY29uc3QgY29vcmRpbmF0ZXMgPSB0aGlzLmNvb3JkaW5hdGVzKGRpcmVjdGlvbik7XG5cbiAgICAvL2lmIHRoZSBkaXJlY3Rpb25zIG1ldGhvZCBkaW5kdCByZXR1cm4gYW55IGRpcmVjdGlvbiwgaGVuY2UgY29vcmRpbmF0ZXMgd2lsbCByZXR1cm4gdW5kZWZpbmVkXG4gICAgLy9pZiBubyBpbiByZXZlcnNlIG1vZGV7YXR0YWNrIGluIGEgcmFuZG9tIGRpcmVjdGlvbn1cbiAgICAvL2Vsc2V7fVxuXG4gICAgaWYgKGNvb3JkaW5hdGVzID09PSB1bmRlZmluZWQpIHtcbiAgICAgIGNvbXB1dGVyLmF0dGFjayhwbGF5ZXJCb2FyZE9iaik7XG4gICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgIH1cblxuICAgIGlmICh0aGlzLmNoYXNlTW9kZS5pc0NoYXNpbmcpIHtcbiAgICAgIHN3aXRjaCAocGxheWVyQm9hcmRPYmoucmVjaXZlQXR0YWNrKGNvb3JkaW5hdGVzLngsIGNvb3JkaW5hdGVzLnkpKSB7XG4gICAgICAgIGNhc2UgXCJoaXRcIjpcbiAgICAgICAgICB7XG4gICAgICAgICAgICAvL3VwZGF0ZSBjaGFzZSBzdWJqZWN0XG4gICAgICAgICAgICB0aGlzLmNoYXNlTW9kZS5jaGFzZVN1YmplY3QgPSBjb29yZGluYXRlcztcbiAgICAgICAgICB9XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgXCJtaXNzZWRcIjpcbiAgICAgICAgICB7XG4gICAgICAgICAgICAvL2lmIHJldmVyc2UgbW9kZSB3YXMgbm90IGluIGFjdGl2YXRlZHtcbiAgICAgICAgICAgIC8vc3RhcnQgcmV2ZXJzZU1vZGV9XG4gICAgICAgICAgICAvLy9pZiBpdCB3YXN7XG4gICAgICAgICAgICAvL2VuZCBjaGFzaW5Nb2RlIGFuZCBpdHMgbW9kZXN9XG5cbiAgICAgICAgICAgIGlmICh0aGlzLmNoYXNlTW9kZS53YXNSZXZlcnNlQWN0aXZhdGVkICE9PSB0cnVlKSB7XG4gICAgICAgICAgICAgIHRoaXMuY2hhc2VNb2RlLnJldmVyc2VNb2RlID0gdHJ1ZTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIHRoaXMuY2hhc2VNb2RlLnN0YXRlID0gZmFsc2U7XG4gICAgICAgICAgICAgIHRoaXMuY2hhc2VNb2RlLmlzQ2hhc2luZyA9IGZhbHNlO1xuXG4gICAgICAgICAgICAgIHRoaXMuY2hhc2VNb2RlLmZvbGxvd0RpcmVjdGlvbiA9IHVuZGVmaW5lZDtcbiAgICAgICAgICAgICAgdGhpcy5jaGFzZU1vZGUud2FzUmV2ZXJzZUFjdGl2YXRlZCA9IGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKHRoaXMuY2hhc2VNb2RlLmlzQ2hhc2luZyA9PT0gZmFsc2UpIHtcbiAgICAgIHN3aXRjaCAocGxheWVyQm9hcmRPYmoucmVjaXZlQXR0YWNrKGNvb3JkaW5hdGVzLngsIGNvb3JkaW5hdGVzLnkpKSB7XG4gICAgICAgIGNhc2UgXCJoaXRcIjpcbiAgICAgICAgICB7XG4gICAgICAgICAgICAvL3VwZGF0ZSB0aGUgY2hhc2Ugc3ViamVjdFxuICAgICAgICAgICAgdGhpcy5jaGFzZU1vZGUuY2hhc2VTdWJqZWN0ID0gY29vcmRpbmF0ZXM7XG5cbiAgICAgICAgICAgIC8vc2F2ZSB2YWxpZCBtb3ZlcyBvZiB0aGUgZmlyc3QgY2hhc2Ugc3ViamVjdFxuICAgICAgICAgICAgdGhpcy5jaGFzZU1vZGUuZmlyc3RWYWxpZE1vdmVzID0gdGhpcy5jaGFzZU1vZGUudmFsaWRNb3ZlczsgLy9mb3IgcmV2ZXJzZSAhXG5cbiAgICAgICAgICAgIC8vc3RhcnQgYSBjaGFzaW5nIGRpcmVjdGlvblxuICAgICAgICAgICAgdGhpcy5jaGFzZU1vZGUuZm9sbG93RGlyZWN0aW9uID0gZGlyZWN0aW9uO1xuICAgICAgICAgICAgdGhpcy5jaGFzZU1vZGUuaXNDaGFzaW5nID0gdHJ1ZTtcblxuICAgICAgICAgICAgdGhpcy5jaGFzZU1vZGUuZmlyc3REaXJlY3Rpb24gPSB0aGlzLmNoYXNlTW9kZS5mb2xsb3dEaXJlY3Rpb247IC8vIGZvciByZXZlcnNlZFxuICAgICAgICAgIH1cbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBcIm1pc3NlZFwiOlxuICAgICAgICAgIHtcbiAgICAgICAgICAgIC8vaXQgaXMgbm90IG5lY2VzYXJ5IHRvIGRvIGFueXRoaW5nIGhlcmUgYmVjYXVzZSB0aGUgYWkgd2lsbCBrZWVwIHRyeWluZyB1bnRpbCBpdCBnZXRzIGEgaGl0XG4gICAgICAgICAgICAvLyBhbmQgZXZlcnkgbWlzcyBpcyByZW1vdmVkIGZyb20gdGhlIHZhbGlkIGRpcmVjdGlvbnMgYXJyYXlcbiAgICAgICAgICB9XG4gICAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfVxuICB9LFxufTtcblxuZXhwb3J0IHsgYWkgfTtcbiIsImZ1bmN0aW9uIGF4aXNCdXR0b24oKSB7XG4gIGNvbnN0IGF4aXNCdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xuICBheGlzQnV0dG9uLnR5cGUgPSBcImJ1dHRvblwiO1xuICBheGlzQnV0dG9uLnNldEF0dHJpYnV0ZShcImRhdGEtZGlyZWN0aW9uXCIsIFwiaG9yaXpvbnRhbFwiKTtcbiAgYXhpc0J1dHRvbi5pZCA9IFwiYXhpcy1idXR0b25cIjtcbiAgYXhpc0J1dHRvbi5pbm5lclRleHQgPSBcIkRpcmVjY2lvbjogaG9yaXpvbnRhbFwiO1xuXG4gIGF4aXNCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICBpZiAoYXhpc0J1dHRvbi5kYXRhc2V0LmRpcmVjdGlvbiA9PT0gXCJob3Jpem9udGFsXCIpIHtcbiAgICAgIGF4aXNCdXR0b24uZGF0YXNldC5kaXJlY3Rpb24gPSBcInZlcnRpY2FsXCI7XG4gICAgICBheGlzQnV0dG9uLmlubmVyVGV4dCA9IFwiRGlyZWNjaW9uOiB2ZXJ0aWNhbFwiO1xuICAgIH0gZWxzZSB7XG4gICAgICBheGlzQnV0dG9uLmRhdGFzZXQuZGlyZWN0aW9uID0gXCJob3Jpem9udGFsXCI7XG4gICAgICBheGlzQnV0dG9uLmlubmVyVGV4dCA9IFwiRGlyZWNjaW9uOiBob3Jpem9udGFsXCI7XG4gICAgfVxuICB9KTtcbiAgcmV0dXJuIGF4aXNCdXR0b247XG59XG5cbmZ1bmN0aW9uIGRvbVBsYWNlU2hpcEltZyhsZW5ndGgsIHgsIHksIHBsYXllckJvYXJkT2JqLCBpc3ZlcnRpY2FsID0gZmFsc2UpIHtcbiAgY29uc3QgY29sdW1uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgI3BsYXllckJvYXJkIC5yb3ctJHt5fSAuY29sdW1uLSR7eH1gKTtcbiAgY29uc3QgaW1nID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImltZ1wiKTtcbiAgaW1nLmNsYXNzTGlzdC5hZGQoXCJzaGlwXCIpO1xuICBsZXQgc2hpcDtcbiAgaWYgKGlzdmVydGljYWwpIHtcbiAgICBpbWcuY2xhc3NMaXN0LmFkZChcInZlcnRpY2FsXCIpO1xuICB9XG4gIHN3aXRjaCAobGVuZ3RoKSB7XG4gICAgY2FzZSAyOlxuICAgICAge1xuICAgICAgICBzaGlwID0gXCJwYXRyb2xCb2F0XCI7XG4gICAgICAgIGltZy5pZCA9IFwicGF0cm9sLWJvYXRcIjtcbiAgICAgIH1cbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgMzpcbiAgICAgIHtcbiAgICAgICAgaWYgKCFwbGF5ZXJCb2FyZE9iai5mbGVldC5zdWJtYXJpbmUpIHtcbiAgICAgICAgICBzaGlwID0gXCJkZXN0cm95ZXJcIjtcbiAgICAgICAgICBpbWcuaWQgPSBzaGlwO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHNoaXAgPSBcInN1Ym1hcmluZVwiO1xuICAgICAgICAgIGltZy5pZCA9IHNoaXA7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgNDpcbiAgICAgIHtcbiAgICAgICAgc2hpcCA9IFwiYmF0dGxlc2hpcFwiO1xuICAgICAgICBpbWcuaWQgPSBzaGlwO1xuICAgICAgfVxuICAgICAgYnJlYWs7XG4gICAgY2FzZSA1OlxuICAgICAge1xuICAgICAgICBzaGlwID0gXCJjYXJyaWVyXCI7XG4gICAgICAgIGltZy5pZCA9IHNoaXA7XG4gICAgICB9XG4gICAgICBicmVhaztcbiAgfVxuICBpbWcuc3JjID0gYC4vJHtzaGlwfS5zdmdgO1xuXG4gIGNvbHVtbi5hcHBlbmRDaGlsZChpbWcpO1xufVxuXG4vKiBmdW5jdGlvbiBtZXNzYWdlKG1lc3NhZ2VCb2R5KSB7XG4gIGNvbnN0IGNvbnRlbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImNvbnRlbnRcIik7XG4gIGNvbnN0IGRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gIGRpdi5jbGFzc0xpc3QuYWRkKFwibWVzc2FnZVwiKTtcbiAgZGl2LmlubmVyVGV4dCA9IG1lc3NhZ2VCb2R5O1xuICBjb250ZW50LmFwcGVuZENoaWxkKGRpdik7XG4gIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgIGRpdi5yZW1vdmUoKTtcbiAgfSwgMTAwMCk7XG59XG4gKi9cbmZ1bmN0aW9uIG1lc3NhZ2UobWVzc2FnZUJvZHkpIHtcbiAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlKSA9PiB7XG4gICAgY29uc3QgY29udGVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiY29udGVudFwiKTtcbiAgICBjb25zdCBkaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgIGRpdi5jbGFzc0xpc3QuYWRkKFwibWVzc2FnZVwiKTtcbiAgICBkaXYuaW5uZXJUZXh0ID0gbWVzc2FnZUJvZHk7XG4gICAgY29udGVudC5hcHBlbmRDaGlsZChkaXYpO1xuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgZGl2LnJlbW92ZSgpO1xuICAgICAgcmVzb2x2ZSgpO1xuICAgIH0sIDE1MDApO1xuICB9KTtcbn1cblxuZnVuY3Rpb24gYm9hcmRDb29yZGluYXRlcyhwb3NpdGlvbikge1xuICBsZXQgY2VsbENvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gIGNlbGxDb250YWluZXIuY2xhc3NMaXN0LmFkZChcImNlbGwtY29udGFpbmVyXCIpO1xuXG4gIGNlbGxDb250YWluZXIuY2xhc3NMaXN0LmFkZChwb3NpdGlvbik7XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgMTA7IGkrKykge1xuICAgIGNvbnN0IGNlbGwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgIGNlbGwuaW5uZXJUZXh0ID0gaTtcbiAgICBjZWxsLmNsYXNzTGlzdC5hZGQoXCJjZWxsXCIpO1xuXG4gICAgY2VsbENvbnRhaW5lci5hcHBlbmRDaGlsZChjZWxsKTtcbiAgfVxuICByZXR1cm4gY2VsbENvbnRhaW5lcjtcbn1cblxuZnVuY3Rpb24gZG9tUmVuZGVyQm9hcmQoaWQpIHtcbiAgY29uc3QgYm9hcmQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICBib2FyZC5pZCA9IGlkO1xuICBib2FyZC5jbGFzc0xpc3QuYWRkKFwiYm9hcmRcIik7XG4gIGZvciAobGV0IHIgPSAwOyByIDwgMTA7IHIrKykge1xuICAgIGNvbnN0IHJvdyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgcm93LmNsYXNzTGlzdC5hZGQoYHJvdy0ke3J9YCwgXCJyb3dcIik7XG4gICAgcm93LmRhdGFzZXQueSA9IHI7XG5cbiAgICBmb3IgKGxldCBjID0gMDsgYyA8IDEwID4gMDsgYysrKSB7XG4gICAgICBjb25zdCBjb2x1bW4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuXG4gICAgICBjb2x1bW4uY2xhc3NMaXN0LmFkZChgY29sdW1uLSR7Y31gLCBcImNvbHVtblwiKTtcbiAgICAgIGNvbHVtbi5kYXRhc2V0LnggPSBjO1xuICAgICAgcm93LmFwcGVuZENoaWxkKGNvbHVtbik7XG4gICAgfVxuICAgIGJvYXJkLmFwcGVuZENoaWxkKHJvdyk7XG4gIH1cbiAgcmV0dXJuIGJvYXJkO1xufVxuY29uc3Qgc2hvdE1hcmtlciA9ICgpID0+IHtcbiAgY29uc3Qgc2hvdE1hcmtlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpbWdcIik7XG4gIHNob3RNYXJrZXIuc3JjID0gXCIuL3Nob3QtbWFya2VyLnN2Z1wiO1xuICBzaG90TWFya2VyLmNsYXNzTGlzdC5hZGQoXCJzaG90LW1hcmtlclwiKTtcbiAgcmV0dXJuIHNob3RNYXJrZXI7XG59O1xuXG5mdW5jdGlvbiBkb21Qb3B1bGF0ZUJvYXJkKGJvYXJkT2JqLCBEb21Cb2FyZFNlbGVjdG9yLCBpc1BsYXllckJvYXJkID0gdHJ1ZSkge1xuICBmb3IgKGxldCByID0gMDsgciA8IDEwOyByKyspIHtcbiAgICBmb3IgKGxldCBjID0gMDsgYyA8IDEwOyBjKyspIHtcbiAgICAgIGNvbnN0IGNvbHVtbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXG4gICAgICAgIGAke0RvbUJvYXJkU2VsZWN0b3J9IC5yb3ctJHtyfSAuY29sdW1uLSR7Y31gXG4gICAgICApO1xuXG4gICAgICBpZiAoYm9hcmRPYmouYm9hcmRbcl1bY10gIT09IHVuZGVmaW5lZCkge1xuICAgICAgICBpZiAoYm9hcmRPYmouYm9hcmRbcl1bY10uZGVzdHJveWVkID09PSB0cnVlKSB7XG4gICAgICAgICAgaWYgKGNvbHVtbi5jbGFzc0xpc3QuY29udGFpbnMoXCJoaXR0ZWRcIikgPT09IGZhbHNlKSB7XG4gICAgICAgICAgICBjb2x1bW4uYXBwZW5kKHNob3RNYXJrZXIoKSk7XG4gICAgICAgICAgICBjb2x1bW4uY2xhc3NMaXN0LmFkZChcImhpdHRlZFwiKTtcbiAgICAgICAgICAgIHZhciBhdWRpbyA9IG5ldyBBdWRpbyhcIi4vc2hvb3QtaGl0Lm1wM1wiKTtcbiAgICAgICAgICAgIGF1ZGlvLnBsYXkoKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSBpZiAoYm9hcmRPYmouYm9hcmRbcl1bY10uZGVzdHJveWVkID09PSBmYWxzZSAmJiBpc1BsYXllckJvYXJkKSB7XG4gICAgICAgIH0gZWxzZSBpZiAoYm9hcmRPYmouYm9hcmRbcl1bY10gPT09IFwibWlzc2VkXCIpIHtcbiAgICAgICAgICBpZiAoY29sdW1uLmNsYXNzTGlzdC5jb250YWlucyhcIm1pc3NlZFwiKSA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgIGNvbHVtbi5hcHBlbmQoc2hvdE1hcmtlcigpKTtcbiAgICAgICAgICAgIGNvbHVtbi5jbGFzc0xpc3QuYWRkKFwibWlzc2VkXCIpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxufVxuXG5leHBvcnQge1xuICBtZXNzYWdlLFxuICBkb21SZW5kZXJCb2FyZCxcbiAgZG9tUG9wdWxhdGVCb2FyZCxcbiAgYXhpc0J1dHRvbixcbiAgYm9hcmRDb29yZGluYXRlcyxcbiAgZG9tUGxhY2VTaGlwSW1nLFxufTtcbiIsImltcG9ydCB7XG4gIGRvbVJlbmRlckJvYXJkLFxuICBkb21Qb3B1bGF0ZUJvYXJkLFxuICBib2FyZENvb3JkaW5hdGVzLFxuICBtZXNzYWdlLFxuICBheGlzQnV0dG9uLFxufSBmcm9tIFwiLi9kb21JbnRlcmFjdGlvblwiO1xuaW1wb3J0IGdhbWVib2FyZEZhY3RvcnkgZnJvbSBcIi4vZ2FtZWJvYXJkRmFjdG9yeVwiO1xuaW1wb3J0IHsgY29tcHV0ZXIsIHBsYXllciB9IGZyb20gXCIuL3BsYXllcnNcIjtcblxuYXN5bmMgZnVuY3Rpb24gZ2FtZUxvb3AoKSB7XG4gIC8vMiAtIFRoZSBnYW1lIGxvb3Agc2hvdWxkIHNldCB1cCBhIG5ldyBnYW1lIGJ5IGNyZWF0aW5nIFBsYXllcnMgYW5kIEdhbWVib2FyZHMuIEZvciBub3cganVzdCBwb3B1bGF0ZSBlYWNoIEdhbWVib2FyZCB3aXRoIHByZWRldGVybWluZWQgY29vcmRpbmF0ZXMuIFlvdSBjYW4gaW1wbGVtZW50IGEgc3lzdGVtIGZvciBhbGxvd2luZyBwbGF5ZXJzIHRvIHBsYWNlIHRoZWlyIHNoaXBzIGxhdGVyLlxuXG4gIGNvbnN0IGNvbnRlbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImNvbnRlbnRcIik7XG4gIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cblxuICBjb25zdCBwbGF5ZXJCb2FyZENvbnRhaW5lciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFxuICAgIFwicGxheWVyLWJvYXJkLWNvbnRhaW5lclwiXG4gICk7XG4gIHBsYXllckJvYXJkQ29udGFpbmVyLmFwcGVuZENoaWxkKGJvYXJkQ29vcmRpbmF0ZXMoXCJsZWZ0XCIpKTtcbiAgcGxheWVyQm9hcmRDb250YWluZXIuYXBwZW5kQ2hpbGQoYm9hcmRDb29yZGluYXRlcyhcInRvcFwiKSk7XG4gIHBsYXllckJvYXJkQ29udGFpbmVyLmFwcGVuZENoaWxkKGRvbVJlbmRlckJvYXJkKFwicGxheWVyQm9hcmRcIikpOyAvLyBtYWtlIGVtcHR5IGJvYXJkXG4gIC8vcGxheWVyQm9hcmRDb250YWluZXIuYXBwZW5kQ2hpbGQoYm9hcmRDb29yZGluYXRlcyhcImJvdHRvbVwiKSk7XG4gIHBsYXllckJvYXJkQ29udGFpbmVyLmFwcGVuZENoaWxkKGJvYXJkQ29vcmRpbmF0ZXMoXCJyaWdodFwiKSk7XG4gIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG5cbiAgY29uc3QgY29tcHV0ZXJCb2FyZENvbnRhaW5lciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFxuICAgIFwiY29tcHV0ZXItYm9hcmQtY29udGFpbmVyXCJcbiAgKTtcbiAgY29tcHV0ZXJCb2FyZENvbnRhaW5lci5hcHBlbmRDaGlsZChib2FyZENvb3JkaW5hdGVzKFwibGVmdFwiKSk7XG4gIC8vIGNvbXB1dGVyQm9hcmRDb250YWluZXIuYXBwZW5kQ2hpbGQoYm9hcmRDb29yZGluYXRlcyhcInRvcFwiKSk7XG4gIGNvbXB1dGVyQm9hcmRDb250YWluZXIuYXBwZW5kQ2hpbGQoZG9tUmVuZGVyQm9hcmQoXCJjb21wdXRlckJvYXJkXCIpKTsgLy8gbWFrZSBlbXB0eSBib2FyZFxuICBjb21wdXRlckJvYXJkQ29udGFpbmVyLmFwcGVuZENoaWxkKGJvYXJkQ29vcmRpbmF0ZXMoXCJyaWdodFwiKSk7XG4gIGNvbXB1dGVyQm9hcmRDb250YWluZXIuYXBwZW5kQ2hpbGQoYm9hcmRDb29yZGluYXRlcyhcImJvdHRvbVwiKSk7XG5cbiAgY29udGVudC5hcHBlbmRDaGlsZChwbGF5ZXJCb2FyZENvbnRhaW5lcik7XG4gIGNvbnRlbnQuYXBwZW5kQ2hpbGQoYm9hcmRDb29yZGluYXRlcyhcIm1pZGRsZVwiKSk7XG4gIGNvbnN0IGJvdHRvbiA9IGF4aXNCdXR0b24oKTtcbiAgY29udGVudC5hcHBlbmRDaGlsZChib3R0b24pO1xuXG4gIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG4gIGNvbnRlbnQuYXBwZW5kQ2hpbGQoY29tcHV0ZXJCb2FyZENvbnRhaW5lcik7XG4gIC8vLy8vLy8vLy8vLy8vLy8vXG5cbiAgY29uc3QgcGxheWVyQm9hcmRPYmogPSBnYW1lYm9hcmRGYWN0b3J5KCk7XG4gIGNvbnN0IGNvbXB1dGVyQm9hcmRPYmogPSBnYW1lYm9hcmRGYWN0b3J5KCk7XG5cbiAgLyogcGxheWVyQm9hcmRPYmouYm9hcmRbMV1bMV0gPSBcIm1pc3NlZFwiO1xuICBwbGF5ZXJCb2FyZE9iai5ib2FyZFsxXVsyXSA9IFwibWlzc2VkXCI7XG4gIHBsYXllckJvYXJkT2JqLmJvYXJkWzFdWzNdID0gXCJtaXNzZWRcIjtcbiAgcGxheWVyQm9hcmRPYmouYm9hcmRbMV1bNF0gPSBcIm1pc3NlZFwiO1xuICBwbGF5ZXJCb2FyZE9iai5ib2FyZFsxXVs1XSA9IFwibWlzc2VkXCI7XG4gIHBsYXllckJvYXJkT2JqLmJvYXJkWzFdWzZdID0gXCJtaXNzZWRcIjtcblxuICAvL1xuICBwbGF5ZXJCb2FyZE9iai5ib2FyZFsxXVsxXSA9IFwibWlzc2VkXCI7XG4gIHBsYXllckJvYXJkT2JqLmJvYXJkWzJdWzFdID0gXCJtaXNzZWRcIjtcbiAgcGxheWVyQm9hcmRPYmouYm9hcmRbM11bMV0gPSBcIm1pc3NlZFwiO1xuICBwbGF5ZXJCb2FyZE9iai5ib2FyZFs0XVsxXSA9IFwibWlzc2VkXCI7XG4gIC8vXG4gIHBsYXllckJvYXJkT2JqLmJvYXJkWzFdWzddID0gXCJtaXNzZWRcIjtcbiAgcGxheWVyQm9hcmRPYmouYm9hcmRbMl1bN10gPSBcIm1pc3NlZFwiO1xuICBwbGF5ZXJCb2FyZE9iai5ib2FyZFszXVs3XSA9IFwibWlzc2VkXCI7XG4gIHBsYXllckJvYXJkT2JqLmJvYXJkWzRdWzddID0gXCJtaXNzZWRcIjtcbiAgLy9cblxuICBwbGF5ZXJCb2FyZE9iai5ib2FyZFs1XVsxXSA9IFwibWlzc2VkXCI7XG4gIHBsYXllckJvYXJkT2JqLmJvYXJkWzVdWzJdID0gXCJtaXNzZWRcIjtcbiAgcGxheWVyQm9hcmRPYmouYm9hcmRbNV1bM10gPSBcIm1pc3NlZFwiO1xuICBwbGF5ZXJCb2FyZE9iai5ib2FyZFs1XVs0XSA9IFwibWlzc2VkXCI7XG4gIHBsYXllckJvYXJkT2JqLmJvYXJkWzVdWzVdID0gXCJtaXNzZWRcIjtcbiAgcGxheWVyQm9hcmRPYmouYm9hcmRbNV1bNl0gPSBcIm1pc3NlZFwiO1xuICBwbGF5ZXJCb2FyZE9iai5ib2FyZFs1XVs3XSA9IFwibWlzc2VkXCI7ICovXG4gIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbiAgY29tcHV0ZXIucGxhY2VTaGlwKGNvbXB1dGVyQm9hcmRPYmosIDIpO1xuICAvL2NvbnNvbGUubG9nKGNvbXB1dGVyQm9hcmRPYmouZmxlZXQpO1xuICBjb25zdCBpbnN0cnVjdGlvbnMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImluc3RydWN0aW9uc1wiKTtcbiAgaW5zdHJ1Y3Rpb25zLmlubmVyVGV4dCA9IFwiUG9zaWNpb25hIHR1IGJvdGVcIjtcblxuICBhd2FpdCBwbGF5ZXIucGxhY2VTaGlwKDIsIFwicGxheWVyQm9hcmRcIiwgcGxheWVyQm9hcmRPYmopO1xuICBkb21Qb3B1bGF0ZUJvYXJkKHBsYXllckJvYXJkT2JqLCBcIiNwbGF5ZXJCb2FyZFwiLCB0cnVlKTtcblxuICBjb21wdXRlci5wbGFjZVNoaXAoY29tcHV0ZXJCb2FyZE9iaiwgMyk7XG4gIC8vY29uc29sZS5sb2coY29tcHV0ZXJCb2FyZE9iai5mbGVldCk7XG4gIGluc3RydWN0aW9ucy5pbm5lclRleHQgPSBcIlBvc2ljaW9uYSB0dSBkZXN0cnVjdG9yXCI7XG4gIGF3YWl0IHBsYXllci5wbGFjZVNoaXAoMywgXCJwbGF5ZXJCb2FyZFwiLCBwbGF5ZXJCb2FyZE9iaik7XG4gIGRvbVBvcHVsYXRlQm9hcmQocGxheWVyQm9hcmRPYmosIFwiI3BsYXllckJvYXJkXCIsIHRydWUpO1xuXG4gIGNvbXB1dGVyLnBsYWNlU2hpcChjb21wdXRlckJvYXJkT2JqLCAzKTtcbiAgLy9jb25zb2xlLmxvZyhjb21wdXRlckJvYXJkT2JqLmZsZWV0KTtcbiAgaW5zdHJ1Y3Rpb25zLmlubmVyVGV4dCA9IFwiUG9zaWNpb25hIHR1IHN1Ym1hcmlub1wiO1xuICBhd2FpdCBwbGF5ZXIucGxhY2VTaGlwKDMsIFwicGxheWVyQm9hcmRcIiwgcGxheWVyQm9hcmRPYmopO1xuICBkb21Qb3B1bGF0ZUJvYXJkKHBsYXllckJvYXJkT2JqLCBcIiNwbGF5ZXJCb2FyZFwiLCB0cnVlKTtcblxuICBjb21wdXRlci5wbGFjZVNoaXAoY29tcHV0ZXJCb2FyZE9iaiwgNCk7XG4gIC8vY29uc29sZS5sb2coY29tcHV0ZXJCb2FyZE9iai5mbGVldCk7XG4gIGluc3RydWN0aW9ucy5pbm5lclRleHQgPSBcIlBvc2ljaW9uYSB0dSBhY29yYXphZG9cIjtcbiAgYXdhaXQgcGxheWVyLnBsYWNlU2hpcCg0LCBcInBsYXllckJvYXJkXCIsIHBsYXllckJvYXJkT2JqKTtcbiAgZG9tUG9wdWxhdGVCb2FyZChwbGF5ZXJCb2FyZE9iaiwgXCIjcGxheWVyQm9hcmRcIiwgdHJ1ZSk7XG5cbiAgY29tcHV0ZXIucGxhY2VTaGlwKGNvbXB1dGVyQm9hcmRPYmosIDUpO1xuICAvL2NvbnNvbGUubG9nKGNvbXB1dGVyQm9hcmRPYmouZmxlZXQpO1xuICBpbnN0cnVjdGlvbnMuaW5uZXJUZXh0ID0gXCJQb3NpY2lvbmEgdHUgY2FyZ3Vlcm9cIjtcbiAgYXdhaXQgcGxheWVyLnBsYWNlU2hpcCg1LCBcInBsYXllckJvYXJkXCIsIHBsYXllckJvYXJkT2JqKTtcbiAgZG9tUG9wdWxhdGVCb2FyZChwbGF5ZXJCb2FyZE9iaiwgXCIjcGxheWVyQm9hcmRcIiwgdHJ1ZSk7XG5cbiAgLy8zLSAgV2XigJlsbCBsZWF2ZSB0aGUgSFRNTCBpbXBsZW1lbnRhdGlvbiB1cCB0byB5b3UgZm9yIG5vdywgYnV0IHlvdSBzaG91bGQgZGlzcGxheSBib3RoIHRoZSBwbGF5ZXLigJlzIGJvYXJkcyBhbmQgcmVuZGVyIHRoZW0gdXNpbmcgaW5mb3JtYXRpb24gZnJvbSB0aGUgR2FtZWJvYXJkIGNsYXNzLlxuXG4gIC8qIGRvbVBvcHVsYXRlQm9hcmQocGxheWVyQm9hcmRPYmosIFwiI3BsYXllckJvYXJkXCIpO1xuICBkb21Qb3B1bGF0ZUJvYXJkKGNvbXB1dGVyQm9hcmRPYmosIFwiI2NvbXB1dGVyQm9hcmRcIiwgZmFsc2UpOyAqL1xuXG4gIC8vIC0zLTEgWW91IG5lZWQgbWV0aG9kcyB0byByZW5kZXIgdGhlIGdhbWVib2FyZHMgL2RvbmUvIGFuZCB0byB0YWtlIHVzZXIgaW5wdXQgZm9yIGF0dGFja2luZy9kb25lLy4gRm9yIGF0dGFja3MsIGxldCB0aGUgdXNlciBjbGljayBvbiBhIGNvb3JkaW5hdGUgaW4gdGhlIGVuZW15IEdhbWVib2FyZC5cbiAgLy8tNCBUaGUgZ2FtZSBsb29wIHNob3VsZCBzdGVwIHRocm91Z2ggdGhlIGdhbWUgdHVybiBieSB0dXJuIHVzaW5nIG9ubHkgbWV0aG9kcyBmcm9tIG90aGVyIG9iamVjdHMuIElmIGF0IGFueSBwb2ludCB5b3UgYXJlIHRlbXB0ZWQgdG8gd3JpdGUgYSBuZXcgZnVuY3Rpb24gaW5zaWRlIHRoZSBnYW1lIGxvb3AsIHN0ZXAgYmFjayBhbmQgZmlndXJlIG91dCB3aGljaCBjbGFzcyBvciBtb2R1bGUgdGhhdCBmdW5jdGlvbiBzaG91bGQgYmVsb25nIHRvLlxuXG4gIC8vZGlzcGxheSBtZXNzYWdlICEhIVxuICBjb25zdCBsb2dvQ29udGFpbmVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJsb2dvLWNvbnRhaW5lclwiKTtcbiAgbG9nb0NvbnRhaW5lci5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG4gIGluc3RydWN0aW9ucy5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG5cbiAgY29tcHV0ZXJCb2FyZENvbnRhaW5lci5zdHlsZS5kaXNwbGF5ID0gXCJncmlkXCI7XG4gIGJvdHRvbi5yZW1vdmUoKTtcbiAgYXdhaXQgbWVzc2FnZShcIkVtcGllemEgbGEgYmF0YWxsYS4uLlwiKTtcblxuICBmb3IgKFxuICAgIGxldCB0dXJuID0gMTtcbiAgICAvL0NyZWF0ZSBjb25kaXRpb25zIHNvIHRoYXQgdGhlIGdhbWUgZW5kcyBvbmNlIG9uZSBwbGF5ZXJzIHNoaXBzIGhhdmUgYWxsIGJlZW4gc3Vuay4gVGhpcyBmdW5jdGlvbiBpcyBhcHByb3ByaWF0ZSBmb3IgdGhlIEdhbWUgbW9kdWxlLlxuICAgIGNvbXB1dGVyQm9hcmRPYmouaXNHYW1lT3ZlcigpID09PSBmYWxzZSAmJlxuICAgIHBsYXllckJvYXJkT2JqLmlzR2FtZU92ZXIoKSA9PT0gZmFsc2U7XG4gICAgdHVybisrXG4gICkge1xuICAgIHZhciBhdWRpbyA9IG5ldyBBdWRpbyhcIi4vc2hvb3QubXAzXCIpO1xuICAgIGF3YWl0IG1lc3NhZ2UoXCJFc3BlcmFuZG8gb3JkZW5lcyBjYXBpdGFuIVwiKTtcbiAgICBhd2FpdCBwbGF5ZXIuYXR0YWNrKGNvbXB1dGVyQm9hcmRPYmopO1xuICAgIGF1ZGlvLnBsYXkoKTtcbiAgICBkb21Qb3B1bGF0ZUJvYXJkKGNvbXB1dGVyQm9hcmRPYmosIFwiI2NvbXB1dGVyQm9hcmRcIiwgZmFsc2UpO1xuICAgIGF3YWl0IG5ldyBQcm9taXNlKChyZXNvbHZlKSA9PiBzZXRUaW1lb3V0KHJlc29sdmUsIDEwMDApKTtcbiAgICBhd2FpdCBtZXNzYWdlKFwiQXRhcXVlIGVuZW1pZ28gYXByb3hpbWFuZG9jZVwiKTtcblxuICAgIGF1ZGlvLnBsYXkoKTtcbiAgICBjb21wdXRlci5hdHRhY2socGxheWVyQm9hcmRPYmopO1xuICAgIGRvbVBvcHVsYXRlQm9hcmQocGxheWVyQm9hcmRPYmosIFwiI3BsYXllckJvYXJkXCIpO1xuICAgIGF3YWl0IG5ldyBQcm9taXNlKChyZXNvbHZlKSA9PiBzZXRUaW1lb3V0KHJlc29sdmUsIDEwMDApKTtcbiAgfVxuXG4gIGFsZXJ0KFwiZ2FtZSBvdmVyXCIpO1xufVxuXG5leHBvcnQgeyBnYW1lTG9vcCB9O1xuIiwiaW1wb3J0IHNoaXBGYWN0b3J5IGZyb20gXCIuL3NoaXBGYWN0b3J5XCI7XG5cbmZ1bmN0aW9uIGdhbWVib2FyZEZhY3RvcnkoKSB7XG4gIGxldCBib2FyZCA9IFtbXSwgW10sIFtdLCBbXSwgW10sIFtdLCBbXSwgW10sIFtdLCBbXV07XG4gIGxldCBmbGVldCA9IHt9O1xuXG4gIGNvbnN0IHBsYWNlU2hpcCA9IGZ1bmN0aW9uIChsZW5ndGgsIHgsIHkpIHtcbiAgICBsZXQgY3VycmVudFNoaXA7XG4gICAgc3dpdGNoIChsZW5ndGgpIHtcbiAgICAgIGNhc2UgNTpcbiAgICAgICAge1xuICAgICAgICAgIGZsZWV0LmNhcnJpZXIgPSBzaGlwRmFjdG9yeShsZW5ndGgpO1xuICAgICAgICAgIGN1cnJlbnRTaGlwID0gXCJjYXJyaWVyXCI7XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIDQ6XG4gICAgICAgIHtcbiAgICAgICAgICBmbGVldC5iYXR0bGVzaGlwID0gc2hpcEZhY3RvcnkobGVuZ3RoKTtcbiAgICAgICAgICBjdXJyZW50U2hpcCA9IFwiYmF0dGxlc2hpcFwiO1xuICAgICAgICB9XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAzOlxuICAgICAgICB7XG4gICAgICAgICAgaWYgKCFmbGVldC5kZXN0cm95ZXIpIHtcbiAgICAgICAgICAgIGZsZWV0LmRlc3Ryb3llciA9IHNoaXBGYWN0b3J5KGxlbmd0aCk7XG4gICAgICAgICAgICBjdXJyZW50U2hpcCA9IFwiZGVzdHJveWVyXCI7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGZsZWV0LnN1Ym1hcmluZSA9IHNoaXBGYWN0b3J5KGxlbmd0aCk7XG4gICAgICAgICAgICBjdXJyZW50U2hpcCA9IFwic3VibWFyaW5lXCI7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgYnJlYWs7XG5cbiAgICAgIGNhc2UgMjpcbiAgICAgICAge1xuICAgICAgICAgIGZsZWV0LnBhdHJvbEJvYXQgPSBzaGlwRmFjdG9yeShsZW5ndGgpO1xuICAgICAgICAgIGN1cnJlbnRTaGlwID0gXCJwYXRyb2xCb2F0XCI7XG4gICAgICAgIH1cblxuICAgICAgICBicmVhaztcbiAgICB9XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgICBib2FyZFt5XVsreCArIGldID0ge1xuICAgICAgICBkZXN0cm95ZWQ6IGZhbHNlLFxuXG4gICAgICAgIGhpdDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgIGZsZWV0W2N1cnJlbnRTaGlwXS5oaXQoKTtcbiAgICAgICAgICB0aGlzLmRlc3Ryb3llZCA9IHRydWU7XG4gICAgICAgIH0sXG4gICAgICB9O1xuICAgIH1cbiAgICBjb25zb2xlLmxvZyhmbGVldCk7XG4gIH07XG5cbiAgY29uc3QgcGxhY2VTaGlwVmVydGljYWxseSA9IGZ1bmN0aW9uIChsZW5ndGgsIHgsIHkpIHtcbiAgICBsZXQgY3VycmVudFNoaXA7XG4gICAgc3dpdGNoIChsZW5ndGgpIHtcbiAgICAgIGNhc2UgNTpcbiAgICAgICAge1xuICAgICAgICAgIGZsZWV0LmNhcnJpZXIgPSBzaGlwRmFjdG9yeShsZW5ndGgpO1xuICAgICAgICAgIGN1cnJlbnRTaGlwID0gXCJjYXJyaWVyXCI7XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIDQ6XG4gICAgICAgIHtcbiAgICAgICAgICBmbGVldC5iYXR0bGVzaGlwID0gc2hpcEZhY3RvcnkobGVuZ3RoKTtcbiAgICAgICAgICBjdXJyZW50U2hpcCA9IFwiYmF0dGxlc2hpcFwiO1xuICAgICAgICB9XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAzOlxuICAgICAgICB7XG4gICAgICAgICAgaWYgKCFmbGVldC5kZXN0cm95ZXIpIHtcbiAgICAgICAgICAgIGZsZWV0LmRlc3Ryb3llciA9IHNoaXBGYWN0b3J5KGxlbmd0aCk7XG4gICAgICAgICAgICBjdXJyZW50U2hpcCA9IFwiZGVzdHJveWVyXCI7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGZsZWV0LnN1Ym1hcmluZSA9IHNoaXBGYWN0b3J5KGxlbmd0aCk7XG4gICAgICAgICAgICBjdXJyZW50U2hpcCA9IFwic3VibWFyaW5lXCI7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIC8vZmxlZXQuc3VibWFyaW5lID0gc2hpcEZhY3RvcnkobGVuZ3RoKTtcbiAgICAgICAgYnJlYWs7XG5cbiAgICAgIGNhc2UgMjpcbiAgICAgICAge1xuICAgICAgICAgIGZsZWV0LnBhdHJvbEJvYXQgPSBzaGlwRmFjdG9yeShsZW5ndGgpO1xuICAgICAgICAgIGN1cnJlbnRTaGlwID0gXCJwYXRyb2xCb2F0XCI7XG4gICAgICAgIH1cblxuICAgICAgICBicmVhaztcbiAgICB9XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgICBib2FyZFsreSArIGldW3hdID0ge1xuICAgICAgICBkZXN0cm95ZWQ6IGZhbHNlLFxuXG4gICAgICAgIGhpdDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgIGZsZWV0W2N1cnJlbnRTaGlwXS5oaXQoKTtcbiAgICAgICAgICB0aGlzLmRlc3Ryb3llZCA9IHRydWU7XG4gICAgICAgIH0sXG4gICAgICB9O1xuICAgIH1cbiAgICBjb25zb2xlLmxvZyhmbGVldCk7XG4gIH07XG5cbiAgY29uc3QgcmVjaXZlQXR0YWNrID0gKHgsIHkpID0+IHtcbiAgICBpZiAodHlwZW9mIGJvYXJkW3ldW3hdID09PSBcIm9iamVjdFwiKSB7XG4gICAgICBpZiAoYm9hcmRbeV1beF0uZGVzdHJveWVkID09PSBmYWxzZSkge1xuICAgICAgICBib2FyZFt5XVt4XS5oaXQoKTtcbiAgICAgICAgcmV0dXJuIFwiaGl0XCI7XG4gICAgICB9IGVsc2UgaWYgKGJvYXJkW3ldW3hdLmRlc3Ryb3llZCA9PT0gdHJ1ZSkge1xuICAgICAgICByZXR1cm4gXCJyZXBldGlkb1wiO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAoYm9hcmRbeV1beF0gPT09IHVuZGVmaW5lZCkge1xuICAgICAgYm9hcmRbeV1beF0gPSBcIm1pc3NlZFwiO1xuXG4gICAgICByZXR1cm4gXCJtaXNzZWRcIjtcbiAgICB9IGVsc2UgaWYgKGJvYXJkW3ldW3hdID09PSBcIm1pc3NlZFwiKSB7XG4gICAgICByZXR1cm4gXCJyZXBldGlkb1wiO1xuICAgIH1cbiAgfTtcblxuICBjb25zdCBhdHRhY2tSZXN1bHRPbmx5ID0gKHgsIHkpID0+IHtcbiAgICBpZiAodHlwZW9mIGJvYXJkW3ldW3hdID09PSBcIm9iamVjdFwiKSB7XG4gICAgICBpZiAoYm9hcmRbeV1beF0uZGVzdHJveWVkID09PSBmYWxzZSkge1xuICAgICAgICByZXR1cm4gXCJoaXRcIjtcbiAgICAgIH0gZWxzZSBpZiAoYm9hcmRbeV1beF0uZGVzdHJveWVkID09PSB0cnVlKSB7XG4gICAgICAgIHJldHVybiBcInJlcGV0aWRvXCI7XG4gICAgICB9XG4gICAgfSBlbHNlIGlmIChib2FyZFt5XVt4XSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICByZXR1cm4gXCJtaXNzZWRcIjtcbiAgICB9IGVsc2UgaWYgKGJvYXJkW3ldW3hdID09PSBcIm1pc3NlZFwiKSB7XG4gICAgICByZXR1cm4gXCJyZXBldGlkb1wiO1xuICAgIH1cbiAgfTtcbiAgLy9mb3IgcGxhY2luZ1xuICBjb25zdCB3aWxsRm9sbG93UnVsZXMgPSBmdW5jdGlvbiAobGVuZ3RoLCB4LCB5KSB7XG4gICAgY29uc3Qgd2lsbE92ZXJsYXAgPSBmdW5jdGlvbiAobGVuZ3RoLCB4LCB5KSB7XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKHkpO1xuICAgICAgICBpZiAodHlwZW9mIGJvYXJkW3ldWyt4ICsgaV0gPT09IFwib2JqZWN0XCIpIHtcbiAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH07XG5cbiAgICBjb25zdCB3aWxsT3ZlcmZsb3cgPSBmdW5jdGlvbiAobGVuZ3RoLCB4KSB7XG4gICAgICBpZiAobGVuZ3RoICsgK3ggPiAxMCkge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH0gZWxzZSByZXR1cm4gZmFsc2U7XG4gICAgfTtcbiAgICBpZiAoIXdpbGxPdmVybGFwKGxlbmd0aCwgeCwgeSkgJiYgIXdpbGxPdmVyZmxvdyhsZW5ndGgsIHgpKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgfTtcblxuICAvL2ZvciBwbGFjaW5nXG4gIGNvbnN0IHdpbGxGb2xsb3dSdWxlc1ZlcnRpY2FsbHkgPSBmdW5jdGlvbiAobGVuZ3RoLCB4LCB5KSB7XG4gICAgY29uc3Qgd2lsbE92ZXJsYXAgPSBmdW5jdGlvbiAobGVuZ3RoLCB4LCB5KSB7XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGlmICh0eXBlb2YgYm9hcmRbK3kgKyBpXVt4XSA9PT0gXCJvYmplY3RcIikge1xuICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfTtcblxuICAgIGNvbnN0IHdpbGxPdmVyZmxvdyA9IGZ1bmN0aW9uIChsZW5ndGgsIHkpIHtcbiAgICAgIGNvbnNvbGUubG9nKGxlbmd0aCArICt5ID4gMTApO1xuICAgICAgaWYgKGxlbmd0aCArICt5ID4gMTApIHtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9IGVsc2UgcmV0dXJuIGZhbHNlO1xuICAgIH07XG4gICAgaWYgKCF3aWxsT3ZlcmZsb3cobGVuZ3RoLCB5KSkge1xuICAgICAgaWYgKCF3aWxsT3ZlcmxhcChsZW5ndGgsIHgsIHkpKSB7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgIH1cbiAgfTtcblxuICBjb25zdCBpc0dhbWVPdmVyID0gZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiAoXG4gICAgICB0aGlzLmZsZWV0LmNhcnJpZXIuaXNTdW5rKCkgJiZcbiAgICAgIHRoaXMuZmxlZXQucGF0cm9sQm9hdC5pc1N1bmsoKSAmJlxuICAgICAgdGhpcy5mbGVldC5kZXN0cm95ZXIuaXNTdW5rKCkgJiZcbiAgICAgIHRoaXMuZmxlZXQuYmF0dGxlc2hpcC5pc1N1bmsoKSAmJlxuICAgICAgdGhpcy5mbGVldC5zdWJtYXJpbmUuaXNTdW5rKClcbiAgICApO1xuICB9O1xuXG4gIHJldHVybiB7XG4gICAgYXR0YWNrUmVzdWx0T25seSxcbiAgICBib2FyZCxcbiAgICBmbGVldCxcbiAgICBwbGFjZVNoaXAsXG4gICAgcGxhY2VTaGlwVmVydGljYWxseSxcbiAgICB3aWxsRm9sbG93UnVsZXMsXG4gICAgcmVjaXZlQXR0YWNrLFxuICAgIGlzR2FtZU92ZXIsXG4gICAgd2lsbEZvbGxvd1J1bGVzVmVydGljYWxseSxcbiAgfTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgZ2FtZWJvYXJkRmFjdG9yeTtcbiIsImltcG9ydCB7IGFpIH0gZnJvbSBcIi4vYWlcIjtcbmltcG9ydCB7IGRvbVBsYWNlU2hpcEltZyB9IGZyb20gXCIuL2RvbUludGVyYWN0aW9uXCI7XG5cbmxldCBjb21wdXRlciA9IHtcbiAgYWksXG5cbiAgYXR0YWNrOiBmdW5jdGlvbiAocGxheWVyQm9hcmRPYmopIHtcbiAgICAvL2lmIHJldmVyc2VNb2RlIGlzIHRydWVcbiAgICAvL2NoZWNrIHRvIHNlZSBpZiB0aGUgb3Bvc2l0ZSBkaXJlY3Rpb24gb2YgdGhlIGZvbGxvd0RpcmVjdGlvbi9maXJzdERpcmVjdGlvbiBpcyBpbiB0aGUgZmlyc3RWYWxpZE1vdmVzIGFycmF5e1xuICAgIC8vaWYgaXQgaXMgY2hhZ2UgdGhlIGNoYXNlU3ViamVjdCBhbmQgdGhlIGZvbGxvd0RpcmVjdGlvbn1cbiAgICAvL2Vsc2UgZG9udCBkbyBhbml0aGluZyAodGhlIG5leHQgYXR0YWNrIHdpbGwgYmUgcmFuZG9tKVxuICAgIC8vYWZ0ZXIgYW55IG9mIHRoZSB0d28sIGRpc2FibGUgdGhlIHJldmVyc2VNb2RlIGJlY2F1c2UgaXQgaXMgb25seSBhIG1vZGlmaWVyIGFuZCBpdCBzaG91bGQgbm90IHJ1biBvbiBldmVyeSBhdHRhY2sgb2YgdGhlIHJldmVyc2VkIGNoYXNlXG4gICAgLy8gYW5kIGVuYWJsZSB0aGUgd2FzUmV2ZXJzZUFjdGl2YXRlZCwgYmVjYXN1ZSB0aGUgcmV2ZXJzZU1vZGUgc2hvdWxkIG5vIGJlIHVzZWQgYSBzZWNvbmQgdGltZSBvbiB0aGUgc2FtZSBzdWJqZWN0XG4gICAgaWYgKHRoaXMuYWkuY2hhc2VNb2RlLnJldmVyc2VNb2RlKSB7XG4gICAgICBsZXQgb3Bvc2l0ZSA9IHVuZGVmaW5lZDtcbiAgICAgIHN3aXRjaCAodGhpcy5haS5jaGFzZU1vZGUuZmlyc3REaXJlY3Rpb24pIHtcbiAgICAgICAgY2FzZSBcImxlZnRcIjpcbiAgICAgICAgICB7XG4gICAgICAgICAgICBvcG9zaXRlID0gXCJyaWdodFwiO1xuICAgICAgICAgIH1cbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBcInJpZ2h0XCI6XG4gICAgICAgICAge1xuICAgICAgICAgICAgb3Bvc2l0ZSA9IFwibGVmdFwiO1xuICAgICAgICAgIH1cbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBcInRvcFwiOlxuICAgICAgICAgIHtcbiAgICAgICAgICAgIG9wb3NpdGUgPSBcImJvdHRvbVwiO1xuICAgICAgICAgIH1cbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBcImJvdHRvbVwiOlxuICAgICAgICAgIHtcbiAgICAgICAgICAgIG9wb3NpdGUgPSBcInRvcFwiO1xuICAgICAgICAgIH1cbiAgICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICAgIGlmICh0aGlzLmFpLmNoYXNlTW9kZS5maXJzdFZhbGlkTW92ZXMuaW5jbHVkZXMob3Bvc2l0ZSkpIHtcbiAgICAgICAgdGhpcy5haS5jaGFzZU1vZGUuY2hhc2VTdWJqZWN0ID0gdGhpcy5haS5jaGFzZU1vZGUuZmlyc3RDaGFzZVN1YmplY3Q7XG4gICAgICAgIHRoaXMuYWkuY2hhc2VNb2RlLnN0YXRlID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5haS5jaGFzZU1vZGUuZm9sbG93RGlyZWN0aW9uID0gb3Bvc2l0ZTtcbiAgICAgICAgdGhpcy5haS5jaGFzZU1vZGUuaXNDaGFzaW5nID0gdHJ1ZTtcbiAgICAgICAgLy9hdHRhY2sgb3Bvc2l0ZSBkaXJlY3Rpb24gb2YgY2hhc2VTdWJqZWN0XG4gICAgICAgIC8vZ2V0IGNvb3JkaW5hdGVzIG9mXCIgb3Bvc2l0ZSBcIm9mIGNoYXNlU1ViamVjdFxuICAgICAgfVxuICAgICAgdGhpcy5haS5jaGFzZU1vZGUucmV2ZXJzZU1vZGUgPSBmYWxzZTtcbiAgICAgIHRoaXMuYWkuY2hhc2VNb2RlLndhc1JldmVyc2VBY3RpdmF0ZWQgPSB0cnVlO1xuICAgIH1cblxuICAgIGlmICh0aGlzLmFpLmNoYXNlTW9kZS5zdGF0ZSA9PT0gdHJ1ZSkge1xuICAgICAgdGhpcy5haS5hZGRWYWxpZERpcmVjdGlvbnMocGxheWVyQm9hcmRPYmopO1xuICAgICAgdGhpcy5haS5hdHRhY2socGxheWVyQm9hcmRPYmopO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCB4ID0gdGhpcy5yYW5kb21JbnRGcm9tSW50ZXJ2YWwoMCwgOSk7XG4gICAgICBjb25zdCB5ID0gdGhpcy5yYW5kb21JbnRGcm9tSW50ZXJ2YWwoMCwgOSk7XG4gICAgICAvL2FsZXJ0KFwicmFuZG9tIGRpcmVjdGlvbiBieSBjb21wdXRlci5hdHRhY2tcIik7XG4gICAgICBzd2l0Y2ggKHBsYXllckJvYXJkT2JqLnJlY2l2ZUF0dGFjayh4LCB5KSkge1xuICAgICAgICBjYXNlIFwiaGl0XCI6XG4gICAgICAgICAge1xuICAgICAgICAgICAgdGhpcy5haS5jaGFzZU1vZGUuc3RhdGUgPSB0cnVlO1xuICAgICAgICAgICAgdGhpcy5haS5jaGFzZU1vZGUuY2hhc2VTdWJqZWN0LnggPSB4O1xuICAgICAgICAgICAgdGhpcy5haS5jaGFzZU1vZGUuZmlyc3RDaGFzZVN1YmplY3QueCA9IHg7XG4gICAgICAgICAgICB0aGlzLmFpLmNoYXNlTW9kZS5jaGFzZVN1YmplY3QueSA9IHk7XG4gICAgICAgICAgICB0aGlzLmFpLmNoYXNlTW9kZS5maXJzdENoYXNlU3ViamVjdC55ID0geTtcbiAgICAgICAgICB9XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgXCJtaXNzZWRcIjpcbiAgICAgICAgICB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcImNvbXB1dGVyIG1pc3NlZFwiKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgXCJyZXBldGlkb1wiOlxuICAgICAgICAgIHtcbiAgICAgICAgICAgIGNvbXB1dGVyLmF0dGFjayhwbGF5ZXJCb2FyZE9iaik7XG4gICAgICAgICAgfVxuICAgICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH1cbiAgfSxcbiAgcGxhY2VTaGlwOiBmdW5jdGlvbiAoY29tcHV0ZXJCb2FyZE9iaiwgbGVuZ3RoKSB7XG4gICAgaWYgKHRoaXMucmFuZG9tSW50RnJvbUludGVydmFsKDAsIDEpID09PSAwKSB7XG4gICAgICAvL3BsYWNlc2hpcCBob3Jpem9udGFsbHlcbiAgICAgIGNvbnN0IHggPSB0aGlzLnJhbmRvbUludEZyb21JbnRlcnZhbCgwLCA5KTtcbiAgICAgIGNvbnN0IHkgPSB0aGlzLnJhbmRvbUludEZyb21JbnRlcnZhbCgwLCA5KTtcbiAgICAgIGlmIChjb21wdXRlckJvYXJkT2JqLndpbGxGb2xsb3dSdWxlcyhsZW5ndGgsIHgsIHkpKSB7XG4gICAgICAgIGNvbXB1dGVyQm9hcmRPYmoucGxhY2VTaGlwKGxlbmd0aCwgeCwgeSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLnBsYWNlU2hpcChjb21wdXRlckJvYXJkT2JqLCBsZW5ndGgpO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICAvL3BsYWNlc2hpcCB2ZXJ0aWNhbGx5XG4gICAgICBjb25zdCB4ID0gdGhpcy5yYW5kb21JbnRGcm9tSW50ZXJ2YWwoMCwgOSk7XG4gICAgICBjb25zdCB5ID0gdGhpcy5yYW5kb21JbnRGcm9tSW50ZXJ2YWwoMCwgOSk7XG4gICAgICBpZiAoY29tcHV0ZXJCb2FyZE9iai53aWxsRm9sbG93UnVsZXNWZXJ0aWNhbGx5KGxlbmd0aCwgeCwgeSkpIHtcbiAgICAgICAgY29tcHV0ZXJCb2FyZE9iai5wbGFjZVNoaXBWZXJ0aWNhbGx5KGxlbmd0aCwgeCwgeSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLnBsYWNlU2hpcChjb21wdXRlckJvYXJkT2JqLCBsZW5ndGgpO1xuICAgICAgfVxuICAgIH1cbiAgfSxcbiAgcmFuZG9tSW50RnJvbUludGVydmFsOiBmdW5jdGlvbiAobWluLCBtYXgpIHtcbiAgICAvLyBtaW4gYW5kIG1heCBpbmNsdWRlZFxuXG4gICAgcmV0dXJuIE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIChtYXggLSBtaW4gKyAxKSArIG1pbik7XG4gIH0sXG59O1xuXG5sZXQgcGxheWVyID0ge1xuICBhdHRhY2s6IGZ1bmN0aW9uIChjb21wdXRlckJvYXJkT2JqKSB7XG4gICAgY29uc29sZS5sb2coXCJwbGF5ZXJBdHRhY2sgZnVuY3Rpb25cIik7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIGFzZChyZXNvbHZlKSB7XG4gICAgICBjb25zdCBjb21wdXRlckJvYXJkID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJjb21wdXRlckJvYXJkXCIpO1xuICAgICAgY29tcHV0ZXJCb2FyZC5hZGRFdmVudExpc3RlbmVyKFxuICAgICAgICBcImNsaWNrXCIsXG4gICAgICAgIChlKSA9PiB7XG4gICAgICAgICAgaWYgKFxuICAgICAgICAgICAgZS50YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKFwiYm9hcmRcIikgfHxcbiAgICAgICAgICAgIGUudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucyhcInJvd1wiKVxuICAgICAgICAgICkge1xuICAgICAgICAgICAgYXNkKHJlc29sdmUpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBsZXQgeCA9IGUudGFyZ2V0LmRhdGFzZXQueDtcbiAgICAgICAgICAgIGxldCB5ID0gZS50YXJnZXQucGFyZW50RWxlbWVudC5kYXRhc2V0Lnk7XG5cbiAgICAgICAgICAgIHN3aXRjaCAoY29tcHV0ZXJCb2FyZE9iai5yZWNpdmVBdHRhY2soeCwgeSkpIHtcbiAgICAgICAgICAgICAgY2FzZSBcImhpdFwiOlxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgIHJlc29sdmUoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgIGNhc2UgXCJtaXNzZWRcIjpcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICByZXNvbHZlKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICBjYXNlIFwicmVwZXRpZG9cIjpcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcInJlcGV0aWRvIGludGVudGEgZGVudWV2b1wiKTtcbiAgICAgICAgICAgICAgICAgIGFzZChyZXNvbHZlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9LFxuXG4gICAgICAgIHsgb25jZTogdHJ1ZSB9XG4gICAgICApO1xuICAgIH0pO1xuICB9LFxuICBwbGFjZVNoaXA6IGZ1bmN0aW9uIChsZW5ndGgsIHBsYXllckJvYXJkSWQsIHBsYXllckJvYXJkT2JqKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIGFzZChyZXNvbHZlKSB7XG4gICAgICBjb25zdCBwbGF5ZXJCb2FyZCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHBsYXllckJvYXJkSWQpO1xuICAgICAgcGxheWVyQm9hcmQuYWRkRXZlbnRMaXN0ZW5lcihcbiAgICAgICAgXCJjbGlja1wiLFxuICAgICAgICAoZSkgPT4ge1xuICAgICAgICAgIGlmIChcbiAgICAgICAgICAgIGUudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucyhcImJvYXJkXCIpIHx8XG4gICAgICAgICAgICBlLnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoXCJyb3dcIilcbiAgICAgICAgICApIHtcbiAgICAgICAgICAgIGFzZChyZXNvbHZlKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgbGV0IHggPSBlLnRhcmdldC5kYXRhc2V0Lng7XG5cbiAgICAgICAgICAgIGxldCB5ID0gZS50YXJnZXQucGFyZW50RWxlbWVudC5kYXRhc2V0Lnk7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhlLnRhcmdldCk7XG5cbiAgICAgICAgICAgIGNvbnN0IGF4aXNCdXR0b24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImF4aXMtYnV0dG9uXCIpO1xuICAgICAgICAgICAgaWYgKGF4aXNCdXR0b24uZGF0YXNldC5kaXJlY3Rpb24gPT09IFwiaG9yaXpvbnRhbFwiKSB7XG4gICAgICAgICAgICAgIGlmIChwbGF5ZXJCb2FyZE9iai53aWxsRm9sbG93UnVsZXMobGVuZ3RoLCB4LCB5KSkge1xuICAgICAgICAgICAgICAgIHBsYXllckJvYXJkT2JqLnBsYWNlU2hpcChsZW5ndGgsIHgsIHkpO1xuICAgICAgICAgICAgICAgIC8vZG9tIGZ1bmN0aW9uIHRvIGRpc3BsYXkgYW5kIGltYWdlIG9mIHRoZSBzaGlwXG4gICAgICAgICAgICAgICAgZG9tUGxhY2VTaGlwSW1nKGxlbmd0aCwgeCwgeSwgcGxheWVyQm9hcmRPYmopO1xuICAgICAgICAgICAgICAgIHJlc29sdmUoKTtcbiAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBhc2QocmVzb2x2ZSk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSBpZiAoYXhpc0J1dHRvbi5kYXRhc2V0LmRpcmVjdGlvbiA9PT0gXCJ2ZXJ0aWNhbFwiKSB7XG4gICAgICAgICAgICAgIGlmIChwbGF5ZXJCb2FyZE9iai53aWxsRm9sbG93UnVsZXNWZXJ0aWNhbGx5KGxlbmd0aCwgeCwgeSkpIHtcbiAgICAgICAgICAgICAgICBwbGF5ZXJCb2FyZE9iai5wbGFjZVNoaXBWZXJ0aWNhbGx5KGxlbmd0aCwgeCwgeSk7XG4gICAgICAgICAgICAgICAgZG9tUGxhY2VTaGlwSW1nKGxlbmd0aCwgeCwgeSwgcGxheWVyQm9hcmRPYmosIHRydWUpO1xuICAgICAgICAgICAgICAgIHJlc29sdmUoKTtcbiAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBhc2QocmVzb2x2ZSk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH0sXG5cbiAgICAgICAgeyBvbmNlOiB0cnVlIH1cbiAgICAgICk7XG4gICAgfSk7XG4gIH0sXG59O1xuXG5leHBvcnQgeyBwbGF5ZXIsIGNvbXB1dGVyIH07XG4iLCJjb25zdCBzaGlwRmFjdG9yeSA9IChsZW5ndGgpID0+IHtcbiAgbGV0IGhpdHMgPSAwO1xuICBjb25zdCBpc1N1bmsgPSBmdW5jdGlvbiAoKSB7XG4gICAgLy9jb25zb2xlLmxvZyhgdGhpcy5sZW5ndGggaXM6JHt0aGlzLmxlbmd0aH1gKTtcbiAgICByZXR1cm4gdGhpcy5sZW5ndGggLSB0aGlzLmhpdHMgPT0gMDtcbiAgfTtcbiAgY29uc3QgaGl0ID0gZnVuY3Rpb24gKCkge1xuICAgIHRoaXMuaGl0cysrO1xuICB9O1xuXG4gIHJldHVybiB7IGxlbmd0aCwgaGl0cywgaXNTdW5rLCBoaXQgfTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IHNoaXBGYWN0b3J5O1xuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgZ2FtZWJvYXJkRmFjdG9yeSBmcm9tIFwiLi9nYW1lYm9hcmRGYWN0b3J5XCI7XG5pbXBvcnQgc2hpcEZhY3RvcnkgZnJvbSBcIi4vc2hpcEZhY3RvcnlcIjtcbmltcG9ydCB7IGRvbVJlbmRlckJvYXJkLCBkb21Qb3B1bGF0ZUJvYXJkLCBheGlzQnV0dG9uIH0gZnJvbSBcIi4vZG9tSW50ZXJhY3Rpb25cIjtcbmltcG9ydCB7IGdhbWVMb29wIH0gZnJvbSBcIi4vZ2FtZUxvb3BcIjtcblxuZ2FtZUxvb3AoKTtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==