import React from "react";
import "./App.css";
import { CanvasProvider } from "./context/CanvasContext";
import { DrawerProvider } from "./context/DrawerContext";
import { InputProvider } from "./context/InputContext";
import { UIProvider } from "./context/UIContext";
import Body from "./components/Body";

// Parent holder for context - Do not change this - See Body.tsx instead
const App: React.FC = () => {
  return (
    <div>
      <UIProvider>
        <CanvasProvider>
          <DrawerProvider>
            <InputProvider>
              <Body />
            </InputProvider>
          </DrawerProvider>
        </CanvasProvider>
      </UIProvider>
    </div>
  );
};

export default App;
