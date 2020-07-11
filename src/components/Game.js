import React from 'react';
import Board from './Board';

class Game extends React.Component {
  constructor(props){
    super(props);
    
    // We represent our player and sprite with 1 and 2
    this.player = 1;
    this.sprite = 2;

    this.state={
      rows: 0,
      cols: 0,
      board: [],
      playerPos: [],
      movement: 0,
      spriteSize: 0 
    }
  } 
  componentWillMount(){
     // Ask for dimension from users
    let widthPrompt = prompt("Please enter board width ");
    if(widthPrompt === null || widthPrompt === ""){
  
    } else {
      //let size = width.split('X');
      let width = parseInt(widthPrompt);
      if(widthPrompt === null || widthPrompt === ""){
        return;
      } else {
        let heightPrompt = prompt("Please enter board height");
        let height = parseInt(heightPrompt);
         // We initialize our Board created with dimension given by user, by filling it up with zero
         let board = Array(width).fill().map(() => Array(height).fill(0));
        this.setState({
          rows:  width,
          cols:  height,
          board: board,
          spriteSize: width
        });
      }
  
    }
  }
  componentDidMount(){
    let { board, rows, cols } = this.state;
    // Subscribe to keyboard keys
    window.addEventListener("keydown", this.handleKeyDown.bind(this));

    // Get board that has player on it
    if(board){
    let newBoard = this.placePlayer(board, rows, cols);
    // Also draw sprites on this board
    this.placeSprites(newBoard, rows, cols);
    }
  }
  // Get available empty space on the Board
  getAvailablePositions = (board, rows, cols) => {
    let floors = [];
    for (let x = 0; x < rows; x++) {
      for (let y = 0; y < cols; y++) {
        
        if (board[x][y] === 0 && board[x][y] !== 1) {
          floors.push([x, y]);
        }
      }
    }
    return floors;
  }
  // placePlayer at the center of our board
  placePlayer = (board, rows, cols) => {
    let newBoard = this.cloneBoard(board); 
    // Get center of our board
    let centerX = Math.floor(rows/2);
    let centerY = Math.floor(cols/2);
    // Place player at the center of our board
    newBoard[centerX][centerY] = this.player;
    // Set player position
    this.setState({
      playerPos: [centerX, centerY]
    })
    // Return new board that has the player place at the center
    return newBoard;
  }
  // Get available empty space randomly on the Board
  getSpritesPositions = (board, rows, cols) => {
    let available = this.getAvailablePositions(board, rows, cols);
    let pos = [];
    while(pos.length < rows){
      let rand = (available[Math.floor(Math.random() * available.length)]);//Math.floor(Math.random()*100) + 1;
      if(pos.indexOf(rand) === -1) pos.push(rand);
  }
  return pos;
  }
  // We place our sprites on available empty space randomly on the Board
  placeSprites = (board, rows, cols) => {
    let newBoard = this.cloneBoard(board); 
    let spritesPos = this.getSpritesPositions(board, rows, cols); 
    
    for(let i = 0; i < spritesPos.length; i++){
      let [row, col] = spritesPos[i];
      newBoard[row][col] = this.sprite;
    }
    this.setState({
      board: newBoard
    });
  }
  cloneBoard=(board)=>{
    return JSON.parse(JSON.stringify(board));
  }

  handleKeyDown(e) {
    let { playerPos } = this.state;
    
    switch (e.keyCode) {
        case 37:
        case 65:
            this.move(playerPos[0] , playerPos[1] - 1);
            console.log("Player Pos: "+ playerPos[1]);
            break;
        case 38:
        case 87:
            this.move(playerPos[0] - 1, playerPos[1]);
            console.log("Player Pos: "+ playerPos[0]);
            break;
        case 39:
        case 68:
            this.move(playerPos[0], playerPos[1] + 1);
            console.log("Player Pos: "+ playerPos[1]);
            break;
        case 40:
        case 83:
            this.move(playerPos[0] + 1, playerPos[1]);
            console.log("Player Pos: "+ playerPos[0]);
            break;
        default:
            return;
    }
}

move(x, y) {
    let { board, playerPos, spriteSize, rows, cols } = this.state;
    
      let canMove = board[x][y];
      let [playerX, playerY] = playerPos;
      let spriteCount = spriteSize;
      if (canMove === 0) {
        board[playerX][playerY] = 0;
        board[x][y] = 1;
      } 
      if (canMove === 2) {
        board[x][y] = 1;
        board[playerX][playerY] = 0;
        --spriteCount;
        if(spriteSize === 0){
          alert("Game Over with " + this.state.movement + " moves");
        }
      }
      this.movePlayer(board, x, y, spriteCount);
    
     
}
movePlayer = (board, x, y, spriteCount) => {
  let newBoard =  this.cloneBoard(board);
 
  this.setState({
    movement: this.state.movement + 1,
    spriteSize: spriteCount,
    playerPos: [x, y],
    board: newBoard
  })
  
  console.log("Movement: " + this.state.movement);
  console.log("Sprite Count: " + this.state.spriteSize);
}
restartGame  = () => {
 /* // We clear off our board by filling up our board with false value.
  let board = Array(this.rows).fill().map(() => Array(this.cols).fill(0));
  this.setState({board: board});*/

   // Ask for dimension from users
   let dim = prompt("Please enter board dimension", "10X10");
   if(dim === null || dim === ""){
 
   } else {
     let size = dim.split('X');
     let rows = parseInt(size[0]);
     let cols = parseInt(size[0]);
    
     // We initialize our Board created with dimension given by user, by filling it up with zero
     let board = Array(rows).fill().map(() => Array(cols).fill(0));
     
     //
 
   }
}
  render(){
    return (
      <div className="container">       
        <Board
          player={this.player}
          sprite={this.sprite}
          rows={this.state.rows}
          cols={this.state.cols}
          board={this.state.board}
        />
      </div>
    );
  }
}

export default Game;