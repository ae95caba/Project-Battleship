import { ai } from "./ai";
import { domPlaceShipImg } from "./domInteraction";

let computer = {
  ai,

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
                domPlaceShipImg(length, x, y, playerBoardObj);
                resolve();
              } else {
                asd(resolve);
              }
            } else if (axisButton.dataset.direction === "vertical") {
              if (playerBoardObj.willFollowRulesVertically(length, x, y)) {
                playerBoardObj.placeShipVertically(length, x, y);
                domPlaceShipImg(length, x, y, playerBoardObj, true);
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
