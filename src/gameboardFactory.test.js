import gameboardFactory from "./gameboardFactory";

it("should be able to place ships at x y cordinates", () => {
  const gameboard = gameboardFactory();

  gameboard.placeShip(3, 2, 4);
  //console.debug(gameboard.fleet);

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

  gameboard.placeShip(2, 1, 1);
  gameboard.placeShip(3, 1, 3);
  gameboard.placeShip(4, 1, 5);
  gameboard.placeShip(5, 1, 7);

  //bajar nave 2
  gameboard.reciveAttack(1, 1);
  gameboard.reciveAttack(2, 1);

  //bajar nave 3
  gameboard.reciveAttack(1, 3);
  gameboard.reciveAttack(2, 3);
  gameboard.reciveAttack(3, 3);

  //bajar nave 4
  gameboard.reciveAttack(1, 5);
  gameboard.reciveAttack(2, 5);
  gameboard.reciveAttack(3, 5);
  gameboard.reciveAttack(4, 5);

  //bajar nave 5
  gameboard.reciveAttack(1, 7);
  gameboard.reciveAttack(2, 7);
  gameboard.reciveAttack(3, 7);
  gameboard.reciveAttack(4, 7);
  gameboard.reciveAttack(5, 7);

  expect(gameboard.isGameOver()).toEqual(true);
});

it("should be able to report whether or not all of their ships have been sunk 2", () => {
  let gameboard = gameboardFactory();

  gameboard.placeShip(2, 1, 1);
  gameboard.placeShip(3, 1, 3);
  gameboard.placeShip(4, 1, 5);
  gameboard.placeShip(5, 1, 7);

  //bajar nave 2
  gameboard.reciveAttack(1, 1);
  gameboard.reciveAttack(2, 1);

  //bajar nave 3
  gameboard.reciveAttack(1, 3);
  gameboard.reciveAttack(2, 3);
  gameboard.reciveAttack(3, 3);

  //bajar nave 4
  gameboard.reciveAttack(1, 5);
  gameboard.reciveAttack(2, 5);
  gameboard.reciveAttack(3, 5);
  gameboard.reciveAttack(4, 5);

  //bajar nave 5
  gameboard.reciveAttack(1, 7);
  gameboard.reciveAttack(2, 7);
  gameboard.reciveAttack(3, 7);
  /*  gameboard.reciveAttack(4, 7);
  gameboard.reciveAttack(5, 7); */

  expect(gameboard.isGameOver()).toEqual(false);
});

it("should be able to report whether or not all of their ships have been sunk 3", () => {
  let gameboard = gameboardFactory();

  gameboard.placeShip(2, 1, 1);
  gameboard.placeShip(3, 1, 3);
  gameboard.placeShip(4, 1, 5);
  gameboard.placeShip(5, 1, 7);

  //console.debug(gameboard.fleet);

  expect(gameboard.isGameOver()).toEqual(false);
});

/* it("should be able to detect if  placeShip is going to overlap another ship", () => {
  let gameboard = gameboardFactory();

  gameboard.placeShip(3, 1, 3);
  if (gameboard.willOverlap !== true)
    //console.debug(gameboard.fleet);

    expect(gameboard.isGameOver()).toEqual(false);
}); */

it("should be able to detect if  placeShip is going to overflow the board", () => {
  let gameboard = gameboardFactory();

  expect(gameboard.willFollowRules(5, 9, 1)).toEqual(false);
});

it("should be able to detect if  placeShip is going to overflow the board 2", () => {
  let gameboard = gameboardFactory();
  expect(gameboard.willFollowRules(2, 6, 1)).toEqual(true);
});
