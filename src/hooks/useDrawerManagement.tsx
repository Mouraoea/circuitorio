import { useCallback } from "react";

export const useDrawerManagement = (
  setIsLeftDrawerOpen: React.Dispatch<React.SetStateAction<boolean>>,
  setLeftDrawerContent: React.Dispatch<React.SetStateAction<React.ReactNode | null>>,
  setLeftOpenDrawerId: React.Dispatch<React.SetStateAction<string | null>>,
  setIsRightDrawerOpen: React.Dispatch<React.SetStateAction<boolean>>,
  setRightDrawerContent: React.Dispatch<React.SetStateAction<React.ReactNode | null>>,
  setRightOpenDrawerId: React.Dispatch<React.SetStateAction<string | null>>
) => {
  const closeDrawer = useCallback(
    (side: "left" | "right") => {
      if (side === "left") {
        setIsLeftDrawerOpen(false);
        setLeftDrawerContent(null);
        setLeftOpenDrawerId(null);
      } else {
        setIsRightDrawerOpen(false);
        setRightDrawerContent(null);
        setRightOpenDrawerId(null);
      }
    },
    [setIsLeftDrawerOpen, setLeftDrawerContent, setLeftOpenDrawerId, setIsRightDrawerOpen, setRightDrawerContent, setRightOpenDrawerId]
  );

  return closeDrawer;
};
