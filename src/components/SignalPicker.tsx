import React from "react";
import Draggable, { DraggableData, DraggableEvent } from "react-draggable";
import { useCanvasContext } from "../context/CanvasContext";
import { IconProvider } from "../spritesheets/SpriteProvider";

const SignalPicker: React.FC = () => {
  const {
    isSignalPickerOpen,
    setIsSignalPickerOpen,
    isSignalPickerDragging,
    setIsSignalPickerDragging,
    SignalPickerPosition,
    setSignalPickerPosition,
    // SignalPickerContent,
    // setSignalPickerContent,
    // selectedElement,
    // setSelectedElement,
  } = useCanvasContext();

  const handleOpen = () => {
    setIsSignalPickerDragging(true);
  };

  const handleClose = () => {
    setIsSignalPickerOpen(false);
    setSignalPickerPosition({ x: 600, y: 220 });
  };

  const handleDragStop = (e: DraggableEvent, data: DraggableData) => {
    setSignalPickerPosition({ x: data.x, y: data.y });
    setIsSignalPickerDragging(false);
  };

  const renderItemGroupIcons = () => {
    const groups = ["logistics", "production", "intermediate-products", "military", "fluids", "signals"];
    const icons = groups.map((group) => {
      const icon = IconProvider(group);
      return icon;
    });
    return icons.map((icon, index) => {
      return <button className="button" key={index} style={{ width: "64px", height: "64px", scale: "1", backgroundImage: `url(${icon.spritePath})`, backgroundSize: "96px 64px" }}></button>;
    });
  };

  if (!isSignalPickerOpen) return null;

  return (
    <Draggable handle=".entity-panel-header" position={SignalPickerPosition} onStart={handleOpen} onStop={handleDragStop}>
      <div className="panel" style={{ width: "420px" }}>
        <div className="entity-panel-header" style={{ display: "flex", justifyContent: "space-between", cursor: isSignalPickerDragging ? "grabbing" : "grab" }}>
          <h3>Select a signal</h3>
          <div>
            <button className="entity-panel-close button" onClick={handleClose} style={{ margin: "0", width: "25px", height: "25px", textAlign: "center" }}>
              X
            </button>
          </div>
        </div>
        <div className="flex-column ">
          <div className="panel-inset-lighter mt0 p0">
            <div className="panel-hole m0">{renderItemGroupIcons()}</div>
            <div className="panel-hole m0">2</div>
          </div>
          <div className="panel-inset-lighter mt0">3</div>
        </div>
      </div>
    </Draggable>
  );
};

export default SignalPicker;
