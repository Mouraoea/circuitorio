// src/components/Toolbox.tsx
import React from "react";
import { useCanvasContext } from "../context/CanvasContext";

type ToolboxProps = {
  closeLeftDrawer: () => void;
};

const Toolbox: React.FC<ToolboxProps> = ({ closeLeftDrawer }) => {
  const { setElementToPlace, setIsPlacing } = useCanvasContext();

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

  return (
    <div>
      <div className="flex-space-between">
        <h2>Insert</h2>
      </div>
      <div className="panel-inset mb0 mt0"></div>
      <div className="panel-inset-lighter mt0">
        <button
          onClick={() => {
            handleAddElement({
              name: "Arithmetic Combinator",
              type: "entity",
              size: [2, 1],
              sprite: "./circuitorio/img/base/graphics/hr-arithmetic-combinator.png",
              spriteSize: [297, 64],
              spriteOffsetRef: [-76, 0, -169, 15, -228, 0, -20, 12],
              backgroundSizeRef: [64, 32, 36, 54, 64, 32, 36, 54],
            });
            closeLeftDrawer();
          }}
        >
          Arithmetic Combinator
        </button>
        <button
          onClick={() => {
            handleAddElement({
              name: "Decider Combinator",
              type: "entity",
              size: [2, 1],
              sprite: "./circuitorio/img/base/graphics/hr-decider-combinator.png",
              spriteSize: [312, 64],
              spriteOffsetRef: [-80, 0, -178, 11, -241, 0, -22, 12],
              backgroundSizeRef: [64, 32, 36, 54, 64, 32, 36, 54],
            });
            closeLeftDrawer();
          }}
        >
          Decider Combinator
        </button>
        <button
          onClick={() => {
            handleAddElement({
              name: "Constant Combinator",
              type: "entity",
              size: [1, 1],
              sprite: "./circuitorio/img/base/graphics/hr-constant-combinator.png",
              spriteSize: [228, 54],
              spriteOffsetRef: [-68, 2, -127, 2, -182, 2, -12, 2],
              backgroundSizeRef: [36, 36, 36, 36, 40, 36, 36, 36],
            });
            closeLeftDrawer();
          }}
        >
          Constant Combinator
        </button>
        {/* {isPlacing && elementToPlace && (
          <div
            style={{
              position: "fixed",
              left: placingPosition.x,
              top: placingPosition.y,
              opacity: 0.5,
              pointerEvents: "none",
              transform: `translate(-50%, -50%) scale(${scale})`,
              ...getBackgroundImage(),
            }}
          ></div>
        )} */}
      </div>
    </div>
  );
};

export default Toolbox;
