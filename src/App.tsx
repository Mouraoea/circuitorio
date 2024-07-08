import React from "react";
// import logo from "./logo.svg";
import CircuitBoard from "./components/CircuitBoard";
import Toolbox from "./components/Toolbox";
import "./App.css";

function App() {
  return (
    <div className="App" style={{ display: "flex", flexDirection: "column" }}>
      <Toolbox />
      <CircuitBoard />
    </div>
  );
}

export default App;
