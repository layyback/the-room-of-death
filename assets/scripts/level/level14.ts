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
      src: 22,
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
      src: 18,
      type: TileType.CLIFF_LEFT
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
      src: 20,
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
      src: 9,
      type: TileType.WALL_ROW
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
      src: 9,
      type: TileType.WALL_ROW
    },
    {
      src: 19,
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
      src: 17,
      type: TileType.CLIFF_RIGHT
    },
    {
      src: 1,
      type: TileType.FLOOR
    },
    {
      src: 17,
      type: TileType.CLIFF_RIGHT
    },
    {
      src: 9,
      type: TileType.WALL_ROW
    },
    {
      src: 19,
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
      src: 9,
      type: TileType.WALL_ROW
    },
    {
      src: 19,
      type: TileType.CLIFF_CENTER
    }
  ],
  [
    {
      src: 27,
      type: TileType.WALL_ROW
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
      src: 19,
      type: TileType.CLIFF_CENTER
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
      src: 19,
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
      src: 9,
      type: TileType.WALL_ROW
    },
    {
      src: 19,
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
      src: 5,
      type: TileType.WALL_COLUMN
    },
    {
      src: 14,
      type: TileType.WALL_RIGHT_BOTTOM
    },
    {
      src: 19,
      type: TileType.CLIFF_CENTER
    }
  ],
  [
    {
      src: 21,
      type: TileType.WALL_ROW
    },
    {
      src: 1,
      type: TileType.FLOOR
    },
    {
      src: 22,
      type: TileType.WALL_RIGHT_TOP
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
    }
  ]
];

export const playerInfo = {
  x: 1,
  y: 0,
  direction: PlayerState.BOTTOM
};

export const enemyInfo = [
  {
    x: 3,
    y: 4,
    type: EnemyType.WOODENSKELETON
  },
  {
    x: 8,
    y: 3,
    type: EnemyType.WOODENSKELETON
  }
];

export const doorInfo = {
  x: 10,
  y: 1,
  direction: DoorState.X
};

export const spikeInfo = [
  {
    x: 3,
    y: 2,
    type: SpikeType.TWO
  }
];

export const burstInfo = [
  {
    x: 1,
    y: 4
  },
  {
    x: 5,
    y: 2
  },
  {
    x: 5,
    y: 4
  },
  {
    x: 7,
    y: 3
  },
  {
    x: 7,
    y: 4
  },
  {
    x: 8,
    y: 2
  }
];
