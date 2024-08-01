import React from "react";
import "../../App.css";
import { EntityInterfaceProps } from "./EntityInterface";
import { RenderSignalButton } from "../../utils/RenderSignalButton";
import { useUIContext } from "../../context/UIContext";

const ConstantCombinator: React.FC<EntityInterfaceProps> = ({ openSignalPicker }) => {
  const { selectedElement } = useUIContext();

  if (!selectedElement || selectedElement.name !== "constant-combinator") return null;

  const renderButtons = (count: number, row: number) => {
    return Array.from({ length: count }).map((_, index) => RenderSignalButton({ slot: `output-${row}-${index}`, type: "output", selectedElement, openSignalPicker }));
  };

  return (
    <div className="panel-inset-lighter mt0">
      <div>
        <h6>Output</h6>
        <div className="flex-container">
          <input type="checkbox" id="onOffSwitch" value="" />
          <p>On/Off switch</p>
        </div>
      </div>
      <div className="separator"></div>
      <div>
        <h6>Output signals</h6>
        <div className="flex-column margin-10 ">
          <div className="flex-row">{renderButtons(10, 1)}</div>
          <div className="flex-row">{renderButtons(10, 2)}</div>
        </div>
      </div>
    </div>
  );
};

export default ConstantCombinator;
