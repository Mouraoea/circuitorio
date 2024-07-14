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
import { addElement } from "../store/circuitSlice";
import { clamp } from "../utils/clamp";

const Body: React.FC = () => {
  const dispatch = useDispatch();
  const {
    isLeftDrawerOpen,
    setIsLeftDrawerOpen,
    isRightDrawerOpen,
    setIsRightDrawerOpen,
    setCursorPosition,
    elementToPlace,
    isPlacing,
    isPanning,
    setIsPanning,
    scale,
    setScale,
    setPlacingPosition,
    gridSize,
    setIsPlacing,
    setPlacingElementRotation,
    setElementToPlace,
    placingElementRotation,
    keyState,
    setKeyState,
    boardRef,
    panPosition,
    setPanPosition,
    setCursorGridPosition,
    gridHeight,
    gridWidth,
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

  const getBackgroundImage = () => {
    if (!elementToPlace) {
      return {};
    }
    return {
      backgroundImage: `url("${elementToPlace.sprite}")`,
      backgroundPosition: `${elementToPlace.spriteOffset[0]}px ${elementToPlace.spriteOffset[1]}px`,
      backgroundSize: `${elementToPlace.spriteSize[0]}px ${elementToPlace.spriteSize[1]}px`,
      width: `${elementToPlace.backgroundSize[0]}px`,
      height: `${elementToPlace.backgroundSize[1] + 10}px`,
    };
  };

  const movePan = useCallback(
    (position: { x: number; y: number }) => {
      const boardElement = boardRef.current;
      if (boardElement) {
        const rect = boardElement.getBoundingClientRect();
        const parentRect = boardElement.parentElement?.getBoundingClientRect();
        const viewPortSize = {
          width: ((window.innerWidth - rect.left) / scale + panPosition.x) / gridSize,
          height: ((window.innerHeight - rect.top) / scale + panPosition.y) / gridSize,
        };
        const panMinLimits = {
          x: (viewPortSize.width - gridWidth) * gridSize,
          y: (viewPortSize.height - gridHeight) * gridSize,
        };
        if (parentRect) {
          const panLimits = {
            minX: panMinLimits.x,
            maxX: 0,
            minY: panMinLimits.y,
            maxY: 0,
          };
          setPanPosition({
            x: clamp(position.x, panLimits.minX, panLimits.maxX),
            y: clamp(position.y, panLimits.minY, panLimits.maxY),
          });
        }
      }
    },
    [setPanPosition, panPosition, gridSize, gridWidth, gridHeight, scale, boardRef]
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

      const delta = event.deltaY > 0 ? -scale * 0.1 : scale * 0.101010101010101; // Adjust the zoom step as needed
      handleZoom(delta, event.clientX, event.clientY);
      // Verify the new pan position
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
            position: { x: Math.floor(event.clientX / gridSize) * gridSize, y: Math.floor(event.clientY / gridSize) * gridSize },
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
      }
    },
    [isPlacing, elementToPlace, dispatch, placingElementRotation, gridSize, setElementToPlace, setIsPlacing, keyState, setPlacingElementRotation, setIsPanning]
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
      const boardElement = boardRef.current;
      if (!boardElement) return;
      const rect = boardElement.getBoundingClientRect();
      const cursorX = Math.floor((event.clientX - rect.left - panPosition.x * scale - 1 * scale) / gridSize / scale) + 1;
      const cursorY = Math.floor((event.clientY - rect.top - panPosition.y * scale - 1 * scale) / gridSize / scale) + 1;
      setPlacingPosition({ x: (cursorX - 1) * 32, y: (cursorY - 1) * 32 });
      setCursorGridPosition({ x: cursorX, y: cursorY });
      if (isPanning) {
        const currentScale = scale;
        const deltaX = (event.clientX - startMousePosition.x) / currentScale;
        const deltaY = (event.clientY - startMousePosition.y) / currentScale;
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
      if (["q"].includes(event.key)) {
        setIsPlacing(false); // Stop placing when 'q' is pressed
        setPlacingElementRotation(0); // Reset placingElementRotation after placing
        setElementToPlace(null); // Clear the element to be placed
      } else if (event.key === "r" && isPlacing && elementToPlace) {
        const newRotation = (placingElementRotation + 1) % 4;
        const newSize = [elementToPlace.size[1], elementToPlace.size[0]];
        const newSpriteOffset = [elementToPlace.spriteOffsetRef[newRotation * 2], elementToPlace.spriteOffsetRef[newRotation * 2 + 1]];
        const newBackgroundSize = [elementToPlace.backgroundSizeRef[newRotation * 2], elementToPlace.backgroundSizeRef[newRotation * 2 + 1]];

        setElementToPlace({
          ...elementToPlace,
          rotation: newRotation,
          size: newSize,
          spriteOffset: newSpriteOffset,
          backgroundSize: newBackgroundSize,
        });
        setPlacingElementRotation(newRotation);
        return;
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
  ]);

  return (
    <div ref={boardRef}>
      <LeftDrawer isOpen={isLeftDrawerOpen} onClose={closeLeftDrawer}>
        <DrawerContent content={leftDrawerContent} />
      </LeftDrawer>
      <RightDrawer isOpen={isRightDrawerOpen} onClose={closeRightDrawer}>
        <DrawerContent content={rightDrawerContent} />
      </RightDrawer>
      <CircuitBoard />{" "}
      {isPlacing && elementToPlace && (
        <div
          style={{
            position: "fixed",
            left: 0,
            top: 0,
            opacity: 0.5,
            pointerEvents: "none",
            transform: `translate(-50%, -50%) scale(${scale})`,
            ...getBackgroundImage(),
          }}
        ></div>
      )}
    </div>
  );
};

export default Body;
