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
      src: 23,
      type: TileType.WALL_RIGHT_BOTTOM
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
      src: 19,
      type: TileType.CLIFF_RIGHT
    }
  ]
];

export const playerInfo = {
  x: 7,
  y: 7,
  direction: PlayerState.LEFT
};

export const enemyInfo = [
  {
    x: 2,
    y: 1,
    type: EnemyType.WOODENSKELETON
  },
  {
    x: 2,
    y: 4,
    type: EnemyType.WOODENSKELETON
  }
];

export const doorInfo = {
  x: 0,
  y: 1,
  direction: DoorState.X
};

export const spikeInfo = [
  {
    x: 1,
    y: 3,
    type: SpikeType.TWO,
    count: 0
  },
  {
    x: 3,
    y: 3,
    type: SpikeType.TWO,
    count: 0
  },
  {
    x: 4,
    y: 1,
    type: SpikeType.TWO,
    count: 0
  },
  {
    x: 4,
    y: 4,
    type: SpikeType.TWO,
    count: 0
  },
  {
    x: 4,
    y: 6,
    type: SpikeType.TWO,
    count: 0
  },
  {
    x: 5,
    y: 3,
    type: SpikeType.TWO,
    count: 0
  },
  {
    x: 6,
    y: 2,
    type: SpikeType.TWO,
    count: 0
  },
  {
    x: 6,
    y: 6,
    type: SpikeType.TWO,
    count: 0
  }
];

export const burstInfo = [
  {
    x: 1,
    y: 6
  },
  {
    x: 2,
    y: 6
  },
  {
    x: 3,
    y: 6
  },
  {
    x: 4,
    y: 2
  },
  {
    x: 4,
    y: 5
  },
  {
    x: 5,
    y: 4
  },
  {
    x: 5,
    y: 5
  },
  {
    x: 6,
    y: 5
  }
];
