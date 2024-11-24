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
  SpikeType,
  SpikeStep
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

@ccclass("spikeHandler")
export class spikeHandler extends entityStatic {
  type: SpikeType = SpikeType.TWO;
  currentStep: number = 0;
  playerPoint: Record<"x" | "y", number>;

  get stateMap(): Record<SpikeType, IStateMap> {
    const subDir = `spikes/spikes${this.type.toLocaleLowerCase()}`;
    return {
      [SpikeType.ZERO]: {
        spritePath: `texture/${subDir}/zero`,
        wrapMode: AnimationClip.WrapMode.Normal
      },
      [SpikeType.ONE]: {
        spritePath: `texture/${subDir}/one`,
        wrapMode: AnimationClip.WrapMode.Normal
      },
      [SpikeType.TWO]: {
        spritePath: `texture/${subDir}/two`,
        wrapMode: AnimationClip.WrapMode.Normal
      },
      [SpikeType.THREE]: {
        spritePath: `texture/${subDir}/three`,
        wrapMode: AnimationClip.WrapMode.Normal
      },
      [SpikeType.FOUR]: {
        spritePath: `texture/${subDir}/four`,
        wrapMode: AnimationClip.WrapMode.Normal
      },
      [SpikeType.FIVE]: {
        spritePath: `texture/${subDir}/five`,
        wrapMode: AnimationClip.WrapMode.Normal
      }
    };
  }

  constructor(spikeInfo) {
    super();
    this.init(spikeInfo);
  }

  async init({ point, position, type = this.type, state }) {
    this.type = type;
    super.init({ point, position, state: SpikeType.ZERO });

    messageCenter.subscribe(MessageType.onMove, this.initAttack, this);
    messageCenter.subscribe(MessageType.nextLevel, this.onNextLevel, this);

    this.animationComponent.on(
      Animation.EventType.FINISHED,
      this.onAnimationFinished,
      this
    );
  }

  protected onDestroy(): void {
    messageCenter.unsubscribe(MessageType.onMove, this.initAttack, this);
    messageCenter.unsubscribe(MessageType.nextLevel, this.onNextLevel, this);
  }

  onNextLevel() {
    this.hasDestroy = true;
    this.onDestroy();
  }

  initAttack({ playerPoint, playerDirection }) {
    if (this.hasDestroy) return;
    this.currentStep++;
    const maxStep = SpikeStep[this.type] + 1;
    if (this.currentStep >= maxStep) {
      this.checkAttack();
    }
    this.state = SpikeStep[this.currentStep];
    this.playerPoint = playerPoint;
  }

  onAnimationFinished() {
    const maxStep = SpikeStep[this.type] + 1;
    if (this.currentStep >= maxStep) {
      this.currentStep = 0;
      this.state = SpikeStep[this.currentStep];
    }
  }

  checkAttack() {
    const { x, y } = this.playerPoint;
    const { x: pX, y: pY } = this.currentPoint;
    if (x === pX && y === pY) {
      messageCenter.publish(MessageType.onPlayerAttacked, {});
    }
  }
}
