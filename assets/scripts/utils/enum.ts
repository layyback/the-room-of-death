export const TileSize = 55;

export enum MoveDirection {
  TOP = "TOP",
  BOTTOM = "BOTTOM",
  LEFT = "LEFT",
  RIGHT = "RIGHT",
  TURNLEFT = "TURNLEFT",
  TURNRIGHT = "TURNRIGHT"
}

export enum AttackDirection {
  ATTACKTOP = "ATTACKTOP",
  ATTACKBOTTOM = "ATTACKBOTTOM",
  ATTACKLEFT = "ATTACKLEFT",
  ATTACKRIGHT = "ATTACKRIGHT"
}

export enum DeathDirection {
  DEATHTOP = "DEATHTOP",
  DEATHBOTTOM = "DEATHBOTTOM",
  DEATHLEFT = "DEATHLEFT",
  DEATHRIGHT = "DEATHRIGHT"
}

export enum PlayerState {
  TOP = "TOP",
  BOTTOM = "BOTTOM",
  LEFT = "LEFT",
  RIGHT = "RIGHT",

  TURNLEFTTOP = "TURNLEFTTOP",
  TURNLEFTLEFT = "TURNLEFTLEFT",
  TURNLEFTBOTTOM = "TURNLEFTBOTTOM",
  TURNLEFTRIGHT = "TURNLEFTRIGHT",
  TURNRIGHTTOP = "TURNRIGHTTOP",
  TURNRIGHTRIGHT = "TURNRIGHTRIGHT",
  TURNRIGHTBOTTOM = "TURNRIGHTBOTTOM",
  TURNRIGHTLEFT = "TURNRIGHTLEFT",

  BLOCKTOPTOP = "BLOCKTOPTOP",
  BLOCKTOPLEFT = "BLOCKTOPLEFT",
  BLOCKTOPRIGHT = "BLOCKTOPRIGHT",
  BLOCKTOPBOTTOM = "BLOCKTOPBOTTOM",
  BLOCKBOTTOMTOP = "BLOCKBOTTOMTOP",
  BLOCKBOTTOMLEFT = "BLOCKBOTTOMLEFT",
  BLOCKBOTTOMRIGHT = "BLOCKBOTTOMRIGHT",
  BLOCKBOTTOMBOTTOM = "BLOCKBOTTOMBOTTOM",
  BLOCKLEFTTOP = "BLOCKLEFTTOP",
  BLOCKLEFTLEFT = "BLOCKLEFTLEFT",
  BLOCKLEFTBOTTOM = "BLOCKLEFTBOTTOM",
  BLOCKLEFTRIGHT = "BLOCKLEFTRIGHT",
  BLOCKRIGHTTOP = "BLOCKRIGHTTOP",
  BLOCKRIGHTRIGHT = "BLOCKRIGHTRIGHT",
  BLOCKRIGHTBOTTOM = "BLOCKRIGHTBOTTOM",
  BLOCKRIGHTLEFT = "BLOCKRIGHTLEFT",
  BLOCKTURNLEFTTOP = "BLOCKTURNLEFTTOP",
  BLOCKTURNLEFTLEFT = "BLOCKTURNLEFTLEFT",
  BLOCKTURNLEFTBOTTOM = "BLOCKTURNLEFTBOTTOM",
  BLOCKTURNLEFTRIGHT = "BLOCKTURNLEFTRIGHT",
  BLOCKTURNRIGHTTOP = "BLOCKTURNRIGHTTOP",
  BLOCKTURNRIGHTRIGHT = "BLOCKTURNRIGHTRIGHT",
  BLOCKTURNRIGHTBOTTOM = "BLOCKTURNRIGHTBOTTOM",
  BLOCKTURNRIGHTLEFT = "BLOCKTURNRIGHTLEFT",

  ATTACKTOP = "ATTACKTOP",
  ATTACKLEFT = "ATTACKLEFT",
  ATTACKBOTTOM = "ATTACKBOTTOM",
  ATTACKRIGHT = "ATTACKRIGHT",

  DEATHTOP = "DEATHTOP",
  DEATHBOTTOM = "DEATHBOTTOM",
  DEATHLEFT = "DEATHLEFT",
  DEATHRIGHT = "DEATHRIGHT"
}

export enum EnemyState {
  TOP = "TOP",
  BOTTOM = "BOTTOM",
  LEFT = "LEFT",
  RIGHT = "RIGHT",
  ATTACKTOP = "ATTACKTOP",
  ATTACKLEFT = "ATTACKLEFT",
  ATTACKBOTTOM = "ATTACKBOTTOM",
  ATTACKRIGHT = "ATTACKRIGHT",
  DEATHTOP = "DEATHTOP",
  DEATHBOTTOM = "DEATHBOTTOM",
  DEATHLEFT = "DEATHLEFT",
  DEATHRIGHT = "DEATHRIGHT"
}

export enum TileType {
  WALL_ROW = "WALL_ROW",
  WALL_COLUMN = "WALL_COLUMN",
  WALL_LEFT_TOP = "WALL_LEFT_TOP",
  WALL_RIGHT_TOP = "WALL_RIGHT_TOP",
  WALL_LEFT_BOTTOM = "WALL_LEFT_BOTTOM",
  WALL_RIGHT_BOTTOM = "WALL_RIGHT_BOTTOM",
  CLIFF_LEFT = "CLIFF_ROW_START",
  CLIFF_CENTER = "CLIFF_ROW_CENTER",
  CLIFF_RIGHT = "CLIFF_ROW_END",
  FLOOR = "FLOOR"
}

export enum DoorState {
  OPEN = "OPEN",
  CLOSELEFT = "CLOSELEFT",
  CLOSETOP = "CLOSETOP"
}

export enum KeyCode {
  UP = 87,
  DOWN = 83,
  LEFT = 65,
  RIGHT = 68,
  Q = 81,
  E = 69
}

export enum EnemyType {
  WOODENSKELETON = "WOODENSKELETON",
  IRONSKELETON = "IRONSKELETON"
}
