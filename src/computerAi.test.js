import { computerAi } from "./ai";

it("should be able to keep track of missed shots2", () => {
  let gameboard = gameboardFactory();

  gameboard.placeShip(2, 6, 2);
  gameboard.reciveAttack(2, 2);

  expect(gameboard.board[2][2] === "missed").toEqual(true);
});
