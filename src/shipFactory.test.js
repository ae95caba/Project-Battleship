import shipFactory from "./shipFactory";

it("hit method should be able to increase hits property", () => {
  const ship = shipFactory(2);
  ship.hit();

  expect(ship.hits).toEqual(1);
});

it("hit method should be able set isSunk to true when all its parts are have been hitted", () => {
  let ship = shipFactory(2);
  ship.hit();
  ship.hit();

  expect(ship.isSunk()).toEqual(true);
});
