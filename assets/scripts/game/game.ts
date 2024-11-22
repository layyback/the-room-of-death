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
import level from "../level/level";
import { loadReources } from "../utils";
import { MessageType, messageCenter } from "./messageCenter";
import { MoveDirection } from "../utils/enum";
import { Keyboard } from "./keyboard";
import { mapManager } from "../map/mapManager";
import { playerHandler } from "../player/playerHandler";
import { enemyManager } from "../enemy/enemyManager";
import { doorHandler } from "../door/doorHandler";
import { smokeHandler } from "../smoke/smokeHandler";
import { spikeManager } from "../spike/spikeManager";
import { burstManager } from "../burst/burstManager";

@ccclass("Game")
export class Game extends Component {
  static currentLevel: number = 4;

  static get levelInfo() {
    return level[`level${Game.currentLevel}`];
  }

  static nextLevel() {
    Game.currentLevel++;
    messageCenter.publish(MessageType.nextLevel, Game.currentLevel);
  }
  start() {
    this.addComponent(mapManager);
    this.addComponent(playerHandler);
    this.addComponent(enemyManager);
    this.addComponent(doorHandler);
    this.addComponent(Keyboard);
    this.addComponent(smokeHandler);
    this.addComponent(spikeManager);
    this.addComponent(burstManager);
  }
  update(deltaTime: number) {}
}
