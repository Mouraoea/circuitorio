import React from "react";
import "../../App.css";
import { EntityInterfaceProps } from "./EntityInterface";
import { RenderSignalButton } from "../../utils/RenderSignalButton";
import { useUIContext } from "../../context/UIContext";
import { useDispatch } from "react-redux";
import { updateElementDetails } from "../../store/circuitSlice";

const DeciderCombinator: React.FC<EntityInterfaceProps> = ({ openSignalPicker }) => {
  const { selectedElement, setSelectedElement } = useUIContext();
  const dispacth = useDispatch();

  if (!selectedElement || selectedElement.name !== "decider-combinator") return null;

  const handleOperatorChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const operator = event.target.value;
    dispacth(updateElementDetails({ id: selectedElement.id, details: { signals: { ...selectedElement.signals, operator } } }));
    setSelectedElement({ ...selectedElement, signals: { ...selectedElement.signals, operator } });
  };

  return (
    <div className="panel-inset-lighter mt0">
      <div>
        <h6>Condition</h6>
        <div className="flex-row condition-container" style={{ padding: "10px" }}>
          {RenderSignalButton({ slot: "input1", type: "input", selectedElement, openSignalPicker })}
          <div>
            <select
              className="dropdown button condition-button"
              onChange={handleOperatorChange}
              id="condition"
              defaultValue={selectedElement.signals?.operator}
              onMouseDown={(e) => e.stopPropagation()}
            >
              <option value=">">{">"}</option>
              <option value="<">{"<"}</option>
              <option value=">=">{">="}</option>
              <option value="<=">{"<="}</option>
              <option value="=">{"="}</option>
              <option value="!=">{"!="}</option>
            </select>
          </div>
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
