import React, { useCallback, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import CircuitElement from "./CircuitElement";
import "./CircuitBoard.css";
import { useCanvasContext } from "../context/CanvasContext";
import { useInputContext } from "../context/InputContext";

const CircuitBoard: React.FC = () => {
  const elements = useSelector((state: RootState) => state.circuit.elements);
  const { scale, panPosition, gridSize, gridHeight, gridWidth, isPanning, boardRef } = useCanvasContext();
  const { setIsCanvasFocused } = useInputContext();

  const handleMouseEnterCanvas = useCallback(() => setIsCanvasFocused(true), [setIsCanvasFocused]);
  const handleMouseLeaveCanvas = useCallback(() => setIsCanvasFocused(false), [setIsCanvasFocused]);

  useEffect(() => {
    const canvasElement = boardRef.current;

    if (canvasElement) {
      canvasElement.addEventListener("mouseenter", handleMouseEnterCanvas);
      canvasElement.addEventListener("mouseleave", handleMouseLeaveCanvas);
    }

    return () => {
      if (canvasElement) {
        canvasElement.removeEventListener("mouseenter", handleMouseEnterCanvas);
        canvasElement.removeEventListener("mouseleave", handleMouseLeaveCanvas);
      }
    };
  }, [boardRef, setIsCanvasFocused, handleMouseEnterCanvas, handleMouseLeaveCanvas]);

  return (
    <div
      className="circuit-board fixed-left-top"
      style={{
        position: "fixed",
        width: `${gridSize * gridWidth}px`,
        height: `${gridSize * gridHeight}px`,
        border: "0px solid black",
        overflow: "hidden",
        transform: `scale(${scale}) translate(${panPosition.x}px, ${panPosition.y}px)`,
        transformOrigin: `${panPosition.x}px ${panPosition.y}px`,
        cursor: isPanning ? "grabbing" : "default",
      }}
      onMouseEnter={handleMouseEnterCanvas}
      onMouseLeave={handleMouseLeaveCanvas}
      onContextMenu={(e) => e.preventDefault()}
    >
      {elements.map((element) => (
        <CircuitElement key={element.id} {...element} />
      ))}
    </div>
  );
};

export default CircuitBoard;
