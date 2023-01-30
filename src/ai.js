import { computer } from "./players";

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
        const directionIndex = computer.randomIntFromInterval(
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

export { ai };
