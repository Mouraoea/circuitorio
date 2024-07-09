export const gridSnap = (coords: { x: number; y: number }, gridSize: number) => {
  return {
    x: Math.round(coords.x / gridSize) * gridSize,
    y: Math.round(coords.y / gridSize) * gridSize,
  };
};
