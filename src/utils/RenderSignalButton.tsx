import { CircuitElementProps } from "../store/circuitSlice";
import { formatSignalString } from "./formatSignalString";
import { getIcon } from "./getIcon";
import { EntityInterfaceProps } from "../entityInterface/EntityInterface";
import React from "react";

export interface RenderButtonProps extends EntityInterfaceProps {
  slot: string;
  type: "input" | "output";
  selectedElement: CircuitElementProps;
}

export const RenderSignalButton: React.FC<RenderButtonProps> = ({ slot, type, selectedElement, openSignalPicker }) => (
  <div className="flex-column signal-button-container">
    <button type="button" onClick={() => openSignalPicker(slot, type)} style={{ padding: "1px" }} className="button-black square40 m0 p0" id={slot}>
      <div style={getIcon(slot, type, selectedElement)}></div>
    </button>
    <h6 style={{ color: "wheat" }}>{formatSignalString(slot, type, selectedElement)}</h6>
  </div>
);
