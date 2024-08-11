import { createContext, ReactNode, useContext } from "react";
import { KeyStateKeys, useInputState } from "../hooks/useInputState";

export interface InputContextProps {
  keyState: KeyStateKeys;
  setKeyState: (value: Partial<KeyStateKeys>) => void;
  isCanvasFocused: boolean;
  setIsCanvasFocused: (value: boolean) => void;
  startCursorPosition: { x: number; y: number };
  setStartCursorPosition: (value: { x: number; y: number }) => void;
  cursorPosition: { x: number; y: number };
  setCursorPosition: (value: { x: number; y: number }) => void;
  cursorGridPosition: { x: number; y: number };
  setCursorGridPosition: (value: { x: number; y: number }) => void;
  cursorGridCoordinates: { x: number; y: number };
  setCursorGridCoordinates: (value: { x: number; y: number }) => void;
}

const InputContext = createContext<InputContextProps | undefined>(undefined);

export const InputProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const contextValue = useInputState();

  return <InputContext.Provider value={contextValue}>{children}</InputContext.Provider>;
};

export const useInputContext = () => {
  const context = useContext(InputContext);
  if (context === undefined) {
    throw new Error("useInputContext must be used within a InputProvider");
  }
  return context;
};
