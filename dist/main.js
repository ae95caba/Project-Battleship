/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/domInteraction.js":
/*!*******************************!*\
  !*** ./src/domInteraction.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "attackWithClick": () => (/* binding */ attackWithClick),
/* harmony export */   "domPopulateBoard": () => (/* binding */ domPopulateBoard),
/* harmony export */   "domRenderBoard": () => (/* binding */ domRenderBoard)
/* harmony export */ });
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




function gameLoop() {
  //2 - The game loop should set up a new game by creating Players and Gameboards. For now just populate each Gameboard with predetermined coordinates. You can implement a system for allowing players to place their ships later.
  const content = document.getElementById("content");
  content.appendChild((0,_domInteraction__WEBPACK_IMPORTED_MODULE_0__.domRenderBoard)("playerBoard")); // make empty board
  content.appendChild((0,_domInteraction__WEBPACK_IMPORTED_MODULE_0__.domRenderBoard)("computerBoard")); // make empty board

  const playerBoardObj = (0,_gameboardFactory__WEBPACK_IMPORTED_MODULE_1__["default"])();
  const computerBoardObj = (0,_gameboardFactory__WEBPACK_IMPORTED_MODULE_1__["default"])();

  playerBoardObj.placeShip(2, 6, 2);
  computerBoardObj.placeShip(2, 6, 2);
  playerBoardObj.placeShip(3, 3, 3);
  computerBoardObj.placeShip(3, 3, 3);
  playerBoardObj.placeShip(4, 4, 5);
  computerBoardObj.placeShip(4, 4, 5);
  playerBoardObj.placeShip(5, 5, 7);
  computerBoardObj.placeShip(5, 5, 7);
  //3-  We’ll leave the HTML implementation up to you for now, but you should display both the player’s boards and render them using information from the Gameboard class.

  (0,_domInteraction__WEBPACK_IMPORTED_MODULE_0__.domPopulateBoard)(playerBoardObj, "#playerBoard");
  (0,_domInteraction__WEBPACK_IMPORTED_MODULE_0__.domPopulateBoard)(computerBoardObj, "#computerBoard", false);

  // -3-1 You need methods to render the gameboards and to take user input for attacking. For attacks, let the user click on a coordinate in the enemy Gameboard.

  actualGameLoop();
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

  const placeShip = (length, x, y) => {
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
      board[y][x + i] = {
        destroyed: false,

        hit: function () {
          fleet[currentShip].hit();
          this.destroyed = true;
        },
      };
    }
  };

  const reciveAttack = (x, y) => {
    //console.log("initializing reciveAtackk method");
    if (typeof board[y][x] === "object") {
      if (board[y][x].destroyed !== true) {
        board[y][x].hit();
      } else {
        return "repetido";
      }
    } else if (board[y][x] === undefined) {
      board[y][x] = "missed";

      /*  missedShoots.push([y, x]);
      console.log(missedShoots); */
    } else {
      return "repetido";
    }
  };

  const isGameOver = function () {
    return (
      this.fleet.carrier.isSunk &&
      this.fleet.patrolBoat.isSunk &&
      this.fleet.destroyer.isSunk &&
      this.fleet.battleship.isSunk
    );
  };

  return { board, fleet, placeShip, reciveAttack, isGameOver };
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
/* harmony export */   "actualGameLoop": () => (/* binding */ actualGameLoop),
/* harmony export */   "computerAttack": () => (/* binding */ computerAttack)
/* harmony export */ });
function computerAttack() {
  function randomIntFromInterval(min, max) {
    // min and max included

    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  const x = randomIntFromInterval(0, 9);
  const y = randomIntFromInterval(0, 9);

  if (playerBoardObj.reciveAttack(x, y) !== "repetido") {
    playerBoardObj.reciveAttack(x, y);
  } else {
    alert("computer repetido");
    computerAttack(playerBoardObj);
  }
}

function actualGameLoop() {
  const computerBoard = document.getElementById("computerBoard");
  computerBoard.addEventListener(
    "click",
    (e) => {
      let x = e.target.dataset.x;
      let y = e.target.parentElement.dataset.y;

      if (computerBoardObj.reciveAttack(x, y) !== "repetido") {
        computerBoardObj.reciveAttack(x, y);

        domPopulateBoard(computerBoardObj, "#computerBoard", false);

        setTimeout(() => {
          computerAttack();
          domPopulateBoard(playerBoardObj, "#playerBoard");
          playerTurn();
        }, 2000);
      } else {
        alert("repetido");
        playerTurn();
      }
    },
    { once: true }
  );
}

function Player() {
  let name = undefined;
  let turn = function (asddf) {
    asdf;
  };
  return { name, turn };
}




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
  const isSunk = length - hits === "0";
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





function computerAttack(boardObj) {
  function randomIntFromInterval(min, max) {
    // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  boardObj.reciveAttack(
    randomIntFromInterval(0, 9),
    randomIntFromInterval(0, 9)
  );
}

(0,_gameLoop__WEBPACK_IMPORTED_MODULE_3__.gameLoop)();

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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LGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7Ozs7Ozs7QUNOa0Q7QUFDVjtBQUM0QjtBQUM5Qjs7QUFFdEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLG1EQUFRIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vcHJvamVjdC1iYXR0bGVzaGlwLy4vc3JjL2RvbUludGVyYWN0aW9uLmpzIiwid2VicGFjazovL3Byb2plY3QtYmF0dGxlc2hpcC8uL3NyYy9nYW1lTG9vcC5qcyIsIndlYnBhY2s6Ly9wcm9qZWN0LWJhdHRsZXNoaXAvLi9zcmMvZ2FtZWJvYXJkRmFjdG9yeS5qcyIsIndlYnBhY2s6Ly9wcm9qZWN0LWJhdHRsZXNoaXAvLi9zcmMvcGxheWVycy5qcyIsIndlYnBhY2s6Ly9wcm9qZWN0LWJhdHRsZXNoaXAvLi9zcmMvc2hpcEZhY3RvcnkuanMiLCJ3ZWJwYWNrOi8vcHJvamVjdC1iYXR0bGVzaGlwL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3Byb2plY3QtYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vcHJvamVjdC1iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vcHJvamVjdC1iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vcHJvamVjdC1iYXR0bGVzaGlwLy4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImZ1bmN0aW9uIGRvbVJlbmRlckJvYXJkKGlkKSB7XG4gIGNvbnN0IGJvYXJkID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgYm9hcmQuaWQgPSBpZDtcbiAgZm9yIChsZXQgciA9IDA7IHIgPCAxMDsgcisrKSB7XG4gICAgY29uc3Qgcm93ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICByb3cuY2xhc3NMaXN0LmFkZChgcm93LSR7cn1gLCBcInJvd1wiKTtcbiAgICByb3cuZGF0YXNldC55ID0gcjtcblxuICAgIGZvciAobGV0IGMgPSAwOyBjIDwgMTAgPiAwOyBjKyspIHtcbiAgICAgIGNvbnN0IGNvbHVtbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG5cbiAgICAgIGNvbHVtbi5jbGFzc0xpc3QuYWRkKGBjb2x1bW4tJHtjfWAsIFwiY29sdW1uXCIpO1xuICAgICAgY29sdW1uLmRhdGFzZXQueCA9IGM7XG4gICAgICByb3cuYXBwZW5kQ2hpbGQoY29sdW1uKTtcbiAgICB9XG4gICAgYm9hcmQuYXBwZW5kQ2hpbGQocm93KTtcbiAgfVxuICByZXR1cm4gYm9hcmQ7XG59XG5cbmZ1bmN0aW9uIGRvbVBvcHVsYXRlQm9hcmQoYm9hcmRPYmosIERvbUJvYXJkU2VsZWN0b3IsIGlzUGxheWVyQm9hcmQgPSB0cnVlKSB7XG4gIGZvciAobGV0IHIgPSAwOyByIDwgMTA7IHIrKykge1xuICAgIC8vY29uc3Qgcm93MUNvbHVtbnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKGAucm93LSR7Y30gLmNvbHVtbi0ke2l9YCk7XG4gICAgZm9yIChsZXQgYyA9IDA7IGMgPCAxMDsgYysrKSB7XG4gICAgICBjb25zdCBjb2x1bW4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFxuICAgICAgICBgJHtEb21Cb2FyZFNlbGVjdG9yfSAucm93LSR7cn0gLmNvbHVtbi0ke2N9YFxuICAgICAgKTtcblxuICAgICAgaWYgKGJvYXJkT2JqLmJvYXJkW3JdW2NdICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgaWYgKGJvYXJkT2JqLmJvYXJkW3JdW2NdLmRlc3Ryb3llZCA9PT0gdHJ1ZSkge1xuICAgICAgICAgIGNvbHVtbi5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSBcInJlZFwiO1xuICAgICAgICB9IGVsc2UgaWYgKGJvYXJkT2JqLmJvYXJkW3JdW2NdLmRlc3Ryb3llZCA9PT0gZmFsc2UgJiYgaXNQbGF5ZXJCb2FyZCkge1xuICAgICAgICAgIGNvbHVtbi5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSBcImdyZWVuXCI7XG4gICAgICAgIH0gZWxzZSBpZiAoYm9hcmRPYmouYm9hcmRbcl1bY10gPT09IFwibWlzc2VkXCIpIHtcbiAgICAgICAgICBjb2x1bW4uc3R5bGUuYmFja2dyb3VuZENvbG9yID0gXCJncmV5XCI7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cblxuZnVuY3Rpb24gYXR0YWNrV2l0aENsaWNrKGRvbUJvYXJkLCBvYmpCb2FyZCkge1xuICBkb21Cb2FyZC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGUpID0+IHtcbiAgICBsZXQgeSA9IGUudGFyZ2V0O1xuICAgIGxldCB4ID0gZS50YXJnZXQucGFyZW50RWxlbWVudDtcbiAgfSk7XG4gIGlmIChvYmpCb2FyZC5ib2FyZFt4XVt5XSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgaWYgKG9iakJvYXJkLmJvYXJkW3hdW3ldLmRlc3Ryb3llZCA9PT0gZmFsc2UpIHtcbiAgICAgIG9iakJvYXJkLmJvYXJkW3hdW3ldLmRlc3Ryb3llZCA9IHRydWU7XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIG9iakJvYXJkLmJvYXJkW3hdW3ldID0gXCJtaXNzZWRcIjtcbiAgfVxufVxuXG5leHBvcnQgeyBkb21SZW5kZXJCb2FyZCwgZG9tUG9wdWxhdGVCb2FyZCwgYXR0YWNrV2l0aENsaWNrIH07XG4iLCJpbXBvcnQge1xuICBkb21SZW5kZXJCb2FyZCxcbiAgZG9tUG9wdWxhdGVCb2FyZCxcbiAgYXR0YWNrV2l0aENsaWNrLFxufSBmcm9tIFwiLi9kb21JbnRlcmFjdGlvblwiO1xuaW1wb3J0IGdhbWVib2FyZEZhY3RvcnkgZnJvbSBcIi4vZ2FtZWJvYXJkRmFjdG9yeVwiO1xuaW1wb3J0IHsgY29tcHV0ZXJBdHRhY2ssIHBsYXllclR1cm4gfSBmcm9tIFwiLi9wbGF5ZXJzXCI7XG5cbmZ1bmN0aW9uIGdhbWVMb29wKCkge1xuICAvLzIgLSBUaGUgZ2FtZSBsb29wIHNob3VsZCBzZXQgdXAgYSBuZXcgZ2FtZSBieSBjcmVhdGluZyBQbGF5ZXJzIGFuZCBHYW1lYm9hcmRzLiBGb3Igbm93IGp1c3QgcG9wdWxhdGUgZWFjaCBHYW1lYm9hcmQgd2l0aCBwcmVkZXRlcm1pbmVkIGNvb3JkaW5hdGVzLiBZb3UgY2FuIGltcGxlbWVudCBhIHN5c3RlbSBmb3IgYWxsb3dpbmcgcGxheWVycyB0byBwbGFjZSB0aGVpciBzaGlwcyBsYXRlci5cbiAgY29uc3QgY29udGVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiY29udGVudFwiKTtcbiAgY29udGVudC5hcHBlbmRDaGlsZChkb21SZW5kZXJCb2FyZChcInBsYXllckJvYXJkXCIpKTsgLy8gbWFrZSBlbXB0eSBib2FyZFxuICBjb250ZW50LmFwcGVuZENoaWxkKGRvbVJlbmRlckJvYXJkKFwiY29tcHV0ZXJCb2FyZFwiKSk7IC8vIG1ha2UgZW1wdHkgYm9hcmRcblxuICBjb25zdCBwbGF5ZXJCb2FyZE9iaiA9IGdhbWVib2FyZEZhY3RvcnkoKTtcbiAgY29uc3QgY29tcHV0ZXJCb2FyZE9iaiA9IGdhbWVib2FyZEZhY3RvcnkoKTtcblxuICBwbGF5ZXJCb2FyZE9iai5wbGFjZVNoaXAoMiwgNiwgMik7XG4gIGNvbXB1dGVyQm9hcmRPYmoucGxhY2VTaGlwKDIsIDYsIDIpO1xuICBwbGF5ZXJCb2FyZE9iai5wbGFjZVNoaXAoMywgMywgMyk7XG4gIGNvbXB1dGVyQm9hcmRPYmoucGxhY2VTaGlwKDMsIDMsIDMpO1xuICBwbGF5ZXJCb2FyZE9iai5wbGFjZVNoaXAoNCwgNCwgNSk7XG4gIGNvbXB1dGVyQm9hcmRPYmoucGxhY2VTaGlwKDQsIDQsIDUpO1xuICBwbGF5ZXJCb2FyZE9iai5wbGFjZVNoaXAoNSwgNSwgNyk7XG4gIGNvbXB1dGVyQm9hcmRPYmoucGxhY2VTaGlwKDUsIDUsIDcpO1xuICAvLzMtICBXZeKAmWxsIGxlYXZlIHRoZSBIVE1MIGltcGxlbWVudGF0aW9uIHVwIHRvIHlvdSBmb3Igbm93LCBidXQgeW91IHNob3VsZCBkaXNwbGF5IGJvdGggdGhlIHBsYXllcuKAmXMgYm9hcmRzIGFuZCByZW5kZXIgdGhlbSB1c2luZyBpbmZvcm1hdGlvbiBmcm9tIHRoZSBHYW1lYm9hcmQgY2xhc3MuXG5cbiAgZG9tUG9wdWxhdGVCb2FyZChwbGF5ZXJCb2FyZE9iaiwgXCIjcGxheWVyQm9hcmRcIik7XG4gIGRvbVBvcHVsYXRlQm9hcmQoY29tcHV0ZXJCb2FyZE9iaiwgXCIjY29tcHV0ZXJCb2FyZFwiLCBmYWxzZSk7XG5cbiAgLy8gLTMtMSBZb3UgbmVlZCBtZXRob2RzIHRvIHJlbmRlciB0aGUgZ2FtZWJvYXJkcyBhbmQgdG8gdGFrZSB1c2VyIGlucHV0IGZvciBhdHRhY2tpbmcuIEZvciBhdHRhY2tzLCBsZXQgdGhlIHVzZXIgY2xpY2sgb24gYSBjb29yZGluYXRlIGluIHRoZSBlbmVteSBHYW1lYm9hcmQuXG5cbiAgYWN0dWFsR2FtZUxvb3AoKTtcbn1cblxuZXhwb3J0IHsgZ2FtZUxvb3AgfTtcbiIsImltcG9ydCBzaGlwRmFjdG9yeSBmcm9tIFwiLi9zaGlwRmFjdG9yeVwiO1xuXG5mdW5jdGlvbiBnYW1lYm9hcmRGYWN0b3J5KCkge1xuICBsZXQgYm9hcmQgPSBbW10sIFtdLCBbXSwgW10sIFtdLCBbXSwgW10sIFtdLCBbXSwgW11dO1xuICBsZXQgZmxlZXQgPSB7fTtcbiAgbGV0IG1pc3NlZFNob290cyA9IFtdO1xuXG4gIGNvbnN0IHBsYWNlU2hpcCA9IChsZW5ndGgsIHgsIHkpID0+IHtcbiAgICBsZXQgY3VycmVudFNoaXA7XG4gICAgc3dpdGNoIChsZW5ndGgpIHtcbiAgICAgIGNhc2UgNTpcbiAgICAgICAge1xuICAgICAgICAgIGZsZWV0LmNhcnJpZXIgPSBzaGlwRmFjdG9yeShsZW5ndGgpO1xuICAgICAgICAgIGN1cnJlbnRTaGlwID0gXCJjYXJyaWVyXCI7XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIDQ6XG4gICAgICAgIHtcbiAgICAgICAgICBmbGVldC5iYXR0bGVzaGlwID0gc2hpcEZhY3RvcnkobGVuZ3RoKTtcbiAgICAgICAgICBjdXJyZW50U2hpcCA9IFwiYmF0dGxlc2hpcFwiO1xuICAgICAgICB9XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAzOlxuICAgICAgICB7XG4gICAgICAgICAgZmxlZXQuZGVzdHJveWVyID0gc2hpcEZhY3RvcnkobGVuZ3RoKTtcbiAgICAgICAgICBjdXJyZW50U2hpcCA9IFwiZGVzdHJveWVyXCI7XG4gICAgICAgIH1cbiAgICAgICAgLy9mbGVldC5zdWJtYXJpbmUgPSBzaGlwRmFjdG9yeShsZW5ndGgpO1xuICAgICAgICBicmVhaztcblxuICAgICAgY2FzZSAyOlxuICAgICAgICB7XG4gICAgICAgICAgZmxlZXQucGF0cm9sQm9hdCA9IHNoaXBGYWN0b3J5KGxlbmd0aCk7XG4gICAgICAgICAgY3VycmVudFNoaXAgPSBcInBhdHJvbEJvYXRcIjtcbiAgICAgICAgfVxuXG4gICAgICAgIGJyZWFrO1xuICAgIH1cblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICAgIGJvYXJkW3ldW3ggKyBpXSA9IHtcbiAgICAgICAgZGVzdHJveWVkOiBmYWxzZSxcblxuICAgICAgICBoaXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICBmbGVldFtjdXJyZW50U2hpcF0uaGl0KCk7XG4gICAgICAgICAgdGhpcy5kZXN0cm95ZWQgPSB0cnVlO1xuICAgICAgICB9LFxuICAgICAgfTtcbiAgICB9XG4gIH07XG5cbiAgY29uc3QgcmVjaXZlQXR0YWNrID0gKHgsIHkpID0+IHtcbiAgICAvL2NvbnNvbGUubG9nKFwiaW5pdGlhbGl6aW5nIHJlY2l2ZUF0YWNrayBtZXRob2RcIik7XG4gICAgaWYgKHR5cGVvZiBib2FyZFt5XVt4XSA9PT0gXCJvYmplY3RcIikge1xuICAgICAgaWYgKGJvYXJkW3ldW3hdLmRlc3Ryb3llZCAhPT0gdHJ1ZSkge1xuICAgICAgICBib2FyZFt5XVt4XS5oaXQoKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBcInJlcGV0aWRvXCI7XG4gICAgICB9XG4gICAgfSBlbHNlIGlmIChib2FyZFt5XVt4XSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICBib2FyZFt5XVt4XSA9IFwibWlzc2VkXCI7XG5cbiAgICAgIC8qICBtaXNzZWRTaG9vdHMucHVzaChbeSwgeF0pO1xuICAgICAgY29uc29sZS5sb2cobWlzc2VkU2hvb3RzKTsgKi9cbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIFwicmVwZXRpZG9cIjtcbiAgICB9XG4gIH07XG5cbiAgY29uc3QgaXNHYW1lT3ZlciA9IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gKFxuICAgICAgdGhpcy5mbGVldC5jYXJyaWVyLmlzU3VuayAmJlxuICAgICAgdGhpcy5mbGVldC5wYXRyb2xCb2F0LmlzU3VuayAmJlxuICAgICAgdGhpcy5mbGVldC5kZXN0cm95ZXIuaXNTdW5rICYmXG4gICAgICB0aGlzLmZsZWV0LmJhdHRsZXNoaXAuaXNTdW5rXG4gICAgKTtcbiAgfTtcblxuICByZXR1cm4geyBib2FyZCwgZmxlZXQsIHBsYWNlU2hpcCwgcmVjaXZlQXR0YWNrLCBpc0dhbWVPdmVyIH07XG59XG5cbmV4cG9ydCBkZWZhdWx0IGdhbWVib2FyZEZhY3Rvcnk7XG4iLCJmdW5jdGlvbiBjb21wdXRlckF0dGFjaygpIHtcbiAgZnVuY3Rpb24gcmFuZG9tSW50RnJvbUludGVydmFsKG1pbiwgbWF4KSB7XG4gICAgLy8gbWluIGFuZCBtYXggaW5jbHVkZWRcblxuICAgIHJldHVybiBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAobWF4IC0gbWluICsgMSkgKyBtaW4pO1xuICB9XG5cbiAgY29uc3QgeCA9IHJhbmRvbUludEZyb21JbnRlcnZhbCgwLCA5KTtcbiAgY29uc3QgeSA9IHJhbmRvbUludEZyb21JbnRlcnZhbCgwLCA5KTtcblxuICBpZiAocGxheWVyQm9hcmRPYmoucmVjaXZlQXR0YWNrKHgsIHkpICE9PSBcInJlcGV0aWRvXCIpIHtcbiAgICBwbGF5ZXJCb2FyZE9iai5yZWNpdmVBdHRhY2soeCwgeSk7XG4gIH0gZWxzZSB7XG4gICAgYWxlcnQoXCJjb21wdXRlciByZXBldGlkb1wiKTtcbiAgICBjb21wdXRlckF0dGFjayhwbGF5ZXJCb2FyZE9iaik7XG4gIH1cbn1cblxuZnVuY3Rpb24gYWN0dWFsR2FtZUxvb3AoKSB7XG4gIGNvbnN0IGNvbXB1dGVyQm9hcmQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImNvbXB1dGVyQm9hcmRcIik7XG4gIGNvbXB1dGVyQm9hcmQuYWRkRXZlbnRMaXN0ZW5lcihcbiAgICBcImNsaWNrXCIsXG4gICAgKGUpID0+IHtcbiAgICAgIGxldCB4ID0gZS50YXJnZXQuZGF0YXNldC54O1xuICAgICAgbGV0IHkgPSBlLnRhcmdldC5wYXJlbnRFbGVtZW50LmRhdGFzZXQueTtcblxuICAgICAgaWYgKGNvbXB1dGVyQm9hcmRPYmoucmVjaXZlQXR0YWNrKHgsIHkpICE9PSBcInJlcGV0aWRvXCIpIHtcbiAgICAgICAgY29tcHV0ZXJCb2FyZE9iai5yZWNpdmVBdHRhY2soeCwgeSk7XG5cbiAgICAgICAgZG9tUG9wdWxhdGVCb2FyZChjb21wdXRlckJvYXJkT2JqLCBcIiNjb21wdXRlckJvYXJkXCIsIGZhbHNlKTtcblxuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICBjb21wdXRlckF0dGFjaygpO1xuICAgICAgICAgIGRvbVBvcHVsYXRlQm9hcmQocGxheWVyQm9hcmRPYmosIFwiI3BsYXllckJvYXJkXCIpO1xuICAgICAgICAgIHBsYXllclR1cm4oKTtcbiAgICAgICAgfSwgMjAwMCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBhbGVydChcInJlcGV0aWRvXCIpO1xuICAgICAgICBwbGF5ZXJUdXJuKCk7XG4gICAgICB9XG4gICAgfSxcbiAgICB7IG9uY2U6IHRydWUgfVxuICApO1xufVxuXG5mdW5jdGlvbiBQbGF5ZXIoKSB7XG4gIGxldCBuYW1lID0gdW5kZWZpbmVkO1xuICBsZXQgdHVybiA9IGZ1bmN0aW9uIChhc2RkZikge1xuICAgIGFzZGY7XG4gIH07XG4gIHJldHVybiB7IG5hbWUsIHR1cm4gfTtcbn1cblxuZXhwb3J0IHsgY29tcHV0ZXJBdHRhY2ssIGFjdHVhbEdhbWVMb29wIH07XG4iLCJjb25zdCBzaGlwRmFjdG9yeSA9IChsZW5ndGgpID0+IHtcbiAgbGV0IGhpdHMgPSAwO1xuICBjb25zdCBpc1N1bmsgPSBsZW5ndGggLSBoaXRzID09PSBcIjBcIjtcbiAgY29uc3QgaGl0ID0gZnVuY3Rpb24gKCkge1xuICAgIHRoaXMuaGl0cysrO1xuICB9O1xuXG4gIHJldHVybiB7IGxlbmd0aCwgaGl0cywgaXNTdW5rLCBoaXQgfTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IHNoaXBGYWN0b3J5O1xuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgZ2FtZWJvYXJkRmFjdG9yeSBmcm9tIFwiLi9nYW1lYm9hcmRGYWN0b3J5XCI7XG5pbXBvcnQgc2hpcEZhY3RvcnkgZnJvbSBcIi4vc2hpcEZhY3RvcnlcIjtcbmltcG9ydCB7IGRvbVJlbmRlckJvYXJkLCBkb21Qb3B1bGF0ZUJvYXJkIH0gZnJvbSBcIi4vZG9tSW50ZXJhY3Rpb25cIjtcbmltcG9ydCB7IGdhbWVMb29wIH0gZnJvbSBcIi4vZ2FtZUxvb3BcIjtcblxuZnVuY3Rpb24gY29tcHV0ZXJBdHRhY2soYm9hcmRPYmopIHtcbiAgZnVuY3Rpb24gcmFuZG9tSW50RnJvbUludGVydmFsKG1pbiwgbWF4KSB7XG4gICAgLy8gbWluIGFuZCBtYXggaW5jbHVkZWRcbiAgICByZXR1cm4gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogKG1heCAtIG1pbiArIDEpICsgbWluKTtcbiAgfVxuXG4gIGJvYXJkT2JqLnJlY2l2ZUF0dGFjayhcbiAgICByYW5kb21JbnRGcm9tSW50ZXJ2YWwoMCwgOSksXG4gICAgcmFuZG9tSW50RnJvbUludGVydmFsKDAsIDkpXG4gICk7XG59XG5cbmdhbWVMb29wKCk7XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=