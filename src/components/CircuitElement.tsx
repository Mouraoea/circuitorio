import React, { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { type CircuitElementProps } from "../store/circuitSlice";
import { useCanvasContext } from "../context/CanvasContext";
import { getElementSprite } from "../utils/getElementSprite";
import { useUIContext } from "../context/UIContext";

const CircuitElement: React.FC<CircuitElementProps> = ({ id }) => {
  const element = useSelector((state: RootState) => state.circuit.elements.find((el) => el.id === id)) || null;
  const position = element?.position || { x: 0, y: 0 };
  const { gridSize } = useCanvasContext();
  const { setHoveredElement, hoveredElement, isDebugMode } = useUIContext();

  const [isHovered, setIsHovered] = useState(false);
  const hoveredElementRef = useRef<CircuitElementProps | null>(null);

  const handleMouseEnter = (element: CircuitElementProps | null) => {
    if (element) {
      setHoveredElement(element);
      setIsHovered(true);
      hoveredElementRef.current = element;
    }
  };

  const handleMouseLeave = () => {
    setHoveredElement(null);
    setIsHovered(false);
    hoveredElementRef.current = null;
  };

  useEffect(() => {
    const interval = setInterval(() => {}, 1000);
    return () => clearInterval(interval);
  }, []);

  if (!element) return null;

  const getCornerStyle = (transform: string) => ({
    backgroundPosition: "-7px -8px",
    height: 33,
    width: 34,
    transform,
    border: isDebugMode ? "1px solid green" : "none",
  });

  return (
    <div
      className="circuit-element"
      style={{
        position: "absolute",
        opacity: 1,
        cursor: "move",
        zIndex: position.y,
        transform: `scale(0.5)`,
        transformOrigin: "top left",
        ...getElementSprite(element),
      }}
      onMouseEnter={() => handleMouseEnter(element)}
      onMouseLeave={handleMouseLeave}
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
          {[
            `scale(2) translate(${-17 + 9}px,${-17 + 9}px) rotate(0deg)`,
            `scale(2) translate(${-17 - 11 + (hoveredElement.gridSize[hoveredElement.orientation].width * gridSize) / hoveredElement.spriteScale}px,${-17 + 9.5}px) rotate(90deg)`,
            `scale(2) translate(${-17 - 11 + (hoveredElement.gridSize[hoveredElement.orientation].width * gridSize) / hoveredElement.spriteScale}px,${
              -17 - 11 + (hoveredElement.gridSize[hoveredElement.orientation].height * gridSize) / hoveredElement.spriteScale
            }px) rotate(180deg)`,
            `scale(2) translate(${-17 + 8.5}px,${-17 - 10.5 + (hoveredElement.gridSize[hoveredElement.orientation].height * gridSize) / hoveredElement.spriteScale}px) rotate(-90deg)`,
          ].map((transform) => (
            <div key={transform} className="corner" style={getCornerStyle(transform)} />
          ))}
        </div>
      )}
    </div>
  );
};

export default CircuitElement;
