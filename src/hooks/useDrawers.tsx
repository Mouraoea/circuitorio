import { useCallback } from "react";
import { useDrawerContext } from "../context/DrawerContext";
import { Debug, Help, Settings, Toolbox } from "../components/componentsIndex";

export const useDrawers = () => {
  const {
    isLeftDrawerOpen,
    setIsLeftDrawerOpen,
    leftOpenDrawerId,
    setLeftOpenDrawerId,
    leftDrawerContent,
    setLeftDrawerContent,
    isRightDrawerOpen,
    setIsRightDrawerOpen,
    rightOpenDrawerId,
    setRightOpenDrawerId,
    rightDrawerContent,
    setRightDrawerContent,
  } = useDrawerContext();

  const closeLeftDrawer = useCallback(() => {
    setIsLeftDrawerOpen(false);
    setLeftDrawerContent(null);
    setLeftOpenDrawerId(null);
  }, [setLeftDrawerContent, setIsLeftDrawerOpen, setLeftOpenDrawerId]);

  const closeRightDrawer = useCallback(() => {
    setIsRightDrawerOpen(false);
    setRightDrawerContent(null);
    setRightOpenDrawerId(null);
  }, [setRightDrawerContent, setIsRightDrawerOpen, setRightOpenDrawerId]);

  const fetchContent = useCallback(
    (id: string) => {
      switch (id) {
        case "toolbox":
          return <Toolbox closeLeftDrawer={closeLeftDrawer} />;
        case "settings":
          return <Settings />;
        case "debug":
          return <Debug />;
        case "help":
          return <Help />;
        default:
          return null;
      }
    },
    [closeLeftDrawer]
  );

  const toggleDrawer = useCallback(
    (side: "left" | "right", id: string) => {
      if (side === "left") {
        if (leftOpenDrawerId === id) {
          setIsLeftDrawerOpen(false);
          setLeftOpenDrawerId(null);
        } else if (isLeftDrawerOpen && leftOpenDrawerId !== id) {
          setLeftDrawerContent(fetchContent(id));
          setLeftOpenDrawerId(id);
        } else if (isLeftDrawerOpen) {
          setIsLeftDrawerOpen(false);
          setLeftDrawerContent(null);
          setLeftOpenDrawerId(null);
        } else {
          setLeftDrawerContent(fetchContent(id));
          setLeftOpenDrawerId(id);
          setIsLeftDrawerOpen(true);
        }
      } else {
        if (rightOpenDrawerId === id) {
          setIsRightDrawerOpen(false);
          setRightOpenDrawerId(null);
        } else if (isRightDrawerOpen && rightOpenDrawerId !== id) {
          setRightDrawerContent(fetchContent(id));
          setRightOpenDrawerId(id);
        } else if (isRightDrawerOpen) {
          setIsRightDrawerOpen(false);
          setRightDrawerContent(null);
          setRightOpenDrawerId(null);
        } else {
          setRightDrawerContent(fetchContent(id));
          setRightOpenDrawerId(id);
          setIsRightDrawerOpen(true);
        }
      }
    },
    [
      isLeftDrawerOpen,
      isRightDrawerOpen,
      setIsLeftDrawerOpen,
      setIsRightDrawerOpen,
      setLeftDrawerContent,
      setRightDrawerContent,
      setLeftOpenDrawerId,
      setRightOpenDrawerId,
      leftOpenDrawerId,
      rightOpenDrawerId,
      fetchContent,
    ]
  );

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
