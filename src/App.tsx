import "./App.css";
import { CanvasProvider } from "./context/CanvasContext";
import Body from "./components/Body";

// Parent holder for context - Do not change this - See Body.tsx instead
function App() {
  return (
    <div>
      <CanvasProvider>
        <Body />
      </CanvasProvider>
    </div>
  );
}

export default App;
