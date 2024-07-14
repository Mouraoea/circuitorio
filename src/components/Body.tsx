import React, { useState, useEffect, useCallback } from "react";
// import logo from "./logo.svg";
import CircuitBoard from "./CircuitBoard";
import "../App.css";
import Drawer from "./Drawer";
import DrawerContent from "./DrawerContent";
import { useCanvasContext } from "../context/CanvasContext";
import Toolbox from "./Toolbox";
import Debug from "./Debug";

const Body: React.FC = () => {
  const { isDrawerOpen, setIsDrawerOpen, drawerFrom, setDrawerFrom } = useCanvasContext();
  const [drawerContent, setDrawerContent] = useState<React.ReactNode>(null);

  const toggleDrawer = useCallback(
    (side: "left" | "right", content: React.ReactNode) => {
      if (isDrawerOpen) {
        setIsDrawerOpen(false);
        return;
      }
      setDrawerFrom(side);
      setDrawerContent(content);
      setIsDrawerOpen(true);
    },
    [setDrawerFrom, setDrawerContent, setIsDrawerOpen, isDrawerOpen]
  );

  const closeDrawer = useCallback(() => {
    setIsDrawerOpen(false);
  }, [setIsDrawerOpen]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (["o"].includes(event.key)) {
        toggleDrawer("right", <Debug />);
        return;
      }
      if (["e"].includes(event.key)) {
        toggleDrawer("left", <Toolbox />);
        return;
      }
      if (["Escape"].includes(event.key)) {
        closeDrawer();
        return;
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [toggleDrawer, closeDrawer]);

  return (
    <div className="App" style={{ display: "flex", flexDirection: "column" }}>
      <Drawer isOpen={isDrawerOpen} onClose={closeDrawer} from={drawerFrom}>
        <DrawerContent content={drawerContent} />
      </Drawer>
      <CircuitBoard />
    </div>
  );
};

export default Body;
