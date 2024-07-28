import React, { useState, useEffect, useCallback } from "react";
import { useDispatch } from "react-redux";
import "../App.css";
import CircuitBoard from "./CircuitBoard";
import { useCanvasContext } from "../context/CanvasContext";
import TopOverlay from "./TopOverlay";
import { v4 as uuidv4 } from "uuid";
import { addElement, Orientation, rotateElement, removeElement, selectElementById } from "../store/circuitSlice";
import { clamp } from "../utils/clamp";
import { SpriteProvider, EntitySprite } from "../spritesheets/SpriteProvider";
import Modal from "react-modal";
import store from "../store/store";
import EntityPanel from "./EntityPanel";
import SignalPicker from "./SignalPicker";
import { KeyStateKeys } from "../hooks/useCanvasState";
import { PlacingElement, Loader, Drawers } from "./OverlayComponents";
import { useDrawers } from "../hooks/useDrawers";
import { DisclaimerModal } from "./DisclaimerModal";

Modal.setAppElement("#root");

const Body: React.FC = () => {
  const dispatch = useDispatch();
  const {
    setDisclaimerIsOpen,
    cursorPosition,
    setCursorPosition,
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
    keyState,
    setKeyState,
    boardRef,
    hoveredElement,
    setHoveredElement,
    selectedElement,
    setSelectedElement,
    setIsEntityPanelOpen,
    panPosition,
    setPanPosition,
    setPanPercentage,
    cursorGridPosition,
    setCursorGridPosition,
    setCursorGridCoordinates,
    gridHeight,
    gridWidth,
    setIsSignalPickerOpen,
  } = useCanvasContext();

  const [startMousePosition, setStartMousePosition] = useState({ x: 0, y: 0 });
  const [startPanPosition, setStartPanPosition] = useState({ x: 0, y: 0 });
  const [removeTimeout, setRemoveTimeout] = useState<NodeJS.Timeout | null>(null);

  const { toggleDrawer, closeLeftDrawer, closeRightDrawer } = useDrawers();

  const dispatchMouseEvent = useCallback(() => {
    const event = new MouseEvent("mousemove", {
      clientX: cursorPosition.x,
      clientY: cursorPosition.y,
    });
    window.dispatchEvent(event);
  }, [cursorPosition]);

  const movePan = useCallback(
    (position: { x: number; y: number }) => {
      const boardElement = boardRef.current;
      if (boardElement) {
        const rect = boardElement.getBoundingClientRect();
        const viewPortSize = {
          width: window.innerWidth - rect.left,
          height: window.innerHeight - rect.top,
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
      }
    },
    [setPanPosition, gridSize, gridWidth, gridHeight, scale, boardRef, setPanPercentage]
  );

  const handleZoom = useCallback(
    (delta: number, cursorX: number, cursorY: number) => {
      const boardElement = boardRef.current;
      if (boardElement) {
        // const rect = boardElement.getBoundingClientRect();
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

        // Update the pan position
        movePan(newPan);
        // Update the scale
        setScale(newScale);
        dispatchMouseEvent();
      }
    },
    [scale, panPosition, movePan, setScale, boardRef, cursorGridPosition, dispatchMouseEvent]
  );

  const handleWheel = useCallback(
    (event: WheelEvent) => {
      event.preventDefault();

      const delta = event.deltaY > 0 ? -scale * 0.0909090909090909 : scale * 0.1; // Adjust the zoom step as needed
      handleZoom(delta, event.clientX, event.clientY);
    },
    [handleZoom, scale]
  );

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
          setStartMousePosition({ x: event.clientX, y: event.clientY });
          break;
        case 2:
          if (isPlacing && elementToPlace) {
            setIsPlacing(false); // Stop placing when right mouse button is pressed
            setPlacingElementRotation(0);
            setElementToPlace(null); // Clear the element to be placed
          } else if (hoveredElement) {
            setRemoveTimeout(
              setTimeout(() => {
                dispatch(removeElement({ id: hoveredElement.id }));
                setRemoveTimeout(null);
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
      setRemoveTimeout,
      setIsSignalPickerOpen,
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
            if (!keyState["Shift" as keyof KeyStateKeys]) {
              setIsPlacing(false);
              setPlacingElementRotation(0);
              setElementToPlace(null);
            }
          }
          break;
        case 1:
          break;
        case 2:
          if (removeTimeout) {
            clearTimeout(removeTimeout);
            setRemoveTimeout(null);
          }
          break;
        default:
          break;
      }
    },
    [isPlacing, elementToPlace, dispatch, placingElementRotation, setElementToPlace, setIsPlacing, keyState, setPlacingElementRotation, setIsPanning, placingPosition, removeTimeout]
  );

  const updatePan = useCallback(() => {
    const step = 32 / scale; // Adjust the step for smoother or slower panning
    let deltaX = 0;
    let deltaY = 0;

    if (keyState.a || keyState["ArrowLeft"]) deltaX += step;
    if (keyState.d || keyState["ArrowRight"]) deltaX -= step;
    if (keyState.w || keyState["ArrowUp"]) deltaY += step;
    if (keyState.s || keyState["ArrowDown"]) deltaY -= step;

    if (deltaX !== 0 || deltaY !== 0) {
      const newPan = { x: panPosition.x + deltaX, y: panPosition.y + deltaY };
      movePan(newPan);
    }
  }, [keyState, panPosition, movePan, scale]);

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
        const deltaX = (event.clientX - startMousePosition.x) * currentScale;
        const deltaY = (event.clientY - startMousePosition.y) * currentScale;
        const newPan = {
          x: startPanPosition.x + deltaX,
          y: startPanPosition.y + deltaY,
        };
        movePan(newPan);
      }
    };

    function handleKeyUp(event: KeyboardEvent) {
      const key = event.key as keyof KeyStateKeys;
      setKeyState({ [key]: false });
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      const key = event.key as keyof KeyStateKeys;
      setKeyState({ [key]: true });
      if (["a", "s", "d", "w", "ArrowLeft", "ArrowDown", "ArrowRight", "ArrowUp"].includes(event.key)) {
        updatePan();
      }
      if (["o"].includes(event.key)) {
        event.preventDefault();
        toggleDrawer("right", "debug");
        return;
      }
      if (["e"].includes(event.key)) {
        event.preventDefault();
        toggleDrawer("left", "toolbox");
        return;
      }
      if (["F1", "h"].includes(event.key)) {
        event.preventDefault();
        toggleDrawer("right", "help");
        return;
      }
      if (["F2"].includes(event.key)) {
        event.preventDefault();
        toggleDrawer("left", "settings");
        return;
      }
      if (["Escape"].includes(event.key)) {
        event.preventDefault();
        closeLeftDrawer();
        closeRightDrawer();
        return;
      }
      if (["\\"].includes(event.key)) {
        setPanPosition({ x: 0, y: 0 });
        setScale(1);
      }
      if (["q"].includes(event.key)) {
        if (isPlacing && elementToPlace) {
          setIsPlacing(false); // Stop placing when 'q' is pressed
          setPlacingElementRotation(0);
          setElementToPlace(null); // Clear the element to be placed
        }
        if (hoveredElement) {
          const elementName = hoveredElement.name;
          const entity: EntitySprite = SpriteProvider(elementName);
          const newElement = {
            ...entity,
            id: "",
            position: hoveredElement.position,
            rotation: hoveredElement.rotation,
            orientation: hoveredElement.orientation,
            size: hoveredElement.gridSize[hoveredElement.orientation],
          };
          setElementToPlace(newElement); // Set the element to be placed on mouse click
          setIsPlacing(true); // Set the placing flag to true
        }
      }
      if (["r"].includes(event.key)) {
        if (isPlacing && elementToPlace) {
          const newRotation = (placingElementRotation + 1) % 4;
          const newOrientation = ["north", "east", "south", "west"][newRotation] as Orientation;
          const newSize = {
            width: elementToPlace.gridSize[newOrientation].width,
            height: elementToPlace.gridSize[newOrientation].height,
          };

          setElementToPlace({
            ...elementToPlace,
            rotation: newRotation,
            orientation: newOrientation,
            size: newSize,
          });
          setPlacingElementRotation(newRotation);
        }
        if (hoveredElement) {
          dispatch(rotateElement({ id: hoveredElement.id }));
          const updatedElement = selectElementById(store.getState(), hoveredElement.id);
          if (updatedElement) {
            setHoveredElement(updatedElement);
            if (selectedElement && selectedElement.id === hoveredElement.id) {
              setSelectedElement(updatedElement);
            }
          }
        }
      }
    };

    const boardElement = boardRef.current;
    window.addEventListener("keydown", handleKeyDown);
    boardElement?.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      boardElement?.removeEventListener("wheel", handleWheel);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [
    toggleDrawer,
    setCursorPosition,
    closeLeftDrawer,
    closeRightDrawer,
    gridSize,
    setPlacingPosition,
    elementToPlace,
    isPlacing,
    setIsPlacing,
    placingElementRotation,
    setPlacingElementRotation,
    setElementToPlace,
    keyState,
    dispatch,
    scale,
    panPosition,
    boardRef,
    setCursorGridPosition,
    movePan,
    isPanning,
    startMousePosition,
    startPanPosition,
    handleWheel,
    setKeyState,
    handleMouseUp,
    handleMouseDown,
    updatePan,
    cursorPosition,
    placingPosition,
    setGhostElementPosition,
    setPanPosition,
    setScale,
    setCursorGridCoordinates,
    hoveredElement,
    setHoveredElement,
    dispatchMouseEvent,
    setDisclaimerIsOpen,
    selectedElement,
    setSelectedElement,
  ]);

  return (
    //
    <div ref={boardRef}>
      <TopOverlay />
      <DisclaimerModal />

      <Drawers />
      <div className="fixed-left-top">
        <CircuitBoard />
      </div>
      <PlacingElement isPlacing={isPlacing} elementToPlace={elementToPlace} scale={scale} />
      {removeTimeout && <Loader cursorPosition={cursorPosition} />}
      <EntityPanel />
      <SignalPicker />
    </div>
    //
  );
};

export default Body;
