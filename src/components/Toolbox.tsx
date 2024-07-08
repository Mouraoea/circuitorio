// src/components/Toolbox.tsx
import React from "react";
import { useDispatch } from "react-redux";
import { addElement } from "../store/circuitSlice";
import { v4 as uuidv4 } from "uuid";
// import zIndex from "@material-ui/core/styles/zIndex";

const Toolbox: React.FC = () => {
  const dispatch = useDispatch();

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
      id: uuidv4(),
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
    dispatch(addElement(newElement));
  };

  return (
    <div style={{ zIndex: 100 }}>
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
    </div>
  );
};

export default Toolbox;
