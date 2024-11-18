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
import {
  MoveDirection,
  EnemyState,
  PlayerState,
  TileSize,
  TileType,
  AttackDirection
} from "../utils/enum";
import { StateManager } from "../common/stateManager";
import { playerInfo, mapInfo } from "../game/level1";
import { entityHandler } from "../common/entity";

interface IStateMap {
  spritePath: string;
  wrapMode: AnimationClip.WrapMode;
}

@ccclass("enemyHandler")
export class enemyHandler extends entityHandler {
  stateMap: Record<EnemyState, IStateMap> = {
    [EnemyState.TOP]: {
      spritePath: "texture/woodenskeleton/idle/top",
      wrapMode: AnimationClip.WrapMode.Loop
    },
    [EnemyState.BOTTOM]: {
      spritePath: "texture/woodenskeleton/idle/bottom",
      wrapMode: AnimationClip.WrapMode.Loop
    },
    [EnemyState.LEFT]: {
      spritePath: "texture/woodenskeleton/idle/left",
      wrapMode: AnimationClip.WrapMode.Loop
    },
    [EnemyState.RIGHT]: {
      spritePath: "texture/woodenskeleton/idle/right",
      wrapMode: AnimationClip.WrapMode.Loop
    },
    [EnemyState.ATTACKTOP]: {
      spritePath: "texture/woodenskeleton/attack/top",
      wrapMode: AnimationClip.WrapMode.Normal
    },
    [EnemyState.ATTACKLEFT]: {
      spritePath: "texture/woodenskeleton/attack/left",
      wrapMode: AnimationClip.WrapMode.Normal
    },
    [EnemyState.ATTACKBOTTOM]: {
      spritePath: "texture/woodenskeleton/attack/bottom",
      wrapMode: AnimationClip.WrapMode.Normal
    },
    [EnemyState.ATTACKRIGHT]: {
      spritePath: "texture/woodenskeleton/attack/right",
      wrapMode: AnimationClip.WrapMode.Normal
    }
  };

  constructor({ point, position, node }) {
    super();
    this.init({ point, position });
  }

  async init({ point, position }) {
    super.init({ point, position });

    this.initAttack({
      playerPoint: playerInfo,
      playerDirection: MoveDirection.TOP
    });
    messageCenter.subscribe(MessageType.onMove, this.initAttack, this);
  }

  initAttack({ playerPoint, playerDirection }) {
    const x = playerPoint.x - this.currentPoint.x;
    const y = playerPoint.y - this.currentPoint.y;
    switch (true) {
      case x >= y && x > -y:
        this.direction = MoveDirection.RIGHT;
        break;
      case x >= y && x < -y:
        this.direction = MoveDirection.TOP;
        break;
      case x < y && x < -y:
        this.direction = MoveDirection.LEFT;
        break;
      case x < y && x > -y:
        this.direction = MoveDirection.BOTTOM;
      default:
        break;
    }

    // 攻击
    switch (true) {
      case x === 0 && y === 1:
        this.onAttack(AttackDirection.ATTACKBOTTOM);
        break;
      case x === 0 && y === -1:
        this.onAttack(AttackDirection.ATTACKTOP);
        break;
      case x === -1 && y === 0:
        this.onAttack(AttackDirection.ATTACKLEFT);
        break;
      case x === 1 && y === 0:
        this.onAttack(AttackDirection.ATTACKRIGHT);
        break;

      default:
        break;
    }

    // 被攻击
  }
}
