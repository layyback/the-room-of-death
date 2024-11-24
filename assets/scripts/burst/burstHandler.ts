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
  AttackDirection,
  DeathDirection,
  EnemyType,
  BurstState,
  SpikeStep,
  PlayerDeathType
} from "../utils/enum";
import { StateManager } from "../common/stateManager";
import { entityDynamic } from "../common/entityDynamic";
import { Game } from "../game/game";
import { entityStatic } from "../common/entityStatic";
import { playerHandler } from "../player/playerHandler";

interface IStateMap {
  spritePath: string;
  wrapMode: AnimationClip.WrapMode;
}

@ccclass("burstHandler")
export class burstHandler extends entityStatic {
  currentStep: number = 0;
  playerPoint: Record<"x" | "y", number>;

  get stateMap(): Record<BurstState, IStateMap> {
    return {
      [BurstState.IDLE]: {
        spritePath: `texture/burst/idle`,
        wrapMode: AnimationClip.WrapMode.Normal
      },
      [BurstState.ATTACK]: {
        spritePath: `texture/burst/attack`,
        wrapMode: AnimationClip.WrapMode.Normal
      },
      [BurstState.DEATH]: {
        spritePath: `texture/burst/death`,
        wrapMode: AnimationClip.WrapMode.Normal
      }
    };
  }

  constructor(burstInfo) {
    super();
    this.init(burstInfo);
  }

  protected onDestroy(): void {
    messageCenter.unsubscribe(MessageType.onMove, this.initAttack, this);
    messageCenter.unsubscribe(MessageType.onAttacked, this.initAttack, this);
    messageCenter.unsubscribe(MessageType.nextLevel, this.onDestroy, this);
  }

  async init({ point, position, type, state }) {
    super.init({ point, position, state: BurstState.IDLE, size: TileSize });
    messageCenter.subscribe(MessageType.onMove, this.initAttack, this);
    messageCenter.subscribe(MessageType.onAttacked, this.initAttack, this);
    messageCenter.subscribe(MessageType.nextLevel, this.onDestroy, this);
  }

  initAttack({ playerPoint, playerDirection }) {
    const { x: pX, y: pY } = this.currentPoint;
    const maxStep = 2;
    if (this.hasDestroy) return;

    if (
      (playerPoint.x === pX && playerPoint.y === pY) ||
      this.currentStep > 0
    ) {
      this.currentStep++;
      if (this.currentStep >= maxStep) {
        this.currentStep = maxStep;
        this.onAttack();
        this.hasDestroy = true;
        this.scheduleOnce(() => {
          this.state = BurstState.DEATH;
        }, 0.15);
      } else {
        this.scheduleOnce(() => {
          this.state = BurstState.ATTACK;
        }, 0.15);
      }
    }
    this.playerPoint = playerPoint;
  }

  onAttack() {
    const { x, y } = this.playerPoint;
    const { x: pX, y: pY } = this.currentPoint;

    if (x === pX && y === pY) {
      messageCenter.publish(MessageType.onPlayerAttacked, {
        type: PlayerDeathType.AIRDEATH
      });
    }
  }
}
