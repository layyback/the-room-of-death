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
import { loadReources, isWall, isBlock, isCliff } from "../utils";
import { MessageType, messageCenter } from "../game/messageCenter";
import {
  AttackDirection,
  DeathDirection,
  MoveDirection,
  PlayerState,
  TileSize,
  TileType
} from "../utils/enum";
import { StateManager } from "../common/stateManager";
import { entityHandler } from "../common/entity";
import { enemyManager } from "../enemy/enemyManager";
import { Game } from "../game/game";

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
    },
    [PlayerState.BLOCKTOPTOP]: {
      spritePath: "texture/player/blockfront/top",
      wrapMode: AnimationClip.WrapMode.Normal
    },
    [PlayerState.BLOCKTOPLEFT]: {
      spritePath: "texture/player/blockright/left",
      wrapMode: AnimationClip.WrapMode.Normal
    },
    [PlayerState.BLOCKTOPRIGHT]: {
      spritePath: "texture/player/blockleft/right",
      wrapMode: AnimationClip.WrapMode.Normal
    },
    [PlayerState.BLOCKTOPBOTTOM]: {
      spritePath: "texture/player/blockback/bottom",
      wrapMode: AnimationClip.WrapMode.Normal
    },
    [PlayerState.BLOCKBOTTOMTOP]: {
      spritePath: "texture/player/blockback/top",
      wrapMode: AnimationClip.WrapMode.Normal
    },
    [PlayerState.BLOCKBOTTOMLEFT]: {
      spritePath: "texture/player/blockleft/left",
      wrapMode: AnimationClip.WrapMode.Normal
    },
    [PlayerState.BLOCKBOTTOMRIGHT]: {
      spritePath: "texture/player/blockright/right",
      wrapMode: AnimationClip.WrapMode.Normal
    },
    [PlayerState.BLOCKBOTTOMBOTTOM]: {
      spritePath: "texture/player/blockfront/bottom",
      wrapMode: AnimationClip.WrapMode.Normal
    },
    [PlayerState.BLOCKLEFTTOP]: {
      spritePath: "texture/player/blockleft/top",
      wrapMode: AnimationClip.WrapMode.Normal
    },
    [PlayerState.BLOCKLEFTLEFT]: {
      spritePath: "texture/player/blockfront/left",
      wrapMode: AnimationClip.WrapMode.Normal
    },
    [PlayerState.BLOCKLEFTRIGHT]: {
      spritePath: "texture/player/blockback/right",
      wrapMode: AnimationClip.WrapMode.Normal
    },
    [PlayerState.BLOCKLEFTBOTTOM]: {
      spritePath: "texture/player/blockright/bottom",
      wrapMode: AnimationClip.WrapMode.Normal
    },
    [PlayerState.BLOCKRIGHTTOP]: {
      spritePath: "texture/player/blockright/top",
      wrapMode: AnimationClip.WrapMode.Normal
    },
    [PlayerState.BLOCKRIGHTLEFT]: {
      spritePath: "texture/player/blockback/left",
      wrapMode: AnimationClip.WrapMode.Normal
    },
    [PlayerState.BLOCKRIGHTRIGHT]: {
      spritePath: "texture/player/blockfront/right",
      wrapMode: AnimationClip.WrapMode.Normal
    },
    [PlayerState.BLOCKRIGHTBOTTOM]: {
      spritePath: "texture/player/blockleft/bottom",
      wrapMode: AnimationClip.WrapMode.Normal
    },
    [PlayerState.BLOCKTURNLEFTTOP]: {
      spritePath: "texture/player/blockturnleft/top",
      wrapMode: AnimationClip.WrapMode.Normal
    },
    [PlayerState.BLOCKTURNLEFTLEFT]: {
      spritePath: "texture/player/blockturnleft/left",
      wrapMode: AnimationClip.WrapMode.Normal
    },
    [PlayerState.BLOCKTURNLEFTRIGHT]: {
      spritePath: "texture/player/blockturnleft/right",
      wrapMode: AnimationClip.WrapMode.Normal
    },
    [PlayerState.BLOCKTURNLEFTBOTTOM]: {
      spritePath: "texture/player/blockturnleft/bottom",
      wrapMode: AnimationClip.WrapMode.Normal
    },
    [PlayerState.BLOCKTURNRIGHTTOP]: {
      spritePath: "texture/player/blockturnright/top",
      wrapMode: AnimationClip.WrapMode.Normal
    },
    [PlayerState.BLOCKTURNRIGHTLEFT]: {
      spritePath: "texture/player/blockturnright/left",
      wrapMode: AnimationClip.WrapMode.Normal
    },
    [PlayerState.BLOCKTURNRIGHTRIGHT]: {
      spritePath: "texture/player/blockturnright/right",
      wrapMode: AnimationClip.WrapMode.Normal
    },
    [PlayerState.BLOCKTURNRIGHTBOTTOM]: {
      spritePath: "texture/player/blockturnright/bottom",
      wrapMode: AnimationClip.WrapMode.Normal
    },
    [PlayerState.ATTACKTOP]: {
      spritePath: "texture/player/attack/top",
      wrapMode: AnimationClip.WrapMode.Normal
    },
    [PlayerState.ATTACKBOTTOM]: {
      spritePath: "texture/player/attack/bottom",
      wrapMode: AnimationClip.WrapMode.Normal
    },
    [PlayerState.ATTACKLEFT]: {
      spritePath: "texture/player/attack/left",
      wrapMode: AnimationClip.WrapMode.Normal
    },
    [PlayerState.ATTACKRIGHT]: {
      spritePath: "texture/player/attack/right",
      wrapMode: AnimationClip.WrapMode.Normal
    },
    [PlayerState.DEATHTOP]: {
      spritePath: "texture/player/death/top",
      wrapMode: AnimationClip.WrapMode.Normal
    },
    [PlayerState.DEATHBOTTOM]: {
      spritePath: "texture/player/death/bottom",
      wrapMode: AnimationClip.WrapMode.Normal
    },
    [PlayerState.DEATHLEFT]: {
      spritePath: "texture/player/death/left",
      wrapMode: AnimationClip.WrapMode.Normal
    },
    [PlayerState.DEATHRIGHT]: {
      spritePath: "texture/player/death/right",
      wrapMode: AnimationClip.WrapMode.Normal
    }
  };

  async start() {
    this.initPlayer();
    this.initControl();
    this.initOnAttacked();
  }

  initPlayer() {
    messageCenter.subscribe(MessageType.InitPlayer, this.init, this);
  }

  initControl() {
    console.log("init control");

    messageCenter.subscribe(MessageType.Move, this.initMove, this);
  }

  findEnemyOnPoint({ x, y }) {
    const enemyList = enemyManager.enemyList;
    return enemyList.find(
      item => !item.hasDead && item.x === x && item.y === y
    );
  }

  checkCanMove(direction: MoveDirection) {
    const currentDirection = this.currentDirection;
    const mapInfo = Game.levelInfo.mapInfo;

    // let canMove;

    switch (direction) {
      case MoveDirection.TOP:
        switch (currentDirection) {
          case MoveDirection.TOP:
            return (
              !isWall(
                mapInfo[this.currentPoint.x]?.[this.currentPoint.y - 2]
              ) &&
              !isBlock(mapInfo[this.currentPoint.x]?.[this.currentPoint.y - 1])
            );
          case MoveDirection.LEFT:
            return (
              !isBlock(
                mapInfo[this.currentPoint.x]?.[this.currentPoint.y - 1]
              ) &&
              !isWall(
                mapInfo[this.currentPoint.x - 1]?.[this.currentPoint.y - 1]
              )
            );
          case MoveDirection.BOTTOM:
            return !isBlock(
              mapInfo[this.currentPoint.x]?.[this.currentPoint.y - 1]
            );
          case MoveDirection.RIGHT:
            return (
              !isBlock(
                mapInfo[this.currentPoint.x]?.[this.currentPoint.y - 1]
              ) &&
              !isWall(
                mapInfo[this.currentPoint.x + 1]?.[this.currentPoint.y - 1]
              )
            );
          default:
            break;
        }
      case MoveDirection.BOTTOM:
        switch (currentDirection) {
          case MoveDirection.TOP:
            return !isBlock(
              mapInfo[this.currentPoint.x]?.[this.currentPoint.y + 1]
            );
          case MoveDirection.LEFT:
            return (
              !isBlock(
                mapInfo[this.currentPoint.x]?.[this.currentPoint.y + 1]
              ) &&
              !isWall(
                mapInfo[this.currentPoint.x - 1]?.[this.currentPoint.y + 1]
              )
            );
          case MoveDirection.BOTTOM:
            return (
              !isWall(
                mapInfo[this.currentPoint.x]?.[this.currentPoint.y + 2]
              ) &&
              !isBlock(mapInfo[this.currentPoint.x]?.[this.currentPoint.y + 1])
            );
          case MoveDirection.RIGHT:
            return (
              !isBlock(
                mapInfo[this.currentPoint.x]?.[this.currentPoint.y + 1]
              ) &&
              !isWall(
                mapInfo[this.currentPoint.x + 1]?.[this.currentPoint.y + 1]
              )
            );
          default:
            break;
        }
      case MoveDirection.LEFT:
        switch (currentDirection) {
          case MoveDirection.TOP:
            return (
              !isBlock(
                mapInfo[this.currentPoint.x - 1]?.[this.currentPoint.y]
              ) &&
              !isWall(
                mapInfo[this.currentPoint.x - 1]?.[this.currentPoint.y - 1]
              )
            );
          case MoveDirection.LEFT:
            return (
              !isWall(
                mapInfo[this.currentPoint.x - 2]?.[this.currentPoint.y]
              ) &&
              !isBlock(mapInfo[this.currentPoint.x - 1]?.[this.currentPoint.y])
            );
          case MoveDirection.BOTTOM:
            return (
              !isBlock(
                mapInfo[this.currentPoint.x - 1]?.[this.currentPoint.y]
              ) &&
              !isWall(
                mapInfo[this.currentPoint.x - 1]?.[this.currentPoint.y + 1]
              )
            );
          case MoveDirection.RIGHT:
            return !isBlock(
              mapInfo[this.currentPoint.x - 1]?.[this.currentPoint.y]
            );
          default:
            break;
        }
      case MoveDirection.RIGHT:
        switch (currentDirection) {
          case MoveDirection.TOP:
            return (
              !isBlock(
                mapInfo[this.currentPoint.x + 1]?.[this.currentPoint.y]
              ) &&
              !isWall(
                mapInfo[this.currentPoint.x + 1]?.[this.currentPoint.y - 1]
              )
            );
          case MoveDirection.LEFT:
            return !isBlock(
              mapInfo[this.currentPoint.x + 1]?.[this.currentPoint.y]
            );
          case MoveDirection.BOTTOM:
            return (
              !isBlock(
                mapInfo[this.currentPoint.x + 1]?.[this.currentPoint.y]
              ) &&
              !isWall(
                mapInfo[this.currentPoint.x + 1]?.[this.currentPoint.y + 1]
              )
            );
          case MoveDirection.RIGHT:
            return (
              !isWall(
                mapInfo[this.currentPoint.x + 2]?.[this.currentPoint.y]
              ) &&
              !isBlock(mapInfo[this.currentPoint.x + 1]?.[this.currentPoint.y])
            );
          default:
            break;
        }
      case MoveDirection.TURNLEFT:
        switch (currentDirection) {
          case MoveDirection.TOP:
            return (
              !isWall(
                mapInfo[this.currentPoint.x - 1]?.[this.currentPoint.y]
              ) &&
              !isWall(
                mapInfo[this.currentPoint.x - 1]?.[this.currentPoint.y - 1]
              ) &&
              !this.findEnemyOnPoint({
                x: this.currentPoint.x - 1,
                y: this.currentPoint.y - 1
              })
            );
          case MoveDirection.LEFT:
            return (
              !isWall(
                mapInfo[this.currentPoint.x - 1]?.[this.currentPoint.y + 1]
              ) &&
              !isWall(
                mapInfo[this.currentPoint.x]?.[this.currentPoint.y + 1]
              ) &&
              !this.findEnemyOnPoint({
                x: this.currentPoint.x - 1,
                y: this.currentPoint.y + 1
              })
            );

          case MoveDirection.BOTTOM:
            return (
              !isWall(
                mapInfo[this.currentPoint.x + 1]?.[this.currentPoint.y]
              ) &&
              !isWall(
                mapInfo[this.currentPoint.x + 1]?.[this.currentPoint.y + 1]
              ) &&
              !this.findEnemyOnPoint({
                x: this.currentPoint.x + 1,
                y: this.currentPoint.y + 1
              })
            );
          case MoveDirection.RIGHT:
            return (
              !isWall(
                mapInfo[this.currentPoint.x]?.[this.currentPoint.y - 1]
              ) &&
              !isWall(
                mapInfo[this.currentPoint.x + 1]?.[this.currentPoint.y - 1]
              ) &&
              !this.findEnemyOnPoint({
                x: this.currentPoint.x + 1,
                y: this.currentPoint.y - 1
              })
            );

          default:
            break;
        }
        break;
      case MoveDirection.TURNRIGHT:
        switch (currentDirection) {
          case MoveDirection.TOP:
            return (
              !isWall(
                mapInfo[this.currentPoint.x + 1]?.[this.currentPoint.y - 1]
              ) &&
              !isWall(
                mapInfo[this.currentPoint.x + 1]?.[this.currentPoint.y]
              ) &&
              !this.findEnemyOnPoint({
                x: this.currentPoint.x + 1,
                y: this.currentPoint.y - 1
              })
            );
          case MoveDirection.LEFT:
            return (
              !isWall(
                mapInfo[this.currentPoint.x - 1]?.[this.currentPoint.y - 1]
              ) &&
              !isWall(
                mapInfo[this.currentPoint.x]?.[this.currentPoint.y - 1]
              ) &&
              !this.findEnemyOnPoint({
                x: this.currentPoint.x - 1,
                y: this.currentPoint.y - 1
              })
            );

          case MoveDirection.BOTTOM:
            return (
              !isWall(
                mapInfo[this.currentPoint.x - 1]?.[this.currentPoint.y]
              ) &&
              !isWall(
                mapInfo[this.currentPoint.x - 1]?.[this.currentPoint.y + 1]
              ) &&
              !this.findEnemyOnPoint({
                x: this.currentPoint.x - 1,
                y: this.currentPoint.y + 1
              })
            );
          case MoveDirection.RIGHT:
            return (
              !isWall(
                mapInfo[this.currentPoint.x]?.[this.currentPoint.y + 1]
              ) &&
              !isWall(
                mapInfo[this.currentPoint.x + 1]?.[this.currentPoint.y + 1]
              ) &&
              !this.findEnemyOnPoint({
                x: this.currentPoint.x + 1,
                y: this.currentPoint.y + 1
              })
            );
        }
        break;
      default:
        break;
    }
  }

  checkCanAttack(direction: MoveDirection) {
    const currentPoint = this.currentPoint;
    const currentDirection = this.currentDirection;
    if (currentDirection !== direction) return false;
    let fontPoint = {
      x: 0,
      y: 0
    };
    switch (direction) {
      case MoveDirection.TOP:
        fontPoint = {
          x: currentPoint.x,
          y: currentPoint.y - 2
        };
        break;
      case MoveDirection.LEFT:
        fontPoint = {
          x: currentPoint.x - 2,
          y: currentPoint.y
        };
        break;
      case MoveDirection.BOTTOM:
        fontPoint = {
          x: currentPoint.x,
          y: currentPoint.y + 2
        };
        break;
      case MoveDirection.RIGHT:
        fontPoint = {
          x: currentPoint.x + 2,
          y: currentPoint.y
        };
        break;
      default:
        break;
    }

    const enemy = this.findEnemyOnPoint({
      x: fontPoint.x,
      y: fontPoint.y
    });

    console.log("check attack", enemy, fontPoint);

    if (enemy) {
      this.onAttack(AttackDirection[`ATTACK${direction}`]);
      messageCenter.publish(MessageType.onAttacked, {
        playerPoint: this.currentPoint,
        playerDirection: this.currentDirection,
        enemyPoint: enemy
      });
      enemy.hasDead = true;
      return enemy;
    }

    return false;
  }

  initOnAttacked(): void {
    messageCenter.subscribe(
      MessageType.onPlayerAttacked,
      () => {
        console.log("death", this.currentDirection);

        this.onDeath(DeathDirection[`DEATH${this.currentDirection}`]);
      },
      this
    );
  }

  initMove(direction: MoveDirection) {
    if (this.hasDead) return;
    if (this.isMoving) return;
    if (!this.checkCanMove(direction)) {
      this.isMoving = true;
      this.animationComponent.play(`BLOCK${direction}${this.currentDirection}`);
      return;
    }
    if (this.checkCanAttack(direction)) return;
    this.onMove(direction);
  }

  onMove(direction: MoveDirection) {
    super.onMove(direction);
    messageCenter.publish(MessageType.onMove, {
      playerPoint: this.currentPoint,
      playerDirection: this.currentDirection
    });
  }

  update(deltaTime: number) {}
}
