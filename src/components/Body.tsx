import React, { useState, useEffect, useCallback } from "react";
import { useDispatch } from "react-redux";
import "../App.css";
// import logo from "./logo.svg";
import CircuitBoard from "./CircuitBoard";
import LeftDrawer from "./LeftDrawer";
import RightDrawer from "./RightDrawer";
import DrawerContent from "./DrawerContent";
import { useCanvasContext, type KeyStateKeys } from "../context/CanvasContext";
import Toolbox from "./Toolbox";
import Debug from "./Debug";
import Settings from "./Settings";
import Help from "./Help";
import { v4 as uuidv4 } from "uuid";
import { addElement, Orientation, rotateElement } from "../store/circuitSlice";
import { clamp } from "../utils/clamp";
import { getElementSprite } from "../utils/getElementSprite";

const Body: React.FC = () => {
  const dispatch = useDispatch();
  const {
    isLeftDrawerOpen,
    setIsLeftDrawerOpen,
    isRightDrawerOpen,
    setIsRightDrawerOpen,
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
    // ghostElementPosition,
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
    panPosition,
    setPanPosition,
    setPanPercentage,
    setCursorGridPosition,
    setCursorGridCoordinates,
    gridHeight,
    gridWidth,
    zoomCenter,
  } = useCanvasContext();
  const [leftDrawerContent, setLeftDrawerContent] = useState<React.ReactNode>(null);
  const [rightDrawerContent, setRightDrawerContent] = useState<React.ReactNode>(null);
  const [leftOpenDrawerId, setLeftOpenDrawerId] = useState<string | null>(null);
  const [rightOpenDrawerId, setRightOpenDrawerId] = useState<string | null>(null);
  const [startMousePosition, setStartMousePosition] = useState({ x: 0, y: 0 });
  const [startPanPosition, setStartPanPosition] = useState({ x: 0, y: 0 });

  const toggleDrawer = useCallback(
    (side: "left" | "right", content: React.ReactNode, id: string) => {
      if (side === "left") {
        if (leftOpenDrawerId === id) {
          setIsLeftDrawerOpen(false);
          setLeftOpenDrawerId(null);
          return;
        } else if (isLeftDrawerOpen && leftOpenDrawerId !== id) {
          setLeftDrawerContent(content);
          setLeftOpenDrawerId(id);
          return;
        } else if (isLeftDrawerOpen) {
          setIsLeftDrawerOpen(false);
          setLeftDrawerContent(null);
          setLeftOpenDrawerId(null);
        } else {
          setLeftDrawerContent(content);
          setLeftOpenDrawerId(id);
          setIsLeftDrawerOpen(true);
        }
      } else {
        if (rightOpenDrawerId === id) {
          setIsRightDrawerOpen(false);
          setRightOpenDrawerId(null);
          return;
        } else if (isRightDrawerOpen && rightOpenDrawerId !== id) {
          setRightDrawerContent(content);
          setRightOpenDrawerId(id);
          return;
        } else if (isRightDrawerOpen) {
          setIsRightDrawerOpen(false);
          setRightDrawerContent(null);
          setRightOpenDrawerId(null);
        } else {
          setRightDrawerContent(content);
          setRightOpenDrawerId(id);
          setIsRightDrawerOpen(true);
        }
      }
    },
    [
      isLeftDrawerOpen,
      isRightDrawerOpen,
      setIsLeftDrawerOpen,
      setIsRightDrawerOpen,
      setLeftDrawerContent,
      setRightDrawerContent,
      setLeftOpenDrawerId,
      setRightOpenDrawerId,
      leftOpenDrawerId,
      rightOpenDrawerId,
    ]
  );

  const closeLeftDrawer = useCallback(() => {
    setIsLeftDrawerOpen(false);
    setLeftDrawerContent(null);
    setLeftOpenDrawerId(null);
  }, [setIsLeftDrawerOpen]);

  const closeRightDrawer = useCallback(() => {
    setIsRightDrawerOpen(false);
    setRightDrawerContent(null);
    setRightOpenDrawerId(null);
  }, [setIsRightDrawerOpen]);

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
        const rect = boardElement.getBoundingClientRect();
        const newScale = clamp(scale + delta, 0.5, 5);
        const deltaScale = newScale - scale;

        const cursorOffset = {
          x: (cursorX - rect.left) / scale + panPosition.x,
          y: (cursorY - rect.top) / scale + panPosition.y,
        };

        const offsetByCursor = {
          x: cursorOffset.x * deltaScale,
          y: cursorOffset.y * deltaScale,
        };

        const newPan = {
          x: panPosition.x - offsetByCursor.x / newScale,
          y: panPosition.y - offsetByCursor.y / newScale,
        };

        // Update the pan position
        movePan(newPan);
        // Update the scale
        setScale(newScale);
      }
    },
    [scale, panPosition, movePan, setScale, boardRef]
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
      if (event.button === 1) {
        event.preventDefault();
        setIsPanning(true);
        setStartPanPosition(panPosition);
        setStartMousePosition({ x: event.clientX, y: event.clientY });
      }
    },
    [panPosition, setIsPanning]
  );

  const handleMouseUp = useCallback(
    (event: MouseEvent) => {
      setIsPanning(false);
      if (event.button === 0) {
        if (isPlacing && elementToPlace) {
          const newElement = {
            ...elementToPlace,
            position: placingPosition,
            placingElementRotation,
            id: uuidv4(),
          };
          console.log(newElement);
          dispatch(addElement(newElement));
          if (!keyState["Shift" as keyof KeyStateKeys]) {
            setIsPlacing(false);
            setPlacingElementRotation(0);
            setElementToPlace(null);
          }
        }
      }
    },
    [isPlacing, elementToPlace, dispatch, placingElementRotation, setElementToPlace, setIsPlacing, keyState, setPlacingElementRotation, setIsPanning, placingPosition]
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
        toggleDrawer("right", <Debug />, "debug");
        return;
      }
      if (["e"].includes(event.key)) {
        event.preventDefault();
        toggleDrawer("left", <Toolbox closeLeftDrawer={closeLeftDrawer} />, "toolbox");
        return;
      }
      if (["F1", "h"].includes(event.key)) {
        event.preventDefault();
        toggleDrawer("right", <Help />, "help");
        return;
      }
      if (["F2"].includes(event.key)) {
        event.preventDefault();
        toggleDrawer("left", <Settings />, "settings");
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
        setIsPlacing(false); // Stop placing when 'q' is pressed
        setPlacingElementRotation(0); // Reset placingElementRotation after placing
        setElementToPlace(null); // Clear the element to be placed
      }
      if (["r"].includes(event.key)) {
        if (isPlacing && elementToPlace) {
          const newRotation = (placingElementRotation + 1) % 4;
          const newOrientation = ["north", "east", "south", "west"][newRotation] as Orientation;
          const newSize = {
            width: elementToPlace.gridSize[newOrientation].width * gridSize,
            height: elementToPlace.gridSize[newOrientation].height * gridSize,
          };

          setElementToPlace({
            ...elementToPlace,
            rotation: newRotation,
            orientation: newOrientation,
            size: newSize,
          });
          setPlacingElementRotation(newRotation);
          return;
        }
        if (hoveredElement) {
          dispatch(rotateElement({ id: hoveredElement.id }));
          return;
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
  ]);

  return (
    <div ref={boardRef}>
      <LeftDrawer isOpen2={isLeftDrawerOpen} onClose={closeLeftDrawer}>
        <DrawerContent content={leftDrawerContent} />
      </LeftDrawer>
      <RightDrawer isOpen3={isRightDrawerOpen} onClose={closeRightDrawer}>
        <DrawerContent content={rightDrawerContent} />
      </RightDrawer>
      <div style={{ position: "fixed", left: 0, top: 0 }}>
        <CircuitBoard />
      </div>
      {isPlacing && elementToPlace && (
        <div
          style={{
            position: "fixed",
            opacity: 0.5,
            pointerEvents: "none",
            transformOrigin: `${-elementToPlace.origingOffset[elementToPlace.orientation].x}px ${-elementToPlace.origingOffset[elementToPlace.orientation].y}px`,
            transform: `scale(${scale * elementToPlace.spriteScale})`,
            ...getElementSprite(elementToPlace),
          }}
        ></div>
      )}
      {zoomCenter && (
        <div
          style={{
            position: "relative",
            left: zoomCenter.x,
            top: zoomCenter.y,
            width: "10px",
            height: "10px",
            backgroundColor: "red",
            transform: "translate(-50%, -50%)",
          }}
        >
          X
        </div>
      )}
    </div>
  );
};

export default Body;
