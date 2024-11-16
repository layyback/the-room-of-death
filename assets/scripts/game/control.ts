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

@ccclass("Control")
export class Control extends Component {
  onTouchStart(event: Event, customEventData: string) {
    messageCenter.publish(MessageType.Move, customEventData);
  }

  update(deltaTime: number) {}
}
