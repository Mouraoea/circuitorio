import React, { useCallback } from "react";
import Draggable, { DraggableData, DraggableEvent } from "react-draggable";
import { useDispatch } from "react-redux";
import { IconProvider } from "../spritesheets/SpriteProvider";
import { clamp } from "../utils/clamp";
import { updateElementDetails } from "../store/circuitSlice";
import { useResetSignalPicker } from "../hooks/useResetSignalPicker";
import IconGroups from "../spritesheets/IconGroups.json";
import { useUIContext } from "../context/UIContext";

const groups = ["logistics", "production", "intermediate-products", "military", "fluids", "signals"];

interface SignalGroups {
  [key: string]: string[][];
}

const SignalPicker: React.FC = () => {
  const {
    selectedElement,
    setSelectedElement,
    isSignalPickerOpen,
    isSignalPickerDragging,
    setIsSignalPickerDragging,
    SignalPickerPosition,
    setSignalPickerPosition,
    signalPickerSelectedGroup,
    setSignalPickerSelectedGroup,
    signalPickerSelectedSignal,
    setSignalPickerSelectedSignal,
    signalPickerConstantValue,
    setSignalPickerConstantValue,
    selectedSignalSlot,
  } = useUIContext();

  const dispatch = useDispatch();
  const resetSignalPicker = useResetSignalPicker();
  const iconGroups: SignalGroups = IconGroups as SignalGroups;

  const handleDragStop = (e: DraggableEvent, data: DraggableData) => {
    e.stopPropagation();
    setSignalPickerPosition({ x: data.x, y: data.y });
    setIsSignalPickerDragging(false);
  };

  const handleConstantValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    const clampedValue = clamp(value, -2147483648, 2147483647);
    setSignalPickerConstantValue(clampedValue);
    if (value !== clampedValue) e.target.value = clampedValue.toString();
  };

  const handleSaveChanges = useCallback(() => {
    if (!selectedElement) return;
    const signalSlot = selectedSignalSlot;
    if (!signalSlot) return;
    const signalType = Object.keys(signalSlot)[0];
    const signalId = Object.values(signalSlot)[0];
    const signalKey = signalPickerSelectedSignal;
    const signalValue = signalPickerConstantValue;
    const updatedElement = { ...selectedElement };

    updatedElement.signals = {
      ...(selectedElement.signals || {}),
      [signalType]: {
        ...((selectedElement.signals && selectedElement.signals[(signalType as "input") || "output"]) || {}),
        [signalId]: {
          [signalKey]: signalValue,
        },
      },
    };

    setSelectedElement(updatedElement);
    dispatch(updateElementDetails({ id: updatedElement.id, details: updatedElement }));
  }, [selectedElement, selectedSignalSlot, signalPickerConstantValue, signalPickerSelectedSignal, setSelectedElement, dispatch]);

  const renderGroupButtons = () => {
    return groups.map((group) => {
      const icon = IconProvider(group);
      return (
        <button
          key={group}
          className="button"
          onClick={() => setSignalPickerSelectedGroup(group)}
          style={{ width: "64px", height: "64px", backgroundImage: `url(${icon.spritePath})`, backgroundSize: "96px 64px" }}
        ></button>
      );
    });
  };

  const renderSignalIcons = (itemGroup: string) => {
    return iconGroups[itemGroup].map((itemRow, rowIndex) => (
      <div key={rowIndex} className="flex-row">
        {itemRow.map((item, itemIndex) => {
          const icon = IconProvider(item);
          return (
            <button
              key={itemIndex}
              id={icon.name}
              className={`button-black ${icon.name === signalPickerSelectedSignal ? "active" : ""}`}
              style={{ width: "38px", height: "38px", padding: "0" }}
              onClick={() => setSignalPickerSelectedSignal(icon.name)}
            >
              <div style={icon.style}></div>
            </button>
          );
        })}
      </div>
    ));
  };

  if (!isSignalPickerOpen) return null;

  return (
    <Draggable handle=".entity-panel-header" position={SignalPickerPosition} onStart={() => setIsSignalPickerDragging(true)} onStop={handleDragStop}>
      <div className="panel" style={{ width: "420px" }}>
        <div className="entity-panel-header" style={{ display: "flex", justifyContent: "space-between", cursor: isSignalPickerDragging ? "grabbing" : "grab" }}>
          <h3>Select a signal</h3>
          <button className="entity-panel-close button" onClick={resetSignalPicker} style={{ margin: "0", width: "25px", height: "25px", textAlign: "center" }}>
            X
          </button>
        </div>
        <div className="flex-column ">
          <div className="panel-inset-lighter mt0 p0">
            <div className="panel-hole m0" style={{ height: "70px" }}>
              {renderGroupButtons()}
            </div>
            <div className="panel-hole m0 flex-column" style={{ height: "350px", justifyContent: "start" }}>
              {renderSignalIcons(signalPickerSelectedGroup)}
            </div>
          </div>
          <div className="flex-row panel-inset-lighter mt0" style={{ justifyContent: "space-between", alignContent: "center", height: "60px" }}>
            <input
              type="number"
              inputMode="numeric"
              min={-2147483648}
              max={2147483647}
              defaultValue={1}
              onChange={handleConstantValueChange}
              onKeyDown={(e) => !["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "-", "Backspace", "ArrowLeft", "ArrowRight", "Delete", "Enter"].includes(e.key) && e.preventDefault()}
            />
            <button className="button-green p0" onClick={handleSaveChanges} style={{ width: "40px" }}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="#000000" width="40px" height="40px" viewBox="0 0 32 32">
                <path d="M5 16.577l2.194-2.195 5.486 5.484L24.804 7.743 27 9.937l-14.32 14.32z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </Draggable>
  );
};

export default SignalPicker;
