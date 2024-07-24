import React, { useCallback } from "react";
import { useDrop } from "react-dnd";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { updateElementPosition, CircuitElementProps } from "../store/circuitSlice";
import CircuitElement from "./CircuitElement";
import { gridSnap } from "../utils/gridSnap";
import { setNewPosition } from "../utils/setNewPosition";
import "./CircuitBoard.css";
import { useCanvasContext } from "../context/CanvasContext";

const CircuitBoard: React.FC = () => {
  const dispatch = useDispatch();
  const elements = useSelector((state: RootState) => state.circuit.elements);
  const { scale, panPosition, gridSize, gridHeight, gridWidth, isPanning } = useCanvasContext();

  const handleDrop = useCallback(
    (item: CircuitElementProps, monitor: any) => {
      const delta = monitor.getDifferenceFromInitialOffset();
      const newPosition = gridSnap(setNewPosition(item.position, delta, scale), gridSize);
      dispatch(updateElementPosition({ id: item.id, position: newPosition }));
    },
    [scale, gridSize, dispatch]
  );

  const [, drop] = useDrop(
    () => ({
      accept: "CIRCUIT_ELEMENT",
      drop: (item: CircuitElementProps, monitor) => handleDrop(item, monitor),
    }),
    [handleDrop]
  );

  return (
    <div
      ref={(node) => {
        drop(node);
      }}
      className="circuit-board"
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
      onContextMenu={(e) => e.preventDefault()} // Prevent the context menu from appearing
    >
      {elements.map((element) => (
        <CircuitElement key={element.id} {...element} />
      ))}
    </div>
  );
};

export default CircuitBoard;
