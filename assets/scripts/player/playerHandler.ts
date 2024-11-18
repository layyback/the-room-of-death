import {
  _decorator,
  animation,
  AnimationClip,
  AnimationComponent,
  Component,
  Node,
  Sprite,
  Animation,
  SpriteFrame,
  tween,
  Vec3,
  Collider,
  RigidBody,
  BoxCollider2D,
  RigidBody2D,
  ERigidBody2DType,
  UITransform,
  Size
} from "cc";
const { ccclass, property } = _decorator;
import { loadReources } from "../utils";
import { MessageType, messageCenter } from "../game/messageCenter";
import { MoveDirection, PlayerState, TileSize, TileType } from "../utils/enum";
import { StateManager } from "../common/stateManager";
import { playerInfo, mapInfo } from "../game/level1";
import { entityHandler } from "../common/entity";

interface IStateMap {
  spritePath: string;
  wrapMode: AnimationClip.WrapMode;
}

export class playerHandler extends entityHandler {
  stateMap: Record<PlayerState, IStateMap> = {
    [PlayerState.TOP]: {
      spritePath: "texture/player/idle/top",
      wrapMode: AnimationClip.WrapMode.Loop
    },
    [PlayerState.BOTTOM]: {
      spritePath: "texture/player/idle/bottom",
      wrapMode: AnimationClip.WrapMode.Loop
    },
    [PlayerState.LEFT]: {
      spritePath: "texture/player/idle/left",
      wrapMode: AnimationClip.WrapMode.Loop
    },
    [PlayerState.RIGHT]: {
      spritePath: "texture/player/idle/right",
      wrapMode: AnimationClip.WrapMode.Loop
    },
    [PlayerState.TURNLEFTTOP]: {
      spritePath: "texture/player/turnleft/top",
      wrapMode: AnimationClip.WrapMode.Normal
    },
    [PlayerState.TURNLEFTLEFT]: {
      spritePath: "texture/player/turnleft/left",
      wrapMode: AnimationClip.WrapMode.Normal
    },
    [PlayerState.TURNLEFTRIGHT]: {
      spritePath: "texture/player/turnleft/right",
      wrapMode: AnimationClip.WrapMode.Normal
    },
    [PlayerState.TURNLEFTBOTTOM]: {
      spritePath: "texture/player/turnleft/bottom",
      wrapMode: AnimationClip.WrapMode.Normal
    },
    [PlayerState.TURNRIGHTTOP]: {
      spritePath: "texture/player/turnright/top",
      wrapMode: AnimationClip.WrapMode.Normal
    },
    [PlayerState.TURNRIGHTRIGHT]: {
      spritePath: "texture/player/turnright/right",
      wrapMode: AnimationClip.WrapMode.Normal
    },
    [PlayerState.TURNRIGHTBOTTOM]: {
      spritePath: "texture/player/turnright/bottom",
      wrapMode: AnimationClip.WrapMode.Normal
    },
    [PlayerState.TURNRIGHTLEFT]: {
      spritePath: "texture/player/turnright/left",
      wrapMode: AnimationClip.WrapMode.Normal
    }
  };

  async start() {
    this.initPlayer();
    this.initControl();
  }

  initPlayer() {
    messageCenter.subscribe(MessageType.InitPlayer, this.init, this);
  }

  initControl() {
    messageCenter.subscribe(MessageType.Move, this.initMove, this);
  }

  checkCanMove(direction: MoveDirection) {
    const currentDirection = this.currentDirection;
    switch (direction) {
      case MoveDirection.TOP:
        switch (currentDirection) {
          case MoveDirection.TOP:
            return (
              mapInfo[this.currentPoint.x][this.currentPoint.y - 2]?.type ===
              TileType.FLOOR
            );
          case MoveDirection.LEFT:
            return (
              mapInfo[this.currentPoint.x][this.currentPoint.y - 1]?.type ===
                TileType.FLOOR &&
              mapInfo[this.currentPoint.x - 1][this.currentPoint.y - 1]
                ?.type === TileType.FLOOR
            );
          case MoveDirection.BOTTOM:
            return (
              mapInfo[this.currentPoint.x][this.currentPoint.y - 1]?.type ===
              TileType.FLOOR
            );
          case MoveDirection.RIGHT:
            return (
              mapInfo[this.currentPoint.x][this.currentPoint.y - 1]?.type ===
                TileType.FLOOR &&
              mapInfo[this.currentPoint.x + 1][this.currentPoint.y - 1]
                ?.type === TileType.FLOOR
            );
          default:
            break;
        }
      case MoveDirection.BOTTOM:
        switch (currentDirection) {
          case MoveDirection.TOP:
            return (
              mapInfo[this.currentPoint.x][this.currentPoint.y - 1]?.type ===
              TileType.FLOOR
            );
          case MoveDirection.LEFT:
            return (
              mapInfo[this.currentPoint.x][this.currentPoint.y + 1]?.type ===
                TileType.FLOOR &&
              mapInfo[this.currentPoint.x - 1][this.currentPoint.y + 1]
                ?.type === TileType.FLOOR
            );
          case MoveDirection.BOTTOM:
            return (
              mapInfo[this.currentPoint.x][this.currentPoint.y + 2]?.type ===
              TileType.FLOOR
            );
          case MoveDirection.RIGHT:
            return (
              mapInfo[this.currentPoint.x][this.currentPoint.y + 1]?.type ===
                TileType.FLOOR &&
              mapInfo[this.currentPoint.x + 1][this.currentPoint.y + 1]
                ?.type === TileType.FLOOR
            );
          default:
            break;
        }
      case MoveDirection.LEFT:
        switch (currentDirection) {
          case MoveDirection.TOP:
            return (
              mapInfo[this.currentPoint.x - 1][this.currentPoint.y]?.type ===
                TileType.FLOOR &&
              mapInfo[this.currentPoint.x - 1][this.currentPoint.y - 1]
                ?.type === TileType.FLOOR
            );
          case MoveDirection.LEFT:
            return (
              mapInfo[this.currentPoint.x - 2][this.currentPoint.y]?.type ===
              TileType.FLOOR
            );
          case MoveDirection.BOTTOM:
            return (
              mapInfo[this.currentPoint.x - 1][this.currentPoint.y]?.type ===
                TileType.FLOOR &&
              mapInfo[this.currentPoint.x - 1][this.currentPoint.y + 1]
                ?.type === TileType.FLOOR
            );
          case MoveDirection.RIGHT:
            return (
              mapInfo[this.currentPoint.x - 1][this.currentPoint.y]?.type ===
              TileType.FLOOR
            );
          default:
            break;
        }
      case MoveDirection.RIGHT:
        switch (currentDirection) {
          case MoveDirection.TOP:
            return (
              mapInfo[this.currentPoint.x + 1][this.currentPoint.y]?.type ===
                TileType.FLOOR &&
              mapInfo[this.currentPoint.x + 1][this.currentPoint.y - 1]
                ?.type === TileType.FLOOR
            );
          case MoveDirection.LEFT:
            return (
              mapInfo[this.currentPoint.x + 1][this.currentPoint.y]?.type ===
              TileType.FLOOR
            );
          case MoveDirection.BOTTOM:
            return (
              mapInfo[this.currentPoint.x + 1][this.currentPoint.y]?.type ===
                TileType.FLOOR &&
              mapInfo[this.currentPoint.x + 1][this.currentPoint.y + 1]
                ?.type === TileType.FLOOR
            );
          case MoveDirection.RIGHT:
            return (
              mapInfo[this.currentPoint.x + 2][this.currentPoint.y]?.type ===
              TileType.FLOOR
            );
          default:
            break;
        }
      case MoveDirection.TURNLEFT:
        switch (currentDirection) {
          case MoveDirection.TOP:
            return (
              mapInfo[this.currentPoint.x - 1][this.currentPoint.y]?.type ===
                TileType.FLOOR &&
              mapInfo[this.currentPoint.x - 1][this.currentPoint.y - 1]
                ?.type === TileType.FLOOR
            );
          case MoveDirection.LEFT:
            return (
              mapInfo[this.currentPoint.x - 1][this.currentPoint.y + 1]
                ?.type === TileType.FLOOR &&
              mapInfo[this.currentPoint.x][this.currentPoint.y + 1]?.type ===
                TileType.FLOOR
            );

          case MoveDirection.BOTTOM:
            return (
              mapInfo[this.currentPoint.x + 1][this.currentPoint.y]?.type ===
                TileType.FLOOR &&
              mapInfo[this.currentPoint.x + 1][this.currentPoint.y + 1]
                ?.type === TileType.FLOOR
            );
          case MoveDirection.RIGHT:
            return (
              mapInfo[this.currentPoint.x][this.currentPoint.y - 1]?.type ===
                TileType.FLOOR &&
              mapInfo[this.currentPoint.x + 1][this.currentPoint.y - 1]
                ?.type === TileType.FLOOR
            );

          default:
            break;
        }
        break;
      case MoveDirection.TURNRIGHT:
        switch (currentDirection) {
          case MoveDirection.TOP:
            return (
              mapInfo[this.currentPoint.x + 1][this.currentPoint.y - 1]
                ?.type === TileType.FLOOR &&
              mapInfo[this.currentPoint.x + 1][this.currentPoint.y]?.type ===
                TileType.FLOOR
            );
          case MoveDirection.LEFT:
            return (
              mapInfo[this.currentPoint.x - 1][this.currentPoint.y - 1]
                ?.type === TileType.FLOOR &&
              mapInfo[this.currentPoint.x][this.currentPoint.y - 1]?.type ===
                TileType.FLOOR
            );

          case MoveDirection.BOTTOM:
            return (
              mapInfo[this.currentPoint.x - 1][this.currentPoint.y]?.type ===
                TileType.FLOOR &&
              mapInfo[this.currentPoint.x - 1][this.currentPoint.y + 1]
                ?.type === TileType.FLOOR
            );
          case MoveDirection.RIGHT:
            return (
              mapInfo[this.currentPoint.x][this.currentPoint.y + 1]?.type ===
                TileType.FLOOR &&
              mapInfo[this.currentPoint.x + 1][this.currentPoint.y + 1]
                ?.type === TileType.FLOOR
            );
        }
        break;
      default:
        break;
    }
  }

  checkCanAttack(direction: MoveDirection) {}

  initMove(direction: MoveDirection) {
    if (!this.checkCanMove(direction)) return;
    this.onMove(direction);
  }

  onMove(direction: MoveDirection): boolean {
    super.onMove(direction);
    messageCenter.publish(MessageType.onMove, {
      playerPoint: this.currentPoint,
      playerDirection: this.currentDirection
    });
    return;
  }

  update(deltaTime: number) {}
}
