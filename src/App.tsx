import React from "react";
import "./App.css";
import { CanvasProvider } from "./context/CanvasContext";
import Body from "./components/Body";

// Parent holder for context - Do not change this - See Body.tsx instead
const App: React.FC = () => {
  return (
    <div>
      <CanvasProvider>
        <Body />
      </CanvasProvider>
    </div>
  );
};

export default App;
