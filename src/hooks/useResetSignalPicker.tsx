import { useCallback } from "react";
import { useUIContext } from "../context/UIContext";

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
  } = useUIContext();

  return useCallback(() => {
    setIsSignalPickerOpen(false);
    setIsSignalPickerDragging(false);
    setSignalPickerPosition({ x: 0, y: -250 });
    setSignalPickerContent(null);
    setSelectedSignalSlot(null);
    setSignalPickerSelectedGroup("logistics");
    setSignalPickerConstantValue(0);
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
