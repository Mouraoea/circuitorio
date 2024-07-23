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
  const { setHoveredElement } = useCanvasContext();

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
      {isHovered && (
        <div className="circuit-element-hover">
          <div className="corner" style={{ position: "relative", left: -24, top: -16, backgroundPosition: "0 0" }} />
          <div className="corner" style={{ position: "relative", left: element.gridSize[element.orientation].width * 32 - 42, top: -80, backgroundPosition: "64px 0px" }} />
          <div className="corner" style={{ position: "relative", left: -24, top: element.gridSize[element.orientation].height * 32 - 162, backgroundPosition: "0px 64px" }} />
          <div
            className="corner"
            style={{ position: "relative", left: element.gridSize[element.orientation].width * 32 - 42, top: element.gridSize[element.orientation].height * 32 - 226, backgroundPosition: "64px 64px" }}
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
