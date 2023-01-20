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



function gameLoop() {
  //computerAttack(player1board);

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

  function computerAttack(boardObj) {
    function randomIntFromInterval(min, max) {
      // min and max included

      return Math.floor(Math.random() * (max - min + 1) + min);
    }

    const x = randomIntFromInterval(0, 9);
    const y = randomIntFromInterval(0, 9);

    if (boardObj.reciveAttack(x, y) !== "repetido") {
      boardObj.reciveAttack(x, y);
    } else {
      alert("computer repetido");
      computerAttack(boardObj);
    }
  }

  function playerTurn() {
    const computerBoard = document.getElementById("computerBoard");
    //const playerBoard = document.getElementById("playerBoard");
    computerBoard.addEventListener(
      "click",
      (e) => {
        let x = e.target.dataset.x;
        let y = e.target.parentElement.dataset.y;

        if (computerBoardObj.reciveAttack(x, y) !== "repetido") {
          computerBoardObj.reciveAttack(x, y);
          (0,_domInteraction__WEBPACK_IMPORTED_MODULE_0__.domPopulateBoard)(computerBoardObj, "#computerBoard", false);

          if (!computerBoardObj.isGameOver()) {
            setTimeout(() => {
              computerAttack(playerBoardObj);
              (0,_domInteraction__WEBPACK_IMPORTED_MODULE_0__.domPopulateBoard)(playerBoardObj, "#playerBoard");
              playerTurn();
            }, 2000);
          } else {
            console.log("game over");
          }
        } else {
          alert("repetido");
          playerTurn();
        }
      },
      { once: true }
    );
  }
  playerTurn();
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

  return { board, fleet, placeShip, reciveAttack, missedShoots, isGameOver };
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (gameboardFactory);


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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7Ozs7Ozs7QUNOa0Q7QUFDVjtBQUM0QjtBQUM5Qjs7QUFFdEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLG1EQUFRIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vcHJvamVjdC1iYXR0bGVzaGlwLy4vc3JjL2RvbUludGVyYWN0aW9uLmpzIiwid2VicGFjazovL3Byb2plY3QtYmF0dGxlc2hpcC8uL3NyYy9nYW1lTG9vcC5qcyIsIndlYnBhY2s6Ly9wcm9qZWN0LWJhdHRsZXNoaXAvLi9zcmMvZ2FtZWJvYXJkRmFjdG9yeS5qcyIsIndlYnBhY2s6Ly9wcm9qZWN0LWJhdHRsZXNoaXAvLi9zcmMvc2hpcEZhY3RvcnkuanMiLCJ3ZWJwYWNrOi8vcHJvamVjdC1iYXR0bGVzaGlwL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3Byb2plY3QtYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vcHJvamVjdC1iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vcHJvamVjdC1iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vcHJvamVjdC1iYXR0bGVzaGlwLy4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImZ1bmN0aW9uIGRvbVJlbmRlckJvYXJkKGlkKSB7XG4gIGNvbnN0IGJvYXJkID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgYm9hcmQuaWQgPSBpZDtcbiAgZm9yIChsZXQgciA9IDA7IHIgPCAxMDsgcisrKSB7XG4gICAgY29uc3Qgcm93ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICByb3cuY2xhc3NMaXN0LmFkZChgcm93LSR7cn1gLCBcInJvd1wiKTtcbiAgICByb3cuZGF0YXNldC55ID0gcjtcblxuICAgIGZvciAobGV0IGMgPSAwOyBjIDwgMTAgPiAwOyBjKyspIHtcbiAgICAgIGNvbnN0IGNvbHVtbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG5cbiAgICAgIGNvbHVtbi5jbGFzc0xpc3QuYWRkKGBjb2x1bW4tJHtjfWAsIFwiY29sdW1uXCIpO1xuICAgICAgY29sdW1uLmRhdGFzZXQueCA9IGM7XG4gICAgICByb3cuYXBwZW5kQ2hpbGQoY29sdW1uKTtcbiAgICB9XG4gICAgYm9hcmQuYXBwZW5kQ2hpbGQocm93KTtcbiAgfVxuICByZXR1cm4gYm9hcmQ7XG59XG5cbmZ1bmN0aW9uIGRvbVBvcHVsYXRlQm9hcmQoYm9hcmRPYmosIERvbUJvYXJkU2VsZWN0b3IsIGlzUGxheWVyQm9hcmQgPSB0cnVlKSB7XG4gIGZvciAobGV0IHIgPSAwOyByIDwgMTA7IHIrKykge1xuICAgIC8vY29uc3Qgcm93MUNvbHVtbnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKGAucm93LSR7Y30gLmNvbHVtbi0ke2l9YCk7XG4gICAgZm9yIChsZXQgYyA9IDA7IGMgPCAxMDsgYysrKSB7XG4gICAgICBjb25zdCBjb2x1bW4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFxuICAgICAgICBgJHtEb21Cb2FyZFNlbGVjdG9yfSAucm93LSR7cn0gLmNvbHVtbi0ke2N9YFxuICAgICAgKTtcblxuICAgICAgaWYgKGJvYXJkT2JqLmJvYXJkW3JdW2NdICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgaWYgKGJvYXJkT2JqLmJvYXJkW3JdW2NdLmRlc3Ryb3llZCA9PT0gdHJ1ZSkge1xuICAgICAgICAgIGNvbHVtbi5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSBcInJlZFwiO1xuICAgICAgICB9IGVsc2UgaWYgKGJvYXJkT2JqLmJvYXJkW3JdW2NdLmRlc3Ryb3llZCA9PT0gZmFsc2UgJiYgaXNQbGF5ZXJCb2FyZCkge1xuICAgICAgICAgIGNvbHVtbi5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSBcImdyZWVuXCI7XG4gICAgICAgIH0gZWxzZSBpZiAoYm9hcmRPYmouYm9hcmRbcl1bY10gPT09IFwibWlzc2VkXCIpIHtcbiAgICAgICAgICBjb2x1bW4uc3R5bGUuYmFja2dyb3VuZENvbG9yID0gXCJncmV5XCI7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cblxuZnVuY3Rpb24gYXR0YWNrV2l0aENsaWNrKGRvbUJvYXJkLCBvYmpCb2FyZCkge1xuICBkb21Cb2FyZC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGUpID0+IHtcbiAgICBsZXQgeSA9IGUudGFyZ2V0O1xuICAgIGxldCB4ID0gZS50YXJnZXQucGFyZW50RWxlbWVudDtcbiAgfSk7XG4gIGlmIChvYmpCb2FyZC5ib2FyZFt4XVt5XSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgaWYgKG9iakJvYXJkLmJvYXJkW3hdW3ldLmRlc3Ryb3llZCA9PT0gZmFsc2UpIHtcbiAgICAgIG9iakJvYXJkLmJvYXJkW3hdW3ldLmRlc3Ryb3llZCA9IHRydWU7XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIG9iakJvYXJkLmJvYXJkW3hdW3ldID0gXCJtaXNzZWRcIjtcbiAgfVxufVxuXG5leHBvcnQgeyBkb21SZW5kZXJCb2FyZCwgZG9tUG9wdWxhdGVCb2FyZCwgYXR0YWNrV2l0aENsaWNrIH07XG4iLCJpbXBvcnQge1xuICBkb21SZW5kZXJCb2FyZCxcbiAgZG9tUG9wdWxhdGVCb2FyZCxcbiAgYXR0YWNrV2l0aENsaWNrLFxufSBmcm9tIFwiLi9kb21JbnRlcmFjdGlvblwiO1xuaW1wb3J0IGdhbWVib2FyZEZhY3RvcnkgZnJvbSBcIi4vZ2FtZWJvYXJkRmFjdG9yeVwiO1xuXG5mdW5jdGlvbiBnYW1lTG9vcCgpIHtcbiAgLy9jb21wdXRlckF0dGFjayhwbGF5ZXIxYm9hcmQpO1xuXG4gIC8vMiAtIFRoZSBnYW1lIGxvb3Agc2hvdWxkIHNldCB1cCBhIG5ldyBnYW1lIGJ5IGNyZWF0aW5nIFBsYXllcnMgYW5kIEdhbWVib2FyZHMuIEZvciBub3cganVzdCBwb3B1bGF0ZSBlYWNoIEdhbWVib2FyZCB3aXRoIHByZWRldGVybWluZWQgY29vcmRpbmF0ZXMuIFlvdSBjYW4gaW1wbGVtZW50IGEgc3lzdGVtIGZvciBhbGxvd2luZyBwbGF5ZXJzIHRvIHBsYWNlIHRoZWlyIHNoaXBzIGxhdGVyLlxuICBjb25zdCBjb250ZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJjb250ZW50XCIpO1xuICBjb250ZW50LmFwcGVuZENoaWxkKGRvbVJlbmRlckJvYXJkKFwicGxheWVyQm9hcmRcIikpOyAvLyBtYWtlIGVtcHR5IGJvYXJkXG4gIGNvbnRlbnQuYXBwZW5kQ2hpbGQoZG9tUmVuZGVyQm9hcmQoXCJjb21wdXRlckJvYXJkXCIpKTsgLy8gbWFrZSBlbXB0eSBib2FyZFxuXG4gIGNvbnN0IHBsYXllckJvYXJkT2JqID0gZ2FtZWJvYXJkRmFjdG9yeSgpO1xuICBjb25zdCBjb21wdXRlckJvYXJkT2JqID0gZ2FtZWJvYXJkRmFjdG9yeSgpO1xuXG4gIHBsYXllckJvYXJkT2JqLnBsYWNlU2hpcCgyLCA2LCAyKTtcblxuICBjb21wdXRlckJvYXJkT2JqLnBsYWNlU2hpcCgyLCA2LCAyKTtcbiAgcGxheWVyQm9hcmRPYmoucGxhY2VTaGlwKDMsIDMsIDMpO1xuICBjb21wdXRlckJvYXJkT2JqLnBsYWNlU2hpcCgzLCAzLCAzKTtcbiAgcGxheWVyQm9hcmRPYmoucGxhY2VTaGlwKDQsIDQsIDUpO1xuICBjb21wdXRlckJvYXJkT2JqLnBsYWNlU2hpcCg0LCA0LCA1KTtcbiAgcGxheWVyQm9hcmRPYmoucGxhY2VTaGlwKDUsIDUsIDcpO1xuICBjb21wdXRlckJvYXJkT2JqLnBsYWNlU2hpcCg1LCA1LCA3KTtcbiAgLy8zLSAgV2XigJlsbCBsZWF2ZSB0aGUgSFRNTCBpbXBsZW1lbnRhdGlvbiB1cCB0byB5b3UgZm9yIG5vdywgYnV0IHlvdSBzaG91bGQgZGlzcGxheSBib3RoIHRoZSBwbGF5ZXLigJlzIGJvYXJkcyBhbmQgcmVuZGVyIHRoZW0gdXNpbmcgaW5mb3JtYXRpb24gZnJvbSB0aGUgR2FtZWJvYXJkIGNsYXNzLlxuXG4gIGRvbVBvcHVsYXRlQm9hcmQocGxheWVyQm9hcmRPYmosIFwiI3BsYXllckJvYXJkXCIpO1xuICBkb21Qb3B1bGF0ZUJvYXJkKGNvbXB1dGVyQm9hcmRPYmosIFwiI2NvbXB1dGVyQm9hcmRcIiwgZmFsc2UpO1xuXG4gIC8vIC0zLTEgWW91IG5lZWQgbWV0aG9kcyB0byByZW5kZXIgdGhlIGdhbWVib2FyZHMgYW5kIHRvIHRha2UgdXNlciBpbnB1dCBmb3IgYXR0YWNraW5nLiBGb3IgYXR0YWNrcywgbGV0IHRoZSB1c2VyIGNsaWNrIG9uIGEgY29vcmRpbmF0ZSBpbiB0aGUgZW5lbXkgR2FtZWJvYXJkLlxuXG4gIGZ1bmN0aW9uIGNvbXB1dGVyQXR0YWNrKGJvYXJkT2JqKSB7XG4gICAgZnVuY3Rpb24gcmFuZG9tSW50RnJvbUludGVydmFsKG1pbiwgbWF4KSB7XG4gICAgICAvLyBtaW4gYW5kIG1heCBpbmNsdWRlZFxuXG4gICAgICByZXR1cm4gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogKG1heCAtIG1pbiArIDEpICsgbWluKTtcbiAgICB9XG5cbiAgICBjb25zdCB4ID0gcmFuZG9tSW50RnJvbUludGVydmFsKDAsIDkpO1xuICAgIGNvbnN0IHkgPSByYW5kb21JbnRGcm9tSW50ZXJ2YWwoMCwgOSk7XG5cbiAgICBpZiAoYm9hcmRPYmoucmVjaXZlQXR0YWNrKHgsIHkpICE9PSBcInJlcGV0aWRvXCIpIHtcbiAgICAgIGJvYXJkT2JqLnJlY2l2ZUF0dGFjayh4LCB5KTtcbiAgICB9IGVsc2Uge1xuICAgICAgYWxlcnQoXCJjb21wdXRlciByZXBldGlkb1wiKTtcbiAgICAgIGNvbXB1dGVyQXR0YWNrKGJvYXJkT2JqKTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBwbGF5ZXJUdXJuKCkge1xuICAgIGNvbnN0IGNvbXB1dGVyQm9hcmQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImNvbXB1dGVyQm9hcmRcIik7XG4gICAgLy9jb25zdCBwbGF5ZXJCb2FyZCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicGxheWVyQm9hcmRcIik7XG4gICAgY29tcHV0ZXJCb2FyZC5hZGRFdmVudExpc3RlbmVyKFxuICAgICAgXCJjbGlja1wiLFxuICAgICAgKGUpID0+IHtcbiAgICAgICAgbGV0IHggPSBlLnRhcmdldC5kYXRhc2V0Lng7XG4gICAgICAgIGxldCB5ID0gZS50YXJnZXQucGFyZW50RWxlbWVudC5kYXRhc2V0Lnk7XG5cbiAgICAgICAgaWYgKGNvbXB1dGVyQm9hcmRPYmoucmVjaXZlQXR0YWNrKHgsIHkpICE9PSBcInJlcGV0aWRvXCIpIHtcbiAgICAgICAgICBjb21wdXRlckJvYXJkT2JqLnJlY2l2ZUF0dGFjayh4LCB5KTtcbiAgICAgICAgICBkb21Qb3B1bGF0ZUJvYXJkKGNvbXB1dGVyQm9hcmRPYmosIFwiI2NvbXB1dGVyQm9hcmRcIiwgZmFsc2UpO1xuXG4gICAgICAgICAgaWYgKCFjb21wdXRlckJvYXJkT2JqLmlzR2FtZU92ZXIoKSkge1xuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgIGNvbXB1dGVyQXR0YWNrKHBsYXllckJvYXJkT2JqKTtcbiAgICAgICAgICAgICAgZG9tUG9wdWxhdGVCb2FyZChwbGF5ZXJCb2FyZE9iaiwgXCIjcGxheWVyQm9hcmRcIik7XG4gICAgICAgICAgICAgIHBsYXllclR1cm4oKTtcbiAgICAgICAgICAgIH0sIDIwMDApO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcImdhbWUgb3ZlclwiKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgYWxlcnQoXCJyZXBldGlkb1wiKTtcbiAgICAgICAgICBwbGF5ZXJUdXJuKCk7XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICB7IG9uY2U6IHRydWUgfVxuICAgICk7XG4gIH1cbiAgcGxheWVyVHVybigpO1xufVxuXG5leHBvcnQgeyBnYW1lTG9vcCB9O1xuIiwiaW1wb3J0IHNoaXBGYWN0b3J5IGZyb20gXCIuL3NoaXBGYWN0b3J5XCI7XG5cbmZ1bmN0aW9uIGdhbWVib2FyZEZhY3RvcnkoKSB7XG4gIGxldCBib2FyZCA9IFtbXSwgW10sIFtdLCBbXSwgW10sIFtdLCBbXSwgW10sIFtdLCBbXV07XG4gIGxldCBmbGVldCA9IHt9O1xuICBsZXQgbWlzc2VkU2hvb3RzID0gW107XG5cbiAgY29uc3QgcGxhY2VTaGlwID0gKGxlbmd0aCwgeCwgeSkgPT4ge1xuICAgIGxldCBjdXJyZW50U2hpcDtcbiAgICBzd2l0Y2ggKGxlbmd0aCkge1xuICAgICAgY2FzZSA1OlxuICAgICAgICB7XG4gICAgICAgICAgZmxlZXQuY2FycmllciA9IHNoaXBGYWN0b3J5KGxlbmd0aCk7XG4gICAgICAgICAgY3VycmVudFNoaXAgPSBcImNhcnJpZXJcIjtcbiAgICAgICAgfVxuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgNDpcbiAgICAgICAge1xuICAgICAgICAgIGZsZWV0LmJhdHRsZXNoaXAgPSBzaGlwRmFjdG9yeShsZW5ndGgpO1xuICAgICAgICAgIGN1cnJlbnRTaGlwID0gXCJiYXR0bGVzaGlwXCI7XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIDM6XG4gICAgICAgIHtcbiAgICAgICAgICBmbGVldC5kZXN0cm95ZXIgPSBzaGlwRmFjdG9yeShsZW5ndGgpO1xuICAgICAgICAgIGN1cnJlbnRTaGlwID0gXCJkZXN0cm95ZXJcIjtcbiAgICAgICAgfVxuICAgICAgICAvL2ZsZWV0LnN1Ym1hcmluZSA9IHNoaXBGYWN0b3J5KGxlbmd0aCk7XG4gICAgICAgIGJyZWFrO1xuXG4gICAgICBjYXNlIDI6XG4gICAgICAgIHtcbiAgICAgICAgICBmbGVldC5wYXRyb2xCb2F0ID0gc2hpcEZhY3RvcnkobGVuZ3RoKTtcbiAgICAgICAgICBjdXJyZW50U2hpcCA9IFwicGF0cm9sQm9hdFwiO1xuICAgICAgICB9XG5cbiAgICAgICAgYnJlYWs7XG4gICAgfVxuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgICAgYm9hcmRbeV1beCArIGldID0ge1xuICAgICAgICBkZXN0cm95ZWQ6IGZhbHNlLFxuXG4gICAgICAgIGhpdDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgIGZsZWV0W2N1cnJlbnRTaGlwXS5oaXQoKTtcbiAgICAgICAgICB0aGlzLmRlc3Ryb3llZCA9IHRydWU7XG4gICAgICAgIH0sXG4gICAgICB9O1xuICAgIH1cbiAgfTtcblxuICBjb25zdCByZWNpdmVBdHRhY2sgPSAoeCwgeSkgPT4ge1xuICAgIC8vY29uc29sZS5sb2coXCJpbml0aWFsaXppbmcgcmVjaXZlQXRhY2trIG1ldGhvZFwiKTtcbiAgICBpZiAodHlwZW9mIGJvYXJkW3ldW3hdID09PSBcIm9iamVjdFwiKSB7XG4gICAgICBpZiAoYm9hcmRbeV1beF0uZGVzdHJveWVkICE9PSB0cnVlKSB7XG4gICAgICAgIGJvYXJkW3ldW3hdLmhpdCgpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIFwicmVwZXRpZG9cIjtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKGJvYXJkW3ldW3hdID09PSB1bmRlZmluZWQpIHtcbiAgICAgIGJvYXJkW3ldW3hdID0gXCJtaXNzZWRcIjtcblxuICAgICAgLyogIG1pc3NlZFNob290cy5wdXNoKFt5LCB4XSk7XG4gICAgICBjb25zb2xlLmxvZyhtaXNzZWRTaG9vdHMpOyAqL1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gXCJyZXBldGlkb1wiO1xuICAgIH1cbiAgfTtcblxuICBjb25zdCBpc0dhbWVPdmVyID0gZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiAoXG4gICAgICB0aGlzLmZsZWV0LmNhcnJpZXIuaXNTdW5rICYmXG4gICAgICB0aGlzLmZsZWV0LnBhdHJvbEJvYXQuaXNTdW5rICYmXG4gICAgICB0aGlzLmZsZWV0LmRlc3Ryb3llci5pc1N1bmsgJiZcbiAgICAgIHRoaXMuZmxlZXQuYmF0dGxlc2hpcC5pc1N1bmtcbiAgICApO1xuICB9O1xuXG4gIHJldHVybiB7IGJvYXJkLCBmbGVldCwgcGxhY2VTaGlwLCByZWNpdmVBdHRhY2ssIG1pc3NlZFNob290cywgaXNHYW1lT3ZlciB9O1xufVxuXG5leHBvcnQgZGVmYXVsdCBnYW1lYm9hcmRGYWN0b3J5O1xuIiwiY29uc3Qgc2hpcEZhY3RvcnkgPSAobGVuZ3RoKSA9PiB7XG4gIGxldCBoaXRzID0gMDtcbiAgY29uc3QgaXNTdW5rID0gbGVuZ3RoIC0gaGl0cyA9PT0gXCIwXCI7XG4gIGNvbnN0IGhpdCA9IGZ1bmN0aW9uICgpIHtcbiAgICB0aGlzLmhpdHMrKztcbiAgfTtcblxuICByZXR1cm4geyBsZW5ndGgsIGhpdHMsIGlzU3VuaywgaGl0IH07XG59O1xuXG5leHBvcnQgZGVmYXVsdCBzaGlwRmFjdG9yeTtcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IGdhbWVib2FyZEZhY3RvcnkgZnJvbSBcIi4vZ2FtZWJvYXJkRmFjdG9yeVwiO1xuaW1wb3J0IHNoaXBGYWN0b3J5IGZyb20gXCIuL3NoaXBGYWN0b3J5XCI7XG5pbXBvcnQgeyBkb21SZW5kZXJCb2FyZCwgZG9tUG9wdWxhdGVCb2FyZCB9IGZyb20gXCIuL2RvbUludGVyYWN0aW9uXCI7XG5pbXBvcnQgeyBnYW1lTG9vcCB9IGZyb20gXCIuL2dhbWVMb29wXCI7XG5cbmZ1bmN0aW9uIGNvbXB1dGVyQXR0YWNrKGJvYXJkT2JqKSB7XG4gIGZ1bmN0aW9uIHJhbmRvbUludEZyb21JbnRlcnZhbChtaW4sIG1heCkge1xuICAgIC8vIG1pbiBhbmQgbWF4IGluY2x1ZGVkXG4gICAgcmV0dXJuIE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIChtYXggLSBtaW4gKyAxKSArIG1pbik7XG4gIH1cblxuICBib2FyZE9iai5yZWNpdmVBdHRhY2soXG4gICAgcmFuZG9tSW50RnJvbUludGVydmFsKDAsIDkpLFxuICAgIHJhbmRvbUludEZyb21JbnRlcnZhbCgwLCA5KVxuICApO1xufVxuXG5nYW1lTG9vcCgpO1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9