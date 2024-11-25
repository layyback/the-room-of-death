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
  EnemyType
} from "../utils/enum";
import { StateManager } from "../common/stateManager";
import { entityDynamic } from "../common/entityDynamic";
import { Game } from "../game/game";

interface IStateMap {
  spritePath: string;
  wrapMode: AnimationClip.WrapMode;
}

@ccclass("enemyHandler")
export class enemyHandler extends entityDynamic {
  type: EnemyType = EnemyType.WOODENSKELETON;

  get stateMap(): Record<EnemyState, IStateMap> {
    const subDir = this.type.toLocaleLowerCase();
    return {
      [EnemyState.TOP]: {
        spritePath: `texture/${subDir}/idle/top`,
        wrapMode: AnimationClip.WrapMode.Loop
      },
      [EnemyState.BOTTOM]: {
        spritePath: `texture/${subDir}/idle/bottom`,
        wrapMode: AnimationClip.WrapMode.Loop
      },
      [EnemyState.LEFT]: {
        spritePath: `texture/${subDir}/idle/left`,
        wrapMode: AnimationClip.WrapMode.Loop
      },
      [EnemyState.RIGHT]: {
        spritePath: `texture/${subDir}/idle/right`,
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
      },
      [EnemyState.DEATHTOP]: {
        spritePath: `texture/${subDir}/death/top`,
        wrapMode: AnimationClip.WrapMode.Normal
      },
      [EnemyState.DEATHBOTTOM]: {
        spritePath: `texture/${subDir}/death/bottom`,
        wrapMode: AnimationClip.WrapMode.Normal
      },
      [EnemyState.DEATHLEFT]: {
        spritePath: `texture/${subDir}/death/left`,
        wrapMode: AnimationClip.WrapMode.Normal
      },
      [EnemyState.DEATHRIGHT]: {
        spritePath: `texture/${subDir}/death/right`,
        wrapMode: AnimationClip.WrapMode.Normal
      }
    };
  }

  constructor(enemyInfo) {
    super();
    this.init(enemyInfo);
  }

  async init({ point, position, type }) {
    this.type = type;
    await super.init({ point, position });
    this.initAttack({
      playerPoint: Game.levelInfo.playerInfo,
      playerDirection: MoveDirection.TOP
    });
    messageCenter.subscribe(MessageType.onMove, this.initAttack, this);
    messageCenter.subscribe(MessageType.onAttacked, this.onAttacked, this);
    messageCenter.subscribe(MessageType.nextLevel, this.onDestroy, this);
  }

  protected onDestroy(): void {
    messageCenter.unsubscribe(MessageType.onMove, this.initAttack, this);
    messageCenter.unsubscribe(MessageType.onAttacked, this.onAttacked, this);
    messageCenter.unsubscribe(MessageType.nextLevel, this.onDestroy, this);
  }

  initAttack({ playerPoint, playerDirection }) {
    if (this.hasDead) return;
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

    if (this.type === EnemyType.IRONSKELETON) return;
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
  }

  // 攻击
  onAttack(attackDirection: AttackDirection): void {
    if (this.hasDead) return;
    super.onAttack(attackDirection);
    messageCenter.publish(MessageType.onPlayerAttacked, {
      emenyDirection: attackDirection
    });
  }

  onAttacked({ playerPoint, playerDirection, enemyPoint }) {
    const currentPoint = this.currentPoint;
    if (currentPoint.x === enemyPoint.x && currentPoint.y === enemyPoint.y) {
      this.onDeath(DeathDirection[`DEATH${this.currentDirection}`]);
      this.scheduleOnce(() => {
        this.checkAllDead();
      }, 1);
    }
  }
  checkAllDead() {
    const allDead = Game.enemyManager.enemyList.every(enemy => enemy.hasDead);

    if (allDead) {
      messageCenter.publish(MessageType.onAllEnemyDead, {});
    }
  }
}
