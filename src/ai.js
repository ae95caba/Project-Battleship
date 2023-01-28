import { computer } from "./players";

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
    alert(`valid moves before 2nd filter : ${this.chaseMode.validMoves}`);
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
            if (
              playerBoardObj.board[this.chaseMode.chaseSubject.y][
                this.chaseMode.chaseSubject.x - 1
              ] === "missed" ||
              (typeof playerBoardObj.board[this.chaseMode.chaseSubject.y][
                this.chaseMode.chaseSubject.x - 1
              ] === "object" &&
                playerBoardObj.board[this.chaseMode.chaseSubject.y][
                  this.chaseMode.chaseSubject.x - 1
                ].destroyed === true)
            ) {
              const index = this.chaseMode.validMoves.indexOf("left");

              this.chaseMode.validMoves.splice(index, 1);
            }
          }
          break;
        case "right":
          {
            if (
              playerBoardObj.board[this.chaseMode.chaseSubject.y][
                this.chaseMode.chaseSubject.x + 1
              ] === "missed" ||
              (typeof playerBoardObj.board[this.chaseMode.chaseSubject.y][
                this.chaseMode.chaseSubject.x + 1
              ] === "object" &&
                playerBoardObj.board[this.chaseMode.chaseSubject.y][
                  this.chaseMode.chaseSubject.x + 1
                ].destroyed === true)
            ) {
              const index = this.chaseMode.validMoves.indexOf("right");

              this.chaseMode.validMoves.splice(index, 1);
            }
          }
          break;
        case "top":
          {
            if (
              playerBoardObj.board[this.chaseMode.chaseSubject.y][
                this.chaseMode.chaseSubject.y - 1
              ] === "missed" ||
              (typeof playerBoardObj.board[this.chaseMode.chaseSubject.y][
                this.chaseMode.chaseSubject.y - 1
              ] === "object" &&
                playerBoardObj.board[this.chaseMode.chaseSubject.y][
                  this.chaseMode.chaseSubject.y - 1
                ].destroyed === true)
            ) {
              const index = this.chaseMode.validMoves.indexOf("top");

              this.chaseMode.validMoves.splice(index, 1);
            }
          }
          break;
        case "bottom":
          {
            if (
              playerBoardObj.board[this.chaseMode.chaseSubject.y][
                this.chaseMode.chaseSubject.y + 1
              ] === "missed" ||
              (typeof playerBoardObj.board[this.chaseMode.chaseSubject.y][
                this.chaseMode.chaseSubject.y + 1
              ] === "object" &&
                playerBoardObj.board[this.chaseMode.chaseSubject.y][
                  this.chaseMode.chaseSubject.y + 1
                ].destroyed === true)
            ) {
              const index = this.chaseMode.validMoves.indexOf("bottom");

              this.chaseMode.validMoves.splice(index, 1);
            }
          }
          break;
      }
    });
    alert(`valid moves after 2nd filter : ${this.chaseMode.validMoves}`);
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
      const directionIndex = computer.randomIntFromInterval(
        0,
        this.chaseMode.validMoves.length - 1
      );
      return this.chaseMode.validMoves[directionIndex];
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

export { ai };
