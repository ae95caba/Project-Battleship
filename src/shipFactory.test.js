import shipFactory from "./shipFactory";

it("hit method should be able to increase hits property", () => {
  const ship = shipFactory(2);
  ship.hit();

  expect(ship.hits).toEqual(1);
});
