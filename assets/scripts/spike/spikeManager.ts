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
  start() {
    messageCenter.subscribe(MessageType.InitSpike, this.addSpike, this);
  }

  protected onDestroy(): void {
    messageCenter.unsubscribe(MessageType.InitSpike, this.addSpike, this);
  }

  addSpike(spikeInfo) {
    new spikeHandler(spikeInfo);
  }
}
