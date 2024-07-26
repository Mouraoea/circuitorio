import React from "react";
import { useCanvasContext } from "../context/CanvasContext";
import "../App.css";
import { EntityInterfaceProps } from "./EntityInterface";

const ArithmeticCombinator: React.FC<EntityInterfaceProps> = ({ openSignalPicker }) => {
  const { selectedElement } = useCanvasContext();

  if (!selectedElement) return null;
  if (selectedElement.name !== "arithmetic-combinator") return null;

  return (
    <div className="panel-inset-lighter mt0">
      <div>
        <h6>Input</h6>
        <div className="flex-row" style={{ padding: "10px" }}>
          <input type="button" onClick={openSignalPicker} className="button-black square40" id="firstInput" value={""} />
          <input type="button" className="button condition-button" id="condition" value={""} />
          <input type="button" onClick={openSignalPicker} className="button-black square40" id="secondInput" value={""} />
        </div>
      </div>
      <div className="separator"></div>
      <div>
        <h6>Output</h6>
        <div style={{ display: "flex", padding: "10px" }}>
          <input type="button" onClick={openSignalPicker} className="button-black square40" id="output" value={""} />
        </div>
      </div>
    </div>
  );
};

export default ArithmeticCombinator;
