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
  DoorState
} from "../utils/enum";
import { StateManager } from "../common/stateManager";
import { Game } from "../game/game";
import { entityStatic } from "../common/entityStatic";

interface IStateMap {
  spritePath: string;
  wrapMode: AnimationClip.WrapMode;
}

@ccclass("doorHandler")
export class doorHandler extends entityStatic {
  entity: Node;
  currentState: DoorState = DoorState.CLOSETOP;
  static isOpen: boolean = false;

  stateMap: Record<string, IStateMap> = {
    [DoorState.CLOSETOP]: {
      spritePath: "texture/door/idle/top",
      wrapMode: AnimationClip.WrapMode.Normal
    },
    [DoorState.CLOSELEFT]: {
      spritePath: "texture/door/idle/left",
      wrapMode: AnimationClip.WrapMode.Normal
    },
    [DoorState.OPEN]: {
      spritePath: "texture/door/death",
      wrapMode: AnimationClip.WrapMode.Normal
    }
  };

  protected start(): void {
    messageCenter.subscribe(MessageType.InitDoor, this.init, this);
    messageCenter.subscribe(MessageType.onMove, this.onMove, this);
    messageCenter.subscribe(MessageType.onAllEnemyDead, this.openDoor, this);
  }

  onMove({ playerPoint }) {
    if (
      playerPoint.x === this.currentPoint.x &&
      playerPoint.y === this.currentPoint.y
    ) {
      this.scheduleOnce(() => {
        Game.nextLevel();
      }, 0.5);
    }
  }

  openDoor() {
    this.state = DoorState.OPEN;
    doorHandler.isOpen = true;
  }
}
