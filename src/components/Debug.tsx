import React from "react";
import { useCanvasContext, type KeyStateKeys } from "../context/CanvasContext";
import "../App.css";

const Debug: React.FC = () => {
  const { scale, panPosition, cursorPosition, placingPosition, keyState } = useCanvasContext();
  return (
    <div>
      <div className="flex-space-between">
        <h2>Debug Menu</h2>
      </div>
      <div className="panel-inset mb0 mt0">Readings</div>
      <div className="panel-inset-lighter mt0">
        <p>Scale: {scale}</p>
        <p>
          Pan: (x: {Math.round(panPosition.x * 100) / 100}, y: {Math.round(panPosition.y * 100) / 100})
        </p>
        <p>
          Cursor Position: (x: {cursorPosition.x}, y: {cursorPosition.y})
        </p>
        <p>
          Place Position: (x: {placingPosition.x}, y: {placingPosition.y})
        </p>
        <p>Active Keys: {Object.keys(keyState).filter((key) => keyState[key as keyof KeyStateKeys])}</p>
      </div>
    </div>
  );
};

export default Debug;
