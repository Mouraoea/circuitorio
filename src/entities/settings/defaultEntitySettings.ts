import { CircuitElementProps, Orientation, Signals } from "../../store/circuitSlice";
import { EntitySprite, SpriteProvider } from "../spritesheets/SpriteProvider";

const defaultEntitySettings = (element: string): CircuitElementProps => {
  const entitySprite: EntitySprite = SpriteProvider(element);
  const signals: Signals = getDefaultSignals(element);

  const entity: CircuitElementProps = {
    ...entitySprite,
    id: "",
    position: { x: 0, y: 0 },
    rotation: 0,
    orientation: "north" as Orientation,
    size: entitySprite.gridSize.north,
    signals,
  };

  return entity;
};

export default defaultEntitySettings;

const getDefaultSignals = (element: string): Signals => {
  switch (element) {
    case "decider-combinator":
      return {
        operator: ">",
      } as Signals;
    case "arithmetic-combinator":
      return {
        operator: "+",
      } as Signals;
    default:
      return {};
  }
};
