export type SquareValue = "X" | "O" | null;

export interface BoardProps {
  onClick(i: number): void;
  squares: SquareValue[];
}

export interface SquareProps {
  onClick(): void;
  value: SquareValue;
}
