import React from "react";
import { useCanvasContext } from "../context/CanvasContext";
import "../App.css";

const ConstantCombinator: React.FC = () => {
  const { selectedElement } = useCanvasContext();

  if (!selectedElement || selectedElement.name !== "constant-combinator") return null;

  const renderButtons = (count: number) => {
    return Array.from({ length: count }).map((_, index) => <input key={index} type="button" className="button-black button-output square40" id="output" value="" />);
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
          <div className="flex-row">{renderButtons(10)}</div>
          <div className="flex-row">{renderButtons(10)}</div>
        </div>
      </div>
    </div>
  );
};

export default ConstantCombinator;
