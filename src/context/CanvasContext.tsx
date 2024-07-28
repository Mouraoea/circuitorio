import React, { createContext, useContext, ReactNode } from "react";
import { KeyStateKeys, useCanvasState } from "../hooks/useCanvasState";
import { CircuitElementProps } from "../store/circuitSlice";

interface CanvasContextProps {
  disclaimerIsOpen: boolean;
  setDisclaimerIsOpen: (value: boolean) => void;
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
  boardRef: React.RefObject<HTMLDivElement>;
  keyState: KeyStateKeys;
  setKeyState: (value: Partial<KeyStateKeys>) => void;
  cursorPosition: { x: number; y: number };
  setCursorPosition: (value: { x: number; y: number }) => void;
  cursorGridPosition: { x: number; y: number };
  setCursorGridPosition: (value: { x: number; y: number }) => void;
  cursorGridCoordinates: { x: number; y: number };
  setCursorGridCoordinates: (value: { x: number; y: number }) => void;
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
  zoomCenter: { x: number; y: number };
  setZoomCenter: (value: { x: number; y: number }) => void;
  hoveredElement: CircuitElementProps | null;
  setHoveredElement: (value: CircuitElementProps | null) => void;
  selectedElement: CircuitElementProps | null;
  setSelectedElement: (value: CircuitElementProps | null) => void;
  isDebugMode: boolean;
  setIsDebugMode: (value: boolean) => void;
  isEntityPanelOpen: boolean;
  setIsEntityPanelOpen: (value: boolean) => void;
  isEntityPanelDragging: boolean;
  setIsEntityPanelDragging: (value: boolean) => void;
  entityPanelPosition: { x: number; y: number };
  setEntityPanelPosition: (value: { x: number; y: number }) => void;
  entityPanelContent: ReactNode;
  setEntityPanelContent: (value: ReactNode) => void;
  isSignalPickerOpen: boolean;
  setIsSignalPickerOpen: (value: boolean) => void;
  isSignalPickerDragging: boolean;
  setIsSignalPickerDragging: (value: boolean) => void;
  SignalPickerPosition: { x: number; y: number };
  setSignalPickerPosition: (value: { x: number; y: number }) => void;
  SignalPickerContent: ReactNode;
  setSignalPickerContent: (value: ReactNode) => void;
  selectedSignalSlot: { [key: string]: string } | null;
  setSelectedSignalSlot: (value: { [key: string]: string } | null) => void;
  signalPickerSelectedGroup: string;
  setSignalPickerSelectedGroup: (value: string) => void;
  signalPickerConstantValue: number;
  setSignalPickerConstantValue: (value: number) => void;
  signalPickerSelectedSignal: string;
  setSignalPickerSelectedSignal: (value: string) => void;
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
