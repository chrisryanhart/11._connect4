/** Connect Four
 *
 * Player 1 and 2 alternate turns. On each turn, a piece is dropped down a
 * column until a player gets four-in-a-row (horiz, vert, or diag) or until
 * board fills (tie)
 */

const WIDTH = 7;
const HEIGHT = 6;

let currPlayer = 1; // active player: 1 or 2
const board = []; // array of rows, each row is array of cells  (board[y][x])


/** makeBoard: create in-JS board structure:
 *    board = array of rows, each row is array of cells  (board[y][x])
 */
function makeBoard() {
  // TODO: set "board" to empty HEIGHT x WIDTH matrix array

  for(let i = 0; i<HEIGHT; i++){
    //create set of rows to be pushed to the board array
    const widthArr = [];
    for(let j=0; j<WIDTH; j++){
      widthArr[j] = null;
    }
    //Loop pushes the height to the final array
    board.push(widthArr);

  }
}


/** makeHtmlBoard: make HTML table and row of column tops. */

function makeHtmlBoard() {
  // TODO: get "htmlBoard" variable from the item in HTML w/ID of "board"
  const htmlBoard = document.getElementById('board');

  // TODO: add comment for this code
  
  //creates the top, clickable row of the htmlBoard
  const top = document.createElement("tr");
  //sets id of column top to ease CSS styling
  top.setAttribute("id", "column-top");
  //adds clicklistener as the game user interface
  top.addEventListener("click", handleClick);

  //sets number of tds based on the width for the top, user-interface row
  for (var x = 0; x < WIDTH; x++) {
    const headCell = document.createElement("td");
    headCell.setAttribute("id", x);
    top.append(headCell);
  }

  //appends the top, clickable row to the htmlBoard
  htmlBoard.append(top);

  // TODO: add comment for this code

  //Creates cells for the board based on the width and height
  for (let y = 0; y < HEIGHT; y++) {
    const row = document.createElement("tr");
    for (let x = 0; x < WIDTH; x++) {
      const cell = document.createElement("td");
      cell.setAttribute("id", `${y}-${x}`);
      row.append(cell);
    }
    htmlBoard.append(row);
  }
}


/** findSpotForCol: given column x, return top empty y (null if filled) */

function findSpotForCol(x) {
  // TODO: write the real version of this, rather than always returning 0

  for(let j= HEIGHT-1; j>=0; j--){
    // console.log(board[j][x]);
    if(board[j][x]===null){
      return j;
    }
  }
  return null;
}




/** placeInTable: update DOM to place piece into HTML table of board */

function placeInTable(y, x) {
  // TODO: make a div and insert into correct table cell
  const div = document.createElement('div');

  //sets the player piece class so color can be changed in CSS
  if(currPlayer === 1){
    div.setAttribute('class','p1');
  }
  else{
    div.setAttribute('class', 'p2')
  }
  
  const td = document.getElementById(`${y}-${x}`);
  td.append(div);

  console.log('Here is my div:', td);

}




/** endGame: announce game end */

function endGame(msg) {
  // TODO: pop up alert message
  alert(msg);
}




/** handleClick: handle click of column top to play piece */

function handleClick(evt) {
  // get x from ID of clicked cell
  let x = +evt.target.id;

  // get next spot in column (if none, ignore click)
  let y = findSpotForCol(x);
  if (y === null) {
    return;
  }

  // place piece in board and add to HTML table
        //this will help us find if board is full
        //could help tell us if there's a win


  // TODO: add line to update in-memory board
  board[y][x] = currPlayer;

  placeInTable(y, x);

  // check for win
  if (checkForWin()) {
    return endGame(`Player ${currPlayer} won!`);
  }

  // check for tie
  // TODO: check if all cells in board are filled; if so call, call endGame
  const boardState = board.every(row => num.every(num => num !== null));

  //stops game and sends alert if board is full
  if(boardState){
    board[y][x] = currPlayer;
  endGame('Board is full.  Tie game.');
}

// TODO: switch currPlayer 1 <-> 2
  currPlayer === 1 ? currPlayer = 2 : currPlayer = 1;
}




/** checkForWin: check board cell-by-cell for "does a win start here?" */

function checkForWin() {
  function _win(cells) {
    // Check four cells to see if they're all color of current player
    //  - cells: list of four (y, x) cells
    //  - returns true if all are legal coordinates & all match currPlayer

    //This function checks every possible board combination to verify they are all the same player && still a valid place on the board.
    return cells.every(
      ([y, x]) =>
        y >= 0 &&
        y < HEIGHT &&
        x >= 0 &&
        x < WIDTH &&
        board[y][x] === currPlayer
    );
  }

  // TODO: read and understand this code. Add comments to help you.
  
  //The loops below cover every opportunity on the board for a win
  for (let y = 0; y < HEIGHT; y++) {
    for (let x = 0; x < WIDTH; x++) {
      let horiz = [[y, x], [y, x + 1], [y, x + 2], [y, x + 3]];
      let vert = [[y, x], [y + 1, x], [y + 2, x], [y + 3, x]];
      let diagDR = [[y, x], [y + 1, x + 1], [y + 2, x + 2], [y + 3, x + 3]];
      let diagDL = [[y, x], [y + 1, x - 1], [y + 2, x - 2], [y + 3, x - 3]];

      //if any of these different possibilities pass the _win(), checkForWin() returns true and ends game
      if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) {
        return true;
      }
    }
  }
}

makeBoard();
makeHtmlBoard();
