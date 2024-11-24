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
  resources,
  ProgressBar,
  Label,
  Scene,
  director
} from "cc";
const { ccclass, property } = _decorator;
import { loadReources } from "../utils";
import { MessageType, messageCenter } from "./messageCenter";
import { FadeType, MoveDirection } from "../utils/enum";

@ccclass("Start")
export class Start extends Component {
  protected start(): void {
    messageCenter.publish(MessageType.onFade, {
      type: FadeType.IN
    });
  }
  startGame() {
    messageCenter.publish(MessageType.onFade, {
      type: FadeType.OUT
    });
    this.scheduleOnce(() => {
      director.loadScene("game");
    }, 0.5);
  }

  update(deltaTime: number) {}
}
