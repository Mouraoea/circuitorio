import React, { createContext, useContext, ReactNode } from "react";
import { useCanvasState } from "../hooks/useCanvasState";
import { CircuitElementProps } from "../store/circuitSlice";

export interface CanvasContextProps {
  appVersion: string;
  setAppVersion: (value: string) => void;
  scale: number;
  setScale: (value: number) => void;
  panPosition: { x: number; y: number };
  setPanPosition: (value: { x: number; y: number }) => void;
  panPercentage: { x: number; y: number };
  setPanPercentage: (value: { x: number; y: number }) => void;
  transformOrigin: { x: number; y: number };
  setTransformOrigin: (value: { x: number; y: number }) => void;
  gridSize: number;
  gridHeight: number;
  gridWidth: number;
  isPanning: boolean;
  setIsPanning: (value: boolean) => void;
  startPanPosition: { x: number; y: number };
  setStartPanPosition: (value: { x: number; y: number }) => void;
  boardRef: React.RefObject<HTMLDivElement>;
  placingPosition: { x: number; y: number };
  setPlacingPosition: (value: { x: number; y: number }) => void;
  ghostElementPosition: { x: number; y: number };
  setGhostElementPosition: (value: { x: number; y: number }) => void;
  elementToPlace: CircuitElementProps | null;
  setElementToPlace: (value: CircuitElementProps | null) => void;
  isPlacing: boolean;
  setIsPlacing: (value: boolean) => void;
  placingElementRotation: number;
  setPlacingElementRotation: (value: number) => void;
}

const CanvasContext = createContext<CanvasContextProps | undefined>(undefined);

export const CanvasProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const contextValue = useCanvasState();

  return <CanvasContext.Provider value={contextValue}>{children}</CanvasContext.Provider>;
};

export const useCanvasContext = () => {
  const context = useContext(CanvasContext);
  if (context === undefined) {
    throw new Error("useCanvasContext must be used within a CanvasProvider");
  }
  return context;
};
