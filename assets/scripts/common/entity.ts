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
  Vec3,
  Collider,
  RigidBody,
  BoxCollider2D,
  RigidBody2D,
  ERigidBody2DType,
  UITransform,
  Size,
  find
} from "cc";
const { ccclass, property } = _decorator;
import { loadReources } from "../utils";
import { MessageType, messageCenter } from "../game/messageCenter";
import {
  MoveDirection,
  PlayerState,
  EnemyState,
  TileSize,
  TileType,
  AttackDirection,
  DeathDirection
} from "../utils/enum";
import { StateManager } from "./stateManager";

interface IStateMap {
  spritePath: string;
  wrapMode: AnimationClip.WrapMode;
}

@ccclass("entityHandler")
export abstract class entityHandler extends Component {
  entity: Node;
  moveStep: number = TileSize;
  isMoving: boolean = false;
  hasDead: boolean = false;
  currentDirection: MoveDirection = MoveDirection.TOP;
  currentPoint: Record<"x" | "y", number>;
  animationComponent: AnimationComponent;

  abstract stateMap: Record<string, IStateMap>;

  get direction() {
    return this.currentDirection;
  }
  set direction(direction: MoveDirection) {
    if (this.currentDirection === direction) return;
    this.onChangeDirection(direction);
  }

  async init({ point, position, direction = MoveDirection.TOP }) {
    const player = new Node();
    player.parent = find("Canvas/background");
    player.addComponent(UITransform).contentSize = new Size(240, 240);
    const sprite = player.addComponent(Sprite);
    sprite.sizeMode = Sprite.SizeMode.CUSTOM;
    this.animationComponent = player.addComponent(Animation);
    this.entity = player;
    const x = position.x;
    const y = position.y;
    player.setWorldPosition(new Vec3(x, y, 0));
    this.currentPoint = point;
    this.isMoving = false;
    this.hasDead = false;
    this.direction = direction;
    await this.initAnimations();
    this.animationComponent.play(this.currentDirection);
    this.animationComponent.on(
      Animation.EventType.FINISHED,
      this.onAnimationFinished,
      this
    );
  }

  async initAnimations() {
    const stateMap = this.stateMap;
    return Promise.all(
      Object.keys(stateMap).map(async state => {
        const idleState = await new StateManager(stateMap[state]).initState();
        this.animationComponent.addClip(idleState, state);
      })
    );
  }

  onAnimationFinished() {
    this.isMoving = false;
    if (this.hasDead) return;
    this.animationComponent.play(this.currentDirection);
  }

  onChangeDirection(direction: MoveDirection) {
    switch (direction) {
      case MoveDirection.TOP:
      case MoveDirection.BOTTOM:
      case MoveDirection.LEFT:
      case MoveDirection.RIGHT:
        this.currentDirection = direction;
        this.animationComponent.play(direction);
        this.isMoving = false;
        break;
      case MoveDirection.TURNLEFT:
        switch (this.currentDirection) {
          case MoveDirection.TOP:
            this.currentDirection = MoveDirection.LEFT;
            break;
          case MoveDirection.LEFT:
            this.currentDirection = MoveDirection.BOTTOM;
            break;
          case MoveDirection.BOTTOM:
            this.currentDirection = MoveDirection.RIGHT;
            break;
          case MoveDirection.RIGHT:
            this.currentDirection = MoveDirection.TOP;
          default:
            break;
        }
        this.animationComponent.play(`${direction}${this.currentDirection}`);
        break;
      case MoveDirection.TURNRIGHT:
        switch (this.currentDirection) {
          case MoveDirection.TOP:
            this.currentDirection = MoveDirection.RIGHT;

            break;
          case MoveDirection.RIGHT:
            this.currentDirection = MoveDirection.BOTTOM;

            break;
          case MoveDirection.BOTTOM:
            this.currentDirection = MoveDirection.LEFT;

            break;
          case MoveDirection.LEFT:
            this.currentDirection = MoveDirection.TOP;

          default:
            break;
        }
        this.animationComponent.play(`${direction}${this.currentDirection}`);
        break;
      default:
        break;
    }
  }

  onMove(direction: MoveDirection): void {
    this.isMoving = true;

    switch (direction) {
      case MoveDirection.TOP:
        this.currentPoint.y -= 1;
        tween(this.entity)
          .by(0.3, { position: new Vec3(0, 1 * this.moveStep, 0) })
          .call(() => {
            this.isMoving = false;
          })
          .start();
        break;
      case MoveDirection.BOTTOM:
        this.currentPoint.y += 1;
        tween(this.entity)
          .by(0.3, { position: new Vec3(0, -1 * this.moveStep, 0) })
          .call(() => {
            this.isMoving = false;
          })
          .start();
        break;
      case MoveDirection.LEFT:
        this.currentPoint.x -= 1;
        tween(this.entity)
          .by(0.3, { position: new Vec3(-1 * this.moveStep, 0, 0) })
          .call(() => {
            this.isMoving = false;
          })
          .start();
        break;
      case MoveDirection.RIGHT:
        this.currentPoint.x += 1;
        tween(this.entity)
          .by(0.3, { position: new Vec3(1 * this.moveStep, 0, 0) })
          .call(() => {
            this.isMoving = false;
          })
          .start();
        break;
      case MoveDirection.TURNLEFT:
      case MoveDirection.TURNRIGHT:
        this.direction = direction;
        break;
      default:
        break;
    }
  }
  onAttack(attackDirection: AttackDirection) {
    if (this.isMoving) return;
    this.isMoving = true;
    this.animationComponent.play(attackDirection);
  }

  onDeath(deathDirection: DeathDirection) {
    if (this.hasDead) return;
    this.hasDead = true;
    this.animationComponent.play(deathDirection);
  }
}
