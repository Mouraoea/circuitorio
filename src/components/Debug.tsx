import React from "react";
import { useCanvasContext } from "../context/CanvasContext";

const Debug: React.FC = () => {
  const { scale, panPosition, cursorPosition, placingPosition } = useCanvasContext();
  return (
    <div>
      <h2>Debug Menu</h2>
      <p style={{ alignContent: "left", background: "white" }}>Scale: {scale}</p>
      <p style={{ alignContent: "left", background: "white" }}>
        Pan: (x: {Math.round(panPosition.x * 100) / 100}, y: {Math.round(panPosition.y * 100) / 100})
      </p>
      <p style={{ alignContent: "left", background: "white" }}>
        Cursor Position: (x: {cursorPosition.x}, y: {cursorPosition.y})
      </p>
      <p style={{ alignContent: "left", background: "white" }}>
        Place Position: (x: {placingPosition.x}, y: {placingPosition.y})
      </p>
    </div>
  );
};

export default Debug;
