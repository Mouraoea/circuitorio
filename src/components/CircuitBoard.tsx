// src/components/CircuitBoard.tsx
import React, { useState, useEffect, useRef, useCallback } from "react";
import { useDrop } from "react-dnd";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { updateElementPosition, CircuitElementProps } from "../store/circuitSlice";
import CircuitElement from "./CircuitElement";
import { gridSnap } from "../utils/gridSnap";
import { setNewPosition } from "../utils/setNewPosition";
import { clamp } from "../utils/clamp"; // Import the clamp function
import "./CircuitBoard.css";

const CircuitBoard: React.FC = () => {
  const dispatch = useDispatch();
  const elements = useSelector((state: RootState) => state.circuit.elements);
  const [scale, setScale] = useState(1);
  const scaleRef = useRef(scale);
  const [isPanning, setIsPanning] = useState(false);
  const [panPosition, setPanPosition] = useState({ x: 0, y: 0 });
  const [startPanPosition, setStartPanPosition] = useState({ x: 0, y: 0 });
  const [startMousePosition, setStartMousePosition] = useState({ x: 0, y: 0 });
  // const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [gridSize] = useState(32);
  const [gridHeight] = useState(100);
  const [gridWidth] = useState(200);
  const boardRef = useRef<HTMLDivElement | null>(null);
  const [keyState, setKeyState] = useState<{ [key: string]: boolean }>({
    a: false,
    s: false,
    d: false,
    w: false,
    q: false,
    e: false,
    r: false,
    f: false,
    g: false,
    z: false,
    x: false,
    c: false,
    v: false,
    b: false,
    t: false,
    y: false,
    u: false,
    i: false,
    o: false,
    p: false,
    h: false,
    j: false,
    k: false,
    l: false,
    n: false,
    m: false,
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
    shift: false,
    control: false,
    alt: false,
    meta: false,
  });

  const [, drop] = useDrop(() => ({
    accept: "CIRCUIT_ELEMENT",
    drop: (item: CircuitElementProps, monitor) => {
      const delta = monitor.getDifferenceFromInitialOffset();
      const newPosition = gridSnap(setNewPosition(item.position, delta, scaleRef.current), gridSize);
      dispatch(updateElementPosition({ id: item.id, position: newPosition }));
    },
  }));

  const movePan = useCallback(
    (position: { x: number; y: number }) => {
      const boardElement = boardRef.current;
      if (boardElement) {
        const rect = boardElement.getBoundingClientRect();
        const parentRect = boardElement.parentElement?.getBoundingClientRect();
        if (parentRect) {
          const panLimits = {
            minX: parentRect.width - rect.width * scaleRef.current,
            maxX: 0,
            minY: parentRect.height - rect.height * scaleRef.current,
            maxY: 0,
          };
          setPanPosition({
            x: clamp(position.x, panLimits.minX, panLimits.maxX),
            y: clamp(position.y, panLimits.minY, panLimits.maxY),
          });
        }
      }
    },
    [setPanPosition]
  );

  const handleZoom = useCallback(
    (delta: number, cursorX: number, cursorY: number) => {
      const boardElement = boardRef.current;
      if (boardElement) {
        const rect = boardElement.getBoundingClientRect();
        const newScale = clamp(scaleRef.current + delta, 0.5, 5);
        const deltaScale = newScale - scaleRef.current;

        const cursorOffset = {
          x: (cursorX - rect.left) / scaleRef.current + panPosition.x,
          y: (cursorY - rect.top) / scaleRef.current + panPosition.y,
        };

        const offsetByCursor = {
          x: cursorOffset.x * deltaScale,
          y: cursorOffset.y * deltaScale,
        };

        const newPan = {
          x: panPosition.x - offsetByCursor.x / newScale,
          y: panPosition.y - offsetByCursor.y / newScale,
        };

        // Update the pan position
        movePan(newPan);

        // Update the scale
        scaleRef.current = newScale;
        setScale(newScale);
      }
    },
    [scaleRef, setScale, panPosition, movePan]
  );

  const handleWheel = useCallback(
    (event: WheelEvent) => {
      event.preventDefault();
      const scale = scaleRef.current;

      const delta = event.deltaY > 0 ? -scale * 0.1 : scale * 0.101010101010101; // Adjust the zoom step as needed
      handleZoom(delta, event.clientX, event.clientY);
    },
    [handleZoom]
  );

  const handleMouseDown = useCallback(
    (event: MouseEvent) => {
      if (event.button === 2) {
        event.preventDefault();
        setIsPanning(true);
        setStartPanPosition(panPosition);
        setStartMousePosition({ x: event.clientX, y: event.clientY });
      }
    },
    [panPosition]
  );

  const handleMouseUp = useCallback(() => {
    setIsPanning(false);
  }, []);

  useEffect(() => {
    const step = 10;

    const updatePan = () => {
      let deltaX = 0;
      let deltaY = 0;

      if (keyState.a) deltaX += step;
      if (keyState.d) deltaX -= step;
      if (keyState.w) deltaY += step;
      if (keyState.s) deltaY -= step;

      if (deltaX !== 0 || deltaY !== 0) {
        const newPan = { x: panPosition.x + deltaX, y: panPosition.y + deltaY };
        movePan(newPan);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (["a", "s", "d", "w"].includes(event.key) && !keyState[event.key]) {
        setKeyState((prevKeyState) => ({ ...prevKeyState, [event.key]: true }));
        updatePan();
      }
    };

    const handleKeyUp = (event: KeyboardEvent) => {
      if (["a", "s", "d", "w"].includes(event.key)) {
        setKeyState((prevKeyState) => ({ ...prevKeyState, [event.key]: false }));
      }
    };

    const panInterval = setInterval(updatePan, 50); // Adjust the interval for smoother or slower panning

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      clearInterval(panInterval);
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [keyState, setPanPosition, panPosition, movePan]);

  const handleMouseMove = useCallback(
    (event: MouseEvent) => {
      if (isPanning) {
        const currentScale = scaleRef.current;
        const deltaX = (event.clientX - startMousePosition.x) / currentScale;
        const deltaY = (event.clientY - startMousePosition.y) / currentScale;
        const newPan = {
          x: startPanPosition.x + deltaX,
          y: startPanPosition.y + deltaY,
        };
        movePan(newPan);
      }
    },
    [isPanning, startMousePosition, startPanPosition, movePan]
  );

  useEffect(() => {
    const boardElement = boardRef.current;
    boardElement?.addEventListener("wheel", handleWheel, { passive: false });
    boardElement?.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      boardElement?.removeEventListener("wheel", handleWheel);
      boardElement?.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [handleWheel, handleMouseDown, handleMouseMove, handleMouseUp]);

  return (
    <div
      ref={(node) => {
        drop(node);
        boardRef.current = node;
      }}
      className="circuit-board"
      style={{
        position: "relative",
        width: `${gridSize * gridWidth}px`,
        height: `${gridSize * gridHeight}px`,
        border: "1px solid black",
        overflow: "hidden",
        transform: `scale(${scale}) translate(${panPosition.x}px, ${panPosition.y}px)`,
        transformOrigin: "0 0",
        cursor: isPanning ? "grabbing" : "default",
      }}
      onContextMenu={(e) => e.preventDefault()} // Prevent the context menu from appearing
    >
      {elements.map((element) => (
        <CircuitElement key={element.id} {...element} />
      ))}
    </div>
  );
};

export default CircuitBoard;
