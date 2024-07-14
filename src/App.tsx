import "./App.css";
import { CanvasProvider } from "./context/CanvasContext";
import Body from "./components/Body";

// Parent holder for context - Do not change this - See Body.tsx instead
function App() {
  return (
    <CanvasProvider>
      <Body />
    </CanvasProvider>
  );
}

export default App;
