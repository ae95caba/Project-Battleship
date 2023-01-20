function
add event listener to boardObj
get x y cordinates

if cordinates not repeated :
attack with those coordinates{
	populate boardObj
	add computer attack with populate body
	re-run function
}
else alert repeated
and re-run function 

computerBoard.addEventListener(
    "click",
    (e) => {

      let x = e.target.dataset.x;
      let y = e.target.parentElement.dataset.y;

      if (computerBoardObj.reciveAttack(x, y) !== "repetido") {
        computerBoardObj.reciveAttack(x, y);
        domPopulateBoard(computerBoardObj, "#computerBoard", false);
        /////////// aca termia la interaccion del jugador
        setTimeout(() => {
          computerAttack();
          domPopulateBoard(playerBoardObj, "#playerBoard");
          playerTurn();
        }, 2000);
      } else {
        alert("repetido");
        playerTurn();
      }
    },