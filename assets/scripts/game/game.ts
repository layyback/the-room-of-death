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
  Event,
  director,
  find,
  Label
} from "cc";
const { ccclass, property } = _decorator;
import level from "../level/level";
import { loadReources } from "../utils";
import { MessageType, messageCenter } from "./messageCenter";
import { FadeType, MoveDirection } from "../utils/enum";
import { Keyboard } from "./keyboard";
import { mapManager } from "../map/mapManager";
import { playerHandler } from "../player/playerHandler";
import { enemyManager } from "../enemy/enemyManager";
import { doorHandler } from "../door/doorHandler";
import { smokeHandler } from "../smoke/smokeHandler";
import { spikeManager } from "../spike/spikeManager";
import { burstManager } from "../burst/burstManager";
import { shakeEffect } from "../map/shake";

@ccclass("Game")
export class Game extends Component {
  static currentLevel: number = 1;

  static stepRecord: [] = [];

  static get levelInfo() {
    return level[`level${Game.currentLevel}`];
  }

  static get maxLevel() {
    return Object.keys(level).length;
  }

  static nextLevel() {
    Game.currentLevel++;
    Game.stepRecord = [];
    if (Game.currentLevel > Game.maxLevel) {
      Game.gameOver();
      return;
    }
    find("Canvas/level").getComponent(
      Label
    ).string = `第 ${Game.currentLevel} 关`;
    messageCenter.publish(MessageType.nextLevel, Game.currentLevel);
  }

  static gameOver() {
    console.log("game over");
    messageCenter.removeAllSubscribers();
    Game.currentLevel = 1;
    messageCenter.publish(MessageType.onFade, {
      type: FadeType.OUT
    });
    setTimeout(() => {
      director.loadScene("start");
    }, 0);
  }
  start() {
    console.log("game start");

    messageCenter.publish(MessageType.onFade, {
      type: FadeType.IN
    });

    this.addComponent(playerHandler);
    this.addComponent(enemyManager);
    this.addComponent(doorHandler);
    this.addComponent(Keyboard);
    this.addComponent(smokeHandler);
    this.addComponent(spikeManager);
    this.addComponent(burstManager);
    this.addComponent(shakeEffect);
    this.addComponent(mapManager);
  }
  update(deltaTime: number) {}
}
