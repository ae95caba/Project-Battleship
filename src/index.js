import gameboardFactory from "./gameboardFactory";
import shipFactory from "./shipFactory";
import { domRenderBoard, domPopulateBoard } from "./domInteraction";
import { gameLoop } from "./gameLoop";

function computerAttack(boardObj) {
  function randomIntFromInterval(min, max) {
    // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  boardObj.reciveAttack(
    randomIntFromInterval(0, 9),
    randomIntFromInterval(0, 9)
  );
}

gameLoop();
