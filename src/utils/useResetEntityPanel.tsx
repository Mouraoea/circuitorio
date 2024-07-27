import { useCallback } from "react";
import { useCanvasContext } from "../context/CanvasContext";
import { useResetSignalPicker } from "./useResetSignalPicker";

export const useResetEntityPanel = () => {
  const { isSignalPickerOpen, setIsEntityPanelOpen, setIsEntityPanelDragging, setEntityPanelPosition, setEntityPanelContent } = useCanvasContext();

  const resetSignalPicker = useResetSignalPicker();

  return useCallback(() => {
    setIsEntityPanelOpen(false);
    setEntityPanelPosition({ x: 0, y: 0 });
    setEntityPanelContent(null);
    setIsEntityPanelDragging(false);

    if (isSignalPickerOpen) {
      resetSignalPicker();
    }
  }, [isSignalPickerOpen, setIsEntityPanelOpen, setIsEntityPanelDragging, setEntityPanelPosition, setEntityPanelContent, resetSignalPicker]);
};
