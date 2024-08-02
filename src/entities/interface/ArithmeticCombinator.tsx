import React from "react";
import "../../App.css";
import { EntityInterfaceProps } from "./EntityInterface";
import { RenderSignalButton } from "../../utils/RenderSignalButton";
import { useUIContext } from "../../context/UIContext";
import { updateElementDetails } from "../../store/circuitSlice";
import { useDispatch } from "react-redux";

const ArithmeticCombinator: React.FC<EntityInterfaceProps> = ({ openSignalPicker }) => {
  const { selectedElement, setSelectedElement } = useUIContext();
  const dispacth = useDispatch();

  if (!selectedElement || selectedElement.name !== "arithmetic-combinator") return null;

  const handleOperatorChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const operator = event.target.value;
    dispacth(updateElementDetails({ id: selectedElement.id, details: { signals: { ...selectedElement.signals, operator } } }));
    setSelectedElement({ ...selectedElement, signals: { ...selectedElement.signals, operator } });
  };

  return (
    <div className="panel-inset-lighter mt0">
      <div>
        <h6>Input</h6>
        <div className="flex-row condition-container" style={{ padding: "10px" }}>
          {RenderSignalButton({ slot: "input1", type: "input", selectedElement, openSignalPicker })}
          <div>
            <select
              className="dropdown button condition-button"
              id="condition"
              defaultValue={selectedElement.signals?.operator}
              onMouseDown={(e) => e.stopPropagation()}
              onChange={handleOperatorChange}
            >
              <option value="+">{"+"}</option>
              <option value="-">{"−"}</option>
              <option value="*">{"*"}</option>
              <option value="/">{" / "}</option>
              <option value="%">{"%"}</option>
              <option value="^">{"^"}</option>
              <option value="<<">{"<<"}</option>
              <option value=">>">{">>"}</option>
              <option value="AND">{"AND"}</option>
              <option value="OR">{"OR"}</option>
              <option value="XOR">{"XOR"}</option>
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
