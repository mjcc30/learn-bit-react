import React, { useState } from "react";
import { Square } from "./square";

export const BasicSquare = () => {
  const [value, setvalue] = useState(null);
  const handleClick = () => {
    setvalue("X");
  };
  return <Square value={value} onClick={handleClick} />;
};
