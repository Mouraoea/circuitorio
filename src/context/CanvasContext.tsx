import React, { createContext, useContext, useState, useRef, ReactNode } from "react";
import { CircuitElementProps } from "../store/circuitSlice";

interface CanvasContextProps {
  disclaimerIsOpen: boolean;
  setDisclaimerIsOpen: (value: boolean) => void;
  appVersion: string;
  setAppVersion: (value: string) => void;
  scale: number;
  setScale: (value: number) => void;
  panPosition: { x: number; y: number };
  setPanPosition: (value: { x: number; y: number }) => void;
  panPercentage: { x: number; y: number };
  setPanPercentage: (value: { x: number; y: number }) => void;
  transformOrigin: { x: number; y: number };
  setTransformOrigin: (value: { x: number; y: number }) => void;
  gridSize: number;
  gridHeight: number;
  gridWidth: number;
  isPanning: boolean;
  setIsPanning: (value: boolean) => void;
  boardRef: React.RefObject<HTMLDivElement>;
  keyState: KeyStateKeys;
  setKeyState: (value: Partial<KeyStateKeys>) => void;
  isLeftDrawerOpen: boolean;
  setIsLeftDrawerOpen: (value: boolean) => void;
  isRightDrawerOpen: boolean;
  setIsRightDrawerOpen: (value: boolean) => void;
  drawerFrom: "left" | "right";
  setDrawerFrom: (value: "left" | "right") => void;
  cursorPosition: { x: number; y: number };
  setCursorPosition: (value: { x: number; y: number }) => void;
  cursorGridPosition: { x: number; y: number };
  setCursorGridPosition: (value: { x: number; y: number }) => void;
  cursorGridCoordinates: { x: number; y: number };
  setCursorGridCoordinates: (value: { x: number; y: number }) => void;
  placingPosition: { x: number; y: number };
  setPlacingPosition: (value: { x: number; y: number }) => void;
  ghostElementPosition: { x: number; y: number };
  setGhostElementPosition: (value: { x: number; y: number }) => void;
  elementToPlace: CircuitElementProps | null;
  setElementToPlace: (value: CircuitElementProps | null) => void;
  isPlacing: boolean;
  setIsPlacing: (value: boolean) => void;
  placingElementRotation: number;
  setPlacingElementRotation: (value: number) => void;
  zoomCenter: { x: number; y: number };
  setZoomCenter: (value: { x: number; y: number }) => void;
  hoveredElement: CircuitElementProps | null;
  setHoveredElement: (value: CircuitElementProps | null) => void;
  selectedElement: CircuitElementProps | null;
  setSelectedElement: (value: CircuitElementProps | null) => void;
  isDebugMode: boolean;
  setIsDebugMode: (value: boolean) => void;
  isEntityPanelOpen: boolean;
  setIsEntityPanelOpen: (value: boolean) => void;
  isEntityPanelDragging: boolean;
  setIsEntityPanelDragging: (value: boolean) => void;
  entityPanelPosition: { x: number; y: number };
  setEntityPanelPosition: (value: { x: number; y: number }) => void;
  entityPanelContent: ReactNode;
  setEntityPanelContent: (value: ReactNode) => void;
  isSignalPickerOpen: boolean;
  setIsSignalPickerOpen: (value: boolean) => void;
  isSignalPickerDragging: boolean;
  setIsSignalPickerDragging: (value: boolean) => void;
  SignalPickerPosition: { x: number; y: number };
  setSignalPickerPosition: (value: { x: number; y: number }) => void;
  SignalPickerContent: ReactNode;
  setSignalPickerContent: (value: ReactNode) => void;
  selectedSignalSlot: { [key: string]: string } | null;
  setSelectedSignalSlot: (value: { [key: string]: string }) => void;
  signalPickerSelectedGroup: string;
  setSignalPickerSelectedGroup: (value: string) => void;
  signalPickerConstantValue: number;
  setSignalPickerConstantValue: (value: number) => void;
  signalPickerSelectedSignal: string;
  setSignalPickerSelectedSignal: (value: string) => void;
}

const CanvasContext = createContext<CanvasContextProps | undefined>(undefined);

export const CanvasProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [disclaimerIsOpen, setDisclaimerIsOpen] = useState(false);
  const [appVersion, setAppVersion] = useState("0.0.0");
  const [scale, setScale] = useState<number>(1);
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
  const [isLeftDrawerOpen, setIsLeftDrawerOpen] = useState(false);
  const [isRightDrawerOpen, setIsRightDrawerOpen] = useState(false);
  const [drawerFrom, setDrawerFrom] = useState<"left" | "right">("left");
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
  const [SignalPickerPosition, setSignalPickerPosition] = useState({ x: 0, y: 0 });
  const [SignalPickerContent, setSignalPickerContent] = useState<ReactNode>(null);
  const [selectedSignalSlot, setSelectedSignalSlot] = useState<{ [key: string]: string } | null>(null);
  const [signalPickerSelectedGroup, setSignalPickerSelectedGroup] = useState("logistics");
  const [signalPickerConstantValue, setSignalPickerConstantValue] = useState(1);
  const [signalPickerSelectedSignal, setSignalPickerSelectedSignal] = useState("");

  const updateKeyState = (value: Partial<KeyStateKeys>) => {
    setKeyState((prevKeyState) => ({ ...prevKeyState, ...value }));
  };

  return (
    <CanvasContext.Provider
      value={{
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
        isLeftDrawerOpen,
        setIsLeftDrawerOpen,
        isRightDrawerOpen,
        setIsRightDrawerOpen,
        drawerFrom,
        setDrawerFrom,
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
      }}
    >
      {children}
    </CanvasContext.Provider>
  );
};

export const useCanvasContext = () => {
  const context = useContext(CanvasContext);
  if (context === undefined) {
    throw new Error("useContext must be used within a Provider");
  }
  return context;
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
