import React from "react";
import { useDrag } from "react-dnd";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";

interface CircuitElementProps {
  id: string;
  type: string;
  size: number[];
  sprite: string;
  spriteSize: number[];
  spriteOffset: number[];
  backgroundSize: number[];
  position: { x: number; y: number };
}

const CircuitElement: React.FC<CircuitElementProps> = ({ id, type }) => {
  const element = useSelector((state: RootState) => state.circuit.elements.find((element) => element.id === id));
  const position = element?.position;

  const [{ isDragging }, drag] = useDrag(
    () => ({
      type: "CIRCUIT_ELEMENT",
      item: { id, type, position },
      collect: (monitor) => ({
        isDragging: !!monitor.isDragging(),
      }),
    }),
    [position]
  );

  if (!element || !position) return null;

  const size = element.size;
  // const width = size[0] * 32;
  const height = size[1] * 32;
  const getBackgroundImage = () => {
    return {
      backgroundImage: `url("${element.sprite}")`,
      backgroundPosition: `${element.spriteOffset[0]}px ${element.spriteOffset[1]}px`,
      backgroundSize: `${element.spriteSize[0]}px ${element.spriteSize[1]}px`,
      width: `${element.backgroundSize[0]}px`,
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
        height: `${height + 10}px`,
        opacity: isDragging ? 0.5 : 1,
        cursor: "move",
        transform: `scale(${1})`, // Elements are scaled uniformly
        ...getBackgroundImage(),
      }}
    ></div>
  );
};

export default CircuitElement;
