import React, { ReactNode } from "react";
import "./board.css";
import { Square } from "@mjcc/my-scope.components.square";

export type SquareValue = "X" | "O" | null;
export interface BoardProps {
  onClick(i: number): void;
  squares: SquareValue[];
}

export function Board({ squares, onClick }: BoardProps) {
  const renderSquare = (i: number): ReactNode => {
    return <Square value={squares[i]} onClick={() => onClick(i)} />;
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
}
