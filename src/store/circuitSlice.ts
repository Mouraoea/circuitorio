// src/store/circuitSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CircuitElementProps {
  id: string;
  type: string;
  size: number[];
  sprite: string;
  spriteSize: number[];
  spriteOffset: number[];
  backgroundSize: number[];
  spriteOffsetRef: number[];
  backgroundSizeRef: number[];
  position: { x: number; y: number };
  rotation: number;
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
      const element = state.elements.find((el) => el.id === action.payload.id);

      if (element) {
        element.rotation = ++element.rotation % 4;
        element.size = [element.size[1], element.size[0]];
        element.spriteOffset = [element.spriteOffsetRef[element.rotation * 2], element.spriteOffsetRef[element.rotation * 2 + 1]];
        element.backgroundSize = [element.backgroundSizeRef[element.rotation * 2], element.backgroundSizeRef[element.rotation * 2 + 1]];
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
