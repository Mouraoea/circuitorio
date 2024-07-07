// src/components/Toolbox.tsx
import React from "react";
import { useDispatch } from "react-redux";
import { addElement } from "../store/circuitSlice";
import { v4 as uuidv4 } from "uuid";

const Toolbox: React.FC = () => {
  const dispatch = useDispatch();

  const handleAddElement = (element: { [key: string]: string | number[] }) => {
    const type = element.type as string;
    const size = element.size as number[];
    const sprite = element.sprite as string;
    const spriteSize = element.spriteSize as number[];
    const spriteOffset = element.spriteOffset as number[];
    const backgroundSize = element.backgroundSize as number[];
    const newElement = {
      id: uuidv4(),
      type,
      size,
      sprite,
      spriteSize,
      spriteOffset,
      backgroundSize,
      position: { x: 0, y: 0 },
    };
    dispatch(addElement(newElement));
  };

  return (
    <div>
      <button
        onClick={() =>
          handleAddElement({
            name: "Arithmetic Combinator",
            type: "combinator2-1",
            size: [2, 1],
            sprite: "./circuitorio/img/base/graphics/hr-arithmetic-combinator.png",
            spriteSize: [297, 64],
            spriteOffset: [-76, 0],
            backgroundSize: [64, 42],
          })
        }
      >
        Arithmetic Combinator
      </button>
      <button
        onClick={() =>
          handleAddElement({
            name: "Decider Combinator",
            type: "combinator2-1",
            size: [2, 1],
            sprite: "./circuitorio/img/base/graphics/hr-decider-combinator.png",
            spriteSize: [297, 64],
            spriteOffset: [-76, 0],
            backgroundSize: [64, 42],
          })
        }
      >
        Decider Combinator
      </button>
      <button
        onClick={() =>
          handleAddElement({
            name: "Constant Combinator",
            type: "combinator1-1",
            size: [1, 1],
            sprite: "./circuitorio/img/base/graphics/hr-constant-combinator.png",
            spriteSize: [228, 54],
            spriteOffset: [-68, 2],
            backgroundSize: [42, 42],
          })
        }
      >
        Constant Combinator
      </button>
    </div>
  );
};

export default Toolbox;
