import gameboardFactory from "./gameboardFactory";

it("should be able to place ships at x y cordinates", () => {
  const gameboard = gameboardFactory();

  gameboard.placeShip(3, 2, 4);

  expect(
    gameboard.board[4][2] !== undefined &&
      gameboard.board[4][3] !== undefined &&
      gameboard.board[4][4] !== undefined
  ).toEqual(true);
});

it("should be able to increase hits in a ship object", () => {
  let gameboard = gameboardFactory();

  gameboard.placeShip(3, 2, 4);

  gameboard.reciveAttack(2, 4);
  gameboard.reciveAttack(3, 4);

  expect(gameboard.fleet.destroyer.hits).toEqual(2);
});

it("should be able to set destroyed on the ship part hitted", () => {
  let gameboard = gameboardFactory();

  gameboard.placeShip(3, 2, 4);

  gameboard.reciveAttack(2, 4);

  expect(gameboard.board[4][2].destroyed).toEqual(true);
});

/* it("should be able to keep track of missed shots", () => {
  let gameboard = gameboardFactory();

  gameboard.placeShip(3, 2, 4);
  gameboard.reciveAttack(1, 4);
  gameboard.reciveAttack(1, 5);

  expect(gameboard.missedShoots.length).toEqual(2);
}); */

it("should be able to keep track of missed shots2", () => {
  let gameboard = gameboardFactory();

  gameboard.placeShip(2, 6, 2);
  gameboard.reciveAttack(2, 2);

  expect(gameboard.board[2][2] === "missed").toEqual(true);
});

it("should be able to report whether or not all of their ships have been sunk", () => {
  let gameboard = gameboardFactory();
  gameboard.placeShip(2, 2, 1);
  gameboard.placeShip(3, 3, 1);
  gameboard.placeShip(4, 4, 1);
  gameboard.placeShip(5, 5, 1);
  gameboard.fleet.carrier.isSunk = true;
  gameboard.fleet.destroyer.isSunk = true;
  gameboard.fleet.patrolBoat.isSunk = true;
  gameboard.fleet.battleship.isSunk = true;

  expect(gameboard.isGameOver()).toEqual(true);
});
