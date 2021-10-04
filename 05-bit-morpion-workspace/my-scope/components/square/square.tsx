import React from "react";
import "./square.css";

export type SquareValue = "X" | "O" | null;
export interface SquareProps {
  onClick(): void;
  value: SquareValue;
}

export function Square({ value, onClick }: SquareProps) {
  if (!value) {
    return <button className="square" onClick={onClick} />;
  }
  return (
    <button className={`square square_${value.toLowerCase()}`} disabled>
      {value}
    </button>
  );
}
