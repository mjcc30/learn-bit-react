import React, { ReactNode, useState } from "react";
import ReactDOM from "react-dom";
import "./index.css";

type SquareValue = "X" | "O" | null;

const calculateWinner = (squares: SquareValue[]): SquareValue => {
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
};

interface SquareProps {
  onClick(): void;
  value: SquareValue;
}

const Square: React.FC<SquareProps> = (props) => {
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
};

interface BoardProps {
  onClick(i: number): void;
  squares: SquareValue[];
}

const Board: React.FC<BoardProps> = (props) => {
  const renderSquare = (i: number): ReactNode => {
    return <Square value={props.squares[i]} onClick={() => props.onClick(i)} />;
  };

  return (
    <div>
      <div className="board-row">
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </div>
      <div className="board-row">
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </div>
      <div className="board-row">
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
    </div>
  );
};

const Game: React.FC = () => {
  // x commence la partie
  const [xIsNext, setXIsNext] = useState<boolean>(true);
  // tour 0
  const [stepNumber, setStepNumber] = useState<number>(0);
  const [history, setHistory] = useState<{ squares: SquareValue[] }[]>([
    {
      // tableau de 9 cases null
      squares: Array(9).fill(null),
    },
  ]);

  const handleClick = (i: number): void => {
    // fait une copie de history et efface après tout stepNumber 
    const newHistory = history.slice(0, stepNumber + 1);
    // récupere la derniere valeur de l'historique
    const current = newHistory[newHistory.length - 1];
    // fait une copie du tableau
    const squares = current.squares.slice();
    // si il y a un gangnant ou si les cases sont pleines
    // on empeche handleClick
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    // definie si squares[i] = a X ou O en fonction de xIsNext
    squares[i] = xIsNext ? "X" : "O";
    setHistory(
      newHistory.concat([
        {
          squares: squares,
        },
      ])
    );
    setStepNumber(newHistory.length);
    setXIsNext(!xIsNext);
  };

  const jumpTo = (step: number): void => {
    setStepNumber(step);
    // true si pair
    setXIsNext(step % 2 === 0);
  };

  // le tour indiqué par stepNumber
  const current = history[stepNumber];
  const winner = calculateWinner(current.squares);

  const moves = history.map((_, move) => {
    const desc = move
      ? "Revenir au tour n°" + move
      : "Revenir au début de la partie";
    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{desc}</button>
      </li>
    );
  });

  let status;
  if (winner) {
    status = "Gagnant: " + winner;
  } else {
    status = "Joueur suivant: " + (xIsNext ? "X" : "O");
  }

  return (
    <div className="game">
      <div className="game-board">
        <Board squares={current.squares} onClick={(i) => handleClick(i)} />
      </div>
      <div className="game-info">
        <div>{status}</div>
        <ol>{moves}</ol>
      </div>
    </div>
  );
};

// ========================================

ReactDOM.render(<Game />, document.getElementById("root"));
