export interface EntitySprite {
  name: string;
  displayName: string;
  type: string;
  gridSize: {
    // Size of the entity, in grid units
    north: { width: number; height: number };
    east: { width: number; height: number };
    south: { width: number; height: number };
    west: { width: number; height: number };
  };
  origingOffset: {
    // Offset from the grid position to the 0,0 point of the sprite, in pixels
    north: { x: number; y: number };
    east: { x: number; y: number };
    south: { x: number; y: number };
    west: { x: number; y: number };
  };
  spriteScale: number; // Scale of the sprite
  spritePath: string; // Path to the sprite
  spriteOffset: {
    // Offset from the 0,0 point of the sprite to the 0,0 of the correct orientation, in pixels
    north: { x: number; y: number };
    east: { x: number; y: number };
    south: { x: number; y: number };
    west: { x: number; y: number };
  };
  spriteSize: {
    // Size of the sprite, in pixels
    north: { width: number; height: number };
    east: { width: number; height: number };
    south: { width: number; height: number };
    west: { width: number; height: number };
  };
}

export interface iconSprite {
  name: string;
  displayName: string;
  type: string;
  originOffset: {
    x: number;
    y: number;
  };
  spritePath: string;
  spriteOffset: {
    x: number;
    y: number;
  };
  spriteScale: number;
  spriteSize: {
    width: number;
    height: number;
  };
}

const getBasePath = () => {
  if (process.env.NODE_ENV === "production") {
    return "./img/";
  } else {
    return "./circuitorio/img/";
  }
};

const basePath = getBasePath();

const icons: { [key: string]: iconSprite } = {
  effects: {
    name: "effects",
    displayName: "Effects",
    type: "item-group",
    originOffset: { x: 0, y: 0 },
    spriteOffset: { x: 0, y: 0 },
    spritePath: `${basePath}base/graphics/item-group/effects.png`,
    spriteScale: 1,
    spriteSize: { width: 128, height: 128 },
  },
  fluids: {
    name: "fluids",
    displayName: "Fluids",
    type: "item-group",
    originOffset: { x: 0, y: 0 },
    spriteOffset: { x: 0, y: 0 },
    spritePath: `${basePath}base/graphics/item-group/fluids.png`,
    spriteScale: 1,
    spriteSize: { width: 128, height: 128 },
  },
  "intermediate-products": {
    name: "intermediate-products",
    displayName: "Intermediate Products",
    type: "item-group",
    originOffset: { x: 0, y: 0 },
    spriteOffset: { x: 0, y: 0 },
    spritePath: `${basePath}base/graphics/item-group/intermediate-products.png`,
    spriteScale: 1,
    spriteSize: { width: 128, height: 128 },
  },
  logistics: {
    name: "logistics",
    displayName: "Logistics",
    type: "item-group",
    originOffset: { x: 0, y: 0 },
    spriteOffset: { x: 0, y: 0 },
    spritePath: `${basePath}base/graphics/item-group/logistics.png`,
    spriteScale: 1,
    spriteSize: { width: 128, height: 128 },
  },
  military: {
    name: "military",
    displayName: "Military",
    type: "item-group",
    originOffset: { x: 0, y: 0 },
    spriteOffset: { x: 0, y: 0 },
    spritePath: `${basePath}base/graphics/item-group/military.png`,
    spriteScale: 1,
    spriteSize: { width: 128, height: 128 },
  },
  production: {
    name: "production",
    displayName: "Production",
    type: "item-group",
    originOffset: { x: 0, y: 0 },
    spriteOffset: { x: 0, y: 0 },
    spritePath: `${basePath}base/graphics/item-group/production.png`,
    spriteScale: 1,
    spriteSize: { width: 128, height: 128 },
  },
  signals: {
    name: "signals",
    displayName: "Signals",
    type: "item-group",
    originOffset: { x: 0, y: 0 },
    spriteOffset: { x: 0, y: 0 },
    spritePath: `${basePath}base/graphics/item-group/signals.png`,
    spriteScale: 1,
    spriteSize: { width: 128, height: 128 },
  },
};

const entities: { [key: string]: EntitySprite } = {
  "arithmetic-combinator": {
    name: "arithmetic-combinator",
    displayName: "Arithmetic Combinator",
    type: "entity",
    gridSize: {
      north: { width: 1, height: 2 },
      east: { width: 2, height: 1 },
      south: { width: 1, height: 2 },
      west: { width: 2, height: 1 },
    },
    origingOffset: { north: { x: -6, y: 9 }, east: { x: 12, y: -13 }, south: { x: -5, y: 11 }, west: { x: 13, y: -13 } },
    spriteOffset: {
      north: { x: -34, y: 0 },
      east: { x: -160, y: 0 },
      south: { x: -322, y: 0 },
      west: { x: -454, y: 0 },
    },
    spritePath: `${basePath}base/graphics/hr-arithmetic-combinator.png`,
    spriteScale: 0.5,
    spriteSize: {
      north: { width: 77, height: 109 },
      east: { width: 105, height: 89 },
      south: { width: 79, height: 102 },
      west: { width: 107, height: 91 },
    },
  },
  "decider-combinator": {
    name: "decider-combinator",
    displayName: "Decider Combinator",
    type: "entity",
    gridSize: {
      north: { width: 1, height: 2 },
      east: { width: 2, height: 1 },
      south: { width: 1, height: 2 },
      west: { width: 2, height: 1 },
    },
    origingOffset: { north: { x: -11, y: 9 }, east: { x: 5, y: -12 }, south: { x: -11, y: 11 }, west: { x: 12, y: -13 } },
    spriteOffset: {
      north: { x: -35, y: -5 },
      east: { x: -172, y: -2 },
      south: { x: -346, y: -10 },
      west: { x: -497, y: 0 },
    },
    spritePath: `${basePath}base/graphics/hr-decider-combinator.png`,
    spriteScale: 0.5,
    spriteSize: {
      north: { width: 86, height: 111 },
      east: { width: 118, height: 91 },
      south: { width: 87, height: 103 },
      west: { width: 117, height: 94 },
    },
  },
  "constant-combinator": {
    name: "constant-combinator",
    displayName: "Constant Combinator",
    type: "entity",
    gridSize: {
      north: { width: 1, height: 1 },
      east: { width: 1, height: 1 },
      south: { width: 1, height: 1 },
      west: { width: 1, height: 1 },
    },
    origingOffset: { north: { x: -8, y: -2 }, east: { x: -11, y: -8 }, south: { x: -9, y: -4 }, west: { x: -8, y: -6 } },
    spriteOffset: {
      north: { x: -16, y: -4 },
      east: { x: -127, y: 0 },
      south: { x: -245, y: -11 },
      west: { x: -359, y: 0 },
    },
    spritePath: `${basePath}base/graphics/hr-constant-combinator.png`,
    spriteScale: 0.5,
    spriteSize: {
      north: { width: 82, height: 75 },
      east: { width: 90, height: 85 },
      south: { width: 82, height: 74 },
      west: { width: 82, height: 83 },
    },
  },
};

export const SpriteProvider = (entityId: string): EntitySprite => {
  const entity = entities[entityId];
  return entity;
};

export const IconProvider = (iconId: string): iconSprite => {
  const icon = icons[iconId];
  return icon;
};
