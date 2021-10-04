import React from "react";
import "./index.css";
import { SquareProps } from "../../interface/";

const Square = ({ value, onClick }: SquareProps) => {
  if (!value) {
    return <button className="square" onClick={onClick} />;
  }
  return (
    <button className={`square square_${value.toLowerCase()}`}>{value}</button>
  );
};

export default Square;
