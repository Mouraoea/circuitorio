import { useCallback } from "react";
import { useCanvasContext } from "../context/CanvasContext";

export const useResetSignalPicker = () => {
  const {
    setIsSignalPickerOpen,
    setIsSignalPickerDragging,
    setSignalPickerPosition,
    setSignalPickerContent,
    setSelectedSignalSlot,
    setSignalPickerSelectedGroup,
    setSignalPickerConstantValue,
    setSignalPickerSelectedSignal,
  } = useCanvasContext();

  return useCallback(() => {
    setIsSignalPickerOpen(false);
    setIsSignalPickerDragging(false);
    setSignalPickerPosition({ x: 0, y: -250 });
    setSignalPickerContent(null);
    setSelectedSignalSlot(null);
    setSignalPickerSelectedGroup("logistics");
    setSignalPickerConstantValue(1);
    setSignalPickerSelectedSignal("");
  }, [
    setIsSignalPickerOpen,
    setIsSignalPickerDragging,
    setSignalPickerPosition,
    setSignalPickerContent,
    setSelectedSignalSlot,
    setSignalPickerSelectedGroup,
    setSignalPickerConstantValue,
    setSignalPickerSelectedSignal,
  ]);
};
