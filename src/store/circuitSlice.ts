// src/store/circuitSlice.ts
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

const circuitSlice = createSlice({
  name: "circuit",
  initialState,
  reducers: {
    addElement: (state, action: PayloadAction<CircuitElementProps>) => {
      state.elements.push(action.payload);
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
      }
    },

    setPreviewElement: (state, action: PayloadAction<CircuitElementProps | null>) => {
      // New reducer for setting preview element
      state.previewElement = action.payload;
    },
  },
});

export const { addElement, updateElementPosition, rotateElement, setPreviewElement } = circuitSlice.actions;
export type { CircuitElementProps };
export default circuitSlice.reducer;
