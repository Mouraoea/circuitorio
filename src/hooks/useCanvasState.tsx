import { useState, useRef, ReactNode } from "react";
import { CircuitElementProps } from "../store/circuitSlice";

export const useCanvasState = () => {
  const [disclaimerIsOpen, setDisclaimerIsOpen] = useState(false);
  const [appVersion, setAppVersion] = useState("0.0.0");
  const [scale, setScale] = useState(1);
  const [panPosition, setPanPosition] = useState({ x: 0, y: 0 });
  const [panPercentage, setPanPercentage] = useState({ x: 0, y: 0 });
  const [transformOrigin, setTransformOrigin] = useState({ x: 0, y: 0 });
  const [gridSize] = useState(32);
  const [gridHeight] = useState(100);
  const [gridWidth] = useState(200);
  const [isPanning, setIsPanning] = useState(false);
  const boardRef = useRef<HTMLDivElement>(null);
  const [keyState, setKeyState] = useState<KeyStateKeys>({
    a: false,
    b: false,
    c: false,
    d: false,
    e: false,
    f: false,
    g: false,
    h: false,
    i: false,
    j: false,
    k: false,
    l: false,
    m: false,
    n: false,
    o: false,
    p: false,
    q: false,
    r: false,
    s: false,
    t: false,
    u: false,
    v: false,
    w: false,
    x: false,
    y: false,
    z: false,
    "1": false,
    "2": false,
    "3": false,
    "4": false,
    "5": false,
    "6": false,
    "7": false,
    "8": false,
    "9": false,
    "0": false,
    "-": false,
    "=": false,
    "[": false,
    "]": false,
    "\\": false,
    ";": false,
    "'": false,
    ",": false,
    ".": false,
    "/": false,
    " ": false,
    shift: false,
    control: false,
    alt: false,
    meta: false,
    ArrowUp: false,
    ArrowDown: false,
    ArrowLeft: false,
    ArrowRight: false,
    F1: false,
    F2: false,
    F3: false,
    F4: false,
    F5: false,
    F6: false,
    F7: false,
    F8: false,
    F9: false,
    F10: false,
    F11: false,
    F12: false,
  });
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [cursorGridPosition, setCursorGridPosition] = useState({ x: 0, y: 0 });
  const [cursorGridCoordinates, setCursorGridCoordinates] = useState({ x: 0, y: 0 });
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

  const updateKeyState = (value: Partial<KeyStateKeys>) => {
    setKeyState((prevKeyState) => ({ ...prevKeyState, ...value }));
  };

  return {
    disclaimerIsOpen,
    setDisclaimerIsOpen,
    appVersion,
    setAppVersion,
    scale,
    setScale,
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
    keyState,
    setKeyState: updateKeyState,
    cursorPosition,
    setCursorPosition,
    cursorGridPosition,
    setCursorGridPosition,
    cursorGridCoordinates,
    setCursorGridCoordinates,
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

export interface KeyStateKeys {
  a: boolean;
  b: boolean;
  c: boolean;
  d: boolean;
  e: boolean;
  f: boolean;
  g: boolean;
  h: boolean;
  i: boolean;
  j: boolean;
  k: boolean;
  l: boolean;
  m: boolean;
  n: boolean;
  o: boolean;
  p: boolean;
  q: boolean;
  r: boolean;
  s: boolean;
  t: boolean;
  u: boolean;
  v: boolean;
  w: boolean;
  x: boolean;
  y: boolean;
  z: boolean;
  "1": boolean;
  "2": boolean;
  "3": boolean;
  "4": boolean;
  "5": boolean;
  "6": boolean;
  "7": boolean;
  "8": boolean;
  "9": boolean;
  "0": boolean;
  "-": boolean;
  "=": boolean;
  "[": boolean;
  "]": boolean;
  "\\": boolean;
  ";": boolean;
  "'": boolean;
  ",": boolean;
  ".": boolean;
  "/": boolean;
  " ": boolean;
  shift: boolean;
  control: boolean;
  alt: boolean;
  meta: boolean;
  ArrowUp: boolean;
  ArrowDown: boolean;
  ArrowLeft: boolean;
  ArrowRight: boolean;
  F1: boolean;
  F2: boolean;
  F3: boolean;
  F4: boolean;
  F5: boolean;
  F6: boolean;
  F7: boolean;
  F8: boolean;
  F9: boolean;
  F10: boolean;
  F11: boolean;
  F12: boolean;
}
