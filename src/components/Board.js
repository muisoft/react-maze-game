import React, { Component } from 'react';
import {Cell} from './Cell';

class Board extends Component {
  
  
  chooseObject = (type) => {
    let src = '';
    switch(type){
      case 1:
       src = '/mario left.png';
       break;
      case 2:
       src = '/mushroom.png';
       break;
       default:

    }
    return src;
  }
  onDrawBoard =() =>{
    let { board, rows, cols } = this.props;
    let newBoard = [];
    let cellClass = "";
    let imgSrc = "";
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; ++j) {
          //cellClass = (board[i][j] === 0 ? '#fff' : (board[i][j] === 1 ? 'red' : 'green'));
          cellClass = board[i][j] === 0 ? '#fff' : '';
          imgSrc = this.chooseObject( board[i][j]);
          let id = i+ "_"+j ;
          newBoard.push( 
            <Cell
              key={id}
              id={id}
              src= {imgSrc}
              cellClass={cellClass} />
          );          
      }
    }
    return newBoard;
  }
  
  render(){
    const width = this.props.cols * 32;
    const height = this.props.rows * 32;
    return(
      <div className="board" style={{width: width, height: height}}>
        {
          this.onDrawBoard()
        }
      </div>
    );
  }
}
export default Board;