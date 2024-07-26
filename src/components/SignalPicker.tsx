import React from "react";
import Draggable, { DraggableData, DraggableEvent } from "react-draggable";
import { useCanvasContext } from "../context/CanvasContext";
import { IconProvider } from "../spritesheets/SpriteProvider";

interface signalGroups {
  [key: string]: string[][];
}

const SignalPicker: React.FC = () => {
  const {
    isSignalPickerOpen,
    setIsSignalPickerOpen,
    isSignalPickerDragging,
    setIsSignalPickerDragging,
    SignalPickerPosition,
    setSignalPickerPosition,
    // SignalPickerContent,
    // setSignalPickerContent,
    // selectedElement,
    // setSelectedElement,
    signalPickerSelectedGroup,
    setSignalPickerSelectedGroup,
  } = useCanvasContext();

  const handleOpen = () => {
    setIsSignalPickerDragging(true);
  };

  const handleClose = () => {
    setIsSignalPickerOpen(false);
    setSignalPickerPosition({ x: 600, y: 220 });
    setSignalPickerSelectedGroup("logistics");
  };

  const handleDragStop = (e: DraggableEvent, data: DraggableData) => {
    e.stopPropagation();
    setSignalPickerPosition({ x: data.x, y: data.y });
    setIsSignalPickerDragging(false);
  };
  const groups = ["logistics", "production", "intermediate-products", "military", "fluids", "signals"];

  const handleGroupButtonClick = (group: string) => {
    return () => {
      setSignalPickerSelectedGroup(group);
    };
  };

  const renderItemGroupIcons = () => {
    const icons = groups.map((group) => {
      const icon = IconProvider(group);
      return icon;
    });
    return icons.map((icon, index) => {
      return (
        <button
          className="button"
          onClick={handleGroupButtonClick(icon.name)}
          key={index}
          style={{ width: "64px", height: "64px", scale: "1", backgroundImage: `url(${icon.spritePath})`, backgroundSize: "96px 64px" }}
        ></button>
      );
    });
  };

  const iconGroups: signalGroups = {
    logistics: [
      ["wooden-chest", "iron-chest", "steel-chest", "storage-tank"],
      ["transport-belt", "fast-transport-belt", "express-transport-belt", "underground-belt", "fast-underground-belt", "express-underground-belt", "splitter", "fast-splitter", "express-splitter"],
      ["burner-inserter", "inserter", "long-handed-inserter", "fast-inserter", "filter-inserter", "stack-inserter", "stack-filter-inserter"],
      ["small-electric-pole", "medium-electric-pole", "big-electric-pole", "substation", "pipe", "pipe-to-ground", "pump"],
      ["rail", "train-stop", "rail-signal", "rail-chain-signal", "locomotive", "cargo-wagon", "fluid-wagon", "artillery-wagon"],
      ["car", "tank", "spidertron", "spidertron-remote"],
      [
        "logistic-robot",
        "construction-robot",
        "logistic-chest-active-provider",
        "logistic-chest-passive-provider",
        "logistic-chest-storage",
        "logistic-chest-buffer",
        "logistic-chest-requester",
        "roboport",
      ],
      ["small-lamp", "red-wire", "green-wire", "arithmetic-combinator", "decider-combinator", "constant-combinator", "power-switch", "programmable-speaker"],
      ["stone-brick", "concrete", "hazard-concrete", "refined-concrete", "refined-hazard-concrete", "landfill", "cliff-explosives"],
    ],
    production: [
      ["repair-pack", "blueprint", "deconstruction-planner", "upgrade-planner", "blueprint-book"],
      ["boiler", "steam-engine", "steam-turbine", "solar-panel", "accumulator", "nuclear-reactor", "heat-boiler", "heat-pipe"],
      ["burner-mining-drill", "electric-mining-drill", "offshore-pump", "pumpjack"],
      ["stone-furnace", "steel-furnace", "electric-furnace"],
      ["assembling-machine-1", "assembling-machine-2", "assembling-machine-3", "oil-refinery", "chemical-plant", "centrifuge", "lab"],
      [
        "beacon",
        "speed-module",
        "speed-module-2",
        "speed-module-3",
        "effectivity-module",
        "effectivity-module-2",
        "effectivity-module-3",
        "productivity-module",
        "productivity-module-2",
        "productivity-module-3",
      ],
      ["rocket-silo", "satellite"],
    ],
    "intermediate-products": [
      ["wood", "coal", "stone", "iron-ore", "copper-ore", "uranium-ore", "fish"],
      ["iron-plate", "copper-plate", "solid-fuel", "steel-plate", "plastic-bar", "sulfur", "battery", "explosives"],
      ["copper-cable", "iron-stick", "iron-gear-wheel", "electronic-circuit", "advanced-circuit", "processing-unit", "engine-unit", "electric-engine-unit"],
      ["processing-unit", "low-density-structure", "rocket-fuel", "nuclear-fuel", "uranium-235", "uranium-238", "uranium-fuel-cell", "used-up-uranium-fuel-cell"],
      ["automation-science-pack", "logistic-science-pack", "military-science-pack", "chemical-science-pack", "production-science-pack", "utility-science-pack", "space-science-pack"],
    ],
    military: [
      ["pistol", "submachine-gun", "shotgun", "combat-shotgun", "rocket-launcher", "flamethrower", "land-mine"],
      [
        "firearm-magazine",
        "piercing-rounds-magazine",
        "uranium-rounds-magazine",
        "shotgun-shell",
        "piercing-shotgun-shell",
        "cannon-shell",
        "explosive-cannon-shell",
        "uranium-cannon-shell",
        "explosive-uranium-cannon-shell",
        "artillery-shell",
      ],
      ["grenade", "cluster-grenade", "poison-capsule", "slowdown-capsule", "defender", "distractor", "destroyer"],
      ["light-armor", "heavy-armor", "modular-armor", "power-armor", "power-armor-mk2"],
      [
        "solar-panel-equipment",
        "fusion-reactor-equipment",
        "battery-equipment",
        "battery-mk2-equipment",
        "belt-immunity-equipment",
        "exoskeleton-equipment",
        "personal-roboport-equipment",
        "personal-roboport-mk2-equipment",
        "night-vision-equipment",
      ],
      ["energy-shield-equipment", "energy-shield-mk2-equipment", "personal-laser-defense-equipment", "discharge-defense-equipment", "discharge-defense-equipment-controller"],
      ["wall", "gate", "gun-turret", "laser-turret", "flamethrower-turret", "artillery-turret", "radar"],
    ],
    fluids: [["water", "crude-oil", "steam", "heavy-oil", "light-oil", "petroleum-gas", "sulfuric-acid", "lubricant"]],
    signals: [
      ["signal_0", "signal_1", "signal_2", "signal_3", "signal_4", "signal_5", "signal_6", "signal_7", "signal_8", "signal_9"],
      ["signal_A", "signal_B", "signal_C", "signal_D", "signal_E", "signal_F", "signal_G", "signal_H", "signal_I", "signal_J"],
      ["signal_K", "signal_L", "signal_M", "signal_N", "signal_O", "signal_P", "signal_Q", "signal_R", "signal_S", "signal_T"],
      ["signal_U", "signal_V", "signal_W", "signal_X", "signal_Y", "signal_Z"],
      ["signal_red", "signal_green", "signal_blue", "signal_yellow", "signal_pink", "signal_cyan", "signal_white", "signal_grey", "signal_black"],
      ["checked-green", "info", "list-dot"],
    ],
  };

  const renderSignalIcons = (itemGroup: string) => {
    const items = iconGroups[itemGroup];
    return items.map((itemRow, index) => {
      return (
        <div key={index} className="flex-row">
          {itemRow.map((item, index) => {
            const icon = IconProvider(item);
            return (
              <button
                key={index}
                className="button-black"
                style={{
                  width: "38px",
                  height: "38px",
                  padding: "0",
                }}
              >
                <div
                  style={{
                    width: "32px",
                    height: "32px",
                    scale: "0.9",
                    backgroundImage: `url(${icon.spritePath})`,
                    backgroundSize: "62px 32px",
                    backgroundPosition: "0px 0px",
                    backgroundRepeat: "no-repeat",
                    marginLeft: "2px",
                  }}
                ></div>
              </button>
            );
          })}
        </div>
      );
    });
  };

  if (!isSignalPickerOpen) return null;

  return (
    <Draggable
      handle=".entity-panel-header"
      position={SignalPickerPosition}
      onStart={(e) => {
        e.stopPropagation();
        handleOpen();
      }}
      onStop={handleDragStop}
    >
      <div className="panel" style={{ width: "420px" }}>
        <div className="entity-panel-header" style={{ display: "flex", justifyContent: "space-between", cursor: isSignalPickerDragging ? "grabbing" : "grab" }}>
          <h3>Select a signal</h3>
          <div>
            <button className="entity-panel-close button" onClick={handleClose} style={{ margin: "0", width: "25px", height: "25px", textAlign: "center" }}>
              X
            </button>
          </div>
        </div>
        <div className="flex-column ">
          <div className="panel-inset-lighter mt0 p0">
            <div className="panel-hole m0" style={{ height: "70px" }}>
              {renderItemGroupIcons()}
            </div>
            <div className="panel-hole m0 flex-column" style={{ height: "350px", justifyContent: "start" }}>
              {renderSignalIcons(signalPickerSelectedGroup)}
            </div>
          </div>
          <div className="flex-row panel-inset-lighter mt0" style={{ justifyContent: "space-between", alignContent: "center", height: "60px" }}>
            <div className="" onClick={(e) => e.stopPropagation()}>
              <input type="number" inputMode="numeric" onMouseDown={(e) => e.stopPropagation()} onMouseUp={(e) => e.stopPropagation()} />
            </div>
            <div>
              <button className="button-green p0" style={{ width: "40px" }}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="#000000" width="40px" height="40px" viewBox="0 0 32 32">
                  <path d="M5 16.577l2.194-2.195 5.486 5.484L24.804 7.743 27 9.937l-14.32 14.32z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </Draggable>
  );
};

export default SignalPicker;
