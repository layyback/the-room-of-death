import {
  _decorator,
  animation,
  AnimationClip,
  AnimationComponent,
  Component,
  Node,
  Sprite,
  Animation,
  SpriteFrame,
  tween,
  Vec3
} from "cc";
const { ccclass, property } = _decorator;
import { loadReources } from "../utils";
import { MessageType, messageCenter } from "../game/messageCenter";
import { MoveDirection, PlayerState } from "../utils/enum";
import { StateManager } from "./stateManager";

interface IStateMap {
  spritePath: string;
  wrapMode: AnimationClip.WrapMode;
}

@ccclass("playerManager")
export class playerManager extends Component {
  moveStep: number = 55;
  currentDirection: MoveDirection = MoveDirection.TOP;
  animationComponent: AnimationComponent;
  stateMap: Record<PlayerState, IStateMap> = {
    [PlayerState.TOP]: {
      spritePath: "texture/player/idle/top",
      wrapMode: AnimationClip.WrapMode.Loop
    },
    [PlayerState.BOTTOM]: {
      spritePath: "texture/player/idle/bottom",
      wrapMode: AnimationClip.WrapMode.Loop
    },
    [PlayerState.LEFT]: {
      spritePath: "texture/player/idle/left",
      wrapMode: AnimationClip.WrapMode.Loop
    },
    [PlayerState.RIGHT]: {
      spritePath: "texture/player/idle/right",
      wrapMode: AnimationClip.WrapMode.Loop
    },
    [PlayerState.TURNLEFTTOP]: {
      spritePath: "texture/player/turnleft/top",
      wrapMode: AnimationClip.WrapMode.Normal
    },
    [PlayerState.TURNLEFTLEFT]: {
      spritePath: "texture/player/turnleft/left",
      wrapMode: AnimationClip.WrapMode.Normal
    },
    [PlayerState.TURNLEFTRIGHT]: {
      spritePath: "texture/player/turnleft/right",
      wrapMode: AnimationClip.WrapMode.Normal
    },
    [PlayerState.TURNLEFTBOTTOM]: {
      spritePath: "texture/player/turnleft/bottom",
      wrapMode: AnimationClip.WrapMode.Normal
    },
    [PlayerState.TURNRIGHTTOP]: {
      spritePath: "texture/player/turnright/top",
      wrapMode: AnimationClip.WrapMode.Normal
    },
    [PlayerState.TURNRIGHTRIGHT]: {
      spritePath: "texture/player/turnright/right",
      wrapMode: AnimationClip.WrapMode.Normal
    },
    [PlayerState.TURNRIGHTBOTTOM]: {
      spritePath: "texture/player/turnright/bottom",
      wrapMode: AnimationClip.WrapMode.Normal
    },
    [PlayerState.TURNRIGHTLEFT]: {
      spritePath: "texture/player/turnright/left",
      wrapMode: AnimationClip.WrapMode.Normal
    }
  };

  async start() {
    this.animationComponent = this.addComponent(Animation);
    this.initControl();
    await this.initPlayerAnimations();
    this.animationComponent.play(PlayerState.TOP);
    this.animationComponent.on(
      Animation.EventType.FINISHED,
      this.onAnimationFinished,
      this
    );
  }

  async initPlayerAnimations() {
    const stateMap = this.stateMap;
    return Promise.all(
      Object.keys(stateMap).map(async state => {
        const idleState = await new StateManager(stateMap[state]).initState();
        this.animationComponent.addClip(idleState, state);
      })
    );
  }

  onAnimationFinished() {
    this.animationComponent.play(PlayerState[this.currentDirection]);
  }

  initControl() {
    messageCenter.subscribe(MessageType.Move, this.onMove, this);
  }

  onChangeDirection(direction: MoveDirection) {
    switch (direction) {
      case MoveDirection.TURNLEFT:
        switch (this.currentDirection) {
          case MoveDirection.TOP:
            this.currentDirection = MoveDirection.LEFT;
            this.animationComponent.play(PlayerState.TURNLEFTLEFT);
            break;
          case MoveDirection.LEFT:
            this.currentDirection = MoveDirection.BOTTOM;
            this.animationComponent.play(PlayerState.TURNLEFTBOTTOM);
            break;
          case MoveDirection.BOTTOM:
            this.currentDirection = MoveDirection.RIGHT;
            this.animationComponent.play(PlayerState.TURNLEFTRIGHT);
            break;
          case MoveDirection.RIGHT:
            this.currentDirection = MoveDirection.TOP;
            this.animationComponent.play(PlayerState.TURNLEFTTOP);
          default:
            break;
        }
        break;
      case MoveDirection.TURNRIGHT:
        switch (this.currentDirection) {
          case MoveDirection.TOP:
            this.currentDirection = MoveDirection.RIGHT;
            this.animationComponent.play(PlayerState.TURNRIGHTRIGHT);
            break;
          case MoveDirection.RIGHT:
            this.currentDirection = MoveDirection.BOTTOM;
            this.animationComponent.play(PlayerState.TURNRIGHTBOTTOM);
            break;
          case MoveDirection.BOTTOM:
            this.currentDirection = MoveDirection.LEFT;
            this.animationComponent.play(PlayerState.TURNRIGHTLEFT);
            break;
          case MoveDirection.LEFT:
            this.currentDirection = MoveDirection.TOP;
            this.animationComponent.play(PlayerState.TURNRIGHTTOP);
          default:
            break;
        }
        break;

      default:
        break;
    }
  }

  onMove(direction: MoveDirection) {
    console.log("onMove", this);

    switch (direction) {
      case MoveDirection.TOP:
        tween(this.node)
          .by(0.3, { position: new Vec3(0, 1 * this.moveStep, 0) })
          .start();
        break;
      case MoveDirection.BOTTOM:
        tween(this.node)
          .by(0.3, { position: new Vec3(0, -1 * this.moveStep, 0) })
          .start();
        break;
      case MoveDirection.LEFT:
        tween(this.node)
          .by(0.3, { position: new Vec3(-1 * this.moveStep, 0, 0) })
          .start();
        break;
      case MoveDirection.RIGHT:
        tween(this.node)
          .by(0.3, { position: new Vec3(1 * this.moveStep, 0, 0) })
          .start();
        break;
      case MoveDirection.TURNLEFT:
      case MoveDirection.TURNRIGHT:
        this.onChangeDirection(direction);
        break;

      default:
        break;
    }
  }

  update(deltaTime: number) {}
}
