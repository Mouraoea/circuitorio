import { CircuitElementProps } from "../store/circuitSlice";
import { formatNumber } from "./formatNumber";

export const formatSignalString = (slot: string, type: "input" | "output", selectedElement: CircuitElementProps): string => {
  const signal = selectedElement?.signals?.[type]?.[slot];
  const num = signal && Object.values(signal)[0];
  return num ? formatNumber(num) : "";
};
