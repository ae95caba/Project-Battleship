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


				computer ai:
				if (hit){
					//check valid adyacent move
							start by left{
									if (hit){ keep left
											 repeat 
									if(!hit) check right of the first hit
											if(hit) keep right
														repeat till no more (hit)}
								try with top{
										if (hit) keep top
											 repeat 
									if(!hit) check bottom of the first hit
											if(hit) keep bottom
														repeat till no more (hit)
								}
				}

			once it hits
				make array with valid moves(left,right,etc) or 2 arrays
				pick randomly a direction between the valid moves array
				make a new coordinate to apply the choosed direction
				use the new coordinate

			ai keeps with direction but gets stuck on grey box and donest move