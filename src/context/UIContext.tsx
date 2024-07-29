import { createContext, ReactNode, useContext } from "react";
import { useUIState } from "../hooks/useUIState";
import { CircuitElementProps } from "../store/circuitSlice";

export interface UIContextProps {
  disclaimerIsOpen: boolean;
  setDisclaimerIsOpen: (value: boolean) => void;
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

const UIContext = createContext<UIContextProps | undefined>(undefined);

export const UIProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const contextValue = useUIState();

  return <UIContext.Provider value={contextValue}>{children}</UIContext.Provider>;
};

export const useUIContext = () => {
  const context = useContext(UIContext);
  if (context === undefined) {
    throw new Error("useUIContext must be used within a UIProvider");
  }
  return context;
};
