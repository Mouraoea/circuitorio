import React from "react";
import CircuitBoard from "./CircuitBoard";
import TopOverlay from "./TopOverlay";
import EntityPanel from "./EntityPanel";
import SignalPicker from "./SignalPicker";
import { PlacingElement, ElementRemovalSpinner, Drawers } from "./OverlayComponents";
import { DisclaimerModal } from "./DisclaimerModal";
import Input from "../input/Input";

const Body: React.FC = () => {
  return (
    <>
      <CircuitBoard />
      <Input />
      <PlacingElement />
      <ElementRemovalSpinner />
      <DisclaimerModal />
      <TopOverlay />
      <Drawers />
      <EntityPanel />
      <SignalPicker />
    </>
  );
};

export default Body;
