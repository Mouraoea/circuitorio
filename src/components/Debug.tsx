import React from "react";
import { useCanvasContext, type KeyStateKeys } from "../context/CanvasContext";
import "../App.css";

const Debug: React.FC = () => {
  const { scale, panPosition, panPercentage, cursorPosition, cursorGridCoordinates, isPlacing, placingPosition, keyState, cursorGridPosition, isLeftDrawerOpen, ghostElementPosition, hoveredElement } =
    useCanvasContext();
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
          Cursor Position (View port): (x: {cursorPosition.x}px, y: {cursorPosition.y}px)
        </p>
        <p>
          Cursor Position (Grid): (x: {cursorGridPosition.x}, y: {cursorGridPosition.y})
        </p>
        <p>
          Cursor Coordinates: (x: {cursorGridCoordinates.x}, y: {cursorGridCoordinates.y})
        </p>
        <p>
          Ghost Element Position: (x: {isPlacing ? Math.round(ghostElementPosition.x * 100) / 100 : "-"}, y: {isPlacing ? Math.round(ghostElementPosition.y * 100) / 100 : "-"})
        </p>
        <p>
          Place Position: (x: {placingPosition.x}, y: {placingPosition.y})
        </p>
        <p>Hovered Element: {hoveredElement ? "Name: " + hoveredElement.name + ", Orientation: " + hoveredElement.orientation : "None"}</p>
        <p>Active Keys: {Object.keys(keyState).filter((key) => keyState[key as keyof KeyStateKeys])}</p>
        <p>Left Drawer: {isLeftDrawerOpen ? "Open" : "Closed"}</p>
      </div>
    </div>
  );
};

export default Debug;
