import { createContext, useContext } from "react";

interface DrawerContextProps {
  toggleDrawer: (side: "left" | "right", content: React.ReactNode, id: string) => void;
  closeLeftDrawer: () => void;
  closeRightDrawer: () => void;
}

export const DrawerContext = createContext<DrawerContextProps | undefined>(undefined);

export const useDrawer = (): DrawerContextProps => {
  const context = useContext(DrawerContext);
  if (!context) {
    throw new Error("useDrawer must be used within a DrawerProvider");
  }
  return context;
};
