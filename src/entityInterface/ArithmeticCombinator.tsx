import React from "react";
import "../App.css";
import { EntityInterfaceProps } from "./EntityInterface";
import { RenderSignalButton } from "../utils/RenderSignalButton";
import { useUIContext } from "../context/UIContext";

const ArithmeticCombinator: React.FC<EntityInterfaceProps> = ({ openSignalPicker }) => {
  const { selectedElement } = useUIContext();

  if (!selectedElement || selectedElement.name !== "arithmetic-combinator") return null;

  return (
    <div className="panel-inset-lighter mt0">
      <div>
        <h6>Input</h6>
        <div className="flex-row condition-container" style={{ padding: "10px" }}>
          {RenderSignalButton({ slot: "input1", type: "input", selectedElement, openSignalPicker })}
          <div>
            <select className="dropdown button condition-button" id="condition" defaultValue="+" onMouseDown={(e) => e.stopPropagation()}>
              <option value="+">{"+"}</option>
              <option value="-">{"−"}</option>
              <option value="*">{"*"}</option>
              <option value="/">{" / "}</option>
              <option value="%">{"%"}</option>
              <option value="^">{"^"}</option>
              <option value="<<">{"<<"}</option>
              <option value=">>">{">>"}</option>
              <option value="&">{"&"}</option>
              <option value="|">{"|"}</option>
              <option value="^">{"^"}</option>
            </select>
          </div>
          {RenderSignalButton({ slot: "input2", type: "input", selectedElement, openSignalPicker })}
        </div>
      </div>
      <div className="separator"></div>
      <div>
        <h6>Output</h6>
        <div style={{ display: "flex", padding: "10px" }}>{RenderSignalButton({ slot: "output", type: "output", selectedElement, openSignalPicker })}</div>
      </div>
    </div>
  );
};

export default ArithmeticCombinator;
