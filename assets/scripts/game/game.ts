import {
  _decorator,
  Component,
  Layers,
  Node,
  Size,
  Sprite,
  Vec2,
  UITransform,
  randomRange,
  randomRangeInt,
  Input,
  Event
} from "cc";
const { ccclass, property } = _decorator;
import { mapInfo } from "../game/level1";
import { loadReources } from "../utils";
import { MessageType, messageCenter } from "./messageCenter";
import { MoveDirection } from "../utils/enum";
import { playerHandler } from "../player/playerHandler";
import { enemyManager } from "../enemy/enemyManager";

@ccclass("Game")
export class Game extends Component {
  start() {
    this.addComponent(playerHandler);
    this.addComponent(enemyManager);
  }
  update(deltaTime: number) {}
}