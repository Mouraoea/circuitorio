// import React, { createContext, useContext, useState, ReactNode } from "react";

// interface ScaleContextProps {
//   scaleRef: number;
//   setScaleRef: (value: number) => void;
// }

// const ScaleContext = createContext<ScaleContextProps | undefined>(undefined);

// export const ScaleProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
//   const [scaleRef, setScaleRef] = useState<number>(1);

//   return <ScaleContext.Provider value={{ scaleRef, setScaleRef }}>{children}</ScaleContext.Provider>;
// };

// export const useScale = () => {
//   const context = useContext(ScaleContext);
//   if (context === undefined) {
//     throw new Error("useScale must be used within a ScaleProvider");
//   }
//   return context;
// };

import React, { createContext, useContext, useState, ReactNode } from "react";

interface CanvasContextProps {
  scale: number;
  setScale: (value: number) => void;
  panPosition: { x: number; y: number };
  setPanPosition: (value: { x: number; y: number }) => void;
  gridSize: number;
  gridHeight: number;
  gridWidth: number;
}

const CanvasContext = createContext<CanvasContextProps | undefined>(undefined);

export const CanvasProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [scale, setScale] = useState<number>(1);
  const [panPosition, setPanPosition] = useState({ x: 0, y: 0 });
  const [gridSize] = useState(32);
  const [gridHeight] = useState(100);
  const [gridWidth] = useState(200);

  return <CanvasContext.Provider value={{ scale, setScale, panPosition, setPanPosition, gridSize, gridHeight, gridWidth }}>{children}</CanvasContext.Provider>;
};

export const useCanvasContext = () => {
  const context = useContext(CanvasContext);
  if (context === undefined) {
    throw new Error("useContext must be used within a Provider");
  }
  return context;
};
