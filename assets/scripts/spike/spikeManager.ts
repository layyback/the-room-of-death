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
import { spikeHandler } from "./spikeHandler";
import { Game } from "../game/game";

@ccclass("spikeManager")
export class spikeManager extends Component {
  private static _instance: spikeManager;
  static getInstance(context?: Component) {
    if (!spikeManager._instance && context) {
      spikeManager._instance = context.addComponent(this);
    }
    return spikeManager._instance;
  }

  spikeList: spikeHandler[] = [];

  start() {
    messageCenter.subscribe(MessageType.InitSpike, this.addSpike, this);
    messageCenter.subscribe(MessageType.nextLevel, this.clearSpikeList, this);
  }

  protected onDestroy(): void {
    this.clearSpikeList();
    messageCenter.unsubscribe(MessageType.InitSpike, this.addSpike, this);
    messageCenter.unsubscribe(MessageType.nextLevel, this.clearSpikeList, this);
    spikeManager._instance = null;
  }

  addSpike(spikeInfo) {
    this.spikeList.push(new spikeHandler(spikeInfo));
  }

  clearSpikeList() {
    this.spikeList = [];
  }
}
