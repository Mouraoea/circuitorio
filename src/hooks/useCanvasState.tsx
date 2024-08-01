import { useState, useRef } from "react";
import { CircuitElementProps } from "../store/circuitSlice";

export const useCanvasState = () => {
  const [appVersion, setAppVersion] = useState("0.0.0");
  const [scale, setScale] = useState(3);
  const [startPanPosition, setStartPanPosition] = useState({ x: 0, y: 0 });
  const [panPosition, setPanPosition] = useState({ x: 0, y: 0 });
  const [panPercentage, setPanPercentage] = useState({ x: 0, y: 0 });
  const [transformOrigin, setTransformOrigin] = useState({ x: 0, y: 0 });
  const [gridSize] = useState(32);
  const [gridHeight] = useState(100);
  const [gridWidth] = useState(200);
  const [isPanning, setIsPanning] = useState(false);
  const boardRef = useRef<HTMLDivElement>(null);
  const [placingPosition, setPlacingPosition] = useState({ x: 0, y: 0 });
  const [ghostElementPosition, setGhostElementPosition] = useState({ x: 0, y: 0 });
  const [elementToPlace, setElementToPlace] = useState<CircuitElementProps | null>(null);
  const [isPlacing, setIsPlacing] = useState(false);
  const [placingElementRotation, setPlacingElementRotation] = useState(0);

  return {
    appVersion,
    setAppVersion,
    scale,
    setScale,
    startPanPosition,
    setStartPanPosition,
    panPosition,
    setPanPosition,
    panPercentage,
    setPanPercentage,
    transformOrigin,
    setTransformOrigin,
    gridSize,
    gridHeight,
    gridWidth,
    isPanning,
    setIsPanning,
    boardRef,
    placingPosition,
    setPlacingPosition,
    ghostElementPosition,
    setGhostElementPosition,
    elementToPlace,
    setElementToPlace,
    isPlacing,
    setIsPlacing,
    placingElementRotation,
    setPlacingElementRotation,
  };
};
