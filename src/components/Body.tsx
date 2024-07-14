import React, { useState, useEffect, useCallback } from "react";
// import logo from "./logo.svg";
import CircuitBoard from "./CircuitBoard";
import "../App.css";
import LeftDrawer from "./LeftDrawer";
import RightDrawer from "./RightDrawer";
import DrawerContent from "./DrawerContent";
import { useCanvasContext } from "../context/CanvasContext";
import Toolbox from "./Toolbox";
import Debug from "./Debug";
import Settings from "./Settings";

const Body: React.FC = () => {
  const { isLeftDrawerOpen, setIsLeftDrawerOpen, isRightDrawerOpen, setIsRightDrawerOpen } = useCanvasContext();
  const [leftDrawerContent, setLeftDrawerContent] = useState<React.ReactNode>(null);
  const [rightDrawerContent, setRightDrawerContent] = useState<React.ReactNode>(null);
  const [leftOpenDrawerId, setLeftOpenDrawerId] = useState<string | null>(null);
  const [rightOpenDrawerId, setRightOpenDrawerId] = useState<string | null>(null);

  const toggleDrawer = useCallback(
    (side: "left" | "right", content: React.ReactNode, id: string) => {
      if (side === "left") {
        if (leftOpenDrawerId === id) {
          setIsLeftDrawerOpen(false);
          setLeftOpenDrawerId(null);
          return;
        } else if (isLeftDrawerOpen && leftOpenDrawerId !== id) {
          setLeftDrawerContent(content);
          setLeftOpenDrawerId(id);
          return;
        } else if (isLeftDrawerOpen) {
          setIsLeftDrawerOpen(false);
          setLeftDrawerContent(null);
          setLeftOpenDrawerId(null);
        } else {
          setLeftDrawerContent(content);
          setLeftOpenDrawerId(id);
          setIsLeftDrawerOpen(true);
        }
      } else {
        if (rightOpenDrawerId === id) {
          setIsRightDrawerOpen(false);
          setRightOpenDrawerId(null);
          return;
        } else if (isRightDrawerOpen && rightOpenDrawerId !== id) {
          setRightDrawerContent(content);
          setRightOpenDrawerId(id);
          return;
        } else if (isRightDrawerOpen) {
          setIsRightDrawerOpen(false);
          setRightDrawerContent(null);
          setRightOpenDrawerId(null);
        } else {
          setRightDrawerContent(content);
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
    ]
  );

  const closeLeftDrawer = useCallback(() => {
    setIsLeftDrawerOpen(false);
  }, [setIsLeftDrawerOpen]);

  const closeRightDrawer = useCallback(() => {
    setIsRightDrawerOpen(false);
  }, [setIsRightDrawerOpen]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (["o"].includes(event.key)) {
        toggleDrawer("right", <Debug />, "debug");
        return;
      }
      if (["e"].includes(event.key)) {
        toggleDrawer("left", <Toolbox />, "toolbox");
        return;
      }
      if (["F2"].includes(event.key)) {
        event.preventDefault();
        toggleDrawer("left", <Settings />, "settings");
        return;
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [toggleDrawer]);

  return (
    <div className="App" style={{ display: "flex", flexDirection: "column" }}>
      <LeftDrawer isOpen={isLeftDrawerOpen} onClose={closeLeftDrawer}>
        <DrawerContent content={leftDrawerContent} />
      </LeftDrawer>
      <RightDrawer isOpen={isRightDrawerOpen} onClose={closeRightDrawer}>
        <DrawerContent content={rightDrawerContent} />
      </RightDrawer>

      <CircuitBoard />
    </div>
  );
};

export default Body;
