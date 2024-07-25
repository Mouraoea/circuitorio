import React, { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { type CircuitElementProps } from "../store/circuitSlice";
import { useCanvasContext } from "../context/CanvasContext";
import { getElementSprite } from "../utils/getElementSprite";

const CircuitElement: React.FC<CircuitElementProps> = ({ id, type }) => {
  let element: CircuitElementProps | null;
  let position: { x: number; y: number };
  element = useSelector((state: RootState) => state.circuit.elements.find((element) => element.id === id)) || null;
  position = element?.position || { x: 0, y: 0 };
  const { setHoveredElement, hoveredElement, gridSize, isDebugMode } = useCanvasContext();
  const [isHovered, setIsHovered] = useState(false);
  const hoveredElementRef = useRef<CircuitElementProps | null>(null);

  const handleMouseEnter = (element: CircuitElementProps | null) => {
    if (!element) return;
    setHoveredElement(element);
    setIsHovered(true);
    hoveredElementRef.current = element;
  };

  const handleMouseLeave = () => {
    setHoveredElement(null);
    setIsHovered(false);
    hoveredElementRef.current = null;
  };

  useEffect(() => {
    setInterval(() => {}, 1000);
  }, []);

  if (!element || !position) return null;

  return (
    <div
      className="circuit-element"
      style={{
        position: "absolute",
        opacity: 1,
        cursor: "move",
        zIndex: position?.y ? position.y : 0,
        transform: `scale(${0.5})`,
        transformOrigin: "top left",
        ...getElementSprite(element),
      }}
      onMouseEnter={() => handleMouseEnter(element)}
      onMouseLeave={() => handleMouseLeave()}
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
    </div>
  );
};

export default CircuitElement;
