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

@ccclass("Loading")
export class Loading extends Component {
  start() {
    console.log("loading");
    resources.preloadDir(
      "texture",
      (finished, total) => {
        this.getComponent(ProgressBar).progress = finished / total;
        this.getComponentInChildren(
          Label
        ).string = `资源加载中…(${finished}/${total})`;
      },
      () => {
        messageCenter.publish(MessageType.onFade, {
          type: FadeType.OUT
        });
        this.scheduleOnce(() => {
          director.loadScene("start");
        }, 0.5);
      }
    );
  }

  update(deltaTime: number) {}
}
