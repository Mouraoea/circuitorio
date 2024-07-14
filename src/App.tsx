import "./App.css";
import { CanvasProvider } from "./context/CanvasContext";
import Body from "./components/Body";

function App() {
  return (
    <CanvasProvider>
      <Body />
    </CanvasProvider>
  );
}

export default App;
