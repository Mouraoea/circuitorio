// src/components/Toolbox.tsx
import React from "react";
import { useCanvasContext } from "../context/CanvasContext";
import { SpriteProvider, EntitySprite } from "../spritesheets/SpriteProvider";
import { type Orientation } from "../store/circuitSlice";

type ToolboxProps = {
  closeLeftDrawer: () => void;
};

const Toolbox: React.FC<ToolboxProps> = ({ closeLeftDrawer }) => {
  const { setElementToPlace, setIsPlacing } = useCanvasContext();

  // const handleAddElement = (element: { [key: string]: string | number[] }) => {
  //   const type = element.type as string;
  //   const size = element.size as number[];
  //   const sprite = element.sprite as string;
  //   const spriteSize = element.spriteSize as number[];
  //   const spriteOffsetRef = element.spriteOffsetRef as number[];
  //   const backgroundSizeRef = element.backgroundSizeRef as number[];
  //   const spriteOffset = [element.spriteOffsetRef[0], element.spriteOffsetRef[1]] as number[];
  //   const backgroundSize = [element.backgroundSizeRef[0], element.backgroundSizeRef[1]] as number[];

  //   const newElement = {
  //     id: "",
  //     type,
  //     size,
  //     sprite,
  //     spriteSize,
  //     spriteOffset,
  //     backgroundSize,
  //     spriteOffsetRef,
  //     backgroundSizeRef,
  //     position: { x: 0, y: 0 },
  //     rotation: 0,
  //   };

  //   setElementToPlace(newElement); // Set the element to be placed on mouse click
  //   setIsPlacing(true); // Set the placing flag to true
  // };

  const handleAddElement = (element: string) => {
    const entity: EntitySprite = SpriteProvider(element);

    const newElement = {
      ...entity,
      id: "",
      position: { x: 0, y: 0 },
      rotation: 0,
      orientation: "north" as Orientation,
      size: entity.gridSize.north,
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
            handleAddElement("arithmetic-combinator");
            closeLeftDrawer();
          }}
        >
          Arithmetic Combinator
        </button>
        <button
          onClick={() => {
            handleAddElement("decider-combinator");
            closeLeftDrawer();
          }}
        >
          Decider Combinator
        </button>
        <button
          onClick={() => {
            handleAddElement("constant-combinator");
            closeLeftDrawer();
          }}
        >
          Constant Combinator
        </button>
      </div>
    </div>
  );
};

export default Toolbox;
