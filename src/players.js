let computer = {
  chaseMode: {
    isReversed: false,
    state: false,
    chaseSubject: { x: undefined, y: undefined }, //x,y
    newCoordinate: {}, //x,y
    validMoves: ["left", "right", "top", "bottom"],
    followDirection: undefined,
    firstChaseSubject: {}, //x,y
    originalValidMoves: [],
  },
  attack: function (playerBoardObj) {
    /* if (this.chaseMode.state) {
      //remove direcctions that will be outside the board
      switch (this.chaseSubject.x) {
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
      switch (this.chaseSubject.y) {
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
      //remove the directions that will not follow rules
      this.chaseMode.validMoves.forEach((move) => {
        switch (move) {
          case "left":
            {
              if (
                playerBoardObj.reciveAttack(
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
              if (
                playerBoardObj.reciveAttack(
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
              if (
                playerBoardObj.reciveAttack(
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
              if (
                playerBoardObj.reciveAttack(
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

      //choose a direction
      if (followDirection) {
        if (this.chaseMode.validMoves.includes(followDirection)) {
          const direction = followDirection;
        } else {
          //go oposite direction from the start\
          // it should be saved, the valid moves from the original chase objective
          //if it is not posible, end here
          switch (direction) {
            case "left":
              {
                if (this.chaseMode.originalValidMoves.includes("right")) {
                  direction = "right";
                  this.chaseMode.isReversed = true;
                } else {
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
                  direction = "left";
                  this.chaseMode.isReversed = true;
                } else {
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
                  direction = "bottom";
                  this.chaseMode.isReversed = true;
                } else {
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
                  direction = "top";
                  this.chaseMode.isReversed = true;
                } else {
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
        }
      } else {
        const directionIndex = this.randomIntFromInterval(
          0,
          this.chaseMode.validMoves.length - 1
        );
        const direction = this.chaseMode.validMoves(directionIndex);
        this.chaseMode.originalValidMoves = this.chaseMode.validMoves;
      }

      //make a new coordinate to apply the choosed direction

      switch (direction) {
        case "left":
          {
            this.chaseMode.newCoordinate.x = this.chaseMode.chaseSubject.x - 1;
            this.chaseMode.newCoordinate.y = this.chaseMode.chaseSubject.y;
          }
          break;
        case "right":
          {
            this.chaseMode.newCoordinate.x = this.chaseMode.chaseSubject.x + 1;
            this.chaseMode.newCoordinate.y = this.chaseMode.chaseSubject.y;
          }
          break;
        case "top":
          {
            this.chaseMode.newCoordinate.x = this.chaseMode.chaseSubject.x;
            this.chaseMode.newCoordinate.y = this.chaseMode.chaseSubject.y - 1;
          }
          break;
        case "bottom":
          {
            this.chaseMode.newCoordinate.x = this.chaseMode.chaseSubject.x;
            this.chaseMode.newCoordinate.y = this.chaseMode.chaseSubject.y + 1;
          }
          break;
      }

      //use the new coordinate
      switch (
        playerBoardObj.reciveAttack(
          this.chaseMode.newCoordinate.x,
          this.chaseMode.newCoordinate.y
        )
      ) {
        case "hit":
          {
            playerBoardObj.reciveAttack(
              this.chaseMode.newCoordinate.x,
              this.chaseMode.newCoordinate.y
            );
            this.chaseMode.firstChaseSubject.x = this.chaseMode.chaseSubject.x;
            this.chaseMode.firstChaseSubject.y = this.chaseMode.chaseSubject.y;
            this.chaseMode.chaseSubject.x = this.chaseMode.newCoordinate.x;

            this.chaseMode.chaseSubject.y = this.chaseMode.newCoordinate.y;

            //reset valid moves
            this.chaseMode.validMoves = ["left", "right", "top", "bottom"];

            //keep in direction
            this.chaseMode.followDirection = direction;
          }
          break;
        case "missed":
          {
            //if runing form the oposite direction, the chase mode should stop
            if (this.chaseMode.isReversed) {
              this.chaseMode.state = false;
            }
            //get random number choosed from array moves and deleted from
            //the array so only the left posible move remains
            //its not necesary beacause the function detects missed shoots
            playerBoardObj.reciveAttack(
              this.chaseMode.newCoordinate.x,
              this.chaseMode.newCoordinate.y
            );
          }
          break;
      }
      //////////////////////////////////////

      //////////////////////////////////
    } */
    const x = this.randomIntFromInterval(0, 9);
    const y = this.randomIntFromInterval(0, 9);

    if (playerBoardObj.reciveAttack(x, y) === "hit") {
      console.log("computer hit");
      playerBoardObj.reciveAttack(x, y);
      /*  this.chaseMode.state = true;
      this.chaseMode.chaseSubject.x = x;
      this.chaseMode.chaseSubject.y = y; */
    } else if (playerBoardObj.reciveAttack(x, y) === "missed") {
      console.log("computer misssed");
      playerBoardObj.reciveAttack(x, y);
    } else if (playerBoardObj.reciveAttack(x, y) === "repetido") {
      console.log(x);
      console.log(y);
      console.log(playerBoardObj.reciveAttack(x, y));
      console.log("computer repetido");
      computer.attack(playerBoardObj);
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
    return new Promise(function asd(resolve, reject) {
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

            if (computerBoardObj.reciveAttack(x, y) !== "repetido") {
              computerBoardObj.reciveAttack(x, y);
              resolve();
            } else {
              console.log("repetido intenta denuevo");
              asd(resolve, reject);
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

export { player, computer };
