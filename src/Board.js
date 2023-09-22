import React, {Component} from "react";
import Cell from "./Cell";
import './Board.css';


/** Game board of Lights out.
 *
 * Properties:
 *
 * - nrows: number of rows of board
 * - ncols: number of cols of board
 * - chanceLightStartsOn: float, chance any cell is lit at start of game
 *
 * State:
 *
 * - hasWon: boolean, true when board is all off
 * - board: array-of-arrays of true/false
 *
 *    For this board:
 *       .  .  .
 *       O  O  .     (where . is off, and O is on)
 *       .  .  .
 *
 *    This would be: [[f, f, f], [t, t, f], [f, f, f]]
 *
 *  This should render an HTML table of individual <Cell /> components.
 *
 *  This doesn't handle any clicks --- clicks are on individual cells
 *
 **/

class Board extends Component {
static defaultProps = {
  nrows: 5, ncols: 5, chanceLightStartsOn: 0.25
}

  constructor(props) {
    super(props);

    // TODO: set initial state
    this.state = { hasWon: false, board: this.createBoard() }
  }

  /** create a board nrows high/ncols wide, each cell randomly lit or unlit */

  createBoard() {
    let board = [];
    // TODO: create array-of-arrays of true/false values

    for (let i=0; i < this.props.nrows; i++) {
      let row = Array.from( {length: this.props.ncols}, () => (Math.random() < this.props.chanceLightStartsOn));
      board.push(row)
    }
    return board
  }

  /** handle changing a cell: update board & determine if winner */

  flipCellsAround(coord) { // coord will be something like '0-2'
    console.log('FLIPPING', coord)
    let {ncols, nrows} = this.props;
    let board = this.state.board;
    let [y, x] = coord.split("-").map(Number);
    

    function flipCell(y, x) {
      // if this coord is actually on board, flip it

      if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
        board[y][x] = !board[y][x];
      }

      // if(x-1 >= 0 && x-1 < ncols && y >= 0 && y < nrows) {
      //   board[y][x-1] = !board[y][x-1];
      // }

      // if (x+1 >=0 && x+1 < ncols && y >= 0 && y < nrows) {
      //   board[y][x+1] = !board[y][x+1];
      // }

      // if (x >= 0 && x < ncols && y+1 >= 0 && y+1 < nrows) {
      //   board[y+1][x] = !board[y+1][x];
      // }

      // if (x >= 0 && x < ncols && y-1 >= 0 && y-1 < nrows) {
      //   board[y-1][x] = !board[y-1][x];
      // }
    }

    // TODO: flip this cell and the cells around it
    flipCell(y, x); // flip inital cell
    flipCell(y, x-1); // flip left cell
    flipCell(y, x+1); // flip right cell
    flipCell(y-1, x); // flip cell below
    flipCell(y+1, x); // flip cell above
    
    

    // win when every cell is turned off
    // TODO: determine is the game has been won
      
      let hasWon = !this.state.board.flat().includes(true); // array doesn't contain true so all lights are off
      // let hasWon = board.every(row => row.every(cell => !cell)); // another way of doing it
      this.setState({board: board, hasWon: hasWon});
    }  
  

  

  /** Render game board or winning message. */

  

    
makeTable= () => {
  let tblBoard = [];
    for (let y=0; y < this.props.nrows; y++){
      let row = [];
      this.state.board[y].forEach((element, idx) => {
        let coord = `${y}-${idx}`
        row.push(<Cell  isLit={element} 
                        key={coord} 
                        flipCellsAroundMe={() => this.flipCellsAround(coord)}
                />);
      })
      tblBoard.push(<tr key={y}>{row}</tr>);
    }
    return tblBoard;
}

    // if the game is won, just show a winning msg & render nothing else

    // TODO

    // make table board
    
    
    render() {
    return(
      <div>
        {this.state.hasWon ? (
          <div className='winner'>
            <span className='Lights'>YOU </span>
            <span className='Out'>WIN!</span>
          </div>
        ) : (
          <div>
            <div className='Board-title'>
              <div className='Lights'>Lights </div>
              <div className='Out'>Out</div>
            </div>
            <table className='Board'>
              <tbody>
                {this.makeTable()}
              </tbody>
            </table>
          </div>
        )}
      </div>
    );
  }
}


export default Board;
