import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { EntitySprite } from "../spritesheets/SpriteProvider";

export type Orientation = "north" | "east" | "south" | "west";

interface CircuitElementProps extends EntitySprite {
  id: string;
  position: { x: number; y: number };
  rotation: number;
  orientation: Orientation;
  size: { width: number; height: number };
  opacity?: number;
}

interface CircuitState {
  elements: CircuitElementProps[];
  previewElement: CircuitElementProps | null;
}

const initialState: CircuitState = {
  elements: [],
  previewElement: null,
};

const checkCollision = (newElement: CircuitElementProps, elements: CircuitElementProps[]) => {
  const newGridCoordinates = {
    x: Math.floor(newElement.position.x / 32),
    y: Math.floor(newElement.position.y / 32),
  };

  const currentElementWidth = newElement.size.width;
  const currentElementHeight = newElement.size.height;

  for (const element of elements) {
    if (element.id === newElement.id) continue;
    console.log(`Checking collision position ${newGridCoordinates.x}, ${newGridCoordinates.y} size ${currentElementWidth}, ${currentElementHeight}`);
    const elementGridCoordinates = {
      x: Math.floor(element.position.x / 32),
      y: Math.floor(element.position.y / 32),
    };
    const elementWidth = element.size.width;
    const elementHeight = element.size.height;
    console.log(`Checking against element at ${elementGridCoordinates.x}, ${elementGridCoordinates.y} size ${elementWidth}, ${elementHeight}`);
    if (
      newGridCoordinates.x < elementGridCoordinates.x + elementWidth &&
      newGridCoordinates.x + currentElementWidth > elementGridCoordinates.x &&
      newGridCoordinates.y < elementGridCoordinates.y + elementHeight &&
      newGridCoordinates.y + currentElementHeight > elementGridCoordinates.y
    ) {
      console.log("Collision detected!");
      return true;
    }
    console.log("No collision detected.");
  }

  return false;
};

const circuitSlice = createSlice({
  name: "circuit",
  initialState,
  reducers: {
    addElement: (state, action: PayloadAction<CircuitElementProps>) => {
      if (!checkCollision(action.payload, state.elements)) {
        state.elements.push(action.payload);
      } else {
        console.warn("Collision detected, element not added.");
      }
    },
    updateElementPosition: (state, action: PayloadAction<{ id: string; position: { x: number; y: number } }>) => {
      const element = state.elements.find((el) => el.id === action.payload.id);
      if (element) {
        element.position = action.payload.position;
      }
    },
    rotateElement: (state, action: PayloadAction<{ id: string }>) => {
      const searchResult: CircuitElementProps | undefined = state.elements.find((el) => el.id === action.payload.id);
      if (searchResult) {
        const element = searchResult;
        element.rotation = ++element.rotation % 4;
        element.orientation = ["north", "east", "south", "west"][element.rotation] as Orientation;
        element.size = element.gridSize[element.orientation];
      }
    },
    setPreviewElement: (state, action: PayloadAction<CircuitElementProps | null>) => {
      // New reducer for setting preview element
      state.previewElement = action.payload;
    },
    checkForCollision: (state, action: PayloadAction<{ id: string; newPosition: { x: number; y: number } }>) => {
      const currentElement = state.elements.find((el) => el.id === action.payload.id);
      if (!currentElement) return;
      const newElement = { ...currentElement, position: action.payload.newPosition };
      if (!checkCollision(newElement, state.elements)) {
        currentElement.position = action.payload.newPosition;
      }
    },
    removeElement: (state, action: PayloadAction<{ id: string }>) => {
      state.elements = state.elements.filter((el) => el.id !== action.payload.id);
    },
  },
});

export const { addElement, updateElementPosition, rotateElement, setPreviewElement, checkForCollision, removeElement } = circuitSlice.actions;
export type { CircuitElementProps };
export default circuitSlice.reducer;
