import React, { createContext, useContext, useState, ReactNode, useRef } from "react";

interface CanvasContextProps {
  scale: number;
  setScale: (value: number) => void;
  panPosition: { x: number; y: number };
  setPanPosition: (value: { x: number; y: number }) => void;
  gridSize: number;
  gridHeight: number;
  gridWidth: number;
  isPanning: boolean;
  setIsPanning: (value: boolean) => void;
  boardRef: React.RefObject<HTMLDivElement>;
  setBoardRef: (value: React.RefObject<HTMLDivElement>) => void;
  keyState: KeyStateKeys;
  setKeyState: (value: Partial<KeyStateKeys>) => void;
  isLeftDrawerOpen: boolean;
  setIsLeftDrawerOpen: (value: boolean) => void;
  isRightDrawerOpen: boolean;
  setIsRightDrawerOpen: (value: boolean) => void;
  drawerFrom: "left" | "right";
  setDrawerFrom: (value: "left" | "right") => void;
}

const CanvasContext = createContext<CanvasContextProps | undefined>(undefined);

export const CanvasProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [scale, setScale] = useState<number>(1);
  const [panPosition, setPanPosition] = useState({ x: 0, y: 0 });
  const [gridSize] = useState(32);
  const [gridHeight] = useState(100);
  const [gridWidth] = useState(200);
  const [isPanning, setIsPanning] = useState(false);
  let boardRef = useRef<HTMLDivElement>(null);
  const setBoardRef = (value: React.RefObject<HTMLDivElement>) => {
    if (value) {
      boardRef = value;
    }
  };
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
    "arrow-up": false,
    "arrow-down": false,
    "arrow-left": false,
    "arrow-right": false,
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
  const updateKeyState = (value: Partial<KeyStateKeys>) => {
    setKeyState((prevState) => ({ ...prevState, ...value }));
  };
  const [isLeftDrawerOpen, setIsLeftDrawerOpen] = useState(false);
  const [isRightDrawerOpen, setIsRightDrawerOpen] = useState(false);
  const [drawerFrom, setDrawerFrom] = useState<"left" | "right">("left");

  return (
    <CanvasContext.Provider
      value={{
        scale,
        setScale,
        panPosition,
        setPanPosition,
        gridSize,
        gridHeight,
        gridWidth,
        isPanning,
        setIsPanning,
        boardRef,
        setBoardRef,
        keyState,
        setKeyState: updateKeyState,
        isLeftDrawerOpen,
        setIsLeftDrawerOpen,
        isRightDrawerOpen,
        setIsRightDrawerOpen,
        drawerFrom,
        setDrawerFrom,
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
  "arrow-up": boolean;
  "arrow-down": boolean;
  "arrow-left": boolean;
  "arrow-right": boolean;
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
