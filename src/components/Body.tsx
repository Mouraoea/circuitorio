import React, { useState } from "react";
import { useCanvasContext } from "../context/CanvasContext";
import CircuitBoard from "./CircuitBoard";
import TopOverlay from "./TopOverlay";
import EntityPanel from "./EntityPanel";
import SignalPicker from "./SignalPicker";
import { PlacingElement, Loader, Drawers } from "./OverlayComponents";
import { DisclaimerModal } from "./DisclaimerModal";
import Input from "../input/Input";
import { useInputContext } from "../context/InputContext";

const Body: React.FC = () => {
  const { isPlacing, elementToPlace, scale } = useCanvasContext();
  const { cursorPosition } = useInputContext();
  const [removeTimeout] = useState<NodeJS.Timeout | null>(null);

  return (
    <div>
      <div className="fixed-left-top">
        <CircuitBoard />
      </div>
      <Input />
      <PlacingElement isPlacing={isPlacing} elementToPlace={elementToPlace} scale={scale} />
      {removeTimeout && <Loader cursorPosition={cursorPosition} />}

      <DisclaimerModal />
      <TopOverlay />
      <Drawers />
      <EntityPanel />
      <SignalPicker />
    </div>
  );
};

export default Body;
