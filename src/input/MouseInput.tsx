import React, { useEffect, useCallback } from "react";
import { useDispatch } from "react-redux";
import { useCanvasContext } from "../context/CanvasContext";
import { v4 as uuidv4 } from "uuid";
import { addElement, removeElement } from "../store/circuitSlice";
import { clamp } from "../utils/clamp";
import { useInputContext } from "../context/InputContext";
import { useUIContext } from "../context/UIContext";
import { useResetEntityPanel } from "../hooks/useResetEntityPanel";

const MouseInput: React.FC = () => {
  const dispatch = useDispatch();
  const {
    elementToPlace,
    isPlacing,
    isPanning,
    setIsPanning,
    scale,
    setScale,
    placingPosition,
    setPlacingPosition,
    setGhostElementPosition,
    gridSize,
    setIsPlacing,
    setPlacingElementRotation,
    setElementToPlace,
    placingElementRotation,
    boardRef,
    panPosition,
    setPanPosition,
    setPanPercentage,
    gridHeight,
    gridWidth,
    startPanPosition,
    setStartPanPosition,
  } = useCanvasContext();

  const { hoveredElement, setHoveredElement, selectedElement, setSelectedElement, setIsEntityPanelOpen, setIsSignalPickerOpen } = useUIContext();

  const { cursorPosition, setCursorPosition, keyState, cursorGridPosition, setCursorGridPosition, setCursorGridCoordinates, startCursorPosition, setStartCursorPosition, isCanvasFocused } =
    useInputContext();

  const { elementRemovalTimer, setElementRemovalTimer } = useUIContext();

  const dispatchMouseEvent = useCallback(() => {
    const event = new MouseEvent("mousemove", {
      clientX: cursorPosition.x,
      clientY: cursorPosition.y,
    });
    window.dispatchEvent(event);
  }, [cursorPosition]);

  const movePan = useCallback(
    (position: { x: number; y: number }) => {
      const viewPortSize = {
        width: window.innerWidth,
        height: window.innerHeight,
      };
      const panMinLimits = {
        x: viewPortSize.width - gridWidth * gridSize * scale,
        y: viewPortSize.height - gridHeight * gridSize * scale,
      };
      const panLimits = {
        minX: panMinLimits.x,
        maxX: 0,
        minY: panMinLimits.y,
        maxY: 0,
      };
      const newPanPosition = {
        x: clamp(position.x, panLimits.minX, panLimits.maxX),
        y: clamp(position.y, panLimits.minY, panLimits.maxY),
      };
      setPanPosition({
        x: Math.round(newPanPosition.x * 100) / 100,
        y: Math.round(newPanPosition.y * 100) / 100,
      });
      const panPercentage = {
        x: (1 - (newPanPosition.x - panLimits.minX) / (panLimits.maxX - panLimits.minX)) * 100,
        y: (1 - (newPanPosition.y - panLimits.minY) / (panLimits.maxY - panLimits.minY)) * 100,
      };
      setPanPercentage({
        x: Math.round(panPercentage.x * 100) / 100,
        y: Math.round(panPercentage.y * 100) / 100,
      });
    },
    [setPanPosition, gridSize, gridWidth, gridHeight, scale, setPanPercentage]
  );

  const handleZoom = useCallback(
    (delta: number) => {
      const newScale = clamp(scale + delta, 0.5, 5);
      const deltaScale = newScale - scale;

      const cursorOffset = {
        x: cursorGridPosition.x + panPosition.x / scale,
        y: cursorGridPosition.y + panPosition.y / scale,
      };

      const offsetByCursor = {
        x: cursorOffset.x * deltaScale,
        y: cursorOffset.y * deltaScale,
      };

      const offsetByPan = {
        x: (panPosition.x * deltaScale) / scale,
        y: (panPosition.y * deltaScale) / scale,
      };

      const newPan = {
        x: panPosition.x + offsetByPan.x - offsetByCursor.x,
        y: panPosition.y + offsetByPan.y - offsetByCursor.y,
      };

      movePan(newPan);
      setScale(newScale);
      dispatchMouseEvent();
    },
    [scale, panPosition, movePan, setScale, cursorGridPosition, dispatchMouseEvent]
  );

  const handleWheel = useCallback(
    (event: WheelEvent) => {
      if (isCanvasFocused) {
        event.preventDefault();
        const delta = event.deltaY > 0 ? -scale * 0.0909090909090909 : scale * 0.1;
        handleZoom(delta);
      }
    },
    [handleZoom, scale, isCanvasFocused]
  );

  const resetEntityPanel = useResetEntityPanel();

  const handleMouseDown = useCallback(
    (event: MouseEvent) => {
      event.preventDefault();
      switch (event.button) {
        case 0:
          if (hoveredElement) {
            setSelectedElement(hoveredElement);
            setIsEntityPanelOpen(true);
            setIsSignalPickerOpen(false);
          }
          break;
        case 1:
          setIsPanning(true);
          setStartPanPosition(panPosition);
          setStartCursorPosition({ x: event.clientX, y: event.clientY });
          break;
        case 2:
          if (isPlacing && elementToPlace) {
            setIsPlacing(false);
            setPlacingElementRotation(0);
            setElementToPlace(null);
          } else if (hoveredElement) {
            setElementRemovalTimer(
              setTimeout(() => {
                dispatch(removeElement({ id: hoveredElement.id }));
                setElementRemovalTimer(null);
                resetEntityPanel();
              }, 500)
            );
          }
          break;
        default:
          break;
      }
    },
    [
      panPosition,
      setIsPanning,
      dispatch,
      isPlacing,
      elementToPlace,
      hoveredElement,
      setIsPlacing,
      setPlacingElementRotation,
      setElementToPlace,
      setSelectedElement,
      setIsEntityPanelOpen,
      setElementRemovalTimer,
      setIsSignalPickerOpen,
      setStartCursorPosition,
      setStartPanPosition,
      resetEntityPanel,
    ]
  );

  const handleMouseUp = useCallback(
    (event: MouseEvent) => {
      setIsPanning(false);
      switch (event.button) {
        case 0:
          if (isPlacing && elementToPlace) {
            const newElement = {
              ...elementToPlace,
              position: placingPosition,
              placingElementRotation,
              id: uuidv4(),
            };
            dispatch(addElement(newElement));
            if (!keyState["Shift" as keyof typeof keyState]) {
              setIsPlacing(false);
              setPlacingElementRotation(0);
              setElementToPlace(null);
            }
          }
          break;
        case 1:
          break;
        case 2:
          if (elementRemovalTimer) {
            clearTimeout(elementRemovalTimer);
            setElementRemovalTimer(null);
          }
          break;
        default:
          break;
      }
    },
    [
      isPlacing,
      elementToPlace,
      dispatch,
      placingElementRotation,
      setElementToPlace,
      setIsPlacing,
      keyState,
      setPlacingElementRotation,
      setIsPanning,
      placingPosition,
      elementRemovalTimer,
      setElementRemovalTimer,
    ]
  );

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      setCursorPosition({ x: event.clientX, y: event.clientY });

      const cursorGridPosition = {
        x: Math.floor(((event.clientX - panPosition.x) / scale) * 100) / 100,
        y: Math.floor(((event.clientY - panPosition.y) / scale) * 100) / 100,
      };
      setCursorGridPosition(cursorGridPosition);

      const cursorGridCoordinates = {
        x: Math.floor((cursorGridPosition.x - 1) / gridSize) + 1,
        y: Math.floor((cursorGridPosition.y - 1) / gridSize) + 1,
      };
      setCursorGridCoordinates(cursorGridCoordinates);

      const placingPosition = {
        x: Math.floor((cursorGridCoordinates.x - 1) * gridSize),
        y: Math.floor((cursorGridCoordinates.y - 1) * gridSize),
      };
      setPlacingPosition(placingPosition);

      if (isPlacing && elementToPlace) {
        const newPosition = {
          x: placingPosition.x * scale + panPosition.x,
          y: placingPosition.y * scale + panPosition.y,
        };
        setGhostElementPosition(newPosition);
        elementToPlace.position = newPosition;
      }
      if (isPanning) {
        const currentScale = scale;
        const deltaX = (event.clientX - startCursorPosition.x) * currentScale;
        const deltaY = (event.clientY - startCursorPosition.y) * currentScale;
        const newPan = {
          x: startPanPosition.x + deltaX,
          y: startPanPosition.y + deltaY,
        };
        movePan(newPan);
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [
    handleWheel,
    setCursorPosition,
    gridSize,
    setPlacingPosition,
    elementToPlace,
    isPlacing,
    setIsPlacing,
    placingElementRotation,
    setPlacingElementRotation,
    setElementToPlace,
    keyState,
    scale,
    panPosition,
    boardRef,
    setCursorGridPosition,
    movePan,
    isPanning,
    startCursorPosition,
    startPanPosition,
    cursorPosition,
    placingPosition,
    setGhostElementPosition,
    setPanPosition,
    setScale,
    setCursorGridCoordinates,
    hoveredElement,
    setHoveredElement,
    dispatchMouseEvent,
    selectedElement,
    setSelectedElement,
    handleMouseDown,
    handleMouseUp,
  ]);

  return null;
};

export default MouseInput;
