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
  input,
  EventKeyboard
} from "cc";
const { ccclass, property } = _decorator;
import { loadReources } from "../utils";
import { MessageType, messageCenter } from "./messageCenter";
import { MoveDirection, KeyCode } from "../utils/enum";

@ccclass("Keyboard")
export class Keyboard extends Component {
  protected start(): void {
    input.on(Input.EventType.KEY_DOWN, this.onKeyDown, this);
  }

  onKeyDown(event: EventKeyboard) {
    const code: number = event.keyCode;
    let moveDirection;
    switch (code) {
      case KeyCode.UP:
        moveDirection = MoveDirection.TOP;
        break;
      case KeyCode.DOWN:
        moveDirection = MoveDirection.BOTTOM;
        break;
      case KeyCode.LEFT:
        moveDirection = MoveDirection.LEFT;
        break;
      case KeyCode.RIGHT:
        moveDirection = MoveDirection.RIGHT;
        break;
      case KeyCode.Q:
        moveDirection = MoveDirection.TURNLEFT;
        break;
      case KeyCode.E:
        moveDirection = MoveDirection.TURNRIGHT;
        break;
      default:
        break;
    }
    messageCenter.publish(MessageType.Move, moveDirection);
  }

  update(deltaTime: number) {}
}
