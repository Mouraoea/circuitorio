import { CircuitElementProps } from "../store/circuitSlice";
import { getGridCoordinates } from "./getGridCoordinates";

export const checkCollision = (newElement: CircuitElementProps, elements: CircuitElementProps[]) => {
  const { x: newX, y: newY } = getGridCoordinates(newElement.position);
  const { width: newWidth, height: newHeight } = newElement.size;

  return elements.some((element) => {
    if (element.id === newElement.id) return false;
    const { x: elemX, y: elemY } = getGridCoordinates(element.position);
    const { width: elemWidth, height: elemHeight } = element.size;

    return newX < elemX + elemWidth && newX + newWidth > elemX && newY < elemY + elemHeight && newY + newHeight > elemY;
  });
};
