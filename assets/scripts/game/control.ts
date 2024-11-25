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
import { loadReources } from "../utils";
import { MessageType, messageCenter } from "./messageCenter";
import { ControlEvent, MoveDirection } from "../utils/enum";
import { Game } from "./game";

@ccclass("Control")
export class Control extends Component {
  onTouchStart(event: Event, customEventData: ControlEvent) {
    switch (customEventData) {
      case ControlEvent.RESTART:
        Game.stepRecord = [];
        messageCenter.publish(MessageType.nextLevel, Game.currentLevel);
        break;
      case ControlEvent.UNDO:
        Game.undo();
        break;
      case ControlEvent.EXIT:
        Game.gameOver();
        break;

      default:
        messageCenter.publish(MessageType.Move, customEventData);
        break;
    }
  }

  update(deltaTime: number) {}
}
