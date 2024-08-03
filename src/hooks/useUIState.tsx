import { ReactNode, useState } from "react";
import { CircuitElementProps } from "../store/circuitSlice";

export const useUIState = () => {
  const [elementRemovalTimer, setElementRemovalTimer] = useState<NodeJS.Timeout | null>(null);
  const [disclaimerIsOpen, setDisclaimerIsOpen] = useState(false);
  const [hoveredElement, setHoveredElement] = useState<CircuitElementProps | null>(null);
  const [selectedElement, setSelectedElement] = useState<CircuitElementProps | null>(null);
  const [isDebugMode, setIsDebugMode] = useState(false);
  const [isEntityPanelOpen, setIsEntityPanelOpen] = useState(false);
  const [isEntityPanelDragging, setIsEntityPanelDragging] = useState(false);
  const [entityPanelPosition, setEntityPanelPosition] = useState({ x: 0, y: 0 });
  const [entityPanelContent, setEntityPanelContent] = useState<ReactNode>(null);
  const [isSignalPickerOpen, setIsSignalPickerOpen] = useState(false);
  const [isSignalPickerDragging, setIsSignalPickerDragging] = useState(false);
  const [SignalPickerPosition, setSignalPickerPosition] = useState({ x: 0, y: -250 });
  const [SignalPickerContent, setSignalPickerContent] = useState<ReactNode>(null);
  const [selectedSignalSlot, setSelectedSignalSlot] = useState<{ [key: string]: string } | null>(null);
  const [signalPickerSelectedGroup, setSignalPickerSelectedGroup] = useState("logistics");
  const [signalPickerConstantValue, setSignalPickerConstantValue] = useState(0);
  const [signalPickerSelectedSignal, setSignalPickerSelectedSignal] = useState("");

  return {
    elementRemovalTimer,
    setElementRemovalTimer,
    disclaimerIsOpen,
    setDisclaimerIsOpen,
    hoveredElement,
    setHoveredElement,
    selectedElement,
    setSelectedElement,
    isDebugMode,
    setIsDebugMode,
    isEntityPanelOpen,
    setIsEntityPanelOpen,
    isEntityPanelDragging,
    setIsEntityPanelDragging,
    entityPanelPosition,
    setEntityPanelPosition,
    entityPanelContent,
    setEntityPanelContent,
    isSignalPickerOpen,
    setIsSignalPickerOpen,
    isSignalPickerDragging,
    setIsSignalPickerDragging,
    SignalPickerPosition,
    setSignalPickerPosition,
    SignalPickerContent,
    setSignalPickerContent,
    selectedSignalSlot,
    setSelectedSignalSlot,
    signalPickerSelectedGroup,
    setSignalPickerSelectedGroup,
    signalPickerConstantValue,
    setSignalPickerConstantValue,
    signalPickerSelectedSignal,
    setSignalPickerSelectedSignal,
  };
};
