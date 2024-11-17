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
  UITransform
} from "cc";
const { ccclass, property } = _decorator;
import { loadReources } from "../utils";
import { MessageType, messageCenter } from "../game/messageCenter";
import { MoveDirection, PlayerState, TileSize, TileType } from "../utils/enum";
import { StateManager } from "./stateManager";
import { playerInfo, mapInfo } from "../game/level1";

interface IStateMap {
  spritePath: string;
  wrapMode: AnimationClip.WrapMode;
}

@ccclass("playerManager")
export class playerManager extends Component {
  moveStep: number = TileSize;
  isMoving: boolean = false;
  currentDirection: MoveDirection = MoveDirection.TOP;
  currentPoint: Record<"x" | "y", number>;
  animationComponent: AnimationComponent;

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
    this.animationComponent = this.addComponent(Animation);
    this.initPlayer();
    this.initControl();
    await this.initPlayerAnimations();
    this.animationComponent.play(PlayerState.TOP);
    this.animationComponent.on(
      Animation.EventType.FINISHED,
      this.onAnimationFinished,
      this
    );
  }

  initPlayer() {
    messageCenter.subscribe(
      MessageType.InitPlayer,
      ({ point, position }) => {
        const x = position.x;
        const y = position.y;
        this.node.setWorldPosition(new Vec3(x, y, 0));
        this.currentPoint = point;
      },
      this
    );
  }

  async initPlayerAnimations() {
    const stateMap = this.stateMap;
    return Promise.all(
      Object.keys(stateMap).map(async state => {
        const idleState = await new StateManager(stateMap[state]).initState();
        this.animationComponent.addClip(idleState, state);
      })
    );
  }

  onAnimationFinished() {
    this.isMoving = false;
    this.animationComponent.play(PlayerState[this.currentDirection]);
  }

  initControl() {
    messageCenter.subscribe(MessageType.Move, this.onMove, this);
  }

  onChangeDirection(direction: MoveDirection) {
    switch (direction) {
      case MoveDirection.TURNLEFT:
        switch (this.currentDirection) {
          case MoveDirection.TOP:
            this.currentDirection = MoveDirection.LEFT;

            break;
          case MoveDirection.LEFT:
            this.currentDirection = MoveDirection.BOTTOM;

            break;
          case MoveDirection.BOTTOM:
            this.currentDirection = MoveDirection.RIGHT;

            break;
          case MoveDirection.RIGHT:
            this.currentDirection = MoveDirection.TOP;

          default:
            break;
        }
        break;
      case MoveDirection.TURNRIGHT:
        switch (this.currentDirection) {
          case MoveDirection.TOP:
            this.currentDirection = MoveDirection.RIGHT;

            break;
          case MoveDirection.RIGHT:
            this.currentDirection = MoveDirection.BOTTOM;

            break;
          case MoveDirection.BOTTOM:
            this.currentDirection = MoveDirection.LEFT;

            break;
          case MoveDirection.LEFT:
            this.currentDirection = MoveDirection.TOP;

          default:
            break;
        }
        break;

      default:
        break;
    }
    this.animationComponent.play(
      PlayerState[`${direction}${this.currentDirection}`]
    );
  }

  checkCanMove(direction: MoveDirection) {
    let tileInfo;
    const currentDirection = this.currentDirection;
    const len = currentDirection === direction ? 2 : 1;
    switch (direction) {
      case MoveDirection.TOP:
        tileInfo = mapInfo[this.currentPoint.x][this.currentPoint.y - len];
        return tileInfo?.type === TileType.FLOOR;
      case MoveDirection.BOTTOM:
        tileInfo = mapInfo[this.currentPoint.x][this.currentPoint.y + len];
        return tileInfo?.type === TileType.FLOOR;
      case MoveDirection.LEFT:
        tileInfo = mapInfo[this.currentPoint.x - len][this.currentPoint.y];
        return tileInfo?.type === TileType.FLOOR;
      case MoveDirection.RIGHT:
        tileInfo = mapInfo[this.currentPoint.x + len][this.currentPoint.y];
        return tileInfo?.type === TileType.FLOOR;
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

  onMove(direction: MoveDirection) {
    console.log("onMove", this.isMoving);
    if (this.isMoving) return;
    if (!this.checkCanMove(direction)) return;

    this.isMoving = true;
    switch (direction) {
      case MoveDirection.TOP:
        this.currentPoint.y -= 1;
        tween(this.node)
          .by(0.3, { position: new Vec3(0, 1 * this.moveStep, 0) })
          .call(() => {
            this.isMoving = false;
          })
          .start();
        break;
      case MoveDirection.BOTTOM:
        if (
          mapInfo[this.currentPoint.x][this.currentPoint.y + 1].type !==
          TileType.FLOOR
        )
          return (this.isMoving = false);
        this.currentPoint.y += 1;
        tween(this.node)
          .by(0.3, { position: new Vec3(0, -1 * this.moveStep, 0) })
          .call(() => {
            this.isMoving = false;
          })
          .start();
        break;
      case MoveDirection.LEFT:
        this.currentPoint.x -= 1;
        tween(this.node)
          .by(0.3, { position: new Vec3(-1 * this.moveStep, 0, 0) })
          .call(() => {
            this.isMoving = false;
          })
          .start();
        break;
      case MoveDirection.RIGHT:
        this.currentPoint.x += 1;
        tween(this.node)
          .by(0.3, { position: new Vec3(1 * this.moveStep, 0, 0) })
          .call(() => {
            this.isMoving = false;
          })
          .start();
        break;
      case MoveDirection.TURNLEFT:
      case MoveDirection.TURNRIGHT:
        this.onChangeDirection(direction);
        break;

      default:
        break;
    }
  }

  update(deltaTime: number) {}
}
