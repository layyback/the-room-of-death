import { DoorState, EnemyType, PlayerState, TileType } from "../utils/enum";

export const mapInfo = [
  [
    {
      src: 20,
      type: TileType.WALL_LEFT_BOTTOM
    },
    {
      src: 1,
      type: TileType.FLOOR
    },
    {
      src: 22,
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
      src: 16,
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
      src: 23,
      type: TileType.WALL_LEFT_BOTTOM
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
      src: 17,
      type: TileType.CLIFF_CENTER
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
  y: 11,
  direction: PlayerState.TOP
};

export const enemyInfo = [
  {
    x: 1,
    y: 1,
    type: EnemyType.WOODENSKELETON
  },
  {
    x: 2,
    y: 7,
    type: EnemyType.WOODENSKELETON
  }
];

export const doorInfo = {
  x: 0,
  y: 1,
  direction: DoorState.CLOSELEFT
};