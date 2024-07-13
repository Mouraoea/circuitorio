import React from "react";
// import logo from "./logo.svg";
import CircuitBoard from "./components/CircuitBoard";
import Toolbox from "./components/Toolbox";
import "./App.css";
import { CanvasProvider } from "./context/CanvasContext";

function App() {
  return (
    <CanvasProvider>
      <div className="App" style={{ display: "flex", flexDirection: "column" }}>
        <Toolbox />
        <CircuitBoard />
      </div>
    </CanvasProvider>
  );
}

export default App;
