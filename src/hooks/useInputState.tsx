import { useState } from "react";

export const useInputState = () => {
  const [startCursorPosition, setStartCursorPosition] = useState({ x: 0, y: 0 });
  const [isCanvasFocused, setIsCanvasFocused] = useState(false);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [cursorGridPosition, setCursorGridPosition] = useState({ x: 0, y: 0 });
  const [cursorGridCoordinates, setCursorGridCoordinates] = useState({ x: 0, y: 0 });
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
  const updateKeyState = (value: Partial<KeyStateKeys>) => {
    setKeyState((prevKeyState) => ({ ...prevKeyState, ...value }));
  };
  return {
    isCanvasFocused,
    setIsCanvasFocused,
    startCursorPosition,
    setStartCursorPosition,
    cursorPosition,
    setCursorPosition,
    cursorGridPosition,
    setCursorGridPosition,
    cursorGridCoordinates,
    setCursorGridCoordinates,
    keyState,
    setKeyState: updateKeyState,
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
