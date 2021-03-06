import React from "react";
import ReactDOM from "react-dom";
import "./index.css";

const Square = (props) =>  {
    return (
      <button onClick={() => props.onClick()} className="square">
        {props.value}
      </button>
    );
}

class Board extends React.Component {


  renderSquare(i) {
    return <Square onClick={() => this.props.onClick(i)} value={this.props.squares[i]} />;
  }

  render() {
    return (
      <div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
     history:[{ squares: new Array(9).fill(null),}],
      isXnext: true
    }
  }
  handleClick(i) {
    const history = this.state.history;
    const current = history[history.length-1];
    const squares = current.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.isXnext ? 'X' : 'O';
    this.setState({history: history.concat([{squares}]),isXnext: !this.state.isXnext});
      }
  render() {
    const history = this.state.history;
    const current = history[history.length-1];
    const winner = calculateWinner(current.squares);
    const moves = history.map((step,index) => {
const text = index ? `Go to move #${index}`: 'go to start';
return(
  <li key={index}>
    <button onClick={() => this.jumpTo(index)}>{text}</button>
  </li>
)
    });
    let status;
    if (winner) {
      status = 'Winner: ' + winner;
    } else {
      status = 'Next player: ' + (this.state.isXnext ? 'X' : 'O');
    }
    return (
      <div className="game">
      <Timer/>
        <div className="game-board">
          <Board onClick={(i) => this.handleClick(i)} squares={current.squares} />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
}
function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
// ========================================

const Timer = () => {
  return (
<div  className="countdown">
  <div className="countdown-number">1</div>
  <svg>
    <circle r="18" cx="20" cy="20"></circle>
  </svg>
</div>
  );
}

ReactDOM.render(<Game />, document.getElementById("root"));
