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
  param3: boolean;
  setParam3: (value: boolean) => void;
}

const CanvasContext = createContext<CanvasContextProps | undefined>(undefined);

export const CanvasProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [scale, setScale] = useState<number>(1);
  const [panPosition, setPanPosition] = useState({ x: 0, y: 0 });
  const [param3, setParam3] = useState<boolean>(true);

  return <CanvasContext.Provider value={{ scale, setScale, panPosition, setPanPosition, param3, setParam3 }}>{children}</CanvasContext.Provider>;
};

export const useCanvasContext = () => {
  const context = useContext(CanvasContext);
  if (context === undefined) {
    throw new Error("useContext must be used within a Provider");
  }
  return context;
};
