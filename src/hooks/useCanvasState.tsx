import { useState, useRef, ReactNode } from "react";
import { CircuitElementProps } from "../store/circuitSlice";

export const useCanvasState = () => {
  const [disclaimerIsOpen, setDisclaimerIsOpen] = useState(false);
  const [appVersion, setAppVersion] = useState("0.0.0");
  const [scale, setScale] = useState(1);
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
  const [zoomCenter, setZoomCenter] = useState({ x: 0, y: 0 });
  const [hoveredElement, setHoveredElement] = useState<CircuitElementProps | null>(null);
  const [selectedElement, setSelectedElement] = useState<CircuitElementProps | null>(null);
  const [isDebugMode, setIsDebugMode] = useState(false);
  const [isEntityPanelOpen, setIsEntityPanelOpen] = useState(false);
  const [isEntityPanelDragging, setIsEntityPanelDragging] = useState(false);
  const [entityPanelPosition, setEntityPanelPosition] = useState({ x: 0, y: 0 });
  const [entityPanelContent, setEntityPanelContent] = useState<ReactNode>(null);
  const [isSignalPickerOpen, setIsSignalPickerOpen] = useState(false);
  const [isSignalPickerDragging, setIsSignalPickerDragging] = useState(false);
  const [SignalPickerPosition, setSignalPickerPosition] = useState({ x: 0, y: -250 });
  const [SignalPickerContent, setSignalPickerContent] = useState<ReactNode>(null);
  const [selectedSignalSlot, setSelectedSignalSlot] = useState<{ [key: string]: string } | null>(null);
  const [signalPickerSelectedGroup, setSignalPickerSelectedGroup] = useState("logistics");
  const [signalPickerConstantValue, setSignalPickerConstantValue] = useState(1);
  const [signalPickerSelectedSignal, setSignalPickerSelectedSignal] = useState("");

  return {
    disclaimerIsOpen,
    setDisclaimerIsOpen,
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
    zoomCenter,
    setZoomCenter,
    hoveredElement,
    setHoveredElement,
    selectedElement,
    setSelectedElement,
    isDebugMode,
    setIsDebugMode,
    isEntityPanelOpen,
    setIsEntityPanelOpen,
    isEntityPanelDragging,
    setIsEntityPanelDragging,
    entityPanelPosition,
    setEntityPanelPosition,
    entityPanelContent,
    setEntityPanelContent,
    isSignalPickerOpen,
    setIsSignalPickerOpen,
    isSignalPickerDragging,
    setIsSignalPickerDragging,
    SignalPickerPosition,
    setSignalPickerPosition,
    SignalPickerContent,
    setSignalPickerContent,
    selectedSignalSlot,
    setSelectedSignalSlot,
    signalPickerSelectedGroup,
    setSignalPickerSelectedGroup,
    signalPickerConstantValue,
    setSignalPickerConstantValue,
    signalPickerSelectedSignal,
    setSignalPickerSelectedSignal,
  };
};
