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
  static burstList: burstHandler[] = [];
  start() {
    this.initBurst();
  }

  initBurst() {
    messageCenter.subscribe(
      MessageType.nextLevel,
      () => {
        burstManager.burstList = [];
      },
      this
    );

    messageCenter.subscribe(
      MessageType.InitBurst,
      burstInfo => {
        burstManager.burstList.push(new burstHandler(burstInfo));
      },
      this
    );
  }
}
