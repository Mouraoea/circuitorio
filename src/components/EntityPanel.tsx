import React from "react";
import Draggable, { DraggableData, DraggableEvent } from "react-draggable";
import { useCanvasContext } from "../context/CanvasContext";
import { DeciderCombinator, ArithmeticCombinator, ConstantCombinator } from "../entityInterface/EntityInterface";
import { useResetEntityPanel } from "../utils/useResetEntityPanel";

const EntityPanel: React.FC = () => {
  const {
    isEntityPanelOpen,
    isEntityPanelDragging,
    setIsEntityPanelDragging,
    entityPanelPosition,
    setEntityPanelPosition,
    selectedElement,
    setIsSignalPickerOpen,
    setSignalPickerPosition,
    setSelectedSignalSlot,
  } = useCanvasContext();

  const resetEntityPanel = useResetEntityPanel();

  const handleClose = () => {
    resetEntityPanel();
  };

  const handleDragStop = (e: DraggableEvent, data: DraggableData) => {
    setEntityPanelPosition({ x: data.x, y: data.y });
    setIsEntityPanelDragging(false);
  };

  const handleOpenSignalPicker = (slotId: string, type: "input" | "output") => {
    setIsSignalPickerOpen(true);
    setSignalPickerPosition({ x: 0, y: -250 });
    setSelectedSignalSlot({ [type]: slotId });
  };

  if (!isEntityPanelOpen) return null;

  return (
    <Draggable handle=".entity-panel-header" position={entityPanelPosition} onStart={() => setIsEntityPanelDragging(true)} onStop={handleDragStop}>
      <div className="panel" style={{ width: "450px" }}>
        <div className="entity-panel-header" style={{ display: "flex", justifyContent: "space-between", cursor: isEntityPanelDragging ? "grabbing" : "grab" }}>
          <h3>{selectedElement?.displayName}</h3>
          <button className="entity-panel-close button" onClick={handleClose} style={{ margin: 0, width: 25, height: 25, textAlign: "center" }}>
            X
          </button>
        </div>
        <DeciderCombinator openSignalPicker={handleOpenSignalPicker} />
        <ArithmeticCombinator openSignalPicker={handleOpenSignalPicker} />
        <ConstantCombinator openSignalPicker={handleOpenSignalPicker} />
      </div>
    </Draggable>
  );
};

export default EntityPanel;
