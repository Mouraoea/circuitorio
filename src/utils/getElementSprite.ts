interface Element {
  position: Position;
  spritePath: string;
  spriteOffset: { [key: string]: { x: number; y: number } };
  orientation: string;
  spriteSize: { [key: string]: { width: number; height: number } };
  origingOffset: { [key: string]: { x: number; y: number } };
  spriteScale: number;
}

interface Position {
  x: number;
  y: number;
}

export const getElementSprite = (element: Element) => {
  const position = element.position;
  return {
    backgroundImage: `url("${element.spritePath}")`,
    backgroundPosition: `${element.spriteOffset[element.orientation].x}px ${element.spriteOffset[element.orientation].y}px`,
    width: `${element.spriteSize[element.orientation].width}px`,
    height: `${element.spriteSize[element.orientation].height}px`,
    left: position.x + element.origingOffset[element.orientation].x * element.spriteScale,
    top: position.y + element.origingOffset[element.orientation].y * element.spriteScale,
  };
};
