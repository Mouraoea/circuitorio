import React from "react";
import { useCanvasContext, type KeyStateKeys } from "../context/CanvasContext";
import "../App.css";

const Debug: React.FC = () => {
  const { scale, panPosition, panPercentage, transformOrigin, cursorPosition, placingPosition, keyState, cursorGridPosition, isLeftDrawerOpen, ghostElementPosition } = useCanvasContext();
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
          Pan Percentage: (x: {Math.round(panPercentage.x * 100) / 100}%, y: {Math.round(panPercentage.y * 100) / 100}%)
        </p>
        <p>
          Cursor Position: (x: {cursorPosition.x}, y: {cursorPosition.y})
        </p>
        <p>
          Cursor Grid Coord: (x: {cursorGridPosition.x}, y: {cursorGridPosition.y})
        </p>
        <p>
          Ghost Element Position: (x: {Math.round(ghostElementPosition.x * 100) / 100}, y: {Math.round(ghostElementPosition.y * 100) / 100})
        </p>
        <p>
          Place Position: (x: {placingPosition.x}, y: {placingPosition.y})
        </p>
        <p>Active Keys: {Object.keys(keyState).filter((key) => keyState[key as keyof KeyStateKeys])}</p>
        <p>Left Drawer: {isLeftDrawerOpen ? "Open" : "Closed"}</p>
      </div>
    </div>
  );
};

export default Debug;
