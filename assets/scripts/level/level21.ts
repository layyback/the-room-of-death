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
    }
  ],

  [
    {
      src: null,
      type: null
    },
    {
      src: 1,
      type: TileType.FLOOR
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
      src: 13,
      type: TileType.WALL_LEFT_BOTTOM
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
      src: 1,
      type: TileType.FLOOR
    },
    {
      src: 16,
      type: TileType.WALL_LEFT_TOP
    },
    {
      src: 13,
      type: TileType.WALL_LEFT_BOTTOM
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
      src: 1,
      type: TileType.FLOOR
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
      src: 9,
      type: TileType.WALL_ROW
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
      src: 21,
      type: TileType.WALL_RIGHT_BOTTOM
    },
    {
      src: 19,
      type: TileType.CLIFF_RIGHT
    }
  ],

  [
    {
      src: 20,
      type: TileType.WALL_LEFT_TOP
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
      src: 9,
      type: TileType.WALL_ROW
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
      src: 19,
      type: TileType.CLIFF_RIGHT
    },
    {
      src: null,
      type: null
    }
  ],

  [
    {
      src: 15,
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
      src: 14,
      type: TileType.WALL_RIGHT_BOTTOM
    },
    {
      src: 19,
      type: TileType.CLIFF_RIGHT
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
  x: 0,
  y: 7,
  direction: PlayerState.TOP
};

export const enemyInfo = [
  {
    x: 2,
    y: 6,
    type: EnemyType.WOODENSKELETON
  }
];

export const doorInfo = {
  x: 7,
  y: 6,
  direction: DoorState.X
};

export const burstInfo = [
  {
    x: 2,
    y: 3
  },
  {
    x: 2,
    y: 5
  },
  {
    x: 3,
    y: 3
  },
  {
    x: 3,
    y: 4
  }
];
