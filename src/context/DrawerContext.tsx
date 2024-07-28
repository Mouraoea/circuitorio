import { createContext, useContext } from "react";
import { useDrawerState } from "../hooks/useDrawerState";

interface DrawerContextProps {
  isLeftDrawerOpen: boolean;
  setIsLeftDrawerOpen: (value: boolean) => void;
  leftOpenDrawerId: string | null;
  setLeftOpenDrawerId: (value: string | null) => void;
  leftDrawerContent: React.ReactNode;
  setLeftDrawerContent: (value: React.ReactNode) => void;
  isRightDrawerOpen: boolean;
  setIsRightDrawerOpen: (value: boolean) => void;
  rightOpenDrawerId: string | null;
  setRightOpenDrawerId: (value: string | null) => void;
  rightDrawerContent: React.ReactNode;
  setRightDrawerContent: (value: React.ReactNode) => void;
}

const DrawerContext = createContext<DrawerContextProps | undefined>(undefined);

export const DrawerProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const contextValue = useDrawerState();

  return <DrawerContext.Provider value={contextValue}>{children}</DrawerContext.Provider>;
};

export const useDrawerContext = () => {
  const context = useContext(DrawerContext);
  if (!context) {
    throw new Error("useDrawerContext must be used within a DrawerProvider");
  }
  return context;
};
