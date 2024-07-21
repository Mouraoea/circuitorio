import React, { useState, useEffect } from "react";
import { useDrag } from "react-dnd";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store/store";
import { type CircuitElementProps, rotateElement } from "../store/circuitSlice";

const CircuitElement: React.FC<CircuitElementProps> = ({ id, type }) => {
  const dispatch = useDispatch();
  const element = useSelector((state: RootState) => state.circuit.elements.find((element) => element.id === id));
  const previewElement = useSelector((state: RootState) => state.circuit.previewElement);
  const position = element?.position;
  const size = element?.size;
  const rotation = element?.rotation;
  const [hoveredElement, setHoveredElement] = useState<string | null>(null);

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

  useEffect(() => {
    if (hoveredElement) {
    }
  }, [hoveredElement]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "r" && hoveredElement) {
        dispatch(rotateElement({ id: hoveredElement }));
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [dispatch, hoveredElement]);

  if (!element || !position) return null;

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
      onMouseEnter={() => {
        setHoveredElement(element.id);
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
          <div className="corner" style={{ position: "relative", left: element.size[0] * 32 - 42, top: -80, backgroundPosition: "64px 0px" }} />
          <div className="corner" style={{ position: "relative", left: -24, top: element.size[1] * 32 - 162, backgroundPosition: "0px 64px" }} />
          <div className="corner" style={{ position: "relative", left: element.size[0] * 32 - 42, top: element.size[1] * 32 - 226, backgroundPosition: "64px 64px" }} />
        </div>
      )}
      {previewElement && (
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
      )}
    </div>
  );
};

export default CircuitElement;
