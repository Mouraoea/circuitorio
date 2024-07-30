import React from "react";
import Drawer from "./Drawer";
import DrawerContent from "./DrawerContent";
import { getElementSprite } from "../utils/getElementSprite";
import { useDrawers } from "../hooks/useDrawers";
import { useDrawerContext } from "../context/DrawerContext";
import { useCanvasContext } from "../context/CanvasContext";
import { useInputContext } from "../context/InputContext";
import { useUIContext } from "../context/UIContext";

export const PlacingElement: React.FC = () => {
  const { isPlacing, elementToPlace, scale } = useCanvasContext();
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

export const ElementRemovalSpinner: React.FC = () => {
  const { cursorPosition } = useInputContext();
  const { elementRemovalTimer } = useUIContext();

  return (
    <>
      {elementRemovalTimer && (
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
      )}
    </>
  );
};

export const Drawers: React.FC = () => {
  const { isLeftDrawerOpen, isRightDrawerOpen, leftDrawerContent, rightDrawerContent } = useDrawers();
  const { setIsRightDrawerOpen, setIsLeftDrawerOpen } = useDrawerContext();

  return (
    <>
      <Drawer isOpen={isLeftDrawerOpen} onClose={() => setIsLeftDrawerOpen(false)} side="left">
        <DrawerContent content={leftDrawerContent} />
      </Drawer>
      <Drawer isOpen={isRightDrawerOpen} onClose={() => setIsRightDrawerOpen(false)} side="right">
        <DrawerContent content={rightDrawerContent} />
      </Drawer>
    </>
  );
};
