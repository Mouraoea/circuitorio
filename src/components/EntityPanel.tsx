import React from "react";
import Draggable, { DraggableData, DraggableEvent } from "react-draggable";
import { useCanvasContext } from "../context/CanvasContext";
import { DeciderCombinator, ArithmeticCombinator, ConstantCombinator } from "../entityInterface/EntityInterface";

const EntityPanel: React.FC = () => {
  const {
    isEntityPanelOpen,
    setIsEntityPanelOpen,
    isEntityPanelDragging,
    setIsEntityPanelDragging,
    entityPanelPosition,
    setEntityPanelPosition,
    // entityPanelContent,
    // setEntityPanelContent,
    selectedElement,
    setSelectedElement,
  } = useCanvasContext();

  const handleOpen = () => {
    setIsEntityPanelDragging(true);
  };

  const handleClose = () => {
    setIsEntityPanelOpen(false);

    setEntityPanelPosition({ x: 600, y: 220 });
    setSelectedElement(null);
  };

  const handleDragStop = (e: DraggableEvent, data: DraggableData) => {
    setEntityPanelPosition({ x: data.x, y: data.y });
    setIsEntityPanelDragging(false);
  };

  if (!isEntityPanelOpen) return null;

  return (
    <Draggable handle=".entity-panel-header" position={entityPanelPosition} onStart={handleOpen} onStop={handleDragStop}>
      <div className="panel" style={{ width: "450px" }}>
        <div className="entity-panel-header" style={{ display: "flex", justifyContent: "space-between", cursor: isEntityPanelDragging ? "grabbing" : "grab" }}>
          <h3>{selectedElement?.displayName}</h3>
          <div>
            <button className="entity-panel-close button" onClick={handleClose} style={{ margin: "0", width: "25px", height: "25px", textAlign: "center" }}>
              X
            </button>
          </div>
        </div>
        <DeciderCombinator />
        <ArithmeticCombinator />
        <ConstantCombinator />
      </div>
    </Draggable>
  );
};

export default EntityPanel;
