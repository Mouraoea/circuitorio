export const getGridCoordinates = (position: { x: number; y: number }) => ({
  x: Math.floor(position.x / 32),
  y: Math.floor(position.y / 32),
});
