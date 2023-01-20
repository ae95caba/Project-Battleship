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

  // -3-1 You need methods to render the gameboards /done/ and to take user input for attacking/done/. For attacks, let the user click on a coordinate in the enemy Gameboard.
  //-4 The game loop should step through the game turn by turn using only methods from other objects. If at any point you are tempted to write a new function inside the game loop, step back and figure out which class or module that function should belong to.

  for (
    let turn = 1;
    computerBoardObj.isGameOver() == false ||
    playerBoardObj.isGameOver() == false;
    turn++
  ) {
    console.log("awaiting player attack");
    await (0,_players__WEBPACK_IMPORTED_MODULE_2__.playerAttack)(computerBoardObj);
    (0,_domInteraction__WEBPACK_IMPORTED_MODULE_0__.domPopulateBoard)(computerBoardObj, "#computerBoard", false);
    console.log("computerAttackNExt");
    (0,_players__WEBPACK_IMPORTED_MODULE_2__.computerAttack)(playerBoardObj);
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
/* harmony export */   "Players": () => (/* binding */ Players),
/* harmony export */   "computerAttack": () => (/* binding */ computerAttack),
/* harmony export */   "playerAttack": () => (/* binding */ playerAttack)
/* harmony export */ });
/* harmony import */ var _domInteraction__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./domInteraction */ "./src/domInteraction.js");


function computerAttack(playerBoardObj) {
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

function Players() {
  let computerAttack = function () {
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
  };
  let letThemPlay = function () {
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
            letThemPlay();
          }, 2000);
        } else {
          alert("repetido");
          letThemPlay();
        }
      },
      { once: true }
    );
  };
  return { letThemPlay };
}

function playerAttack(computerBoardObj) {
  console.log("playerAttack function");
  return new Promise(function (resolve, reject) {
    const computerBoard = document.getElementById("computerBoard");
    computerBoard.addEventListener(
      "click",
      (e) => {
        let x = e.target.dataset.x;
        let y = e.target.parentElement.dataset.y;

        console.log(x);
        console.log(y);

        if (computerBoardObj.reciveAttack(x, y) !== "repetido") {
          computerBoardObj.reciveAttack(x, y);
          resolve();
        } else {
          console.log("repetidoooo");
          reject();
        }
      },
      { once: true }
    );
  });
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





(0,_gameLoop__WEBPACK_IMPORTED_MODULE_3__.gameLoop)();

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUCxRQUFRO0FBQ1I7QUFDQSxHQUFHO0FBQ0g7O0FBRWlEOzs7Ozs7Ozs7Ozs7Ozs7QUM3RmpEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxXQUFXO0FBQ1g7O0FBRUEsaUVBQWUsV0FBVyxFQUFDOzs7Ozs7O1VDVjNCO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7Ozs7Ozs7QUNOa0Q7QUFDVjtBQUM0QjtBQUM5Qjs7QUFFdEMsbURBQVEiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9wcm9qZWN0LWJhdHRsZXNoaXAvLi9zcmMvZG9tSW50ZXJhY3Rpb24uanMiLCJ3ZWJwYWNrOi8vcHJvamVjdC1iYXR0bGVzaGlwLy4vc3JjL2dhbWVMb29wLmpzIiwid2VicGFjazovL3Byb2plY3QtYmF0dGxlc2hpcC8uL3NyYy9nYW1lYm9hcmRGYWN0b3J5LmpzIiwid2VicGFjazovL3Byb2plY3QtYmF0dGxlc2hpcC8uL3NyYy9wbGF5ZXJzLmpzIiwid2VicGFjazovL3Byb2plY3QtYmF0dGxlc2hpcC8uL3NyYy9zaGlwRmFjdG9yeS5qcyIsIndlYnBhY2s6Ly9wcm9qZWN0LWJhdHRsZXNoaXAvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vcHJvamVjdC1iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9wcm9qZWN0LWJhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9wcm9qZWN0LWJhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9wcm9qZWN0LWJhdHRsZXNoaXAvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiZnVuY3Rpb24gZG9tUmVuZGVyQm9hcmQoaWQpIHtcbiAgY29uc3QgYm9hcmQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICBib2FyZC5pZCA9IGlkO1xuICBmb3IgKGxldCByID0gMDsgciA8IDEwOyByKyspIHtcbiAgICBjb25zdCByb3cgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgIHJvdy5jbGFzc0xpc3QuYWRkKGByb3ctJHtyfWAsIFwicm93XCIpO1xuICAgIHJvdy5kYXRhc2V0LnkgPSByO1xuXG4gICAgZm9yIChsZXQgYyA9IDA7IGMgPCAxMCA+IDA7IGMrKykge1xuICAgICAgY29uc3QgY29sdW1uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcblxuICAgICAgY29sdW1uLmNsYXNzTGlzdC5hZGQoYGNvbHVtbi0ke2N9YCwgXCJjb2x1bW5cIik7XG4gICAgICBjb2x1bW4uZGF0YXNldC54ID0gYztcbiAgICAgIHJvdy5hcHBlbmRDaGlsZChjb2x1bW4pO1xuICAgIH1cbiAgICBib2FyZC5hcHBlbmRDaGlsZChyb3cpO1xuICB9XG4gIHJldHVybiBib2FyZDtcbn1cblxuZnVuY3Rpb24gZG9tUG9wdWxhdGVCb2FyZChib2FyZE9iaiwgRG9tQm9hcmRTZWxlY3RvciwgaXNQbGF5ZXJCb2FyZCA9IHRydWUpIHtcbiAgZm9yIChsZXQgciA9IDA7IHIgPCAxMDsgcisrKSB7XG4gICAgLy9jb25zdCByb3cxQ29sdW1ucyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoYC5yb3ctJHtjfSAuY29sdW1uLSR7aX1gKTtcbiAgICBmb3IgKGxldCBjID0gMDsgYyA8IDEwOyBjKyspIHtcbiAgICAgIGNvbnN0IGNvbHVtbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXG4gICAgICAgIGAke0RvbUJvYXJkU2VsZWN0b3J9IC5yb3ctJHtyfSAuY29sdW1uLSR7Y31gXG4gICAgICApO1xuXG4gICAgICBpZiAoYm9hcmRPYmouYm9hcmRbcl1bY10gIT09IHVuZGVmaW5lZCkge1xuICAgICAgICBpZiAoYm9hcmRPYmouYm9hcmRbcl1bY10uZGVzdHJveWVkID09PSB0cnVlKSB7XG4gICAgICAgICAgY29sdW1uLnN0eWxlLmJhY2tncm91bmRDb2xvciA9IFwicmVkXCI7XG4gICAgICAgIH0gZWxzZSBpZiAoYm9hcmRPYmouYm9hcmRbcl1bY10uZGVzdHJveWVkID09PSBmYWxzZSAmJiBpc1BsYXllckJvYXJkKSB7XG4gICAgICAgICAgY29sdW1uLnN0eWxlLmJhY2tncm91bmRDb2xvciA9IFwiZ3JlZW5cIjtcbiAgICAgICAgfSBlbHNlIGlmIChib2FyZE9iai5ib2FyZFtyXVtjXSA9PT0gXCJtaXNzZWRcIikge1xuICAgICAgICAgIGNvbHVtbi5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSBcImdyZXlcIjtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxufVxuXG5mdW5jdGlvbiBhdHRhY2tXaXRoQ2xpY2soZG9tQm9hcmQsIGNvbXB1dGVyQm9hcmRPYmopIHtcbiAgZG9tQm9hcmQuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChlKSA9PiB7XG4gICAgbGV0IHggPSBlLnRhcmdldC5kYXRhc2V0Lng7XG4gICAgbGV0IHkgPSBlLnRhcmdldC5wYXJlbnRFbGVtZW50LmRhdGFzZXQueTtcbiAgfSk7XG4gIGlmIChjb21wdXRlckJvYXJkT2JqLnJlY2l2ZUF0dGFjayh4LCB5KSAhPT0gXCJyZXBldGlkb1wiKSB7XG4gICAgY29tcHV0ZXJCb2FyZE9iai5yZWNpdmVBdHRhY2soeCwgeSk7XG4gIH0gZWxzZSB7XG4gICAgYXR0YWNrV2l0aENsaWNrKGRvbUJvYXJkLCBjb21wdXRlckJvYXJkT2JqKTtcbiAgfVxuICAvL1xuICBpZiAoY29tcHV0ZXJCb2FyZE9iai5yZWNpdmVBdHRhY2soeCwgeSkgIT09IFwicmVwZXRpZG9cIikge1xuICAgIGNvbXB1dGVyQm9hcmRPYmoucmVjaXZlQXR0YWNrKHgsIHkpO1xuXG4gICAgZG9tUG9wdWxhdGVCb2FyZChjb21wdXRlckJvYXJkT2JqLCBcIiNjb21wdXRlckJvYXJkXCIsIGZhbHNlKTtcblxuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgY29tcHV0ZXJBdHRhY2soKTtcbiAgICAgIGRvbVBvcHVsYXRlQm9hcmQocGxheWVyQm9hcmRPYmosIFwiI3BsYXllckJvYXJkXCIpO1xuICAgICAgbGV0VGhlbVBsYXkoKTtcbiAgICB9LCAyMDAwKTtcbiAgfSBlbHNlIHtcbiAgICBhbGVydChcInJlcGV0aWRvXCIpO1xuICAgIGxldFRoZW1QbGF5KCk7XG4gIH1cbn1cblxuZXhwb3J0IHsgZG9tUmVuZGVyQm9hcmQsIGRvbVBvcHVsYXRlQm9hcmQsIGF0dGFja1dpdGhDbGljayB9O1xuIiwiaW1wb3J0IHtcbiAgZG9tUmVuZGVyQm9hcmQsXG4gIGRvbVBvcHVsYXRlQm9hcmQsXG4gIGF0dGFja1dpdGhDbGljayxcbn0gZnJvbSBcIi4vZG9tSW50ZXJhY3Rpb25cIjtcbmltcG9ydCBnYW1lYm9hcmRGYWN0b3J5IGZyb20gXCIuL2dhbWVib2FyZEZhY3RvcnlcIjtcbmltcG9ydCB7IGNvbXB1dGVyQXR0YWNrLCBwbGF5ZXJUdXJuLCBwbGF5ZXJBdHRhY2sgfSBmcm9tIFwiLi9wbGF5ZXJzXCI7XG5cbmFzeW5jIGZ1bmN0aW9uIGdhbWVMb29wKCkge1xuICAvLzIgLSBUaGUgZ2FtZSBsb29wIHNob3VsZCBzZXQgdXAgYSBuZXcgZ2FtZSBieSBjcmVhdGluZyBQbGF5ZXJzIGFuZCBHYW1lYm9hcmRzLiBGb3Igbm93IGp1c3QgcG9wdWxhdGUgZWFjaCBHYW1lYm9hcmQgd2l0aCBwcmVkZXRlcm1pbmVkIGNvb3JkaW5hdGVzLiBZb3UgY2FuIGltcGxlbWVudCBhIHN5c3RlbSBmb3IgYWxsb3dpbmcgcGxheWVycyB0byBwbGFjZSB0aGVpciBzaGlwcyBsYXRlci5cblxuICBjb25zdCBjb250ZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJjb250ZW50XCIpO1xuICBjb250ZW50LmFwcGVuZENoaWxkKGRvbVJlbmRlckJvYXJkKFwicGxheWVyQm9hcmRcIikpOyAvLyBtYWtlIGVtcHR5IGJvYXJkXG4gIGNvbnRlbnQuYXBwZW5kQ2hpbGQoZG9tUmVuZGVyQm9hcmQoXCJjb21wdXRlckJvYXJkXCIpKTsgLy8gbWFrZSBlbXB0eSBib2FyZFxuICBjb25zdCBwbGF5ZXJCb2FyZE9iaiA9IGdhbWVib2FyZEZhY3RvcnkoKTtcbiAgY29uc3QgY29tcHV0ZXJCb2FyZE9iaiA9IGdhbWVib2FyZEZhY3RvcnkoKTtcbiAgcGxheWVyQm9hcmRPYmoucGxhY2VTaGlwKDIsIDYsIDIpO1xuICBjb21wdXRlckJvYXJkT2JqLnBsYWNlU2hpcCgyLCA2LCAyKTtcblxuICBwbGF5ZXJCb2FyZE9iai5wbGFjZVNoaXAoMywgMywgMyk7XG4gIGNvbXB1dGVyQm9hcmRPYmoucGxhY2VTaGlwKDMsIDMsIDMpO1xuXG4gIHBsYXllckJvYXJkT2JqLnBsYWNlU2hpcCg0LCA0LCA1KTtcbiAgY29tcHV0ZXJCb2FyZE9iai5wbGFjZVNoaXAoNCwgNCwgNSk7XG5cbiAgcGxheWVyQm9hcmRPYmoucGxhY2VTaGlwKDUsIDUsIDcpO1xuICBjb21wdXRlckJvYXJkT2JqLnBsYWNlU2hpcCg1LCA1LCA3KTtcblxuICAvLzMtICBXZeKAmWxsIGxlYXZlIHRoZSBIVE1MIGltcGxlbWVudGF0aW9uIHVwIHRvIHlvdSBmb3Igbm93LCBidXQgeW91IHNob3VsZCBkaXNwbGF5IGJvdGggdGhlIHBsYXllcuKAmXMgYm9hcmRzIGFuZCByZW5kZXIgdGhlbSB1c2luZyBpbmZvcm1hdGlvbiBmcm9tIHRoZSBHYW1lYm9hcmQgY2xhc3MuXG5cbiAgZG9tUG9wdWxhdGVCb2FyZChwbGF5ZXJCb2FyZE9iaiwgXCIjcGxheWVyQm9hcmRcIik7XG4gIGRvbVBvcHVsYXRlQm9hcmQoY29tcHV0ZXJCb2FyZE9iaiwgXCIjY29tcHV0ZXJCb2FyZFwiLCBmYWxzZSk7XG5cbiAgLy8gLTMtMSBZb3UgbmVlZCBtZXRob2RzIHRvIHJlbmRlciB0aGUgZ2FtZWJvYXJkcyAvZG9uZS8gYW5kIHRvIHRha2UgdXNlciBpbnB1dCBmb3IgYXR0YWNraW5nL2RvbmUvLiBGb3IgYXR0YWNrcywgbGV0IHRoZSB1c2VyIGNsaWNrIG9uIGEgY29vcmRpbmF0ZSBpbiB0aGUgZW5lbXkgR2FtZWJvYXJkLlxuICAvLy00IFRoZSBnYW1lIGxvb3Agc2hvdWxkIHN0ZXAgdGhyb3VnaCB0aGUgZ2FtZSB0dXJuIGJ5IHR1cm4gdXNpbmcgb25seSBtZXRob2RzIGZyb20gb3RoZXIgb2JqZWN0cy4gSWYgYXQgYW55IHBvaW50IHlvdSBhcmUgdGVtcHRlZCB0byB3cml0ZSBhIG5ldyBmdW5jdGlvbiBpbnNpZGUgdGhlIGdhbWUgbG9vcCwgc3RlcCBiYWNrIGFuZCBmaWd1cmUgb3V0IHdoaWNoIGNsYXNzIG9yIG1vZHVsZSB0aGF0IGZ1bmN0aW9uIHNob3VsZCBiZWxvbmcgdG8uXG5cbiAgZm9yIChcbiAgICBsZXQgdHVybiA9IDE7XG4gICAgY29tcHV0ZXJCb2FyZE9iai5pc0dhbWVPdmVyKCkgPT0gZmFsc2UgfHxcbiAgICBwbGF5ZXJCb2FyZE9iai5pc0dhbWVPdmVyKCkgPT0gZmFsc2U7XG4gICAgdHVybisrXG4gICkge1xuICAgIGNvbnNvbGUubG9nKFwiYXdhaXRpbmcgcGxheWVyIGF0dGFja1wiKTtcbiAgICBhd2FpdCBwbGF5ZXJBdHRhY2soY29tcHV0ZXJCb2FyZE9iaik7XG4gICAgZG9tUG9wdWxhdGVCb2FyZChjb21wdXRlckJvYXJkT2JqLCBcIiNjb21wdXRlckJvYXJkXCIsIGZhbHNlKTtcbiAgICBjb25zb2xlLmxvZyhcImNvbXB1dGVyQXR0YWNrTkV4dFwiKTtcbiAgICBjb21wdXRlckF0dGFjayhwbGF5ZXJCb2FyZE9iaik7XG4gICAgZG9tUG9wdWxhdGVCb2FyZChwbGF5ZXJCb2FyZE9iaiwgXCIjcGxheWVyQm9hcmRcIik7XG4gIH1cblxuICBhbGVydChcImdhbWUgb3ZlclwiKTtcbn1cblxuZXhwb3J0IHsgZ2FtZUxvb3AgfTtcbiIsImltcG9ydCBzaGlwRmFjdG9yeSBmcm9tIFwiLi9zaGlwRmFjdG9yeVwiO1xuXG5mdW5jdGlvbiBnYW1lYm9hcmRGYWN0b3J5KCkge1xuICBsZXQgYm9hcmQgPSBbW10sIFtdLCBbXSwgW10sIFtdLCBbXSwgW10sIFtdLCBbXSwgW11dO1xuICBsZXQgZmxlZXQgPSB7fTtcbiAgbGV0IG1pc3NlZFNob290cyA9IFtdO1xuXG4gIGNvbnN0IHBsYWNlU2hpcCA9IChsZW5ndGgsIHgsIHkpID0+IHtcbiAgICBsZXQgY3VycmVudFNoaXA7XG4gICAgc3dpdGNoIChsZW5ndGgpIHtcbiAgICAgIGNhc2UgNTpcbiAgICAgICAge1xuICAgICAgICAgIGZsZWV0LmNhcnJpZXIgPSBzaGlwRmFjdG9yeShsZW5ndGgpO1xuICAgICAgICAgIGN1cnJlbnRTaGlwID0gXCJjYXJyaWVyXCI7XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIDQ6XG4gICAgICAgIHtcbiAgICAgICAgICBmbGVldC5iYXR0bGVzaGlwID0gc2hpcEZhY3RvcnkobGVuZ3RoKTtcbiAgICAgICAgICBjdXJyZW50U2hpcCA9IFwiYmF0dGxlc2hpcFwiO1xuICAgICAgICB9XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAzOlxuICAgICAgICB7XG4gICAgICAgICAgZmxlZXQuZGVzdHJveWVyID0gc2hpcEZhY3RvcnkobGVuZ3RoKTtcbiAgICAgICAgICBjdXJyZW50U2hpcCA9IFwiZGVzdHJveWVyXCI7XG4gICAgICAgIH1cbiAgICAgICAgLy9mbGVldC5zdWJtYXJpbmUgPSBzaGlwRmFjdG9yeShsZW5ndGgpO1xuICAgICAgICBicmVhaztcblxuICAgICAgY2FzZSAyOlxuICAgICAgICB7XG4gICAgICAgICAgZmxlZXQucGF0cm9sQm9hdCA9IHNoaXBGYWN0b3J5KGxlbmd0aCk7XG4gICAgICAgICAgY3VycmVudFNoaXAgPSBcInBhdHJvbEJvYXRcIjtcbiAgICAgICAgfVxuXG4gICAgICAgIGJyZWFrO1xuICAgIH1cblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICAgIGJvYXJkW3ldW3ggKyBpXSA9IHtcbiAgICAgICAgZGVzdHJveWVkOiBmYWxzZSxcblxuICAgICAgICBoaXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICBmbGVldFtjdXJyZW50U2hpcF0uaGl0KCk7XG4gICAgICAgICAgdGhpcy5kZXN0cm95ZWQgPSB0cnVlO1xuICAgICAgICB9LFxuICAgICAgfTtcbiAgICB9XG4gIH07XG5cbiAgY29uc3QgcmVjaXZlQXR0YWNrID0gKHgsIHkpID0+IHtcbiAgICAvL2NvbnNvbGUubG9nKFwiaW5pdGlhbGl6aW5nIHJlY2l2ZUF0YWNrayBtZXRob2RcIik7XG4gICAgaWYgKHR5cGVvZiBib2FyZFt5XVt4XSA9PT0gXCJvYmplY3RcIikge1xuICAgICAgaWYgKGJvYXJkW3ldW3hdLmRlc3Ryb3llZCAhPT0gdHJ1ZSkge1xuICAgICAgICBib2FyZFt5XVt4XS5oaXQoKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBcInJlcGV0aWRvXCI7XG4gICAgICB9XG4gICAgfSBlbHNlIGlmIChib2FyZFt5XVt4XSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICBib2FyZFt5XVt4XSA9IFwibWlzc2VkXCI7XG5cbiAgICAgIC8qICBtaXNzZWRTaG9vdHMucHVzaChbeSwgeF0pO1xuICAgICAgY29uc29sZS5sb2cobWlzc2VkU2hvb3RzKTsgKi9cbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIFwicmVwZXRpZG9cIjtcbiAgICB9XG4gIH07XG5cbiAgY29uc3QgaXNHYW1lT3ZlciA9IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gKFxuICAgICAgdGhpcy5mbGVldC5jYXJyaWVyLmlzU3VuayAmJlxuICAgICAgdGhpcy5mbGVldC5wYXRyb2xCb2F0LmlzU3VuayAmJlxuICAgICAgdGhpcy5mbGVldC5kZXN0cm95ZXIuaXNTdW5rICYmXG4gICAgICB0aGlzLmZsZWV0LmJhdHRsZXNoaXAuaXNTdW5rXG4gICAgKTtcbiAgfTtcblxuICByZXR1cm4geyBib2FyZCwgZmxlZXQsIHBsYWNlU2hpcCwgcmVjaXZlQXR0YWNrLCBpc0dhbWVPdmVyIH07XG59XG5cbmV4cG9ydCBkZWZhdWx0IGdhbWVib2FyZEZhY3Rvcnk7XG4iLCJpbXBvcnQgeyBhdHRhY2tXaXRoQ2xpY2sgfSBmcm9tIFwiLi9kb21JbnRlcmFjdGlvblwiO1xuXG5mdW5jdGlvbiBjb21wdXRlckF0dGFjayhwbGF5ZXJCb2FyZE9iaikge1xuICBmdW5jdGlvbiByYW5kb21JbnRGcm9tSW50ZXJ2YWwobWluLCBtYXgpIHtcbiAgICAvLyBtaW4gYW5kIG1heCBpbmNsdWRlZFxuXG4gICAgcmV0dXJuIE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIChtYXggLSBtaW4gKyAxKSArIG1pbik7XG4gIH1cblxuICBjb25zdCB4ID0gcmFuZG9tSW50RnJvbUludGVydmFsKDAsIDkpO1xuICBjb25zdCB5ID0gcmFuZG9tSW50RnJvbUludGVydmFsKDAsIDkpO1xuXG4gIGlmIChwbGF5ZXJCb2FyZE9iai5yZWNpdmVBdHRhY2soeCwgeSkgIT09IFwicmVwZXRpZG9cIikge1xuICAgIHBsYXllckJvYXJkT2JqLnJlY2l2ZUF0dGFjayh4LCB5KTtcbiAgfSBlbHNlIHtcbiAgICBhbGVydChcImNvbXB1dGVyIHJlcGV0aWRvXCIpO1xuICAgIGNvbXB1dGVyQXR0YWNrKHBsYXllckJvYXJkT2JqKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBQbGF5ZXJzKCkge1xuICBsZXQgY29tcHV0ZXJBdHRhY2sgPSBmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gcmFuZG9tSW50RnJvbUludGVydmFsKG1pbiwgbWF4KSB7XG4gICAgICAvLyBtaW4gYW5kIG1heCBpbmNsdWRlZFxuXG4gICAgICByZXR1cm4gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogKG1heCAtIG1pbiArIDEpICsgbWluKTtcbiAgICB9XG5cbiAgICBjb25zdCB4ID0gcmFuZG9tSW50RnJvbUludGVydmFsKDAsIDkpO1xuICAgIGNvbnN0IHkgPSByYW5kb21JbnRGcm9tSW50ZXJ2YWwoMCwgOSk7XG5cbiAgICBpZiAocGxheWVyQm9hcmRPYmoucmVjaXZlQXR0YWNrKHgsIHkpICE9PSBcInJlcGV0aWRvXCIpIHtcbiAgICAgIHBsYXllckJvYXJkT2JqLnJlY2l2ZUF0dGFjayh4LCB5KTtcbiAgICB9IGVsc2Uge1xuICAgICAgYWxlcnQoXCJjb21wdXRlciByZXBldGlkb1wiKTtcbiAgICAgIGNvbXB1dGVyQXR0YWNrKHBsYXllckJvYXJkT2JqKTtcbiAgICB9XG4gIH07XG4gIGxldCBsZXRUaGVtUGxheSA9IGZ1bmN0aW9uICgpIHtcbiAgICBjb25zdCBjb21wdXRlckJvYXJkID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJjb21wdXRlckJvYXJkXCIpO1xuICAgIGNvbXB1dGVyQm9hcmQuYWRkRXZlbnRMaXN0ZW5lcihcbiAgICAgIFwiY2xpY2tcIixcbiAgICAgIChlKSA9PiB7XG4gICAgICAgIGxldCB4ID0gZS50YXJnZXQuZGF0YXNldC54O1xuICAgICAgICBsZXQgeSA9IGUudGFyZ2V0LnBhcmVudEVsZW1lbnQuZGF0YXNldC55O1xuXG4gICAgICAgIGlmIChjb21wdXRlckJvYXJkT2JqLnJlY2l2ZUF0dGFjayh4LCB5KSAhPT0gXCJyZXBldGlkb1wiKSB7XG4gICAgICAgICAgY29tcHV0ZXJCb2FyZE9iai5yZWNpdmVBdHRhY2soeCwgeSk7XG5cbiAgICAgICAgICBkb21Qb3B1bGF0ZUJvYXJkKGNvbXB1dGVyQm9hcmRPYmosIFwiI2NvbXB1dGVyQm9hcmRcIiwgZmFsc2UpO1xuXG4gICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICBjb21wdXRlckF0dGFjaygpO1xuICAgICAgICAgICAgZG9tUG9wdWxhdGVCb2FyZChwbGF5ZXJCb2FyZE9iaiwgXCIjcGxheWVyQm9hcmRcIik7XG4gICAgICAgICAgICBsZXRUaGVtUGxheSgpO1xuICAgICAgICAgIH0sIDIwMDApO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGFsZXJ0KFwicmVwZXRpZG9cIik7XG4gICAgICAgICAgbGV0VGhlbVBsYXkoKTtcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIHsgb25jZTogdHJ1ZSB9XG4gICAgKTtcbiAgfTtcbiAgcmV0dXJuIHsgbGV0VGhlbVBsYXkgfTtcbn1cblxuZnVuY3Rpb24gcGxheWVyQXR0YWNrKGNvbXB1dGVyQm9hcmRPYmopIHtcbiAgY29uc29sZS5sb2coXCJwbGF5ZXJBdHRhY2sgZnVuY3Rpb25cIik7XG4gIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgY29uc3QgY29tcHV0ZXJCb2FyZCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiY29tcHV0ZXJCb2FyZFwiKTtcbiAgICBjb21wdXRlckJvYXJkLmFkZEV2ZW50TGlzdGVuZXIoXG4gICAgICBcImNsaWNrXCIsXG4gICAgICAoZSkgPT4ge1xuICAgICAgICBsZXQgeCA9IGUudGFyZ2V0LmRhdGFzZXQueDtcbiAgICAgICAgbGV0IHkgPSBlLnRhcmdldC5wYXJlbnRFbGVtZW50LmRhdGFzZXQueTtcblxuICAgICAgICBjb25zb2xlLmxvZyh4KTtcbiAgICAgICAgY29uc29sZS5sb2coeSk7XG5cbiAgICAgICAgaWYgKGNvbXB1dGVyQm9hcmRPYmoucmVjaXZlQXR0YWNrKHgsIHkpICE9PSBcInJlcGV0aWRvXCIpIHtcbiAgICAgICAgICBjb21wdXRlckJvYXJkT2JqLnJlY2l2ZUF0dGFjayh4LCB5KTtcbiAgICAgICAgICByZXNvbHZlKCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgY29uc29sZS5sb2coXCJyZXBldGlkb29vb1wiKTtcbiAgICAgICAgICByZWplY3QoKTtcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIHsgb25jZTogdHJ1ZSB9XG4gICAgKTtcbiAgfSk7XG59XG5cbmV4cG9ydCB7IFBsYXllcnMsIHBsYXllckF0dGFjaywgY29tcHV0ZXJBdHRhY2sgfTtcbiIsImNvbnN0IHNoaXBGYWN0b3J5ID0gKGxlbmd0aCkgPT4ge1xuICBsZXQgaGl0cyA9IDA7XG4gIGNvbnN0IGlzU3VuayA9IGxlbmd0aCAtIGhpdHMgPT09IFwiMFwiO1xuICBjb25zdCBoaXQgPSBmdW5jdGlvbiAoKSB7XG4gICAgdGhpcy5oaXRzKys7XG4gIH07XG5cbiAgcmV0dXJuIHsgbGVuZ3RoLCBoaXRzLCBpc1N1bmssIGhpdCB9O1xufTtcblxuZXhwb3J0IGRlZmF1bHQgc2hpcEZhY3Rvcnk7XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCBnYW1lYm9hcmRGYWN0b3J5IGZyb20gXCIuL2dhbWVib2FyZEZhY3RvcnlcIjtcbmltcG9ydCBzaGlwRmFjdG9yeSBmcm9tIFwiLi9zaGlwRmFjdG9yeVwiO1xuaW1wb3J0IHsgZG9tUmVuZGVyQm9hcmQsIGRvbVBvcHVsYXRlQm9hcmQgfSBmcm9tIFwiLi9kb21JbnRlcmFjdGlvblwiO1xuaW1wb3J0IHsgZ2FtZUxvb3AgfSBmcm9tIFwiLi9nYW1lTG9vcFwiO1xuXG5nYW1lTG9vcCgpO1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9