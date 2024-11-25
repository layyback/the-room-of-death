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
  TileType
} from "../utils/enum";
import { StateManager } from "../common/stateManager";
import { entityDynamic } from "../common/entityDynamic";
import { burstHandler } from "./burstHandler";
import { Game } from "../game/game";

@ccclass("burstManager")
export class burstManager extends Component {
  private static _instance: burstManager;
  static getInstance(context?: Component) {
    if (!burstManager._instance && context) {
      burstManager._instance = context.addComponent(this);
    }
    return burstManager._instance;
  }

  burstList: burstHandler[] = [];

  start() {
    messageCenter.subscribe(MessageType.nextLevel, this.clearBurstList, this);
    messageCenter.subscribe(MessageType.InitBurst, this.addBurst, this);
  }

  clearBurstList() {
    this.burstList = [];
  }

  addBurst(burstInfo) {
    this.burstList.push(new burstHandler(burstInfo));
  }

  protected onDestroy(): void {
    this.clearBurstList();
    messageCenter.unsubscribe(MessageType.nextLevel, this.clearBurstList, this);
    messageCenter.unsubscribe(MessageType.InitBurst, this.addBurst, this);
  }
}
