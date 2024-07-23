import React, { useState } from "react";
import { useDrag } from "react-dnd";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { type CircuitElementProps } from "../store/circuitSlice";
import { useCanvasContext } from "../context/CanvasContext";

const CircuitElement: React.FC<CircuitElementProps> = ({ id, type }) => {
  const element = useSelector((state: RootState) => state.circuit.elements.find((element) => element.id === id));
  const position = element?.position;
  const size = element?.spriteSize;
  const rotation = element?.rotation;
  const { setHoveredElement, hoveredElement, gridSize, isDebugMode } = useCanvasContext();

  const [{ isDragging }, drag] = useDrag(
    () => ({
      type: "CIRCUIT_ELEMENT",
      item: { id, type, position, size, rotation },
      collect: (monitor) => ({
        isDragging: !!monitor.isDragging(),
      }),
    }),
    [position]
  );

  const [isHovered, setIsHovered] = useState(false);

  if (!element || !position) return null;

  const getBackgroundImage = () => {
    return {
      backgroundImage: `url("${element.spritePath}")`,
      backgroundPosition: `${element.spriteOffset[element.orientation].x}px ${element.spriteOffset[element.orientation].y}px`,
      width: `${element.spriteSize[element.orientation].width}px`,
      height: `${element.spriteSize[element.orientation].height}px`,
      left: position.x + element.origingOffset[element.orientation].x * element.spriteScale,
      top: position.y + element.origingOffset[element.orientation].y * element.spriteScale,
    };
  };
  return (
    <div
      ref={drag}
      className="circuit-element"
      style={{
        position: "absolute",
        opacity: isDragging ? 0.5 : 1,
        cursor: "move",
        zIndex: position.y,
        transform: `scale(${0.5})`,
        transformOrigin: "top left",
        ...getBackgroundImage(),
      }}
      onMouseEnter={() => {
        setHoveredElement(element);
        setIsHovered(true);
      }}
      onMouseLeave={() => {
        setHoveredElement(null);
        setIsHovered(false);
      }}
    >
      {isHovered && hoveredElement && (
        <div
          className="circuit-element-hover"
          style={{
            border: isDebugMode ? "1px solid green" : "none",
            position: "fixed",
            left: -hoveredElement.origingOffset[hoveredElement.orientation].x,
            top: -hoveredElement.origingOffset[hoveredElement.orientation].y,
            height: (hoveredElement.gridSize[hoveredElement.orientation].height / hoveredElement.spriteScale) * gridSize,
            width: (hoveredElement.gridSize[hoveredElement.orientation].width / hoveredElement.spriteScale) * gridSize,
          }}
        >
          <div
            className="corner"
            style={{
              position: "absolute",
              backgroundPosition: "-7px -8px",
              height: 33,
              width: 34,
              transform: `scale(2) translate(${-17 + 9}px,${-17 + 9}px) rotate(0deg)`,
              border: isDebugMode ? "1px solid green" : "none",
            }}
          />
          <div
            className="corner"
            style={{
              position: "absolute",
              backgroundPosition: "-7px -8px",
              height: 33,
              width: 34,
              transform: `scale(2) translate(${-17 - 11 + (hoveredElement.gridSize[hoveredElement.orientation].width * gridSize) / hoveredElement.spriteScale}px,${-17 + 9.5}px) rotate(90deg)`,
              border: isDebugMode ? "1px solid green" : "none",
            }}
          />
          <div
            className="corner"
            style={{
              position: "absolute",
              backgroundPosition: "-7px -8px",
              height: 33,
              width: 34,
              transform: `scale(2) translate(${-17 - 11 + (hoveredElement.gridSize[hoveredElement.orientation].width * gridSize) / hoveredElement.spriteScale}px,${
                -17 - 11 + (hoveredElement.gridSize[hoveredElement.orientation].height * gridSize) / hoveredElement.spriteScale
              }px) rotate(180deg)`,
              border: isDebugMode ? "1px solid green" : "none",
            }}
          />
          <div
            className="corner"
            style={{
              position: "absolute",
              backgroundPosition: "-7px -8px",
              height: 33,
              width: 34,
              transform: `scale(2) translate(${-17 + 8.5}px,${-17 - 10.5 + (hoveredElement.gridSize[hoveredElement.orientation].height * gridSize) / hoveredElement.spriteScale}px) rotate(-90deg)`,
              border: isDebugMode ? "1px solid green" : "none",
            }}
          />
        </div>
      )}
      {/* {previewElement && (
        <div
          className="circuit-element-preview"
          style={{
            position: "absolute",
            left: previewElement.position.x,
            top: previewElement.position.y,
            opacity: 0.5,
            transform: `scale(${1})`,
            pointerEvents: "none", // Prevents interaction with the preview element
            ...getBackgroundImage(),
          }}
        />
      )} */}
    </div>
  );
};

export default CircuitElement;
