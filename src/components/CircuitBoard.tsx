import React, { useState, useEffect, useRef, useCallback } from "react";
import { useDrop } from "react-dnd";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { updateElementPosition } from "../store/circuitSlice";
import CircuitElement from "./CircuitElement";
import "./CircuitBoard.css";

const CircuitBoard: React.FC = () => {
  const dispatch = useDispatch();
  const elements = useSelector((state: RootState) => state.circuit.elements);
  const [scale, setScale] = useState(1);
  const scaleRef = useRef(scale); // Ref to store the scale value
  const [isPanning, setIsPanning] = useState(false);
  const [panPosition, setPanPosition] = useState({ x: 0, y: 0 });
  const [startPanPosition, setStartPanPosition] = useState({ x: 0, y: 0 });
  const [startMousePosition, setStartMousePosition] = useState({ x: 0, y: 0 });
  const boardRef = useRef<HTMLDivElement | null>(null);

  const gridSize = 32;

  const [, drop] = useDrop(() => ({
    accept: "CIRCUIT_ELEMENT",
    drop: (item: { id: string; type: string; position: { x: number; y: number } }, monitor) => {
      const delta = monitor.getDifferenceFromInitialOffset();
      const currentScale = scaleRef.current; // Use the ref to get the latest scale value
      console.log(currentScale);
      const newPosition = {
        x: Math.round((item.position.x + (delta?.x || 0) / currentScale) / gridSize) * gridSize,
        y: Math.round((item.position.y + (delta?.y || 0) / currentScale) / gridSize) * gridSize,
      };
      dispatch(updateElementPosition({ id: item.id, position: newPosition }));
    },
  }));

  const handleWheel = useCallback((event: WheelEvent) => {
    event.preventDefault();
    const scaleChange = event.deltaY > 0 ? 0.9 : 1.1;
    setScale((prevScale) => {
      const newScale = Math.min(Math.max(prevScale * scaleChange, 0.5), 2);
      scaleRef.current = newScale; // Update the ref whenever scale changes
      return newScale;
    });
  }, []);

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

  const handleMouseMove = useCallback(
    (event: MouseEvent) => {
      if (isPanning) {
        const deltaX = event.clientX - startMousePosition.x;
        const deltaY = event.clientY - startMousePosition.y;
        setPanPosition({
          x: startPanPosition.x + deltaX,
          y: startPanPosition.y + deltaY,
        });
      }
    },
    [isPanning, startMousePosition, startPanPosition]
  );

  const handleMouseUp = useCallback(() => {
    setIsPanning(false);
  }, []);

  useEffect(() => {
    const boardElement = boardRef.current;
    if (boardElement) {
      boardElement.addEventListener("wheel", handleWheel, { passive: false });
      boardElement.addEventListener("mousedown", handleMouseDown);
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
    }

    return () => {
      if (boardElement) {
        boardElement.removeEventListener("wheel", handleWheel);
        boardElement.removeEventListener("mousedown", handleMouseDown);
        window.removeEventListener("mousemove", handleMouseMove);
        window.removeEventListener("mouseup", handleMouseUp);
      }
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
        width: "100%",
        height: "100vh",
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
