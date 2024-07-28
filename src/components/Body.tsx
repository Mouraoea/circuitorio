import React, { useState } from "react";
import "../App.css";
import CircuitBoard from "./CircuitBoard";
import TopOverlay from "./TopOverlay";
import Modal from "react-modal";
import EntityPanel from "./EntityPanel";
import SignalPicker from "./SignalPicker";
import { PlacingElement, Loader, Drawers } from "./OverlayComponents";
import { DisclaimerModal } from "./DisclaimerModal";
import Input from "../input/Input";
import { useCanvasContext } from "../context/CanvasContext";

Modal.setAppElement("#root");

const Body: React.FC = () => {
  const { isPlacing, elementToPlace, scale, cursorPosition } = useCanvasContext();
  const [removeTimeout] = useState<NodeJS.Timeout | null>(null);

  return (
    <div>
      <div className="fixed-left-top">
        <CircuitBoard />
      </div>
      <PlacingElement isPlacing={isPlacing} elementToPlace={elementToPlace} scale={scale} />
      {removeTimeout && <Loader cursorPosition={cursorPosition} />}
      <Input />
      <DisclaimerModal />
      <TopOverlay />
      <Drawers />
      <EntityPanel />
      <SignalPicker />
    </div>
  );
};

export default Body;
