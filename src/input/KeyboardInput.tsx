import React, { useEffect, useCallback } from "react";
import { useDispatch } from "react-redux";
import { useCanvasContext } from "../context/CanvasContext";
import { CircuitElementProps, Orientation, rotateElement, selectElementById } from "../store/circuitSlice";
import store from "../store/store";
import { useDrawers } from "../hooks/useDrawers";
import { useInputContext } from "../context/InputContext";
import { useUIContext } from "../context/UIContext";
import defaultEntitySettings from "../entities/settings/defaultEntitySettings";

const KeyboardInput: React.FC = () => {
  const dispatch = useDispatch();
  const { elementToPlace, isPlacing, setIsPlacing, setPlacingElementRotation, setElementToPlace, boardRef, setPanPosition, setScale, scale } = useCanvasContext();

  const { hoveredElement, setHoveredElement, selectedElement, setSelectedElement } = useUIContext();

  const { keyState, setKeyState } = useInputContext();

  const { toggleDrawer, closeLeftDrawer, closeRightDrawer } = useDrawers();

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      const key = event.key as keyof typeof keyState;
      setKeyState({ [key]: true });
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
          setIsPlacing(false);
          setPlacingElementRotation(0);
          setElementToPlace(null);
        }
        if (hoveredElement) {
          const elementName = hoveredElement.name;
          let newElement: CircuitElementProps = defaultEntitySettings(elementName);
          newElement = {
            ...newElement,
            position: { x: hoveredElement.position.x * scale, y: hoveredElement.position.y * scale },
            rotation: hoveredElement.rotation,
            orientation: hoveredElement.orientation,
            size: hoveredElement.size,
            gridSize: hoveredElement.gridSize,
          };
          setElementToPlace(newElement);
          setIsPlacing(true);
        }
      }
      if (["r"].includes(event.key)) {
        if (isPlacing && elementToPlace) {
          const newRotation = (elementToPlace.rotation + 1) % 4;
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
    },
    [
      scale,
      toggleDrawer,
      setKeyState,
      closeLeftDrawer,
      closeRightDrawer,
      setPanPosition,
      setScale,
      setIsPlacing,
      setPlacingElementRotation,
      setElementToPlace,
      dispatch,
      isPlacing,
      elementToPlace,
      hoveredElement,
      selectedElement,
      setHoveredElement,
      setSelectedElement,
    ]
  );

  useEffect(() => {
    function handleKeyUp(event: KeyboardEvent) {
      const key = event.key as keyof typeof keyState;
      setKeyState({ [key]: false });
    }

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [handleKeyDown, setKeyState, boardRef, keyState]);

  return null;
};

export default KeyboardInput;
