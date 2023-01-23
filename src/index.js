import gameboardFactory from "./gameboardFactory";
import shipFactory from "./shipFactory";
import { domRenderBoard, domPopulateBoard, axisButton } from "./domInteraction";
import { gameLoop } from "./gameLoop";

axisButton();
gameLoop();
