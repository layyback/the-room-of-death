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
  Label,
  AudioSource,
  AudioClip
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
import { audioManager } from "./audio";

@ccclass("Game")
export class Game extends Component {
  static currentLevel: number = 1;
  static stepRecord: Array<{
    playerHandler;
    enemyManager;
    doorHandler;
    spikeManager;
    burstManager;
  }> = [];

  static playerHandler;
  static doorHandler;
  static smokeHandler;
  static enemyManager;
  static spikeManager;
  static burstManager;
  static audioManager;

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
    find("Canvas/level/text").getComponent(
      Label
    ).string = `第 ${Game.currentLevel} 关`;
    messageCenter.publish(MessageType.nextLevel, Game.currentLevel);
  }

  static addRecord() {
    Game.stepRecord.push({
      playerHandler: {
        direction: Game.playerHandler.direction,
        hasDead: Game.playerHandler.hasDead,
        currentPoint: { ...Game.playerHandler.currentPoint },
        position: { ...Game.playerHandler.entity.position }
      },
      enemyManager: Game.enemyManager.enemyList.map(enemy => {
        return {
          direction: enemy.direction,
          hasDead: enemy.hasDead,
          currentPoint: { ...enemy.currentPoint },
          position: { ...enemy.entity.position }
        };
      }),
      doorHandler: {
        state: Game.doorHandler.state
      },
      spikeManager: Game.spikeManager.spikeList.map(spike => {
        return {
          state: spike.state,
          currentStep: spike.currentStep,
          hasDestroy: spike.hasDestroy,
          playerPoint: { ...spike.playerPoint }
        };
      }),
      burstManager: Game.burstManager.burstList.map(burst => {
        return {
          state: burst.state,
          currentStep: burst.currentStep,
          hasDestroy: burst.hasDestroy,
          playerPoint: { ...burst.playerPoint }
        };
      })
    });
  }

  static undo() {
    const step = Game.stepRecord.pop();
    if (!step) return;

    Game.resetState(Game.playerHandler, step.playerHandler);
    Game.resetState(Game.doorHandler, step.doorHandler);
    Game.enemyManager.enemyList.forEach(enemy => {
      Game.resetState(
        enemy,
        step.enemyManager[Game.enemyManager.enemyList.indexOf(enemy)]
      );
    });
    Game.spikeManager.spikeList.forEach(spike => {
      Game.resetState(
        spike,
        step.spikeManager[Game.spikeManager.spikeList.indexOf(spike)]
      );
    });
    Game.burstManager.burstList.forEach(burst => {
      Game.resetState(
        burst,
        step.burstManager[Game.burstManager.burstList.indexOf(burst)]
      );
    });
  }

  static resetState(handler, record) {
    Object.keys(record).forEach(key => {
      if (key === "position") {
        handler.entity.position = record[key];
      } else {
        handler[key] = record[key];
      }
    });
  }

  static gameOver() {
    console.log("game over");
    Game.currentLevel = 1;
    messageCenter.removeAllSubscribers();
    messageCenter.publish(MessageType.onFade, {
      type: FadeType.OUT
    });
    setTimeout(() => {
      director.loadScene("start");
    }, 0);
  }

  static playAudio(audioName: string) {
    Game.audioManager.play(audioName);
  }

  start() {
    console.log("game start");
    messageCenter.publish(MessageType.onFade, {
      type: FadeType.IN
    });

    Game.playerHandler = playerHandler.getInstance(this);
    Game.enemyManager = enemyManager.getInstance(this);
    Game.doorHandler = doorHandler.getInstance(this);
    Game.smokeHandler = smokeHandler.getInstance(this);
    Game.spikeManager = spikeManager.getInstance(this);
    Game.burstManager = burstManager.getInstance(this);

    Game.audioManager = this.addComponent(audioManager);
    this.addComponent(shakeEffect);
    this.addComponent(mapManager);
    this.addComponent(Keyboard);
  }
  update(deltaTime: number) {}
}
