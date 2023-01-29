import { computer } from "./players";

const ai = {
  chaseMode: {
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
    } else if (this.chaseMode.isChasing === false) {
      if (this.chaseMode.validMoves.length >= 1) {
        this.chaseMode.firstValidMoves = this.chaseMode.validMoves; //this is for reverse mode later
        const directionIndex = computer.randomIntFromInterval(
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
    console.log("coordinates method");
    if (direction === undefined) {
      console.log("direction is undefiend");
      return undefined;
    }

    console.log(direction);
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
    console.log("attack method");
    //save direction

    const direction = this.direction();
    //attack;
    //save coordinates
    const coordinates = this.coordinates(direction);

    if (coordinates === undefined) {
      computer.attack(playerBoardObj);
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
            this.chaseMode.firstDirection = this.chaseMode.followDirection; // for reversed
            this.chaseMode.followDirection = undefined;

            if (this.chaseMode.reverseMode) {
              this.chaseMode.reverseMode = false;
            } else {
              this.chaseMode.reverseMode = true;
            }
          }
          break;
      }
    } else if (this.chaseMode.isChasing === false) {
      switch (playerBoardObj.reciveAttack(coordinates.x, coordinates.y)) {
        case "hit":
          {
            //save coordinates of this first hit
            this.chaseMode.firstLinearHit = this.chaseMode.chaseSubject; //for reversed

            //change the chase subject

            this.chaseMode.chaseSubject = coordinates;

            //save valid moves of the first chase subject
            this.chaseMode.firstValidMoves = this.chaseMode.validMoves; //for reverse !
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
