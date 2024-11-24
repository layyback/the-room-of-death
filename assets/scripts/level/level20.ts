import {
  DoorState,
  EnemyType,
  PlayerState,
  SpikeType,
  TileType
} from "../utils/enum";

export const mapInfo = [
  [
    {
      src: null,
      type: null
    },
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
      type: TileType.WALL_RIGHT_BOTTOM
    },
    {
      src: 1,
      type: TileType.FLOOR
    },
    {
      src: 20,
      type: TileType.WALL_ROW
    },
    {
      src: 18,
      type: TileType.CLIFF_LEFT
    }
  ],

  [
    {
      src: null,
      type: null
    },
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
      src: 9,
      type: TileType.WALL_ROW
    },
    {
      src: 17,
      type: TileType.CLIFF_CENTER
    }
  ],

  [
    {
      src: null,
      type: null
    },
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
      src: null,
      type: null
    },
    {
      src: 21,
      type: TileType.WALL_ROW
    },
    {
      src: 17,
      type: TileType.CLIFF_CENTER
    }
  ],

  [
    {
      src: null,
      type: null
    },
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
      src: null,
      type: null
    },
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
      src: 20,
      type: TileType.WALL_ROW
    },
    {
      src: 17,
      type: TileType.CLIFF_CENTER
    }
  ],

  [
    {
      src: null,
      type: null
    },
    {
      src: 15,
      type: TileType.WALL_RIGHT_TOP
    },
    {
      src: 25,
      type: TileType.WALL_COLUMN
    },
    {
      src: 23,
      type: TileType.WALL_RIGHT_BOTTOM
    },
    {
      src: 1,
      type: TileType.FLOOR
    },
    {
      src: 9,
      type: TileType.WALL_ROW
    },
    {
      src: 17,
      type: TileType.CLIFF_CENTER
    }
  ],

  [
    {
      src: null,
      type: null
    },
    {
      src: null,
      type: null
    },
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
      src: 9,
      type: TileType.WALL_ROW
    },
    {
      src: 17,
      type: TileType.CLIFF_CENTER
    }
  ],

  [
    {
      src: null,
      type: null
    },
    {
      src: null,
      type: null
    },
    {
      src: 21,
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
      src: 9,
      type: TileType.WALL_ROW
    },
    {
      src: 17,
      type: TileType.CLIFF_CENTER
    }
  ],

  [
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
      src: 1,
      type: TileType.FLOOR
    },
    {
      src: 1,
      type: TileType.FLOOR
    },
    {
      src: 9,
      type: TileType.WALL_ROW
    },
    {
      src: 17,
      type: TileType.CLIFF_CENTER
    }
  ],

  [
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
      src: 1,
      type: TileType.FLOOR
    },
    {
      src: 1,
      type: TileType.FLOOR
    },
    {
      src: 9,
      type: TileType.WALL_ROW
    },
    {
      src: 17,
      type: TileType.CLIFF_CENTER
    }
  ],

  [
    {
      src: 22,
      type: TileType.WALL_RIGHT_TOP
    },
    {
      src: 5,
      type: TileType.WALL_COLUMN
    },
    {
      src: 5,
      type: TileType.WALL_COLUMN
    },
    {
      src: 5,
      type: TileType.WALL_COLUMN
    },
    {
      src: 5,
      type: TileType.WALL_COLUMN
    },
    {
      src: 14,
      type: TileType.WALL_RIGHT_BOTTOM
    },
    {
      src: 19,
      type: TileType.CLIFF_RIGHT
    }
  ]
];

export const playerInfo = {
  x: 0,
  y: 4,
  direction: PlayerState.RIGHT
};

export const enemyInfo = [
  {
    x: 9,
    y: 1,
    type: EnemyType.WOODENSKELETON
  },
  {
    x: 9,
    y: 3,
    type: EnemyType.IRONSKELETON
  },
  {
    x: 9,
    y: 4,
    type: EnemyType.IRONSKELETON
  }
];

export const doorInfo = {
  x: 9,
  y: 0,
  direction: DoorState.Y
};

export const burstInfo = [
  {
    x: 1,
    y: 2
  },
  {
    x: 1,
    y: 3
  },
  {
    x: 2,
    y: 3
  },
  {
    x: 2,
    y: 4
  },
  {
    x: 7,
    y: 4
  }
];
