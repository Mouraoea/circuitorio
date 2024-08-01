import { CSSProperties } from "react";
import { IconProvider } from "../entities/spritesheets/SpriteProvider";
import { CircuitElementProps } from "../store/circuitSlice";

export const getIcon = (slot: string, type: "input" | "output", selectedElement: CircuitElementProps): CSSProperties => {
  const signal = selectedElement?.signals?.[type]?.[slot];
  return signal ? IconProvider(Object.keys(signal)[0]).style || {} : {};
};
