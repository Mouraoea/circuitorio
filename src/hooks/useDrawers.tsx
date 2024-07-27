import { useState, useCallback } from "react";

export const useDrawers = () => {
  const [leftDrawerContent, setLeftDrawerContent] = useState<React.ReactNode>(null);
  const [rightDrawerContent, setRightDrawerContent] = useState<React.ReactNode>(null);
  const [leftOpenDrawerId, setLeftOpenDrawerId] = useState<string | null>(null);
  const [rightOpenDrawerId, setRightOpenDrawerId] = useState<string | null>(null);
  const [isLeftDrawerOpen, setIsLeftDrawerOpen] = useState(false);
  const [isRightDrawerOpen, setIsRightDrawerOpen] = useState(false);

  const toggleDrawer = useCallback(
    (side: "left" | "right", content: React.ReactNode, id: string) => {
      console.log("Open entity panel");
      console.log(isRightDrawerOpen);
      if (side === "left") {
        if (leftOpenDrawerId === id) {
          setIsLeftDrawerOpen(false);
          setLeftOpenDrawerId(null);
        } else if (isLeftDrawerOpen && leftOpenDrawerId !== id) {
          setLeftDrawerContent(content);
          setLeftOpenDrawerId(id);
        } else {
          setLeftDrawerContent(content);
          setLeftOpenDrawerId(id);
          setIsLeftDrawerOpen(true);
        }
      } else {
        if (rightOpenDrawerId === id) {
          setIsRightDrawerOpen(false);
          setRightOpenDrawerId(null);
        } else if (isRightDrawerOpen && rightOpenDrawerId !== id) {
          setRightDrawerContent(content);
          setRightOpenDrawerId(id);
        } else {
          setRightDrawerContent(content);
          setRightOpenDrawerId(id);
          setIsRightDrawerOpen(true);
        }
      }
    },
    [isLeftDrawerOpen, isRightDrawerOpen, leftOpenDrawerId, rightOpenDrawerId]
  );

  const closeLeftDrawer = useCallback(() => {
    setIsLeftDrawerOpen(false);
    setLeftDrawerContent(null);
    setLeftOpenDrawerId(null);
  }, []);

  const closeRightDrawer = useCallback(() => {
    setIsRightDrawerOpen(false);
    setRightDrawerContent(null);
    setRightOpenDrawerId(null);
  }, []);

  return {
    leftDrawerContent,
    rightDrawerContent,
    isLeftDrawerOpen,
    isRightDrawerOpen,
    toggleDrawer,
    closeLeftDrawer,
    closeRightDrawer,
  };
};
