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
      src: 13,
      type: TileType.WALL_LEFT_BOTTOM
    },
    {
      src: 18,
      type: TileType.CLIFF_LEFT
    }
  ],
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
      src: 21,
      type: TileType.WALL_RIGHT_BOTTOM
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
      src: 1,
      type: TileType.FLOOR
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
      src: 1,
      type: TileType.FLOOR
    },
    {
      src: 1,
      type: TileType.FLOOR
    },
    {
      src: 20,
      type: TileType.WALL_LEFT_BOTTOM
    },
    {
      src: 17,
      type: TileType.CLIFF_CENTER
    }
  ],
  [
    {
      src: 15,
      type: TileType.WALL_RIGHT_TOP
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
      src: 9,
      type: TileType.WALL_ROW
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
      src: 13,
      type: TileType.WALL_LEFT_BOTTOM
    },
    {
      src: 18,
      type: TileType.CLIFF_LEFT
    }
  ],
  [
    {
      src: 16,
      type: TileType.WALL_LEFT_TOP
    },
    {
      src: 14,
      type: TileType.WALL_RIGHT_BOTTOM
    },
    {
      src: 1,
      type: TileType.FLOOR
    },
    {
      src: 15,
      type: TileType.WALL_RIGHT_TOP
    },
    {
      src: 14,
      type: TileType.WALL_RIGHT_BOTTOM
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
      src: 1,
      type: TileType.FLOOR
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
      src: 1,
      type: TileType.FLOOR
    },
    {
      src: 1,
      type: TileType.FLOOR
    },
    {
      src: 20,
      type: TileType.WALL_LEFT_BOTTOM
    },
    {
      src: 17,
      type: TileType.CLIFF_CENTER
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
      src: 14,
      type: TileType.WALL_RIGHT_BOTTOM
    },
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
    }
  ]
];

export const playerInfo = {
  x: 2,
  y: 8,
  direction: PlayerState.TOP
};

export const enemyInfo = [
  {
    x: 2,
    y: 5,
    type: EnemyType.WOODENSKELETON
  },
  {
    x: 7,
    y: 6,
    type: EnemyType.WOODENSKELETON
  }
];

export const doorInfo = {
  x: 7,
  y: 8,
  direction: DoorState.Y
};
