import React from "react";
import "../App.css";
import { EntityInterfaceProps } from "./EntityInterface";
import { RenderSignalButton } from "../utils/RenderSignalButton";
import { useUIContext } from "../context/UIContext";

const DeciderCombinator: React.FC<EntityInterfaceProps> = ({ openSignalPicker }) => {
  const { selectedElement } = useUIContext();

  if (!selectedElement || selectedElement.name !== "decider-combinator") return null;

  return (
    <div className="panel-inset-lighter mt0">
      <div>
        <h6>Condition</h6>
        <div className="flex-row" style={{ padding: "10px" }}>
          {RenderSignalButton({ slot: "input1", type: "input", selectedElement, openSignalPicker })}
          <input type="button" className="button condition-button" id="condition" value={""} />
          {RenderSignalButton({ slot: "input2", type: "input", selectedElement, openSignalPicker })}
        </div>
      </div>
      <div className="separator"></div>
      <div>
        <h6>Output</h6>
        <div className="flex-row" style={{ padding: "10px" }}>
          {RenderSignalButton({ slot: "output", type: "output", selectedElement, openSignalPicker })}
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
