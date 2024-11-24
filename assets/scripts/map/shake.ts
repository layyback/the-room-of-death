import { _decorator, Component, Node, Vec3, tween, Tween } from "cc";
import { MessageType, messageCenter } from "../game/messageCenter";
import { ShakeType } from "../utils/enum";
const { ccclass, property } = _decorator;

@ccclass("ShakeEffect")
export class shakeEffect extends Component {
  shakeDuration: number = 0.4; // 震动持续时间
  shakeIntensity: number = 8.0; // 震动强度
  shakeFrequency: number = 3.0; // 震动频率

  shakeTween: Tween = null;
  private originalPosition: Vec3 = new Vec3();

  onLoad() {
    this.originalPosition = this.node.position.clone();
    this.initShake();
  }

  initShake() {
    messageCenter.subscribe(MessageType.onShake, this.shake, this);
  }

  protected onDestroy(): void {
    messageCenter.unsubscribe(MessageType.onShake, this.shake, this);
  }

  private shake({ type }: { type: ShakeType }) {
    switch (type) {
      case ShakeType.LEFT:
        this.shakeTween = tween(this.node)
          .to(this.shakeDuration / 2 / this.shakeFrequency, {
            position: new Vec3(
              this.originalPosition.x - this.shakeIntensity,
              this.originalPosition.y,
              this.originalPosition.z
            )
          })
          .to(this.shakeDuration / 2 / this.shakeFrequency, {
            position: new Vec3(
              this.originalPosition.x + this.shakeIntensity,
              this.originalPosition.y,
              this.originalPosition.z
            )
          });
        break;
      case ShakeType.RIGHT:
        this.shakeTween = tween(this.node)
          .to(this.shakeDuration / 2 / this.shakeFrequency, {
            position: new Vec3(
              this.originalPosition.x + this.shakeIntensity,
              this.originalPosition.y,
              this.originalPosition.z
            )
          })
          .to(this.shakeDuration / 2 / this.shakeFrequency, {
            position: new Vec3(
              this.originalPosition.x - this.shakeIntensity,
              this.originalPosition.y,
              this.originalPosition.z
            )
          });
        break;
      case ShakeType.TOP:
        this.shakeTween = tween(this.node)
          .to(this.shakeDuration / 2 / this.shakeFrequency, {
            position: new Vec3(
              this.originalPosition.x,
              this.originalPosition.y + this.shakeIntensity,
              this.originalPosition.z
            )
          })
          .to(this.shakeDuration / 2 / this.shakeFrequency, {
            position: new Vec3(
              this.originalPosition.x,
              this.originalPosition.y - this.shakeIntensity,
              this.originalPosition.z
            )
          });
        break;
      case ShakeType.BOTTOM:
        this.shakeTween = tween(this.node)
          .to(this.shakeDuration / 2 / this.shakeFrequency, {
            position: new Vec3(
              this.originalPosition.x,
              this.originalPosition.y - this.shakeIntensity,
              this.originalPosition.z
            )
          })
          .to(this.shakeDuration / 2 / this.shakeFrequency, {
            position: new Vec3(
              this.originalPosition.x,
              this.originalPosition.y + this.shakeIntensity,
              this.originalPosition.z
            )
          });
        break;

      default:
        break;
    }

    this.shakeTween
      .union()
      .repeat(this.shakeFrequency)
      .call(() => {
        this.node.setPosition(this.originalPosition);
      })
      .start();
  }
}
