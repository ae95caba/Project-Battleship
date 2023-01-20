const shipFactory = (length) => {
  let hits = 0;
  const isSunk = length - hits === "0";
  const hit = function () {
    this.hits++;
  };

  return { length, hits, isSunk, hit };
};

export default shipFactory;
