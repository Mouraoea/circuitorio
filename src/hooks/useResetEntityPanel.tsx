import { useCallback } from "react";
import { useResetSignalPicker } from "./useResetSignalPicker";
import { useUIContext } from "../context/UIContext";

export const useResetEntityPanel = () => {
  const { isSignalPickerOpen, setIsEntityPanelOpen, setIsEntityPanelDragging, setEntityPanelPosition, setEntityPanelContent } = useUIContext();

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
