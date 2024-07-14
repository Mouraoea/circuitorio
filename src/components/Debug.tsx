import React from "react";
import { useCanvasContext } from "../context/CanvasContext";
import "../App.css";

const Debug: React.FC = () => {
  const { scale, panPosition, cursorPosition, placingPosition } = useCanvasContext();
  return (
    <div>
      <div className="flex-space-between">
        <h2>Debug Menu</h2>
      </div>
      <div className="panel-inset mb0 mt0">Readings</div>
      <div className="panel-inset-lighter mt0">
        <p style={{ alignContent: "left" }}>Scale: {scale}</p>
        <p style={{ alignContent: "left" }}>
          Pan: (x: {Math.round(panPosition.x * 100) / 100}, y: {Math.round(panPosition.y * 100) / 100})
        </p>
        <p style={{ alignContent: "left" }}>
          Cursor Position: (x: {cursorPosition.x}, y: {cursorPosition.y})
        </p>
        <p style={{ alignContent: "left" }}>
          Place Position: (x: {placingPosition.x}, y: {placingPosition.y})
        </p>
      </div>
    </div>
  );
};

export default Debug;
