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
  find
} from "cc";
const { ccclass, property } = _decorator;
import { loadReources } from "../utils";
import { MessageType, messageCenter } from "../game/messageCenter";
import {
  MoveDirection,
  PlayerState,
  EnemyState,
  TileSize,
  TileType,
  AttackDirection,
  DeathDirection,
  SmokeDirection
} from "../utils/enum";
import { StateManager } from "../common/stateManager";
import { entityStatic } from "../common/entityStatic";

interface IStateMap {
  spritePath: string;
  wrapMode: AnimationClip.WrapMode;
}

@ccclass("smokeHandler")
export class smokeHandler extends entityStatic {
  entity: Node;

  stateMap: Record<string, IStateMap> = {
    [SmokeDirection.TOP]: {
      spritePath: "texture/smoke/idle/top",
      wrapMode: AnimationClip.WrapMode.Normal
    },
    [SmokeDirection.BOTTOM]: {
      spritePath: "texture/smoke/idle/bottom",
      wrapMode: AnimationClip.WrapMode.Normal
    },
    [SmokeDirection.LEFT]: {
      spritePath: "texture/smoke/idle/left",
      wrapMode: AnimationClip.WrapMode.Normal
    },
    [SmokeDirection.RIGHT]: {
      spritePath: "texture/smoke/idle/right",
      wrapMode: AnimationClip.WrapMode.Normal
    }
  };

  protected start(): void {
    messageCenter.subscribe(MessageType.onMove, this.createSmoke, this);
    messageCenter.subscribe(
      MessageType.nextLevel,
      () => {
        this.entity = null;
      },
      this
    );
  }

  async createSmoke({ playerPoint, playerPosition, moveDirection }) {
    let { x, y } = playerPosition;
    switch (moveDirection) {
      case MoveDirection.TOP:
        y -= (TileSize * 1) / 3;
        break;
      case MoveDirection.BOTTOM:
        y += (TileSize * 1) / 3;
        break;
      case MoveDirection.LEFT:
        x += TileSize;
        break;
      case MoveDirection.RIGHT:
        x -= TileSize;
        break;
      default:
        break;
    }
    if (!this.entity) {
      await this.init({
        point: playerPoint,
        position: { x, y },
        state: moveDirection
      });
      this.entity.setSiblingIndex(this.entity.parent.children.length - 2);
    } else {
      this.entity.setWorldPosition(new Vec3(x, y, 0));
      this.state = moveDirection;
    }
  }
}
