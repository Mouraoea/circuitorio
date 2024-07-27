import React from "react";
import Drawer from "./Drawer";
import DrawerContent from "./DrawerContent";
import { CircuitElementProps } from "../store/circuitSlice";
import { getElementSprite } from "../utils/getElementSprite";

export const PlacingElement: React.FC<{ isPlacing: boolean; elementToPlace: CircuitElementProps | null; scale: number }> = ({ isPlacing, elementToPlace, scale }) => {
  if (!isPlacing || !elementToPlace) return null;

  return (
    <div
      style={{
        position: "fixed",
        opacity: 0.5,
        pointerEvents: "none",
        transformOrigin: `${-elementToPlace.origingOffset[elementToPlace.orientation].x}px ${-elementToPlace.origingOffset[elementToPlace.orientation].y}px`,
        transform: `scale(${scale * elementToPlace.spriteScale})`,
        ...getElementSprite(elementToPlace),
      }}
    ></div>
  );
};

export const Loader: React.FC<{ cursorPosition: { x: number; y: number } }> = ({ cursorPosition }) => (
  <div
    className="loader"
    style={{
      position: "fixed",
      top: cursorPosition.y,
      left: cursorPosition.x,
      pointerEvents: "none",
      zIndex: 1000,
      width: "32px",
      height: "32px",
    }}
  ></div>
);

export const Drawers: React.FC<{
  isLeftDrawerOpen: boolean;
  isRightDrawerOpen: boolean;
  leftDrawerContent: React.ReactNode;
  rightDrawerContent: React.ReactNode;
  setIsLeftDrawerOpen: (isOpen: boolean) => void;
  setIsRightDrawerOpen: (isOpen: boolean) => void;
}> = ({ isLeftDrawerOpen, isRightDrawerOpen, leftDrawerContent, rightDrawerContent, setIsLeftDrawerOpen, setIsRightDrawerOpen }) => (
  <>
    <Drawer isopen={isLeftDrawerOpen} onClose={() => setIsLeftDrawerOpen(false)} side="left">
      <DrawerContent content={leftDrawerContent} />
    </Drawer>
    <Drawer isopen={isRightDrawerOpen} onClose={() => setIsRightDrawerOpen(false)} side="right">
      <DrawerContent content={rightDrawerContent} />
    </Drawer>
  </>
);
