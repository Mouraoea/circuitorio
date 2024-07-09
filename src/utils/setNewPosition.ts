import { type XYCoord } from "react-dnd";

export const setNewPosition = (coords: { x: number; y: number }, delta: XYCoord | null = { x: 0, y: 0 }, scale: number) => {
  if (!delta) {
    return coords;
  }
  return {
    x: coords.x + delta.x / scale,
    y: coords.y + delta.y / scale,
  };
};
