import React from "react";
import { useCanvasContext } from "../context/CanvasContext";
import "../App.css";

const DeciderCombinator: React.FC = () => {
  const { selectedElement } = useCanvasContext();

  if (!selectedElement) return null;
  if (selectedElement.name !== "decider-combinator") return null;

  return (
    <div className="panel-inset-lighter mt0">
      <div>
        <h6>Condition</h6>
        <div className="flex-row" style={{ padding: "10px" }}>
          <input type="button" className="button-black square40" id="firstInput" value={""} />
          <input type="button" className="button condition-button" id="condition" value={""} />
          <input type="button" className="button-black square40" id="secondInput" value={""} />
        </div>
      </div>
      <div className="separator"></div>
      <div>
        <h6>Output</h6>
        <div className="flex-row" style={{ padding: "10px" }}>
          <input type="button" className="button-black square40" id="output" value={""} />
          <div className="flex-column">
            <div className="flex-row">
              <input type="radio" id="output-mode-1" value={""} />
              <p>1</p>
            </div>
            <div className="flex-row">
              <input type="radio" id="output-mode-inputCount" value={""} />
              <p>Input count</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeciderCombinator;
