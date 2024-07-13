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
  param2: string;
  setParam2: (value: string) => void;
  param3: boolean;
  setParam3: (value: boolean) => void;
}

const CanvasContext = createContext<CanvasContextProps | undefined>(undefined);

export const CanvasProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [scale, setScale] = useState<number>(1);
  const [param2, setParam2] = useState<string>("default");
  const [param3, setParam3] = useState<boolean>(true);

  return <CanvasContext.Provider value={{ scale, setScale, param2, setParam2, param3, setParam3 }}>{children}</CanvasContext.Provider>;
};

export const useCanvasContext = () => {
  const context = useContext(CanvasContext);
  if (context === undefined) {
    throw new Error("useContext must be used within a Provider");
  }
  return context;
};
