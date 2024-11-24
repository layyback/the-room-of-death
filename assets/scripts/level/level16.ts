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
      src: 20,
      type: TileType.WALL_ROW
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
      src: 20,
      type: TileType.WALL_LEFT_BOTTOM
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
      src: 17,
      type: TileType.CLIFF_CENTER
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
      src: 14,
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
      src: 17,
      type: TileType.CLIFF_CENTER
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
      src: 9,
      type: TileType.WALL_ROW
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
      src: 5,
      type: TileType.WALL_COLUMN
    },
    {
      src: 14,
      type: TileType.WALL_RIGHT_BOTTOM
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
      src: 16,
      type: TileType.WALL_LEFT_TOP
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
      src: 9,
      type: TileType.WALL_ROW
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
    }
  ]
];

export const playerInfo = {
  x: 0,
  y: 1,
  direction: PlayerState.RIGHT
};

export const enemyInfo = [
  {
    x: 4,
    y: 4,
    type: EnemyType.WOODENSKELETON
  },
  {
    x: 5,
    y: 3,
    type: EnemyType.WOODENSKELETON
  },
  {
    x: 6,
    y: 2,
    type: EnemyType.WOODENSKELETON
  },
  {
    x: 4,
    y: 6,
    type: EnemyType.IRONSKELETON
  },
  {
    x: 4,
    y: 7,
    type: EnemyType.IRONSKELETON
  }
];

export const doorInfo = {
  x: 0,
  y: 7,
  direction: DoorState.X
};

export const spikeInfo = [
  {
    x: 4,
    y: 5,
    type: SpikeType.THREE
  },
  {
    x: 5,
    y: 5,
    type: SpikeType.TWO
  },
  {
    x: 6,
    y: 5,
    type: SpikeType.ONE
  }
];

export const burstInfo = [
  {
    x: 3,
    y: 5
  },
  {
    x: 3,
    y: 6
  },
  {
    x: 3,
    y: 7
  }
];
