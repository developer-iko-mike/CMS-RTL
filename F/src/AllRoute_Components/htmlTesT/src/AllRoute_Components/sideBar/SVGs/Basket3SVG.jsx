import React from "react";

export default function Basket3SVG({
  fill = "#4d4d4d",
  width = 20,
  height = 20,
  onClick,
  className,
}) {
  return (
    <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 256 256"
    fill={fill}
    width={width}
    height={height}
    onClick={onClick}
    className={className}
    >
      <path d="M237.9,198.36l-14.25-120a14.06,14.06,0,0,0-14-12.36H174V64a46,46,0,0,0-92,0v2H46.33a14.06,14.06,0,0,0-14,12.36l-14.25,120a14,14,0,0,0,14,15.64H223.92a14,14,0,0,0,14-15.64ZM94,64a34,34,0,0,1,68,0v2H94ZM225.5,201.3a2.07,2.07,0,0,1-1.58.7H32.08a2.07,2.07,0,0,1-1.58-.7,1.92,1.92,0,0,1-.49-1.53l14.26-120A2,2,0,0,1,46.33,78H209.67a2,2,0,0,1,2.06,1.77l14.26,120A1.92,1.92,0,0,1,225.5,201.3Z" />
    </svg>
  );
}
