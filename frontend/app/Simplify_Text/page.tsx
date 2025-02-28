// SimplifyText.tsx
import React from "react";

interface SimplifyTextProps {
  selectedText: string;
  simplifiedText: string;
  hoverPosition: { x: number; y: number };
  isHovering: boolean;
}

const SimplifyText: React.FC<SimplifyTextProps> = ({
  selectedText,
  simplifiedText,
  hoverPosition,
  isHovering,
}) => {
  if (!isHovering || !selectedText) return null;

  return (
    <div
      className="absolute bg-blue-500 text-white p-2 rounded shadow-md"
      style={{
        left: hoverPosition.x + "px",
        top: hoverPosition.y + "px",
      }}
    >
      <h4>Selected Text:</h4>
      <p>{selectedText}</p>
      <h4>Simplified Text:</h4>
      <p>{simplifiedText}</p>
    </div>
  );
};

export default SimplifyText;
