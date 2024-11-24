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
import { enemyHandler } from "./enemyHandler";
import { Game } from "../game/game";

@ccclass("enemyManager")
export class enemyManager extends Component {
  static enemyList: enemyHandler[] = [];
  start() {
    messageCenter.subscribe(MessageType.nextLevel, this.clearEnemyList, this);
    messageCenter.subscribe(MessageType.InitEnemy, this.addEnemy, this);
  }
  onDestroy() {
    this.clearEnemyList();
    messageCenter.unsubscribe(MessageType.nextLevel, this.clearEnemyList, this);
    messageCenter.unsubscribe(MessageType.InitEnemy, this.addEnemy, this);
  }

  clearEnemyList() {
    enemyManager.enemyList = [];
  }

  addEnemy(enemyInfo) {
    enemyManager.enemyList.push(new enemyHandler(enemyInfo));
  }
}
