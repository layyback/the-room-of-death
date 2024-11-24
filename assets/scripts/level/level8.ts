import { DoorState, EnemyType, PlayerState, TileType } from "../utils/enum";

export const mapInfo = [
  [
    {
      src: 16,
      type: TileType.WALL_LEFT_TOP
    },
    {
      src: 5,
      type: TileType.WALL_COLUMN
    },
    {
      src: 23,
      type: TileType.WALL_LEFT_BOTTOM
    },
    {
      src: 18,
      type: TileType.CLIFF_LEFT
    },
    {
      src: null,
      type: null
    },
    {
      src: null,
      type: null
    },
    {
      src: null,
      type: null
    },
    {
      src: null,
      type: null
    },
    {
      src: null,
      type: null
    }
  ],
  [
    {
      src: 9,
      type: TileType.WALL_ROW
    },
    {
      src: 1,
      type: TileType.FLOOR
    },
    {
      src: 17,
      type: TileType.CLIFF_CENTER
    },
    {
      src: 1,
      type: TileType.FLOOR
    },
    {
      src: 1,
      type: TileType.FLOOR
    },
    {
      src: 17,
      type: TileType.CLIFF_CENTER
    },
    {
      src: null,
      type: null
    },
    {
      src: 1,
      type: TileType.FLOOR
    },
    {
      src: 17,
      type: TileType.CLIFF_CENTER
    }
  ],
  [
    {
      src: 9,
      type: TileType.WALL_ROW
    },
    {
      src: 17,
      type: TileType.CLIFF_CENTER
    },
    {
      src: null,
      type: null
    },
    {
      src: null,
      type: null
    },
    {
      src: null,
      type: null
    },
    {
      src: null,
      type: null
    },
    {
      src: null,
      type: null
    },
    {
      src: null,
      type: null
    },
    {
      src: null,
      type: null
    }
  ],
  [
    {
      src: 9,
      type: TileType.WALL_ROW
    },
    {
      src: 17,
      type: TileType.CLIFF_CENTER
    },
    {
      src: 20,
      type: TileType.WALL_ROW
    },
    {
      src: 18,
      type: TileType.CLIFF_LEFT
    },
    {
      src: null,
      type: null
    },
    {
      src: null,
      type: null
    },
    {
      src: null,
      type: null
    },
    {
      src: null,
      type: null
    },
    {
      src: null,
      type: null
    }
  ],
  [
    {
      src: 9,
      type: TileType.WALL_ROW
    },
    {
      src: 17,
      type: TileType.CLIFF_CENTER
    },
    {
      src: 9,
      type: TileType.WALL_ROW
    },
    {
      src: 18,
      type: TileType.CLIFF_LEFT
    },
    {
      src: null,
      type: null
    },
    {
      src: null,
      type: null
    },
    {
      src: null,
      type: null
    },
    {
      src: null,
      type: null
    },
    {
      src: null,
      type: null
    }
  ],
  [
    {
      src: 9,
      type: TileType.WALL_ROW
    },
    {
      src: 17,
      type: TileType.CLIFF_CENTER
    },
    {
      src: 21,
      type: TileType.WALL_ROW
    },
    {
      src: 18,
      type: TileType.CLIFF_LEFT
    },
    {
      src: null,
      type: null
    },
    {
      src: null,
      type: null
    },
    {
      src: null,
      type: null
    },
    {
      src: null,
      type: null
    },
    {
      src: null,
      type: null
    },
    {
      src: null,
      type: null
    }
  ],
  [
    {
      src: 9,
      type: TileType.WALL_ROW
    },
    {
      src: 17,
      type: TileType.CLIFF_CENTER
    },
    {
      src: null,
      type: null
    },
    {
      src: 1,
      type: TileType.FLOOR
    },
    {
      src: 18,
      type: TileType.CLIFF_LEFT
    },
    {
      src: null,
      type: null
    },
    {
      src: null,
      type: null
    },
    {
      src: null,
      type: null
    },
    {
      src: null,
      type: null
    }
  ],
  [
    {
      src: 9,
      type: TileType.WALL_ROW
    },
    {
      src: 1,
      type: TileType.FLOOR
    },
    {
      src: 1,
      type: TileType.FLOOR
    },
    {
      src: 1,
      type: TileType.FLOOR
    },
    {
      src: 18,
      type: TileType.CLIFF_LEFT
    },
    {
      src: null,
      type: null
    },
    {
      src: null,
      type: null
    },
    {
      src: null,
      type: null
    },
    {
      src: null,
      type: null
    }
  ],
  [
    {
      src: 9,
      type: TileType.WALL_ROW
    },
    {
      src: 1,
      type: TileType.FLOOR
    },
    {
      src: 1,
      type: TileType.FLOOR
    },
    {
      src: 1,
      type: TileType.FLOOR
    },
    {
      src: 18,
      type: TileType.CLIFF_LEFT
    },
    {
      src: null,
      type: null
    },
    {
      src: null,
      type: null
    },
    {
      src: null,
      type: null
    },
    {
      src: null,
      type: null
    }
  ],
  [
    {
      src: 9,
      type: TileType.WALL_ROW
    },
    {
      src: 1,
      type: TileType.FLOOR
    },
    {
      src: 24,
      type: TileType.WALL_ROW
    },
    {
      src: 18,
      type: TileType.CLIFF_LEFT
    },
    {
      src: null,
      type: null
    },
    {
      src: null,
      type: null
    },
    {
      src: null,
      type: null
    },
    {
      src: null,
      type: null
    },
    {
      src: null,
      type: null
    }
  ]
];

export const playerInfo = {
  x: 1,
  y: 7,
  direction: PlayerState.TOP
};

export const enemyInfo = [
  {
    x: 8,
    y: 1,
    type: EnemyType.WOODENSKELETON
  }
];

export const doorInfo = {
  x: 9,
  y: 1,
  direction: DoorState.X
};

export const burstInfo = [
  {
    x: 1,
    y: 2
  },
  {
    x: 1,
    y: 5
  },
  {
    x: 1,
    y: 6
  },
  {
    x: 2,
    y: 1
  },
  {
    x: 3,
    y: 1
  },
  {
    x: 4,
    y: 1
  },
  {
    x: 5,
    y: 1
  },
  {
    x: 6,
    y: 1
  },
  {
    x: 6,
    y: 2
  }
];
