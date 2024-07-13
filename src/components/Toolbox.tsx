// src/components/Toolbox.tsx
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addElement } from "../store/circuitSlice";
import { v4 as uuidv4 } from "uuid";
import { type CircuitElementProps } from "../store/circuitSlice";
import { useCanvasContext } from "../context/CanvasContext";

const Toolbox: React.FC = () => {
  const dispatch = useDispatch();
  const [elementToPlace, setElementToPlace] = useState<CircuitElementProps | null>(null);
  const [isPlacing, setIsPlacing] = useState(false);
  const [cursorPosition, setCursorPosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [rotation, setRotation] = useState(0);
  const [shift, setShift] = useState(false);
  const [gridSize] = useState(32);
  const { scale } = useCanvasContext();

  useEffect(() => {
    const handleMouseUp = (event: MouseEvent) => {
      if (event.button === 0) {
        if (isPlacing && elementToPlace) {
          const newElement = {
            ...elementToPlace,
            position: { x: Math.round(event.clientX / gridSize) * gridSize, y: Math.round(event.clientY / gridSize) * gridSize },
            rotation,
            id: uuidv4(),
          };

          dispatch(addElement(newElement));
          if (!shift) {
            setIsPlacing(false);
            setRotation(0);
            setElementToPlace(null);
          }
        }
      }
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "q") {
        setIsPlacing(false); // Stop placing when 'q' is pressed
        setRotation(0); // Reset rotation after placing
        setElementToPlace(null); // Clear the element to be placed
      } else if (event.key === "r" && isPlacing && elementToPlace) {
        const newRotation = (rotation + 1) % 4;
        const newSize = [elementToPlace.size[1], elementToPlace.size[0]];
        const newSpriteOffset = [elementToPlace.spriteOffsetRef[newRotation * 2], elementToPlace.spriteOffsetRef[newRotation * 2 + 1]];
        const newBackgroundSize = [elementToPlace.backgroundSizeRef[newRotation * 2], elementToPlace.backgroundSizeRef[newRotation * 2 + 1]];

        setElementToPlace({
          ...elementToPlace,
          rotation: newRotation,
          size: newSize,
          spriteOffset: newSpriteOffset,
          backgroundSize: newBackgroundSize,
        });
        setRotation(newRotation);
      } else if (event.key === "Shift") {
        console.log("Shift key down");
        setShift(true);
      }
    };

    const handleKeyUp = (event: KeyboardEvent) => {
      if (event.key === "Shift") {
        console.log("Shift key up");
        setShift(false);
      }
    };

    const handleMouseMove = (event: MouseEvent) => {
      setCursorPosition({ x: Math.round(event.clientX / gridSize) * gridSize, y: Math.round(event.clientY / gridSize) * gridSize });
    };

    window.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [isPlacing, elementToPlace, dispatch, rotation, gridSize, shift, scale]);

  const handleAddElement = (element: { [key: string]: string | number[] }) => {
    const type = element.type as string;
    const size = element.size as number[];
    const sprite = element.sprite as string;
    const spriteSize = element.spriteSize as number[];
    const spriteOffsetRef = element.spriteOffsetRef as number[];
    const backgroundSizeRef = element.backgroundSizeRef as number[];
    const spriteOffset = [element.spriteOffsetRef[0], element.spriteOffsetRef[1]] as number[];
    const backgroundSize = [element.backgroundSizeRef[0], element.backgroundSizeRef[1]] as number[];

    const newElement = {
      id: "",
      type,
      size,
      sprite,
      spriteSize,
      spriteOffset,
      backgroundSize,
      spriteOffsetRef,
      backgroundSizeRef,
      position: { x: 0, y: 0 },
      rotation: 0,
    };

    setElementToPlace(newElement); // Set the element to be placed on mouse click
    setIsPlacing(true); // Set the placing flag to true
  };

  const getBackgroundImage = () => {
    if (!elementToPlace) {
      return {};
    }
    return {
      backgroundImage: `url("${elementToPlace.sprite}")`,
      backgroundPosition: `${elementToPlace.spriteOffset[0]}px ${elementToPlace.spriteOffset[1]}px`,
      backgroundSize: `${elementToPlace.spriteSize[0]}px ${elementToPlace.spriteSize[1]}px`,
      width: `${elementToPlace.backgroundSize[0]}px`,
      height: `${elementToPlace.backgroundSize[1] + 10}px`,
    };
  };

  return (
    <div style={{ zIndex: 100 }}>
      <p style={{ alignContent: "left", background: "white" }}>Current scale is {scale}</p>
      <button
        onClick={() =>
          handleAddElement({
            name: "Arithmetic Combinator",
            type: "entity",
            size: [2, 1],
            sprite: "./circuitorio/img/base/graphics/hr-arithmetic-combinator.png",
            spriteSize: [297, 64],
            spriteOffsetRef: [-76, 0, -169, 15, -228, 0, -20, 12],
            backgroundSizeRef: [64, 32, 36, 54, 64, 32, 36, 54],
          })
        }
      >
        Arithmetic Combinator
      </button>
      <button
        onClick={() =>
          handleAddElement({
            name: "Decider Combinator",
            type: "entity",
            size: [2, 1],
            sprite: "./circuitorio/img/base/graphics/hr-decider-combinator.png",
            spriteSize: [312, 64],
            spriteOffsetRef: [-80, 0, -178, 11, -241, 0, -22, 12],
            backgroundSizeRef: [64, 32, 36, 54, 64, 32, 36, 54],
          })
        }
      >
        Decider Combinator
      </button>
      <button
        onClick={() =>
          handleAddElement({
            name: "Constant Combinator",
            type: "entity",
            size: [1, 1],
            sprite: "./circuitorio/img/base/graphics/hr-constant-combinator.png",
            spriteSize: [228, 54],
            spriteOffsetRef: [-68, 2, -127, 2, -182, 2, -12, 2],
            backgroundSizeRef: [36, 36, 36, 36, 40, 36, 36, 36],
          })
        }
      >
        Constant Combinator
      </button>
      {isPlacing && elementToPlace && (
        <div
          style={{
            position: "fixed",
            left: cursorPosition.x,
            top: cursorPosition.y,
            opacity: 0.5,
            pointerEvents: "none",
            transform: `translate(-50%, -50%) scale(${scale})`,
            ...getBackgroundImage(),
          }}
        ></div>
      )}
    </div>
  );
};

export default Toolbox;
