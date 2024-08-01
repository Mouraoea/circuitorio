import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { EntitySprite } from "../entities/spritesheets/SpriteProvider";
import { RootState } from "./store";
import { checkCollision } from "../utils/checkCollision";

export type Orientation = "north" | "east" | "south" | "west";

interface CircuitElementProps extends EntitySprite {
  id: string;
  position: { x: number; y: number };
  rotation: number;
  orientation: Orientation;
  size: { width: number; height: number };
  opacity?: number;
  signals?: Signals;
}

interface Signals {
  input?: { [key: string]: string };
  operator?: string;
  output?: { [key: string]: string };
}

interface CircuitState {
  elements: CircuitElementProps[];
  previewElement: CircuitElementProps | null;
}

const initialState: CircuitState = {
  elements: [],
  previewElement: null,
};

const rotateOrientation = (rotation: number) => ["north", "east", "south", "west"][rotation % 4] as Orientation;

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
    updateElementDetails: (state, action: PayloadAction<{ id: string; details: Partial<CircuitElementProps> }>) => {
      const element = state.elements.find((el) => el.id === action.payload.id);
      if (element) {
        Object.assign(element, action.payload.details);
      }
    },
    rotateElement: (state, action: PayloadAction<{ id: string }>) => {
      const element = state.elements.find((el) => el.id === action.payload.id);
      if (element) {
        let newRotation = (element.rotation + 1) % 4;
        let newOrientation = rotateOrientation(newRotation);
        let newSize = element.gridSize[newOrientation];
        let newElement = { ...element, rotation: newRotation, orientation: newOrientation, size: newSize };
        if (!checkCollision(newElement, state.elements)) {
          Object.assign(element, newElement);
        } else {
          newRotation = (newRotation + 1) % 4;
          newOrientation = rotateOrientation(newRotation);
          newSize = newElement.gridSize[newOrientation];
          newElement = { ...newElement, rotation: newRotation, orientation: newOrientation, size: newSize };
          if (!checkCollision(newElement, state.elements)) {
            Object.assign(element, newElement);
          }
        }
      }
    },
    setPreviewElement: (state, action: PayloadAction<CircuitElementProps | null>) => {
      state.previewElement = action.payload;
    },
    checkForCollision: (state, action: PayloadAction<{ id: string; newPosition: { x: number; y: number } }>) => {
      const element = state.elements.find((el) => el.id === action.payload.id);
      if (element) {
        const newElement = { ...element, position: action.payload.newPosition };
        if (!checkCollision(newElement, state.elements)) {
          element.position = action.payload.newPosition;
        }
      }
    },
    removeElement: (state, action: PayloadAction<{ id: string }>) => {
      state.elements = state.elements.filter((el) => el.id !== action.payload.id);
    },
  },
});

export const selectElementById = (state: RootState, id: string) => state.circuit.elements.find((el) => el.id === id);

export const { addElement, updateElementPosition, rotateElement, setPreviewElement, checkForCollision, removeElement, updateElementDetails } = circuitSlice.actions;

export type { CircuitElementProps, Signals };
export default circuitSlice.reducer;
