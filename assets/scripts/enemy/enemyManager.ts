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
import { playerInfo, mapInfo, enemyInfo } from "../game/level1";
import { entityHandler } from "../common/entity";
import { enemyHandler } from "./enemyHandler";

@ccclass("enemyManager")
export class enemyManager extends Component {
  start() {
    this.initEnemy();
  }

  initEnemy() {
    messageCenter.subscribe(
      MessageType.InitEnemy,
      ({ point, position }) => {
        new enemyHandler({ point, position, node: this.node });
      },
      this
    );
  }
}
