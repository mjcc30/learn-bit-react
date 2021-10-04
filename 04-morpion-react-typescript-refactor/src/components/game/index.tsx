import React, { useState } from "react";
import Board from "../board";
import { SquareValue } from "../../interface/";

import calculateWinner from "./calculateWinner";
import "./index.css";

const Game = () => {
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

  let status: string;
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

export default Game;
