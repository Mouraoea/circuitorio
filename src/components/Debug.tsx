import React from "react";
import { useCanvasContext } from "../context/CanvasContext";
import "../App.css";
import { KeyStateKeys } from "../hooks/useInputState";
import { useDrawerContext } from "../context/DrawerContext";
import { useInputContext } from "../context/InputContext";
import { useUIContext } from "../context/UIContext";

const Debug: React.FC = () => {
  const { appVersion, scale, panPosition, panPercentage, isPlacing, placingPosition, elementToPlace } = useCanvasContext();

  const { selectedElement, isDebugMode, setIsDebugMode, selectedSignalSlot, signalPickerSelectedSignal, signalPickerConstantValue, hoveredElement } = useUIContext();

  const { cursorPosition, cursorGridCoordinates, keyState, cursorGridPosition } = useInputContext();

  const { isLeftDrawerOpen } = useDrawerContext();

  const toggleDebugMode = () => {
    setIsDebugMode(!isDebugMode);
  };

  return (
    <div>
      <div className="flex">
        <button className={`button ${isDebugMode ? "active" : ""}`} onClick={toggleDebugMode} style={{ width: "43px", marginBottom: "12px" }}>
          {/* {isDebugMode ? "Disable Debug Mode" : "Enable Debug Mode"} */}
          <svg xmlns="http://www.w3.org/2000/svg" width="32px" height="32px" viewBox="0 0 24 24" fill="none">
            <path
              d="M12 19C9.23858 19 7 16.7614 7 14M12 19C14.7614 19 17 16.7614 17 14M12 19V14M7 14V11.8571C7 11.0592 7 10.6602 7.11223 10.3394C7.31326 9.76495 7.76495 9.31326 8.33944 9.11223C8.66019 9 9.05917 9 9.85714 9H14.1429C14.9408 9 15.3398 9 15.6606 9.11223C16.2351 9.31326 16.6867 9.76495 16.8878 10.3394C17 10.6602 17 11.0592 17 11.8571V14M7 14H4M17 14H20M17 10L19.5 7.5M4.5 20.5L8 17M7 10L4.5 7.5M19.5 20.5L16 17M14 6V5C14 3.89543 13.1046 3 12 3C10.8954 3 10 3.89543 10 5V6H14Z"
              stroke="#000000"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </button>
        <h2>Debug Menu</h2>
      </div>
      <div className="panel-inset mb0 mt0">
        <p>Version: {appVersion}</p>
        <p>Readings</p>
      </div>

      <div className="panel-inset-lighter mt0">
        <p>Debug Mode: {isDebugMode ? "Enabled" : "Disabled"}</p>
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
        {hoveredElement && (
          <ul>
            <li>Name: {hoveredElement.displayName}</li>
            <li>Orientation: {hoveredElement.orientation}</li>
            <li>
              x: {hoveredElement.position.x}, y: {hoveredElement.position.y}
            </li>
            <li>Rotation: {hoveredElement.rotation}</li>
            <li>Signals: {JSON.stringify(hoveredElement.signals)}</li>
          </ul>
        )}
        {isPlacing && (
          <ul>
            <li>Name: {elementToPlace?.displayName}</li>
            <li>Orientation: {elementToPlace?.orientation}</li>
            <li>
              x: {elementToPlace?.position.x}, y: {elementToPlace?.position.y}
            </li>
            <li>Rotation: {elementToPlace?.rotation}</li>
            <li>Signals: {JSON.stringify(elementToPlace?.signals)}</li>
          </ul>
        )}

        <p>
          Place Position: (x: {placingPosition.x}, y: {placingPosition.y})
        </p>
        <p>Selected Element </p>
        {selectedElement && (
          <ul>
            <li>Name: {selectedElement.displayName}</li>
            <li>Orientation: {selectedElement.orientation}</li>
            <li>
              x: {selectedElement.position.x}, y: {selectedElement.position.y}
            </li>
            <li>Signals: {JSON.stringify(selectedElement.signals)}</li>
          </ul>
        )}
        <p>Signal Picker:</p>
        <ul>
          <li>Slot id: {JSON.stringify(selectedSignalSlot)}</li>
          <li>Selected signal: {signalPickerSelectedSignal}</li>
          <li>Constant value: {signalPickerConstantValue}</li>
        </ul>

        <p>Active Keys: {Object.keys(keyState).filter((key) => keyState[key as keyof KeyStateKeys])}</p>
        <p>Left Drawer: {isLeftDrawerOpen ? "Open" : "Closed"}</p>
      </div>
    </div>
  );
};

export default Debug;
