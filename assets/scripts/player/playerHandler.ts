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
  Size,
  director
} from "cc";
const { ccclass, property } = _decorator;
import { loadReources, isWall, isBlock, isCliff } from "../utils";
import { MessageType, messageCenter } from "../game/messageCenter";
import {
  AttackDirection,
  DeathDirection,
  DoorState,
  FadeType,
  MoveDirection,
  PlayerDeathType,
  PlayerState,
  ShakeType,
  TileSize,
  TileType
} from "../utils/enum";
import { StateManager } from "../common/stateManager";
import { entityDynamic } from "../common/entityDynamic";
import { enemyManager } from "../enemy/enemyManager";
import { doorHandler } from "../door/doorHandler";
import { Game } from "../game/game";
import { burstManager } from "../burst/burstManager";

interface IStateMap {
  spritePath: string;
  wrapMode: AnimationClip.WrapMode;
}

export class playerHandler extends entityDynamic {
  get stateMap(): Record<PlayerState, IStateMap> {
    return {
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
      },
      [PlayerState.AIRDEATHTOP]: {
        spritePath: "texture/player/airdeath/top",
        wrapMode: AnimationClip.WrapMode.Normal
      },
      [PlayerState.AIRDEATHBOTTOM]: {
        spritePath: "texture/player/airdeath/bottom",
        wrapMode: AnimationClip.WrapMode.Normal
      },
      [PlayerState.AIRDEATHLEFT]: {
        spritePath: "texture/player/airdeath/left",
        wrapMode: AnimationClip.WrapMode.Normal
      },
      [PlayerState.AIRDEATHRIGHT]: {
        spritePath: "texture/player/airdeath/right",
        wrapMode: AnimationClip.WrapMode.Normal
      }
    };
  }

  private static _instance: playerHandler;
  static getInstance(context?: Component) {
    if (!playerHandler._instance && context) {
      playerHandler._instance = context.addComponent(this);
    }
    return playerHandler._instance;
  }

  async start() {
    this.initPlayer();
    this.initControl();
    this.initOnAttacked();
  }

  protected onDestroy(): void {
    messageCenter.unsubscribe(MessageType.InitPlayer, this.init, this);
    messageCenter.unsubscribe(MessageType.Move, this.initMove, this);
    messageCenter.unsubscribe(
      MessageType.onPlayerAttacked,
      this.onPlayerAttacked,
      this
    );
    playerHandler._instance = null;
  }

  initPlayer() {
    messageCenter.subscribe(MessageType.InitPlayer, this.init, this);
  }

  async init({ point, position, direction }) {
    await super.init({ point, position, direction });
    this.entity.setSiblingIndex(this.entity.parent.children.length - 1);
  }

  initControl() {
    messageCenter.subscribe(MessageType.Move, this.initMove, this);
  }

  initOnAttacked(): void {
    messageCenter.subscribe(
      MessageType.onPlayerAttacked,
      this.onPlayerAttacked,
      this
    );
  }

  onPlayerAttacked({ type = PlayerDeathType.NORMAL }) {
    this.onDeath(DeathDirection[`${type}DEATH${this.currentDirection}`]);
  }

  findEnemyOnPoint({ x, y }) {
    const enemyList = Game.enemyManager.enemyList;
    return enemyList.find(
      item =>
        !item.hasDead && item.currentPoint.x === x && item.currentPoint.y === y
    );
  }

  findDoorOnPoint({ x, y }) {
    const { x: dX, y: dY } = Game.levelInfo.doorInfo;
    const isOpen = Game.doorHandler.state === DoorState.OPEN;
    return !isOpen && dX === x && dY === y;
  }

  findBrustOnPoint({ x, y }) {
    const burstList = Game.burstManager.burstList;
    return burstList.find(
      item =>
        !item.hasDestroy &&
        item.currentPoint.x === x &&
        item.currentPoint.y === y
    );
  }

  checkCanMove(direction: MoveDirection) {
    const currentDirection = this.currentDirection;
    const mapInfo = Game.levelInfo.mapInfo;

    const isPassable = ({ x, y }) => {
      const tileInfo = mapInfo[x]?.[y];
      return (
        (!isBlock(tileInfo) || this.findBrustOnPoint({ x, y })) &&
        !this.findDoorOnPoint({ x, y }) &&
        !this.findEnemyOnPoint({ x, y })
      );
    };

    switch (direction) {
      case MoveDirection.TOP:
        switch (currentDirection) {
          case MoveDirection.TOP:
            return (
              !isWall(
                mapInfo[this.currentPoint.x]?.[this.currentPoint.y - 2]
              ) &&
              isPassable({
                x: this.currentPoint.x,
                y: this.currentPoint.y - 1
              }) &&
              !this.findDoorOnPoint({
                x: this.currentPoint.x,
                y: this.currentPoint.y - 2
              })
            );
          case MoveDirection.LEFT:
            return (
              isPassable({
                x: this.currentPoint.x,
                y: this.currentPoint.y - 1
              }) &&
              !isWall(
                mapInfo[this.currentPoint.x - 1]?.[this.currentPoint.y - 1]
              ) &&
              !this.findEnemyOnPoint({
                x: this.currentPoint.x - 1,
                y: this.currentPoint.y - 1
              })
            );
          case MoveDirection.BOTTOM:
            return isPassable({
              x: this.currentPoint.x,
              y: this.currentPoint.y - 1
            });
          case MoveDirection.RIGHT:
            return (
              isPassable({
                x: this.currentPoint.x,
                y: this.currentPoint.y - 1
              }) &&
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
      case MoveDirection.BOTTOM:
        switch (currentDirection) {
          case MoveDirection.TOP:
            return isPassable({
              x: this.currentPoint.x,
              y: this.currentPoint.y + 1
            });
          case MoveDirection.LEFT:
            return (
              isPassable({
                x: this.currentPoint.x,
                y: this.currentPoint.y + 1
              }) &&
              !isWall(
                mapInfo[this.currentPoint.x - 1]?.[this.currentPoint.y + 1]
              ) &&
              !this.findEnemyOnPoint({
                x: this.currentPoint.x - 1,
                y: this.currentPoint.y + 1
              })
            );
          case MoveDirection.BOTTOM:
            return (
              !isWall(
                mapInfo[this.currentPoint.x]?.[this.currentPoint.y + 2]
              ) &&
              isPassable({
                x: this.currentPoint.x,
                y: this.currentPoint.y + 1
              }) &&
              !this.findDoorOnPoint({
                x: this.currentPoint.x,
                y: this.currentPoint.y + 2
              })
            );
          case MoveDirection.RIGHT:
            return (
              isPassable({
                x: this.currentPoint.x,
                y: this.currentPoint.y + 1
              }) &&
              !isWall(
                mapInfo[this.currentPoint.x + 1]?.[this.currentPoint.y + 1]
              ) &&
              !this.findEnemyOnPoint({
                x: this.currentPoint.x + 1,
                y: this.currentPoint.y + 1
              })
            );
          default:
            break;
        }
      case MoveDirection.LEFT:
        switch (currentDirection) {
          case MoveDirection.TOP:
            return (
              isPassable({
                x: this.currentPoint.x - 1,
                y: this.currentPoint.y
              }) &&
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
                mapInfo[this.currentPoint.x - 2]?.[this.currentPoint.y]
              ) &&
              isPassable({
                x: this.currentPoint.x - 1,
                y: this.currentPoint.y
              }) &&
              !this.findDoorOnPoint({
                x: this.currentPoint.x - 2,
                y: this.currentPoint.y
              })
            );
          case MoveDirection.BOTTOM:
            return (
              isPassable({
                x: this.currentPoint.x - 1,
                y: this.currentPoint.y
              }) &&
              !isWall(
                mapInfo[this.currentPoint.x - 1]?.[this.currentPoint.y + 1]
              ) &&
              !this.findEnemyOnPoint({
                x: this.currentPoint.x - 1,
                y: this.currentPoint.y + 1
              })
            );
          case MoveDirection.RIGHT:
            return isPassable({
              x: this.currentPoint.x - 1,
              y: this.currentPoint.y
            });
          default:
            break;
        }
      case MoveDirection.RIGHT:
        switch (currentDirection) {
          case MoveDirection.TOP:
            return (
              isPassable({
                x: this.currentPoint.x + 1,
                y: this.currentPoint.y
              }) &&
              !isWall(
                mapInfo[this.currentPoint.x + 1]?.[this.currentPoint.y - 1]
              ) &&
              !this.findEnemyOnPoint({
                x: this.currentPoint.x + 1,
                y: this.currentPoint.y - 1
              })
            );
          case MoveDirection.LEFT:
            return isPassable({
              x: this.currentPoint.x + 1,
              y: this.currentPoint.y
            });
          case MoveDirection.BOTTOM:
            return (
              isPassable({
                x: this.currentPoint.x + 1,
                y: this.currentPoint.y
              }) &&
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
                mapInfo[this.currentPoint.x + 2]?.[this.currentPoint.y]
              ) &&
              isPassable({
                x: this.currentPoint.x + 1,
                y: this.currentPoint.y
              }) &&
              !this.findDoorOnPoint({
                x: this.currentPoint.x + 2,
                y: this.currentPoint.y
              })
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
                y: this.currentPoint.y
              }) &&
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
                x: this.currentPoint.x,
                y: this.currentPoint.y + 1
              }) &&
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
                y: this.currentPoint.y
              }) &&
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
                x: this.currentPoint.x,
                y: this.currentPoint.y - 1
              }) &&
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
              }) &&
              !this.findEnemyOnPoint({
                x: this.currentPoint.x + 1,
                y: this.currentPoint.y
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
              }) &&
              !this.findEnemyOnPoint({
                x: this.currentPoint.x,
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
                y: this.currentPoint.y
              }) &&
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
                x: this.currentPoint.x,
                y: this.currentPoint.y + 1
              }) &&
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

    if (enemy) {
      this.onAttack(AttackDirection[`ATTACK${direction}`]);
      messageCenter.publish(MessageType.onAttacked, {
        playerPoint: this.currentPoint,
        playerDirection: this.currentDirection,
        enemyPoint: enemy.currentPoint
      });
      this.scheduleOnce(() => {
        this.handleShake(direction);
      }, 0.5);
      return enemy;
    }

    return false;
  }

  initMove(direction: MoveDirection) {
    if (this.hasDead) return;
    if (this.isMoving) return;
    if (this.checkCanAttack(direction)) return;
    if (!this.checkCanMove(direction)) {
      this.isMoving = true;
      this.animationComponent.play(`BLOCK${direction}${this.currentDirection}`);
      this.handleShake(direction);
      return;
    }
    this.onMove(direction);
  }

  handleShake(direction: MoveDirection) {
    switch (direction) {
      case MoveDirection.TOP:
      case MoveDirection.BOTTOM:
      case MoveDirection.LEFT:
      case MoveDirection.RIGHT:
        messageCenter.publish(MessageType.onShake, {
          type: ShakeType[direction]
        });
        break;

      case MoveDirection.TURNLEFT:
        switch (this.currentDirection) {
          case MoveDirection.TOP:
            messageCenter.publish(MessageType.onShake, {
              type: ShakeType.LEFT
            });
            break;
          case MoveDirection.BOTTOM:
            messageCenter.publish(MessageType.onShake, {
              type: ShakeType.RIGHT
            });
            break;
          case MoveDirection.LEFT:
            messageCenter.publish(MessageType.onShake, {
              type: ShakeType.BOTTOM
            });
            break;
          case MoveDirection.RIGHT:
            messageCenter.publish(MessageType.onShake, {
              type: ShakeType.TOP
            });
            break;
          default:
            break;
        }
        break;
      case MoveDirection.TURNRIGHT:
        switch (this.currentDirection) {
          case MoveDirection.TOP:
            messageCenter.publish(MessageType.onShake, {
              type: ShakeType.RIGHT
            });
            break;
          case MoveDirection.BOTTOM:
            messageCenter.publish(MessageType.onShake, {
              type: ShakeType.LEFT
            });
            break;
          case MoveDirection.LEFT:
            messageCenter.publish(MessageType.onShake, {
              type: ShakeType.TOP
            });
            break;
          case MoveDirection.RIGHT:
            messageCenter.publish(MessageType.onShake, {
              type: ShakeType.BOTTOM
            });
            break;
          default:
            break;
        }
        break;

      default:
        break;
    }
  }

  onMove(direction: MoveDirection) {
    Game.addRecord();
    Game.playAudio("move");
    super.onMove(direction);
    messageCenter.publish(MessageType.onMove, {
      playerPoint: this.currentPoint,
      playerPosition: this.entity.getWorldPosition(),
      playerDirection: this.currentDirection,
      moveDirection: direction
    });
  }

  onDeath(deathDirection: DeathDirection): void {
    super.onDeath(deathDirection);
    this.scheduleOnce(() => {
      this.handleShake(this.currentDirection);
      // Game.gameOver();
    }, 0.5);
  }

  update(deltaTime: number) {}
}
