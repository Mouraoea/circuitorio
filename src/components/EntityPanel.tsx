import React from "react";
import Draggable, { DraggableData, DraggableEvent } from "react-draggable";
import { DeciderCombinator, ArithmeticCombinator, ConstantCombinator } from "../entityInterface/EntityInterface";
import { useResetEntityPanel } from "../hooks/useResetEntityPanel";
import { useUIContext } from "../context/UIContext";

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
    setSignalPickerSelectedSignal,
    setSignalPickerConstantValue,
  } = useUIContext();

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
    const signal = selectedElement?.signals?.[type]?.[slotId];
    if (signal) {
      setSignalPickerSelectedSignal(Object.keys(signal)[0]);
      setSignalPickerConstantValue(Number(Object.values(signal)[0]));
    }
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
