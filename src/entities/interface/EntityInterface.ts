import DeciderCombinator from "./DeciderCombinator";
import ArithmeticCombinator from "./ArithmeticCombinator";
import ConstantCombinator from "./ConstantCombinator";

export { DeciderCombinator, ArithmeticCombinator, ConstantCombinator };

export interface EntityInterfaceProps {
  openSignalPicker: (slotId: string, type: "input" | "output") => void;
}
