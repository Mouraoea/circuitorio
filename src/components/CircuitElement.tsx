import React, { useState } from "react";
import { useDrag } from "react-dnd";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { type CircuitElementProps } from "../store/circuitSlice";

const CircuitElement: React.FC<CircuitElementProps> = ({ id, type }) => {
  const element = useSelector((state: RootState) => state.circuit.elements.find((element) => element.id === id));
  const position = element?.position;
  const size = element?.size;

  const [{ isDragging }, drag] = useDrag(
    () => ({
      type: "CIRCUIT_ELEMENT",
      item: { id, type, position, size },
      collect: (monitor) => ({
        isDragging: !!monitor.isDragging(),
      }),
    }),
    [position]
  );

  const [isHovered, setIsHovered] = useState(false);
  if (!element || !position) return null;
  // const gridPosition = element.gridPosition;

  // const size = element.size;
  const getBackgroundImage = () => {
    return {
      backgroundImage: `url("${element.sprite}")`,
      backgroundPosition: `${element.spriteOffset[0]}px ${element.spriteOffset[1]}px`,
      backgroundSize: `${element.spriteSize[0]}px ${element.spriteSize[1]}px`,
      width: `${element.backgroundSize[0]}px`,
      height: `${element.backgroundSize[1] + 10}px`,
    };
  };
  return (
    <div
      ref={drag}
      className="circuit-element"
      style={{
        position: "absolute",
        left: position.x,
        top: position.y - 8,
        opacity: isDragging ? 0.5 : 1,
        cursor: "move",
        zIndex: position.y,
        transform: `scale(${1})`, // Elements are scaled uniformly
        ...getBackgroundImage(),
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {isHovered && (
        <div className="circuit-element-hover">
          <div className="corner" style={{ position: "relative", left: -24, top: -16, backgroundPosition: "0 0" }} />
          <div className="corner" style={{ position: "relative", left: element.size[0] * 32 - 42, top: -80, backgroundPosition: "64px 0px" }} />
          <div className="corner" style={{ position: "relative", left: -24, top: element.size[1] * 32 - 162, backgroundPosition: "0px 64px" }} />
          <div className="corner" style={{ position: "relative", left: element.size[0] * 32 - 42, top: element.size[1] * 32 - 226, backgroundPosition: "64px 64px" }} />
        </div>
      )}
    </div>
  );
};

export default CircuitElement;
