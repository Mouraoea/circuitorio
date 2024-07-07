// src/store/circuitSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CircuitElement {
  id: string;
  type: string;
  size: number[];
  sprite: string;
  spriteSize: number[];
  spriteOffset: number[];
  backgroundSize: number[];
  position: { x: number; y: number };
}

interface CircuitState {
  elements: CircuitElement[];
}

const initialState: CircuitState = {
  elements: [],
};

const circuitSlice = createSlice({
  name: "circuit",
  initialState,
  reducers: {
    addElement: (state, action: PayloadAction<CircuitElement>) => {
      state.elements.push(action.payload);
    },
    updateElementPosition: (state, action: PayloadAction<{ id: string; position: { x: number; y: number } }>) => {
      const element = state.elements.find((el) => el.id === action.payload.id);
      if (element) {
        element.position = action.payload.position;
      }
    },
  },
});

export const { addElement, updateElementPosition } = circuitSlice.actions;
export default circuitSlice.reducer;
