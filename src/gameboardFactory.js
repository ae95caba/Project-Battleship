import shipFactory from "./shipFactory";

function gameboardFactory() {
  let board = [[], [], [], [], [], [], [], [], [], []];
  let fleet = {};
  let missedShoots = [];

  const placeShip = (length, x, y) => {
    let currentShip;
    switch (length) {
      case 5:
        {
          fleet.carrier = shipFactory(length);
          currentShip = "carrier";
        }
        break;
      case 4:
        {
          fleet.battleship = shipFactory(length);
          currentShip = "battleship";
        }
        break;
      case 3:
        {
          fleet.destroyer = shipFactory(length);
          currentShip = "destroyer";
        }
        //fleet.submarine = shipFactory(length);
        break;

      case 2:
        {
          fleet.patrolBoat = shipFactory(length);
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

export default gameboardFactory;
