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
  tween,
  Color,
  Tween
} from "cc";
const { ccclass, property } = _decorator;
import { loadReources } from "../utils";
import { MessageType, messageCenter } from "./messageCenter";
import { FadeType, MoveDirection } from "../utils/enum";

@ccclass("mask")
export class mask extends Component {
  fadeTween: Tween = null;
  onFadeCb: Function = null;
  onLoad() {
    messageCenter.subscribe(MessageType.onFade, this.onFade, this);
  }

  onDestroy(): void {
    console.log("mask destroy");

    messageCenter.unsubscribe(MessageType.onFade, this.onFade, this);
  }

  onFade({ type = FadeType.NORMAL }) {
    if (!this.node) return;
    const sprite = this.node.getComponent(Sprite);
    switch (type) {
      case FadeType.NORMAL:
        this.fadeTween = tween(sprite)
          .to(0.5, { color: new Color(0, 0, 0, 255) })
          .to(0.5, { color: new Color(0, 0, 0, 0) });
        break;
      case FadeType.IN:
        sprite.color = new Color(0, 0, 0, 255);
        this.fadeTween = tween(sprite).to(0.5, {
          color: new Color(0, 0, 0, 0)
        });
        break;
      case FadeType.OUT:
        this.fadeTween = tween(sprite).to(0.5, {
          color: new Color(0, 0, 0, 255)
        });
        break;

      default:
        break;
    }
    this.fadeTween.start();
  }
  // onFade() {
  //   console.log(this.node);
  // }

  update(deltaTime: number) {}
}
