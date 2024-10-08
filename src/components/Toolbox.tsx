import React from "react";
import { useCanvasContext } from "../context/CanvasContext";
import { CircuitElementProps } from "../store/circuitSlice";
import defaultEntitySettings from "../entities/settings/defaultEntitySettings";

type ToolboxProps = {
  closeLeftDrawer: () => void;
};

const Toolbox: React.FC<ToolboxProps> = ({ closeLeftDrawer }) => {
  const { setElementToPlace, setIsPlacing } = useCanvasContext();

  const handleAddElement = (element: string) => {
    const newElement: CircuitElementProps = defaultEntitySettings(element);

    setElementToPlace(newElement);
    setIsPlacing(true);
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
