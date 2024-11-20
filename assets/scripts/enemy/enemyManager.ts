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
import { entityHandler } from "../common/entity";
import { enemyHandler } from "./enemyHandler";
import { Game } from "../game/game";

interface EnemyInfo {
  x: number;
  y: number;
  hasDead?: boolean;
}

@ccclass("enemyManager")
export class enemyManager extends Component {
  static enemyList: EnemyInfo[];
  start() {
    enemyManager.enemyList = Game.levelInfo.enemyInfo;
    this.initEnemy();
  }

  initEnemy() {
    messageCenter.subscribe(
      MessageType.InitEnemy,
      enemyInfo => {
        enemyManager.enemyList = Game.levelInfo.enemyInfo;
        new enemyHandler(enemyInfo);
      },
      this
    );
  }
}
